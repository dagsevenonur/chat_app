import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL ve Anon Key tanımlanmamış!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Message {
  id: string;
  content: string;
  sender_id: string;
  chat_id: string;
  created_at: string;
  image_url?: string;
}

interface Chat {
  id: string;
  created_at: string;
  last_message?: string;
  last_message_at?: string;
  participants: string[];
}

// Profil işlemleri
export const profile = {
  // Profil oluştur
  createProfile: async (userId: string, data: { display_name: string; email: string }) => {
    const { error } = await supabase
      .from('profiles')
      .insert([{ id: userId, ...data }]);

    if (error) throw error;
  },

  // Profil güncelle
  updateProfile: async (userId: string, data: { display_name?: string; email?: string }) => {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId);

    if (error) throw error;
  },

  // Profil getir
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Tüm profilleri getir
  getAllProfiles: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('display_name');

    if (error) throw error;
    return data;
  }
};

// Chat ve mesaj işlemleri
export const chat = {
  // Yeni sohbet oluştur
  createChat: async (participants: string[]) => {
    const { data, error } = await supabase
      .from('chats')
      .insert([{ participants }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Sohbetleri getir
  getChats: async (userId: string) => {
    const { data, error } = await supabase
      .from('chats')
      .select('*, messages:messages(*)')
      .contains('participants', [userId])
      .order('last_message_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Mesaj gönder
  sendMessage: async (chatId: string, senderId: string, content: string, imageUrl?: string) => {
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert([{
        chat_id: chatId,
        sender_id: senderId,
        content,
        image_url: imageUrl
      }])
      .select()
      .single();

    if (messageError) throw messageError;

    // Son mesajı güncelle
    const { error: updateError } = await supabase
      .from('chats')
      .update({
        last_message: content,
        last_message_at: new Date().toISOString()
      })
      .eq('id', chatId);

    if (updateError) throw updateError;

    return message;
  },

  // Mesajları getir
  getMessages: async (chatId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Mesajları dinle
  subscribeToMessages: (chatId: string, callback: (message: Message) => void) => {
    return supabase
      .channel(`chat:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  },

  // Sohbetleri dinle
  subscribeToChats: (userId: string, callback: (chat: Chat) => void) => {
    return supabase
      .channel(`user_chats:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chats',
          filter: `participants=cs.{${userId}}`
        },
        (payload) => {
          callback(payload.new as Chat);
        }
      )
      .subscribe();
  }
};

// Auth helper functions
export const auth = {
  // Giriş yap
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { session: data.session, error };
  },

  // Kayıt ol
  signUp: async (email: string, password: string, metadata?: { name: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: metadata?.name
        }
      }
    });

    if (error) {
      return { session: null, error };
    }

    // Profil oluştur
    if (data.user) {
      try {
        await profile.createProfile(data.user.id, {
          display_name: metadata?.name || 'İsimsiz Kullanıcı',
          email
        });
      } catch (profileError) {
        // Profil oluşturulamazsa kullanıcıyı sil
        await supabase.auth.admin.deleteUser(data.user.id);
        return { session: null, error: new Error('Profil oluşturulamadı') };
      }
    }

    return { session: data.session, error: null };
  },

  // Çıkış yap
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Şifre sıfırlama
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  },

  // Oturum kontrolü
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return session;
  },

  // Oturum değişikliği dinleme
  onAuthStateChange: (callback: (session: any) => void) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session);
    });
  },
}; 