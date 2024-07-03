// src/emails/WelcomeEmail.jsx
import { Html, Head, Body, Container, Text } from '@react-email/components';

const GoodByeEmail = () => (
  <Html>
    <Head />
    <Body>
      <Container>
        <Text>GoodBye to our service!</Text>
      </Container>
    </Body>
  </Html>
);

export default GoodByeEmail;
