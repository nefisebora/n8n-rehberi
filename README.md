# n8n Rehberi

Bu klasör tek başına GitHub'a eklenebilir statik n8n 101 rehber sitesidir.

## Yerel Kullanım

`index.html` dosyasını tarayıcıda açabilirsiniz. Basit yerel sunucu isterseniz:

```bash
python3 -m http.server 5173
```

Sonra `http://localhost:5173` adresini açın.

## İçeriği Yeniden Üretme

Kaynak Markdown dosyaları şu klasörden okunur:

```text
/Users/nefisebora/Dropbox/Obsidian Vault/Sync/Yapay Zeka Notlarım Obsidian/Yapay Zeka/Yapay Zeka Otomasyonları/n8n 101
```

Codex ortamındaki Node ile:

```bash
/Users/nefisebora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node tools/build-content.mjs
```

Script Markdown dosyalarını işler, Obsidian görsel bağlantılarını `assets/source/` altına kopyalar ve `index.html` dosyasını yeniler.

## GitHub Pages

Bu klasörü ayrı bir GitHub repository kökü olarak kullanın. `main` branch'e push edildiğinde `.github/workflows/deploy-pages.yml` repo kökünü GitHub Pages'e yayınlar.

Repository ayarlarında Pages kaynağı olarak **GitHub Actions** seçili olmalıdır.
