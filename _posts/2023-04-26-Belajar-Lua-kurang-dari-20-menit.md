---
layout: "post"
title: "Belajar Lua kurang dari 20 menit"
permalink: /blog/:title
toc: true
categories: blog
tags: programming lua
description: "Lua merupakan bahasa pemprograman <i>scripting</i> (dijalankan tanpa <i>compile</i>) sama seperti Javascript, Python, Ruby, dsb. Alasan awal penulis mempelajari bahasa ini adalah untuk mengkonfigurasi neovim. Walaupun <i>syntax</i>-nya terlihat simpel, tapi sebenarnya bahasa ini sangat <i>powerful</i>, bahkan dapat digunakan dalam <i>game development</i>."
---

{% include alerts.html type="warning" content="Lua yang digunakan penulis dalam artikel ini adalah Lua versi 5.4.x, jika ada perbedaan <i>syntax</i> atau fungsi silahkan rujuk kembali didokumentasi resmi Lua." %}

# Variabel, Tipe data dan Komentar

## Variabel

Terdapat 2 tipe variabel dalam Lua, yaitu variabel global dan variabel lokal. Variabel global dapat diakses dari seluruh bagian program sedangkan variabel lokal hanya dapat diakses dalam kode blok tempat dimana ia didefinisikan, seperti didalam blok fungsi.

```lua
nama1 = "Boby" -- variabel global
print(nama1) -- Boby

function nama() -- awal blok fungsi nama
    local nama2 = "Boby" -- variabel lokal
    return print(nama2)
end -- akhir blok fungsi
print(nama2) -- error, nama2 hanya dapat diakses dalam blok fungsi
```

{% include alerts.html type="info" content="Penggunaan variabel global lebih baik dihindari, karena dapat menyebabkan masalah keamanan dan kesulitan pemeliharaan program." %}

## Tipe data

Terdapat 6 macam tipe data dasar dalam Lua, antara lain :

1. **String**

   Mempresentasikan teks atau karakter.

2. **Number**

   Mempresentasikan angka, termasuk integer atau float. Lua menyimpan variabel angka dalam bentuk float.

3. **Boolean**

   Mempresentasikan nilai logika benar atau salah, bernilai `true` atau `false`.

4. **Table**

   Mempresentasikan nilai data yang kompleks. Table dalam Lua digunakan seperti Array atau Object dalam Javascript.

5. **Nil**

   Mempresentasikan nilai kosong. Dalam Lua, nil biasa digunakan untuk menghapus nilai dari sebuah variabel atau tabel.

6. **Function**

   Mempresentasikan fungsi atau prosedur dalam program.

```lua
print(type("Hello world"))              -- String
print(type(10.4*3))                     -- Number
print(type(true))                       -- Boolean
print(type({nama = "Boby", usia = 22})) -- Table
print(type(nil))                        -- Nil
print(type(print))                      -- Function
```

## Komentar

Komentar merupakan bagian dari kode yang tidak dieksekusi oleh komputer. Komentar biasanya digunakan untuk memberi keterangan atau dokumentasi terkait suatu kode.

```lua
-- Dua garis untuk memulai 1 baris komentar.

--[[
     Tambahkan 2 kurung kotak untuk membuat beberapa baris komentar.
     Komentar ini tidak dieksekusi oleh komputer.
]]
```

# Operator Perhitungan, Perbandingan dan Logika

## Perhitungan

| Operator | Digunakan untuk           |
| -------- | ------------------------- |
| `+`      | Penjumlahan               |
| `-`      | Pengurangan               |
| `*`      | Perkalian                 |
| `/`      | Pembagian                 |
| `%`      | Modulus / Sisa hasil bagi |
| `^`      | Pemangkatan               |

```lua
print(10 + 2) -- 12
print(10 - 2) -- 8
print(10 * 2) -- 20
print(10 / 2) -- 5
print(10 % 2) -- 0
print(10 ^ 2) -- 100
```

