import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CloudProviderType } from 'src/email-service/interfaces/cloud-provider.interface';
import { EMAIL_PROVIDERS } from 'src/email-service/constants/email-providers.constants';

export type CloudProviderDocument = CloudProvider & Document;

@Schema()
export class CloudProvider {
  @Prop({
    required: true,
    enum: [
      EMAIL_PROVIDERS.AZURE,
      EMAIL_PROVIDERS.AWS,
      EMAIL_PROVIDERS.ETHEREAL,
    ],
  })
  type: CloudProviderType;

  @Prop({
    type: {
      accessKeyId: { type: String },
      secretAccessKey: { type: String },
      connectionString: { type: String },
    },
    required: true,
  })
  credentials: {
    accessKeyId?: string;
    secretAccessKey?: string;
    connectionString?: string;
  };

  @Prop({ required: true })
  apiKeyId: string;
}

export const CloudProviderSchema = SchemaFactory.createForClass(CloudProvider);
