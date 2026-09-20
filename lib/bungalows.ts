export type FeatureId = "pool" | "heated" | "jacuzzi" | "fireplace" | "pets" | "breakfast";
export type SortOrder = "recommended" | "price-asc" | "price-desc";
export type SourceRate = {
  from: string; to: string; baseGuests: number; extraGuest: number | null;
  weekendMinimum?: number;
  weekday: number; weekend?: number;
};
export type Bungalow = {
  id: string; name: string; region: string; location: string; price: number | null;
  facilityKey: string; aliases?: string[];
  otherSources?: { name: string; url: string }[];
  capacity: number; capacityLabel?: string; bedrooms: number | null; tag: string; features: FeatureId[];
  image: string; imageAlt: string; description: string;
  sourceName: string; sourceUrl: string; checkedOn: string;
  priceNote: string; details: string[]; sourceRate?: SourceRate;
};
export const MAX_PRICE = 25000;
export const CHECKED_ON = "2026-08-27";

export const FEATURES: { id: FeatureId; label: string; shortLabel: string }[] = [
  { id: "pool", label: "Havuz", shortLabel: "Havuz" },
  { id: "heated", label: "Isıtmalı havuz", shortLabel: "Isıtmalı havuz" },
  { id: "jacuzzi", label: "Jakuzi", shortLabel: "Jakuzi" },
  { id: "fireplace", label: "Şömine", shortLabel: "Şömine" },
  { id: "pets", label: "Evcil hayvan kabulü", shortLabel: "Evcil hayvan kabulü" },
  { id: "breakfast", label: "Kahvaltı dahil", shortLabel: "Kahvaltı dahil" },
];

