import type { MetaFunction } from "@remix-run/node";
import EmailPreviewer from "../components/EmailPreviewer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Ethereal Pulse</h1>
      <div className="mt-4">
        <h2>Email Previewer</h2>
        <EmailPreviewer />
      </div>
    </div>
  );
}
