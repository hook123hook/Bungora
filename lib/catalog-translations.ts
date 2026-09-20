import type { Bungalow } from "./bungalows";
import type { Language } from "./preferences";
import { translate, foreignText, type Translation } from "./messages";
// Editorial translations of the existing source notes. Names are transliterated only for foreign-language display.
// Each details string is split at | into readable notes; canonical source data is untouched.
export type CatalogTranslation = { tag: Translation; description: Translation; details: Translation };
export const CATALOG_TRANSLATIONS: Record<string, CatalogTranslation> = {
"so-sapanca": {
 tag: ["Private pool & hot tub", "مسبح خاص وجاكوزي", "Свой бассейн и джакузи"],
 description: ["A two-bedroom bungalow in Sapanca for up to six. The listing includes a private pool, hot tub, equipped kitchen, barbecue and fire pit.", "كوخ بغرفتي نوم في صبنجة يتسع لستة ضيوف. يذكر الإعلان مسبحًا خاصًا وجاكوزي ومطبخًا مجهزًا وشواء وموقد نار خارجيًا.", "Бунгало в Сапандже с двумя спальнями для шести гостей. В объявлении указаны свой бассейн, джакузи, кухня, барбекю и костровая чаша."],
 details: ["2 bedrooms, 1 bathroom | Minimum 2 nights at weekends | Breakfast costs extra | Pets listed as allowed; confirm conditions.", "غرفتا نوم وحمام واحد | ليلتان على الأقل في نهاية الأسبوع | الإفطار برسوم إضافية | يُذكر السماح بالحيوانات الأليفة؛ أكّد الشروط.", "2 спальни, 1 ванная | По выходным минимум 2 ночи | Завтрак за доплату | Питомцы разрешены по данным описания; уточните условия."]
},
"pera-zeni": {
 tag: ["Valley views", "إطلالة على الوادي", "Вид на долину"],
 description: ["Pera’s Zeni unit accommodates six in Duygulu village, Ardeşen. Its official page lists a hot tub, balcony, Wi-Fi and tea/coffee facilities.", "وحدة Zeni في Pera تتسع لستة ضيوف في قرية Duygulu بأردشن. يذكر الموقع الرسمي جاكوزي وشرفة وواي فاي وتجهيزات للشاي والقهوة.", "Номер Zeni комплекса Pera рассчитан на шесть гостей в деревне Duygulu, Ардешен. На официальном сайте указаны джакузи, балкон, Wi-Fi и чайные принадлежности."],
 details: ["Capacity: 6 | Bedroom count is not specified | A restaurant is listed; breakfast inclusion is unconfirmed.", "السعة: 6 | عدد غرف النوم غير محدد | يوجد مطعم حسب الإعلان؛ لم يُؤكد شمول الإفطار.", "До 6 гостей | Число спален не указано | Есть ресторан; включение завтрака не подтверждено."]
},
"nois-2": {
 tag: ["Heated pool", "مسبح مدفأ", "Бассейн с подогревом"],
 description: ["A five-person Sapanca bungalow with two bedrooms. The listing describes a heated pool, outdoor hot tub, barbecue, fire pit, kitchen and Wi-Fi.", "كوخ في صبنجة لخمسـة ضيوف بغرفتي نوم. يذكر الإعلان مسبحًا مدفأ وجاكوزي خارجيًا وشواء وموقد نار ومطبخًا وواي فاي.", "Бунгало в Сапандже для пяти гостей с двумя спальнями. Указаны бассейн с подогревом, уличное джакузи, барбекю, костровая чаша, кухня и Wi-Fi."],
 details: ["2 bedrooms, 1 bathroom, up to 5 guests | Room-only stay | Confirm guest admission conditions before booking.", "غرفتا نوم وحمام واحد، حتى 5 ضيوف | إقامة دون وجبات | أكّد شروط قبول الضيوف قبل الحجز.", "2 спальни, 1 ванная, до 5 гостей | Без питания | Уточните правила заселения перед бронированием."]
},
"mirror-rize": {
 tag: ["Pool & breakfast", "مسبح وإفطار", "Бассейн и завтрак"],
 description: ["An Ardeşen bungalow for up to four, with a heated pool and hot tub. The listed tariff includes breakfast for two people only.", "كوخ في أردشن لأربعة ضيوف كحد أقصى، مع مسبح مدفأ وجاكوزي. التعرفة المذكورة تشمل الإفطار لشخصين فقط.", "Бунгало в Ардешене для четырёх гостей с бассейном с подогревом и джакузи. Завтрак включён только для двоих."],
 details: ["2 bedrooms, 1 bathroom | Minimum 2 nights at weekends | Breakfast covers the two-person tariff only | No pets.", "غرفتا نوم وحمام واحد | ليلتان على الأقل في نهاية الأسبوع | الإفطار مشمول لشخصين فقط | لا تُقبل الحيوانات الأليفة.", "2 спальни, 1 ванная | По выходным минимум 2 ночи | Завтрак только для двоих | Без питомцев."]
},
"shine-sapanca": {
 tag: ["Space for everyone", "مساحة للجميع", "Для большой компании"],
 description: ["A three-bedroom Sapanca bungalow for up to ten. The listing describes a private pool, lake views, kitchen equipment and a barbecue area.", "كوخ بثلاث غرف نوم في صبنجة يتسع لعشرة ضيوف. يذكر الإعلان مسبحًا خاصًا وإطلالة على البحيرة وتجهيزات مطبخ ومنطقة شواء.", "Бунгало в Сапандже с тремя спальнями для десяти гостей. Указаны свой бассейн, вид на озеро, кухня и зона барбекю."],
 details: ["3 bedrooms, 2 bathrooms | Minimum 2 nights at weekends | No hot tub | Small-breed pets only | Pool heating appears in the heading but is unconfirmed in the details, so it is not a heated-pool filter match.", "3 غرف نوم وحمامان | ليلتان على الأقل في نهاية الأسبوع | لا يوجد جاكوزي | الحيوانات الصغيرة فقط | تسخين المسبح مذكور في العنوان دون تأكيد في التفاصيل؛ لم يُدرج ضمن تصفية المسبح المدفأ.", "3 спальни, 2 ванные | По выходным минимум 2 ночи | Без джакузи | Только питомцы мелких пород | Подогрев бассейна указан в заголовке, но не подтверждён в деталях, поэтому не включён в фильтр."]
},
"elis-rize": {
 tag: ["Sea views", "إطلالة بحرية", "Вид на море"],
 description: ["A sea-view bungalow in central Rize for up to five. The listing includes a hot tub, kitchen, barbecue area and parking, but no pool.", "كوخ بإطلالة بحرية في وسط ريزه لخمسة ضيوف. يذكر الإعلان جاكوزي ومطبخًا وشواء وموقف سيارات، ولا يوجد مسبح.", "Бунгало с видом на море в центре Ризе для пяти гостей. Есть джакузи, кухня, барбекю и парковка; бассейна нет."],
 details: ["1 bedroom, 1 bathroom | Hot tub, no pool | No pets | Minimum-night requirements differ across the listing; confirm them.", "غرفة نوم وحمام واحد | جاكوزي دون مسبح | لا تُقبل الحيوانات | شروط الحد الأدنى لليالي متباينة في الإعلان؛ أكّدها.", "1 спальня, 1 ванная | Джакузи, без бассейна | Без питомцев | Требования к минимуму ночей на странице различаются; уточните их."]
},
"forest-dream": {
 tag: ["By the fireplace", "بجوار المدفأة", "У камина"],
 description: ["A Sapanca bungalow with a pool for up to four. The listing describes a hot tub, fireplace, fire pit, barbecue and air conditioning.", "كوخ بمسبح في صبنجة لأربعة ضيوف. يذكر الإعلان جاكوزي ومدفأة وموقد نار خارجيًا وشواء وتكييفًا.", "Бунгало с бассейном в Сапандже для четырёх. Указаны джакузи, камин, костровая чаша, барбекю и кондиционер."],
 details: ["1 bedroom, 1 bathroom | Minimum 2 nights at weekends | Accommodation-only tariff | Pets allowed according to the listing; confirm conditions.", "غرفة نوم وحمام واحد | ليلتان على الأقل في نهاية الأسبوع | تعرفة الإقامة فقط | يُذكر السماح بالحيوانات؛ أكّد الشروط.", "1 спальня, 1 ванная | По выходным минимум 2 ночи | Тариф без питания | Питомцы разрешены по источнику; уточните условия."]
},
"stenhus-sapanca": {
 tag: ["A garden escape", "استراحة في الحديقة", "Отдых в саду"],
 description: ["A two-bedroom bungalow in Fevziye for four. The listing includes a private pool, hot tub, fireplace, kitchen and garden barbecue.", "كوخ بغرفتي نوم في Fevziye لأربعة ضيوف، مع مسبح خاص وجاكوزي ومدفأة ومطبخ وشواء في الحديقة حسب الإعلان.", "Бунгало с двумя спальнями в Fevziye для четырёх. Указаны свой бассейн, джакузи, камин, кухня и барбекю в саду."],
 details: ["2 separate bedrooms, up to 4 guests | Breakfast not included; no pets | Firewood costs extra; pool heating is unconfirmed.", "غرفتا نوم منفصلتان، حتى 4 ضيوف | الإفطار غير مشمول والحيوانات غير مقبولة | الحطب برسوم؛ تسخين المسبح غير مؤكد.", "2 отдельные спальни, до 4 гостей | Завтрак не включён, без питомцев | Дрова за доплату; подогрев бассейна не подтверждён."]
},
"kokina-suit": {
 tag: ["Warm pool & fireplace", "مسبح دافئ ومدفأة", "Тёплый бассейн и камин"],
 description: ["A two-bedroom bungalow for up to five. A heated pool, indoor hot tub, double-sided fireplace and kitchen are listed by the listing.", "كوخ بغرفتي نوم لخمسة ضيوف. يذكر الإعلان مسبحًا مدفأ وجاكوزي داخليًا ومدفأة مزدوجة الجوانب ومطبخًا.", "Бунгало с двумя спальнями для пяти гостей. Указаны бассейн с подогревом, джакузи внутри, двусторонний камин и кухня."],
 details: ["2 bedrooms, up to 5 guests | Bed and breakfast; confirm how many guests are covered | Small-breed pets only | Firewood costs extra.", "غرفتا نوم، حتى 5 ضيوف | إقامة وإفطار؛ أكّد عدد المشمولين | حيوانات صغيرة فقط | الحطب برسوم إضافية.", "2 спальни, до 5 гостей | Проживание с завтраком; уточните число гостей в тарифе | Только мелкие питомцы | Дрова за доплату."]
},
"abant-vadi-piramit": {
 tag: ["Forest & fireplace", "غابة ومدفأة", "Лес и камин"],
 description: ["Abant Vadi’s pyramid bungalow is offered for two to four guests. The official page lists a hot tub, fireplace, air conditioning and kitchen.", "كوخ Abant Vadi الهرمي لشخصين إلى أربعة. يذكر الموقع الرسمي جاكوزي ومدفأة وتكييفًا ومطبخًا.", "Пирамидальное бунгало Abant Vadi рассчитано на 2–4 гостей. На официальном сайте указаны джакузи, камин, кондиционер и кухня."],
 details: ["Double bed, TV and refrigerator | The property reports a 10 km distance to Lake Abant | Confirm bedroom count and whether breakfast is included.", "سرير مزدوج وتلفاز وثلاجة | تذكر المنشأة مسافة 10 كم إلى بحيرة أبانت | أكّد عدد غرف النوم وشمول الإفطار.", "Двуспальная кровать, ТВ и холодильник | По данным объекта, до озера Абант 10 км | Уточните число спален и включение завтрака."]
},
"homywood-trabzon": {
 tag: ["Nature in Trabzon", "طبيعة طرابزون", "Природа Трабзона"],
 description: ["Garden bungalows in Beştaş, Trabzon. Official sources list accommodation for up to six, with a hot tub, fireplace, kitchen and barbecue.", "أكواخ بحدائق في Beştaş بطرابزون. تذكر المصادر الرسمية سعة ستة ضيوف وجاكوزي ومدفأة ومطبخًا وشواء.", "Бунгало с садом в Beştaş, Трабзон. Официальные источники указывают до шести гостей, джакузи, камин, кухню и барбекю."],
 details: ["Private garden, fire pit and barbecue | Underfloor heating, air conditioning, Wi-Fi and parking | Confirm bedroom layout and extra-bed conditions.", "حديقة خاصة وموقد نار وشواء | تدفئة أرضية وتكييف وواي فاي وموقف سيارات | أكّد توزيع غرف النوم وشروط الأسرّة الإضافية.", "Свой сад, костровая чаша и барбекю | Тёплые полы, кондиционер, Wi-Fi и парковка | Уточните планировку спален и условия дополнительных кроватей."]
},
"rua-sapanca": {
 tag: ["Together in nature", "معًا في الطبيعة", "Вместе на природе"],
 description: ["A two-bedroom Fevziye bungalow for up to six. The listing describes a pool, fireplace, kitchen and barbecue.", "كوخ بغرفتي نوم في Fevziye لستة ضيوف. يذكر الإعلان مسبحًا ومدفأة ومطبخًا وشواء.", "Бунгало в Fevziye с двумя спальнями для шести гостей. Указаны бассейн, камин, кухня и барбекю."],
 details: ["2 bedrooms, 2 bathrooms; guests 5 and 6 sleep on living-room sofas | Breakfast included for 2 only | Small-breed pets allowed | Pool: 3 × 7 m; heating unconfirmed.", "غرفتا نوم وحمامان؛ الضيفان الخامس والسادس على أرائك الصالة | الإفطار لشخصين فقط | تُقبل الحيوانات الصغيرة | المسبح 3 × 7 م؛ التسخين غير مؤكد.", "2 спальни, 2 ванные; 5-й и 6-й гости спят на диванах | Завтрак только для 2 | Можно с мелкими питомцами | Бассейн 3 × 7 м; подогрев не подтверждён."]
},
"wooden-palaces": {
 tag: ["Lake views", "إطلالة على البحيرة", "Вид на озеро"],
 description: ["Two-bedroom bungalows in Nailiye. Standard and Deluxe units list a private pool, hot tub and fireplace; the lake view differs by unit.", "أكواخ بغرفتي نوم في Nailiye. وحدات Standard وDeluxe بمسبح خاص وجاكوزي ومدفأة؛ إطلالة البحيرة تختلف باختلاف الوحدة.", "Бунгало с двумя спальнями в Nailiye. У Standard и Deluxe указаны свой бассейн, джакузи и камин; вид на озеро зависит от типа."],
 details: ["Filter capacity is 4 adults; 2 additional children are subject to conditions | Private garden | Breakfast for 2; others pay extra | Deluxe: panoramic lake view; Standard: partial view | No pets.", "سعة التصفية 4 بالغين؛ طفلان إضافيان وفق شروط | حديقة خاصة | الإفطار لشخصين، والآخرون برسوم | Deluxe بإطلالة بانورامية وStandard بإطلالة جزئية | لا تُقبل الحيوانات.", "В фильтре 4 взрослых; ещё 2 ребёнка — по условиям | Свой сад | Завтрак для 2, остальным за доплату | Deluxe: панорамный вид, Standard: частичный | Без питомцев."]
},
"grand-wooden": {
 tag: ["Heated pool", "مسبح مدفأ", "Бассейн с подогревом"],
 description: ["A two-bedroom bungalow in Kuruçeşme for four. The listing includes a private heated pool, hot tub, fireplace, kitchen and barbecue.", "كوخ بغرفتي نوم في Kuruçeşme لأربعة ضيوف. يذكر الإعلان مسبحًا خاصًا مدفأ وجاكوزي ومدفأة ومطبخًا وشواء.", "Бунгало с двумя спальнями в Kuruçeşme для четырёх. Есть свой бассейн с подогревом, джакузи, камин, кухня и барбекю."],
 details: ["Standard capacity: 4; only some units can host a fifth guest | Separate bedrooms with en-suite bathrooms | Breakfast for 2; others pay extra | No pets.", "السعة الأساسية 4؛ بعض الوحدات فقط تقبل خامسًا | غرف منفصلة بحمامات خاصة | الإفطار لشخصين والآخرون برسوم | لا تُقبل الحيوانات.", "Стандартно 4 гостя; пятый возможен только в отдельных номерах | Спальни со своими ванными | Завтрак для 2, остальным за доплату | Без питомцев."]
},
"forbest-sapanca": {
 tag: ["Family pool time", "مسبح للعائلة", "Семейный отдых у бассейна"],
 description: ["Forbest’s two-bedroom bungalow for up to five adults. The listing includes a pool, kitchen, barbecue, air conditioning and breakfast.", "كوخ Forbest بغرفتي نوم لخمسة بالغين. يذكر الإعلان مسبحًا ومطبخًا وشواء وتكييفًا وإفطارًا.", "Бунгало Forbest с двумя спальнями для пяти взрослых. Указаны бассейн, кухня, барбекю, кондиционер и завтрак."],
 details: ["This card is for the 2+1 pool unit only | The hot tub belongs to a different 1+1 unit | Confirm extra-guest charges | Photo is from the property gallery; confirm your unit | No pets.", "البطاقة لوحدة 2+1 ذات المسبح فقط | الجاكوزي لوحدة 1+1 مختلفة | أكّد رسوم الضيوف الإضافيين | الصورة من معرض المنشأة؛ أكّد وحدتك | لا تُقبل الحيوانات.", "Карточка только для 2+1 с бассейном | Джакузи относится к другому номеру 1+1 | Уточните доплату за гостей | Фото из галереи объекта; проверьте тип номера | Без питомцев."]
},
"rubin-white": {
 tag: ["Pool & hammock", "مسبح وأرجوحة شبكية", "Бассейн и гамак"],
 description: ["Rubin’s White bungalow has two bedrooms and accommodates up to five adults. A pool, fireplace, kitchen and garden hammock are listed.", "كوخ White لدى Rubin بغرفتي نوم لخمسة بالغين. يذكر الإعلان مسبحًا ومدفأة ومطبخًا وأرجوحة شبكية في الحديقة.", "White комплекса Rubin — бунгало с двумя спальнями для пяти взрослых. Указаны бассейн, камин, кухня и гамак в саду."],
 details: ["Room-only stay; no pets | Pool dimensions: 5 × 3 m | Photo is from the property gallery; confirm unit details.", "إقامة دون وجبات؛ لا تُقبل الحيوانات | أبعاد المسبح 5 × 3 م | الصورة من معرض المنشأة؛ أكّد تفاصيل الوحدة.", "Без питания и питомцев | Бассейн 5 × 3 м | Фото из галереи объекта; уточните детали номера."]
},
"nesilce-dubleks": {
 tag: ["Mengen forests", "غابات منغن", "Леса Менгена"],
 description: ["Nesilce’s two-storey wooden bungalow in Mengen is offered for four to six guests, with a living room, bathroom, spacious terrace and breakfast.", "كوخ Nesilce الخشبي بطابقين في منغن لأربعة إلى ستة ضيوف، بصالة وحمام وتراس واسع وإفطار.", "Двухэтажное деревянное бунгало Nesilce в Менгене для 4–6 гостей с гостиной, ванной, просторной террасой и завтраком."],
 details: ["Source lists 1 double and 2 single beds; confirm sleeping arrangements for additional guests | Breakfast, Wi-Fi and parking are listed.", "يذكر الإعلان سريرًا مزدوجًا وسريرين منفردين؛ أكّد ترتيب نوم الضيوف الإضافيين | الإفطار وواي فاي وموقف سيارات مذكورة.", "Указаны 1 двуспальная и 2 односпальные кровати; уточните места для остальных гостей | Завтрак, Wi-Fi и парковка указаны в описании."]
},
"cati-kati-bolu": {
 tag: ["A morning on the veranda", "صباح على الشرفة", "Утро на веранде"],
 description: ["A Bolu bungalow with a mezzanine bedroom, veranda and garden. Its official unit page lists a hot tub, fireplace, kitchen, Wi-Fi and air conditioning.", "كوخ في بولو بغرفة نوم في طابق نصفي وشرفة وحديقة. يذكر الموقع الرسمي جاكوزي ومدفأة ومطبخًا وواي فاي وتكييفًا.", "Бунгало в Болу со спальней на антресоли, верандой и садом. Указаны джакузи, камин, кухня, Wi-Fi и кондиционер."],
 details: ["Standard capacity: 2 adults; confirm child conditions | 50 m² ground floor + 18 m² mezzanine | Private garden and barbecue | The official home page allows pets; ask about conditions.", "السعة الأساسية بالغان؛ أكّد شروط الأطفال | 50 م² أرضي و18 م² طابق نصفي | حديقة خاصة وشواء | يُذكر قبول الحيوانات في الصفحة الرسمية؛ اسأل عن الشروط.", "Стандартно 2 взрослых; условия для детей уточняйте | 50 м² внизу и 18 м² антресоли | Свой сад и барбекю | На главной странице разрешены питомцы; уточните условия."]
},
"evcek-junior": {
 tag: ["A little Düzce escape", "استراحة في دوزجه", "Отдых в Дюздже"],
 description: ["Evcek’s Junior Bungalow for two, on the Düzce–Yığılca road. The photo is linked directly to this room type by the listing.", "وحدة Junior Bungalow لشخصين لدى Evcek على طريق دوزجه–يغِلجا. الصورة مرتبطة بهذا النوع مباشرة في الإعلان.", "Junior Bungalow комплекса Evcek для двоих на дороге Дюздже–Йыгылджа. Фото в описании привязано именно к этому типу."],
 details: ["Up to 2 guests | Listed check-in / check-out: 14:00 / 12:00 | Pet policies conflict across sources; confirm | Pools and hot tubs in other units are not assigned to this one.", "حتى ضيفين | الوصول والمغادرة: 14:00 و12:00 | سياسة الحيوانات متعارضة بين المصادر؛ أكّدها | مسابح وجاكوزي الوحدات الأخرى غير منسوبة لهذه الوحدة.", "До 2 гостей | Заезд / выезд: 14:00 / 12:00 | Данные о питомцах противоречат друг другу; уточните | Бассейны и джакузи других номеров не отнесены к этому."]
},
"seyrona-102": {
 tag: ["Hot tub with valley views", "جاكوزي بإطلالة على الوادي", "Джакузи с видом на долину"],
 description: ["A 55 m² loft bungalow in Derecik for two, with valley views. The official page lists a private hot tub, fireplace, air conditioning and a full breakfast.", "كوخ Loft بمساحة 55 م² في Derecik لشخصين بإطلالة على الوادي. يذكر الإعلان الرسمي جاكوزي خاصًا ومدفأة وتكييفًا وإفطارًا متنوعًا.", "Лофт-бунгало 55 м² в Derecik для двоих с видом на долину. Указаны своё джакузи, камин, кондиционер и полный завтрак."],
 details: ["102 Loft: 2 guests, 1 bedroom | Breakfast, Wi-Fi and parking included in the listing | Mini fridge, kettle and seating area | Hot tub is not classified as a swimming pool.", "102 Loft: ضيفان وغرفة نوم واحدة | إفطار وواي فاي وموقف سيارات حسب الإعلان | ثلاجة صغيرة وغلاية وجلوس | الجاكوزي ليس مصنفًا كمسبح.", "102 Loft: 2 гостя, 1 спальня | Указаны завтрак, Wi-Fi и парковка | Мини-холодильник, чайник и зона отдыха | Джакузи не считается бассейном."]
},
"gafulluk-ahsap": {
 tag: ["Green mornings in Araklı", "صباح أخضر في أراكلي", "Зелёное утро в Араклы"],
 description: ["The wooden bungalow at Gafulluk Tatil Köyü in Araklı is listed for four. This card excludes the property’s stone villas and suites.", "الكوخ الخشبي في Gafulluk Tatil Köyü بأراكلي مُدرج لأربعة ضيوف. لا تشمل البطاقة الفيلات الحجرية والأجنحة الأخرى.", "Деревянное бунгало Gafulluk Tatil Köyü в Араклы рассчитано на четырёх. Каменные виллы и люксы не включены в эту карточку."],
 details: ["Photo comes directly from the wooden-bungalow room card | Hot tubs belong to different stone units | Confirm bedroom layout, breakfast and availability.", "الصورة من بطاقة الكوخ الخشبي مباشرة | الجاكوزي يخص وحدات حجرية مختلفة | أكّد توزيع غرف النوم والإفطار والتوافر.", "Фото взято из карточки деревянного бунгало | Джакузи относятся к другим, каменным номерам | Уточните спальни, завтрак и наличие."]
},
"hilltown-sapanca": {
 tag: ["Veranda hot tub", "جاكوزي على الشرفة", "Джакузи на веранде"],
 description: ["A two-bedroom bungalow option in Babadayı, with a private heated pool, veranda hot tub, kitchen and garden barbecue listed by the listing.", "كوخ بغرفتي نوم في Babadayı، بمسبح خاص مدفأ وجاكوزي على الشرفة ومطبخ وشواء في الحديقة حسب الإعلان.", "Бунгало с двумя спальнями в Babadayı. Указаны свой бассейн с подогревом, джакузи на веранде, кухня и барбекю в саду."],
 details: ["2+1 unit: up to 5 adults; 1+1 houses are not separate properties | Breakfast extra; no pets | Gallery photo; confirm the selected unit with the property.", "وحدة 2+1 حتى 5 بالغين؛ بيوت 1+1 ليست منشآت منفصلة | الإفطار برسوم والحيوانات غير مقبولة | صورة من المعرض؛ أكّد الوحدة مع المنشأة.", "2+1: до 5 взрослых; домики 1+1 не отдельные объекты | Завтрак за доплату, без питомцев | Фото из галереи; уточните выбранный тип."]
},
"kuka-sapanca": {
 tag: ["Pool & fireplace", "مسبح ومدفأة", "Бассейн и камин"],
 description: ["The 1+1 pool-and-hot-tub option at Kuka in Hacımercan accommodates up to three. A restaurant and breakfast service are available.", "وحدة 1+1 بمسبح وجاكوزي لدى Kuka في Hacımercan لثلاثة ضيوف، مع مطعم وخدمة إفطار.", "Вариант 1+1 с бассейном и джакузи комплекса Kuka в Hacımercan для трёх гостей. Есть ресторан и завтрак."],
 details: ["This is the pool unit; the property also has a house without a pool | Breakfast included, other restaurant orders extra | Kitchen has no hob | No pets.", "هذه وحدة المسبح؛ يوجد بيت آخر دون مسبح | الإفطار مشمول، وطلبات المطعم الأخرى برسوم | لا يوجد موقد طبخ بالمطبخ | لا تُقبل الحيوانات.", "Это дом с бассейном; есть и вариант без него | Завтрак включён, остальное в ресторане за доплату | На кухне нет плиты | Без питомцев."]
},
"stone-sapanca": {
 tag: ["Pool & sauna", "مسبح وساونا", "Бассейн и сауна"],
 description: ["A pool bungalow with two bedrooms, kitchen and garden. The listing describes a sauna for the 2+1 unit with hot tub.", "كوخ بمسبح وغرفتي نوم ومطبخ وحديقة. يذكر الإعلان ساونا لوحدة 2+1 ذات الجاكوزي.", "Бунгало с бассейном, двумя спальнями, кухней и садом. Для 2+1 с джакузи указана сауна."],
 details: ["1 double and 2 single beds; capacity based on 4 guests | White is a different unit without a sauna | Electric fireplace, not a wood-burning one | Confirm children and extra-guest conditions.", "سرير مزدوج وسريران منفردان؛ السعة 4 | White وحدة مختلفة دون ساونا | المدفأة كهربائية وليست حطبًا | أكّد شروط الأطفال والضيوف الإضافيين.", "1 двуспальная и 2 односпальные кровати; расчёт на 4 гостей | White — другой номер без сауны | Камин электрический, не дровяной | Уточните условия для детей и дополнительных гостей."]
},
"majesty-sapanca": {
 tag: ["A private garden pool", "مسبح خاص في الحديقة", "Свой бассейн в саду"],
 description: ["Two-bedroom bungalows in Sapanca for four. The listing describes a private pool, hot tub and stone barbecue.", "أكواخ بغرفتي نوم في صبنجة لأربعة ضيوف. يذكر الإعلان مسبحًا خاصًا وجاكوزي وشواء حجريًا.", "Бунгало с двумя спальнями в Сапандже для четырёх. Указаны свой бассейн, джакузи и каменный мангал."],
 details: ["2+1 layout: double bed upstairs, 2 single beds downstairs | Breakfast for 2 only; extra breakfasts charged | No pets; confirm seasonal pool heating | Multiple sources are kept in one listing.", "توزيع 2+1: سرير مزدوج أعلى وسريران منفردان أسفل | الإفطار لشخصين فقط، والإضافي برسوم | لا تُقبل الحيوانات؛ أكّد تسخين المسبح حسب الموسم | مصادر المنشأة ضمن إعلان واحد.", "2+1: двуспальная кровать наверху, 2 односпальные внизу | Завтрак для 2, остальные за доплату | Без питомцев; уточните сезонный подогрев | Источники объединены в одной карточке."]
},
"alis-paradise": {
 tag: ["Poolside breakfast", "إفطار بجوار المسبح", "Завтрак у бассейна"],
 description: ["A bungalow property in Şükriye with private pools and hot tubs. This card uses the two-bedroom 2+1 option for four adults.", "منشأة أكواخ في Şükriye بمسابح خاصة وجاكوزي. تعتمد البطاقة وحدة 2+1 بغرفتي نوم لأربعة بالغين.", "Комплекс бунгало в Şükriye со своими бассейнами и джакузи. Здесь представлен вариант 2+1 с двумя спальнями для четырёх взрослых."],
 details: ["4 adults; additional children subject to conditions | Breakfast for 2, extra guests charged | Fireplaces in some 1+1 units do not apply here | Kitchen, Wi-Fi, garden furniture; no pets.", "4 بالغين؛ الأطفال الإضافيون وفق شروط | الإفطار لشخصين، والإضافي برسوم | مدافئ بعض وحدات 1+1 لا تنطبق هنا | مطبخ وواي فاي وأثاث حديقة؛ لا تُقبل الحيوانات.", "4 взрослых; дети дополнительно по условиям | Завтрак для 2, остальным за доплату | Камины некоторых 1+1 сюда не относятся | Кухня, Wi-Fi, садовая мебель; без питомцев."]
},
"seven-sense": {
 tag: ["A family nature break", "استراحة عائلية في الطبيعة", "Семейный отдых на природе"],
 description: ["The King 2+1 bungalow in Hacımercan. The listing describes a private pool, veranda hot tub, fireplace, kitchen and children’s play area.", "كوخ King 2+1 في Hacımercan. يذكر الإعلان مسبحًا خاصًا وجاكوزي على الشرفة ومدفأة ومطبخًا ومنطقة لعب أطفال.", "King 2+1 в Hacımercan. Указаны свой бассейн, джакузи на веранде, камин, кухня и детская площадка."],
 details: ["Detailed King description says 4 adults; another source passage says 5 guests, so confirm | Breakfast and pets are listed; verify terms | Ultra King is another unit at the same property | Confirm admission rules and check-out time.", "الوصف التفصيلي يذكر 4 بالغين وموضع آخر 5 ضيوف؛ أكّد السعة | يُذكر الإفطار وقبول الحيوانات؛ أكّد الشروط | Ultra King وحدة أخرى في نفس المنشأة | أكّد قواعد القبول ووقت المغادرة.", "В подробном описании King — 4 взрослых, в другом месте — 5 гостей; уточните | Указаны завтрак и питомцы; проверьте условия | Ultra King — другой номер того же объекта | Уточните правила и время выезда."]
},
"galaksi-life": {
 tag: ["Warm pool & hot tub", "مسبح دافئ وجاكوزي", "Тёплый бассейн и джакузи"],
 description: ["A two-bedroom Sapanca bungalow for four with a heated pool, hot tub, fireplace and screened garden listed by the listing.", "كوخ بغرفتي نوم في صبنجة لأربعة، بمسبح مدفأ وجاكوزي ومدفأة وحديقة محجوبة حسب الإعلان.", "Бунгало с двумя спальнями в Сапандже для четырёх. Указаны бассейн с подогревом, джакузи, камин и закрытый от взглядов сад."],
 details: ["2 bedrooms, 1 bathroom | Breakfast for 2; firewood extra | Pets incur an extra cleaning fee; confirm admission rules.", "غرفتا نوم وحمام واحد | الإفطار لشخصين والحطب برسوم | للحيوانات رسوم تنظيف إضافية؛ أكّد قواعد القبول.", "2 спальни, 1 ванная | Завтрак для 2, дрова за доплату | За питомцев доплата за уборку; уточните правила."]
},
"ruya-live": {
 tag: ["Garden hot tub", "جاكوزي في الحديقة", "Джакузи в саду"],
 description: ["A two-bedroom Sapanca bungalow listed for five, with a heated pool, hot tub, barbecue and fire pit in the garden.", "كوخ بغرفتي نوم في صبنجة لخمسة، مع مسبح مدفأ وجاكوزي وشواء وموقد نار في الحديقة.", "Бунгало с двумя спальнями в Сапандже для пяти: бассейн с подогревом, джакузи, барбекю и костровая чаша в саду."],
 details: ["2 bedrooms, 1 bathroom | Kitchen, Wi-Fi and air conditioning | Breakfast not included | Confirm guest admission rules before booking property.", "غرفتا نوم وحمام واحد | مطبخ وواي فاي وتكييف | الإفطار غير مشمول | أكّد قواعد قبول الضيوف مع المنشأة.", "2 спальни, 1 ванная | Кухня, Wi-Fi, кондиционер | Завтрак не включён | Уточните правила заселения."]
},
"last-summer": {
 tag: ["A poolside pause", "استراحة بجوار المسبح", "Пауза у бассейна"],
 description: ["A two-bedroom bungalow for up to five. A heated pool, hot tub, kitchen, barbecue and garden seating are listed.", "كوخ بغرفتي نوم لخمسة، مع مسبح مدفأ وجاكوزي ومطبخ وشواء وجلسات حديقة حسب الإعلان.", "Бунгало с двумя спальнями для пяти. Указаны бассейн с подогревом, джакузи, кухня, барбекю и садовая зона отдыха."],
 details: ["2 bedrooms, 1 bathroom | 1 double bed, 2 single beds and a seating area | Room-only stay; breakfast not included.", "غرفتا نوم وحمام واحد | سرير مزدوج وسريران منفردان وجلسة | إقامة دون وجبات؛ الإفطار غير مشمول.", "2 спальни, 1 ванная | 1 двуспальная, 2 односпальные кровати и мягкая мебель | Без питания; завтрак не включён."]
},
"vupi-sapanca": {
 tag: ["A Kırkpınar escape", "إجازة في كركبنار", "Отдых в Кыркпынаре"],
 description: ["A two-bedroom bungalow in Kırkpınar for five, with a heated pool, hot tub, screened garden and kitchen.", "كوخ بغرفتي نوم في كركبنار لخمسة، مع مسبح مدفأ وجاكوزي وحديقة محجوبة ومطبخ.", "Бунгало с двумя спальнями в Кыркпынаре для пяти: бассейн с подогревом, джакузи, закрытый сад и кухня."],
 details: ["2 bedrooms, 1 bathroom | Garden fire pit, barbecue and seating | No pets; breakfast inclusion is unconfirmed.", "غرفتا نوم وحمام واحد | موقد نار وشواء وجلسات حديقة | لا تُقبل الحيوانات؛ شمول الإفطار غير مؤكد.", "2 спальни, 1 ванная | В саду костровая чаша, барбекю и зона отдыха | Без питомцев; завтрак не подтверждён."]
},
"alit-sapanca": {
 tag: ["Lake-view hot tub", "جاكوزي بإطلالة على البحيرة", "Джакузи с видом на озеро"],
 description: ["A two-bedroom bungalow advertised with lake views. The listing describes a pool, hot tub, fireplace and kitchen with a hob.", "كوخ بغرفتي نوم يُعلن بإطلالة على البحيرة. يذكر الإعلان مسبحًا وجاكوزي ومدفأة ومطبخًا بموقد طبخ.", "Бунгало с двумя спальнями и заявленным видом на озеро. Указаны бассейн, джакузи, камин и кухня с плитой."],
 details: ["2 bedrooms, 2 bathrooms, 5 guests | Pool, barbecue and loungers in the garden; heating unconfirmed | Firewood extra; breakfast inclusion is not stated.", "غرفتا نوم وحمامان، 5 ضيوف | مسبح وشواء وكراسي استرخاء؛ التسخين غير مؤكد | الحطب برسوم؛ شمول الإفطار غير مذكور.", "2 спальни, 2 ванные, 5 гостей | Бассейн, барбекю, шезлонги; подогрев не подтверждён | Дрова за доплату; завтрак не указан как включённый."]
},
"egg-sapanca": {
 tag: ["Fireplace & garden", "مدفأة وحديقة", "Камин и сад"],
 description: ["A two-bedroom bungalow listed for five, with a pool, hot tub, fireplace, underfloor heating and kitchen.", "كوخ بغرفتي نوم لخمسة ضيوف، مع مسبح وجاكوزي ومدفأة وتدفئة أرضية ومطبخ.", "Бунгало с двумя спальнями для пяти: бассейн, джакузи, камин, тёплые полы и кухня."],
 details: ["2 bedrooms, 1 bathroom | Underfloor heating does not imply a heated pool | Firewood costs extra; room-only stay.", "غرفتا نوم وحمام واحد | التدفئة الأرضية لا تعني تسخين المسبح | الحطب برسوم؛ إقامة دون وجبات.", "2 спальни, 1 ванная | Тёплые полы не означают подогрев бассейна | Дрова за доплату; без питания."]
},
"bisn-sapanca": {
 tag: ["A family garden stay", "بيت عائلي بحديقة", "Семейный дом с садом"],
 description: ["A two-bedroom Sapanca bungalow for five. The listing includes a hot tub, pool, kitchen with a hob and garden barbecue.", "كوخ بغرفتي نوم في صبنجة لخمسة، مع جاكوزي ومسبح ومطبخ بموقد وشواء في الحديقة.", "Бунгало с двумя спальнями в Сапандже для пяти. Указаны джакузи, бассейн, кухня с плитой и барбекю в саду."],
 details: ["2 bedrooms, 1 bathroom | The listing states a family-only condition; confirm before booking | Pool heating and breakfast inclusion are unconfirmed.", "غرفتا نوم وحمام واحد | الإعلان يشترط العائلات؛ أكّد قبل الحجز | تسخين المسبح وشمول الإفطار غير مؤكدين.", "2 спальни, 1 ванная | В объявлении условие «только семьи»; уточните до бронирования | Подогрев бассейна и завтрак не подтверждены."]
},
"srk-sapanca": {
 tag: ["Lake views & fireplace", "إطلالة بحيرة ومدفأة", "Вид на озеро и камин"],
 description: ["A five-person bungalow advertised with lake views. The listing describes a heated pool, fireplace, kitchen and a garden swing.", "كوخ لخمسة ضيوف بإطلالة معلنة على البحيرة. يذكر الإعلان مسبحًا مدفأ ومدفأة ومطبخًا وأرجوحة حديقة.", "Бунгало для пяти с заявленным видом на озеро. Указаны бассейн с подогревом, камин, кухня и садовые качели."],
 details: ["2 bedrooms, 1 bathroom | A hot tub is not confirmed | The listing asks guests to contact the property for a price.", "غرفتا نوم وحمام واحد | الجاكوزي غير مؤكد | يطلب الإعلان التواصل مع المنشأة لمعرفة السعر.", "2 спальни, 1 ванная | Джакузи не подтверждено | Цену источник предлагает уточнять у объекта."]
},
"asteria-giresun": {
 tag: ["Near the shore in Keşap", "قرب الشاطئ في كشاب", "У побережья в Кешапе"],
 description: ["The property is described as walking distance from the shore in Keşap. Its bungalow unit accommodates three; an outdoor pool and barbecue are listed.", "منشأة في كشاب يُذكر أنها على مسافة مشي من الساحل. وحدة الكوخ لثلاثة ضيوف، ويذكر الإعلان مسبحًا خارجيًا وشواء.", "По описанию, объект в Кешапе в пешей доступности от берега. Бунгало для трёх; указаны открытый бассейн и барбекю."],
 details: ["Up to 3; bedroom count unspecified | Pets, Wi-Fi and parking listed | Private use and pool heating are not confirmed.", "حتى 3 ضيوف؛ غرف النوم غير محددة | تُذكر الحيوانات وواي فاي وموقف سيارات | خصوصية المسبح وتسخينه غير مؤكدين.", "До 3 гостей; число спален не указано | Указаны питомцы, Wi-Fi и парковка | Личный бассейн и его подогрев не подтверждены."]
},
"loin-du-monde": {
 tag: ["A terrace over the Black Sea", "تراس على البحر الأسود", "Терраса над Чёрным морем"],
 description: ["Loin Du Monde’s triangular bungalow in Çaytepe, Perşembe. The unit accommodates six guests; the property lists a garden, barbecue, Wi-Fi and parking.", "كوخ Loin Du Monde المثلث في Çaytepe ببرشمبه. الوحدة لستة ضيوف؛ تذكر المنشأة حديقة وشواء وواي فاي وموقف سيارات.", "Треугольное бунгало Loin Du Monde в Çaytepe, Першембе. Вмещает шесть гостей; есть сад, барбекю, Wi-Fi и парковка."],
 details: ["Up to 6; confirm bedroom count | Pets listed; confirm conditions | The four-person Superior is a different unit | Tiny House is another accommodation type at the same property, not another bungalow listing.", "حتى 6 ضيوف؛ أكّد عدد الغرف | تُذكر الحيوانات؛ أكّد الشروط | Superior لأربعة وحدة مختلفة | Tiny House نوع إقامة آخر في المنشأة وليس إعلان كوخ إضافيًا.", "До 6; уточните число спален | Питомцы указаны; проверьте условия | Superior для 4 — другой номер | Tiny House — другой тип жилья того же объекта, не отдельное бунгало."]
},
"pagen-artvin": {
 tag: ["Sea views in Hopa", "إطلالة بحرية في هوبا", "Вид на море в Хопе"],
 description: ["A sea-view bungalow in Pınarlı village, Hopa. Sources list a garden, terrace, Wi-Fi, one bedroom and capacity for three.", "كوخ بإطلالة بحرية في قرية Pınarlı بهوبا. تذكر المصادر حديقة وتراسًا وواي فاي وغرفة نوم وسعة ثلاثة ضيوف.", "Бунгало с видом на море в деревне Pınarlı, Хопа. Указаны сад, терраса, Wi-Fi, одна спальня и три гостя."],
 details: ["Capacity: up to 3 guests | 1 double bed + 1 single sofa bed | In-room breakfast service listed, inclusion unconfirmed | Pagen Bungalow and Pagen Bungalov are the same property.", "السعة: حتى 3 ضيوف | سرير مزدوج وأريكة سرير فردية | خدمة إفطار بالغرفة مذكورة دون تأكيد شمولها | الاسمان Pagen Bungalow وPagen Bungalov لنفس المنشأة.", "Вместимость: до 3 гостей | Двуспальная кровать и одноместный диван-кровать | Завтрак в номер есть, включение не подтверждено | Pagen Bungalow и Pagen Bungalov — один объект."]
},
"aybelya-bafra": {
 tag: ["A garden getaway in Bafra", "إجازة بحديقة في بافرا", "Отдых с садом в Бафре"],
 description: ["A two-bedroom duplex bungalow for four in Lengerli, Bafra. The official unit page lists a pool, garden, kitchenette and fireplace stove.", "كوخ دوبلكس بغرفتي نوم لأربعة في Lengerli ببافرا. يذكر الموقع الرسمي مسبحًا وحديقة ومطبخًا صغيرًا وموقد تدفئة.", "Двухэтажное бунгало с двумя спальнями для четырёх в Lengerli, Бафра. Указаны бассейн, сад, мини-кухня и печь-камин."],
 details: ["Deluxe pool unit: 70 m², 2 bedrooms, 2–4 guests | Barbecue, swing, fire pit and loungers | Breakfast service listed; confirm inclusion | Other units at this property are not duplicate listings.", "Deluxe بمسبح: 70 م² وغرفتا نوم، 2–4 ضيوف | شواء وأرجوحة وموقد نار وكراسي استرخاء | خدمة إفطار؛ أكّد شمولها | وحدات المنشأة الأخرى ليست إعلانات مكررة.", "Deluxe с бассейном: 70 м², 2 спальни, 2–4 гостя | Барбекю, качели, костровая чаша и шезлонги | Завтрак предлагается; уточните включение | Другие типы не считаются отдельными объектами."]
},
"mencuna-artvin": {
 tag: ["Wake up to a waterfall", "استيقظ على صوت الشلال", "Просыпайтесь под шум водопада"],
 description: ["A two-bedroom wooden bungalow with waterfall views in Kamilet Valley. The official source lists a balcony, breakfast and five-person capacity with an extra bed.", "كوخ خشبي بغرفتي نوم وإطلالة على الشلال في وادي Kamilet. يذكر الإعلان الرسمي شرفة وإفطارًا وسعة خمسة مع سرير إضافي.", "Деревянное бунгало с двумя спальнями и видом на водопад в долине Kamilet. Есть балкон, завтрак и место для пяти с дополнительной кроватью."],
 details: ["32 m²; double bed, 2 single beds, extra bed for guest 5 | Breakfast included; shared kitchen and barbecue | No pets; stone-house rooms are excluded.", "32 م²؛ سرير مزدوج وسريران منفردان وإضافي للخامس | الإفطار مشمول ومطبخ وشواء مشتركان | لا تُقبل الحيوانات؛ غرف المبنى الحجري غير مشمولة.", "32 м²; двуспальная, 2 односпальные и дополнительная кровать для пятого | Завтрак включён, общая кухня и барбекю | Без питомцев; комнаты каменного дома не включены."]
},
"pafuli-rize": {
 tag: ["A duplex stay in Rize", "إقامة دوبلكس في ريزه", "Дуплекс в Ризе"],
 description: ["Pafuli’s Frezya Suit duplex bungalow accommodates four. The listing describes a hot tub, Wi-Fi, parking and an outdoor play area.", "كوخ Frezya Suit الدوبلكس لدى Pafuli لأربعة ضيوف. يذكر الإعلان جاكوزي وواي فاي وموقف سيارات ومنطقة ألعاب خارجية.", "Frezya Suit комплекса Pafuli — двухэтажное бунгало для четырёх. Указаны джакузи, Wi-Fi, парковка и игровая площадка."],
 details: ["Up to 4; bedroom count not specified | No pets; confirm breakfast | Mimoza, Patunya, Azelya and Gardenya are units at the same property.", "حتى 4 ضيوف؛ غرف النوم غير محددة | لا تُقبل الحيوانات؛ أكّد الإفطار | Mimoza وPatunya وAzelya وGardenya وحدات لنفس المنشأة.", "До 4, число спален не указано | Без питомцев; уточните завтрак | Mimoza, Patunya, Azelya и Gardenya — номера того же объекта."]
},
"tenora-rize": {
 tag: ["A private pool in Ardeşen", "مسبح خاص في أردشن", "Свой бассейн в Ардешене"],
 description: ["A 2+1 bungalow in Ardeşen for four, with a private pool and air conditioning. The property lists a garden, terrace and Wi-Fi.", "كوخ 2+1 في أردشن لأربعة بمسبح خاص وتكييف. تذكر المنشأة حديقة وتراسًا وواي فاي.", "Бунгало 2+1 в Ардешене для четырёх со своим бассейном и кондиционером. Указаны сад, терраса и Wi-Fi."],
 details: ["Tenora2 and Tenora3 are not separate properties | No pets; pool heating unconfirmed | Teona in Fındıklı is a different property despite the similar name.", "Tenora2 وTenora3 ليستا منشأتين منفصلتين | لا تُقبل الحيوانات؛ التسخين غير مؤكد | Teona في فندقلي منشأة مختلفة رغم تشابه الاسم.", "Tenora2 и Tenora3 не отдельные объекты | Без питомцев; подогрев не подтверждён | Teona в Фындыклы — другой объект, несмотря на похожее имя."]
},
"madag-rize": {
 tag: ["A Black Sea fireplace", "مدفأة في البحر الأسود", "Камин в Черноморье"],
 description: ["Madağ’s Dublex Şömineli Bungalov-8 in Yeniyol accommodates three. The photo and capacity come from this specific room card.", "وحدة Dublex Şömineli Bungalov-8 لدى Madağ في Yeniyol لثلاثة ضيوف. الصورة والسعة من بطاقة هذه الوحدة تحديدًا.", "Dublex Şömineli Bungalov-8 комплекса Madağ в Yeniyol для трёх гостей. Фото и вместимость взяты из карточки именно этого номера."],
 details: ["Up to 3 guests | Pets listed; confirm conditions | Hot tubs and amenities of stone units elsewhere at the property are not included here.", "حتى 3 ضيوف | تُذكر الحيوانات؛ أكّد الشروط | مرافق الجاكوزي والوحدات الحجرية الأخرى غير منسوبة لهذه الوحدة.", "До 3 гостей | Питомцы указаны; уточните условия | Джакузи и удобства других каменных номеров сюда не включены."]
},
"oce-rize": {
 tag: ["A pause near the shore", "استراحة قرب الساحل", "Пауза у побережья"],
 description: ["The four-person Büyük Bungalow at a property listed near the shore in Ardeşen. Only this unit is represented here.", "وحدة Büyük Bungalow لأربعة في منشأة مُدرجة قرب ساحل أردشن. تمثل هذه البطاقة الوحدة المحددة فقط.", "Büyük Bungalow для четырёх на объекте, указанном рядом с берегом в Ардешене. Здесь представлен только этот тип."],
 details: ["2 double beds; bedroom count is not inferred from beds | No pets | Confirm breakfast and other amenities.", "سريران مزدوجان؛ لا يُستنتج عدد غرف النوم من الأسرّة | لا تُقبل الحيوانات | أكّد الإفطار والمرافق الأخرى.", "2 двуспальные кровати; число спален не выведено из числа кроватей | Без питомцев | Уточните завтрак и другие удобства."]
},
"ruby-rize": {
 tag: ["A Black Sea stay for seven", "إقامة لسبعة بالبحر الأسود", "Черноморье для семерых"],
 description: ["Ruby Doğal Yaşam Evleri’s Big Room bungalow in Pazar for seven. The listing describes a hot tub and parking at the property.", "كوخ Big Room لدى Ruby Doğal Yaşam Evleri في بازار لسبعة ضيوف. يذكر الإعلان جاكوزي وموقف سيارات.", "Big Room комплекса Ruby Doğal Yaşam Evleri в Пазаре для семи гостей. Указаны джакузи и парковка."],
 details: ["Black and White are other units, not separate listings | Bedroom count unspecified | No pets; confirm breakfast and extra-guest conditions.", "Black وWhite وحدات أخرى وليستا إعلانين منفصلين | غرف النوم غير محددة | لا تُقبل الحيوانات؛ أكّد الإفطار وشروط الضيوف الإضافيين.", "Black и White — другие номера, не отдельные объявления | Число спален не указано | Без питомцев; уточните завтрак и условия дополнительных гостей."]
},
"teona-rize": {
 tag: ["A riverside duplex", "دوبلكس بجوار النهر", "Дуплекс у реки"],
 description: ["A four-person duplex bungalow with stream views in Çağlayan, Fındıklı. The listing describes a hot tub, Wi-Fi and pets allowed.", "كوخ دوبلكس لأربعة بإطلالة على الجدول في Çağlayan بفندقلي. يذكر الإعلان جاكوزي وواي فاي وقبول الحيوانات.", "Двухэтажное бунгало для четырёх с видом на речку в Çağlayan, Фындыклы. Указаны джакузи, Wi-Fi и возможность с питомцами."],
 details: ["The six-person option is another unit, not another property | Confirm pet and breakfast conditions | Also named Teona Çağlayan; different from Tenora in Ardeşen.", "الخيار لستة وحدة أخرى لا منشأة أخرى | أكّد شروط الحيوانات والإفطار | تُسمى أيضًا Teona Çağlayan وتختلف عن Tenora في أردشن.", "Вариант для шести — другой номер, не другой объект | Уточните питомцев и завтрак | Также Teona Çağlayan; не Tenora в Ардешене."]
},
"mugada-bartin": {
 tag: ["A heated pool in Bartın", "مسبح مدفأ في بارطن", "Тёплый бассейн в Бартыне"],
 description: ["A 1+1 bungalow in central Bartın for up to four. The listing describes a heated pool, Wi-Fi and on-site parking.", "كوخ 1+1 في وسط بارطن لأربعة، مع مسبح مدفأ وواي فاي وموقف سيارات حسب الإعلان.", "Бунгало 1+1 в центре Бартына для четырёх. Указаны бассейн с подогревом, Wi-Fi и парковка."],
 details: ["Photo from the matching 1+1 room card | No pets; breakfast scope unspecified | Confirm that pool heating operates on your dates.", "الصورة من بطاقة وحدة 1+1 المطابقة | لا تُقبل الحيوانات؛ نطاق الإفطار غير محدد | أكّد تشغيل تسخين المسبح في تواريخك.", "Фото из соответствующей карточки 1+1 | Без питомцев; завтрак не уточнён | Проверьте работу подогрева бассейна на ваши даты."]
},
"amasra-suit": {
 tag: ["A pool break in Amasra", "استراحة بمسبح في أماسرا", "Бассейн в Амасре"],
 description: ["The four-person Lotus 2 unit in Gömü, Amasra. A hot tub, pool, Wi-Fi and parking are listed by the listing.", "وحدة Lotus 2 لأربعة في Gömü بأماسرا. يذكر الإعلان جاكوزي ومسبحًا وواي فاي وموقف سيارات.", "Lotus 2 для четырёх в Gömü, Амасра. Указаны джакузи, бассейн, Wi-Fi и парковка."],
 details: ["Mimoza is another unit at the same property | Outdoor pool is seasonal; heating unconfirmed | No pets; confirm bedrooms and breakfast.", "Mimoza وحدة أخرى بنفس المنشأة | المسبح الخارجي موسمي والتسخين غير مؤكد | لا تُقبل الحيوانات؛ أكّد الغرف والإفطار.", "Mimoza — другой номер того же объекта | Открытый бассейн сезонный; подогрев не подтверждён | Без питомцев; уточните спальни и завтрак."]
},
"simisso-sinop": {
 tag: ["A farm escape in Sinop", "استراحة ريفية في سينوب", "Отдых на ферме в Синопе"],
 description: ["A two-storey bungalow for four in Sinop. The listing describes a restaurant, Wi-Fi, parking and pets allowed.", "كوخ بطابقين لأربعة في سينوب. يذكر الإعلان مطعمًا وواي فاي وموقف سيارات وقبول الحيوانات.", "Двухэтажное бунгало для четырёх в Синопе. Указаны ресторан, Wi-Fi, парковка и питомцы."],
 details: ["Single-storey units are not separate properties | Bedroom count unspecified | A restaurant does not mean breakfast is included; confirm.", "الوحدات ذات الطابق الواحد ليست منشآت منفصلة | غرف النوم غير محددة | وجود مطعم لا يعني شمول الإفطار؛ أكّد ذلك.", "Одноэтажные номера не считаются отдельными объектами | Число спален не указано | Наличие ресторана не означает включённый завтрак; уточните."]
},
"derinsu-sinop": {
 tag: ["A coastal Sinop escape", "إجازة ساحلية في سينوب", "Отдых у моря в Синопе"],
 description: ["Derinsu’s 1+0 bungalow studio for three. The listing describes a location near the beach, Wi-Fi, parking and pets allowed.", "استوديو كوخ 1+0 لدى Derinsu لثلاثة. يذكر الإعلان موقعًا قرب الشاطئ وواي فاي وموقف سيارات وقبول الحيوانات.", "Бунгало-студия 1+0 комплекса Derinsu для трёх. Указаны близость пляжа, Wi-Fi, парковка и питомцы."],
 details: ["Studio layout; no separate bedroom assumed | 1+1 and 2+1 are other units at the same property | Confirm pet rules, breakfast and availability.", "استوديو دون افتراض غرفة نوم منفصلة | 1+1 و2+1 وحدات أخرى بنفس المنشأة | أكّد قواعد الحيوانات والإفطار والتوافر.", "Студия, отдельная спальня не предполагается | 1+1 и 2+1 — другие номера того же объекта | Уточните питомцев, завтрак и наличие."]
},
"trabzon-bungalov-evleri": {
 tag: ["A family break in Akyazı", "استراحة عائلية في أكيازي", "Семейный отдых в Акъязы"],
 description: ["Bungalov A in Akyazı is listed for five, with Wi-Fi, parking and barbecue facilities.", "Bungalov A في أكيازي لخمسة ضيوف، مع واي فاي وموقف سيارات وشواء حسب الإعلان.", "Bungalov A в Акъязы для пяти гостей с Wi-Fi, парковкой и барбекю по данным описания."],
 details: ["Unit B belongs to the same property | Pets up to 5 kg listed; confirm | Bedroom count, pool and breakfast inclusion are unconfirmed.", "الوحدة B تتبع نفس المنشأة | تُذكر الحيوانات حتى 5 كغ؛ أكّد الشروط | غرف النوم والمسبح وشمول الإفطار غير مؤكدة.", "Номер B относится к тому же объекту | Указаны питомцы до 5 кг; уточните | Спальни, бассейн и завтрак не подтверждены."]
},
"camlica-trabzon": {
 tag: ["A hot-tub escape in Yomra", "إجازة بجاكوزي في يومرا", "Отдых с джакузи в Йомре"],
 description: ["A bungalow with a hot tub in Yomra for up to six. The listing describes a fireplace, Wi-Fi, parking and pets allowed.", "كوخ بجاكوزي في يومرا لستة ضيوف. يذكر الإعلان مدفأة وواي فاي وموقف سيارات وقبول الحيوانات.", "Бунгало с джакузи в Йомре для шести. Указаны камин, Wi-Fi, парковка и возможность с питомцами."],
 details: ["Up to 6 guests | Hot tub is not a swimming pool | Confirm bedroom count and breakfast scope.", "حتى 6 ضيوف | الجاكوزي ليس مسبحًا | أكّد عدد غرف النوم ونطاق الإفطار.", "До 6 гостей | Джакузи не считается бассейном | Уточните число спален и завтрак."]
},
  "kabak-manzara-bungalow": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Standard 5 / 6 in Faralya, Fethiye, Muğla, for up to 2 guests. This listing represents the selected bungalow type at Kabak Manzara Bungalow.",
      "ستاندرد 5 / 6 في Faralya, Fethiye, Muğla يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Kabak Manzara Bungalow.",
      "Стандарт 5 / 6 в Faralya, Fethiye, Muğla, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Kabak Manzara Bungalow."
    ],
    "details": [
      "Selected unit: Standard 5 / 6; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: ستاندرد 5 / 6؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Стандарт 5 / 6; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "ovabuku-ahsap-evler": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "One-bedroom bungalow in Mesudiye, Datça, Muğla, for up to 5 guests. This listing represents the selected bungalow type at Ovabükü Ahşap Evler.",
      "كوخ بغرفة نوم واحدة في Mesudiye, Datça, Muğla يتسع لما يصل إلى 5 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Ovabükü Ahşap Evler.",
      "Бунгало с одной спальней в Mesudiye, Datça, Muğla, до 5 гостей. В карточке представлен выбранный тип бунгало объекта Ovabükü Ahşap Evler."
    ],
    "details": [
      "Selected unit: One-bedroom bungalow; up to 5 guests. | Bedrooms: 1. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بغرفة نوم واحدة؛ حتى 5 ضيوف. | غرف النوم: 1. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с одной спальней; до 5 гостей. | Спален: 1. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "mardin-bungalow": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Artuklu, Mardin, for up to 3 guests. This listing represents the selected bungalow type at Mardin Bungalow.",
      "كوخ في Artuklu, Mardin يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Mardin Bungalow.",
      "Бунгало в Artuklu, Mardin, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Mardin Bungalow."
    ],
    "details": [
      "Selected unit: Bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "by-life-resorts": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Ergan, Erzincan Merkez, Erzincan, for up to 4 guests. This listing represents the selected bungalow type at By Life Resorts · Bungalov.",
      "كوخ في Ergan, Erzincan Merkez, Erzincan يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في By Life Resorts · Bungalov.",
      "Бунгало в Ergan, Erzincan Merkez, Erzincan, до 4 гостей. В карточке представлен выбранный тип бунгало объекта By Life Resorts · Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "tepe-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Standard bungalow with balcony in Kızılcahamam, Ankara, for up to 3 guests. This listing represents the selected bungalow type at Tepe Bungalov.",
      "كوخ ستاندرد بشرفة في Kızılcahamam, Ankara يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Tepe Bungalov.",
      "Стандартное бунгало с балконом в Kızılcahamam, Ankara, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Tepe Bungalov."
    ],
    "details": [
      "Selected unit: Standard bungalow with balcony; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ ستاندرد بشرفة؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Стандартное бунгало с балконом; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "silaglow-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Nallıhan, Ankara, for up to 5 guests. This listing represents the selected bungalow type at Şilaglow Bungalov.",
      "كوخ في Nallıhan, Ankara يتسع لما يصل إلى 5 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Şilaglow Bungalov.",
      "Бунгало в Nallıhan, Ankara, до 5 гостей. В карточке представлен выбранный тип бунгало объекта Şilaglow Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow; up to 5 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 5 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 5 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "cansuyum-otel": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Polatlı, Ankara, for up to 3 guests. This listing represents the selected bungalow type at Cansuyum · Bungalov.",
      "كوخ في Polatlı, Ankara يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Cansuyum · Bungalov.",
      "Бунгало в Polatlı, Ankara, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Cansuyum · Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "celik-resort": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Duplex A-frame bungalow 10 in Ayaş, Ankara, for up to 4 guests. This listing represents the selected bungalow type at Çelik Resort · Üçgen Bungalov.",
      "كوخ مثلث دوبلكس 10 في Ayaş, Ankara يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Çelik Resort · Üçgen Bungalov.",
      "Двухэтажное треугольное бунгало 10 в Ayaş, Ankara, до 4 гостей. В карточке представлен выбранный тип бунгало объекта Çelik Resort · Üçgen Bungalov."
    ],
    "details": [
      "Selected unit: Duplex A-frame bungalow 10; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ مثلث دوبلكس 10؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Двухэтажное треугольное бунгало 10; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "begonvilla-bungalows": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Begonvil bungalow in Ölüdeniz, Fethiye, Muğla, for up to 2 guests. This listing represents the selected bungalow type at Begonvilla Bungalows.",
      "كوخ Begonvil في Ölüdeniz, Fethiye, Muğla يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Begonvilla Bungalows.",
      "Бунгало Begonvil в Ölüdeniz, Fethiye, Muğla, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Begonvilla Bungalows."
    ],
    "details": [
      "Selected unit: Begonvil bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ Begonvil؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало Begonvil; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "reds-bungalow-0017390": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Altınkum, Didim, Aydın, for up to 3 guests. This listing represents the selected bungalow type at Reds Bungalow.",
      "كوخ في Altınkum, Didim, Aydın يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Reds Bungalow.",
      "Бунгало в Altınkum, Didim, Aydın, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Reds Bungalow."
    ],
    "details": [
      "Selected unit: Bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "serender-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Foça, İzmir, for up to 2 guests. This listing represents the selected bungalow type at Serender Bungalov.",
      "كوخ في Foça, İzmir يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Serender Bungalov.",
      "Бунгало в Foça, İzmir, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Serender Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "alacahan-bungalow-evleri": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Standard bungalow in Güre, Edremit, Balıkesir, for up to 2 guests. This listing represents the selected bungalow type at Alacahan Bungalow Evleri.",
      "كوخ ستاندرد في Güre, Edremit, Balıkesir يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Alacahan Bungalow Evleri.",
      "Стандартное бунгало в Güre, Edremit, Balıkesir, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Alacahan Bungalow Evleri."
    ],
    "details": [
      "Selected unit: Standard bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ ستاندرد؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Стандартное бунгало; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "portakal-bungalov": {
    "tag": [
      "A hot-tub escape",
      "استراحة بجاكوزي",
      "Отдых с джакузи"
    ],
    "description": [
      "Portakal bungalow in Konyaaltı, Antalya, for up to 5 guests. This listing represents the selected bungalow type at Portakal Bungalov.",
      "كوخ Portakal في Konyaaltı, Antalya يتسع لما يصل إلى 5 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Portakal Bungalov.",
      "Бунгало Portakal в Konyaaltı, Antalya, до 5 гостей. В карточке представлен выбранный тип бунгало объекта Portakal Bungalov."
    ],
    "details": [
      "Selected unit: Portakal bungalow; up to 5 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ Portakal؛ حتى 5 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало Portakal; до 5 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "mese-bungalov": {
    "tag": [
      "Bungalow with pool",
      "كوخ بمسبح",
      "Бунгало с бассейном"
    ],
    "description": [
      "Bungalow in Termal, Yalova, for up to 6 guests. This listing represents the selected bungalow type at Meşe Bungalov.",
      "كوخ في Termal, Yalova يتسع لما يصل إلى 6 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Meşe Bungalov.",
      "Бунгало в Termal, Yalova, до 6 гостей. В карточке представлен выбранный тип бунгало объекта Meşe Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow; up to 6 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 6 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 6 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "robina-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Standard bungalow in Olimpos, Kumluca, Antalya, for up to 2 guests. This listing represents the selected bungalow type at Robina Bungalov.",
      "كوخ ستاندرد في Olimpos, Kumluca, Antalya يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Robina Bungalov.",
      "Стандартное бунгало в Olimpos, Kumluca, Antalya, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Robina Bungalov."
    ],
    "details": [
      "Selected unit: Standard bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ ستاندرد؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Стандартное бунгало; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "el-mundo-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Standard bungalow in Çınarcık, Yalova, for up to 2 guests. This listing represents the selected bungalow type at El Mundo Bungalov.",
      "كوخ ستاندرد في Çınarcık, Yalova يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في El Mundo Bungalov.",
      "Стандартное бунгало в Çınarcık, Yalova, до 2 гостей. В карточке представлен выбранный тип бунгало объекта El Mundo Bungalov."
    ],
    "details": [
      "Selected unit: Standard bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ ستاندرد؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Стандартное бунгало; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "adakoy-bungalov": {
    "tag": [
      "Bungalow with fireplace",
      "كوخ بمدفأة",
      "Бунгало с камином"
    ],
    "description": [
      "Duplex bungalow with fireplace in Kuşadası, Aydın, for up to 3 guests. This listing represents the selected bungalow type at Adaköy Bungalov.",
      "كوخ دوبلكس بمدفأة في Kuşadası, Aydın يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Adaköy Bungalov.",
      "Двухэтажное бунгало с камином в Kuşadası, Aydın, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Adaköy Bungalov."
    ],
    "details": [
      "Selected unit: Duplex bungalow with fireplace; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ دوبلكس بمدفأة؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Двухэтажное бунгало с камином; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "byelka-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "One-bedroom bungalow in Ayvalık, Balıkesir, for up to 2 guests. This listing represents the selected bungalow type at Byelka Bungalov.",
      "كوخ بغرفة نوم واحدة في Ayvalık, Balıkesir يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Byelka Bungalov.",
      "Бунгало с одной спальней в Ayvalık, Balıkesir, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Byelka Bungalov."
    ],
    "details": [
      "Selected unit: One-bedroom bungalow; up to 2 guests. | Bedrooms: 1. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بغرفة نوم واحدة؛ حتى 2 ضيوف. | غرف النوم: 1. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с одной спальней; до 2 гостей. | Спален: 1. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "karaoz-safir-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Standard bungalow in Karaöz, Kumluca, Antalya, for up to 4 guests. This listing represents the selected bungalow type at Karaöz Safir Bungalov.",
      "كوخ ستاندرد في Karaöz, Kumluca, Antalya يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Karaöz Safir Bungalov.",
      "Стандартное бунгало в Karaöz, Kumluca, Antalya, до 4 гостей. В карточке представлен выбранный тип бунгало объекта Karaöz Safir Bungalov."
    ],
    "details": [
      "Selected unit: Standard bungalow; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ ستاندرد؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Стандартное бунгало; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "bagdat-resort": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Two-bedroom bungalow in Altınova, Yalova, for up to 4 guests. This listing represents the selected bungalow type at Bağdat Resort · Bungalov.",
      "كوخ بغرفتي نوم في Altınova, Yalova يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Bağdat Resort · Bungalov.",
      "Бунгало с двумя спальнями в Altınova, Yalova, до 4 гостей. В карточке представлен выбранный тип бунгало объекта Bağdat Resort · Bungalov."
    ],
    "details": [
      "Selected unit: Two-bedroom bungalow; up to 4 guests. | Bedrooms: 2. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بغرفتي نوم؛ حتى 4 ضيوف. | غرف النوم: 2. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с двумя спальнями; до 4 гостей. | Спален: 2. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "doors-urla-hotel-bungalows": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Cinar bungalow in Urla, İzmir, for up to 2 guests. This listing represents the selected bungalow type at Doors Urla · Bungalov.",
      "كوخ Cinar في Urla, İzmir يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Doors Urla · Bungalov.",
      "Бунгало Cinar в Urla, İzmir, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Doors Urla · Bungalov."
    ],
    "details": [
      "Selected unit: Cinar bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ Cinar؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало Cinar; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "teosfer": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Lavanta bungalow in Sığacık, Seferihisar, İzmir, for up to 4 guests. This listing represents the selected bungalow type at Teosfer · Bungalov.",
      "كوخ Lavanta في Sığacık, Seferihisar, İzmir يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Teosfer · Bungalov.",
      "Бунгало Lavanta в Sığacık, Seferihisar, İzmir, до 4 гостей. В карточке представлен выбранный тип бунгало объекта Teosfer · Bungalov."
    ],
    "details": [
      "Selected unit: Lavanta bungalow; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ Lavanta؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало Lavanta; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "antik-vadi-bungalov-otel-kazdaglari": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Antik bungalow in Akçay, Edremit, Balıkesir, for up to 2 guests. This listing represents the selected bungalow type at Antik Vadi · Bungalov.",
      "كوخ Antik في Akçay, Edremit, Balıkesir يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Antik Vadi · Bungalov.",
      "Бунгало Antik в Akçay, Edremit, Balıkesir, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Antik Vadi · Bungalov."
    ],
    "details": [
      "Selected unit: Antik bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ Antik؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало Antik; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "miko-bungalow-evleri": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Sarımsaklı, Ayvalık, Balıkesir, for up to 3 guests. This listing represents the selected bungalow type at Miko Bungalow Evleri.",
      "كوخ في Sarımsaklı, Ayvalık, Balıkesir يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Miko Bungalow Evleri.",
      "Бунгало в Sarımsaklı, Ayvalık, Balıkesir, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Miko Bungalow Evleri."
    ],
    "details": [
      "Selected unit: Bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "lazoglu-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Güzelçamlı, Kuşadası, Aydın, for up to 3 guests. This listing represents the selected bungalow type at Lazoğlu Bungalov.",
      "كوخ في Güzelçamlı, Kuşadası, Aydın يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Lazoğlu Bungalov.",
      "Бунгало в Güzelçamlı, Kuşadası, Aydın, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Lazoğlu Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "fs-bungalows-otel": {
    "tag": [
      "A hot-tub escape",
      "استراحة بجاكوزي",
      "Отдых с джакузи"
    ],
    "description": [
      "Bungalow with pool and hot tub in Toroslar, Mersin, for up to 4 guests. This listing represents the selected bungalow type at FS Bungalows.",
      "كوخ بمسبح وجاكوزي في Toroslar, Mersin يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في FS Bungalows.",
      "Бунгало с бассейном и джакузи в Toroslar, Mersin, до 4 гостей. В карточке представлен выбранный тип бунгало объекта FS Bungalows."
    ],
    "details": [
      "Selected unit: Bungalow with pool and hot tub; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بمسبح وجاكوزي؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с бассейном и джакузи; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "otelox-sinap-bungalov": {
    "tag": [
      "A hot-tub escape",
      "استراحة بجاكوزي",
      "Отдых с джакузи"
    ],
    "description": [
      "Bungalow with private pool and hot tub in Sinap, Erdemli, Mersin, for up to 6 guests. This listing represents the selected bungalow type at Otelox Sinap Bungalov.",
      "كوخ بمسبح خاص وجاكوزي في Sinap, Erdemli, Mersin يتسع لما يصل إلى 6 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Otelox Sinap Bungalov.",
      "Бунгало со своим бассейном и джакузи в Sinap, Erdemli, Mersin, до 6 гостей. В карточке представлен выбранный тип бунгало объекта Otelox Sinap Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow with private pool and hot tub; up to 6 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بمسبح خاص وجاكوزي؛ حتى 6 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало со своим бассейном и джакузи; до 6 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "mersin-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Two-bedroom B bungalow in Çeşmeli, Erdemli, Mersin, for up to 6 guests. This listing represents the selected bungalow type at Mersin Bungalov.",
      "كوخ B بغرفتي نوم في Çeşmeli, Erdemli, Mersin يتسع لما يصل إلى 6 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Mersin Bungalov.",
      "Бунгало B с двумя спальнями в Çeşmeli, Erdemli, Mersin, до 6 гостей. В карточке представлен выбранный тип бунгало объекта Mersin Bungalov."
    ],
    "details": [
      "Selected unit: Two-bedroom B bungalow; up to 6 guests. | Bedrooms: 2. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ B بغرفتي نوم؛ حتى 6 ضيوف. | غرف النوم: 2. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало B с двумя спальнями; до 6 гостей. | Спален: 2. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "otelox-ayas-beach-bungalov": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Beachfront bungalow in Ayaş, Erdemli, Mersin, for up to 5 guests. This listing represents the selected bungalow type at Otelox Ayaş Beach Bungalov.",
      "كوخ على الشاطئ في Ayaş, Erdemli, Mersin يتسع لما يصل إلى 5 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Otelox Ayaş Beach Bungalov.",
      "Бунгало на берегу моря в Ayaş, Erdemli, Mersin, до 5 гостей. В карточке представлен выбранный тип бунгало объекта Otelox Ayaş Beach Bungalov."
    ],
    "details": [
      "Selected unit: Beachfront bungalow; up to 5 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ على الشاطئ؛ حتى 5 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало на берегу моря; до 5 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "botanik-gol-evleri": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "A-frame cedar cabin in Karacaören, Bucak, Burdur, for up to 3 guests. This listing represents the selected bungalow type at Botanik Göl Evleri · Bungalov.",
      "كوخ مثلث من خشب الأرز في Karacaören, Bucak, Burdur يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Botanik Göl Evleri · Bungalov.",
      "Треугольный кедровый домик в Karacaören, Bucak, Burdur, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Botanik Göl Evleri · Bungalov."
    ],
    "details": [
      "Selected unit: A-frame cedar cabin; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ مثلث من خشب الأرز؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Треугольный кедровый домик; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "sakli-gol-evleri": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Bucak, Burdur, for up to 4 guests. This listing represents the selected bungalow type at Saklı Göl Evleri · Bungalov.",
      "كوخ في Bucak, Burdur يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Saklı Göl Evleri · Bungalov.",
      "Бунгало в Bucak, Burdur, до 4 гостей. В карточке представлен выбранный тип бунгало объекта Saklı Göl Evleri · Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "nefes-dagyenice-dogada": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Double bungalow in Dağyenice, Nilüfer, Bursa, for up to 3 guests. This listing represents the selected bungalow type at Nefes Dağyenice · Bungalov.",
      "كوخ بسرير مزدوج في Dağyenice, Nilüfer, Bursa يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Nefes Dağyenice · Bungalov.",
      "Бунгало Double в Dağyenice, Nilüfer, Bursa, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Nefes Dağyenice · Bungalov."
    ],
    "details": [
      "Selected unit: Double bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بسرير مزدوج؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало Double; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "uludag-orman-koskleri": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Uludağ, Osmangazi, Bursa, for up to 4 guests. This listing represents the selected bungalow type at Uludağ Orman Köşkleri.",
      "كوخ في Uludağ, Osmangazi, Bursa يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Uludağ Orman Köşkleri.",
      "Бунгало в Uludağ, Osmangazi, Bursa, до 4 гостей. В карточке представлен выбранный тип бунгало объекта Uludağ Orman Köşkleri."
    ],
    "details": [
      "Selected unit: Bungalow; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "gocebe-kamp-bungalov": {
    "tag": [
      "Heated pool",
      "مسبح مدفأ",
      "Бассейн с подогревом"
    ],
    "description": [
      "One-bedroom bungalow with heated pool in İznik, Bursa, for up to 3 guests. This listing represents the selected bungalow type at Göçebe Kamp & Bungalov.",
      "كوخ بغرفة نوم ومسبح مدفأ في İznik, Bursa يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Göçebe Kamp & Bungalov.",
      "Бунгало с одной спальней и бассейном с подогревом в İznik, Bursa, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Göçebe Kamp & Bungalov."
    ],
    "details": [
      "Selected unit: One-bedroom bungalow with heated pool; up to 3 guests. | Bedrooms: 1. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بغرفة نوم ومسبح مدفأ؛ حتى 3 ضيوف. | غرف النوم: 1. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с одной спальней и бассейном с подогревом; до 3 гостей. | Спален: 1. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "dedeman-van-resort-aqua": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Lake-view Family French Bed bungalow in Edremit, Van, for up to 3 guests. This listing represents the selected bungalow type at Dedeman Van · Bungalov.",
      "كوخ عائلي بسرير مزدوج وإطلالة على البحيرة في Edremit, Van يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Dedeman Van · Bungalov.",
      "Семейное бунгало с двуспальной кроватью и видом на озеро в Edremit, Van, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Dedeman Van · Bungalov."
    ],
    "details": [
      "Selected unit: Lake-view Family French Bed bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ عائلي بسرير مزدوج وإطلالة على البحيرة؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Семейное бунгало с двуспальной кроватью и видом на озеро; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "metis-bungalow": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Bungalow in Assos, Ayvacık, Çanakkale, for up to 3 guests. This listing represents the selected bungalow type at Metis Bungalow.",
      "كوخ في Assos, Ayvacık, Çanakkale يتسع لما يصل إلى 3 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Metis Bungalow.",
      "Бунгало в Assos, Ayvacık, Çanakkale, до 3 гостей. В карточке представлен выбранный тип бунгало объекта Metis Bungalow."
    ],
    "details": [
      "Selected unit: Bungalow; up to 3 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ؛ حتى 3 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало; до 3 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "agva-shelale-hotel": {
    "tag": [
      "Bungalow with fireplace",
      "كوخ بمدفأة",
      "Бунгало с камином"
    ],
    "description": [
      "Family bungalow with mezzanine and fireplace in Ağva, Şile, İstanbul, for up to 4 guests. This listing represents the selected bungalow type at Ağva Shelale · Bungalov.",
      "كوخ عائلي بطابق نصفي ومدفأة في Ağva, Şile, İstanbul يتسع لما يصل إلى 4 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Ağva Shelale · Bungalov.",
      "Семейное бунгало с антресолью и камином в Ağva, Şile, İstanbul, до 4 гостей. В карточке представлен выбранный тип бунгало объекта Ağva Shelale · Bungalov."
    ],
    "details": [
      "Selected unit: Family bungalow with mezzanine and fireplace; up to 4 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ عائلي بطابق نصفي ومدفأة؛ حتى 4 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Семейное бунгало с антресолью и камином; до 4 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "agva-teras-garden-hotel-bungalow": {
    "tag": [
      "A hot-tub escape",
      "استراحة بجاكوزي",
      "Отдых с джакузи"
    ],
    "description": [
      "Bungalow with fireplace and hot tub in Ağva, Şile, İstanbul, for up to 2 guests. This listing represents the selected bungalow type at Ağva Teras Garden · Bungalov.",
      "كوخ بمدفأة وجاكوزي في Ağva, Şile, İstanbul يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Ağva Teras Garden · Bungalov.",
      "Бунгало с камином и джакузи в Ağva, Şile, İstanbul, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Ağva Teras Garden · Bungalov."
    ],
    "details": [
      "Selected unit: Bungalow with fireplace and hot tub; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بمدفأة وجاكوزي؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с камином и джакузи; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "purple-pinkolas-bungalov-darica": {
    "tag": [
      "A hot-tub escape",
      "استراحة بجاكوزي",
      "Отдых с джакузи"
    ],
    "description": [
      "Two-bedroom bungalow in Darıca, Kocaeli, for up to 6 guests. This listing represents the selected bungalow type at Purple Bungalov Darıca.",
      "كوخ بغرفتي نوم في Darıca, Kocaeli يتسع لما يصل إلى 6 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Purple Bungalov Darıca.",
      "Бунгало с двумя спальнями в Darıca, Kocaeli, до 6 гостей. В карточке представлен выбранный тип бунгало объекта Purple Bungalov Darıca."
    ],
    "details": [
      "Selected unit: Two-bedroom bungalow; up to 6 guests. | Bedrooms: 2. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بغرفتي نوم؛ حتى 6 ضيوف. | غرف النوم: 2. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с двумя спальнями; до 6 гостей. | Спален: 2. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "kartepe-green-bungalov": {
    "tag": [
      "Heated pool",
      "مسبح مدفأ",
      "Бассейн с подогревом"
    ],
    "description": [
      "Two-bedroom bungalow in Maşukiye, Kartepe, Kocaeli, for up to 6 guests. This listing represents the selected bungalow type at Kartepe Green Bungalov.",
      "كوخ بغرفتي نوم في Maşukiye, Kartepe, Kocaeli يتسع لما يصل إلى 6 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Kartepe Green Bungalov.",
      "Бунгало с двумя спальнями в Maşukiye, Kartepe, Kocaeli, до 6 гостей. В карточке представлен выбранный тип бунгало объекта Kartepe Green Bungalov."
    ],
    "details": [
      "Selected unit: Two-bedroom bungalow; up to 6 guests. | Bedrooms: 2. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ بغرفتي نوم؛ حتى 6 ضيوف. | غرف النوم: 2. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало с двумя спальнями; до 6 гостей. | Спален: 2. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  },
  "kartepe-zirve-house1": {
    "tag": [
      "Bungalow stay",
      "إقامة في كوخ",
      "Отдых в бунгало"
    ],
    "description": [
      "Two-person bungalow in Kartepe, Kocaeli, for up to 2 guests. This listing represents the selected bungalow type at Kartepe Zirve Bungalov.",
      "كوخ لشخصين في Kartepe, Kocaeli يتسع لما يصل إلى 2 ضيوف. يعرض هذا الإعلان نوع الكوخ المحدد في Kartepe Zirve Bungalov.",
      "Бунгало для двоих в Kartepe, Kocaeli, до 2 гостей. В карточке представлен выбранный тип бунгало объекта Kartepe Zirve Bungalov."
    ],
    "details": [
      "Selected unit: Two-person bungalow; up to 2 guests. | Confirm the bedroom count. | Other room types at the property are not included in this listing. | Confirm prices, availability and child admission conditions before booking.",
      "الوحدة المحددة: كوخ لشخصين؛ حتى 2 ضيوف. | يرجى تأكيد عدد غرف النوم. | لا يشمل هذا الإعلان أنواع الغرف الأخرى في المنشأة. | أكّد السعر والتوافر وشروط إقامة الأطفال قبل الحجز.",
      "Выбранный номер: Бунгало для двоих; до 2 гостей. | Уточните число спален. | Другие типы номеров объекта в эту карточку не входят. | До бронирования уточните цены, наличие и условия размещения детей."
    ]
  }
};

const PRICE_NOTES: Record<string, Translation> = {
 "so-sapanca": ["Tariff: 14,000 TL/night for 6. June–September 2026 table; conflicting September tariffs mean estimates stop at the end of August.", "الإعلان: 14,000 TL لليلة لستة ضيوف. جدول يونيو–سبتمبر 2026؛ بسبب تعارض تعرفة سبتمبر يتوقف الحساب عند نهاية أغسطس.", "Тариф: 14 000 TL за ночь для 6. Таблица на июнь–сентябрь 2026; из-за противоречий в сентябрьских тарифах расчёт только до конца августа."],
 "nois-2": ["Listed starting price: 10,000 TL. Dates and guest coverage are unclear, so no stay total is calculated.", "السعر المبدئي 10,000 TL. التواريخ وعدد المشمولين غير واضحين، لذا لا يُحسب مجموع الإقامة.", "Цена от 10 000 TL. Даты и число гостей не уточнены, поэтому общая сумма не рассчитывается."],
 "mirror-rize": ["3 June–15 September 2026: 16,250 TL/night for 2; each additional guest costs 750 TL/night. Breakfast is included for 2 only.", "3 يونيو–15 سبتمبر 2026: 16,250 TL لليلة لشخصين؛ كل ضيف إضافي 750 TL لليلة. الإفطار لشخصين فقط.", "3 июня — 15 сентября 2026: 16 250 TL за ночь для 2; каждый дополнительный гость — 750 TL за ночь. Завтрак только для 2."],
 "shine-sapanca": ["26 June–15 September 2026: 16,500 TL/night for 6. Each guest after the sixth has a listed 1,000 TL supplement.", "26 يونيو–15 سبتمبر 2026: 16,500 TL لليلة لستة. تُذكر زيادة 1,000 TL لكل ضيف بعد السادس.", "26 июня — 15 сентября 2026: 16 500 TL за ночь для 6. За каждого гостя свыше шести указана доплата 1 000 TL."],
 "elis-rize": ["August 2026: 6,750 TL on weekdays, 7,250 TL Friday–Sunday per night for 4; extra guest 1,000 TL. The tariff table requires at least 2 nights at weekends.", "أغسطس 2026: 6,750 TL لليلة في أيام الأسبوع و7,250 TL من الجمعة للأحد لأربعة؛ الإضافي 1,000 TL. جدول التعرفة يشترط ليلتين في نهاية الأسبوع.", "Август 2026: 6 750 TL в будни, 7 250 TL с пятницы по воскресенье за ночь для 4; доп. гость 1 000 TL. В таблице минимум 2 ночи по выходным."],
 "forest-dream": ["1 June–29 December 2026: 17,500 TL/night for 2; each additional guest 1,000 TL. Special dates may have different prices.", "1 يونيو–29 ديسمبر 2026: 17,500 TL لليلة لشخصين؛ كل إضافي 1,000 TL. قد تختلف أسعار المناسبات.", "1 июня — 29 декабря 2026: 17 500 TL за ночь для 2; каждый доп. гость 1 000 TL. В особые даты цены могут отличаться."],
 "stenhus-sapanca": ["Starting price: 10,000 TL. A four-person rate is mentioned but dates are unclear; no total is calculated.", "السعر المبدئي 10,000 TL. تُذكر تعرفة لأربعة دون نطاق تواريخ واضح؛ لا يُحسب المجموع.", "Цена от 10 000 TL. Указан тариф для четырёх, но даты не ясны; общая сумма не рассчитывается."],
 "kokina-suit": ["Starting price: 12,000 TL. Included guest counts and supplements conflict on the listing; confirm the exact price.", "السعر المبدئي 12,000 TL. عدد المشمولين ورسوم الإضافيين متعارضة في الإعلان؛ أكّد السعر النهائي.", "Цена от 12 000 TL. Число включённых гостей и доплаты в описании противоречат друг другу; уточните итог."],
 "rua-sapanca": ["Starting price: 15,000 TL, with a six-person rate mentioned. Dates are unconfirmed; no total is calculated.", "السعر المبدئي 15,000 TL، وتُذكر تعرفة لستة. التواريخ غير مؤكدة؛ لا يُحسب المجموع.", "Цена от 15 000 TL, упоминается тариф для шести. Даты не подтверждены; общая сумма не рассчитывается."],
 "wooden-palaces": ["Starting price: 17,000 TL. Confirm Standard/Deluxe unit, dates and child conditions before booking.", "السعر المبدئي 17,000 TL. أكّد وحدة Standard أو Deluxe والتواريخ وشروط الأطفال مع الإعلان.", "Цена от 17 000 TL. Уточните Standard/Deluxe, даты и условия для детей."],
 "grand-wooden": ["Starting price: 15,000 TL; a four-person rate is mentioned. Confirm the applicable dates and extras.", "السعر المبدئي 15,000 TL مع ذكر تعرفة لأربعة. أكّد نطاق التواريخ والخدمات الإضافية.", "Цена от 15 000 TL; указан тариф для четырёх. Уточните даты и дополнительные услуги."],
 "forbest-sapanca": ["The general listing starts at 11,000 TL, but this is not confirmed for the 2+1 unit, so no price is shown on this card.", "القائمة العامة تبدأ من 11,000 TL لكن لم يتأكد انطباقها على 2+1، لذا لا تعرض البطاقة سعرًا.", "Общий прайс от 11 000 TL не подтверждён для 2+1, поэтому цена в карточке не показана."],
 "rubin-white": ["The general listing starts at 15,000 TL. White’s dates and guest tariff are unclear, so no card price is shown.", "القائمة العامة تبدأ من 15,000 TL. تعرفة White من حيث التواريخ والضيوف غير واضحة، لذا لا يُعرض سعر للبطاقة.", "Общий прайс от 15 000 TL. Даты и тариф White по гостям не ясны, поэтому цена не показана."],
 "majesty-sapanca": ["Guide starting price: 16,000 TL. Date coverage is unknown, so no total stay price is calculated.", "السعر المبدئي في الدليل 16,000 TL. نطاق التواريخ غير معروف، لذا لا يُحسب إجمالي الإقامة.", "В путеводителе цена от 16 000 TL. Период не известен, поэтому сумма проживания не рассчитывается."],
};
const UNKNOWN_PRICE: Translation = ["Price and availability for your dates and guest count have not been confirmed. Request a current quote before booking.", "لم يُؤكد السعر والتوافر للتواريخ وعدد الضيوف المختارين. اطلب عرض سعر حديثًا قبل الحجز.", "Цена и наличие на выбранные даты и число гостей пока не подтверждены. Запросите актуальный расчёт до бронирования."];
const UNMATCHED_PRICE: Translation = ["The property’s general starting price could not be reliably matched to this unit and dates. Confirm the current rate and guest coverage before booking.", "تعذر ربط السعر المبدئي العام بالوحدة والتواريخ بشكل مؤكد. أكّد السعر الحالي وعدد الضيوف المشمولين مع الإعلان.", "Общую начальную цену объекта не удалось сопоставить с этим номером и датами. Уточните актуальную цену и число включённых гостей." ];
export function localizeBungalow(bungalow: Bungalow, language: Language): Bungalow {
  if (language === "tr") return bungalow;
  const index = { en: 0, ar: 1, ru: 2 }[language];
  const item = CATALOG_TRANSLATIONS[bungalow.id];
  if (!item) return bungalow;
  let priceNote: string;
  if (PRICE_NOTES[bungalow.id]) priceNote = PRICE_NOTES[bungalow.id][index];
  else if (["hilltown-sapanca", "kuka-sapanca", "stone-sapanca", "alis-paradise", "seven-sense"].includes(bungalow.id)) priceNote = UNMATCHED_PRICE[index];
  else if (bungalow.price === null) priceNote = UNKNOWN_PRICE[index];
  else {
    const value = new Intl.NumberFormat(language === "ru" ? "ru-RU" : "en-GB").format(bungalow.price);
    priceNote = [ `Listed starting price: ${value} TL. Dates and guest coverage are unclear, so no total stay price is calculated.`, `السعر المبدئي ${value} TL. التواريخ وعدد الضيوف غير محددين، لذا لا يُحسب مجموع الإقامة.`, `Цена от ${value} TL. Даты и число гостей не уточнены, поэтому общая сумма не рассчитывается.` ][index];
  }
  return { ...bungalow, name: foreignText(bungalow.name), location: foreignText(bungalow.location), tag: foreignText(item.tag[index]), description: foreignText(item.description[index]), details: item.details[index].split(" | ").map(foreignText), priceNote: foreignText(priceNote),
    capacityLabel: bungalow.capacityLabel ? translate(language, bungalow.capacityLabel) : undefined,
    imageAlt: foreignText(bungalow.name),
  };
}
