export interface AzureEmailResponse {
  error?: {
    additionalInfo?: Array<{
      info: Record<string, any>;
      type: string;
    }>;
    code?: string;
    details?: Array<AzureEmailResponse>;
    message?: string;
    target?: string;
  };
  id: string;
  status: 'NotStarted' | 'Running' | 'Succeeded' | 'Failed' | 'Canceled';
}
