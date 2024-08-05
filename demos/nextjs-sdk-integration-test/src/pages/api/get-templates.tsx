import { EtherealPulse, TemplateDTO } from "@ethereal-pulse/typescript-sdk";
import dotenv from 'dotenv';

dotenv.config();
export default async function handler(req: any, res: any) {
  const ethPulseSDK = new EtherealPulse(process.env.ETHEREAL_PULSE_API_KEY as string);

  const templatesList: Array<TemplateDTO> = await ethPulseSDK.getTemplates();
  res.status(200).json(templatesList);
}
