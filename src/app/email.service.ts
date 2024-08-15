import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;
    private maxRetry: number;
    private retryDelay: number;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'abc@gmail.com',
                pass: 'password@123',
            },
        });
        this.maxRetry = 3;
        this.retryDelay = 3000;
    }

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'abc@gmail.com',
            to: to,
            subject: subject,
            text: text,
        };
        
        let attempt = 0;
        while (attempt < this.maxRetry) {    
            
            try {
                const info = await this.transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
                return info.response;
            } catch (error) {
                attempt++;
                console.error(`attempt ${attempt} failed:`, error);

                if (attempt < this.maxRetry) {
                console.log(`retrying in ${this.retryDelay / 1000} seconds`);
                await this.delay(this.retryDelay);
                } else {
                console.error('All retry attempts failed');
                throw error;
                }
            }
        }
    }
}