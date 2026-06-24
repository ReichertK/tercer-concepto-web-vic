using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

// Backend del formulario de contacto, en C# (ASP.NET Core).
// Recibe lo que carga la gente en la web y lo manda por mail con el SMTP propio.
//
// Para que ande:
//   1. Copiar appsettings.example.json a appsettings.json y completar los datos
//      del SMTP (esos los da el panel de Ferozo). El appsettings.json con la
//      contraseña no se sube al repo, queda solo en el servidor.
//   2. Correr "dotnet run" (o publicarlo en el servidor .NET).
//   3. En la web, en ContactForm.tsx, poner la URL de este backend en
//      CONTACT_API_ENDPOINT (por ejemplo https://www.phir-it.ar/contact).

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
    // Campo trampa: si viene completo es un bot. Respondemos ok y no mandamos nada.
    if (!string.IsNullOrWhiteSpace(req.Botcheck))
    {
        return Results.Ok(new { success = true });
    }

    // Sacamos saltos de línea del nombre y el mail para que nadie pueda meter
    // cabeceras raras en el correo.
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
