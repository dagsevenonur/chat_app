import { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { auth } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mevcut oturumu kontrol et
    const checkSession = async () => {
      try {
        const session = await auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Oturum kontrolü sırasında hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Oturum değişikliklerini dinle
    const { data: { subscription } } = auth.onAuthStateChange((_event: string, session: Session | null) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Giriş yap
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await auth.signIn(email, password);
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Giriş yapılırken bir hata oluştu');
    }
  };

  // Kayıt ol
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await auth.signUp(email, password, { name });
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Kayıt olurken bir hata oluştu');
    }
  };

  // Çıkış yap
  const signOut = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Çıkış yapılırken bir hata oluştu');
    }
  };

  // Şifre sıfırlama
  const resetPassword = async (email: string) => {
    try {
      const { error } = await auth.resetPassword(email);
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Şifre sıfırlanırken bir hata oluştu');
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 