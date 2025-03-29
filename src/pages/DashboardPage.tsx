
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  // Mock data for demo purposes
  const services = [
    { name: "AWS EC2 Instances", status: "Operational", usage: 65 },
    { name: "Azure VMs", status: "Operational", usage: 42 },
    { name: "Google Cloud Storage", status: "Operational", usage: 78 },
    { name: "Salesforce CRM", status: "Maintenance", usage: 0 },
    { name: "Oracle Database", status: "Operational", usage: 86 }
  ];

  const recentTickets = [
    { id: "TK-1234", title: "AWS S3 Performance Issue", status: "Open", date: "2023-09-15" },
    { id: "TK-1235", title: "Azure VM Setup Request", status: "In Progress", date: "2023-09-14" },
    { id: "TK-1236", title: "Google Cloud Billing Question", status: "Closed", date: "2023-09-10" }
  ];

  return (
    <PageLayout requireAuth>
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across 3 cloud platforms
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                1 open, 1 in progress
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">68%</div>
              <Progress value={68} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                2.4 TB of 3.5 TB used
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="services" className="space-y-4">
          <TabsList>
            <TabsTrigger value="services">Your Services</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Cloud Services</CardTitle>
                <CardDescription>
                  Monitor the status and usage of your cloud services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.name} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            service.status === "Operational"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>
                      <div>
                        {service.status === "Operational" ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Usage</span>
                              <span>{service.usage}%</span>
                            </div>
                            <Progress value={service.usage} />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Scheduled maintenance: 2 hours remaining
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Support Tickets</CardTitle>
                <CardDescription>
                  Track the status of your support requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b pb-4">
                      <div>
                        <span className="text-sm font-medium">{ticket.id}</span>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="font-medium">{ticket.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          Opened on: {ticket.date}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            ticket.status === "Open"
                              ? "bg-blue-100 text-blue-800"
                              : ticket.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>
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
                  View your current billing information and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Current Billing Period</h3>
                      <p className="font-medium">September 1 - September 30, 2023</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Current Charges</h3>
                      <p className="font-medium">$2,450.00</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-4">Charges by Service</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>AWS Services</span>
                        <span className="font-medium">$1,200.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Azure Services</span>
                        <span className="font-medium">$750.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Google Cloud Services</span>
                        <span className="font-medium">$350.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Salesforce Subscription</span>
                        <span className="font-medium">$150.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
