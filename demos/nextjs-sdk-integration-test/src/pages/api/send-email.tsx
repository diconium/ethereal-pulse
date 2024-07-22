import { EtherealPulse } from "@ethereal-pulse/typescript-sdk";

export default function handler(req: any, res: any) {
    console.log(req.body);
    const payload = req.body;
    const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');
    const emailRequest = {
        from: 'almeiphi@a2dcbdb7-11e4-49e9-964b-29bdf21fa055.azurecomm.net',
        recipients: payload.recipients,
        subject: payload.subject,
        html: payload.message,
    };

    ethPulseSDK.sendEmail(emailRequest);
    res.status(200).json({ message: 'Email Sent!!!' });
}