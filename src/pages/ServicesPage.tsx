
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServicesPage = () => {
  const cloudProviders = [
    {
      id: "aws",
      name: "AWS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      description: "Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform.",
      services: [
        {
          name: "AWS Migration",
          description: "Seamlessly migrate your existing infrastructure to AWS cloud with our expert guidance.",
        },
        {
          name: "AWS Managed Services",
          description: "Let us handle the day-to-day management of your AWS infrastructure so you can focus on your core business.",
        },
        {
          name: "AWS Cost Optimization",
          description: "Reduce your AWS bills with our cost optimization strategies and recommendations.",
        },
        {
          name: "AWS Architecture Design",
          description: "Design scalable, secure, and high-performance AWS architectures tailored to your needs.",
        }
      ]
    },
    {
      id: "salesforce",
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      description: "Salesforce is the world's #1 customer relationship management (CRM) platform.",
      services: [
        {
          name: "Salesforce Implementation",
          description: "End-to-end Salesforce implementation services tailored to your business requirements.",
        },
        {
          name: "Salesforce Customization",
          description: "Customize Salesforce to match your unique business processes and workflows.",
        },
        {
          name: "Salesforce Integration",
          description: "Integrate Salesforce with your existing systems for seamless data flow and operations.",
        },
        {
          name: "Salesforce Support",
          description: "Ongoing support and maintenance for your Salesforce implementation.",
        }
      ]
    },
    {
      id: "gcp",
      name: "Google Cloud",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
      description: "Google Cloud Platform (GCP) offers a suite of cloud computing services that run on the same infrastructure as Google.",
      services: [
        {
          name: "GCP Migration",
          description: "Migrate your applications and data to Google Cloud Platform with minimal disruption.",
        },
        {
          name: "GCP Data Solutions",
          description: "Leverage Google's powerful data processing and analytics capabilities for your business.",
        },
        {
          name: "GCP AI & ML",
          description: "Implement artificial intelligence and machine learning solutions using Google's advanced technologies.",
        },
        {
          name: "GCP Infrastructure",
          description: "Build and manage scalable, reliable, and secure cloud infrastructure on GCP.",
        }
      ]
    },
    {
      id: "oracle",
      name: "Oracle Cloud",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
      description: "Oracle Cloud Infrastructure (OCI) offers a set of complementary cloud services to build and run applications.",
      services: [
        {
          name: "Oracle Cloud Migration",
          description: "Move your Oracle workloads to the Oracle Cloud for improved performance and cost savings.",
        },
        {
          name: "Oracle Database Cloud",
          description: "Deploy, manage, and optimize Oracle databases in the cloud.",
        },
        {
          name: "Oracle Application Modernization",
          description: "Modernize your Oracle applications to take advantage of cloud capabilities.",
        },
        {
          name: "Oracle Cloud Managed Services",
          description: "Comprehensive managed services for your Oracle Cloud Infrastructure.",
        }
      ]
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
      description: "Microsoft Azure is a cloud computing service for building, testing, deploying, and managing applications and services.",
      services: [
        {
          name: "Azure Migration",
          description: "Migrate your applications, infrastructure, and data to Microsoft Azure efficiently.",
        },
        {
          name: "Azure DevOps",
          description: "Implement Azure DevOps practices to streamline your development and deployment processes.",
        },
        {
          name: "Azure Security",
          description: "Secure your Azure environment with our comprehensive security solutions and best practices.",
        },
        {
          name: "Azure Managed Services",
          description: "Fully managed Azure services to optimize performance and reduce operational overhead.",
        }
      ]
    }
  ];

  return (
    <PageLayout>
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Our Cloud Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Value M offers comprehensive services across major cloud platforms to help businesses leverage the full potential of cloud technologies.
          </p>
        </div>

        <Tabs defaultValue="aws" className="space-y-8">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto p-2 bg-accent/50">
            {cloudProviders.map((provider) => (
              <TabsTrigger 
                key={provider.id} 
                value={provider.id}
                className="flex items-center gap-2 py-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <img 
                  src={provider.logo} 
                  alt={provider.name} 
                  className="h-5 w-auto" 
                />
                <span>{provider.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {cloudProviders.map((provider) => (
            <TabsContent key={provider.id} value={provider.id} className="space-y-6">
              <div className="max-w-3xl mx-auto text-center mb-8">
                <img 
                  src={provider.logo} 
                  alt={provider.name} 
                  className="h-16 mx-auto mb-4" 
                />
                <p className="text-muted-foreground">
                  {provider.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {provider.services.map((service, index) => (
                  <Card key={index} className="cloud-card hover:border-primary/20">
                    <CardHeader>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Contact us to learn more about our {service.name} services and how they can benefit your business.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">Learn More</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-accent rounded-lg p-8 mt-8 shadow-md">
                <h3 className="text-xl font-medium mb-4">Why Choose Value M for {provider.name}?</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Certified {provider.name} experts with years of experience
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Proven track record of successful implementations
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Tailored solutions designed for your specific business needs
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Ongoing support and optimization to ensure maximum ROI
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Seamless integration with your existing infrastructure
                  </li>
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center py-10 px-6 rounded-xl cloud-gradient text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Ready to transform your cloud infrastructure?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact our team of cloud experts today to discuss how we can help you leverage the full potential of cloud technologies.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            Contact Us
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
