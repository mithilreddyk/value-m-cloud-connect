
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, Server, Database, Cloud, Settings, Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useCloudIntegrations } from "@/contexts/CloudIntegrationsContext";
import { getProviderIcon } from "@/utils/cloudIntegrations";
import CloudProviderConfig from "@/components/CloudProviderConfig";
import { useToast } from "@/components/ui/use-toast";

const ClientPortalPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    providers, 
    configureProvider, 
    removeProvider, 
    refreshProviderData, 
    refreshAllProviders,
    configuring
  } = useCloudIntegrations();
  
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  
  // Filter providers by selected provider or show all if none selected
  const filteredProviders = selectedProvider 
    ? providers.filter(provider => provider.id === selectedProvider && provider.isConfigured) 
    : providers.filter(provider => provider.isConfigured);
  
  // Calculate totals
  const totalServices = providers
    .filter(provider => provider.isConfigured)
    .reduce((total, provider) => total + provider.services.length, 0);
    
  const totalCharges = providers
    .filter(provider => provider.isConfigured)
    .reduce((total, provider) => {
      if (!provider.currentCharges) return total;
      const charges = parseFloat(provider.currentCharges.replace('$', '').replace(',', ''));
      return total + charges;
    }, 0);

  // Count operational services
  const operationalServices = providers
    .filter(provider => provider.isConfigured)
    .reduce((count, provider) => {
      return count + provider.services.filter(service => service.status === "Operational").length;
    }, 0);

  // Open config dialog for a specific provider
  const handleConfigureProvider = (providerId: string) => {
    setSelectedProviderId(providerId);
    setConfigDialogOpen(true);
  };

  // Handle refresh for all providers
  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await refreshAllProviders();
      toast({
        title: "Data Refreshed",
        description: "All cloud provider data has been refreshed."
      });
    } catch (error) {
      console.error("Error refreshing providers:", error);
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh cloud provider data.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <PageLayout requireAuth>
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Client Portal</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={handleRefreshAll}
              disabled={isRefreshing || providers.filter(p => p.isConfigured).length === 0}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {providers.filter(provider => provider.isConfigured).map((provider) => (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider.id === selectedProvider ? null : provider.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                provider.id === selectedProvider 
                  ? "bg-primary/10 border-primary" 
                  : "bg-card border-border"
              }`}
            >
              {getProviderIcon(provider.id)}
              <span>{provider.name}</span>
            </button>
          ))}
          
          <Button
            onClick={() => setSelectedProvider(null)}
            variant="outline"
            className={`flex items-center gap-2 px-4 py-2 ${
              !selectedProvider ? "bg-secondary/20 border-secondary" : ""
            }`}
            disabled={providers.filter(p => p.isConfigured).length <= 1}
          >
            <Settings className="h-5 w-5" />
            <span>View All</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cloud Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalServices}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {providers.filter(p => p.isConfigured).length} cloud platforms
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{operationalServices}/{totalServices}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Services operational
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalCharges.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Current billing period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="services" className="space-y-4">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-4">
            {filteredProviders.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Cloud Services</CardTitle>
                  <CardDescription>
                    Monitor the status and usage of your cloud services across all platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {filteredProviders.map((provider) => (
                      <div key={provider.id} className="space-y-4">
                        <div className="flex items-center gap-2">
                          {getProviderIcon(provider.id)}
                          <h3 className="font-medium text-lg">{provider.name}</h3>
                        </div>
                        
                        {provider.services.map((service) => (
                          <div key={`${provider.id}-${service.name}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
                            <div>
                              <h3 className="font-medium">{service.name}</h3>
                            </div>
                            <div>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  service.status === "Operational"
                                    ? "bg-green-100 text-green-800"
                                    : service.status === "Degraded"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {service.status}
                              </span>
                            </div>
                            <div>
                              {service.status !== "Maintenance" ? (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Usage</span>
                                    <span>{service.usage}%</span>
                                  </div>
                                  <Progress value={service.usage} />
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  Scheduled maintenance: 3 hours remaining
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Cloud Services Configured</CardTitle>
                  <CardDescription>
                    Configure cloud providers in the Settings tab to view services here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setSelectedProvider('settings')} className="mt-2">
                    Go to Settings
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4">
            {filteredProviders.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Billing Overview</CardTitle>
                  <CardDescription>
                    View your current billing information across all cloud platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {filteredProviders.map((provider) => (
                      <div key={provider.id} className="space-y-4 border-b pb-4">
                        <div className="flex items-center gap-2">
                          {getProviderIcon(provider.id)}
                          <h3 className="font-medium text-lg">{provider.name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Current Billing Period</h3>
                            <p className="font-medium">{provider.billingCycle}</p>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Current Charges</h3>
                            <p className="font-medium">{provider.currentCharges}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Alert>
                      <Database className="h-4 w-4" />
                      <AlertTitle>Consolidated Billing</AlertTitle>
                      <AlertDescription>
                        Value M provides consolidated billing across all your cloud providers.
                        Your total charges for this month: ${totalCharges.toLocaleString()}
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Billing Information Available</CardTitle>
                  <CardDescription>
                    Configure cloud providers in the Settings tab to view billing here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setSelectedProvider('settings')} className="mt-2">
                    Go to Settings
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>
                  View and manage your support tickets across all cloud platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Server className="h-4 w-4" />
                    <AlertTitle>No Active Support Tickets</AlertTitle>
                    <AlertDescription>
                      You don't have any active support tickets. If you need assistance,
                      feel free to open a new ticket.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cloud Integrations</CardTitle>
                <CardDescription>
                  Configure your cloud provider integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {providers.map((provider) => (
                    <div key={provider.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-2">
                        {getProviderIcon(provider.id)}
                        <h3 className="font-medium">{provider.name}</h3>
                      </div>
                      
                      {provider.isConfigured ? (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => refreshProviderData(provider.id)}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Refresh
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => removeProvider(provider.id)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConfigureProvider(provider.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Alert>
                    <Settings className="h-4 w-4" />
                    <AlertTitle>API Credentials</AlertTitle>
                    <AlertDescription>
                      Your cloud provider API credentials are stored securely in your browser.
                      For enhanced security in production, we recommend using a secure backend storage solution.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Provider configuration dialog */}
      {configDialogOpen && selectedProviderId && (
        <CloudProviderConfig 
          providerId={selectedProviderId}
          providerName={providers.find(p => p.id === selectedProviderId)?.name || ""}
          isOpen={configDialogOpen}
          onClose={() => setConfigDialogOpen(false)}
          onConfirm={(config) => configureProvider(selectedProviderId, config)}
          isConfiguring={configuring}
        />
      )}
    </PageLayout>
  );
};

export default ClientPortalPage;