export const BUNGALOWS: Bungalow[] = [
  {
    "id": "so-sapanca",
    "name": "So Sapanca",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": 14000,
    "capacity": 6,
    "bedrooms": 2,
    "tag": "Özel havuz & jakuzi",
    "features": [
      "pool",
      "jacuzzi",
      "pets"
    ],
    "image": "https://www.bungalov.com.tr/images/hotel/42554_b.jpg",
    "imageAlt": "So Sapanca bungalovunun ilan fotoğrafı — Bungalov.com.tr",
    "description": "Sapanca'da altı kişiye kadar konaklama sunan, iki odalı bungalov. İlanda özel havuz, jakuzi, mutfak ekipmanları, mangal alanı ve ateş çukuru belirtiliyor.",
    "sourceName": "Bungalov.com.tr",
    "sourceUrl": "https://www.bungalov.com.tr/so-bungalov-sapanca",
    "checkedOn": "2026-08-27",
    "priceNote": "İlanda 6 kişi için 14.000 TL/gece. Haziran–Eylül 2026 tablosu; Eylül için çakışan tarifeler bulunduğundan hesap yalnızca Ağustos sonuna kadar yapılır.",
    "details": [
      "Kaynağa göre 2 oda, 1 banyo",
      "Hafta sonu en az 2 gece",
      "Kahvaltı ayrıca ücretli",
      "Evcil hayvan kabulü ilanda belirtiliyor; koşulları teyit edin."
    ],
    "sourceRate": {
      "from": "2026-06-01",
      "to": "2026-08-31",
      "baseGuests": 6,
      "extraGuest": 0,
      "weekendMinimum": 2,
      "weekday": 14000
    },
    "facilityKey": "so-sapanca"
  },
  {
    "id": "pera-zeni",
    "name": "Pera Bungalov · Zeni",
    "region": "Karadeniz",
    "location": "Duygulu, Ardeşen, Rize",
    "price": null,
    "capacity": 6,
    "bedrooms": null,
    "tag": "Vadi manzarası",
    "features": [
      "jacuzzi"
    ],
    "image": "https://perabungalov.com/uploads/zeni-main.webp",
    "imageAlt": "Pera Bungalov Zeni konaklama biriminin fotoğrafı — tesisin resmî sitesi",
    "description": "Pera Bungalov'un altı kişi kapasiteli Zeni birimi. Tesisin kendi sayfasında jakuzi, balkon, Wi-Fi ve çay/kahve olanakları listeleniyor. Adresi Ardeşen'in Duygulu Köyü olarak belirtiliyor.",
    "sourceName": "Pera Bungalov · Resmî site",
    "sourceUrl": "https://perabungalov.com/",
    "checkedOn": "2026-08-27",
    "priceNote": "İncelenen sayfada Zeni için kesin gecelik fiyat yayımlanmıyor. Tarih, kişi sayısı ve oda tipine göre tesisten bilgi alın.",
    "details": [
      "Zeni birimi: 6 kişi kapasite",
      "Balkon, Wi-Fi, çay/kahve olanağı",
      "Oda sayısı ilanda açıkça belirtilmemiş",
      "Tesisin açıklamasında restoran bulunuyor; kahvaltının fiyata dahil olduğu teyit edilmedi."
    ],
    "facilityKey": "pera-bungalov"
  },
  {
    "id": "nois-2",
    "name": "Sapanca Nois Bungalov 2",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": 10000,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Isıtmalı havuz",
    "features": [
      "heated",
      "pool",
      "jacuzzi"
    ],
    "image": "https://www.bungalovla.com/images/hotel/25413_t.jpg",
    "imageAlt": "Sapanca Nois Bungalov 2 ilan fotoğrafı — Bungalovla.com",
    "description": "İki yatak odalı, beş kişi kapasiteli Sapanca ilanı. İlanda ısıtmalı havuz, dış alanda jakuzi, barbekü, ateş çukuru, mutfak ve Wi-Fi bilgileri bulunuyor.",
    "sourceName": "Bungalovla.com",
    "sourceUrl": "https://www.bungalovla.com/sapanca-nois2-bungalov",
    "checkedOn": "2026-08-27",
    "priceNote": "İlanda 10.000 TL başlangıç fiyatı. Bu tutarın tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "details": [
      "Kaynak listesinde 2 yatak odası, 1 banyo, 5 kişi",
      "İlanda sadece oda konsepti belirtiliyor",
      "Isıtmalı havuz ve dış alanda jakuzi",
      "Misafir kabul koşullarını rezervasyon öncesinde işletmeden kontrol edin."
    ],
    "facilityKey": "sapanca-nois"
  },
  {
    "id": "mirror-rize",
    "name": "Rize Mirror Bungalov",
    "region": "Karadeniz",
    "location": "Ardeşen, Rize",
    "price": 16250,
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Havuz & kahvaltı",
    "features": [
      "heated",
      "jacuzzi",
      "pool",
      "breakfast"
    ],
    "image": "https://www.bungalov.com.tr/images/hotel/48015_b.jpg",
    "imageAlt": "Rize Mirror Bungalov ilan fotoğrafı — Bungalov.com.tr",
    "description": "Ardeşen'de dört kişiye kadar konaklama sunan bungalov. İlanda ısıtmalı havuz, jakuzi ve iki kişilik kahvaltı dahil fiyat bilgisi yer alıyor.",
    "sourceName": "Bungalov.com.tr",
    "sourceUrl": "https://www.bungalov.com.tr/mirror-bungalov-rize",
    "checkedOn": "2026-08-27",
    "priceNote": "3 Haziran–15 Eylül 2026: 2 kişi için 16.250 TL/gece; sonraki her kişi için gecelik 750 TL. Kahvaltı 2 kişi için dahil.",
    "details": [
      "İlanda 2 oda, 1 banyo",
      "Hafta sonu en az 2 gece",
      "Kahvaltı yalnızca belirtilen 2 kişilik tarife kapsamında",
      "Evcil hayvan kabul edilmiyor."
    ],
    "sourceRate": {
      "from": "2026-06-03",
      "to": "2026-09-15",
      "baseGuests": 2,
      "extraGuest": 750,
      "weekendMinimum": 2,
      "weekday": 16250
    },
    "facilityKey": "mirror-rize"
  },
  {
    "id": "shine-sapanca",
    "name": "Sapanca Shine Bungalov",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": 16500,
    "capacity": 10,
    "bedrooms": 3,
    "tag": "Kalabalık kaçamaklar",
    "features": [
      "pool",
      "pets"
    ],
    "image": "https://www.bungalov.com.tr/images/hotel/42856_b.jpg",
    "imageAlt": "Sapanca Shine Bungalov ilan fotoğrafı — Bungalov.com.tr",
    "description": "Üç odalı, on kişiye kadar kapasiteli Sapanca bungalovu. İlanda özel havuz, göl manzarası, mutfak ekipmanları ve mangal alanı listeleniyor.",
    "sourceName": "Bungalov.com.tr",
    "sourceUrl": "https://www.bungalov.com.tr/shine-bungalov-sapanca",
    "checkedOn": "2026-08-27",
    "priceNote": "26 Haziran–15 Eylül 2026: 6 kişi için 16.500 TL/gece. Altı kişiden sonraki her kişi için 1.000 TL ek ücret belirtiliyor.",
    "details": [
      "Kaynağa göre 3 oda, 2 banyo",
      "Hafta sonu en az 2 gece",
      "Jakuzi olmadığı belirtiliyor",
      "Yalnızca küçük ırk evcil hayvan kabulü belirtiliyor.",
      "Havuz ısıtması başlıkta geçiyor; detay listesinde doğrulanmadığı için ısıtmalı havuz filtresine eklenmedi."
    ],
    "sourceRate": {
      "from": "2026-06-26",
      "to": "2026-09-15",
      "baseGuests": 6,
      "extraGuest": null,
      "weekendMinimum": 2,
      "weekday": 16500
    },
    "facilityKey": "shine-sapanca"
  },
  {
    "id": "elis-rize",
    "name": "Elis Dağ Evi",
    "region": "Karadeniz",
    "location": "Merkez, Rize",
    "price": 6750,
    "capacity": 5,
    "bedrooms": 1,
    "tag": "Deniz manzarası",
    "features": [
      "jacuzzi"
    ],
    "image": "https://www.bungalov.com.tr/images/hotel/49049_b.jpg",
    "imageAlt": "Elis Dağ Evi ilan fotoğrafı — Bungalov.com.tr",
    "description": "Rize Merkez'de deniz manzaralı, beş kişiye kadar kapasiteli bungalov. İlanda jakuzi, mutfak ekipmanları, mangal alanı ve otopark belirtiliyor; havuz bulunmuyor.",
    "sourceName": "Bungalov.com.tr",
    "sourceUrl": "https://www.bungalov.com.tr/elis-dag-evi-rize",
    "checkedOn": "2026-08-27",
    "priceNote": "Ağustos 2026: 4 kişi için hafta içi 6.750 TL, cuma–pazar 7.250 TL/gece. Ek kişi ücreti 1.000 TL. Hafta sonu en az 2 gece koşulu fiyat tablosunda yer alıyor.",
    "details": [
      "Kaynağa göre 1 oda, 1 banyo",
      "Havuz yok; jakuzi bulunuyor",
      "Evcil hayvan kabul edilmiyor",
      "İlandaki minimum gece bilgileri farklı bölümlerde değişiyor; teyit edin."
    ],
    "sourceRate": {
      "from": "2026-08-01",
      "to": "2026-08-31",
      "baseGuests": 4,
      "extraGuest": null,
      "weekendMinimum": 2,
      "weekday": 6750,
      "weekend": 7250
    },
    "facilityKey": "elis-rize"
  },
  {
    "id": "forest-dream",
    "name": "Forest Dream Havuzlu",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": 17500,
    "capacity": 4,
    "bedrooms": 1,
    "tag": "Şömine başında",
    "features": [
      "fireplace",
      "pool",
      "jacuzzi",
      "pets"
    ],
    "image": "https://www.bungalov.com.tr/images/hotel/39380_b.jpg",
    "imageAlt": "Forest Dream Havuzlu bungalov ilan fotoğrafı — Bungalov.com.tr",
    "description": "Sapanca'da dört kişiye kadar konaklama sunan havuzlu bungalov. İlanda jakuzi, şömine, ateş çukuru, mangal ve klima olanakları belirtiliyor.",
    "sourceName": "Bungalov.com.tr",
    "sourceUrl": "https://www.bungalov.com.tr/forest-dream-havuzlu-sakarya",
    "checkedOn": "2026-08-27",
    "priceNote": "1 Haziran–29 Aralık 2026: 2 kişi için 17.500 TL/gece; iki kişiden sonraki her kişi için 1.000 TL. Özel günlerde farklı fiyat uygulanabilir.",
    "details": [
      "Kaynağa göre 1 oda, 1 banyo",
      "Hafta sonu en az 2 gece",
      "Sadece konaklama tarifesi",
      "Evcil hayvan kabulü ilanda belirtiliyor; koşulları teyit edin."
    ],
    "sourceRate": {
      "from": "2026-06-01",
      "to": "2026-12-29",
      "baseGuests": 2,
      "extraGuest": null,
      "weekendMinimum": 2,
      "weekday": 17500
    },
    "facilityKey": "forest-dream"
  },
  {
    "id": "stenhus-sapanca",
    "name": "Stenhus Sapanca",
    "region": "Sapanca",
    "location": "Fevziye, Sapanca, Sakarya",
    "price": 10000,
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Bahçede bir mola",
    "features": [
      "pool",
      "jacuzzi",
      "fireplace"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/366/dscf6859-f.jpg",
    "description": "Fevziye’de iki yatak odalı, dört kişilik bungalov. İlanda özel havuz, jakuzi, şömine, mutfak ve bahçede barbekü belirtiliyor.",
    "sourceName": "Sapanca Konaklama Rehberi",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-366-stenhus-sapanca",
    "priceNote": "Kaynağın liste sayfasında 10.000 TL başlangıç fiyatı görülüyor. Dört kişilik tarife belirtilse de tarih kapsamı açık değil; toplam fiyat hesaplanmaz.",
    "details": [
      "İki ayrı yatak odası; en fazla 4 kişi",
      "Kahvaltı dahil değil; evcil hayvan kabul edilmiyor",
      "Şömine odunu ayrıca ücretli; havuz ısıtması doğrulanmadı"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Stenhus Sapanca — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "stenhus-sapanca"
  },
  {
    "id": "kokina-suit",
    "name": "Sapanca Kokina Suit",
    "region": "Sapanca",
    "location": "İpekyolu, Sapanca, Sakarya",
    "price": 12000,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Sıcak havuz & şömine",
    "features": [
      "pool",
      "heated",
      "jacuzzi",
      "fireplace",
      "pets",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/498/sapanca_kokina_suit_17-f.jpg",
    "description": "İki yatak odası ve beş kişiye kadar kapasite sunan bungalov. Isıtmalı havuz, iç mekân jakuzisi, çift taraflı şömine ve mutfak ilanda listeleniyor.",
    "sourceName": "Sapanca Konaklama Rehberi",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-498-sapanca-kokina-suit",
    "priceNote": "Liste sayfasında 12.000 TL başlangıç fiyatı. Detay sayfasında dahil kişi ve ek kişi ücretleri çeliştiği için kesin tutar ilandan teyit edilmeli.",
    "details": [
      "2 yatak odası; en fazla 5 kişi",
      "Oda kahvaltı konsepti; dahil kişi sayısını teyit edin",
      "Yalnızca küçük ırk evcil hayvan kabulü belirtiliyor",
      "Şömine odunu ayrıca ücretli"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Kokina Suit — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "kokina-suit"
  },
  {
    "id": "abant-vadi-piramit",
    "name": "Abant Vadi · Piramit Bungalov",
    "region": "Karadeniz",
    "location": "Abant, Bolu",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Orman & şömine",
    "features": [
      "jacuzzi",
      "fireplace"
    ],
    "image": "https://abantbungalov.com/wp-content/uploads/2024/07/20240729_140038-1-rotated.jpg",
    "description": "Abant Vadi’nin iki ile dört kişi için sunulan piramit bungalov seçeneği. Tesisin kendi sayfasında jakuzi, şömine, klima ve mutfak bilgileri bulunuyor.",
    "sourceName": "Abant Vadi · Resmî site",
    "sourceUrl": "https://abantbungalov.com/",
    "priceNote": "Resmî sayfada bu birim için gecelik tarife yayımlanmıyor. Tarih ve kişi sayısıyla tesisten fiyat alın.",
    "details": [
      "Piramit bungalov: 2–4 kişi kapasite",
      "Çift kişilik yatak, TV ve buzdolabı",
      "Tesis açıklamasında Abant Gölü’ne 10 km mesafe belirtiliyor",
      "Oda sayısı ve kahvaltı dahil oluşu teyit edilmeli"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Abant Vadi · Piramit Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "abant-vadi"
  },
  {
    "id": "homywood-trabzon",
    "name": "HomyWood Bungalov",
    "region": "Karadeniz",
    "location": "Beştaş, Trabzon",
    "price": null,
    "capacity": 6,
    "bedrooms": null,
    "tag": "Trabzon’da doğa",
    "features": [
      "jacuzzi",
      "fireplace"
    ],
    "image": "https://www.homywood.com.tr/wp-content/uploads/2025/06/homywood-slayt-1.jpg",
    "description": "Trabzon Beştaş’ta bahçeli bungalov konaklaması. Resmî tesislerda altı kişiye kadar kapasite, jakuzi, şömine, mutfak ve barbekü belirtiliyor.",
    "sourceName": "HomyWood · Resmî site",
    "sourceUrl": "https://www.homywood.com.tr/",
    "priceNote": "Sabit gecelik fiyat yayımlanmıyor. Tarih, kişi sayısı ve birim seçimine göre tesisten teklif alın.",
    "details": [
      "Resmî tesis yazısında en fazla 6 kişi belirtiliyor",
      "Özel bahçe, ateş çukuru ve barbekü",
      "Yerden ısıtma, klima, Wi-Fi ve otopark",
      "Yatak odası dağılımı ve ek yatak koşullarını teyit edin"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "HomyWood Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "homywood-trabzon"
  },
  {
    "id": "rua-sapanca",
    "name": "Rua Sapanca",
    "region": "Sapanca",
    "location": "Fevziye, Sapanca, Sakarya",
    "price": 15000,
    "capacity": 6,
    "bedrooms": 2,
    "tag": "Birlikte, doğada",
    "features": [
      "pool",
      "fireplace",
      "pets",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/691/rua_sapancadsc09814-f.webp",
    "description": "Fevziye’de iki yatak odası ve altı kişiye kadar kapasitesi bulunan bungalov. İlanda havuz, şömine, mutfak ve barbekü belirtiliyor.",
    "sourceName": "Sapanca Konaklama Rehberi",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-691-rua-sapanca",
    "priceNote": "Liste sayfasında 15.000 TL başlangıç fiyatı; detayda 6 kişilik tarife belirtiliyor. Tarih kapsamı doğrulanmadığı için toplam bedel hesaplanmaz.",
    "details": [
      "2 yatak odası, 2 banyo; 5. ve 6. misafir salondaki koltuklarda kalır",
      "Kahvaltı yalnızca 2 kişi için dahil",
      "Küçük ırk evcil hayvan kabulü belirtiliyor",
      "Havuz ölçüsü ilanda 3 × 7 m; ısıtma teyit edilmedi"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Rua Sapanca — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "rua-sapanca"
  },
  {
    "id": "wooden-palaces",
    "name": "Sapanca Wooden Palaces",
    "region": "Sapanca",
    "location": "Nailiye, Sapanca, Sakarya",
    "price": 17000,
    "capacity": 4,
    "capacityLabel": "4 yetişkin",
    "bedrooms": 2,
    "tag": "Göl manzaralı",
    "features": [
      "pool",
      "jacuzzi",
      "fireplace",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/528/sapanca_wooden_palace_1-f.jpg",
    "description": "Nailiye’de iki yatak odalı bungalovlar. Standart ve Deluxe seçeneklerinde özel havuz, jakuzi ve şömine bulunuyor; göl manzarasının kapsamı birime göre değişiyor.",
    "sourceName": "Sapanca Konaklama Rehberi",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-528-sapanca-wooden-palaces",
    "priceNote": "Liste sayfasında 17.000 TL başlangıç fiyatı. Standart/Deluxe birim, tarih ve çocuk koşulları ilandan teyit edilmeli.",
    "details": [
      "Filtre kapasitesi: 4 yetişkin; ilanda ayrıca 2 çocuk için koşullu konaklama belirtiliyor",
      "2 ayrı yatak odası ve özel bahçe",
      "Kahvaltı 2 kişi için dahil; diğer misafirler ayrıca ücretli",
      "Deluxe birimlerde panoramik, standart birimlerde kısmi göl manzarası",
      "Evcil hayvan kabul edilmiyor"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Wooden Palaces — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "wooden-palaces"
  },
  {
    "id": "grand-wooden",
    "name": "Sapanca Grand Wooden",
    "region": "Sapanca",
    "location": "Kuruçeşme, Sapanca, Sakarya",
    "price": 15000,
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Isıtmalı havuz",
    "features": [
      "pool",
      "heated",
      "jacuzzi",
      "fireplace",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/128/sapanca_grand_wooden_12-f.jpg",
    "description": "Kuruçeşme’de iki yatak odalı, dört kişilik bungalov seçeneği. İlanda özel ısıtmalı havuz, jakuzi, şömine, mutfak ve barbekü alanı listeleniyor.",
    "sourceName": "Sapanca Konaklama Rehberi",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-128-sapanca-grand-wooden",
    "priceNote": "Liste sayfasında 15.000 TL başlangıç fiyatı; dört kişilik tarife belirtiliyor. Tarih kapsamı ve ek hizmetler için teyit gerekir.",
    "details": [
      "Standart kapasite 4 kişi; yalnızca bazı birimler 5. misafire uygun",
      "İki ayrı yatak odası ve ebeveyn banyoları",
      "Kahvaltı 2 kişi için dahil; diğer misafirler ayrıca ücretli",
      "Evcil hayvan kabul edilmiyor"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Grand Wooden — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "grand-wooden"
  },
  {
    "id": "forbest-sapanca",
    "name": "Sapanca Forbest · 2+1 Bungalov",
    "region": "Sapanca",
    "location": "Babadayı, Sapanca, Sakarya",
    "price": null,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Ailece havuz keyfi",
    "features": [
      "pool",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/614/forbest_bungalovdscf4595-f.jpg",
    "description": "Forbest’in iki yatak odalı, beş yetişkine kadar kapasiteli bungalov seçeneği. İlanda havuz, mutfak, barbekü, klima ve kahvaltı bilgileri bulunuyor.",
    "sourceName": "Sapanca Konaklama Rehberi",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-614-sapanca-forbest-bungalov",
    "priceNote": "Tesisin genel listesinde 11.000 TL başlangıç fiyatı var; bunun 2+1 birime ait olduğu doğrulanmadığından bu kartta fiyat gösterilmez.",
    "details": [
      "Bu kart yalnızca havuzlu 2+1 birim içindir; en fazla 5 yetişkin",
      "Jakuzi yalnızca farklı 1+1 birim için belirtiliyor; bu karta eklenmedi",
      "Kahvaltı dahil; ek kişi ücretini teyit edin",
      "Kaynak fotoğrafı tesis galerisinden; birim seçimini rezervasyonda doğrulayın",
      "Evcil hayvan kabul edilmiyor"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Forbest · 2+1 Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "forbest-sapanca"
  },
  {
    "id": "rubin-white",
    "name": "Sapanca Rubin · White Bungalov",
    "region": "Sapanca",
    "location": "Mahmudiye, Sapanca, Sakarya",
    "price": null,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Havuz & hamak",
    "features": [
      "pool",
      "fireplace"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/621/rubin_sapancadscf4375-f.jpg",
    "description": "Rubin’in White adlı iki yatak odalı bungalov seçeneği. Beş yetişkine kadar kapasite, havuz, şömine, mutfak ve bahçede hamak ilanda belirtiliyor.",
    "sourceName": "Sapanca Konaklama Rehberi",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-621-sapanca-rubin-bungalov",
    "priceNote": "Genel listede 15.000 TL başlangıç fiyatı görülüyor; White biriminin tarih ve kişi tarifesi net olmadığı için fiyat gösterilmez.",
    "details": [
      "White birimi: 2 yatak odası, en fazla 5 yetişkin",
      "Sadece oda konsepti; evcil hayvan kabul edilmiyor",
      "Havuz ölçüsü ilanda 5 × 3 m",
      "Fotoğraf tesisin kaynak galerisindendir; birim ayrıntılarını teyit edin"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Rubin · White Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "sapanca-rubin"
  },
  {
    "id": "nesilce-dubleks",
    "name": "Nesilce · Çift Katlı Bungalov",
    "region": "Karadeniz",
    "location": "Mengen, Bolu",
    "price": null,
    "capacity": 6,
    "bedrooms": null,
    "tag": "Mengen ormanlarında",
    "features": [
      "breakfast"
    ],
    "image": "https://nesilcetatilkoyu.com/images/dubleks-bungalov/13-large.webp",
    "description": "Mengen’de Nesilce Tatil Köyü’nün dört ile altı kişi için sunduğu çift katlı ahşap bungalov. Resmî sayfada salon, banyo, geniş teras ve kahvaltı dahil konaklama belirtiliyor.",
    "sourceName": "Nesilce Tatil Köyü · Resmî site",
    "sourceUrl": "https://nesilcetatilkoyu.com/",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı belli bir gecelik tarife yayımlanmıyor. Kesin fiyat için işletmeden teklif alın.",
    "details": [
      "Çift katlı bungalov: 4–6 kişi kapasite",
      "İlanda 1 çift ve 2 tek yatak; ilave misafirlerin yatak düzenini teyit edin",
      "Geniş teras, salon ve banyo",
      "Kahvaltı dahil, Wi-Fi ve otopark belirtiliyor"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Nesilce · Çift Katlı Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "nesilce"
  },
  {
    "id": "cati-kati-bolu",
    "name": "Çatı Katı Bungalov",
    "region": "Karadeniz",
    "location": "Merkez, Bolu",
    "price": null,
    "capacity": 2,
    "bedrooms": 1,
    "tag": "Verandada bir sabah",
    "features": [
      "jacuzzi",
      "fireplace",
      "pets"
    ],
    "image": "https://catikatibungalow.com/dacegug/2022/06/34-1.jpg",
    "description": "Bolu’da asma kat yatak odası, veranda ve bahçe sunan bungalov. Resmî birim açıklamasında jakuzi, şömine, mutfak, Wi-Fi ve klima listeleniyor.",
    "sourceName": "Çatı Katı Bungalov · Resmî site",
    "sourceUrl": "https://catikatibungalow.com/dome-bungalov/",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı belli bir gecelik tarife yayımlanmıyor. Kesin fiyat için işletmeden teklif alın.",
    "details": [
      "Standart bungalov: 2 yetişkin; çocuk koşulları ayrıca teyit edilmeli",
      "İlanda 50 m² giriş katı ve 18 m² asma kat belirtiliyor",
      "Kendine ait bahçe ve barbekü",
      "Tesis ana sayfasında evcil hayvan kabulü belirtiliyor; koşulları sorunuz"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Çatı Katı Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "cati-kati-bolu"
  },
  {
    "id": "evcek-junior",
    "name": "Evcek · Junior Bungalov",
    "region": "Karadeniz",
    "location": "Merkez, Düzce",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Düzce’de küçük mola",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/duzce/evcekbungalov35ba32bc.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "description": "Düzce–Yığılca yolu üzerindeki Evcek tesisinin iki kişilik Junior Bungalov birimi. Karttaki fotoğraf, ilanda doğrudan bu oda tipiyle eşleştirilmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/evcek-bungalov",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı belli bir gecelik tarife yayımlanmıyor. Kesin fiyat için işletmeden teklif alın.",
    "details": [
      "Junior Bungalov: en fazla 2 kişi",
      "Giriş ve çıkış saatleri ilanda 14.00 / 12.00",
      "Evcil hayvan kabulü farklı tesislerda çelişiyor; tesisten teyit edin",
      "Tesisin diğer oda tiplerindeki jakuzi ve havuz bu birime aktarılmadı"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Evcek · Junior Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "evcek"
  },
  {
    "id": "seyrona-102",
    "name": "Seyrona · 102 Loft Bungalov",
    "region": "Karadeniz",
    "location": "Derecik, Çamlıhemşin, Rize",
    "price": null,
    "capacity": 2,
    "bedrooms": 1,
    "tag": "Vadiye karşı jakuzi",
    "features": [
      "jacuzzi",
      "fireplace",
      "breakfast"
    ],
    "image": "https://www.seyronabutikotel.com/upload/rooms/4oqeOasyHY_102-103-104-105-106-bungalovlar_ruubiko_app_rooms.jpg",
    "description": "Derecik’te vadi manzaralı, iki kişilik loft bungalov. Resmî birim sayfasında 55 m² alan, özel jakuzi, şömine, klima ve serpme kahvaltı belirtiliyor.",
    "sourceName": "Seyrona · Resmî site",
    "sourceUrl": "https://www.seyronabutikotel.com/102-bungalov",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı belli bir gecelik tarife yayımlanmıyor. Kesin fiyat için işletmeden teklif alın.",
    "details": [
      "102 Loft: 2 kişi, 1 oda, 55 m²",
      "Serpme kahvaltı dahil; Wi-Fi ve otopark",
      "Mini buzdolabı, kettle ve oturma alanı",
      "Yüzme havuzu ayrıca doğrulanmadı; jakuzi yüzme havuzu olarak etiketlenmedi"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Seyrona · 102 Loft Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "seyrona"
  },
  {
    "id": "gafulluk-ahsap",
    "name": "Gafulluk · Ahşap Bungalov",
    "region": "Karadeniz",
    "location": "Araklı, Trabzon",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Araklı’da yeşile uyan",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/trabzon/gafulluktatilkoyudf5d493e.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "description": "Araklı’daki Gafulluk Tatil Köyü’nde, ilanda dört kişi kapasiteli olarak listelenen ahşap bungalov. Bu kart diğer taş villa ve suit oda tiplerini kapsamaz.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/gafulluk-tatil-koyu",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı belli bir gecelik tarife yayımlanmıyor. Kesin fiyat için işletmeden teklif alın.",
    "details": [
      "İlanda AHŞAP BUNGALOV olarak listelenen birim; en fazla 4 kişi",
      "Kaynak fotoğrafı doğrudan ahşap bungalov oda kartından alındı",
      "Tesisin jakuzili taş birimleri farklıdır; jakuzi bu karta eklenmedi",
      "Yatak odası düzeni, kahvaltı ve güncel müsaitliği ilanda teyit edin"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Gafulluk · Ahşap Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "gafulluk",
    "aliases": [
      "Gafulluk Tatil Köyü"
    ]
  },
  {
    "region": "Sapanca",
    "price": null,
    "sourceName": "Sapanca Konaklama Rehberi",
    "checkedOn": "2026-08-27",
    "priceNote": "Tesisin genel başlangıç fiyatı seçilen bungalov tipi ve tarihle kesin eşleştirilemedi. Güncel fiyat ve kişi kapsamını işletmeden teyit edin.",
    "id": "hilltown-sapanca",
    "name": "Sapanca Hilltown · 2+1 Bungalov",
    "location": "Babadayı, Sapanca, Sakarya",
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Verandada jakuzi",
    "features": [
      "pool",
      "heated",
      "jacuzzi"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/319/hilltown17-f.jpg",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-319-sapanca-hilltown-bungalov",
    "description": "Babadayı’da iki yatak odalı bungalov seçeneği. İlanda özel ısıtmalı havuz, verandada jakuzi, mutfak ve bahçede barbekü belirtiliyor.",
    "details": [
      "2+1 birim: en fazla 5 yetişkin; tesisteki 1+1 evler ayrı kart yapılmadı",
      "Kahvaltı ayrıca ücretli; evcil hayvan kabul edilmiyor",
      "Fotoğraf tesis galerisindendir; birim seçimini işletmeyle teyit edin"
    ],
    "imageAlt": "Sapanca Hilltown · 2+1 Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "hilltown-sapanca"
  },
  {
    "region": "Sapanca",
    "price": null,
    "sourceName": "Sapanca Konaklama Rehberi",
    "checkedOn": "2026-08-27",
    "priceNote": "Tesisin genel başlangıç fiyatı seçilen bungalov tipi ve tarihle kesin eşleştirilemedi. Güncel fiyat ve kişi kapsamını işletmeden teyit edin.",
    "id": "kuka-sapanca",
    "name": "Sapanca Kuka Bungalov",
    "location": "Hacımercan, Sapanca, Sakarya",
    "capacity": 3,
    "bedrooms": 1,
    "tag": "Havuz & şömine",
    "features": [
      "pool",
      "jacuzzi",
      "fireplace",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/251/kuka_bungalovdscf6499-f.jpg",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-251-sapanca-kuka-bungalov",
    "description": "Hacımercan’da üç kişiye kadar konaklama sunan tesisin havuzlu, jakuzili 1+1 seçeneği. Restoran ve kahvaltı hizmeti bulunuyor.",
    "details": [
      "Havuzlu 1+1 seçeneği esas alındı; tesiste havuzsuz bir ev de var",
      "Kahvaltı dahil; diğer restoran siparişleri ayrıca ücretli",
      "Mutfak bölümünde ocak bulunmuyor; evcil hayvan kabul edilmiyor"
    ],
    "imageAlt": "Sapanca Kuka Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "kuka-sapanca"
  },
  {
    "region": "Sapanca",
    "price": null,
    "sourceName": "Sapanca Konaklama Rehberi",
    "checkedOn": "2026-08-27",
    "priceNote": "Tesisin genel başlangıç fiyatı seçilen bungalov tipi ve tarihle kesin eşleştirilemedi. Güncel fiyat ve kişi kapsamını işletmeden teyit edin.",
    "id": "stone-sapanca",
    "name": "Sapanca Stone Bungalov",
    "location": "Sapanca, Sakarya",
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Havuz & sauna",
    "features": [
      "pool",
      "jacuzzi"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/253/stone_bungalovdscf7012-f.jpg",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-253-sapanca-stone-bungalov",
    "description": "İki yatak odası, mutfak ve bahçe sunan havuzlu bungalov. Kaynağın jakuzili 2+1 biriminde sauna da listeleniyor.",
    "details": [
      "Havuzlu jakuzili 2+1 birim: 1 çift kişilik ve 2 tek kişilik yatak",
      "White birimi farklıdır; sauna bu birimde bulunmuyor",
      "Salonda elektrikli şömine belirtiliyor; odunlu şömine olarak etiketlenmedi",
      "Dört kişilik kapsam esas alındı; çocuk ve ek kişi koşullarını teyit edin"
    ],
    "imageAlt": "Sapanca Stone Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "stone-sapanca"
  },
  {
    "region": "Sapanca",
    "price": 16000,
    "sourceName": "Sapanca Konaklama Rehberi",
    "checkedOn": "2026-08-27",
    "priceNote": "Rehberin liste sayfasında 16.000 TL başlangıç fiyatı görülüyor. Kesin tarih kapsamı bilinmediğinden toplam konaklama bedeli hesaplanmaz.",
    "id": "majesty-sapanca",
    "name": "Sapanca Majesty Bungalov",
    "location": "Sapanca, Sakarya",
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Bahçede özel havuz",
    "features": [
      "pool",
      "jacuzzi",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/553/majesty_sapancadscf3476-f.jpg",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-553-sapanca-majesty-bungalov",
    "description": "Dört kişilik, iki yatak odalı bungalovlarıyla Sapanca’da konaklama seçeneği. Özel havuz, jakuzi ve taş barbekü ilanda belirtiliyor.",
    "details": [
      "2+1 düzen; üst katta çift kişilik, alt katta iki tek kişilik yatak",
      "Kahvaltı yalnızca 2 kişi için dahil; ek kahvaltı ayrıca ücretli",
      "Evcil hayvan kabul edilmiyor; havuz ısıtması mevsime göre ayrıca teyit edilmeli",
      "Aynı tesisin farklı platformlardaki ilanları tek kayıtta tutuldu"
    ],
    "imageAlt": "Sapanca Majesty Bungalov — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "majesty-sapanca",
    "otherSources": [
      {
        "name": "TatilBudur",
        "url": "https://www.tatilbudur.com/majesty-sapanca"
      }
    ]
  },
  {
    "region": "Sapanca",
    "price": null,
    "sourceName": "Sapanca Konaklama Rehberi",
    "checkedOn": "2026-08-27",
    "priceNote": "Tesisin genel başlangıç fiyatı seçilen bungalov tipi ve tarihle kesin eşleştirilemedi. Güncel fiyat ve kişi kapsamını işletmeden teyit edin.",
    "id": "alis-paradise",
    "name": "Sapanca Alis Paradise · 2+1",
    "location": "Şükriye, Sapanca, Sakarya",
    "capacity": 4,
    "capacityLabel": "4 yetişkin",
    "bedrooms": 2,
    "tag": "Havuz başında kahvaltı",
    "features": [
      "pool",
      "jacuzzi",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/351/alis_paradise_bungalovdscf1745-f.jpg",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-351-sapanca-alis-paradise",
    "description": "Şükriye’de özel havuzlu, jakuzili bungalov tesisi. Bu kartta iki yatak odalı 2+1 seçeneğinin dört yetişkin kapasitesi kullanılıyor.",
    "details": [
      "2+1 birim: 4 yetişkin; ilave çocuk kabulü koşullu",
      "İki kişilik kahvaltı dahil; ek misafirlerin kahvaltısı ayrıca ücretli",
      "Bazı 1+1 birimlerde bulunan şömine bu 2+1 karta aktarılmadı",
      "Mutfak, Wi-Fi ve bahçe mobilyaları; evcil hayvan kabul edilmiyor"
    ],
    "imageAlt": "Sapanca Alis Paradise · 2+1 — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "alis-paradise"
  },
  {
    "region": "Sapanca",
    "price": null,
    "sourceName": "Sapanca Konaklama Rehberi",
    "checkedOn": "2026-08-27",
    "priceNote": "Tesisin genel başlangıç fiyatı seçilen bungalov tipi ve tarihle kesin eşleştirilemedi. Güncel fiyat ve kişi kapsamını işletmeden teyit edin.",
    "id": "seven-sense",
    "name": "Sapanca 7 Sense Nature Resort",
    "location": "Hacımercan, Sapanca, Sakarya",
    "capacity": 4,
    "capacityLabel": "4 yetişkin",
    "bedrooms": 2,
    "tag": "Doğada aile molası",
    "features": [
      "pool",
      "jacuzzi",
      "fireplace",
      "pets",
      "breakfast"
    ],
    "image": "https://cdn.trav3l.net/sapancakonaklamarehberi.com/files/hotels/338/7_sense7-f.jpg",
    "sourceUrl": "https://www.sapancakonaklamarehberi.com/o-338-sapanca-7-sense-nature-resort",
    "description": "Hacımercan’da King 2+1 bungalov seçeneği. İlanda özel havuz, verandada jakuzi, şömine, mutfak ve çocuk oyun alanı belirtiliyor.",
    "details": [
      "King biriminin ayrıntılı açıklamasındaki 4 yetişkin kapasitesi esas alındı; ilanda 5 kişi ifadesi de var, teyit edin",
      "Kahvaltı ve evcil hayvan kabulü belirtiliyor; kapsam ve koşullar işletmeden doğrulanmalı",
      "Ultra King aynı tesisin birimidir; ayrıca ilan olarak eklenmedi",
      "Misafir kabul koşulları ve çıkış saati rezervasyondan önce teyit edilmeli"
    ],
    "imageAlt": "Sapanca 7 Sense Nature Resort — kaynak sitedeki tesis fotoğrafı",
    "facilityKey": "seven-sense",
    "aliases": [
      "7 Sense Sapanca",
      "Seven Sense Nature Resort"
    ]
  },
  {
    "region": "Sapanca",
    "bedrooms": 2,
    "sourceName": "Bungalovla.com",
    "checkedOn": "2026-08-27",
    "id": "galaksi-life",
    "name": "Galaksi Life Bungalov",
    "capacity": 4,
    "price": 13000,
    "location": "Sapanca, Sakarya",
    "tag": "Sıcak havuz & jakuzi",
    "features": [
      "pool",
      "heated",
      "jacuzzi",
      "fireplace",
      "pets",
      "breakfast"
    ],
    "image": "https://www.bungalovla.com/images/hotel/29245_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/galaksi-life-bungalov-sapanca",
    "description": "Sapanca’da iki yatak odalı, dört kişilik bungalov. İlanda ısıtmalı havuz, jakuzi, şömine ve korunaklı bahçe belirtiliyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 1 banyo, 4 kişi",
      "Kahvaltı 2 kişi için dahil; şömine odunu ayrıca ücretli",
      "Evcil hayvan kabulünde ek temizlik ücreti var; misafir kabul koşullarını teyit edin"
    ],
    "priceNote": "İlanda 13.000 TL başlangıç fiyatı görülüyor. Tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "imageAlt": "Galaksi Life Bungalov — Bungalovla.com ilan fotoğrafı",
    "facilityKey": "galaksi-life"
  },
  {
    "region": "Sapanca",
    "bedrooms": 2,
    "sourceName": "Bungalovla.com",
    "checkedOn": "2026-08-27",
    "id": "ruya-live",
    "name": "Sapanca Rüya Live Bungalov",
    "capacity": 5,
    "price": 12000,
    "location": "Sapanca, Sakarya",
    "tag": "Bahçede jakuzi",
    "features": [
      "pool",
      "heated",
      "jacuzzi"
    ],
    "image": "https://www.bungalovla.com/images/hotel/27466_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/sapanca-ruyalive-bungalov",
    "description": "Beş kişilik kapasiteyle listelenen iki odalı Sapanca bungalovu. Bahçede ısıtmalı havuz, jakuzi, barbekü ve ateş çukuru bulunuyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 1 banyo, 5 kişi",
      "Mutfak, Wi-Fi ve klima belirtiliyor; kahvaltı dahil değil",
      "Misafir kabul koşullarını işletmeden teyit edin"
    ],
    "priceNote": "İlanda 12.000 TL başlangıç fiyatı görülüyor. Tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "imageAlt": "Sapanca Rüya Live Bungalov — Bungalovla.com ilan fotoğrafı",
    "facilityKey": "ruya-live"
  },
  {
    "region": "Sapanca",
    "bedrooms": 2,
    "sourceName": "Bungalovla.com",
    "checkedOn": "2026-08-27",
    "id": "last-summer",
    "name": "Sapanca Last Summer Bungalov",
    "capacity": 5,
    "price": 12000,
    "location": "Sapanca, Sakarya",
    "tag": "Havuz kenarında mola",
    "features": [
      "pool",
      "heated",
      "jacuzzi"
    ],
    "image": "https://www.bungalovla.com/images/hotel/27802_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/sapanca-last-summer",
    "description": "İki yatak odalı, beş kişiye kadar kapasiteli bungalov. İlanda ısıtmalı havuz, jakuzi, mutfak, barbekü ve bahçe oturma alanı listeleniyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 1 banyo, 5 kişi",
      "Bir çift kişilik, iki tek kişilik yatak ve oturma grubu",
      "Sadece oda konsepti; kahvaltı dahil değil"
    ],
    "priceNote": "İlanda 12.000 TL başlangıç fiyatı görülüyor. Tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "imageAlt": "Sapanca Last Summer Bungalov — Bungalovla.com ilan fotoğrafı",
    "facilityKey": "last-summer"
  },
  {
    "region": "Sapanca",
    "bedrooms": 2,
    "sourceName": "Bungalovla.com",
    "checkedOn": "2026-08-27",
    "id": "vupi-sapanca",
    "name": "Sapanca Vupi Bungalov",
    "capacity": 5,
    "price": 13000,
    "location": "Kırkpınar, Sapanca, Sakarya",
    "tag": "Kırkpınar’da kaçamak",
    "features": [
      "pool",
      "heated",
      "jacuzzi"
    ],
    "image": "https://www.bungalovla.com/images/hotel/21951_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/sapanca-vupi-bungalov1",
    "description": "Kırkpınar’da iki yatak odalı ve beş kişilik bungalov. Isıtmalı havuz, jakuzi, korunaklı bahçe ve mutfak ilanda belirtiliyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 1 banyo, 5 kişi",
      "Bahçede ateş çukuru, barbekü ve oturma alanı",
      "Evcil hayvan kabul edilmiyor; kahvaltı dahil olduğu doğrulanmadı"
    ],
    "priceNote": "İlanda 13.000 TL başlangıç fiyatı görülüyor. Tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "imageAlt": "Sapanca Vupi Bungalov — Bungalovla.com ilan fotoğrafı",
    "facilityKey": "vupi-sapanca"
  },
  {
    "id": "alit-sapanca",
    "name": "Sapanca Alit Bungalov",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": 15000,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Göl manzarasında jakuzi",
    "features": [
      "pool",
      "jacuzzi",
      "fireplace"
    ],
    "image": "https://www.bungalovla.com/images/hotel/28693_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/sapanca-alit-bungalov",
    "sourceName": "Bungalovla.com",
    "description": "Göl manzarasıyla tanıtılan iki yatak odalı bungalov. İlanda havuz, jakuzi, şömine ve ocaklı mutfak belirtiliyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 2 banyo, 5 kişi",
      "Bahçede havuz, barbekü ve şezlong; havuz ısıtması doğrulanmadı",
      "Şömine odunu ayrıca ücretli; kahvaltı dahil olduğu belirtilmiyor"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Alit Bungalov — kaynak sitedeki tesis fotoğrafı",
    "priceNote": "İlanda 15.000 TL başlangıç fiyatı görülüyor. Tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "facilityKey": "alit-sapanca"
  },
  {
    "id": "egg-sapanca",
    "name": "Sapanca Egg Bungalov",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": 12000,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Şömine & bahçe",
    "features": [
      "pool",
      "jacuzzi",
      "fireplace"
    ],
    "image": "https://www.bungalovla.com/images/hotel/27617_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/sapanca-egg-bungalov",
    "sourceName": "Bungalovla.com",
    "description": "Beş kişilik kapasiteyle listelenen, iki yatak odalı bungalov. Havuz, jakuzi, şömine, yerden ısıtma ve mutfak ilanda yer alıyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 1 banyo, 5 kişi",
      "Yerden ısıtma, havuz ısıtması anlamına gelmez; ısıtmalı havuz etiketi eklenmedi",
      "Şömine odunu ayrıca ücretli; sadece oda konsepti"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Egg Bungalov — kaynak sitedeki tesis fotoğrafı",
    "priceNote": "İlanda 12.000 TL başlangıç fiyatı görülüyor. Tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "facilityKey": "egg-sapanca"
  },
  {
    "id": "bisn-sapanca",
    "name": "Sapanca Bişn Bungalov",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": 12000,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Aile için bahçeli ev",
    "features": [
      "pool",
      "jacuzzi"
    ],
    "image": "https://www.bungalovla.com/images/hotel/27771_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/sapanca-bisn-bungalov",
    "sourceName": "Bungalovla.com",
    "description": "Sapanca’da iki yatak odalı, beş kişi kapasiteli bungalov. Jakuzi, havuz, ocaklı mutfak ve bahçede barbekü belirtiliyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 1 banyo, 5 kişi",
      "İlanda aile şartı belirtiliyor; rezervasyon öncesinde teyit edin",
      "Havuz ısıtması ve kahvaltı dahil olduğu doğrulanmadı"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Bişn Bungalov — kaynak sitedeki tesis fotoğrafı",
    "priceNote": "İlanda 12.000 TL başlangıç fiyatı görülüyor. Tarih ve kişi kapsamı açık olmadığından toplam konaklama bedeli hesaplanmaz.",
    "facilityKey": "bisn-sapanca"
  },
  {
    "id": "srk-sapanca",
    "name": "Sapanca Srk Bungalov",
    "region": "Sapanca",
    "location": "Sapanca, Sakarya",
    "price": null,
    "capacity": 5,
    "bedrooms": 2,
    "tag": "Göl manzarası & şömine",
    "features": [
      "pool",
      "heated",
      "fireplace"
    ],
    "image": "https://www.bungalovla.com/images/hotel/25549_t.jpg",
    "sourceUrl": "https://www.bungalovla.com/sapanca-srk-bungalov",
    "sourceName": "Bungalovla.com",
    "description": "Göl manzarasıyla listelenen beş kişilik bungalov. İlanda ısıtmalı havuz, şömine, mutfak ve bahçede salıncak belirtiliyor.",
    "details": [
      "Kaynak tesis kartı: 2 yatak odası, 1 banyo, 5 kişi",
      "Jakuzi ilanda doğrulanmadığından bu özellik eklenmedi",
      "Fiyat için kaynak işletmeyle iletişim kurulması isteniyor"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Sapanca Srk Bungalov — kaynak sitedeki tesis fotoğrafı",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş tarife bulunmuyor. Fiyat ve müsaitlik işletmeden teyit edilmeli.",
    "facilityKey": "srk-sapanca"
  },
  {
    "id": "asteria-giresun",
    "name": "Asteria Bungalov",
    "region": "Karadeniz",
    "location": "Keşap, Giresun",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Keşap’ta sahile yakın",
    "features": [
      "pool",
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkey/giresun/asteriabungalov77268fdf.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/asteria-bungalov",
    "sourceName": "Otelz",
    "description": "Keşap’ta sahile yürüme mesafesinde olduğu belirtilen tesis. Kaynağın bungalov birimi üç kişi kapasiteli; açık yüzme havuzu ve barbekü olanağı listeleniyor.",
    "details": [
      "Bungalov birimi: en fazla 3 kişi; yatak odası sayısı belirtilmemiş",
      "Evcil hayvan kabulü, Wi-Fi ve otopark ilanda yer alıyor",
      "Havuzun özel kullanıma ait olduğu veya ısıtıldığı doğrulanmadı"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Asteria Bungalov — kaynak sitedeki tesis fotoğrafı",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş tarife bulunmuyor. Fiyat ve müsaitlik işletmeden teyit edilmeli.",
    "facilityKey": "asteria-giresun"
  },
  {
    "id": "loin-du-monde",
    "name": "Ordu Bungalov · Üçgen",
    "region": "Karadeniz",
    "location": "Çaytepe, Perşembe, Ordu",
    "price": null,
    "capacity": 6,
    "bedrooms": null,
    "tag": "Karadeniz’e bakan teras",
    "features": [
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkey/ordu/persembe/ordubungalovloindumonde2016c36d.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/ordu-bungalov-loin-du-monde",
    "sourceName": "Otelz",
    "description": "Perşembe Çaytepe’de Loin Du Monde tesisinin üçgen bungalov seçeneği. Birim bilgilerinde altı kişilik kapasite; tesis bilgilerinde bahçe, barbekü, Wi-Fi ve otopark belirtiliyor.",
    "details": [
      "Üçgen Bungalov: en fazla 6 kişi; yatak odası sayısı ayrıca teyit edilmeli",
      "Evcil hayvan kabulü ilanda belirtiliyor; koşulları teyit edin",
      "Superior adıyla 4 kişilik birim de listeleniyor; oda tipleri ve kapasiteleri birbirine aktarılmadı",
      "Tiny House aynı tesisteki farklı konaklama tipidir; ayrı bungalov ilanı yapılmadı"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Ordu Bungalov Loin Du Monde — Otelz üçgen bungalov oda fotoğrafı",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş tarife bulunmuyor. Fiyat ve müsaitlik işletmeden teyit edilmeli.",
    "facilityKey": "loin-du-monde",
    "aliases": [
      "Loin Du Monde",
      "Ordu Bungalov Loin Du Monde"
    ],
    "otherSources": [
      {
        "name": "Tesisin resmî sitesi",
        "url": "https://www.ordubungalov.com/"
      },
      {
        "name": "Hotels.com · farklı oda tipleri",
        "url": "https://tr.hotels.com/ho3746216832/ordu-bungalov-lo-n-du-monde/"
      },
      {
        "name": "Enuygun",
        "url": "https://www.enuygun.com/otel/detay/ordu-bungalov-1200354/"
      }
    ]
  },
  {
    "id": "pagen-artvin",
    "name": "Pagen Bungalow",
    "region": "Karadeniz",
    "location": "Pınarlı, Hopa, Artvin",
    "price": null,
    "capacity": 3,
    "bedrooms": 1,
    "tag": "Hopa’da deniz manzarası",
    "features": [],
    "image": "https://cdn3.enuygun.com/r/media/lib/1x420/uploads/image/pagen-bungalow-artvin-room-26996747.webp",
    "sourceUrl": "https://www.enuygun.com/otel/detay/pagen-bungalow-28611/",
    "sourceName": "Enuygun",
    "description": "Hopa’nın Pınarlı köyünde deniz manzaralı bungalov. Tesis kaynağında bahçe, teras ve Wi-Fi; ek oda kaynağında bir yatak odası ve üç kişilik kapasite listeleniyor.",
    "details": [
      "Deniz manzaralı bungalov; en fazla 3 misafir",
      "1 çift kişilik yatak ve 1 tek kişilik çekyat; en fazla 3 kişi",
      "Odada kahvaltı hizmeti belirtiliyor ancak fiyata dahil olduğu doğrulanmadı",
      "Pagen Bungalow ve Pagen Bungalov adları aynı tesis için tek kayıtta tutuldu"
    ],
    "checkedOn": "2026-08-27",
    "imageAlt": "Pagen Bungalow — kaynak sitedeki tesis fotoğrafı",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş tarife bulunmuyor. Fiyat ve müsaitlik işletmeden teyit edilmeli.",
    "facilityKey": "pagen-artvin",
    "aliases": [
      "Pagen Bungalov"
    ],
    "otherSources": [
      {
        "name": "Hotels.com · oda kapasitesi",
        "url": "https://tr.hotels.com/ho3388804448/pagen-bungalov/"
      },
      {
        "name": "Obilet",
        "url": "https://www.obilet.com/otel/pagen-bungalov"
      }
    ]
  },
  {
    "id": "aybelya-bafra",
    "name": "Aybelya · Deluxe Havuzlu Bungalov",
    "location": "Lengerli, Bafra, Samsun",
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Bafra’da bahçeli kaçamak",
    "features": [
      "pool",
      "fireplace"
    ],
    "image": "https://www.aybelya.com/_next/image?q=75&url=https%3A%2F%2Fres.cloudinary.com%2Fdcg0pdion%2Fimage%2Fupload%2Fv1775908732%2Fadminaybelya%2Fbungalows%2Fm6b0urylbsrdpqyh70xr.jpg&w=3840",
    "sourceUrl": "https://www.aybelya.com/bungalovlar/deluxe-4-kisilik-havuzlu",
    "sourceName": "Aybelya · Resmî site",
    "description": "Bafra Lengerli’de iki yatak odalı, dört kişilik dubleks bungalov. Resmî birim sayfasında havuz, bahçe, mini mutfak ve şömineli soba belirtiliyor.",
    "details": [
      "Deluxe havuzlu birim: 70 m², 2 yatak odası, 2–4 kişi",
      "Bahçede barbekü, salıncak, ateş çukuru ve şezlong",
      "Kahvaltı hizmeti listeleniyor; tarifeye dahil olduğu ayrıca teyit edilmeli",
      "Tesisin diğer bungalov ve tiny house tipleri ayrı kayıt yapılmadı"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Aybelya · Deluxe Havuzlu Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "aybelya-bafra",
    "aliases": [
      "Aybelya Tatil Köyü",
      "Aybelya Resort"
    ],
    "otherSources": [
      {
        "name": "TatilBudur",
        "url": "https://www.tatilbudur.com/aybelya-tatil-koyu"
      },
      {
        "name": "Enuygun",
        "url": "https://www.enuygun.com/otel/detay/aybelya-tatil-koyu-26415/"
      }
    ]
  },
  {
    "id": "mencuna-artvin",
    "name": "Mençuna · Şelale Manzaralı Bungalov",
    "location": "Küçükköy, Arhavi, Artvin",
    "capacity": 5,
    "capacityLabel": "4+1 misafir",
    "bedrooms": 2,
    "tag": "Şelalenin sesiyle uyan",
    "features": [
      "breakfast"
    ],
    "image": "https://mencunakonaklari.com/wp-content/themes/mencuna-theme/images/bungalow.jpeg",
    "sourceUrl": "https://mencunakonaklari.com/odalar/",
    "sourceName": "Mençuna Konakları · Resmî site",
    "description": "Kamilet Vadisi’nde şelale manzaralı, iki odalı ahşap bungalov. Tesis bilgilerinde balkon, kahvaltı ve ek yatakla beş kişilik kapasite belirtiliyor.",
    "details": [
      "32 m²; bir çift kişilik, iki tek kişilik yatak; beşinci misafir için ek yatak",
      "Kahvaltı dahil; ortak mutfak ve barbekü kullanımı mevcut",
      "Evcil hayvan kabul edilmiyor; taş konak odaları bu karta dahil değil"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Mençuna · Şelale Manzaralı Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "mencuna-artvin",
    "aliases": [
      "Mençuna Konakları"
    ],
    "otherSources": [
      {
        "name": "Jolly",
        "url": "https://www.jollytur.com/mencuna-konaklari"
      },
      {
        "name": "Tatilsepeti",
        "url": "https://www.tatilsepeti.com/mencuna-konaklari"
      }
    ]
  },
  {
    "id": "pafuli-rize",
    "name": "Pafuli · Frezya Suit Bungalov",
    "location": "Hamidiye, Merkez, Rize",
    "capacity": 4,
    "bedrooms": null,
    "tag": "Rize’de dubleks konaklama",
    "features": [
      "jacuzzi"
    ],
    "image": "https://imgkit.otelz.com/turkiye/rize/rize-merkez/pafuli-bungalov_234ef40c.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/pafuli-bungalov",
    "sourceName": "Otelz",
    "description": "Pafuli tesisinin dört kişilik Frezya Suit dubleks bungalov seçeneği. İlanda jakuzi, Wi-Fi, otopark ve açık hava oyun alanı belirtiliyor.",
    "details": [
      "Frezya Suit Dubleks: en fazla 4 kişi; yatak odası sayısı açıkça belirtilmemiş",
      "Evcil hayvan kabul edilmiyor; kahvaltı kapsamı teyit edilmeli",
      "Mimoza, Patunya, Azelya ve Gardenya aynı tesise ait; ayrı ilan sayılmadı"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Pafuli · Frezya Suit Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "pafuli-rize"
  },
  {
    "id": "tenora-rize",
    "name": "Tenora · 2+1 Bungalov",
    "location": "Ardeşen, Rize",
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Ardeşen’de özel havuz",
    "features": [
      "pool"
    ],
    "image": "https://imgkit.otelz.com/turkiye/rize/ardesen/tenora_8a3a2ab9.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/tenora-bungalov",
    "sourceName": "Otelz",
    "description": "Ardeşen’de dört kişi kapasiteli 2+1 bungalov. Birim bilgisinde özel havuz ve klima; tesis olanaklarında bahçe, teras ve Wi-Fi listeleniyor.",
    "details": [
      "2+1 birim: en fazla 4 kişi; Tenora2 ve Tenora3 ayrı tesis sayılmadı",
      "Evcil hayvan kabul edilmiyor; havuz ısıtması doğrulanmadı",
      "Fındıklı’daki Teona farklı bir tesistir; ad benzerliği nedeniyle birleştirilmedi"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Tenora · 2+1 Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "tenora-rize"
  },
  {
    "id": "madag-rize",
    "name": "Madağ · Şömineli Bungalov",
    "location": "Yeniyol, Ardeşen, Rize",
    "capacity": 3,
    "bedrooms": null,
    "tag": "Şömine başında Karadeniz",
    "features": [
      "fireplace",
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkey/rize/ardesen/madagbungalovecb0851c.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/madag-bungalov",
    "sourceName": "Otelz",
    "description": "Yeniyol’da Madağ tesisinin üç kişilik Dublex Şömineli Bungalov-8 seçeneği. İlgili birimin fotoğrafı ve kapasitesi birim bilgileriyle eşleştirildi.",
    "details": [
      "Dublex Şömineli Bungalov-8: en fazla 3 kişi",
      "Evcil hayvan kabulü belirtiliyor; koşulları işletmeden teyit edin",
      "Tesisteki jakuzili ve taş birimlerin özellikleri bu karta aktarılmadı"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Madağ · Şömineli Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "madag-rize"
  },
  {
    "id": "oce-rize",
    "name": "Oce · Büyük Bungalov",
    "location": "Ardeşen, Rize",
    "capacity": 4,
    "bedrooms": null,
    "tag": "Sahile yakın bir mola",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/rize/ardesen/oce-bungalow_3e49b687.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/oce-bungalow",
    "sourceName": "Otelz",
    "description": "Ardeşen’de sahile yakın olarak listelenen tesisin dört kişilik Büyük Bungalow seçeneği. Diğer oda tipleriyle karışmaması için yalnızca bu birim esas alındı.",
    "details": [
      "Büyük Bungalow: en fazla 4 kişi; ilanda iki çift kişilik yatak belirtiliyor",
      "Yatak sayısından ayrı yatak odası sayısı çıkarılmadı",
      "Evcil hayvan kabul edilmiyor; kahvaltı ve diğer olanaklar ayrıca teyit edilmeli"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Oce · Büyük Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "oce-rize"
  },
  {
    "id": "ruby-rize",
    "name": "Ruby · Big Room Bungalov",
    "location": "Pazar, Rize",
    "capacity": 7,
    "bedrooms": null,
    "tag": "Yedi kişilik Karadeniz molası",
    "features": [
      "jacuzzi"
    ],
    "image": "https://imgkit.otelz.com/turkiye/rize/pazar/ruby-bungalov-dogal-yasam_58cff0e9.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/ruby-bungalovdogal-yasam-evleri",
    "sourceName": "Otelz",
    "description": "Pazar’daki Ruby Doğal Yaşam Evleri’nin yedi kişilik Big Room bungalov seçeneği. İlanda jakuzi ve tesis bünyesinde otopark listeleniyor.",
    "details": [
      "Big Room: en fazla 7 kişi; Black ve White birimleri ayrı ilan yapılmadı",
      "Yatak odası sayısı ilanda açıkça belirtilmemiş",
      "Evcil hayvan kabul edilmiyor; kahvaltı ve ek misafir koşulları teyit edilmeli"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Ruby · Big Room Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "ruby-rize",
    "aliases": [
      "Ruby Bungalov Doğal Yaşam Evleri"
    ]
  },
  {
    "id": "teona-rize",
    "name": "Teona · Dere Manzaralı Bungalov",
    "location": "Çağlayan, Fındıklı, Rize",
    "capacity": 4,
    "bedrooms": null,
    "tag": "Dere kenarında dubleks",
    "features": [
      "jacuzzi",
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkey/rize/findikli/teonacaglayanbungalovcb476c96.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/teona-bungalov",
    "sourceName": "Otelz",
    "description": "Fındıklı Çağlayan’da, dört kişilik dere manzaralı dubleks bungalov. İlanda jakuzi, Wi-Fi ve evcil hayvan kabulü belirtiliyor.",
    "details": [
      "Dört kişilik dere manzaralı birim esas alındı; altı kişilik seçenek ayrı tesis sayılmadı",
      "Evcil hayvan kabul koşulları ve kahvaltı kapsamı işletmeden teyit edilmeli",
      "Teona Çağlayan adıyla da geçen tesis, Ardeşen’deki Tenora’dan farklıdır"
    ],
    "region": "Karadeniz",
    "price": null,
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde seçilen bungalov tipi için güncel tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Kesin fiyat için işletmeden bilgi alın.",
    "imageAlt": "Teona · Dere Manzaralı Bungalov — kaynak sitedeki bungalov fotoğrafı",
    "facilityKey": "teona-rize",
    "aliases": [
      "Teona Çağlayan Bungalov"
    ]
  },
  {
    "id": "mugada-bartin",
    "name": "Mugada Deluxe Bungalov",
    "location": "Merkez, Bartın",
    "capacity": 4,
    "bedrooms": 1,
    "tag": "Bartın’da ısıtmalı havuz",
    "features": [
      "pool",
      "heated"
    ],
    "image": "https://imgkit.otelz.com/turkiye/bartin/bartinmerkez/m1bff40cf2b08245f0bb46a371cb920a09.jpeg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/mugada-deluxe-bungalov",
    "description": "Bartın Merkez’de dört kişiye kadar kapasiteli 1+1 bungalov. İlanda ısıtmalı havuz, Wi-Fi ve tesis bünyesinde otopark belirtiliyor.",
    "details": [
      "Bungalov 1+1: en fazla 4 kişi; fotoğraf ilgili oda kartından",
      "Evcil hayvan kabul edilmiyor; kahvaltı kapsamı belirtilmemiş",
      "Havuz ısıtmasının tarihinizdeki çalışma koşullarını işletmeden teyit edin"
    ],
    "region": "Karadeniz",
    "price": null,
    "sourceName": "Otelz",
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Güncel fiyat için işletmeden bilgi alın.",
    "imageAlt": "Mugada Deluxe Bungalov — Birim bilgilerindeki fotoğraf",
    "facilityKey": "mugada-bartin"
  },
  {
    "id": "amasra-suit",
    "name": "Amasra Suit · Lotus Bungalov",
    "location": "Gömü, Amasra, Bartın",
    "capacity": 4,
    "bedrooms": null,
    "tag": "Amasra’da havuzlu mola",
    "features": [
      "pool",
      "jacuzzi"
    ],
    "image": "https://imgkit.otelz.com/turkey/bartin/amasrasuitbungalov06ce306d.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/amasra-suit-bungalov",
    "description": "Amasra’nın Gömü mevkiinde bulunan tesisin dört kişilik Lotus 2 seçeneği. İlanda jakuzi, havuz, Wi-Fi ve otopark listeleniyor.",
    "details": [
      "Lotus 2: en fazla 4 kişi; Mimoza aynı tesisin diğer birimidir",
      "Açık havuz sezonluk; havuz ısıtması doğrulanmadı",
      "Evcil hayvan kabul edilmiyor; yatak odası düzeni ve kahvaltı teyit edilmeli"
    ],
    "region": "Karadeniz",
    "price": null,
    "sourceName": "Otelz",
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Güncel fiyat için işletmeden bilgi alın.",
    "imageAlt": "Amasra Suit · Lotus Bungalov — Birim bilgilerindeki fotoğraf",
    "facilityKey": "amasra-suit"
  },
  {
    "id": "simisso-sinop",
    "name": "Simisso Çiftlik · Çift Katlı Bungalov",
    "location": "Merkez, Sinop",
    "capacity": 4,
    "bedrooms": null,
    "tag": "Sinop’ta çiftlik molası",
    "features": [
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkey/sinop/simissociftlikbungalovc910fa28.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/simisso-ciftlik-bungalov",
    "description": "Sinop’ta çift katlı, dört kişilik bungalov seçeneği. İlanda restoran, Wi-Fi, otopark ve evcil hayvan kabulü belirtiliyor.",
    "details": [
      "Çift katlı birim: en fazla 4 kişi; tek katlı seçenek ayrı tesis sayılmadı",
      "Yatak odası sayısı ilanda açıkça belirtilmemiş",
      "Restoran bulunması kahvaltının dahil olduğu anlamına gelmez; kapsamı teyit edin"
    ],
    "region": "Karadeniz",
    "price": null,
    "sourceName": "Otelz",
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Güncel fiyat için işletmeden bilgi alın.",
    "imageAlt": "Simisso Çiftlik · Çift Katlı Bungalov — Birim bilgilerindeki fotoğraf",
    "facilityKey": "simisso-sinop"
  },
  {
    "id": "derinsu-sinop",
    "name": "Derinsu · Stüdyo Bungalov",
    "location": "Merkez, Sinop",
    "capacity": 3,
    "bedrooms": null,
    "tag": "Sinop’ta sahil molası",
    "features": [
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkiye/sinop/sinopmerkez/img_154655f0055cd05c485687dbe9cf4acf0cac.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/derinsu-bungalov-apart",
    "description": "Derinsu tesisinde üç kişilik 1+0 bungalov seçeneği. İlanda plaja yakın konum, Wi-Fi, otopark ve evcil hayvan kabulü belirtiliyor.",
    "details": [
      "1+0 stüdyo birim: en fazla 3 kişi; ayrı yatak odası varsayılmadı",
      "Aynı tesisin 1+1 ve 2+1 seçenekleri ayrı ilan yapılmadı",
      "Evcil hayvan koşulları, kahvaltı ve güncel müsaitlik teyit edilmeli"
    ],
    "region": "Karadeniz",
    "price": null,
    "sourceName": "Otelz",
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Güncel fiyat için işletmeden bilgi alın.",
    "imageAlt": "Derinsu · Stüdyo Bungalov — Birim bilgilerindeki fotoğraf",
    "facilityKey": "derinsu-sinop"
  },
  {
    "id": "trabzon-bungalov-evleri",
    "name": "Trabzon Bungalov Evleri · A",
    "location": "Akyazı, Ortahisar, Trabzon",
    "capacity": 5,
    "bedrooms": null,
    "tag": "Akyazı’da aile molası",
    "features": [
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkiye/trabzon/ortahisar/trabzonbungalovevleri_a3988459.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/trabzon-bungalov-evleri",
    "description": "Akyazı’da beş kişilik Bungalov A seçeneği. İlanda Wi-Fi, otopark ve barbekü olanağı belirtiliyor.",
    "details": [
      "Bungalov A: en fazla 5 kişi; B birimi aynı tesis altında tutuldu",
      "Evcil hayvan kabulü 5 kg sınırıyla belirtiliyor; işletmeden teyit edin",
      "Yatak odası sayısı, havuz ve kahvaltı dahil olduğu doğrulanmadı"
    ],
    "region": "Karadeniz",
    "price": null,
    "sourceName": "Otelz",
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Güncel fiyat için işletmeden bilgi alın.",
    "imageAlt": "Trabzon Bungalov Evleri · A — Birim bilgilerindeki fotoğraf",
    "facilityKey": "trabzon-bungalov-evleri"
  },
  {
    "id": "camlica-trabzon",
    "name": "Trabzon Çamlıca Bungalov",
    "location": "Yomra, Trabzon",
    "capacity": 6,
    "bedrooms": null,
    "tag": "Yomra’da jakuzili kaçamak",
    "features": [
      "jacuzzi",
      "fireplace",
      "pets"
    ],
    "image": "https://imgkit.otelz.com/turkey/trabzon/yomra/trabzoncamlicabungalov8c804157.jpg?tr=w-200%2Ch-130%2Cfo-auto%2Cq-80",
    "sourceUrl": "https://www.otelz.com/hotel/trabzon-camlica-bungalov",
    "description": "Yomra’da altı kişiye kadar kapasiteli jakuzili bungalov. İlanda şömine, Wi-Fi, otopark ve evcil hayvan kabulü belirtiliyor.",
    "details": [
      "Jakuzili bungalov oda: en fazla 6 kişi",
      "Jakuzi yüzme havuzu olarak değerlendirilmedi; havuz etiketi eklenmedi",
      "Yatak odası sayısı ve kahvaltı kapsamı ayrıca teyit edilmeli"
    ],
    "region": "Karadeniz",
    "price": null,
    "sourceName": "Otelz",
    "checkedOn": "2026-08-27",
    "priceNote": "İlan bilgilerinde bu bungalov tipi için tarih ve kişi kapsamı kesinleşmiş gecelik tarife bulunmuyor. Güncel fiyat için işletmeden bilgi alın.",
    "imageAlt": "Trabzon Çamlıca Bungalov — Birim bilgilerindeki fotoğraf",
    "facilityKey": "camlica-trabzon"
  },
  {
    "id": "kabak-manzara-bungalow",
    "facilityKey": "kabak-manzara-bungalow",
    "name": "Kabak Manzara Bungalow",
    "region": "Ege",
    "location": "Faralya, Fethiye, Muğla",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/mugla/fethiye/kabakmanzarabungalow62fb8095.jpg",
    "imageAlt": "Kabak Manzara Bungalow",
    "description": "Faralya, Fethiye, Muğla konumundaki tesiste standart 5 / 6 seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/kabak-manzara-bungalow",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Standart 5 / 6; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "ovabuku-ahsap-evler",
    "facilityKey": "ovabuku-ahsap-evler",
    "name": "Ovabükü Ahşap Evler",
    "region": "Ege",
    "location": "Mesudiye, Datça, Muğla",
    "price": null,
    "capacity": 5,
    "bedrooms": 1,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/mugla/datca/ovabukuahsapevler9aedee3f.jpg",
    "imageAlt": "Ovabükü Ahşap Evler",
    "description": "Mesudiye, Datça, Muğla konumundaki tesiste 1+1 bungalov seçeneği, en fazla 5 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/ovabuku-ahsap-evler",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: 1+1 Bungalov; en fazla 5 misafir.",
      "1 yatak odası.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "mardin-bungalow",
    "facilityKey": "mardin-bungalow",
    "name": "Mardin Bungalow",
    "region": "Güneydoğu Anadolu",
    "location": "Artuklu, Mardin",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/mardin/mardin-merkez/mardin-bungalow_8766758b.jpg",
    "imageAlt": "Mardin Bungalow",
    "description": "Artuklu, Mardin konumundaki tesiste bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/mardin-bungalow",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "by-life-resorts",
    "facilityKey": "by-life-resorts",
    "name": "By Life Resorts · Bungalov",
    "region": "Doğu Anadolu",
    "location": "Ergan, Erzincan Merkez, Erzincan",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/erzincan/erzincan-merkez/by-life-resorts-hotel_e121cc99.jpg",
    "imageAlt": "By Life Resorts · Bungalov",
    "description": "Ergan, Erzincan Merkez, Erzincan konumundaki tesiste bungalov seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/by-life-resorts",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "otherSources": [
      {
        "name": "Tatilbudur",
        "url": "https://www.tatilbudur.com/by-life-resorts"
      }
    ]
  },
  {
    "id": "tepe-bungalov",
    "facilityKey": "tepe-bungalov",
    "name": "Tepe Bungalov",
    "region": "İç Anadolu",
    "location": "Kızılcahamam, Ankara",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/ankara/kizilcahamam/tepe-bungalov_67eaaaac.jpg",
    "imageAlt": "Tepe Bungalov",
    "description": "Kızılcahamam, Ankara konumundaki tesiste balkonlu standart bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/tepe-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Balkonlu standart bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "silaglow-bungalov",
    "facilityKey": "silaglow-bungalov",
    "name": "Şilaglow Bungalov",
    "region": "İç Anadolu",
    "location": "Nallıhan, Ankara",
    "price": null,
    "capacity": 5,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/ankara/nallihan/silaglow_8ada1d45.jpg",
    "imageAlt": "Şilaglow Bungalov",
    "description": "Nallıhan, Ankara konumundaki tesiste bungalov seçeneği, en fazla 5 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/silaglow-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 5 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "cansuyum-otel",
    "facilityKey": "cansuyum-otel",
    "name": "Cansuyum · Bungalov",
    "region": "İç Anadolu",
    "location": "Polatlı, Ankara",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/ankara/polatli/cansuyum_5b9ca276.jpg",
    "imageAlt": "Cansuyum · Bungalov",
    "description": "Polatlı, Ankara konumundaki tesiste bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/cansuyum-otel",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "celik-resort",
    "facilityKey": "celik-resort",
    "name": "Çelik Resort · Üçgen Bungalov",
    "region": "İç Anadolu",
    "location": "Ayaş, Ankara",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/ankara/celiktermalbutikotel01809c3a.jpg",
    "imageAlt": "Çelik Resort · Üçgen Bungalov",
    "description": "Ayaş, Ankara konumundaki tesiste dubleks üçgen bungalov 10 seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/celik-resort",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Dubleks üçgen bungalov 10; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "begonvilla-bungalows",
    "facilityKey": "begonvilla-bungalows",
    "name": "Begonvilla Bungalows",
    "region": "Ege",
    "location": "Ölüdeniz, Fethiye, Muğla",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/mugla/fethiye/begonvillabungalowsf7b150b8.jpg",
    "imageAlt": "Begonvilla Bungalows",
    "description": "Ölüdeniz, Fethiye, Muğla konumundaki tesiste begonvil bungalovu seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/begonvilla-bungalows",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Begonvil bungalovu; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "reds-bungalow-0017390",
    "facilityKey": "reds-bungalow-0017390",
    "name": "Reds Bungalow",
    "region": "Ege",
    "location": "Altınkum, Didim, Aydın",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/aydin/didim/reds-bungalow_aec4fadb.jpg",
    "imageAlt": "Reds Bungalow",
    "description": "Altınkum, Didim, Aydın konumundaki tesiste bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/reds-bungalow-0017390",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "serender-bungalov",
    "facilityKey": "serender-bungalov",
    "name": "Serender Bungalov",
    "region": "Ege",
    "location": "Foça, İzmir",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/izmir/foca/serender-bungalov_2de01398.jpg",
    "imageAlt": "Serender Bungalov",
    "description": "Foça, İzmir konumundaki tesiste bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/serender-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "alacahan-bungalow-evleri",
    "facilityKey": "alacahan-bungalow-evleri",
    "name": "Alacahan Bungalow Evleri",
    "region": "Ege",
    "location": "Güre, Edremit, Balıkesir",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/balikesir/edremit/alacahan-bungalow-evleri_48a03437.jpg",
    "imageAlt": "Alacahan Bungalow Evleri",
    "description": "Güre, Edremit, Balıkesir konumundaki tesiste standart bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/alacahan-bungalow-evleri",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Standart bungalov; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "portakal-bungalov",
    "facilityKey": "portakal-bungalov",
    "name": "Portakal Bungalov",
    "region": "Akdeniz",
    "location": "Konyaaltı, Antalya",
    "price": null,
    "capacity": 5,
    "bedrooms": null,
    "tag": "Jakuzi keyfi",
    "features": [
      "pool",
      "jacuzzi",
      "fireplace"
    ],
    "image": "https://imgkit.otelz.com/turkey/antalya/konyaalti/portakalbungalovc01226ec.jpg",
    "imageAlt": "Portakal Bungalov",
    "description": "Konyaaltı, Antalya konumundaki tesiste portakal bungalovu seçeneği, en fazla 5 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/portakal-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Portakal bungalovu; en fazla 5 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "mese-bungalov",
    "facilityKey": "mese-bungalov",
    "name": "Meşe Bungalov",
    "region": "Marmara",
    "location": "Termal, Yalova",
    "price": null,
    "capacity": 6,
    "bedrooms": null,
    "tag": "Havuzlu bungalov",
    "features": [
      "pool"
    ],
    "image": "https://imgkit.otelz.com/turkiye/yalova/termal/mese-bungalov_64ef9407.jpg",
    "imageAlt": "Meşe Bungalov",
    "description": "Termal, Yalova konumundaki tesiste bungalov seçeneği, en fazla 6 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/mese-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 6 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "robina-bungalov",
    "facilityKey": "robina-bungalov",
    "name": "Robina Bungalov",
    "region": "Akdeniz",
    "location": "Olimpos, Kumluca, Antalya",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/antalya/kumluca/altarisbungalovsfb145b12.jpg",
    "imageAlt": "Robina Bungalov",
    "description": "Olimpos, Kumluca, Antalya konumundaki tesiste standart bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/robina-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Standart bungalov; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "aliases": [
      "Altaris Bungalovs"
    ]
  },
  {
    "id": "el-mundo-bungalov",
    "facilityKey": "el-mundo-bungalov",
    "name": "El Mundo Bungalov",
    "region": "Marmara",
    "location": "Çınarcık, Yalova",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/yalova/elmundobungalovc38fb3e4.jpg",
    "imageAlt": "El Mundo Bungalov",
    "description": "Çınarcık, Yalova konumundaki tesiste standart bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/el-mundo-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Standart bungalov; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "otherSources": [
      {
        "name": "Jolly",
        "url": "https://www.jollytur.com/el-mundo-bungolove"
      }
    ]
  },
  {
    "id": "adakoy-bungalov",
    "facilityKey": "adakoy-bungalov",
    "name": "Adaköy Bungalov",
    "region": "Ege",
    "location": "Kuşadası, Aydın",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Şömineli bungalov",
    "features": [
      "fireplace"
    ],
    "image": "https://imgkit.otelz.com/turkiye/aydin/kusadasi/adakoy-bungalov_1bf38366.jpg",
    "imageAlt": "Adaköy Bungalov",
    "description": "Kuşadası, Aydın konumundaki tesiste şömineli dubleks bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/adakoy-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Şömineli dubleks bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "byelka-bungalov",
    "facilityKey": "byelka-bungalov",
    "name": "Byelka Bungalov",
    "region": "Ege",
    "location": "Ayvalık, Balıkesir",
    "price": null,
    "capacity": 2,
    "bedrooms": 1,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/balikesir/ayvalik/292_t91138af6b931434c8623b48dadb2e95d.jpg",
    "imageAlt": "Byelka Bungalov",
    "description": "Ayvalık, Balıkesir konumundaki tesiste 1+1 bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/byelka-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: 1+1 Bungalov; en fazla 2 misafir.",
      "1 yatak odası.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "karaoz-safir-bungalov",
    "facilityKey": "karaoz-safir-bungalov",
    "name": "Karaöz Safir Bungalov",
    "region": "Akdeniz",
    "location": "Karaöz, Kumluca, Antalya",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/antalya/kumluca/karaozsapphirebungalowsfbd82d84.jpg",
    "imageAlt": "Karaöz Safir Bungalov",
    "description": "Karaöz, Kumluca, Antalya konumundaki tesiste standart bungalov seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/karaoz-safir-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Standart bungalov; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "aliases": [
      "Karaoz Sapphire Bungalows"
    ]
  },
  {
    "id": "bagdat-resort",
    "facilityKey": "bagdat-resort",
    "name": "Bağdat Resort · Bungalov",
    "region": "Marmara",
    "location": "Altınova, Yalova",
    "price": null,
    "capacity": 4,
    "bedrooms": 2,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/yalova/bagdatresorta2a5da1c.jpg",
    "imageAlt": "Bağdat Resort · Bungalov",
    "description": "Altınova, Yalova konumundaki tesiste iki yatak odalı bungalov seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/bagdat-resort",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: İki yatak odalı bungalov; en fazla 4 misafir.",
      "2 yatak odası.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "doors-urla-hotel-bungalows",
    "facilityKey": "doors-urla-hotel-bungalows",
    "name": "Doors Urla · Bungalov",
    "region": "Ege",
    "location": "Urla, İzmir",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/izmir/urla/doorsurlahotel569f9ba7.jpg",
    "imageAlt": "Doors Urla · Bungalov",
    "description": "Urla, İzmir konumundaki tesiste çınar bungalovu seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/doors-urla-hotel-bungalows",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Çınar bungalovu; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "teosfer",
    "facilityKey": "teosfer",
    "name": "Teosfer · Bungalov",
    "region": "Ege",
    "location": "Sığacık, Seferihisar, İzmir",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/izmir/seferihisar/teosfer6770daaf.jpg",
    "imageAlt": "Teosfer · Bungalov",
    "description": "Sığacık, Seferihisar, İzmir konumundaki tesiste lavanta bungalovu seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/teosfer",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Lavanta bungalovu; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "antik-vadi-bungalov-otel-kazdaglari",
    "facilityKey": "antik-vadi-bungalov-otel-kazdaglari",
    "name": "Antik Vadi · Bungalov",
    "region": "Ege",
    "location": "Akçay, Edremit, Balıkesir",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/balikesir/edremit/antikvadibungalovotelkazdaglari329240a4.jpg",
    "imageAlt": "Antik Vadi · Bungalov",
    "description": "Akçay, Edremit, Balıkesir konumundaki tesiste antik bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/antik-vadi-bungalov-otel-kazdaglari",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Antik bungalov; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "miko-bungalow-evleri",
    "facilityKey": "miko-bungalow-evleri",
    "name": "Miko Bungalow Evleri",
    "region": "Ege",
    "location": "Sarımsaklı, Ayvalık, Balıkesir",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/balikesir/ayvalik/mikobungalowevleri339b1ab1.jpg",
    "imageAlt": "Miko Bungalow Evleri",
    "description": "Sarımsaklı, Ayvalık, Balıkesir konumundaki tesiste bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/miko-bungalow-evleri",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "lazoglu-bungalov",
    "facilityKey": "lazoglu-bungalov",
    "name": "Lazoğlu Bungalov",
    "region": "Ege",
    "location": "Güzelçamlı, Kuşadası, Aydın",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/aydin/kusadasi/lazoglu-bungalov_de7d6eea.jpg",
    "imageAlt": "Lazoğlu Bungalov",
    "description": "Güzelçamlı, Kuşadası, Aydın konumundaki tesiste bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/lazoglu-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "fs-bungalows-otel",
    "facilityKey": "fs-bungalows-otel",
    "name": "FS Bungalows",
    "region": "Akdeniz",
    "location": "Toroslar, Mersin",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Jakuzi keyfi",
    "features": [
      "pool",
      "jacuzzi"
    ],
    "image": "https://imgkit.otelz.com/turkey/mersin/toroslar/fsbungalowsotel5a105464.jpg",
    "imageAlt": "FS Bungalows",
    "description": "Toroslar, Mersin konumundaki tesiste havuzlu ve jakuzili bungalov seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/fs-bungalows-otel",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Havuzlu ve jakuzili bungalov; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "otelox-sinap-bungalov",
    "facilityKey": "otelox-sinap-bungalov",
    "name": "Otelox Sinap Bungalov",
    "region": "Akdeniz",
    "location": "Sinap, Erdemli, Mersin",
    "price": null,
    "capacity": 6,
    "bedrooms": null,
    "tag": "Jakuzi keyfi",
    "features": [
      "pool",
      "jacuzzi"
    ],
    "image": "https://imgkit.otelz.com/turkey/mersin/mersinvillasinap229a3e0e.jpg",
    "imageAlt": "Otelox Sinap Bungalov",
    "description": "Sinap, Erdemli, Mersin konumundaki tesiste özel havuzlu ve jakuzili bungalov seçeneği, en fazla 6 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/otelox-sinap-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Özel havuzlu ve jakuzili bungalov; en fazla 6 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "mersin-bungalov",
    "facilityKey": "mersin-bungalov",
    "name": "Mersin Bungalov",
    "region": "Akdeniz",
    "location": "Çeşmeli, Erdemli, Mersin",
    "price": null,
    "capacity": 6,
    "bedrooms": 2,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/mersin/erdemli/mersin-bungalov_e344b326.jpg",
    "imageAlt": "Mersin Bungalov",
    "description": "Çeşmeli, Erdemli, Mersin konumundaki tesiste 2+1 b bungalovu seçeneği, en fazla 6 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/mersin-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: 2+1 B bungalovu; en fazla 6 misafir.",
      "2 yatak odası.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "otelox-ayas-beach-bungalov",
    "facilityKey": "otelox-ayas-beach-bungalov",
    "name": "Otelox Ayaş Beach Bungalov",
    "region": "Akdeniz",
    "location": "Ayaş, Erdemli, Mersin",
    "price": null,
    "capacity": 5,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/mersin/ayasbeachbungalov6c15807f.jpg",
    "imageAlt": "Otelox Ayaş Beach Bungalov",
    "description": "Ayaş, Erdemli, Mersin konumundaki tesiste denize sıfır bungalov seçeneği, en fazla 5 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/otelox-ayas-beach-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Denize sıfır bungalov; en fazla 5 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "botanik-gol-evleri",
    "facilityKey": "botanik-gol-evleri",
    "name": "Botanik Göl Evleri · Bungalov",
    "region": "Akdeniz",
    "location": "Karacaören, Bucak, Burdur",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/burdur/botanikgolevleri8df60436.jpg",
    "imageAlt": "Botanik Göl Evleri · Bungalov",
    "description": "Karacaören, Bucak, Burdur konumundaki tesiste üçgen sedir ev seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/botanik-gol-evleri",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Üçgen sedir ev; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "sakli-gol-evleri",
    "facilityKey": "sakli-gol-evleri",
    "name": "Saklı Göl Evleri · Bungalov",
    "region": "Akdeniz",
    "location": "Bucak, Burdur",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/burdur/sakligolevleri9da5f188.jpg",
    "imageAlt": "Saklı Göl Evleri · Bungalov",
    "description": "Bucak, Burdur konumundaki tesiste bungalov seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/sakli-gol-evleri",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "nefes-dagyenice-dogada",
    "facilityKey": "nefes-dagyenice-dogada",
    "name": "Nefes Dağyenice · Bungalov",
    "region": "Marmara",
    "location": "Dağyenice, Nilüfer, Bursa",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/bursa/nefesdagyenicedogadae8499b45.jpg",
    "imageAlt": "Nefes Dağyenice · Bungalov",
    "description": "Dağyenice, Nilüfer, Bursa konumundaki tesiste double bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/nefes-dagyenice-dogada",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Double bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "otherSources": [
      {
        "name": "Enuygun",
        "url": "https://www.enuygun.com/otel/detay/nefes-dagyenice-dogada-747994/"
      }
    ]
  },
  {
    "id": "uludag-orman-koskleri",
    "facilityKey": "uludag-orman-koskleri",
    "name": "Uludağ Orman Köşkleri",
    "region": "Marmara",
    "location": "Uludağ, Osmangazi, Bursa",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/bursa/uludagormankoskleriaf2380bf.jpg",
    "imageAlt": "Uludağ Orman Köşkleri",
    "description": "Uludağ, Osmangazi, Bursa konumundaki tesiste bungalov seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/uludag-orman-koskleri",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "otherSources": [
      {
        "name": "Enuygun",
        "url": "https://www.enuygun.com/otel/detay/uludag-orman-koskleri/"
      }
    ]
  },
  {
    "id": "gocebe-kamp-bungalov",
    "facilityKey": "gocebe-kamp-bungalov",
    "name": "Göçebe Kamp & Bungalov",
    "region": "Marmara",
    "location": "İznik, Bursa",
    "price": null,
    "capacity": 3,
    "bedrooms": 1,
    "tag": "Isıtmalı havuz",
    "features": [
      "pool",
      "heated"
    ],
    "image": "https://imgkit.otelz.com/turkiye/bursa/iznik/jpeg50d11928d74a644308ec11e26ec773570.jpg",
    "imageAlt": "Göçebe Kamp & Bungalov",
    "description": "İznik, Bursa konumundaki tesiste ısıtmalı havuzlu 1+1 bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/gocebe-kamp-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Isıtmalı havuzlu 1+1 bungalov; en fazla 3 misafir.",
      "1 yatak odası.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "otherSources": [
      {
        "name": "Enuygun",
        "url": "https://www.enuygun.com/otel/detay/gocebe-kamp-bungalov-1200918/"
      }
    ]
  },
  {
    "id": "dedeman-van-resort-aqua",
    "facilityKey": "dedeman-van-resort-aqua",
    "name": "Dedeman Van · Bungalov",
    "region": "Doğu Anadolu",
    "location": "Edremit, Van",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkey/van/dedemanvanresortaquaa4db23e3.jpg",
    "imageAlt": "Dedeman Van · Bungalov",
    "description": "Edremit, Van konumundaki tesiste göl manzaralı family french bed bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/dedeman-van-resort-aqua",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Göl manzaralı Family French Bed bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "metis-bungalow",
    "facilityKey": "metis-bungalow",
    "name": "Metis Bungalow",
    "region": "Marmara",
    "location": "Assos, Ayvacık, Çanakkale",
    "price": null,
    "capacity": 3,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://imgkit.otelz.com/turkiye/canakkale/ayvacik/metic-camping_d969346f.jpg",
    "imageAlt": "Metis Bungalow",
    "description": "Assos, Ayvacık, Çanakkale konumundaki tesiste bungalov seçeneği, en fazla 3 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/metis-bungalow",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Bungalov; en fazla 3 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "aliases": [
      "Metis Camping"
    ],
    "otherSources": [
      {
        "name": "Obilet",
        "url": "https://www.obilet.com/otel/metis-bungalow"
      },
      {
        "name": "Hotels.com",
        "url": "https://www.hotels.com/ho1022412544/metis-bungalow-ayvacik-turkey/"
      }
    ]
  },
  {
    "id": "agva-shelale-hotel",
    "facilityKey": "agva-shelale-hotel",
    "name": "Ağva Shelale · Bungalov",
    "region": "Marmara",
    "location": "Ağva, Şile, İstanbul",
    "price": null,
    "capacity": 4,
    "bedrooms": null,
    "tag": "Şömineli bungalov",
    "features": [
      "fireplace"
    ],
    "image": "https://imgkit.otelz.com/turkey/istanbul/sile/agvashelalehotel53d67406.jpg",
    "imageAlt": "Ağva Shelale · Bungalov",
    "description": "Ağva, Şile, İstanbul konumundaki tesiste asma katlı ve şömineli aile bungalovu seçeneği, en fazla 4 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/agva-shelale-hotel",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Asma katlı ve şömineli aile bungalovu; en fazla 4 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "agva-teras-garden-hotel-bungalow",
    "facilityKey": "agva-teras-garden-hotel-bungalow",
    "name": "Ağva Teras Garden · Bungalov",
    "region": "Marmara",
    "location": "Ağva, Şile, İstanbul",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Jakuzi keyfi",
    "features": [
      "fireplace",
      "jacuzzi"
    ],
    "image": "https://imgkit.otelz.com/turkey/istanbul/sile/agvaterasgarden1608a09c.jpg",
    "imageAlt": "Ağva Teras Garden · Bungalov",
    "description": "Ağva, Şile, İstanbul konumundaki tesiste şömineli ve jakuzili bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Otelz",
    "sourceUrl": "https://www.otelz.com/hotel/agva-teras-garden-hotel-bungalow",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: Şömineli ve jakuzili bungalov; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "purple-pinkolas-bungalov-darica",
    "facilityKey": "purple-pinkolas-bungalov-darica",
    "name": "Purple Bungalov Darıca",
    "region": "Marmara",
    "location": "Darıca, Kocaeli",
    "price": null,
    "capacity": 6,
    "bedrooms": 2,
    "tag": "Jakuzi keyfi",
    "features": [
      "pool",
      "jacuzzi"
    ],
    "image": "https://www.bungalov.com.tr/images/hotel/44545_t.jpg",
    "imageAlt": "Purple Bungalov Darıca",
    "description": "Darıca, Kocaeli konumundaki tesiste 2+1 bungalov seçeneği, en fazla 6 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Bungalov.com.tr",
    "sourceUrl": "https://www.bungalov.com.tr/purple-pinkolas-bungalov-darica",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: 2+1 Bungalov; en fazla 6 misafir.",
      "2 yatak odası.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ],
    "aliases": [
      "Purple Pinkolas Bungalov"
    ]
  },
  {
    "id": "kartepe-green-bungalov",
    "facilityKey": "kartepe-green-bungalov",
    "name": "Kartepe Green Bungalov",
    "region": "Marmara",
    "location": "Maşukiye, Kartepe, Kocaeli",
    "price": null,
    "capacity": 6,
    "bedrooms": 2,
    "tag": "Isıtmalı havuz",
    "features": [
      "pool",
      "heated",
      "jacuzzi"
    ],
    "image": "https://www.bungalovla.com/images/hotel/28936_t.jpg",
    "imageAlt": "Kartepe Green Bungalov",
    "description": "Maşukiye, Kartepe, Kocaeli konumundaki tesiste 2+1 bungalov seçeneği, en fazla 6 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Bungalovla.com",
    "sourceUrl": "https://www.bungalovla.com/kartepe-green-bungalov",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: 2+1 Bungalov; en fazla 6 misafir.",
      "2 yatak odası.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  },
  {
    "id": "kartepe-zirve-house1",
    "facilityKey": "kartepe-zirve-house1",
    "name": "Kartepe Zirve Bungalov",
    "region": "Marmara",
    "location": "Kartepe, Kocaeli",
    "price": null,
    "capacity": 2,
    "bedrooms": null,
    "tag": "Bungalov konaklaması",
    "features": [],
    "image": "https://www.bungalovla.com/images/hotel/27549_t.jpg",
    "imageAlt": "Kartepe Zirve Bungalov",
    "description": "Kartepe, Kocaeli konumundaki tesiste iki kişilik bungalov seçeneği, en fazla 2 misafire uygundur. Kapasite ve özellikler bu konaklama birimi için listelenmiştir.",
    "sourceName": "Bungalovla.com",
    "sourceUrl": "https://www.bungalovla.com/kartepe-zirve-house1",
    "checkedOn": "2026-08-28",
    "priceNote": "Seçilen tarih ve kişi sayısı için fiyat ve müsaitlik henüz doğrulanmadı. Güncel teklif alınmalıdır.",
    "details": [
      "Seçilen birim: İki kişilik bungalov; en fazla 2 misafir.",
      "Yatak odası sayısı ayrıca teyit edilmelidir.",
      "Bu kart yalnızca belirtilen bungalov tipini temsil eder; diğer oda tipleri dahil değildir.",
      "Fiyat, müsaitlik ve çocuk kabul koşulları rezervasyon öncesinde teyit edilmelidir."
    ]
  }
];

// Destinations present in this catalog; Sapanca remains a dedicated route.
export const REGIONS = ["Sapanca", "Karadeniz", "Marmara", "Ege", "Akdeniz", "İç Anadolu", "Doğu Anadolu", "Güneydoğu Anadolu"].filter((region) => BUNGALOWS.some((item) => item.region === region));

// Demo fallback requested by the user: catalog mean rounded to 500 TL.
// This is not a market average or a property quote; null source prices stay intact.
const listedPrices = BUNGALOWS.flatMap((item) => item.price !== null ? [item.price] : []);
export const GENERIC_NIGHTLY_PRICE = Math.round(listedPrices.reduce((sum, price) => sum + price, 0) / listedPrices.length / 500) * 500;
export function getNightlyPrice(bungalow: Pick<Bungalow, "price">): number {
  return bungalow.price ?? GENERIC_NIGHTLY_PRICE;
}

export function formatMoney(value: number) {
  return `₺${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(value)}`;
}

export function normalizeSearch(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").trim();
}

// Preserve meaningful query parameters (e.g. listing IDs), remove only tracking.
export function canonicalSourceUrl(value: string) {
  const url = new URL(value);
  url.hash = "";
  url.hostname = url.hostname.replace(/^www\./, "");
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  for (const key of [...url.searchParams.keys()]) {
    if (/^utm_/i.test(key) || /^(fbclid|gclid|msclkid|srsltid)$/i.test(key)) url.searchParams.delete(key);
  }
  url.searchParams.sort();
  return url.href;
}

function photoIdentity(value: string) {
  let url = new URL(value);
  if (url.pathname === "/_next/image" && url.searchParams.get("url")?.startsWith("https://")) {
    url = new URL(url.searchParams.get("url")!);
  }
  for (const key of [...url.searchParams.keys()]) {
    if (/^(tr|w|width|h|height|q|quality|fit|impolicy|auto|format)$/i.test(key)) url.searchParams.delete(key);
  }
  return canonicalSourceUrl(url.href);
}

// Facility keys are reviewed identities, shared by every room/provider of a facility.
// Conflicts are review candidates; never silently merge similarly named properties.
export function findCatalogDuplicates(items: Bungalow[]) {
  const seen = new Map<string, { id: string; index: number }>();
  const conflicts: { firstId: string; secondId: string; reason: string }[] = [];
  items.forEach((item, index) => {
    const names = [item.name, ...(item.aliases ?? [])].map((name) =>
      `${normalizeSearch(item.region)}:${normalizeSearch(name).replace(/bungalow/g, "bungalov").replace(/[^\p{L}\p{N}]/gu, "")}`,
    );
    const keys = [
      ["id", item.id], ["facility", item.facilityKey], ["photo", photoIdentity(item.image)],
      ...names.map((name) => ["name", name]),
      ...[item.sourceUrl, ...(item.otherSources ?? []).map((source) => source.url)].map((url) => ["source", canonicalSourceUrl(url)]),
    ];
    for (const [reason, value] of keys) {
      const key = `${reason}:${value}`;
      const previous = seen.get(key);
      if (previous && previous.index !== index) conflicts.push({ firstId: previous.id, secondId: item.id, reason });
      else if (!previous) seen.set(key, { id: item.id, index });
    }
  });
  return conflicts;
}

function parseDay(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN;
}

export function getNights(checkIn: string, checkOut: string) {
  const start = parseDay(checkIn);
  const end = parseDay(checkOut);
  return Number.isFinite(start) && Number.isFinite(end) ? Math.max(0, Math.round((end - start) / 86400000)) : 0;
}

export function localToday() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getStayError(checkIn: string, checkOut: string, today = localToday()) {
  if (!checkIn || !checkOut) return "Lütfen giriş ve çıkış tarihlerini seç.";
  if (getNights(checkIn, checkOut) < 1) return "Çıkış tarihi, giriş tarihinden sonra olmalı.";
  if (checkIn < today) return "Giriş tarihi geçmişte olamaz. Yeni bir tarih seç.";
  return "";
}

export function formatDate(value: string) {
  const time = parseDay(value);
  if (!Number.isFinite(time)) return "Tarih seçilmedi";
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(time);
}

export function filterBungalows(items: Bungalow[], filters: {
  query: string; region: string; guests: number; maxPrice: number; features: FeatureId[]; sort: SortOrder;
}) {
  const query = normalizeSearch(filters.query);
  const result = items.filter((item) =>
    (!query || normalizeSearch(`${item.name} ${(item.aliases ?? []).join(" ")} ${item.location} ${item.region}`).includes(query)) &&
    (filters.region === "Tümü" || item.region === filters.region) &&
    item.capacity >= filters.guests && (filters.maxPrice >= MAX_PRICE || getNightlyPrice(item) <= filters.maxPrice) &&
    filters.features.every((feature) => item.features.includes(feature)),
  );
  if (filters.sort !== "recommended") result.sort((a, b) => {
    return filters.sort === "price-asc" ? getNightlyPrice(a) - getNightlyPrice(b) : getNightlyPrice(b) - getNightlyPrice(a);
  });
  return result;
}

// Listed amount: nightly (displayed) price × number of nights. One flat payment.
export function getStayPriceBreakdown(bungalow: Bungalow, checkIn: string, checkOut: string, guests: number) {
  const nights = getNights(checkIn, checkOut);
  if (nights < 1 || !Number.isInteger(guests) || guests < 1 || guests > bungalow.capacity) return null;
  const nightlyPrice = getNightlyPrice(bungalow);
  const total = nights * nightlyPrice;
  return { nights, total, basis: bungalow.price === null ? ("generic" as const) : ("listed" as const), lines: [{ nights, nightlyPrice, total }] };
}

export function getStayEstimate(bungalow: Bungalow, checkIn: string, checkOut: string, guests: number) {
  const breakdown = getStayPriceBreakdown(bungalow, checkIn, checkOut, guests);
  return breakdown ? { nights: breakdown.nights, total: breakdown.total } : null;
}
