
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const cloudServices = [
    {
      name: "AWS",
      description: "Amazon Web Services cloud solutions for businesses of all sizes.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    },
    {
      name: "Salesforce",
      description: "Customer relationship management platform and cloud solutions.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    },
    {
      name: "Google Cloud",
      description: "Google's suite of cloud computing services for enterprise.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    },
    {
      name: "Oracle Cloud",
      description: "Enterprise cloud applications and platform services.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    },
    {
      name: "Microsoft Azure",
      description: "Microsoft's cloud computing service for building and managing applications.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative cloud-gradient py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-md">
            Value M
          </h1>
          <p className="mt-2 text-2xl text-white/90 font-medium">
            the cloud company
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
            Your trusted partner for AWS, Salesforce, Google Cloud, Oracle, and Azure services.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link to="/services">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                Explore Services
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-yellow-300 hover:bg-white/10 hover:text-yellow-200 shadow-md font-bold">
                Client Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cloud Services Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Cloud Services
            </h2>
            <p className="section-subtitle">
              Value M provides comprehensive cloud solutions across major platforms to meet all your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cloudServices.map((service) => (
              <Card key={service.name} className="cloud-card">
                <CardContent className="p-6">
                  <div className="h-12 mb-6 flex items-center">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mt-2">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/services">
              <Button variant="default" className="group shadow-md">
                View all services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-accent/50 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Why Choose Value M
            </h2>
            <p className="section-subtitle">
              We deliver exceptional cloud solutions with expertise and dedication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
              <div className="rounded-full bg-primary/10 p-5 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Fast Implementation
              </h3>
              <p className="mt-2 text-muted-foreground">
                Rapid deployment of cloud solutions to minimize business disruption.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
              <div className="rounded-full bg-primary/10 p-5 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Enhanced Security
              </h3>
              <p className="mt-2 text-muted-foreground">
                Advanced security protocols to protect your data and applications.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
              <div className="rounded-full bg-primary/10 p-5 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Cost Optimization
              </h3>
              <p className="mt-2 text-muted-foreground">
                Strategic cloud management to reduce costs while maximizing benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl cloud-gradient p-12 shadow-xl">
            <div className="md:flex md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your cloud infrastructure?
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Our team of experts is ready to help you navigate the complexities of modern cloud environments.
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:ml-6 flex space-x-4">
                <Link to="/login">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                    <span className="text-primary">Client Portal</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
