import { EtherealPulse, TemplateDTO, IUpdateTemplateRequest } from "@ethereal-pulse/typescript-sdk";
import dotenv from 'dotenv';

dotenv.config();
export default async function handler(req: any, res: any) {
  console.log(req.body);
  const payload = req.body;
  const id = req.query.id;
  const ethPulseSDK = new EtherealPulse(process.env.ETHEREAL_PULSE_API_KEY as string);
  const request: IUpdateTemplateRequest = {
    subject: payload.subject,
    html: payload.html,
    name: payload.name,
  };

  const templateUpdated: TemplateDTO = await ethPulseSDK.updateTemplate(id, request);
  res.status(200).json(templateUpdated);
}
