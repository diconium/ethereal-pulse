import { EtherealPulse, ICreateTemplateRequest, IUpdateTemplateRequest, TemplateDTO } from "@ethereal-pulse/typescript-sdk";

const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

app.post('/send', (req: any, res: any) => {
  console.log(req.body);
  const payload = req.body;
  try {
    const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');
    const emailRequest = {
      from: 'almeiphi@a2dcbdb7-11e4-49e9-964b-29bdf21fa055.azurecomm.net',
      recipients: payload.recipients,
      subject: payload.subject,
      html: payload.message,
    };

    ethPulseSDK.sendEmail(emailRequest);
    res.send('Email Sent!!');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

});

app.get('/templates', async (req: any, res: any) => {
  try {
    const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');
    const result = await ethPulseSDK.getTemplates();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/templates', async (req: any, res: any) => {
  console.log(req.body);
  const payload = req.body;
  try {
    const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');
    const request: ICreateTemplateRequest = {
      html: payload.html,
      name: payload.name,
      subject: payload.subject,
    };
    const result: TemplateDTO = await ethPulseSDK.createTemplate(request);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.delete('/templates/:id', async (req: any, res: any) => {
  console.log(req.body);
  const { id } = req.params; // Extract the id from the URL parameters
  try {
    const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');
    await ethPulseSDK.deleteTemplate(id);
    res.send('Email template deleted!!');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.put('/templates/:id', async (req: any, res: any) => {
  console.log(req.body);
  const payload = req.body;
  try {
    const { id } = req.params; // Extract the id from the URL parameters
    const request: IUpdateTemplateRequest = {
      html: payload.html,
      name: payload.name,
      subject: payload.subject,
    };
    const ethPulseSDK = new EtherealPulse('aadf9195-fe77-4089-b9af-3fdf867446f6');

    const result: TemplateDTO = await ethPulseSDK.updateTemplate(id, request);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
