// Import dynamic from next/dynamic at the top of your file
import dynamic from 'next/dynamic';

// Dynamically import the Email component as a client-side only component
const EmailClientComponent = dynamic(() => import('./Email'), { ssr: false });
const TemplateClientComponent = dynamic(() => import('./Templates'), { ssr: false });

export default function Home() {

  return (
    <main>
      <div>
        <p>TEST SDK INTEGRATION!!!</p>
        <div>
          <EmailClientComponent></EmailClientComponent>
        </div>
        <div>
          <TemplateClientComponent></TemplateClientComponent>
        </div>
      </div>
    </main>
  );
}
