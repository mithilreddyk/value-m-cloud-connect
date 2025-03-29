
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Server, Database, Cloud, Settings } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";

const ClientPortalPage = () => {
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Mock data for integrated cloud systems
  const cloudSystems = [
    { 
      id: "aws", 
      name: "AWS", 
      logo: <Cloud className="h-8 w-8 text-orange-500" />,
      services: [
        { name: "EC2", status: "Operational", usage: 65 },
        { name: "S3", status: "Operational", usage: 42 },
        { name: "Lambda", status: "Operational", usage: 78 }
      ],
      billingCycle: "October 1 - October 31, 2023",
      currentCharges: "$1,245.00"
    },
    { 
      id: "azure", 
      name: "Azure", 
      logo: <Cloud className="h-8 w-8 text-blue-500" />,
      services: [
        { name: "Virtual Machines", status: "Operational", usage: 55 },
        { name: "Blob Storage", status: "Degraded", usage: 30 },
        { name: "Functions", status: "Operational", usage: 45 }
      ],
      billingCycle: "October 1 - October 31, 2023",
      currentCharges: "$895.00"
    },
    { 
      id: "gcp", 
      name: "Google Cloud", 
      logo: <Cloud className="h-8 w-8 text-green-500" />,
      services: [
        { name: "Compute Engine", status: "Operational", usage: 40 },
        { name: "Cloud Storage", status: "Operational", usage: 62 },
        { name: "Cloud Functions", status: "Maintenance", usage: 0 }
      ],
      billingCycle: "October 1 - October 31, 2023",
      currentCharges: "$750.00"
    }
  ];

  // Filter services by selected provider or show all if none selected
  const filteredSystems = selectedProvider 
    ? cloudSystems.filter(system => system.id === selectedProvider) 
    : cloudSystems;

  // Calculate totals
  const totalServices = cloudSystems.reduce((total, system) => total + system.services.length, 0);
  const totalCharges = cloudSystems.reduce((total, system) => {
    const charges = parseFloat(system.currentCharges.replace('$', '').replace(',', ''));
    return total + charges;
  }, 0);

  // Count operational services
  const operationalServices = cloudSystems.reduce((count, system) => {
    return count + system.services.filter(service => service.status === "Operational").length;
  }, 0);

  return (
    <PageLayout requireAuth>
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Client Portal</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {cloudSystems.map((system) => (
            <button
              key={system.id}
              onClick={() => setSelectedProvider(system.id === selectedProvider ? null : system.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                system.id === selectedProvider 
                  ? "bg-primary/10 border-primary" 
                  : "bg-card border-border"
              }`}
            >
              {system.logo}
              <span>{system.name}</span>
            </button>
          ))}
          <button
            onClick={() => setSelectedProvider(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-secondary/20 border-secondary"
          >
            <Settings className="h-5 w-5" />
            <span>View All</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cloud Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalServices}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {cloudSystems.length} cloud platforms
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
            <Card>
              <CardHeader>
                <CardTitle>Cloud Services</CardTitle>
                <CardDescription>
                  Monitor the status and usage of your cloud services across all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {filteredSystems.map((system) => (
                    <div key={system.id} className="space-y-4">
                      <div className="flex items-center gap-2">
                        {system.logo}
                        <h3 className="font-medium text-lg">{system.name}</h3>
                      </div>
                      
                      {system.services.map((service) => (
                        <div key={`${system.id}-${service.name}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
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
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Overview</CardTitle>
                <CardDescription>
                  View your current billing information across all cloud platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredSystems.map((system) => (
                    <div key={system.id} className="space-y-4 border-b pb-4">
                      <div className="flex items-center gap-2">
                        {system.logo}
                        <h3 className="font-medium text-lg">{system.name}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Current Billing Period</h3>
                          <p className="font-medium">{system.billingCycle}</p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Current Charges</h3>
                          <p className="font-medium">{system.currentCharges}</p>
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
                <CardTitle>Portal Settings</CardTitle>
                <CardDescription>
                  Manage your client portal settings and cloud integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Settings className="h-4 w-4" />
                    <AlertTitle>Cloud Integrations</AlertTitle>
                    <AlertDescription>
                      Your account is currently integrated with AWS, Azure, and Google Cloud.
                      Contact support to add or remove cloud platform integrations.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ClientPortalPage;
