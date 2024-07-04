import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import parse from "html-react-parser";
import { MOCKED_TEMPLATES } from "~/mocks/templates";
import { Template } from "~/models/template.model";
import CodeView from "~/components/templates/CodeView";


type TemplateViewer = "CONTENT" | "HTML" | "TEXT";

/*
* Simulates a server request to fetch for a particular template with the specified id
* */
async function getTemplateById(id: string) {
  const result = MOCKED_TEMPLATES.find(template => template.id === id);
  return new Promise<Template | undefined>((resolve) => {
    setTimeout(() => {
      resolve(result);
      }, 1000)
  })
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if(params.templateId) {
    const template = await getTemplateById(params.templateId);
    if (!template) {
      throw new Response("Template not Found", { status: 404 });
    }
    return json({ template });
  }
};

const TemplateDetails = () => {
  const { template } = useLoaderData<typeof loader>();
  const [selectedView, setSelectedView] = useState<TemplateViewer>("CONTENT");
  const navigate = useNavigate();

  const viewButtonClass = (view: TemplateViewer) => {
    return (
        "shadow-button " +
      (view === selectedView && "text-white bg-black hover:bg-black")
    )
  }

  function renderTemplate() {
    switch (selectedView) {
      case "CONTENT":
        return parse(template.html);
      case "HTML":
        return CodeView({
          code: template.html,
          language: "html"
         });
      case "TEXT":
        return CodeView({
          code: template.html,
          language: "markdown"
        });
      default:
        return null;
    }
  }

  return (
    <>
      <button
        onClick={ () => navigate(-1) }
        className="flex items-center text-sm mb-8"
      >
        <ChevronLeftIcon className="size-5"/>
        Go Back
      </button>
      <h1 className="text-3xl font-bold mb-6">{ template.name }</h1>
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
            className={viewButtonClass("TEXT")}
            onClick={() => setSelectedView("TEXT")}
          >
            Plain Text
          </button>
        </div>
        <button
          className="outline-button ml-auto"
          type="button"
          onClick={() => navigate(`/templates/${ template.id }/edit`)}
        >
          <PencilIcon className="size-3 mr-1"/> Edit
        </button>
      </div>
      <section className="overflow-auto border-2 border-gray-200 p-4">
        { renderTemplate() }
      </section>
    </>
  );
}

export default TemplateDetails;