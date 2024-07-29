const nodemailer = require("nodemailer");

// Créer un objet transporter avec les informations de connexion SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });
};

// Fonction utilitaire pour envoyer un email
const sendMail = async (mailOptions) => {
  let transporter = createTransporter();

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès : " + info.response);
  } catch (error) {
    console.log("Erreur lors de l'envoi de l'email : " + error);
  }
};

const MailService = {

  async sendBirthdayMail(emails){
    let mailOptions = {
      from: process.env.EMAIL,
      to: emails,
      subject: "Joyeux anniversaire",
      text: `Bonjour,\n\nNous vous souhaitons un joyeux anniversaire ! 🎉🎂🎁`
    };

    await sendMail(mailOptions);
  }
};

module.exports = MailService;