import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import ChatLayout from '@/layouts/ChatLayout';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ChatPage from '@/pages/chat/ChatPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Yükleniyor...</h2>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Yükleniyor...</h2>
        </div>
      </div>
    );
  }

  return !user ? <>{children}</> : <Navigate to="/chats" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/chats" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <ChatLayout>
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <h2 className="mb-2 text-2xl font-semibold">
                        FlowChat'e Hoş Geldiniz!
                      </h2>
                      <p className="text-gray-600">
                        Sohbete başlamak için sol menüden bir sohbet seçin veya yeni bir sohbet oluşturun.
                      </p>
                    </div>
                  </div>
                </ChatLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/chats/:chatId"
            element={
              <ProtectedRoute>
                <ChatLayout>
                  <ChatPage />
                </ChatLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/chats" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
