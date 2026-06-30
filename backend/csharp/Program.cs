using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

// Backend del form de contacto en C# (ASP.NET Core).
// Recibe lo que carga la gente y lo manda por mail con el SMTP propio. Nada más.
//
// Para ponerlo a andar:
//   1. Copiá appsettings.example.json a appsettings.json y cargá el SMTP del panel
//      de Ferozo. Ese archivo lleva la contraseña, así que no sube al repo.
//   2. Levantalo con "dotnet run", o publicalo en el server .NET.
//   3. En ContactForm.tsx, apuntá CONTACT_API_ENDPOINT a este backend
//      (ej. https://www.phir-it.ar/contact).

var builder = WebApplication.CreateBuilder(args);

// allowed_origin puede ser uno o varios separados por coma. Para cada uno sumamos la
// variante con y sin "www.", así no importa si la web quedó en phir-it.ar o www.phir-it.ar.
var allowedOrigins = (builder.Configuration["Smtp:AllowedOrigin"] ?? string.Empty)
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    .SelectMany(o => o.Contains("://www.")
        ? new[] { o, o.Replace("://www.", "://") }
        : new[] { o, o.Replace("://", "://www.") })
    .Distinct()
    .ToArray();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
        }
    });
});

builder.Services.AddHttpClient();

var app = builder.Build();
app.UseCors();

app.MapPost("/contact", async (ContactRequest req, IConfiguration config, IHttpClientFactory httpClientFactory) =>
{
    // Campo trampa. Si vino completo es un bot: devolvemos ok y no mandamos nada.
    if (!string.IsNullOrWhiteSpace(req.Botcheck))
    {
        return Results.Ok(new { success = true });
    }

    // Saca saltos de línea de nombre y mail. Si no, alguien podría inyectar
    // cabeceras en el correo.
    var name = (req.Name ?? string.Empty).Replace("\r", " ").Replace("\n", " ").Trim();
    var email = (req.Email ?? string.Empty).Replace("\r", " ").Replace("\n", " ").Trim();
    var message = (req.Message ?? string.Empty).Trim();

    var emailOk = email.Length is > 0 and <= 120 && IsValidEmail(email);
    if (name.Length is < 2 or > 80 || !emailOk || message.Length is < 10 or > 1000)
    {
        return Results.BadRequest(new { success = false, message = "Datos inválidos." });
    }

    // Cloudflare Turnstile. Si hay un secret cargado, validamos el token contra Cloudflare
    // antes de mandar. Sin secret, no se exige (queda solo el campo trampa).
    var turnstileSecret = config["Turnstile:Secret"];
    if (!string.IsNullOrWhiteSpace(turnstileSecret))
    {
        if (string.IsNullOrWhiteSpace(req.TurnstileResponse))
        {
            return Results.BadRequest(new { success = false, message = "Falta la verificación del captcha." });
        }

        var http = httpClientFactory.CreateClient();
        var verify = await http.PostAsync(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["secret"] = turnstileSecret,
                ["response"] = req.TurnstileResponse,
            }));

        var verifyResult = await verify.Content.ReadFromJsonAsync<TurnstileResult>();
        if (verifyResult is null || !verifyResult.Success)
        {
            return Results.BadRequest(new { success = false, message = "No pudimos validar el captcha." });
        }
    }

    var smtp = config.GetSection("Smtp");

    var mail = new MimeMessage();
    mail.From.Add(new MailboxAddress(smtp["FromName"], smtp["From"]));
    mail.To.Add(MailboxAddress.Parse(smtp["To"]));
    mail.ReplyTo.Add(new MailboxAddress(name, email));
    mail.Subject = "Nueva consulta desde la web de PHIR-IT";
    mail.Body = new TextPart("plain")
    {
        Text = $"Nombre: {name}\nEmail: {email}\n\nMensaje:\n{message}\n",
    };

    try
    {
        var port = int.TryParse(smtp["Port"], out var p) ? p : 465;
        // 465 va con SSL directo; 587 con STARTTLS.
        var secure = string.Equals(smtp["Secure"], "tls", StringComparison.OrdinalIgnoreCase)
            ? SecureSocketOptions.StartTls
            : SecureSocketOptions.SslOnConnect;

        using var client = new SmtpClient();
        await client.ConnectAsync(smtp["Host"], port, secure);
        await client.AuthenticateAsync(smtp["User"], smtp["Password"]);
        await client.SendAsync(mail);
        await client.DisconnectAsync(true);

        return Results.Ok(new { success = true });
    }
    catch
    {
        return Results.StatusCode(502);
    }
});

app.Run();

static bool IsValidEmail(string email)
{
    try
    {
        return new System.Net.Mail.MailAddress(email).Address == email;
    }
    catch
    {
        return false;
    }
}

record ContactRequest(
    string? Name,
    string? Email,
    string? Message,
    string? Botcheck,
    [property: JsonPropertyName("cf-turnstile-response")] string? TurnstileResponse);

record TurnstileResult([property: JsonPropertyName("success")] bool Success);