## Perbandingan

| Operator | Keterangan              |
| -------- | ----------------------- |
| `==`     | Sama dengan             |
| `~=`     | Tidak sama dengan       |
| `<`      | Kurang dari             |
| `>`      | Lebih dari              |
| `<=`     | Kurang dari sama dengan |
| `>=`     | Lebih dari sama dengan  |

```lua
print(10 == 2)  -- false
print(10 ~= 2)  -- true
print(10 < 2)   -- false
print(10 > 2)   -- true
print(10 <= 2)  -- false
print(10 >= 2)  -- true
```

## Logika

| Operator | Keterangan                                                                                                                        |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `and`    | Mengembalikan nilai `true` jika kedua ekspresi bernilai `true`, dan `false` jika salah satu atau kedua ekspresi bernilai `false`. |
| `or`     | Mengembalikan nilai `true` jika salah satu atau kedua ekspresi bernilai `true`, dan `false` jika kedua ekspresi bernilai `false`. |
| `not`    | Mengembalikan nilai `false` jika ekspresi bernilai `true`, dan `true` jika ekspresi bernilai `false`.                             |

```lua
-- Operator AND
print(true and true)    -- true
print(true and false)   -- false
print(false and false)  -- false

-- Operator OR
print(true or true)     -- true
print(true or false )   -- true
print(false or false)   -- false

-- Operator NOT
print(not true)         -- false
print(not false)        -- true
```

# Percabangan dan Perulangan

## Percabangan

Percabangan pada Lua menggunakan `if`, `elseif`, dan `else`. Untuk saat ini Lua belum mengimplementasi percabangan `switch` seperti pada Javascript.

```lua
local nilai = 80

if nilai >= 90 then
  print("Nilai Anda A")
elseif nilai >= 80 then
  print("Nilai Anda B")
elseif nilai >= 70 then
  print("Nilai Anda C")
else
  print("Nilai Anda D")
end

-- Output => Nilai Anda B.
```

## Perulangan

Terdapat 2 jenis perulangan pada Lua, yaitu `for` dan `while`. Perulangan `for` biasanya digunakan pada <i>counted loop</i> atau perulangan yang jumlahnya sudah diketahui. Sebaliknya, perulangan `while` digunakan pada <i>uncounted loop</i> atau perulangan yang jumlahnya belum diketahui.

Jika dianalogikan, <i>counted loop</i> seperti kamu berlari 10 putaran, sedangkan <i>uncounted loop</i> seperti kamu berlari sampai lelah.

```lua
-- Perulangan for
for i = 1, 5 do
    print("Perulangan ke-"..i) -- string concatination pada Lua menggunakan titik dua kali (..).
end

-- Perulangan while
print("Masukkan angka ganjil:")
local input = io.read("*n") -- Membaca input dari pengguna sebagai angka.

-- Perulangan while akan terus berjalan jika user menginput angka genap.
while input % 2 == 0 do
    print("Angka yang dimasukkan harus ganjil, coba lagi:")
    input = io.read("*n")
end

print("Angka yang dimasukkan adalah:", input)
```

{% include alerts.html type="info" content="Perlu diingat, bahwa tidak ada penggunaan <i>curly bracket</i> ({}) dalam Lua. Percabangan menggunakan 'then' dan untuk perulangan menggunakan 'do' dan keduanya diakhiri dengan 'end'." %}

# Fungsi

Terdapat 2 jenis fungsi dalam Lua, yaitu <i>built-in function</i> dan <i>user defined function</i>. <i>Built-in function</i> adalah fungsi bawaan yang sudah tersedia dan siap digunakan tanpa didefinisikan terlebih dahulu, seperti `math.abs()`, `table.insert()`, dll. Sedangkan <i>user defined function</i> merupakan fungsi yang didefinisikan oleh pengguna itu sendiri.

Ada beberapa cara dalam mendefinisikan fungsi, yaitu:

