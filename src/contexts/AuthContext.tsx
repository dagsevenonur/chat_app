import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // İlk yüklemede oturumu kontrol et
    const initSession = async () => {
      try {
        const session = await auth.getSession();
        if (session) {
          setSession(session);
          setUser(session.user || null);
          
          // Sadece auth sayfalarındaysa yönlendir
          if (location.pathname === '/login' || location.pathname === '/register') {
            navigate('/chats');
          }
        }
      } catch (error) {
        console.error('Oturum kontrolü sırasında hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    // Oturum değişikliklerini dinle
    const { data: { subscription } } = auth.onAuthStateChange((session) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);

      if (session) {
        // Sadece auth sayfalarındaysa yönlendir
        if (location.pathname === '/login' || location.pathname === '/register') {
          navigate('/chats');
        }
      } else {
        // Sadece korumalı sayfalardaysa yönlendir
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { session, error } = await auth.signIn(email, password);
      if (error) throw error;
      
      setSession(session);
      setUser(session?.user || null);
      navigate('/chats');
    } catch (error) {
      console.error('Giriş sırasında hata:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { session, error } = await auth.signUp(email, password, { name });
      if (error) throw error;

      setSession(session);
      setUser(session?.user || null);
      navigate('/chats');
    } catch (error) {
      console.error('Kayıt sırasında hata:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await auth.signOut();
      if (error) throw error;
      
      setSession(null);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Çıkış sırasında hata:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await auth.resetPassword(email);
      if (error) throw error;
    } catch (error) {
      console.error('Şifre sıfırlama sırasında hata:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 