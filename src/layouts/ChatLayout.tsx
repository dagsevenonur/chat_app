import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { chat } from '@/lib/supabase';
import { Button } from '@/components/base/Button';
import { Text } from '@/components/base/Text';
import { Avatar } from '@/components/base/Avatar';
import { MessageSquare, LogOut, Search, Settings, Plus } from 'lucide-react';
import UserSelectModal from '@/components/chat/UserSelectModal';

interface Chat {
  id: string;
  created_at: string;
  last_message?: string;
  last_message_at?: string;
  participants: string[];
}

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserSelectModalOpen, setIsUserSelectModalOpen] = useState(false);

  // Sohbetleri yükle
  useEffect(() => {
    const loadChats = async () => {
      if (!user) return;

      try {
        const chats = await chat.getChats(user.id);
        setChats(chats);
      } catch (error) {
        console.error('Sohbetler yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();
  }, [user]);

  // Sohbet değişikliklerini dinle
  useEffect(() => {
    if (!user) return;

    const subscription = chat.subscribeToChats(user.id, (updatedChat) => {
      setChats((prev) => {
        const index = prev.findIndex((c) => c.id === updatedChat.id);
        if (index === -1) {
          return [...prev, updatedChat];
        }
        const newChats = [...prev];
        newChats[index] = updatedChat;
        return newChats.sort((a, b) => {
          const dateA = a.last_message_at || a.created_at;
          const dateB = b.last_message_at || b.created_at;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleCreateChat = async (selectedUsers: { id: string }[]) => {
    if (!user) return;

    try {
      const participants = [user.id, ...selectedUsers.map((u) => u.id)];
      const newChat = await chat.createChat(participants);
      navigate(`/chats/${newChat.id}`);
    } catch (error) {
      console.error('Sohbet oluşturulurken hata:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  const formatLastMessageDate = (date?: string) => {
    if (!date) return '';

    const messageDate = new Date(date);
    const now = new Date();
    const diff = now.getTime() - messageDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return messageDate.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (days === 1) {
      return 'Dün';
    } else if (days < 7) {
      return messageDate.toLocaleDateString('tr-TR', { weekday: 'long' });
    } else {
      return messageDate.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'short'
      });
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sol Sidebar */}
      <div className="flex w-80 flex-col border-r bg-white">
        {/* Üst Başlık */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <Text variant="h3" size="lg" weight="bold">
              FlowChat
            </Text>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Profil Bilgisi */}
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <Avatar
              size="md"
              alt={user?.user_metadata.display_name || 'User'}
              fallback={(user?.user_metadata.display_name || 'U')[0]}
            />
            <div className="flex-1 overflow-hidden">
              <Text weight="medium" className="truncate">
                {user?.user_metadata.display_name || 'İsimsiz Kullanıcı'}
              </Text>
              <Text size="sm" color="muted" className="truncate">
                {user?.email}
              </Text>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Arama ve Yeni Sohbet */}
        <div className="border-b p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Sohbet ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <Button size="sm" onClick={() => setIsUserSelectModalOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sohbet Listesi */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {isLoading ? (
              <div className="p-4">
                <Text color="muted" size="sm" className="text-center">
                  Sohbetler yükleniyor...
                </Text>
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="p-4">
                <Text color="muted" size="sm" className="text-center">
                  {searchQuery ? 'Sonuç bulunamadı' : 'Henüz sohbet yok'}
                </Text>
              </div>
            ) : (
              filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => navigate(`/chats/${chat.id}`)}
                  className="flex w-full items-center gap-3 p-4 hover:bg-gray-50"
                >
                  <Avatar
                    size="md"
                    alt="Chat"
                    fallback={<MessageSquare className="h-5 w-5" />}
                  />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Text weight="medium" className="truncate">
                        Sohbet {chat.id.slice(0, 8)}
                      </Text>
                      {chat.last_message_at && (
                        <Text size="xs" color="muted">
                          {formatLastMessageDate(chat.last_message_at)}
                        </Text>
                      )}
                    </div>
                    <Text
                      size="sm"
                      color="muted"
                      className="truncate"
                    >
                      {chat.last_message || 'Yeni sohbet'}
                    </Text>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex flex-1 flex-col">
        {children}
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

export default ChatLayout; 