import { useState } from 'react';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';
import { Text } from '@/components/base/Text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/base/Card';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Login işlemi
    console.log('Login:', { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            <Text variant="h1" size="3xl" weight="bold" color="primary">
              FlowChat
            </Text>
          </CardTitle>
          <CardDescription>
            <Text variant="p" size="sm" color="muted">
              Hesabınıza giriş yapın
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Text variant="p" size="sm" weight="medium">
                Email
              </Text>
              <Input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Text variant="p" size="sm" weight="medium">
                  Şifre
                </Text>
                <Button variant="ghost" size="sm">
                  Şifremi Unuttum
                </Button>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
              />
            </div>

            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>

            <div className="text-center">
              <Text variant="p" size="sm" color="muted">
                Hesabınız yok mu?{' '}
                <Button variant="ghost" size="sm">
                  Kayıt Ol
                </Button>
              </Text>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 