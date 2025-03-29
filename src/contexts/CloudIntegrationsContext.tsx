
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CloudProvider, CloudIntegrationConfig } from "@/utils/cloudIntegrations/types";
import { createIntegration, supportedProviders, getProviderIcon } from "@/utils/cloudIntegrations";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";

interface CloudIntegrationsContextType {
  providers: CloudProvider[];
  configuring: boolean;
  configureProvider: (providerId: string, config: CloudIntegrationConfig) => Promise<boolean>;
  removeProvider: (providerId: string) => void;
  refreshProviderData: (providerId: string) => Promise<void>;
  refreshAllProviders: () => Promise<void>;
}

const CloudIntegrationsContext = createContext<CloudIntegrationsContextType | undefined>(undefined);

export const CloudIntegrationsProvider = ({ children }: { children: ReactNode }) => {
  const [providers, setProviders] = useState<CloudProvider[]>([]);
  const [configuring, setConfiguring] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Initialize with supported providers
  useEffect(() => {
    // Only initialize providers if user is authenticated
    if (isAuthenticated) {
      const initialProviders = supportedProviders.map(provider => ({
        ...provider,
        services: [],
        isConfigured: false,
      }));
      setProviders(initialProviders);
      
      // Try to load saved configurations from localStorage
      const savedConfigs = localStorage.getItem('cloudProviderConfigs');
      if (savedConfigs) {
        try {
          const configs = JSON.parse(savedConfigs);
          Object.keys(configs).forEach(async (providerId) => {
            configureProvider(providerId, configs[providerId]);
          });
        } catch (err) {
          console.error("Failed to load saved cloud configurations:", err);
        }
      }
    }
  }, [isAuthenticated]);
  
  // Configure a provider with API keys
  const configureProvider = async (providerId: string, config: CloudIntegrationConfig) => {
    setConfiguring(true);
    try {
      const integration = createIntegration(providerId, config);
      const success = await integration.initialize();
      
      if (success) {
        const services = await integration.getServices();
        const billingInfo = await integration.getBillingInfo();
        
        setProviders(prev => prev.map(provider => 
          provider.id === providerId 
            ? { 
                ...provider, 
                isConfigured: true, 
                services,
                apiKey: config.apiKey,
                ...billingInfo
              } 
            : provider
        ));
        
        // Save configuration to localStorage (in real app, would use more secure storage)
        const savedConfigs = localStorage.getItem('cloudProviderConfigs') || '{}';
        const configs = JSON.parse(savedConfigs);
        localStorage.setItem('cloudProviderConfigs', JSON.stringify({
          ...configs,
          [providerId]: config
        }));
        
        toast({
          title: "Provider Connected",
          description: `Successfully connected to ${providerId.toUpperCase()}`,
        });
        return true;
      } else {
        toast({
          title: "Connection Failed",
          description: `Failed to connect to ${providerId.toUpperCase()}. Please check your credentials.`,
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error(`Error configuring ${providerId}:`, error);
      toast({
        title: "Connection Error",
        description: `Error connecting to ${providerId.toUpperCase()}: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setConfiguring(false);
    }
  };
  
  // Remove a provider configuration
  const removeProvider = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, isConfigured: false, services: [], apiKey: undefined, billingCycle: undefined, currentCharges: undefined } 
        : provider
    ));
    
    // Remove from localStorage
    const savedConfigs = localStorage.getItem('cloudProviderConfigs');
    if (savedConfigs) {
      try {
        const configs = JSON.parse(savedConfigs);
        delete configs[providerId];
        localStorage.setItem('cloudProviderConfigs', JSON.stringify(configs));
      } catch (err) {
        console.error("Failed to update saved cloud configurations:", err);
      }
    }
    
    toast({
      title: "Provider Removed",
      description: `Disconnected from ${providerId.toUpperCase()}`,
    });
  };
  
  // Refresh data for a single provider
  const refreshProviderData = async (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (!provider?.isConfigured || !provider.apiKey) return;
    
    try {
      const integration = createIntegration(providerId, { apiKey: provider.apiKey });
      const services = await integration.getServices();
      const billingInfo = await integration.getBillingInfo();
      
      setProviders(prev => prev.map(p => 
        p.id === providerId 
          ? { ...p, services, ...billingInfo } 
          : p
      ));
      
      toast({
        title: "Data Refreshed",
        description: `Updated ${providerId.toUpperCase()} data`,
      });
    } catch (error) {
      console.error(`Error refreshing ${providerId} data:`, error);
      toast({
        title: "Refresh Failed",
        description: `Failed to refresh ${providerId.toUpperCase()} data`,
        variant: "destructive",
      });
    }
  };
  
  // Refresh all configured providers
  const refreshAllProviders = async () => {
    const configuredProviders = providers.filter(p => p.isConfigured);
    
    for (const provider of configuredProviders) {
      await refreshProviderData(provider.id);
    }
  };

  return (
    <CloudIntegrationsContext.Provider value={{
      providers,
      configuring,
      configureProvider,
      removeProvider,
      refreshProviderData,
      refreshAllProviders
    }}>
      {children}
    </CloudIntegrationsContext.Provider>
  );
};

export const useCloudIntegrations = () => {
  const context = useContext(CloudIntegrationsContext);
  if (context === undefined) {
    throw new Error("useCloudIntegrations must be used within a CloudIntegrationsProvider");
  }
  return context;
};
