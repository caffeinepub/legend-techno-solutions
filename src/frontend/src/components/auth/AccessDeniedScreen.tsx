import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Home } from 'lucide-react';
import LoginButton from './LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function AccessDeniedScreen() {
  const { identity } = useInternetIdentity();

  const goHome = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            {identity
              ? 'You do not have permission to access the admin dashboard.'
              : 'Please log in to access the admin dashboard.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!identity && (
            <div className="flex justify-center">
              <LoginButton />
            </div>
          )}
          <Button onClick={goHome} variant="outline" className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
