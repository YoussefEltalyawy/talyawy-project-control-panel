
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useProjects } from "@/context/ProjectContext";

export function WebsiteLockDocs() {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0].id : '');
  const [apiUrl, setApiUrl] = useState('https://your-api-domain.com');
  
  const getSelectedProject = () => {
    return projects.find(p => p.id === selectedProject);
  };
  
  const project = getSelectedProject();
  
  const handleCopyCode = () => {
    if (!project) return;
    
    const codeSnippet = `
// Add this to the main component of your website (like App.js or _app.js)
// This should wrap your entire application

import React, { useEffect, useState } from 'react';

function WebsiteLockChecker({ apiUrl, licenseKey, children }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(\`\${apiUrl}/api/project-status?license=\${licenseKey}\`);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Error checking license status:", error);
        setStatus({
          status: "error",
          message: "Failed to verify license. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [apiUrl, licenseKey]);

  if (loading) {
    return (
      <div style={{
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(255,255,255,0.8)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>
          {
            '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }'
          }
        </style>
      </div>
    );
  }

  if (status?.status === "locked") {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          maxWidth: '28rem',
          margin: '0 1rem',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1rem auto',
            color: '#ef4444'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Website Locked
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
            {status.message || "This website has been locked."}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Please contact the website administrator for assistance.
          </p>
        </div>
      </div>
    );
  }

  if (status?.status === "error") {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(254, 252, 232, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          maxWidth: '28rem',
          margin: '0 1rem',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1rem auto',
            color: '#eab308'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Verification Error
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
            {status.message || "Failed to verify website access."}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Please contact the website administrator for assistance.
          </p>
        </div>
      </div>
    );
  }

  // If active, render the children (the actual website content)
  return <>{children}</>;
}

// Implementation in your main app:
function App() {
  return (
    <WebsiteLockChecker 
      apiUrl="${apiUrl}"
      licenseKey="${project?.license_key || 'YOUR_LICENSE_KEY'}"
    >
      {/* Your entire website content goes here */}
      <div>
        <header>Your Website Header</header>
        <main>Your Website Content</main>
        <footer>Your Website Footer</footer>
      </div>
    </WebsiteLockChecker>
  );
}
`;

    navigator.clipboard.writeText(codeSnippet);
    toast.success("Code snippet copied to clipboard!");
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Website Locking Implementation</CardTitle>
        <CardDescription>
          Copy this code to implement website locking in your projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select a Project
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API URL (your dashboard domain)
            </label>
            <Input
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://your-api-domain.com"
            />
          </div>
          
          {project && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Project Details:</h3>
              <p><strong>Name:</strong> {project.name}</p>
              <p className="font-mono text-sm truncate mb-1">
                <strong>License Key:</strong> {project.license_key}
              </p>
              <p>
                <strong>Status:</strong> {' '}
                <span className={project.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                  {project.status}
                </span>
              </p>
            </div>
          )}
          
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Implementation Code:</h3>
              <Button variant="outline" size="sm" onClick={handleCopyCode}>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy Code
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Add this code to the main component of your website to implement the locking mechanism.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 text-sm text-gray-500">
        The API endpoint will be: {apiUrl}/api/project-status?license={project?.license_key || 'YOUR_LICENSE_KEY'}
      </CardFooter>
    </Card>
  );
}
