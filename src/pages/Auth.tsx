import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import GoogleSignIn from '@/components/GoogleSignIn';
import EmailAuth from '@/components/EmailAuth';
import { Separator } from '@/components/ui/separator';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSuccess = () => {
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-festive">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold font-serif mb-2">Welcome to AnandAyojan</h1>
          <p className="text-muted-foreground">Book trusted services for your special moments</p>
        </div>

        <EmailAuth onSuccess={handleSuccess} />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <GoogleSignIn onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default Auth;
