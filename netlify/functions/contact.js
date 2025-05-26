const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  sgMail.setApiKey(process.env.NETLIFY_EMAILS_PROVIDER_API_KEY);

  const msg = {
    to: 'info@africtivistes.org',
    from: 'no-reply@africtivistes.org', // Doit être validé sur SendGrid
    subject: `[Contact] ${subject}`,
    replyTo: email,
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden;">
        <div style="background:#1e7e34; color:#fff; padding:20px; text-align:center;">
          <img src="https://africtivistes.org/wp-content/uploads/2022/09/logo-africtivistes.png" alt="Africtivistes" style="max-height:50px; margin-bottom:10px;" />
          <h2 style="margin:0;">Nouveau message de contact</h2>
        </div>
        <div style="padding:24px;">
          <p>Bonjour,</p>
          <p>Vous avez reçu un nouveau message via le formulaire de contact du site <b>Observatoire Électorale Africain</b> :</p>
          <table style="width:100%; margin:20px 0; border-collapse:collapse;">
            <tr>
              <td style="font-weight:bold; width:120px;">Nom :</td>
              <td>${name}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;">Email :</td>
              <td>${email}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;">Sujet :</td>
              <td>${subject}</td>
            </tr>
          </table>
          <div style="background:#f8f9fa; border-left:4px solid #1e7e34; padding:16px; margin:20px 0;">
            <div style="font-weight:bold; margin-bottom:8px;">Message :</div>
            <div>${message.replace(/\n/g, '<br>')}</div>
          </div>
          <p style="margin-top:32px;">Cordialement,<br>L'équipe Observatoire Électorale Africain</p>
        </div>
        <div style="background:#f1f1f1; color:#888; text-align:center; font-size:12px; padding:12px;">
          Email généré automatiquement depuis <a href="https://africtivistes.org" style="color:#1e7e34; text-decoration:none;">africtivistes.org</a>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}; 