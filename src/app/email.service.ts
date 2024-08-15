import nodemailer from 'nodemailer';

export class EmailService {
    private transporter;
    // private maxRetry: number;
    // private retryDelay: number;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'abc@gmail.com',
                pass: 'password@123',
            },
        });
        // this.maxRetry = 3;
        // this.retryDelay = 3000;
    }

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendEmail(to: string, subject: string, text: string, maxRetry: number = 3, retryDelay: number = 3000) {
        if (maxRetry > 10) {
            throw new Error('max retries cannot exceed 10');
        }
        const mailOptions = {
            from: 'abc@gmail.com',
            to: to,
            subject: subject,
            text: text,
        };
        
        let attempt = 0;
        while (attempt < maxRetry) {    
            
            try {
                const info = await this.transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
                return info.response;
            } catch (error) {
                attempt++;
                console.error(`attempt ${attempt} failed:`, error);

                if (attempt < maxRetry) {
                console.log(`retrying in ${retryDelay / 1000} seconds`);
                await this.delay(retryDelay);
                } else {
                console.error('All retry attempts failed');
                throw error;
                }
            }
        }
    }
}