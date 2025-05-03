
import React, { useEffect, useState } from 'react';
import { ProjectStatusResponse } from '@/types/project';

interface WebsiteLockCheckerProps {
  apiUrl: string;
  licenseKey: string;
  children: React.ReactNode;
}

interface LockScreenProps {
  message: string;
}

const LockScreen: React.FC<LockScreenProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-red-600 flex items-center justify-center flex-col z-50">
      <div className="bg-white p-8 rounded-lg max-w-md mx-4 text-center shadow-2xl">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 text-red-600 mx-auto mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
          />
        </svg>
        <h2 className="text-2xl font-bold mb-4">Website Locked</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <p className="text-sm text-gray-500">Please contact the website administrator for assistance.</p>
      </div>
    </div>
  );
};

const ErrorScreen: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-yellow-50 flex items-center justify-center flex-col z-50">
      <div className="bg-white p-8 rounded-lg max-w-md mx-4 text-center shadow-2xl">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 text-yellow-500 mx-auto mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        <h2 className="text-2xl font-bold mb-4">Verification Error</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <p className="text-sm text-gray-500">Please contact the website administrator for assistance.</p>
      </div>
    </div>
  );
};

export const WebsiteLockChecker: React.FC<WebsiteLockCheckerProps> = ({ 
  apiUrl, 
  licenseKey,
  children 
}) => {
  const [status, setStatus] = useState<ProjectStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/project-status?license=${licenseKey}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: ProjectStatusResponse = await response.json();
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
    // Show loading state - could be customized
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status?.status === "locked") {
    return <LockScreen message={status.message || "This website has been locked."} />;
  }

  if (status?.status === "error") {
    return <ErrorScreen message={status.message || "Failed to verify website access."} />;
  }

  // If active, render the children (the actual website content)
  return <>{children}</>;
};

// Export a ready-to-use code snippet that can be copied into other projects
export const getWebsiteLockCode = (apiUrl: string, licenseKey: string): string => {
  return `
import { WebsiteLockChecker } from 'path-to-your-component';

function App() {
  return (
    <WebsiteLockChecker 
      apiUrl="${apiUrl}"
      licenseKey="${licenseKey}"
    >
      {/* Your entire website content goes here */}
      <YourWebsiteContent />
    </WebsiteLockChecker>
  );
}

export default App;
`;
};
