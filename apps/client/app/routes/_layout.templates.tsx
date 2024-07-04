import { Await, Form, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Suspense, useEffect, useRef } from "react";
import { MOCKED_TEMPLATES } from "~/mocks/templates";
import { Template } from "~/models/template.model";
import { PlusIcon } from "@heroicons/react/16/solid";


async function getTemplates(searchString: string | null): Promise<Template[]> {
  const result = searchString?.length ?
    MOCKED_TEMPLATES.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase())) :
    MOCKED_TEMPLATES

  return new Promise<Template[]>((resolve) => {
    setTimeout(() => {resolve(result);}, 1000)
  })
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchedStr = url.searchParams.get("templates");
  const templates = await getTemplates(searchedStr);
  return json({ templates, searchedStr });
};


const Templates = () => {
  const searchTemplateInput = useRef<null | HTMLInputElement>(null)
  const { templates, searchedStr } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();


  const drawTemplateRows = (templates: Template[]) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    return templates.map((template) => (
      <tr
        key={ template.id }
        className="pb-2 border-b-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/templates/${ template.id }`)}
      >
        <td className="text-sm px-3 py-2">{ template.name }</td>
        <td className="text-sm px-3 py-1">{ template.subject }</td>
        <td className="text-sm px-3 py-1">{ new Date(template.createdAt).toLocaleDateString("en-US", options) } </td>
      </tr>
    ))
  }

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "template"
    );

  useEffect(() => {
    if (searchTemplateInput?.current) {
      searchTemplateInput.current.value = searchedStr || "";
    }
  }, [ searchedStr ]);

  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold">Templates</h1>
        <button className="outline-button ml-auto -mb-1" type="button" onClick={() => navigate("/templates/create")}>
          <PlusIcon className="size-5 mr-1"></PlusIcon>
          Create
        </button>
      </div>
      <Form
        className="mb-4"
        id="templates-search-form"
        onChange={ (event) => {
          const isFirstSearch = searchedStr === null;
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        } }
        role="search"
      >
        <input
          ref={searchTemplateInput}
          className="pulse-input"
          aria-label="Search template"
          defaultValue={ searchedStr || "" }
          placeholder="Search template"
          type="search"
          name="template"
        />
      </Form>
      <section className="max-h-[calc(100vh-250px)] overflow-y-auto">
        <table className="table-fixed w-full">
          <thead className="bg-gray-100 border-b-2 sticky top-0">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3 lg:w-[300px]">Subject</th>
            <th className="text-left p-3 lg:w-[150px]">Created</th>
          </tr>
          </thead>
          <tbody>
          {
            searching ?
              (<tr>
                <td className="px-3">Loading...</td>
              </tr>) : (templates.length && !searching ?
                drawTemplateRows(templates) : (<tr>
                  <td className="px-3">No Templates found</td>
                </tr>))
          }
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Templates;