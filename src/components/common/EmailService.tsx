
import emailjs from '@emailjs/browser';

interface EmailParams {
  to_email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (params: EmailParams) => {
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID', // Remplacer par votre Service ID EmailJS
      'YOUR_TEMPLATE_ID', // Remplacer par votre Template ID EmailJS
      params,
      'YOUR_PUBLIC_KEY' // Remplacer par votre Public Key EmailJS
    );
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
};
