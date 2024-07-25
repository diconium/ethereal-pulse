import { TemplateServiceMapper } from '../../../src/services/templates/TemplateServiceMapper';
import {
  TemplateDTO,
  TemplateResponseDTO,
} from '../../../src/services/templates/templateTypes';

describe('TemplateServiceMapper', () => {
  it('should correctly map template data', () => {
    const templateData: Array<TemplateResponseDTO> = [
      {
        _id: '1',
        name: 'Airbnb review',
        subject: 'Airbnb review',
        createdAt: '2025-01-01T00:00:00.000Z',
        html: '<h1>TEST review</h1>',
        userId: '11',
      },
      {
        _id: '2',
        name: 'Airbnb sales',
        subject: 'Airbnb sales',
        createdAt: '2025-01-01T00:00:00.000Z',
        html: '<h1>TEST sales</h1>',
        userId: '22',
      },
      {
        _id: '3',
        name: 'Airbnb special',
        subject: 'Airbnb special',
        createdAt: '2025-01-01T00:00:00.000Z',
        html: '<h1>TEST special</h1>',
        userId: '33',
      },
    ];
    const expectedOutput: Array<TemplateDTO> = [
      {
        id: '1',
        name: 'Airbnb review',
        subject: 'Airbnb review',
        html: '<h1>TEST review</h1>',
        userId: '11',
      },
      {
        id: '2',
        name: 'Airbnb sales',
        subject: 'Airbnb sales',
        html: '<h1>TEST sales</h1>',
        userId: '22',
      },
      {
        id: '3',
        name: 'Airbnb special',
        subject: 'Airbnb special',
        html: '<h1>TEST special</h1>',
        userId: '33',
      },
    ];

    const result =
      TemplateServiceMapper.mapTemplateArrayJsonToArrayTemplateDTO(
        templateData,
      );
    expect(result).toEqual(expectedOutput);
  });
});
