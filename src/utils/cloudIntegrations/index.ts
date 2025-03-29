
import { CloudIntegrationConfig, CloudProvider } from './types';
import { AWSIntegration } from './aws';
import { AzureIntegration } from './azure';
import { GoogleCloudIntegration } from './gcp';
import { SalesforceIntegration } from './salesforce';
import { Cloud, Database, Server } from 'lucide-react';

// Factory function to create the right integration based on provider id
export const createIntegration = (providerId: string, config: CloudIntegrationConfig) => {
  switch (providerId) {
    case 'aws':
      return new AWSIntegration(config);
    case 'azure':
      return new AzureIntegration(config);
    case 'gcp':
      return new GoogleCloudIntegration(config);
    case 'salesforce':
      return new SalesforceIntegration(config);
    default:
      throw new Error(`Unsupported cloud provider: ${providerId}`);
  }
};

// List of supported cloud providers
export const supportedProviders: Omit<CloudProvider, 'services' | 'billingCycle' | 'currentCharges' | 'apiKey'>[] = [
  { 
    id: "aws", 
    name: "AWS", 
    isConfigured: false,
  },
  { 
    id: "azure", 
    name: "Azure", 
    isConfigured: false,
  },
  { 
    id: "gcp", 
    name: "Google Cloud", 
    isConfigured: false,
  },
  { 
    id: "salesforce", 
    name: "Salesforce", 
    isConfigured: false,
  }
];

// Get the appropriate icon component for each provider
export const getProviderIcon = (providerId: string) => {
  switch (providerId) {
    case 'aws':
      return <Cloud className="h-8 w-8 text-orange-500" />;
    case 'azure':
      return <Cloud className="h-8 w-8 text-blue-500" />;
    case 'gcp':
      return <Cloud className="h-8 w-8 text-green-500" />;
    case 'salesforce':
      return <Server className="h-8 w-8 text-blue-700" />;
    default:
      return <Database className="h-8 w-8" />;
  }
};
