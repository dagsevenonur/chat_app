# Modern Chat Uygulaması

Modern, gerçek zamanlı bir chat uygulaması. React ve Supabase kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Kullanıcı Yönetimi
- Email/şifre ile kimlik doğrulama
- Kullanıcı profili (avatar, durum)
- Çevrimiçi/çevrimdışı durum göstergesi

### Mesajlaşma
- Birebir gerçek zamanlı sohbet
- Maksimum mesaj uzunluğu: 200 karakter
- Resim paylaşımı desteği
  - Maksimum boyut: 20MB
  - Desteklenen formatlar: PNG, JPG, JPEG
- Okundu bildirimi
- Yazıyor... göstergesi

### Arayüz
- Modern ve minimal tasarım
- Koyu/Açık tema desteği
- Tam responsive tasarım
- Yumuşak geçiş animasyonları

## 🛠️ Teknoloji Stack

- **Frontend:**
  - React
  - TypeScript
  - TailwindCSS
  - Shadcn/ui

- **Backend & Veritabanı:**
  - Supabase
    - Auth
    - Database
    - Storage
    - Realtime

## 📦 Veritabanı Yapısı

### Tablolar

#### profiles
- id (uuid, primary key)
- username (text, unique)
- avatar_url (text)
- status (text)
- last_seen (timestamp)
- created_at (timestamp)

#### chats
- id (uuid, primary key)
- created_at (timestamp)
- updated_at (timestamp)

#### chat_participants
- id (uuid, primary key)
- chat_id (uuid, foreign key)
- profile_id (uuid, foreign key)
- created_at (timestamp)

#### messages
- id (uuid, primary key)
- chat_id (uuid, foreign key)
- sender_id (uuid, foreign key)
- content (text, max 200 char)
- type (text: 'text' | 'image')
- image_url (text)
- is_edited (boolean)
- created_at (timestamp)
- updated_at (timestamp)

#### message_status
- id (uuid, primary key)
- message_id (uuid, foreign key)
- profile_id (uuid, foreign key)
- is_delivered (boolean)
- is_read (boolean)
- delivered_at (timestamp)
- read_at (timestamp)

## 🎨 UI Renk Paleti

```css
Primary: #3B82F6 (mavi)
Secondary: #6366F1 (indigo)
Background (Light): #FFFFFF
Background (Dark): #111827
Text (Light): #1F2937
Text (Dark): #F9FAFB
```

## 🔒 Güvenlik

- Row Level Security (RLS) politikaları
- Resim yükleme validasyonları
- Rate limiting
- Input sanitization

## 📱 Responsive Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🚀 Kurulum

1. Repoyu klonlayın
```bash
git clone [repo-url]
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Supabase projesini oluşturun ve environment değişkenlerini ayarlayın
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

## 📝 Yapılacaklar

- [ ] Proje kurulumu
- [ ] Supabase entegrasyonu
- [ ] Veritabanı tablolarının oluşturulması
- [ ] Auth sisteminin kurulması
- [ ] Temel UI bileşenlerinin oluşturulması
- [ ] Chat fonksiyonlarının implementasyonu
- [ ] Realtime özelliklerin eklenmesi
- [ ] Resim yükleme sisteminin kurulması
- [ ] Tema desteğinin eklenmesi
- [ ] Test ve optimizasyon 