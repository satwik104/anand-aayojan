/**
 * AuthGate - Universal authentication wrapper
 * Shows login modal for any action that requires authentication
 * Resumes action after successful login
 */

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GoogleSignIn from './GoogleSignIn';

interface AuthGateProps {
  children: (execute: (action: () => void) => void) => React.ReactNode;
  onAuthenticated?: () => void;
  actionName?: string;
}

export const AuthGate = ({ children, onAuthenticated, actionName = 'this action' }: AuthGateProps) => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const execute = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAction(() => () => action());
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 100);
    }
    onAuthenticated?.();
  };

  return (
    <>
      {children(execute)}

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              You need to sign in to {actionName}. Your action will resume after signing in.
            </DialogDescription>
          </DialogHeader>
          <GoogleSignIn onSuccess={handleAuthSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
};

interface UseAuthGateReturn {
  requireAuth: (action: () => void, actionName?: string) => void;
  AuthModal: React.FC;
}

export const useAuthGate = (): UseAuthGateReturn => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [actionName, setActionName] = useState('continue');

  const requireAuth = (action: () => void, name: string = 'continue') => {
    if (isAuthenticated) {
      action();
    } else {
      setActionName(name);
      setPendingAction(() => () => action());
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 100);
    }
  };

  const AuthModal: React.FC = () => (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>
            You need to sign in to {actionName}. Your action will resume after signing in.
          </DialogDescription>
        </DialogHeader>
        <GoogleSignIn onSuccess={handleAuthSuccess} />
      </DialogContent>
    </Dialog>
  );

  return { requireAuth, AuthModal };
};
