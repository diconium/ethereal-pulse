# Ethereal Pulse SDK

Ethereal Pulse is an easy-to-use TypeScript-based SDK designed to facilitate email sending through a RESTful API. This SDK provides a streamlined way to integrate email functionalities into your applications.

## Features

- Send emails with multiple recipients.
- Support for CC, BCC, and attachments.
- Customizable email headers.

## Installation

To install Ethereal Pulse, you need to have [Node.js](https://nodejs.org/) and npm installed. Then, you can install the package via npm:

```bash
npm install ethereal-pulse
```

Alternatively, if you are using yarn:

```bash
yarn add ethereal-pulse
```

## Usage

To use Ethereal Pulse, you need to provide an API key. Below is an example of how to use this SDK to send an email:

### Import and Initialize

```typescript
import EtherealPulse from 'ethereal-pulse';

// Initialize EtherealPulse with your API key
const etherealPulse = new EtherealPulse('your_api_key_here');
```

### Sending an Email

```typescript
import { ISendEmailRequest } from 'ethereal-pulse/interfaces/email-services.interface';

const emailRequest: ISendEmailRequest = {
  from: 'sender@example.com',
  recipients: ['recipient1@example.com', 'recipient2@example.com'],
  subject: 'Hello World',
  html: '<h1>Hello World</h1>',
  cc: ['cc@example.com'], // Optional
  bcc: ['bcc@example.com'], // Optional
  attachments: [ // Optional
    {
      filename: 'test.txt',
      content: 'Hello World',
    },
  ],
  headers: { // Optional
    'x-custom-header': 'Custom Value',
  },
};

async function sendEmail() {
  try {
    const response = await etherealPulse.sendEmail(emailRequest);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();
```

## Contribution and Issues

Feel free to fork this project, make improvements, and submit pull requests. If you encounter issues or have feature requests, please file them on the [issue tracker](https://github.com/yourrepo/ethereal-pulse/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
