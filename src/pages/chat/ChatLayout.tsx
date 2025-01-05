import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/base/Button';
import { Text } from '@/components/base/Text';
import { Input } from '@/components/base/Input';
import UserSelectModal from '@/components/chat/UserSelectModal';
import { MessageSquare, Search, LogOut, Plus } from 'lucide-react';
import { chat } from '@/lib/supabase';
import ChatPage from './ChatPage';

interface Chat {
  id: string;
  participants: string[];
  last_message?: string;
  last_message_at?: string;
}

const ChatLayout = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isUserSelectModalOpen, setIsUserSelectModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sohbetleri yükle
  useEffect(() => {
    const loadChats = async () => {
      try {
        if (!user) return;
        const chatsData = await chat.getChats(user.id);
        setChats(chatsData);
      } catch (error) {
        console.error('Sohbetler yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();
  }, [user]);

  // Yeni sohbet oluştur
  const handleCreateChat = async (selectedUsers: string[]) => {
    try {
      if (!user) return;
      const participants = [user.id, ...selectedUsers];
      const newChat = await chat.createChat(participants);
      navigate(`/chats/${newChat.id}`);
      setIsUserSelectModalOpen(false);
    } catch (error) {
      console.error('Sohbet oluşturulurken hata:', error);
    }
  };

  // Çıkış yap
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sol Panel */}
      <div className="flex w-80 flex-col border-r bg-gray-50">
        {/* Başlık */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <Text variant="h3" size="lg" weight="bold">
              FlowChat
            </Text>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            aria-label="Çıkış Yap"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Arama ve Yeni Sohbet */}
        <div className="space-y-2 p-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Sohbet Ara..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button
            className="w-full"
            onClick={() => setIsUserSelectModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Sohbet
          </Button>
        </div>

        {/* Sohbet Listesi */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Text size="sm" color="muted">
                Yükleniyor...
              </Text>
            </div>
          ) : chats.length === 0 ? (
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Text size="sm" color="muted">
                Henüz hiç sohbetiniz yok.
                <br />
                Yeni bir sohbet başlatmak için yukarıdaki butonu kullanın.
              </Text>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {chats.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(`/chats/${chat.id}`)}
                >
                  <div className="flex flex-1 items-center space-x-3 overflow-hidden">
                    <div className="h-10 w-10 rounded-full bg-blue-100 p-2">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Text size="sm" weight="medium" className="truncate">
                        {chat.participants
                          .filter((id) => id !== user?.id)
                          .join(', ')}
                      </Text>
                      {chat.last_message && (
                        <Text
                          size="xs"
                          color="muted"
                          className="mt-0.5 truncate"
                        >
                          {chat.last_message}
                        </Text>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sağ Panel */}
      <div className="flex flex-1 flex-col">
        <Routes>
          <Route index element={<WelcomePage />} />
          <Route path=":chatId" element={<ChatPage />} />
        </Routes>
      </div>

      {/* Kullanıcı Seçme Modalı */}
      <UserSelectModal
        isOpen={isUserSelectModalOpen}
        onClose={() => setIsUserSelectModalOpen(false)}
        onSelect={handleCreateChat}
      />
    </div>
  );
};

// Hoş Geldiniz Sayfası
const WelcomePage = () => (
  <div className="flex h-full items-center justify-center">
    <div className="text-center">
      <Text variant="h2" size="2xl" weight="bold" className="mb-2">
        FlowChat'e Hoş Geldiniz!
      </Text>
      <Text size="sm" color="muted">
        Sohbete başlamak için sol menüden bir sohbet seçin veya yeni bir sohbet
        oluşturun.
      </Text>
    </div>
  </div>
);

export default ChatLayout; 