import { TemplateDTO, TemplateResponseDTO } from './templateTypes';

export class TemplateServiceMapper {
  static mapTemplateJsonToTemplateDTO(item: TemplateResponseDTO): TemplateDTO {
    //TODO add validations
    const templateDTO: TemplateDTO = {
      id: item._id,
      name: item.name,
      subject: item.subject,
      userId: item.userId, //???
      html: item.html,
    };
    return templateDTO;
  }

  static mapTemplateArrayJsonToArrayTemplateDTO(
    templatesResponse: Array<TemplateResponseDTO>,
  ): Array<TemplateDTO> {
    return templatesResponse.map(
      TemplateServiceMapper.mapTemplateJsonToTemplateDTO,
    );
  }
}
