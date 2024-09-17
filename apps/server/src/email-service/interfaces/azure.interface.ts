export type AzureEmailStatus =
  | 'NotStarted'
  | 'Running'
  | 'Succeeded'
  | 'Failed'
  | 'Canceled';

export interface AzureEmailResponse {
  error?: {
    additionalInfo?: Array<{
      info: Record<string, unknown>;
      type: string;
    }>;
    code?: string;
    details?: Array<AzureEmailResponse>;
    message?: string;
    target?: string;
  };
  id: string;
  status: AzureEmailStatus;
}
