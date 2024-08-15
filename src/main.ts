import express from 'express';
import { EmailService } from './app/email.service';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

const emailService = new EmailService();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// route for email sending

//SAMPLE REQUEST BODY

// {
//   "to": "devmehta787@gmail.com",
//   "subject": "test email server",
//   "text": "this is a test email from notification service.",
//   "maxRetry": 2,
//   "retryDelay": 2500
// }

app.post('/send-email', async (req, res) => {
  const { to, subject, text, maxRetry, retryDelay} = req.body;
  try {
    const response = await emailService.sendEmail(to, subject, text, maxRetry, retryDelay);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
