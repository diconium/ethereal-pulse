// Import dynamic from next/dynamic at the top of your file
import dynamic from 'next/dynamic';

// Dynamically import the Email component as a client-side only component
const EmailClientComponent = dynamic(() => import('./Email'), { ssr: false });
const TemplateClientComponent = dynamic(() => import('./Templates'), { ssr: false });

export default function Home() {

  return (
    <main>
      <div className="flex flex-col items-center justify-center space-y-4">
        <label className="block text-gray-950">TEST SDK INTEGRATION!!!</label>
        <div>
          <EmailClientComponent></EmailClientComponent>
        </div>
        <br></br>
        <div>
          <TemplateClientComponent></TemplateClientComponent>
        </div>
      </div>
    </main>
  );
}
