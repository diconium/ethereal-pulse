import { EtherealPulse } from "@ethereal-pulse/typescript-sdk";
import dotenv from 'dotenv';

dotenv.config();
export default async function handler(req: any, res: any) {
  console.log(req.body);
  const payload = req.body;
  const ethPulseSDK = new EtherealPulse(process.env.ETHEREAL_PULSE_API_KEY as string);
  await ethPulseSDK.deleteTemplate(payload.id);
  res.status(200).json({ message: 'Template deleted successfully' });
}
