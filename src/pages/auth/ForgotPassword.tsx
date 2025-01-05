import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';
import { Text } from '@/components/base/Text';

const ForgotPassword = () => {
  const { resetPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Şifre sıfırlama işlemi sırasında bir hata oluştu');
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
                Şifremi Unuttum
              </Text>
              <Text size="sm" color="muted">
                Şifrenizi sıfırlamak için e-posta adresinizi girin
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

            {/* Başarı Mesajı */}
            {success && (
              <div className="rounded-md bg-green-50 p-3">
                <Text size="sm" color="success">
                  Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
                </Text>
              </div>
            )}

            {/* Form Alanları */}
            <div className="space-y-4">
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
            </div>

            {/* Butonlar */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Şifremi Sıfırla
              </Button>

              <div className="text-center">
                <Text size="sm" color="muted">
                  Giriş yapmak için{' '}
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      tıklayın
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

export default ForgotPassword; 