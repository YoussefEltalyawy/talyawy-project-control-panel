
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { checkProjectStatus } from "@/pages/api/project-status";
import { ProjectStatusResponse } from "@/types/project";

export function ApiTester() {
  const [licenseKey, setLicenseKey] = useState("");
  const [result, setResult] = useState<ProjectStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!licenseKey.trim()) return;
    
    setLoading(true);
    try {
      const response = await checkProjectStatus(licenseKey);
      setResult(response);
    } catch (error) {
      console.error("Error checking license:", error);
      setResult({
        status: "error",
        message: "An unexpected error occurred"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!result) return "";
    
    switch (result.status) {
      case "active":
        return "text-green-600";
      case "locked":
        return "text-red-600";
      case "error":
        return "text-orange-600";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Test Tool</CardTitle>
        <CardDescription>
          Test the public API endpoint with a license key
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Enter license key"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleCheck}
            disabled={!licenseKey.trim() || loading}
          >
            {loading ? "Checking..." : "Check Status"}
          </Button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 rounded-md bg-gray-50">
            <h3 className="text-sm font-semibold mb-2">API Response:</h3>
            <pre className="bg-black text-white p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
            <p className={`mt-4 font-medium ${getStatusColor()}`}>
              Status: {result.status}
              {result.message && <span className="block text-sm mt-1">{result.message}</span>}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        In production, use: GET /api/project-status?license=YOUR_LICENSE_KEY
      </CardFooter>
    </Card>
  );
}
