// src/emails/WelcomeEmail.jsx
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
