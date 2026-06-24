using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

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

var allowedOrigin = builder.Configuration["Smtp:AllowedOrigin"];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (!string.IsNullOrWhiteSpace(allowedOrigin))
        {
            policy.WithOrigins(allowedOrigin).AllowAnyHeader().AllowAnyMethod();
        }
    });
});

var app = builder.Build();
app.UseCors();

app.MapPost("/contact", async (ContactRequest req, IConfiguration config) =>
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

record ContactRequest(string? Name, string? Email, string? Message, string? Botcheck);
