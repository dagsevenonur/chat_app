import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';
import { Text } from '@/components/base/Text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/base/Card';
import { Mail, MessageSquare, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validasyonu
    if (!email) {
      setError('Lütfen email adresinizi girin');
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email);
      setIsSent(true);
    } catch (err) {
      setError(authError || 'Şifre sıfırlama işlemi sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-4">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-full max-w-lg h-full max-h-lg rounded-full bg-blue-200/20 blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
            onClick={() => navigate('/login')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100/80">
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
          <div className="space-y-2">
            <CardTitle>
              <Text variant="h1" size="3xl" weight="bold" className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Şifremi Unuttum
              </Text>
            </CardTitle>
            <CardDescription>
              <Text variant="p" size="sm" color="muted">
                {isSent 
                  ? 'Şifre sıfırlama bağlantısı email adresinize gönderildi'
                  : 'Email adresinizi girin, size şifre sıfırlama bağlantısı gönderelim'
                }
              </Text>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isSent ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-green-50 p-4">
                <Text variant="p" size="sm" className="text-green-800">
                  Şifre sıfırlama bağlantısı <span className="font-medium">{email}</span> adresine gönderildi. 
                  Lütfen email kutunuzu kontrol edin.
                </Text>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => navigate('/login')}
                >
                  Giriş Sayfasına Dön
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsSent(false)}
                >
                  Tekrar Dene
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Text variant="p" size="sm" weight="medium" className="text-gray-700">
                  Email
                </Text>
                <Input
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="h-4 w-4 text-gray-500" />}
                  className="bg-white/50 transition-colors focus:bg-white"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                isDisabled={isLoading}
              >
                {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
              </Button>

              {error && (
                <div className="rounded-lg bg-red-50 p-4">
                  <Text variant="p" size="sm" className="text-red-800">
                    {error}
                  </Text>
                </div>
              )}

              <div className="text-center">
                <Text variant="p" size="sm" color="muted">
                  Şifrenizi hatırladınız mı?{' '}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => navigate('/login')}
                  >
                    Giriş Yap
                  </Button>
                </Text>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword; 