1. Dengan cara umum atau biasa yaitu menggunakan keyword `function`.
2. Dengan menyimpannya ke dalam variabel. Cara ini dilakukan dengan mendefinisikan <i>anonymous function</i> (fungsi tanpa nama) ke dalam suatu variabel.

```lua
-- Dengan cara biasa
function hello()
    print("Hello World!")
end

hello() -- Output => Hello World!

-- Dengan variabel
local hello = function()
    print("Hello World!")
end

hello() -- Output => Hello World!
```

Perlu diperhatikan, bahwa fungsi diatas tidak menggunakan parameter. Parameter digunakan untuk mengolah data dalam fungsi.

```lua
function tambah(a,b) -- "a" dan "b" merupakan parameter.
    return a + b
end

-- Gunakan fungsi print() untuk mencetak output.
print(tambah(5,3)) -- Output => 8
```

{% include alerts.html type="info" content="Karena tidak adanya penggunaan <i>curly bracket</i>, maka pada setiap pendefinisian fungsi jangan lupa untuk menutup fungsi dengan menggunakan keyword 'end'." %}

# Table

Table merupakan tipe data dalam Lua yang penggunaanya mirip seperti Array atau Object dalam Javascript. Table juga dapat dijadikan seperti <i>assosiative array</i> karena setiap elemen dalam table dapat memiliki key atau kunci unik untuk mengakses nilai dalam table tersebut. Key tersebut dapat berupa <i>Number</i> atau <i>String</i>.

```lua
-- Inisiasi table kosong
local buah = {}
local mahasiswa = {}

-- Inisiasi table dengan nilai
local buah = {"Pisang", "Mangga", "Nanas"} -- table dengan index bawaan (tanpa mengisiasi key).
local mahasiswa = {nama = "Boby", usia = 20} -- table dengan assosiative key.

-- Menambah nilai kedalam table
buah[4] = "Melon" -- Menambah nilai table buah di-index 4.
mahasiswa["alamat"] = "Brebes" -- Menambah nilai dengan menambahkan key.

-- Mencetak nilai table dengan index/key
print(buah[2]) -- Output => Mangga
print(mahasiswa["nama"]) -- Output => Boby
print(mahasiswa.nama) -- Nilai dapat diakses dengan cara dot-notation seperti Javascript.

-- Mencetak nilai table menggunakan looping
for index, value in pairs(buah) do
    print(index .. ". " .. value)
end
--[[ Output =>
    1. Pisang
    2. Mangga
    3. Nanas
    4. Melon
]]
for index, value in pairs(mahasiswa) do
    print(index .. ": " .. value)
end
--[[ Output =>
    nama: Boby
    usia: 20
    alamat: Brebes
]]

-- Mencari jumlah item dalam table
print(#buah) --[[ Output => 4.
Untuk mencari jumlah item dalam table dalam Lua,
cukup dengan operator # disertai dengan nama table.
]]

-- Menghapus nilai dari table
buah = nil
mahasiswa = nil
```

{% include alerts.html type = "info" content="Perlu diperhatikan bahwa <i>index</i> table dalam Lua dimulai dari 1 bukan 0." %}

## Manipulasi table

Ada beberapa fungsi bawaan dari Lua untuk memanipulasi table, antara lain:

| Fungsi                                    | Keterangan                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `table.concat(table [, sep [, i [, j]]])` | Menggabungkan string dalam table berdasarkan parameter yang diberikan.                  |
| `table.insert(table, [pos,] value)`       | Menyisipkan nilai ke dalam table pada posisi tertentu.                                  |
| `table.move (a1, f, e, t [,a2])`          | Memindahkan nilai table a1 ke table a2 dengan parameter tertentu.                       |
| `table.pack (···)`                        | Membuat table baru dengan tambahan key "n" diakhir table yang berisi jumlah item table. |
| `table.remove(table, [pos,])`             | Menghapus nilai dari table.                                                             |
| `table.sort(table [, comp])`              | Mengurutkan table berdasarkan parameter yang diberikan.                                 |
| `table.unpack(table [, i [, j]])`         | Mengekstrak nilai dari tabel.                                                           |

