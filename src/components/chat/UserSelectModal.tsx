import { useState, useEffect } from 'react';
import { Modal } from '@/components/base/Modal';
import { Button } from '@/components/base/Button';
import { Input } from '@/components/base/Input';
import { Text } from '@/components/base/Text';
import { Search, User } from 'lucide-react';
import { profile } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface UserSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedUsers: string[]) => void;
}

interface Profile {
  id: string;
  display_name: string;
  email: string;
}

const UserSelectModal = ({ isOpen, onClose, onSelect }: UserSelectModalProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<Profile[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Kullanıcıları yükle
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const profiles = await profile.getAllProfiles();
        // Mevcut kullanıcıyı listeden çıkar
        setUsers(profiles.filter((p) => p.id !== user?.id));
      } catch (error) {
        console.error('Kullanıcılar yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadUsers();
    }
  }, [isOpen, user?.id]);

  // Kullanıcı seç/seçimi kaldır
  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Filtrelenmiş kullanıcılar
  const filteredUsers = users.filter(
    (user) =>
      user.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Seçimi onayla
  const handleConfirm = () => {
    onSelect(selectedUsers);
    setSelectedUsers([]);
    setSearchQuery('');
  };

  // Modalı kapat
  const handleClose = () => {
    onClose();
    setSelectedUsers([]);
    setSearchQuery('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Kullanıcı Seç"
      description="Sohbet başlatmak istediğiniz kullanıcıları seçin"
    >
      <div className="space-y-4">
        {/* Arama */}
        <Input
          type="text"
          placeholder="Kullanıcı Ara..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          leftIcon={<Search className="h-4 w-4" />}
        />

        {/* Kullanıcı Listesi */}
        <div className="max-h-[300px] space-y-2 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Text size="sm" color="muted">
                Yükleniyor...
              </Text>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex items-center justify-center py-4">
              <Text size="sm" color="muted">
                Kullanıcı bulunamadı
              </Text>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <Button
                key={user.id}
                variant={selectedUsers.includes(user.id) ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => toggleUser(user.id)}
              >
                <div className="flex flex-1 items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Text size="sm" weight="medium">
                      {user.display_name}
                    </Text>
                    <Text size="xs" color="muted">
                      {user.email}
                    </Text>
                  </div>
                </div>
              </Button>
            ))
          )}
        </div>

        {/* Butonlar */}
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={handleClose}>
            İptal
          </Button>
          <Button
            onClick={handleConfirm}
            isDisabled={selectedUsers.length === 0}
          >
            Sohbet Başlat
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserSelectModal; 