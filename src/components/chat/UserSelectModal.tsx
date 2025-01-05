import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Modal } from '@/components/base/Modal';
import { Button } from '@/components/base/Button';
import { Text } from '@/components/base/Text';
import { Avatar } from '@/components/base/Avatar';
import { Search } from 'lucide-react';

interface User {
  id: string;
  email: string;
  display_name: string;
}

interface UserSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (users: User[]) => void;
}

const UserSelectModal = ({ isOpen, onClose, onSelect }: UserSelectModalProps) => {
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Kullanıcıları yükle
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, display_name')
          .neq('id', currentUser?.id)
          .order('display_name');

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Kullanıcılar yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadUsers();
    }
  }, [isOpen, currentUser?.id]);

  const handleToggleUser = (user: User) => {
    setSelectedUsers((prev) => {
      const isSelected = prev.some((u) => u.id === user.id);
      if (isSelected) {
        return prev.filter((u) => u.id !== user.id);
      }
      return [...prev, user];
    });
  };

  const handleSubmit = () => {
    onSelect(selectedUsers);
    onClose();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kullanıcı Seç"
      description="Sohbete eklemek istediğiniz kullanıcıları seçin"
    >
      {/* Arama */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Kullanıcı ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Kullanıcı Listesi */}
      <div className="mb-4 max-h-[300px] overflow-y-auto">
        <div className="divide-y">
          {isLoading ? (
            <div className="py-4 text-center">
              <Text color="muted" size="sm">
                Kullanıcılar yükleniyor...
              </Text>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-4 text-center">
              <Text color="muted" size="sm">
                {searchQuery ? 'Sonuç bulunamadı' : 'Kullanıcı bulunamadı'}
              </Text>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = selectedUsers.some((u) => u.id === user.id);
              return (
                <button
                  key={user.id}
                  onClick={() => handleToggleUser(user)}
                  className={`flex w-full items-center gap-3 p-3 hover:bg-gray-50 ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <Avatar
                    size="sm"
                    alt={user.display_name}
                    fallback={user.display_name[0]}
                  />
                  <div className="flex-1 overflow-hidden text-left">
                    <Text weight="medium" className="truncate">
                      {user.display_name}
                    </Text>
                    <Text size="sm" color="muted" className="truncate">
                      {user.email}
                    </Text>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Alt Butonlar */}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          İptal
        </Button>
        <Button onClick={handleSubmit} isDisabled={selectedUsers.length === 0}>
          {selectedUsers.length} Kullanıcı Seç
        </Button>
      </div>
    </Modal>
  );
};

export default UserSelectModal; 