import { MOCKED_TEMPLATES } from "~/mocks/templates";
import { Template } from "~/models/template.model";

/*
* Simulates server requests to fetch for a particular templates,
* all methods have a simulated delay of 0.5sec
* */
const DELAY = 500;

export async function getTemplates(searchString: string | null): Promise<Template[]> {
  const result = searchString?.length ?
    MOCKED_TEMPLATES.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase())) :
    MOCKED_TEMPLATES

  return new Promise<Template[]>((resolve) => {
    setTimeout(() => {resolve(result);}, DELAY)
  })
}

export async function getTemplateById(id: string) {
  const result = MOCKED_TEMPLATES.find(template => template.id === id);
  return new Promise<Template | undefined>((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, DELAY)
  })
}