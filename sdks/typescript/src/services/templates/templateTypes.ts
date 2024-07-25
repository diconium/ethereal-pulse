export interface IGetTemplatesRequest {
  headers?: Record<string, any>;
}

export type TemplateDTO = {
  id: string;
  name: string;
  subject: string;
  userId?: string;
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

export type ICreateTemplate = {
  name: string;
  subject: string;
  html: string;
  headers?: Record<string, any>;
};

export type TemplateCreateResponseDTO = {
  name: string;
  subject: string;
  html: string;
  _id: string;
  __v: number;
};

export type TemplateUpdateResponseDTO = TemplateCreateResponseDTO;

export type IDeleteTemplate = {
  id: string;
  headers?: Record<string, any>;
};
export type IUpdateTemplate = {
  name: string;
  subject: string;
  html: string;
  headers?: Record<string, any>;
};
