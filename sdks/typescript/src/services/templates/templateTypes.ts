export interface IGetTemplatesRequest {
  headers?: Record<string, any>;
}

export type TemplateDTO = {
  id: string;
  name: string;
  subject: string;
  userId: string;
  html: string;
};

export type TemplateResponseDTO = {
  _id: string;
  name: string;
  subject: string;
  userId: string;
  html: string;
  createdAt: string;
};
