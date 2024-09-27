import { MOCKED_TEMPLATES } from "~/mocks/templates";
import { Template } from "~/models/template.model";
import { getWithApiKey } from "~/utils/requests";

/*
* Simulates server requests to fetch for a particular templates,
* all methods have a simulated delay of 0.5sec
* */
const DELAY = 500;

export async function getTemplates(userId: string | null, searchString: string | null): Promise<Template[]> {
  // const result = searchString?.length ?
  //   MOCKED_TEMPLATES.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase())) :
  //   MOCKED_TEMPLATES

  // TODO IMPLEMENT SEARCH STRING USAGE IN API CALL
  console.log(searchString);
  const templates: Template[] = await getWithApiKey<Template[]>('https://ethereal-pulse-server.proudglacier-d2cd577c.westeurope.azurecontainerapps.io/templates', userId ? { 'x-user-id': userId } : undefined);
  return templates;
}

export async function getTemplateById(id: string) {
  const result = MOCKED_TEMPLATES.find(template => template.id === id);
  return new Promise<Template | undefined>((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, DELAY)
  })
}
