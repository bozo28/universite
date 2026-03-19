\# AI Destekli Üniversite Hazırlık Uygulaması (TYT \- AYT) \- Ürün ve Teknik Doküman

\#\# 1\. Proje Özeti

Bu proje, üniversite sınavına (TYT \+ AYT) hazırlanan öğrenciler için geliştirilmiş, mobil uyumlu (PWA) bir web uygulamasıdır.

Uygulama; yapay zeka destekli konu anlatımı, soru üretimi ve soru çözümü özellikleri sunar. Kullanıcılar kredi sistemi ile bu özellikleri kullanır.

\---

\#\# 2\. Hedef Kullanıcı

\- TYT ve AYT’ye hazırlanan öğrenciler  
\- Mobil cihaz üzerinden çalışan kullanıcılar  
\- Hızlı, sade ve etkili öğrenme deneyimi isteyen kullanıcılar

\---

\#\# 3\. Platform

\- PWA (Progressive Web App)  
\- Mobil öncelikli tasarım (mobile-first)  
\- Daha sonra Android WebView ile Google Play’e dönüştürülebilir

\---

\#\# 4\. Kullanıcı Kimlik Doğrulama (Auth)

\#\#\# Özellikler:  
\- Kayıt Ol (Email \+ Şifre)  
\- Giriş Yap  
\- Mail doğrulama (email verification)  
\- Şifremi Unuttum  
\- Şifre sıfırlama maili gönderimi

\---

\#\# 5\. Ana Menü Yapısı

Uygulamada 3 ana bölüm bulunur:

1\. Konu Anlatımı  
2\. Soru Bankası  
3\. AI Sor

Ek:  
\- Profil  
\- Kredi Satın Al

\---

\#\# 6\. Ders ve Konu Yapısı

Uygulama TYT ve AYT derslerini kapsar.

Dersler ve konular sabit kodlanmamalı, veri tabanından veya JSON yapısından dinamik olarak okunmalıdır.

\#\#\# Örnek: TYT Tarih Konuları

\- Tarih ve Zaman  
\- İnsanlığın İlk Dönemleri  
\- Orta Çağ’da Dünya  
\- İlk ve Orta Çağlarda Türk Dünyası  
\- İslam Medeniyetinin Doğuşu  
\- Türk-İslam Devletleri  
\- Türkiye Tarihi (Anadolu)  
\- Osmanlı Kuruluş Dönemi  
\- Osmanlı Yükselme Dönemi  
\- Osmanlı Duraklama ve Gerileme  
\- Osmanlı Kültür ve Medeniyet  
\- XX. Yüzyıl Başlarında Osmanlı  
\- Kurtuluş Savaşı Hazırlık Dönemi

Bu liste örnek amaçlıdır ve sistem genişletilebilir olmalıdır.

\---

\#\# 7\. Konu Anlatımı Sistemi

\#\#\# Akış:

\- Kullanıcı ders seçer  
\- Konu başlığı seçer  
\- “AI Konu Anlat” butonuna tıklar  
\- Konu aşağı doğru açılır şekilde anlatılır

\#\#\# Butonlar:

\- AI Konu Anlat → 1 kredi  
\- Daha Detaylı Anlat → \+1 kredi

\#\#\# Kurallar:

\- Görsel üretilmez (kesinlikle)  
\- Metin sade, anlaşılır ve öğretici olmalı  
\- Gerektiğinde örneklerle desteklenmeli

\---

\#\# 8\. Soru Bankası Sistemi

\#\#\# Özellikler:

\- Sorular AI tarafından üretilir  
\- Seviye: Orta ve Zor  
\- 5 şıklı çoktan seçmeli

\#\#\# Kredi:

\- 10 soru \= 1 kredi

\#\#\# Davranış:

Kullanıcı cevap verdiğinde:

\- Doğruysa → Yeşil  
\- Yanlışsa → Kırmızı  
\- Doğru cevap → Yeşil olarak gösterilir

\#\#\# Kurallar:

