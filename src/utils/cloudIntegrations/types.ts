
export interface CloudServiceStatus {
  name: string;
  status: 'Operational' | 'Degraded' | 'Maintenance' | 'Down';
  usage: number;
}

export interface CloudProvider {
  id: string;
  name: string;
  isConfigured: boolean;
  services: CloudServiceStatus[];
  billingCycle?: string;
  currentCharges?: string;
  apiKey?: string;
}

export interface CloudIntegrationConfig {
  apiKey: string;
  region?: string;
  accountId?: string;
  projectId?: string;
}
