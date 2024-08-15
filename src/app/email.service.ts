import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'abc@gmamil.com',
                pass: 'password@123',
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'abc@gmamil.com',
      to: to,            
      subject: subject,
      text: text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}