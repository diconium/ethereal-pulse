'use client'
import React, { useState } from 'react';

export default function Email() {
  const [subject, setSubject] = useState('');
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const sendEmail = async () => {
    const emailData = {
      subject,
      recipients: recipients.split(','), // Assuming recipients are comma-separated
      message,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Or handle success in another way
      } else {
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="email"
        placeholder="recipient"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="px-4 py-2 bg-green-500 text-white rounded mb-4" onClick={sendEmail}>Send Email</button>
    </div>
  );
}
