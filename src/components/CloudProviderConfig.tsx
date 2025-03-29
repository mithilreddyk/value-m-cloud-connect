
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudIntegrationConfig } from "@/utils/cloudIntegrations/types";
import { getProviderIcon } from "@/utils/cloudIntegrations";

interface CloudProviderConfigProps {
  providerId: string;
  providerName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (config: CloudIntegrationConfig) => Promise<boolean>;
  isConfiguring: boolean;
}

const CloudProviderConfig: React.FC<CloudProviderConfigProps> = ({
  providerId,
  providerName,
  isOpen,
  onClose,
  onConfirm,
  isConfiguring,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [region, setRegion] = useState("");
  const [additionalField, setAdditionalField] = useState("");
  const icon = getProviderIcon(providerId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey) return;

    const config: CloudIntegrationConfig = {
      apiKey,
      region: region || undefined,
    };

    // Add provider-specific fields
    if (providerId === "aws" || providerId === "azure") {
      config.accountId = additionalField || undefined;
    } else if (providerId === "gcp") {
      config.projectId = additionalField || undefined;
    }

    const success = await onConfirm(config);
    if (success) {
      onClose();
    }
  };

  // Determine additional field name based on provider
  const getAdditionalFieldName = () => {
    switch (providerId) {
      case "aws":
        return "Account ID";
      case "azure":
        return "Tenant ID";
      case "gcp":
        return "Project ID";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            Configure {providerName}
          </DialogTitle>
          <DialogDescription>
            Enter your API credentials to connect to {providerName}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter your ${providerName} API Key`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region (Optional)</Label>
            <Input
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g., us-east-1"
            />
          </div>

          {getAdditionalFieldName() && (
            <div className="space-y-2">
              <Label htmlFor="additionalField">{getAdditionalFieldName()} (Optional)</Label>
              <Input
                id="additionalField"
                value={additionalField}
                onChange={(e) => setAdditionalField(e.target.value)}
                placeholder={`Enter your ${getAdditionalFieldName()}`}
              />
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isConfiguring}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!apiKey || isConfiguring}>
              {isConfiguring ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CloudProviderConfig;
