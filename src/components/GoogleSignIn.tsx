/**
 * Google Sign-In Component
 * 
 * IMPORTANT: Add VITE_GOOGLE_CLIENT_ID to .env file
 * Get from: https://console.cloud.google.com/apis/credentials
 */

import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Google Client ID (publishable - safe for frontend)
const GOOGLE_CLIENT_ID = '107063868685-bsc76l303te03md39qk2i331nehc2ih1.apps.googleusercontent.com';
const USE_MOCK = false;

interface GoogleSignInProps {
  onSuccess?: () => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

const GoogleSignIn = ({ onSuccess }: GoogleSignInProps) => {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const { googleLogin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load Google Sign-In script
    if (USE_MOCK || !GOOGLE_CLIENT_ID) {
      console.log('🎭 MOCK MODE or missing GOOGLE_CLIENT_ID - showing mock button');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: 'outline',
            size: 'large',
            width: 350,
            text: 'signin_with',
            logo_alignment: 'left',
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleResponse = async (response: any) => {
    try {
      const result = await googleLogin(response.credential);
      
      if (result.success) {
        toast({
          title: 'Welcome!',
          description: 'Successfully signed in with Google',
        });
        onSuccess?.();
      } else {
        toast({
          title: 'Sign-in failed',
          description: result.error || 'Please try again',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleMockLogin = async () => {
    try {
      const result = await googleLogin('mock_token');
      
      if (result.success) {
        toast({
          title: 'Mock Login Success',
          description: 'Logged in as demo user',
        });
        onSuccess?.();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Mock login failed',
        variant: 'destructive',
      });
    }
  };

  if (USE_MOCK || !GOOGLE_CLIENT_ID) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            {!GOOGLE_CLIENT_ID 
              ? 'Add VITE_GOOGLE_CLIENT_ID to .env file for real Google Sign-in'
              : 'Mock mode enabled - using demo credentials'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button
            onClick={handleMockLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
              <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
              <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
              <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
            </svg>
            <span className="font-medium text-gray-700">Sign in with Google (Mock)</span>
          </button>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Mock login will use demo credentials
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Continue with your Google account</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={googleButtonRef} className="flex justify-center"></div>
      </CardContent>
    </Card>
  );
};

export default GoogleSignIn;
