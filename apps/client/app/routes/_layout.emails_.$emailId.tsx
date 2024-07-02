import { json, LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { MOCKED_EMAILS } from "../../mocks/emails";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { render } from "@react-email/render";


type EmailViewer = "CONTENT" | "HTML" | "CODE";

async function getEmailById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCKED_EMAILS.find(email => email.id === id);
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if(params.emailId) {
    const email = await getEmailById(params.emailId);
    if (!email) {
      throw new Response("Email not Found", { status: 404 });
    }
    return json({ email });
  }
};

const EmailDetails = () => {
  const { email } = useLoaderData<typeof loader>();
  const [selectedView, setSelectedView] = useState<EmailViewer>("CONTENT");
  const navigate = useNavigate();

  const viewButtonClass = (view: EmailViewer) => {
    return (
        "px-3 py-1 rounded-lg " +
      (view === selectedView ? "bg-black text-white" : "hover:bg-gray-200")
    )
  }

  const html = render(
    <div dangerouslySetInnerHTML={ { __html: email.content } }/>,
    {
      pretty: true,
    }
  );

  console.log(html);

  function renderEmail() {
    switch (selectedView) {
      case "CONTENT":
        return <div dangerouslySetInnerHTML={ { __html: email.content } }/>;
      case "HTML":
        return <div>{ email.content }</div>;
      case "CODE":
        return <div>{ email.content }</div>;
      default:
        return null;
    }
  }

  return (
    <>
      <button
        onClick={ () => navigate(-1) }
        className="inline-flex items-center justify-center text-sm mb-8">
        <ChevronLeftIcon className="size-5 mr-1"/> Go Back
      </button>
      <h1 className="text-3xl font-bold mb-6">{ email.title }</h1>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            className={viewButtonClass("CONTENT")}
            onClick={() => setSelectedView("CONTENT")}
          >
            Preview
          </button>
          <button
            className={viewButtonClass("HTML")}
            onClick={() => setSelectedView("HTML")}
          >
            Html
          </button>
          <button
            className={viewButtonClass("CODE")}
            onClick={() => setSelectedView("CODE")}
          >
            Code
          </button>
        </div>
        <NavLink
          className="flex items-center px-3 py-1 ml-auto rounded-lg hover:bg-gray-200"
          to={`/emails/${ email.id }/edit`}
        >
          <PencilIcon className="size-4 mr-1"/> Edit
        </NavLink>
      </div>
      <section className="bg-white overflow-auto border-2 border-gray-200 p-4">
        { renderEmail() }
      </section>
    </>
  );
}

export default EmailDetails;