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

// Google Client ID from environment
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

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
    if (!GOOGLE_CLIENT_ID) {
      console.warn('⚠️ VITE_GOOGLE_CLIENT_ID not configured');
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
          ux_mode: 'popup',
          allowed_parent_origin: [window.location.origin],
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

  if (!GOOGLE_CLIENT_ID) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Configuration Required</CardTitle>
          <CardDescription>
            Add VITE_GOOGLE_CLIENT_ID to .env file to enable Google Sign-in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Google Sign-In requires configuration. Please add your Google Client ID to the .env file.
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
