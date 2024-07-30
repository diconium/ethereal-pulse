import { EtherealPulse, TemplateDTO, IUpdateTemplateRequest } from "@ethereal-pulse/typescript-sdk";

export default async function handler(req: any, res: any) {
  console.log(req.body);
  const payload = req.body;
  const id = req.query.id;
  const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');
  const request: IUpdateTemplateRequest = {
    subject: payload.subject,
    html: payload.html,
    name: payload.name,
  };

  const templateUpdated: TemplateDTO = await ethPulseSDK.updateTemplate(id, request);
  res.status(200).json(templateUpdated);
}
