import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';
import { Text } from '@/components/base/Text';

const Register = () => {
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signUp(email, password, name);
    } catch (err: any) {
      setError(err.message || 'Kayıt olurken bir hata oluştu');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Başlık */}
            <div className="text-center">
              <Text variant="h3" size="2xl" weight="bold">
                Hesap Oluştur
              </Text>
              <Text size="sm" color="muted">
                FlowChat'e katılmak için kayıt olun
              </Text>
            </div>

            {/* Hata Mesajı */}
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <Text size="sm" color="error">
                  {error}
                </Text>
              </div>
            )}

            {/* Form Alanları */}
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  label="Ad Soyad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  isRequired
                />
              </div>

              <div>
                <Input
                  type="email"
                  label="E-posta"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  isRequired
                />
              </div>

              <div>
                <Input
                  type="password"
                  label="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  isRequired
                />
              </div>
            </div>

            {/* Butonlar */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Kayıt Ol
              </Button>

              <div className="text-center">
                <Text size="sm" color="muted">
                  Zaten hesabınız var mı?{' '}
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Giriş Yap
                    </Button>
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register; 