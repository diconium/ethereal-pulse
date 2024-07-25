import { EtherealPulse, IDeleteTemplateRequest } from "@ethereal-pulse/typescript-sdk";

export default async function handler(req: any, res: any) {
  console.log(req.body);
  const payload = req.body;
  const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');
  const request: IDeleteTemplateRequest = {
    id: payload.id
  };
  await ethPulseSDK.deleteTemplate(request);
  res.status(200).json({ message: 'Template deleted successfully' });
}
