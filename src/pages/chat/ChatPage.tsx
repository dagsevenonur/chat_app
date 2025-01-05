import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';
import { Text } from '@/components/base/Text';
import { Send } from 'lucide-react';
import { chat } from '@/lib/supabase';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  chat_id: string;
  created_at: string;
}

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mesajları yükle
  useEffect(() => {
    const loadMessages = async () => {
      if (!chatId) return;
      try {
        const messagesData = await chat.getMessages(chatId);
        setMessages(messagesData);
      } catch (error) {
        console.error('Mesajlar yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [chatId]);

  // Mesajları dinle
  useEffect(() => {
    if (!chatId) return;

    const subscription = chat.subscribeToMessages(chatId, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [chatId]);

  // Otomatik kaydırma
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mesaj gönder
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatId || !user || !newMessage.trim()) return;

    try {
      await chat.sendMessage(chatId, user.id, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Mesaj gönderilirken hata:', error);
    }
  };

  if (!chatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <Text size="sm" color="muted">
          Sohbet bulunamadı
        </Text>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Mesaj Listesi */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Text size="sm" color="muted">
              Yükleniyor...
            </Text>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <Text size="sm" color="muted">
              Henüz mesaj yok
            </Text>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender_id === user?.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <Text size="sm">{message.content}</Text>
                  <Text size="xs" color="muted" className="mt-1 opacity-75">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </Text>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Mesaj Gönderme Formu */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Mesajınızı yazın..."
            value={newMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewMessage(e.target.value)
            }
            className="flex-1"
          />
          <Button type="submit" isDisabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage; 