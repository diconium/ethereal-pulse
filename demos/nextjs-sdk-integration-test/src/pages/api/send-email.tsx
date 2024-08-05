import { EtherealPulse } from "@ethereal-pulse/typescript-sdk";
import dotenv from 'dotenv';

dotenv.config();
export default function handler(req: any, res: any) {
  console.log(req.body);
  const payload = req.body;
  const ethPulseSDK = new EtherealPulse(process.env.ETHEREAL_PULSE_API_KEY as string);
  const emailRequest = {
    from: 'almeiphi@a2dcbdb7-11e4-49e9-964b-29bdf21fa055.azurecomm.net',
    recipients: payload.recipients,
    subject: payload.subject,
    html: payload.message,
  };

  ethPulseSDK.sendEmail(emailRequest);
  res.status(200).json({ message: 'Email Sent!!!' });
}
