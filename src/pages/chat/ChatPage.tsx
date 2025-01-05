import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { chat } from '@/lib/supabase';
import { Button } from '@/components/base/Button';
import { Text } from '@/components/base/Text';
import { Avatar } from '@/components/base/Avatar';
import { Send, Image } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  chat_id: string;
  created_at: string;
  image_url?: string;
}

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mesajları yükle
  useEffect(() => {
    const loadMessages = async () => {
      if (!chatId) return;

      try {
        const messages = await chat.getMessages(chatId);
        setMessages(messages);
      } catch (error) {
        console.error('Mesajlar yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [chatId]);

  // Yeni mesajları dinle
  useEffect(() => {
    if (!user || !chatId) return;

    const subscription = chat.subscribeToMessages(chatId, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, chatId]);

  // Mesaj listesi güncellendiğinde en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || !chatId) return;

    try {
      await chat.sendMessage(chatId, user.id, message.trim());
      setMessage('');
    } catch (error) {
      console.error('Mesaj gönderilirken hata:', error);
    }
  };

  const formatMessageDate = (date: string) => {
    return new Date(date).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Üst Başlık */}
      <div className="flex items-center justify-between border-b bg-white p-4">
        <div>
          <Text variant="h4" size="lg" weight="medium">
            Sohbet {chatId?.slice(0, 8)}
          </Text>
          <Text size="sm" color="muted">
            {messages.length} mesaj
          </Text>
        </div>
      </div>

      {/* Mesaj Listesi */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex justify-center">
              <Text color="muted" size="sm">
                Mesajlar yükleniyor...
              </Text>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center">
              <Text color="muted" size="sm">
                Henüz mesaj yok
              </Text>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender_id === user?.id ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar
                  size="sm"
                  alt={msg.sender_id === user?.id ? user.user_metadata.display_name : 'User'}
                  fallback={(msg.sender_id === user?.id ? user.user_metadata.display_name : 'U')[0]}
                />
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender_id === user?.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.image_url && (
                    <img
                      src={msg.image_url}
                      alt="Mesaj resmi"
                      className="mb-2 max-h-60 rounded-lg object-cover"
                    />
                  )}
                  <Text size="sm">{msg.content}</Text>
                  <Text size="xs" color="muted" className="mt-1 text-right">
                    {formatMessageDate(msg.created_at)}
                  </Text>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Mesaj Gönderme */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-shrink-0"
          >
            <Image className="h-5 w-5" />
          </Button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Bir mesaj yazın..."
            className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <Button
            type="submit"
            size="sm"
            className="flex-shrink-0"
            isDisabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage; 