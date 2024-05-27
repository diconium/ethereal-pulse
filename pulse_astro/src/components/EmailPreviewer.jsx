import React, { useState } from "react";
import { render } from "@react-email/render";
import WelcomeEmail from "../components/emails/WelcomeEmail.jsx";
import "../styles/previwer.css";
import GoodByeEmail from "./emails/GoodBye.jsx";
import EtheralPulse from "etheral_pulse_sdk"

const WelcomeEmailHtml = render(<WelcomeEmail />);
const WelcomeEmailCode = `
import React from 'react';
import { Html, Head, Body, Container, Text } from '@react-email/components';

const WelcomeEmail = () => (
  <Html>
    <Head />
    <Body>
      <Container>
        <Text>Welcome to our service!</Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;
`;

const EmailPreviewer = () => {
  const [view, setView] = useState("content");

  EtheralPulse.pulseEmail();
  function renderView() {
    console.log("Rendering view:", view);
    switch (view) {
      case "content":
        return <WelcomeEmail />;
      case "html":
        return <pre>{WelcomeEmailHtml}</pre>;
      case "code":
        return <pre>{WelcomeEmailCode}</pre>;
      case "goodBye":
        return <GoodByeEmail />;

      default:
        return null;
    }
  }

  return (
    <div>
      <div className="button-container">
        <button
          onClick={() => {
            setView("content");
          }}
        >
          Content
        </button>
        <button
          onClick={() => {
            setView("html");
          }}
        >
          HTML
        </button>
        <button
          onClick={() => {
            setView("code");
          }}
        >
          Code
        </button>
        <button
          onClick={() => {
            setView("goodBye");
          }}
        >
          Good Bye
        </button>
      </div>
      <div className="preview-area">{renderView()}</div>
    </div>
  );
};

export default EmailPreviewer;
