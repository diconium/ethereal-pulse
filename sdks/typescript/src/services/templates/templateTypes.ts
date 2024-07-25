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
};

export type TemplateCreateResponseDTO = {
  name: string;
  subject: string;
  html: string;
  _id: string;
  __v: number;
};

export type TemplateUpdateResponseDTO = TemplateCreateResponseDTO;

export type IUpdateTemplate = {
  name: string;
  subject: string;
  html: string;
};