\- Aynı test içinde tekrar eden soru olmamalı  
\- Sorular tutarlı ve sınav formatına uygun olmalı

\---

\#\# 9\. AI Sor Sistemi

\#\#\# 2 giriş yöntemi:

1\. Soruyu Yaz  
2\. Fotoğraf Yükle

\#\#\# Kredi:

\- 5 AI soru çözümü \= 1 kredi

\#\#\# Özellikler:

\- Adım adım çözüm  
\- Açıklamalı anlatım

\---

\#\# 10\. Kredi Sistemi

\#\#\# Mantık:

\- Kullanıcı kredi paketi satın alır  
\- Kredi bittikçe tekrar satın alır  
\- Abonelik yoktur

\#\#\# Kredi Kullanımı:

\- Konu anlatımı → 1 kredi  
\- Detaylı anlatım → \+1 kredi  
\- 10 soru → 1 kredi  
\- 5 AI çözüm → 1 kredi

\#\#\# Ek:

\- İşlem öncesi kullanıcıya kredi uyarısı gösterilir

\---

\#\# 11\. Ödeme Sistemi (Hazırlık)

\- Şimdilik sadece UI hazırlanacak  
\- API entegrasyonu daha sonra yapılacak

\#\#\# Paketler:

\- Paket adı  
\- Kredi miktarı  
\- Fiyat  
\- Satın al butonu

\---

\#\# 12\. Streak Sistemi

\- Kullanıcı giriş yaptığında artar  
\- Günlük olarak takip edilir

\#\#\# Motivasyon Sistemi:

\- 100 adet motivasyon mesajı olacak  
\- Kullanıcıya sırayla gösterilecek  
\- Liste bitince başa dönecek

\---

\#\# 13\. Profil Ekranı

Gösterilecek bilgiler:

\- Kalan kredi  
\- Günlük streak  
\- Ödeme geçmişi  
\- Kredi kullanım geçmişi

\---

\#\# 14\. Dashboard (Ana Ekran)

Kullanıcı giriş yaptığında:

\- Kalan kredi  
\- Streak  
\- Hızlı erişim:  
  \- Konu anlatımı  
  \- Soru bankası  
  \- AI sor  
  \- Kredi satın al

\---

\#\# 15\. AI Davranış Kuralları

AI aşağıdaki kurallara uymalı:

\- Emin değilse kesin konuşmamalı  
\- Gerekirse: “Kontrol edilmesi önerilir” ifadesi kullanmalı  
\- Sayısal sorularda adım adım tutarlı çözüm üretmeli  
\- Tarih ve edebiyatta uydurma bilgi üretmemeli  
\- Aynı testte tekrar eden soru üretmemeli

\---

\#\# 16\. UI/UX Kuralları

\- Mobile-first tasarım  
\- Sade ve hızlı arayüz  
\- Butonlar büyük ve erişilebilir  
\- Yükleme animasyonları olmalı  
\- Boş ekranlarda yönlendirici mesajlar olmalı

\---

\#\# 17\. PWA Gereksinimleri

\- Offline destek (temel seviyede)  
\- Ana ekrana eklenebilir  
\- Hızlı yükleme  
\- Responsive tasarım

\---

\#\# 18\. Teknik Mimari (Öneri)

\- Frontend: React / Next.js  
\- Backend: Supabase / Firebase  
\- Auth: Email tabanlı  
\- Storage: Supabase Storage (fotoğraflar için)

\---

\#\# 19\. Gelecek Geliştirmeler

\- AI API entegrasyonu  
\- Ödeme API entegrasyonu  
\- Performans analizi  
\- Kullanıcı istatistikleri  
\- Kişiye özel çalışma planı

\---

\#\# 20\. Geliştirme Notları (Claude Code için)

\- Tüm yapı modüler olmalı  
\- Ders ve konular dinamik olmalı  
\- Hardcoded veri kullanılmamalı  
\- Kredi sistemi merkezi yönetilmeli  
\- UI component bazlı ilerlenmeli  
