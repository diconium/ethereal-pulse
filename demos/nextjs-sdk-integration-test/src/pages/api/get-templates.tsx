import { EtherealPulse, TemplateDTO } from "@ethereal-pulse/typescript-sdk";

export default async function handler(req: any, res: any) {
  const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');

  const templatesList: Array<TemplateDTO> = await ethPulseSDK.getTemplates();
  res.status(200).json(templatesList);
}
