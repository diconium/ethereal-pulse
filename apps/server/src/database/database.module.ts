import { Model } from 'mongoose';
import { Module, OnModuleInit } from '@nestjs/common';
import { GroupDocument } from 'src/entities/group.entity';
import { EmailDocument } from 'src/entities/email.entity';
import { Group, GroupSchema } from './schemas/group.schema';
import { Email, EmailSchema } from './schemas/email.schema';
import { DomainDocument } from 'src/entities/domain.entity';
import { ApiKeyDocument } from 'src/entities/api-key.entity';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { Domain, DomainSchema } from './schemas/domain.schema';
import { ApiKey, ApiKeySchema } from './schemas/api-key.schema';
import { TemplateDocument } from 'src/entities/template.entity';
import { RecipientDocument } from 'src/entities/recipient.entity';
import { Template, TemplateSchema } from './schemas/template.schema';
import { Recipient, RecipientSchema } from './schemas/recipient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Email.name, schema: EmailSchema },
      { name: ApiKey.name, schema: ApiKeySchema },
      { name: Domain.name, schema: DomainSchema },
      { name: Template.name, schema: TemplateSchema },
      { name: Recipient.name, schema: RecipientSchema },
    ]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly apiKeyModel: Model<ApiKeyDocument>,
    @InjectModel(Domain.name)
    private readonly domainModel: Model<DomainDocument>,
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
    @InjectModel(Email.name) private readonly emailModel: Model<EmailDocument>,
    @InjectModel(Recipient.name)
    private readonly recipientModel: Model<RecipientDocument>,
  ) {}

  async onModuleInit() {
    await this.apiKeyModel.ensureIndexes();
    await this.domainModel.ensureIndexes();
    await this.groupModel.ensureIndexes();
    await this.templateModel.ensureIndexes();
    await this.emailModel.ensureIndexes();
    await this.recipientModel.ensureIndexes();
  }
}
