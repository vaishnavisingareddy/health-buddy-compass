import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Key, CheckCircle } from "lucide-react";

interface GeminiConfigProps {
  onApiKeySet?: () => void;
}

export function GeminiConfig({ onApiKeySet }: GeminiConfigProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSet, setIsSet] = useState(false);

  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      // In a real app, you'd want to store this securely
      // For demo purposes, we'll use localStorage
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsSet(true);
      onApiKeySet?.();
    }
  };

  const currentKey = import.meta.env.VITE_GEMINI_API_KEY;
  const hasEnvKey = currentKey && currentKey !== 'your_gemini_api_key_here';

  if (hasEnvKey || isSet) {
    return (
      <Alert className="mb-4">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          ✅ Gemini AI is configured and ready to provide personalized health responses!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="p-4 mb-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          <h3 className="font-semibold">Enable AI-Powered Responses</h3>
        </div>
        
        <p className="text-sm text-gray-600">
          To get personalized, contextual health advice instead of generic responses, 
          please add your Google Gemini API key.
        </p>

        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Enter your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSetApiKey} disabled={!apiKey.trim()}>
            Set Key
          </Button>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>
            • Get your free API key from{" "}
            <a 
              href="https://makersuite.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-500 hover:underline inline-flex items-center gap-1"
            >
              Google AI Studio <ExternalLink className="h-3 w-3" />
            </a>
          </p>
          <p>• Your key is stored locally and never shared</p>
          <p>• Without this, you'll get basic predefined responses</p>
        </div>
      </div>
    </Card>
  );
}