```lua
local buah = {"Pisang", "Mangga", "Nanas"}

-- fungsi table.concat()
print(table.concat(buah)) -- Output => PisangManggaNanas
print(table.concat(buah, ", ")) -- Output => Pisang, Mangga, Nanas (parameter ke-2 untuk menentukan separator).
print(table.concat(buah, ", ", 2, 3)) -- Output => Mangga, Nanas  (parameter ke-3 untuk menentukan awal dan parameter ke-4 untuk akhir).

-- fungsi table.insert() & table.remove()
table.insert(buah, "Melon") -- Tanpa menentukan posisi (parameter ke-2) akan menyisipkan nilai diakhir table.
print(buah[4]) -- Output => Melon
table.insert(buah, 2, "Melon") -- Menyisipkan Melon di-index nomor 2.
print(buah[2]) -- Output => Melon

table.remove(buah) -- Tanpa menentukan posisi (parameter ke-2) akan menghapus nilai diakhir table.
print(buah[5]) -- Output => nil
table.remove(buah, 2) -- Menghapus nilai di-index 2, yaitu Melon.
print(buah[2]) -- Output => Mangga

-- fungsi table.move()
local buah2 = {"Melon", "Apel"}
-- table.move(table sumber, index awal, index akhir, index awal penyisipan, table tujuan)
table.move(buah, 1, 2, 2, buah2)
for index, value in pairs(buah2) do
    print(index .. ". " .. value)
end
--[[ Output =>
    1. Melon
    2. Pisang
    3. Mangga

    Apel ditimpa oleh Pisang karena index awal penyisipan dimulai dari 2
]]

-- fungsi table.pack()
local buah3 = table.pack("Apel", "Melon")
for index, value in pairs(buah3) do
    print(index .. ". " .. value)
end
--[[ Output =>
    1. Apel
    2. Melon
    n. 2

    table.pack() menambahkan key "n" berisi jumlah item dalam tabel
]]

-- fungsi table.sort()
-- Sebelum sorting
for index, value in pairs(buah) do
    print(index .. ". " .. value)
end
--[[ Output =>
    1. Pisang
    2. Mangga
    3. Nanas
]]
-- setelah sorting
table.sort(buah)
for index, value in pairs(buah) do
    print(index .. ". " .. value)
end
--[[ Output =>
    1. Mangga
    2. Nanas
    3. Pisang
]]

-- fungsi table.unpack()
local a, b, c = table.unpack(buah)
print(a, b, c) --[[ Output => Mangga Nanas Pisang.
Variabel a, b, dan c memiliki nilai sesuai urutan dalam table buah.
]]
```

# Modul

Konsep modul dalam Lua adalah memecah kode program menjadi beberapa file agar dapat digunakan kembali (<i>reusable</i>). Konsep seperti ini sama juga dalam beberapa bahasa pemprograman lainnya, seperti Javascript yang menggunakan `export` & `import`. Tetapi dalam Lua, untuk mengimport module menggunakan syntax `require` dan untuk mengexport module menggunakan `return`.

```lua
-- file myModule.lua
local M = {}

function M.hello()
    return print("Hello World!")
end

return M
```

```lua
-- file main.lua
local myModule = require("myModule")

myModule.hello() -- Output => "Hello World!"
```

# Referensi

1. [https://www.lua.org/manual/5.4/manual.html](https://www.lua.org/manual/5.4/manual.html){:target="\_blank"}
2. [https://www.tutorialspoint.com/lua/index.htm](https://www.tutorialspoint.com/lua/index.htm){:target="\_blank"}
3. [https://learnxinyminutes.com/docs/lua/](https://learnxinyminutes.com/docs/lua/){:target="\_blank"}
