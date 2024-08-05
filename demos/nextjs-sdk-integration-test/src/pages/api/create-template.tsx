import { EtherealPulse, TemplateDTO, ICreateTemplateRequest } from "@ethereal-pulse/typescript-sdk";
import dotenv from 'dotenv';

dotenv.config();
export default async function handler(req: any, res: any) {
  console.log(req.body);
  const payload = req.body;
  const ethPulseSDK = new EtherealPulse(process.env.ETHEREAL_PULSE_API_KEY as string);
  const request: ICreateTemplateRequest = {
    subject: payload.subject,
    html: payload.html,
    name: payload.name,
  };

  const templateCreated: TemplateDTO = await ethPulseSDK.createTemplate(request);
  res.status(200).json(templateCreated);
}
