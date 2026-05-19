export type ModuleId = 'rehber' | 'baslangic' | 'temel-akis' | 'entegrasyonlar' | 'yonetim' | 'auth';

export interface NavItem {
  id: string;
  label: string;
}

export interface CourseModule {
  id: ModuleId;
  label: string;
  shortLabel: string;
  startId: string;
  endBeforeId?: string;
  nav: NavItem[];
}

export const courseModules: CourseModule[] = [
  {
    "id": "rehber",
    "label": "Rehber",
    "shortLabel": "Rehber",
    "startId": "cover",
    "endBeforeId": "baslangic",
    "nav": [
      {
        "id": "cover",
        "label": "Kapak"
      },
      {
        "id": "okuma-rehberi",
        "label": "Okuma Rehberi"
      }
    ]
  },
  {
    "id": "baslangic",
    "label": "Başlangıç",
    "shortLabel": "Başlangıç",
    "startId": "baslangic",
    "endBeforeId": "temel-akis",
    "nav": [
      {
        "id": "baslangic",
        "label": "Başlangıç ve Arayüz"
      },
      {
        "id": "1-n8n-nedir",
        "label": "1- n8n Nedir?"
      },
      {
        "id": "1-n8n-nedir-hesap-olustur-n8n-cloud",
        "label": "Hesap Oluştur: n8n.cloud"
      },
      {
        "id": "1-n8n-nedir-yeni-workflow-baslat",
        "label": "Yeni Workflow Başlat"
      },
      {
        "id": "1-n8n-nedir-sol-panel-kontrol-merkezi",
        "label": "Sol Panel – Kontrol Merkezi"
      },
      {
        "id": "1-n8n-nedir-ust-bar-workflow-a-ait-ayarlar",
        "label": "Üst Bar – Workflow’a Ait Ayarlar"
      },
      {
        "id": "1-n8n-nedir-canvas-calisma-alani",
        "label": "Canvas – Çalışma Alanı"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum",
        "label": "n8n ile Otomasyon 1. Bölüm - Hiçbir Şey Bilmeyenler İçin 1. Bölüm"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-bu-rehber-ne-icin",
        "label": "🎓 Bu Rehber Ne İçin?"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-n8n-nedir",
        "label": "🧠 n8n Nedir?"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-n8n-ne-ise-yarar",
        "label": "📦 n8n Ne İşe Yarar?"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-bu-egitime-kimler-uygun",
        "label": "🧰 Bu Eğitime Kimler Uygun?"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-baslamak-icin-ne-gerekir",
        "label": "🛠 Başlamak İçin Ne Gerekir?"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-1-adim-en-kolay-kurulum",
        "label": "✅ 1. Adım: En Kolay Kurulum"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-1-bolum-hicbir-sey-bilmeyenler-icin-1-bolum-2-bolum-node-ne-demek",
        "label": "🔜 2. Bölüm: “Node” Ne Demek?"
      }
    ]
  },
  {
    "id": "temel-akis",
    "label": "Temel Akış",
    "shortLabel": "Temel",
    "startId": "temel-akis",
    "endBeforeId": "entegrasyonlar",
    "nav": [
      {
        "id": "temel-akis",
        "label": "Temel Workflow Mantığı"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak",
        "label": "n8n ile Otomasyon 2. Bölüm - Otomasyon Kurmak"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-node-nedir-en-basit-haliyle",
        "label": "🔹 Node Nedir? (En Basit Haliyle)"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-gercek-hayattan-ornek",
        "label": "🧱 Gerçek Hayattan Örnek"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-node-turleri-nelerdir",
        "label": "📊 Node Türleri Nelerdir?"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-uygulamali-ornek-gunaydin-workflow",
        "label": "🧪 Uygulamalı Örnek: “Günaydın Workflow”"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-ipuclari",
        "label": "🧠 İpuçları"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-mini-gorev",
        "label": "🎯 Mini Görev"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-2-bolum-otomasyon-kurmak-3-bolum-ilk-kendi-workflow-unu-kur-sifirdan-tiklayarak",
        "label": "🔜 3. Bölüm: İlk Kendi Workflow’unu Kur – Sıfırdan, Tıklayarak!"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur",
        "label": "n8n ile Otomasyon 3. Bölüm - İlk Kendi Workflow’unu Kur!"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-hedef-form-doldurulunca-e-posta-gitsin",
        "label": "🎯 Hedef: Form Doldurulunca E-Posta Gitsin"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-kullanilacak-node-lar",
        "label": "🧩 Kullanılacak Node’lar"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-adim-adim-kurulum",
        "label": "🛠 Adım Adım Kurulum"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-1-adim-yeni-bir-workflow-olustur",
        "label": "🔹 1. Adım: Yeni Bir Workflow Oluştur"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-2-adim-webhook-node-u-ekle",
        "label": "🔹 2. Adım: Webhook Node’u Ekle"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-3-adim-email-node-u-ekle",
        "label": "🔹 3. Adım: Email Node’u Ekle"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-4-adim-node-lari-bagla",
        "label": "🔹 4. Adım: Node’ları Bağla"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-5-adim-test-et",
        "label": "🔹 5. Adım: Test Et"
      },
      {
        "id": "n8n-ile-otomasyon-3-bolum-ilk-kendi-workflow-unu-kur-bonus-basit-form-ornegi-html",
        "label": "🧪 Bonus: Basit Form Örneği (HTML)"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar",
        "label": "n8n ile Otomasyon 4. Bölüm - Koşullar ve Akıllı Akışlar"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-bu-bolumde-ne-ogrenecegiz",
        "label": "🎯 Bu Bölümde Ne Öğreneceğiz?"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-set-node-benim-verim-bu",
        "label": "🔹 Set Node – “Benim Verim Bu!”"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-ornek-veri",
        "label": "Örnek Veri"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-nasil-yapilir",
        "label": "Nasıl Yapılır?"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-if-node-sartli-akis-kur",
        "label": "🔸 IF Node – Şartlı Akış Kur"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-nasil-kurulur",
        "label": "Nasıl Kurulur?"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-switch-node-coklu-secenekli-kontrol",
        "label": "🔻 Switch Node – Çoklu Seçenekli Kontrol"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-nasil-kurulur",
        "label": "Nasıl Kurulur?"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-mini-gorev-otomatik-tebrik-sistemi",
        "label": "🎯 Mini Görev: Otomatik Tebrik Sistemi"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-kullanilacak-node-lar",
        "label": "Kullanılacak Node'lar"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-4-bolum-kosullar-ve-akilli-akislar-5-bolum-web-den-veri-cekmek-http-request-ile-dis-dunya-ile-konus",
        "label": "5. Bölüm: Web’den Veri Çekmek – HTTP Request ile Dış Dünya ile Konuş!"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request",
        "label": "n8n ile Otomasyon 5. Bölüm - Web'den Veri Çekmek (`HTTP Request`)"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-bu-bolumde-ne-ogrenecegiz",
        "label": "🎯 Bu Bölümde Ne Öğreneceğiz?"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-http-request-node-nedir",
        "label": "🔹 HTTP Request Node Nedir?"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-ornek-hava-durumunu-cekmek",
        "label": "🛠 Örnek: Hava Durumunu Çekmek"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-1-api-key-al",
        "label": "1. API Key Al"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-2-http-request-node-u-olustur",
        "label": "2. HTTP Request Node’u Oluştur"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-ornek-veri-yaniti",
        "label": "🧪 Örnek Veri Yanıtı"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-bu-veriyi-kullanmak",
        "label": "🔎 Bu Veriyi Kullanmak"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-mini-gorev-gunluk-hava-durumu-botu",
        "label": "👨‍🔬 Mini Görev: Günlük Hava Durumu Botu"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-5-bolum-web-den-veri-cekmek-http-request-6-bolum-webhook-larla-disaridan-veri-almak-gercek-zamanli-otomasyonlar",
        "label": "6. Bölüm: Webhook’larla Dışarıdan Veri Almak – Gerçek Zamanlı Otomasyonlar"
      }
    ]
  },
  {
    "id": "entegrasyonlar",
    "label": "Entegrasyonlar",
    "shortLabel": "Entegrasyon",
    "startId": "entegrasyonlar",
    "endBeforeId": "yonetim",
    "nav": [
      {
        "id": "entegrasyonlar",
        "label": "Gerçek Entegrasyonlar"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak",
        "label": "n8n ile Otomasyon 6. Bölüm - Webhook ile Gerçek Zamanlı Veri Almak"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-bu-bolumde-ne-ogrenecegiz",
        "label": "🎯 Bu Bölümde Ne Öğreneceğiz?"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-webhook-nedir",
        "label": "🔹 Webhook Nedir?"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-webhook-kurulumu",
        "label": "🛠 Webhook Kurulumu"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-1-webhook-node-u-ekle",
        "label": "1. Webhook Node'u Ekle"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-2-test-moduna-al",
        "label": "2. Test Moduna Al"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-3-webhook-url-yi-kopyala",
        "label": "3. Webhook URL’yi Kopyala"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-basit-html-form-ile-test",
        "label": "🧪 Basit HTML Form ile Test"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-otomasyonu-tamamla",
        "label": "🔁 Otomasyonu Tamamla"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-mini-gorev-form-e-posta-otomasyonu",
        "label": "👨‍🔬 Mini Görev: Form → E-posta Otomasyonu"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-6-bolum-webhook-ile-gercek-zamanli-veri-almak-7-bolum-google-sheets-ile-otomasyon-veri-ekle-oku-guncelle",
        "label": "7. Bölüm: Google Sheets ile Otomasyon – Veri Ekle, Oku, Güncelle"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon",
        "label": "n8n ile Otomasyon 7. Bölüm - Google Sheets ile Otomasyon"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-bu-bolumde-ne-ogrenecegiz",
        "label": "🎯 Bu Bölümde Ne Öğreneceğiz?"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-on-hazirlik-google-sheets-api-baglantisi",
        "label": "🔐 Ön Hazırlık: Google Sheets API Bağlantısı"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-1-google-hesabini-bagla",
        "label": "1. Google Hesabını Bağla"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-ornek-senaryo-form-verisini-sheets-e-kaydet",
        "label": "🛠 Örnek Senaryo: Form Verisini Sheets’e Kaydet"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-ayarlar",
        "label": "Ayarlar:"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-diger-google-sheets-islemleri",
        "label": "🔄 Diğer Google Sheets İşlemleri"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-mini-gorev-katilim-listesi-olustur",
        "label": "👨‍🔬 Mini Görev: Katılım Listesi Oluştur"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-7-bolum-google-sheets-ile-otomasyon-8-bolum-telegram-ile-bildirim-gonderme-akilli-uyari-sistemi-kur",
        "label": "8. Bölüm: Telegram ile Bildirim Gönderme – Akıllı Uyarı Sistemi Kur"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur",
        "label": "n8n ile Otomasyon 8. Bölüm - Telegram ile Otomatik Bildirim Sistemi Kur"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-bu-bolumde-ne-ogrenecegiz",
        "label": "🎯 Bu Bölümde Ne Öğreneceğiz?"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-telegram-botu-nasil-olusturulur",
        "label": "🤖 Telegram Botu Nasıl Oluşturulur?"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-botu-n8n-e-bagla",
        "label": "🔐 Botu n8n’e Bağla"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-ornek-yeni-kayit-geldiginde-telegram-dan-bildirim-gonder",
        "label": "🛠 Örnek: Yeni Kayıt Geldiğinde Telegram’dan Bildirim Gönder"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-ayarlar",
        "label": "Ayarlar:"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-mini-gorev-uyari-sistemi-kur",
        "label": "👨‍🔬 Mini Görev: Uyarı Sistemi Kur"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-8-bolum-telegram-ile-otomatik-bildirim-sistemi-kur-9-bolum-n8n-i-gercek-bir-projeye-donusturmek-uctan-uca-mini-sistem-kurulumu",
        "label": "9. Bölüm: n8n’i Gerçek Bir Projeye Dönüştürmek – Uçtan Uca Mini Sistem Kurulumu"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje",
        "label": "n8n ile Otomasyon 9. Bölüm - Gerçek Bir Proje"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-bu-projenin-akisi-nasil",
        "label": "🎯 Bu Projenin Akışı Nasıl?"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-kullanilacak-node-lar",
        "label": "🧩 Kullanılacak Node'lar"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-adim-adim-kurulum",
        "label": "🛠 Adım Adım Kurulum"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-1-webhook-node",
        "label": "1. Webhook Node"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-2-if-node",
        "label": "2. IF Node"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-3-telegram-node-opsiyonel-uyari",
        "label": "3. Telegram Node (Opsiyonel Uyarı)"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-4-google-sheets-node",
        "label": "4. Google Sheets Node"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-test-zamani",
        "label": "🧪 Test Zamanı"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-9-bolum-gercek-bir-proje-10-bolum-n8n-workflow-larini-yayinlama-ve-paylasma",
        "label": "10. Bölüm: n8n Workflow’larını Yayınlama ve Paylaşma"
      }
    ]
  },
  {
    "id": "yonetim",
    "label": "Yönetim",
    "shortLabel": "Yönetim",
    "startId": "yonetim",
    "endBeforeId": "auth",
    "nav": [
      {
        "id": "yonetim",
        "label": "Paylaşım, Hata Yönetimi ve API"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek",
        "label": "n8n ile Otomasyon 10. Bölüm - Workflow’ları Paylaşmak, Dışa Aktarmak ve Geri Yüklemek"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-bu-bolumde-ne-ogrenecegiz",
        "label": "🎯 Bu Bölümde Ne Öğreneceğiz?"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-workflow-disa-aktarmak-export",
        "label": "📤 Workflow Dışa Aktarmak (Export)"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-workflow-ice-aktarmak-import",
        "label": "📥 Workflow İçe Aktarmak (Import)"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-reusable-akislar-alt-workflow-lar",
        "label": "🔁 Reusable Akışlar (Alt Workflow’lar)"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-nasil",
        "label": "Nasıl?"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-workflow-paylasimi",
        "label": "🌍 Workflow Paylaşımı"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-mini-gorev-kendi-otomasyonunu-yedekle",
        "label": "👨‍🔬 Mini Görev: Kendi Otomasyonunu Yedekle"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-10-bolum-workflow-lari-paylasmak-disa-aktarmak-ve-geri-yuklemek-11-bolum-n8n-de-hata-yonetimi-ve-log-lari-okuma",
        "label": "11. Bölüm: n8n’de Hata Yönetimi ve Log’ları Okuma"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging",
        "label": "n8n ile Otomasyon 11. Bölüm - Hata Yönetimi ve Log’ları Okuma (Debugging)"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-bu-bolumde-ne-ogrenecegiz",
        "label": "🎯 Bu Bölümde Ne Öğreneceğiz?"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-otomasyon-hata-verdiginde-ne-olur",
        "label": "🧨 Otomasyon Hata Verdiğinde Ne Olur?"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-log-lara-nasil-ulasilir",
        "label": "📜 Log’lara Nasıl Ulaşılır?"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-json-incelemesi",
        "label": "🔍 JSON İncelemesi"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-yaygin-hata-turleri-ve-cozumleri",
        "label": "⚠️ Yaygın Hata Türleri ve Çözümleri"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-ipucu-workflow-u-safe-mode-da-calistirmak",
        "label": "🧰 İpucu: Workflow'u “Safe Mode”da Çalıştırmak"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-mini-gorev-bilincli-hata-testi",
        "label": "👨‍🔬 Mini Görev: Bilinçli Hata Testi"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-bu-bolumde-ne-ogrendik",
        "label": "🧠 Bu Bölümde Ne Öğrendik?"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-siradaki-bolumde-ne-var",
        "label": "👀 Sıradaki Bölümde Ne Var?"
      },
      {
        "id": "n8n-ile-otomasyon-11-bolum-hata-yonetimi-ve-log-lari-okuma-debugging-12-bolum-n8n-workflow-larini-zamanlamak-cron-ile-otomatik-tetikleme",
        "label": "12. Bölüm: n8n Workflow'larını Zamanlamak – Cron ile Otomatik Tetikleme"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi",
        "label": "API’lerin Sihirli Dünyası - n8n ile Adım Adım Otomasyon Rehberi"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-api-nedir",
        "label": "🔧 API Nedir?"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-gunluk-hayattan-ornek",
        "label": "🍕 Günlük Hayattan Örnek:"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-n8n-api-leri-nasil-kullanir",
        "label": "🤖 n8n API’leri Nasıl Kullanır?"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-ornek-senaryo",
        "label": "🔁 Örnek Senaryo:"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-api-turleri",
        "label": "🧱 API Türleri"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-1-rest-api",
        "label": "1. REST API"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-2-webhook",
        "label": "2. Webhook"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-3-graphql",
        "label": "3. GraphQL"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-4-sse-server-sent-events",
        "label": "4. SSE (Server-Sent Events)"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-5-soap-api",
        "label": "5. SOAP API"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-6-websocket-api",
        "label": "6. WebSocket API"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-7-grpc-api",
        "label": "7. gRPC API"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-ozetle",
        "label": "📌 Özetle"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-ornek-otomasyon",
        "label": "🎯 Örnek Otomasyon:"
      },
      {
        "id": "api-lerin-sihirli-dunyasi-n8n-ile-adim-adim-otomasyon-rehberi-sonraki-adim",
        "label": "🛠️ Sonraki Adım"
      }
    ]
  },
  {
    "id": "auth",
    "label": "Authentication",
    "shortLabel": "Auth",
    "startId": "auth",
    "nav": [
      {
        "id": "auth",
        "label": "Authentication Rehberi"
      },
      {
        "id": "bonus-1-n8n-ile-otomasyon-authentication",
        "label": "BONUS 1 - n8n İle Otomasyon - Authentication"
      },
      {
        "id": "bonus-1-n8n-ile-otomasyon-authentication-1-authentication-nedir",
        "label": "1. Authentication nedir?"
      },
      {
        "id": "bonus-1-n8n-ile-otomasyon-authentication-2-n8n-de-bu-is-nasil-oluyor",
        "label": "2. n8n’de bu iş nasıl oluyor?"
      },
      {
        "id": "bonus-1-n8n-ile-otomasyon-authentication-3-kullanabileceginiz-anahtar-cesitleri",
        "label": "3. Kullanabileceğiniz Anahtar Çeşitleri"
      },
      {
        "id": "bonus-1-n8n-ile-otomasyon-authentication-4-hangi-anahtari-secmeli",
        "label": "4. Hangi Anahtarı Seçmeli?"
      },
      {
        "id": "bonus-1-n8n-ile-otomasyon-authentication-5-hangi-yontemi-kullanacagimizi-nasil-bilecegiz",
        "label": "5. Hangi Yöntemi Kullanacağımızı Nasıl Bileceğiz?"
      },
      {
        "id": "bonus-1-n8n-ile-otomasyon-authentication-kisacasi",
        "label": "Kısacası:"
      },
      {
        "id": "bonus-2-sik-kullandigimiz-authenticationlar",
        "label": "BONUS 2 - Sık Kullandığımız Authenticationlar"
      },
      {
        "id": "bonus-2-sik-kullandigimiz-authenticationlar-sik-kullandigimiz-authenticationlar",
        "label": "Sık Kullandığımız Authenticationlar"
      },
      {
        "id": "bonus-2-sik-kullandigimiz-authenticationlar-1-google-cloud-console-drive-gsheet-vb",
        "label": "1. Google Cloud Console (Drive, Gsheet vb.)"
      },
      {
        "id": "bonus-2-sik-kullandigimiz-authenticationlar-2-openai-chatgpt",
        "label": "2. OpenAI ChatGPT"
      },
      {
        "id": "bonus-2-sik-kullandigimiz-authenticationlar-3-kie-ai-burada-erisebilirsiniz",
        "label": "3. KIE AI: Burada Erişebilirsiniz"
      },
      {
        "id": "bonus-2-sik-kullandigimiz-authenticationlar-4-fal-ai",
        "label": "4. Fal AI"
      },
      {
        "id": "bonus-2-sik-kullandigimiz-authenticationlar-bonus-auth-degerleri-neden-farkli",
        "label": "🎁 Bonus: Auth Değerleri Neden Farklı?"
      },
      {
        "id": "sik-kullandigimiz-authenticationlar",
        "label": "Sık Kullandığımız Authenticationlar"
      },
      {
        "id": "sik-kullandigimiz-authenticationlar-1-google-cloud-console-drive-gsheet-vb",
        "label": "1. Google Cloud Console (Drive, Gsheet vb.)"
      },
      {
        "id": "sik-kullandigimiz-authenticationlar-2-openai-chatgpt",
        "label": "2. OpenAI ChatGPT"
      },
      {
        "id": "sik-kullandigimiz-authenticationlar-3-kie-ai",
        "label": "3. KIE AI"
      },
      {
        "id": "sik-kullandigimiz-authenticationlar-4-fal-ai",
        "label": "4. Fal AI"
      },
      {
        "id": "sik-kullandigimiz-authenticationlar-bonus-auth-degerleri-neden-farkli",
        "label": "🎁 Bonus: Auth Değerleri Neden Farklı?"
      }
    ]
  }
];

export const defaultModuleId: ModuleId = 'rehber';

export function getModuleById(id: string | null | undefined): CourseModule | undefined {
  return courseModules.find((module) => module.id === id);
}

export function getModuleForAnchor(anchorId: string): CourseModule | undefined {
  return courseModules.find((module) =>
    module.nav.some((item) => item.id === anchorId || module.startId === anchorId)
  );
}
