import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { name, email, subject, message } = await request.json();

  // Remplacez par votre clé API Resend
  const RESEND_API_KEY = 'VOTRE_CLE_API_RESEND';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'info@africtivistes.org',
      subject: `[Contact] ${subject}`,
      reply_to: email,
      html: `
        <p>Bonjour,</p>
        <p>Vous avez reçu un nouveau message via le formulaire de contact du site Observatoire Électorale Africain&nbsp;:</p>
        <p><b>Nom&nbsp;:</b> ${name}</p>
        <p><b>Email&nbsp;:</b> ${email}</p>
        <p><b>Sujet&nbsp;:</b> ${subject}</p>
        <p><b>Message&nbsp;:</b><br>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Cordialement,<br>L'équipe Observatoire Électorale Africain</p>
      `
    })
  });

  if (res.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}; 