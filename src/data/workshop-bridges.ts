import type { BilingualText } from "./algorithm-source";

export interface WorkshopBridge {
  problemIds: number[];
  title: BilingualText;
  activity: BilingualText;
  expected: BilingualText;
  blocks?: { ar: string[]; tr: string[] };
}

// IDs refer to the original worksheet. Arduino tasks reuse its reasoning with classroom hardware.
export const workshopBridges: Record<number, WorkshopBridge> = {
  1: {
    problemIds: [1],
    title: { ar: "أين نرى الناتج؟", tr: "Çıktıyı nerede görürüz?" },
    activity: {
      ar: "تتبّع سهم المسألة 1 حتى يظهر الاسم على الشاشة. ارسم مسارًا مشابهًا لتجربة الليد. ابدأ بدائرة مفصولة عن التغذية، وحدد خطوة الفحص، ثم صِل التغذية بعد مراجعة المدرّس. ارسم في آخر المخطط ما تستطيع رؤيته.",
      tr: "1. sorudaki oku isim ekrana çıkana kadar izle. LED deneyi için benzer bir sıra çiz. Güç kapalıyken devreyi kur, kontrol adımını işaretle ve öğretmenin kontrolünden sonra güç ver. Son kutuya gözlemini çiz.",
    },
    expected: {
      ar: "في المسألة يظهر اسم ثابت. في التجربة يضيء الليد عندما يكتمل المسار عبر المقاومة والليد بالاتجاه الصحيح. عند فصل التغذية ينطفئ. هذان ناتجان تستطيع التحقق منهما بالملاحظة.",
      tr: "Soruda ekranda sabit bir isim görünür. Deneyde direnç ve doğru yöndeki LED üzerinden devre tamamlanınca LED yanar. Güç kesilince söner. İki çıktıyı da gözleyebilirsin.",
    },
  },
  2: {
    problemIds: [4],
    title: { ar: "متى يضيء فرع الزر؟", tr: "Butonlu kol ne zaman yanar?" },
    activity: {
      ar: "للمسألة 4 شرطان يجب أن يتحققا معًا. طبّق الفكرة على فرع واحد من دائرة الليدات. إذا كانت التغذية موجودة وسلك الرجوع إلى GND موصولًا، فماذا يحدث عند ضغط الزر ثم تركه؟ تنبأ بما سيحدث عند ضغطه إذا كان سلك الرجوع مفصولًا. غيّر أي سلك والتغذية مفصولة.",
      tr: "4. sorudaki iki koşulun birlikte sağlanmasını LED devresinin bir koluna uyarla. Güç açık ve GND dönüş kablosu bağlıyken butona basıp bırak. Dönüş kablosu açıkken butona basarsan ne olacağını önce tahmin et. Kabloları yalnızca güç kapalıyken değiştir.",
    },
    expected: {
      ar: "مع وجود مسار رجوع، يضيء الليد أثناء الضغط وينطفئ عند ترك الزر. عند انقطاع مسار الرجوع يبقى مطفأ حتى مع ضغط الزر. ضع علامة صح في خانة «زر مضغوط وسلك رجوع موصول» فقط.",
      tr: "Dönüş yolu bağlıyken butona basıldığında LED yanar ve bırakıldığında söner. Dönüş yolu kesikse basılsa da sönük kalır. Tabloda yalnızca “buton basılı ve dönüş yolu bağlı” hücresini işaretle.",
    },
  },
  3: {
    problemIds: [26],
    title: { ar: "ثلاث ومضات ثم توقّف", tr: "Üç kez yanıp sön" },
    activity: {
      ar: "اتبع العدّ من 1 إلى 3 في مخطط المسألة 26. استبدل طباعة كل عدد بومضة من الليد على D13. ما الفرق بين تكرار الومضة ثلاث مرات وتكرارها باستمرار؟",
      tr: "26. sorudaki sayacı 1’den 3’e kadar izle. Her sayıyı yazdırmak yerine D13 üzerindeki LED’i bir kez yakıp söndür. Üç tekrar ile sürekli tekrar arasındaki farkı gözle.",
    },
    expected: {
      ar: "ترى ثلاث ومضات، ثم يبقى الليد مطفأ. يستغرق الجزء المتكرر 6 ثوانٍ تقريبًا إذا كانت فترتا الإضاءة والإطفاء ثانية لكل منهما.",
      tr: "Üç ışık darbesi görürsün, ardından LED sönük kalır. Açık ve kapalı beklemeleri birer saniyeyse döngü yaklaşık 6 saniye sürer.",
    },
    blocks: {
      ar: [
        "عند بدء لوحة Uno، اجعل D13 منخفضًا.",
        "كرّر هذه الخطوة 3 مرات. اجعل D13 عاليًا، وانتظر ثانية.",
        "داخل التكرار نفسه، اجعل D13 منخفضًا وانتظر ثانية.",
      ],
      tr: [
        "Uno başladığında D13 çıkışını LOW yap.",
        "Aşağıdaki diziyi 3 kez tekrarla. D13 çıkışını HIGH yap ve 1 saniye bekle.",
        "Aynı tekrarda D13 çıkışını LOW yap ve 1 saniye bekle.",
      ],
    },
  },
  4: {
    problemIds: [3],
    title: {
      ar: "لون العدد الفردي ولون العدد الزوجي",
      tr: "Tek ve çift sayıların renkleri",
    },
    activity: {
      ar: "حوّل فرعي مخطط المسألة 3 إلى لونين على RGB ذي المهبط المشترك. الأحمر على D9، والأخضر على D10، والأزرق على D11. اعرض لونًا لكل عدد من 1 إلى 4. اختر الأحمر للفردي والأخضر للزوجي.",
      tr: "3. sorunun iki dalını ortak katotlu RGB LED üzerinde iki renge dönüştür. Kırmızı kanal D9, yeşil D10, mavi D11 üzerindedir. 1’den 4’e kadar tek sayılar için kırmızı, çift sayılar için yeşil göster.",
    },
    expected: {
      ar: "يظهر الترتيب أحمر، أخضر، أحمر، أخضر. عند العدد 4 يكون باقي القسمة على 2 صفرًا. يبقى الأزرق مطفأ طوال الاختبار.",
      tr: "Kırmızı, yeşil, kırmızı, yeşil sırasını görürsün. 4’ün 2’ye bölümünden kalan sıfırdır. Mavi kanal test boyunca kapalı kalır.",
    },
    blocks: {
      ar: [
        "اجعل «العدد» = 1، واجعل D11 منخفضًا.",
        "داخل تكرار من 4 دورات، إذا كان باقي قسمة العدد على 2 يساوي صفرًا فاجعل D9 منخفضًا وD10 عاليًا، وإلا فاعكسهما.",
        "داخل التكرار انتظر ثانية ثم زِد العدد بمقدار 1. بعده اجعل D9 وD10 منخفضين.",
      ],
      tr: [
        "Sayıyı 1 yap ve D11 çıkışını LOW yap.",
        "Dört tekrarlı döngünün içinde sayının 2’ye bölümünden kalan 0 ise D9 LOW, D10 HIGH olsun. Diğer durumda iki çıkışı tersine ayarla.",
        "Tekrarın içinde 1 saniye bekle ve sayıyı 1 artır. Döngü bitince D9 ve D10 çıkışlarını LOW yap.",
      ],
    },
  },
  5: {
    problemIds: [27],
    title: {
      ar: "عدّ تنازلي على القطاعات السبعة",
      tr: "Yedi segmentte geri sayım",
    },
    activity: {
      ar: "ابدأ بالعدد 3 في مخطط المسألة 27. بدل طباعة العدد، لوّن القطاعات اللازمة لرسمه ثم اعرضه ثانية واحدة. استخدم جدول التوصيل الخاص بشاشتك لتعرف منفذ كل قطاع.",
      tr: "27. sorunun akışında 3’ten başla. Her sayıyı yazmak yerine gereken segmentleri kâğıtta boya, sonra o rakamı bir saniye göster. Segmentlerin pinlerini kendi bağlantı tablonla eşleştir.",
    },
    expected: {
      ar: "للرقم 3 تضيء a,b,c,d,g. وللرقم 2 تضيء a,b,d,e,g. وللرقم 1 تضيء b,c فقط. بعد عرض 1 تنطفئ القطاعات. تتبدل مستويات التشغيل إذا اختلف نوع الطرف المشترك.",
      tr: "3 için a,b,c,d,g, 2 için a,b,d,e,g ve 1 için yalnız b,c yanar. 1’den sonra tüm segmentler söner. Segmenti yakan çıkış düzeyi ekranın ortak anot veya ortak katot olmasına bağlıdır.",
    },
    blocks: {
      ar: [
        "اجعل «العدد» = 3.",
        "في كل من التكرارات الثلاثة اضبط جميع القطاعات حسب نمط العدد، ثم انتظر ثانية وأنقص العدد بمقدار 1.",
        "بعد التكرار أطفئ القطاعات السبعة.",
      ],
      tr: [
        "Sayıyı 3 yap.",
        "Üç tekrarın her birinde yedi segmentin tümünü o rakamın desenine ayarla, 1 saniye bekle ve sayıyı 1 azalt.",
        "Tekrarlar bitince yedi segmenti de kapat.",
      ],
    },
  },
  6: {
    problemIds: [6],
    title: { ar: "اجعل الاسم يتسع في سطر", tr: "Adı tek satıra sığdır" },
    activity: {
      ar: "ادمج جزأي الاسم كما في المسألة 6 مع مسافة واحدة بينهما. استخدم في شاشة LCD ذات 16 عمودًا الاسمين التجريبيين «Mira» و«Can» بحروف لاتينية. تنبأ بعدد الخانات المشغولة قبل العرض.",
      tr: "6. sorudaki gibi ad ile soyadı araya bir boşluk koyarak birleştir. 16 sütunlu LCD üzerinde örnek olarak “Mira” ve “Can” kullan. Yazdırmadan önce kaç hücre dolacağını tahmin et.",
    },
    expected: {
      ar: "يعرض السطر الأول Mira Can. تشغل الكلمة الأولى 4 خانات، والمسافة خانة، والثانية 3 خانات. تبقى 8 خانات شاغرة من أصل 16.",
      tr: "İlk satırda Mira Can görünür. Birinci sözcük 4, boşluk 1, ikinci sözcük 3 hücre kaplar. 16 hücrenin 8’i boş kalır.",
    },
    blocks: {
      ar: [
        "هيّئ شاشة 16×2 وفق توصيل الجلسة وضع المؤشر عند العمود 0 والسطر 0.",
        "اكتب «Mira»، ثم مسافة واحدة، ثم «Can» على السطر نفسه.",
      ],
      tr: [
        "16×2 LCD’yi dersteki bağlantıya göre başlat. İmleci 0. sütun ve 0. satıra yerleştir.",
        "Aynı satıra sırasıyla “Mira”, bir boşluk ve “Can” yaz.",
      ],
    },
  },
  7: {
    problemIds: [8],
    title: { ar: "أيّ فرع يسلكه حساس IR؟", tr: "IR sensörü hangi dalı seçer?" },
    activity: {
      ar: "تتبّع نتيجتي القرار في المسألة 8. استبدل مقارنة الدرجة باختبار «هل دخل D2 منخفض؟» لحساس الجلسة الذي يُخرِج LOW عند وجود جسم. توقّع حالة الليد على D13 مع جسم قريب وبعد إبعاده.",
      tr: "8. sorudaki kararın iki sonucunu izle. Not karşılaştırmasının yerine “D2 girişi LOW mu?” sorusunu koy. Bu modül cisim algılayınca LOW verir. Cisim yakınken ve uzaklaştırılınca D13 LED’inin durumunu tahmin et.",
    },
    expected: {
      ar: "عند قراءة LOW يضيء الليد، وعند HIGH ينطفئ. بعد إبعاد الجسم يغير الليد حالته لأننا نقرأ قيمة الدخل مجددًا في كل دورة.",
      tr: "LOW okunduğunda LED yanar, HIGH okunduğunda söner. Cisim kaldırılınca LED’in durumu değişir çünkü her turda giriş yeniden okunur.",
    },
    blocks: {
      ar: [
        "اضبط D2 كدخل وD13 كخرج.",
        "داخل حلقة مستمرة، إذا كانت قراءة D2 منخفضة فاجعل D13 عاليًا، وإلا فاجعل D13 منخفضًا.",
      ],
      tr: [
        "D2’yi giriş, D13’ü çıkış olarak ayarla.",
        "Sürekli tekrarlanan döngüde D2 LOW ise D13 çıkışını HIGH, diğer durumda LOW yap.",
      ],
    },
  },
  8: {
    problemIds: [7, 33],
    title: {
      ar: "لماذا نقسم زمن الصدى على اثنين؟",
      tr: "Yankı süresini neden ikiye böleriz?",
    },
    activity: {
      ar: "في المسألة 7 تحسب النصف، وفي 33 تختار فئة حسب حدود مرتّبة. طبّق الفكرتين على حساس المسافة. إذا عاد الصدى بعد 1000 ميكروثانية وكانت سرعة الصوت التقريبية 0.034 سم لكل ميكروثانية، فكم يبعد الجسم؟ أي ضوء تختار إذا كان الأحمر للمسافات حتى 10 سم والأصفر حتى 30 سم؟",
      tr: "7. sorudaki yarıya bölmeyi ve 33. sorudaki sıralı eşikleri birleştir. Yankı 1000 mikrosaniyede dönüyor ve sesin yaklaşık hızı mikrosaniyede 0,034 cm. Cisim ne kadar uzakta? 10 cm dâhil kırmızı, 30 cm dâhil sarı ise hangi ışık yanar?",
    },
    expected: {
      ar: "الذهاب والعودة معًا 34 سم، والمسافة إلى الجسم 17 سم، فيضيء الأصفر وحده. اختبر أيضًا 10 سم للأحمر، و30 سم للأصفر، و31 سم للأخضر. إذا لم يصل صدى، اعرض رسالة انتظار في الشاشة التسلسلية.",
      tr: "Gidiş ve dönüş toplam 34 cm, tek yön 17 cm olduğundan yalnız sarı yanar. Sınırları da dene. 10 cm kırmızı, 30 cm sarı, 31 cm yeşil olmalı. Yankı alınmazsa seri monitörde bir bekleme iletisi göster.",
    },
    blocks: {
      ar: [
        "داخل التكرار، اطلب قياسًا باستخدام Trig على D9 وEcho على D10. إذا انتهت مهلة الانتظار دون صدى، أطفئ الليدات واعرض «No echo».",
        "عند وصول صدى، احسب المسافة = الزمن بالميكروثانية × 0.034 ÷ 2.",
        "شغّل D7 وحده إذا كانت المسافة ≤ 10، وإلا D6 إذا كانت ≤ 30، وإلا D5. أطفئ الليدين الآخرين. انتظر 0.1 ثانية قبل القياس التالي.",
      ],
      tr: [
        "Döngüde Trig D9 ve Echo D10 ile ölçüm başlat. Süre dolduğunda yankı yoksa LED’leri kapat ve “No echo” yaz.",
        "Yankı gelirse mesafe = mikrosaniye cinsinden süre × 0,034 ÷ 2 hesapla.",
        "Mesafe ≤ 10 ise yalnız D7’yi, diğer durumda ≤ 30 ise D6’yı, daha uzaktaysa D5’i yak. Diğer ikisini söndür. Yeni ölçümden önce 0,1 saniye bekle.",
      ],
    },
  },
  9: {
    problemIds: [10],
    title: {
      ar: "متوسط ثلاث قراءات حرارة",
      tr: "Üç sıcaklık okumasının ortalaması",
    },
    activity: {
      ar: "استبدل الدرجات الثلاث في المسألة 10 بثلاث قراءات صحيحة من حساس الحرارة. جرّب أولًا على الورق القيم 21 و24 و27 درجة مئوية. أين تضع القسمة في المخطط؟",
      tr: "10. sorudaki üç not yerine sensörden gelen üç geçerli sıcaklığı kullan. Önce 21, 24 ve 27 °C örneğini kâğıtta çöz. Bölme işlemini akışın neresine koyarsın?",
    },
    expected: {
      ar: "المجموع 72 والمتوسط 24 درجة مئوية. نقسم مرة واحدة بعد جمع القراءات الثلاث. إذا فشلت قراءة، ننتظر موعد القراءة التالية ونحاول مجددًا حتى نجمع ثلاث قيم صحيحة.",
      tr: "Toplam 72, ortalama 24 °C olur. Üç değerin toplamını en sonunda bir kez böleriz. Okuma başarısızsa bir sonraki ölçüm zamanında yeniden dener, üç geçerli değeri tamamlarız.",
    },
    blocks: {
      ar: [
        "اجعل «المجموع» و«عدد القراءات» صفرًا.",
        "داخل حلقة تنتهي حين يصبح العدد 3، انتظر ثانيتين، ثم اقرأ حرارة DHT على D2. إذا نجحت القراءة فأضفها إلى المجموع وزِد العدد بمقدار 1.",
        "اعرض المجموع ÷ 3 في الشاشة التسلسلية.",
      ],
      tr: [
        "Toplamı ve okuma sayısını sıfırla.",
        "Sayı 3 olana kadar her turda 2 saniye bekle, D2 üzerindeki DHT sıcaklığını oku. Okuma geçerliyse toplama ekle ve sayıyı 1 artır.",
        "Seri monitöre toplam ÷ 3 yaz.",
      ],
    },
  },
  10: {
    problemIds: [24],
    title: { ar: "مصباح يحتفظ بحالته", tr: "Durumunu koruyan lamba" },
    activity: {
      ar: "في المسألة 24 تختبر إن كانت القيمة ضمن مجال. في نموذج إضاءة منخفض الجهد، استخدم المجال 280–320 كمنطقة يحتفظ فيها المصباح بحالته. افترض أن تغطية الحساس تقلل قراءة A0. ابدأ بمصباح مطفأ وتتبع القراءات 350 ثم 270 ثم 300 ثم 330.",
      tr: "24. sorudaki aralık denetimini düşük gerilimli bir lamba modeline uyarla. 280–320 arasında lamba durumunu korusun. Bu bağlantıda sensör karardıkça A0 okumasının azaldığını kabul et. Lamba kapalıyken başla ve 350, 270, 300, 330 değerlerini izle.",
    },
    expected: {
      ar: "الحالات بالترتيب مطفأ، مضاء، مضاء، مطفأ. عند 280 أو 320 بالضبط، يبقى الأمر السابق. قِس قيم حساسك في الضوء والظلام لتختار حدين مناسبين لصفك.",
      tr: "Durumlar sırasıyla kapalı, açık, açık, kapalı olur. Tam 280 ve tam 320 değerlerinde önceki durum korunur. Kendi iki eşiğini seçerken sınıfındaki aydınlık ve karanlık okumalarını ölç.",
    },
    blocks: {
      ar: [
        "اجعل حالة المصباح «مطفأ» واضبط إشارة الريليه D7 وفق مستوى الإطفاء لوحدتك.",
        "في كل تكرار اقرأ A0. إذا كانت القراءة < 280 فاختر «مضاء»، وإلا إذا كانت > 320 فاختر «مطفأ».",
        "أرسل الحالة المحفوظة إلى D7 حسب منطق وحدة الريليه، ثم انتظر 0.2 ثانية.",
      ],
      tr: [
        "Lamba durumunu “kapalı” yap. D7’yi röle modülünün kapalı düzeyine ayarla.",
        "Her turda A0’ı oku. Okuma < 280 ise durumu “açık”, > 320 ise “kapalı” yap.",
        "Saklanan durumu rölenin etkin düzeyine göre D7’ye gönder. 0,2 saniye bekle.",
      ],
    },
  },
  11: {
    problemIds: [12],
    title: {
      ar: "أي محور ابتعد أكثر عن الوسط؟",
      tr: "Hangi eksen merkezden daha uzakta?",
    },
    activity: {
      ar: "تقارن المسألة 12 عددين. اقرأ محوري الجويستيك من A1 وA2. افترض أن قراءة الوسط لكل منهما 512، وقارن مقدار البعد عن 512. إذا كانت القراءتان X=312 وY=612، فأي محور تحرّك أكثر؟",
      tr: "12. soruda iki sayı karşılaştırılır. Joystick eksenlerini A1 ve A2’den oku. İki eksenin merkez değeri 512 olsun. X=312 ve Y=612 için her birinin merkeze uzaklığını bul. Hangisi daha çok hareket etti?",
    },
    expected: {
      ar: "بُعد X يساوي 200 وبُعد Y يساوي 100، فيفوز X. مع X=412 وY=612 يتساويان عند 100. عند استخدام الجويستيك الحقيقي، ابدأ بقياس وسط كل محور بعد تركه.",
      tr: "X uzaklığı 200, Y uzaklığı 100 olduğu için X daha çok hareket etti. X=412 ve Y=612 ise iki uzaklık da 100 olur. Gerçek joystick ile her eksenin merkez değerini kolu bırakarak ölç.",
    },
    blocks: {
      ar: [
        "اقرأ A1 وA2. احسب بُعد كل قراءة عن وسط محورها باستخدام القيمة المطلقة.",
        "إذا كان بُعد X أكبر فاعرض «X». وإذا كان بُعد Y أكبر فاعرض «Y». وفي حالة التساوي اعرض «=». كرّر القياس.",
      ],
      tr: [
        "A1 ve A2’yi oku. Her okumanın kendi merkezinden farkının mutlak değerini al.",
        "X uzaklığı daha büyükse “X”, Y uzaklığı daha büyükse “Y”, eşitse “=” yaz. Ölçümü tekrarla.",
      ],
    },
  },
  12: {
    problemIds: [7],
    title: { ar: "نصف أمر التشغيل", tr: "Sürme komutunu yarıya indir" },
    activity: {
      ar: "في المسألة 7 تنصّف رقمًا. طبّق القسمة على أمر PWM قيمته 254 قبل إرساله إلى ENA في درايفر المحرك. اختبر الأمر على الورق ثم جرّبه مع مدرّسك. ما قيمة الخرج؟ وهل يمكنك استنتاج عدد دورات المحرك من هذا الرقم وحده؟",
      tr: "7. sorudaki yarıya bölmeyi sürücünün ENA ucuna gönderilecek PWM komutuna uygula. Başlangıç değeri 254 olsun. Önce kâğıtta hesapla, sonra öğretmeninle dene. Çıkış değeri kaçtır? Bu sayı tek başına motorun dakikadaki devir sayısını verir mi?",
    },
    expected: {
      ar: "قيمة الأمر الجديدة 127 من 255، أي إشارة تشغيل تقارب 50%. سرعة العمود تتأثر بالمحرك والتغذية والحمل. يمكنك إثبات قيمة الأمر بطباعتها، وقياس السرعة تجربة منفصلة.",
      tr: "Yeni komut 255 üzerinden 127’dir. Görev oranı yaklaşık %50’dir. Milin hızı motor, besleme ve yüke bağlıdır. Komutu yazdırarak değerini kontrol edebilirsin. Hızı bulmak için ayrıca ölçüm gerekir.",
    },
    blocks: {
      ar: [
        "ابدأ وخرج التمكين D5 مطفأ، واضبط اتجاه الدرايفر D6 عاليًا وD7 منخفضًا.",
        "اجعل «الأمر» = 254 ÷ 2. أرسل PWM بقيمته إلى D5 المتصل بـ ENA والمهيأ للتحكم الخارجي.",
        "انتظر ثانيتين ثم اجعل PWM على D5 صفرًا.",
      ],
      tr: [
        "Etkinleştirme çıkışı D5 kapalıyken yönü seçmek için D6 çıkışını HIGH, D7 çıkışını LOW yap.",
        "Komutu 254 ÷ 2 yap. Haricî PWM için ayarlanmış ENA’ya bağlı D5’e bu PWM değerini gönder.",
        "2 saniye bekle ve ardından D5’in PWM değerini sıfırla.",
      ],
    },
  },
  13: {
    problemIds: [26, 27],
    title: {
      ar: "حرّك الذراع ثم عُد إلى البداية",
      tr: "Kolu hareket ettir, başlangıca dön",
    },
    activity: {
      ar: "حوّل العدّ التصاعدي والتنازلي في المسألتين 26 و27 إلى حركة سيرفو. ابدأ عند 60°، وزِد 15° مرتين، ثم أنقص 15° مرتين. اكتب تسلسل الزوايا قبل التجربة.",
      tr: "26 ve 27. sorulardaki ileri ve geri saymayı servo hareketine dönüştür. 60°’den başla, iki kez 15° artır, sonra iki kez 15° azalt. Denemeden önce açı sırasını tahmin et.",
    },
    expected: {
      ar: "ترتيب الأوامر 60° ثم 75° ثم 90° ثم 75° ثم 60°. يعود المؤشر إلى علامته الأولى. إذا وصل إلى 105° فقد حدثت زيادة إضافية.",
      tr: "Komut sırası 60°, 75°, 90°, 75°, 60° olur. İşaretçi ilk işaretine döner. 105° komutu gördüysen bir kez fazla artırılmıştır.",
    },
    blocks: {
      ar: [
        "اضبط متغير «زاوية» على 60 وأرسل الزاوية إلى السيرفو على D9، ثم انتظر ثانية.",
        "في كل من تكرارين زِد الزاوية 15، أرسلها إلى D9، ثم انتظر ثانية.",
        "في كل من تكرارين أنقص الزاوية 15، أرسلها إلى D9، ثم انتظر ثانية.",
      ],
      tr: [
        "Açıyı 60 yap, D9’daki servoya gönder ve 1 saniye bekle.",
        "İki tekrarın her birinde açıyı 15 artır, D9’daki servoya gönder ve 1 saniye bekle.",
        "İki tekrarın her birinde açıyı 15 azalt, D9’daki servoya gönder ve 1 saniye bekle.",
      ],
    },
  },
  14: {
    problemIds: [9, 26],
    title: {
      ar: "احسب النبضات قبل حركة المحرك",
      tr: "Motor hareketinden önce darbeleri say",
    },
    activity: {
      ar: "استعن بالمجموع في المسألة 9 والعدّ في المسألة 26. لديك ثلاث دفعات من نبضات STEP في الاتجاه نفسه، أعدادها 20 و30 و10. في المحاكاة افترض محركًا يحتاج 200 خطوة كاملة للدورة ودرايفر A4988 على وضع الخطوة الكاملة. ما الزاوية المتوقعة إذا نفذ كل نبضة؟",
      tr: "9. sorunun toplama ve 26. sorunun sayma fikrini kullan. Aynı yönde 20, 30 ve 10 STEP darbelik üç grup var. Simülasyonda bir devir için 200 tam adım gereken motor ve tam adımda bir A4988 olduğunu varsay. Her darbe uygulanırsa beklenen açı kaç derecedir?",
    },
    expected: {
      ar: "المجموع 60 نبضة. قيمة الخطوة 360 ÷ 200 = 1.8°، والحركة المتوقعة 60 × 1.8 = 108°. تتغير النتيجة إذا تغيرت مواصفات المحرك أو إعداد تقسيم الخطوة.",
      tr: "Toplam 60 darbe vardır. Bir tam adım 360 ÷ 200 = 1,8°, beklenen hareket 60 × 1,8 = 108° olur. Motorun adım açısı veya mikro adım ayarı değişirse sonuç da değişir.",
    },
    blocks: {
      ar: [
        "في محاكاة درايفر STEP/DIR اختر اتجاهًا ثابتًا وابدأ وSTEP منخفض.",
        "احسب العدد = 20 + 30 + 10. في كل تكرار من التكرارات الستين اجعل STEP عاليًا وانتظر 2 مللي ثانية، ثم اجعله منخفضًا وانتظر 2 مللي ثانية.",
        "بعد انتهاء التكرار اترك STEP منخفضًا. تحقّق من عدد النبضات بالعدّاد قبل تجربة المحرك.",
      ],
      tr: [
        "STEP/DIR sürücü simülasyonunda yönü sabitle ve STEP LOW düzeyindeyken başla.",
        "Sayı = 20 + 30 + 10 hesapla. Bulduğun sayı kadar tekrar yap. Her tekrarda STEP HIGH yap, 2 ms bekle, STEP LOW yap ve 2 ms bekle.",
        "Tekrar bitince STEP ucunu LOW bırak. Motoru denemeden önce darbe sayısını sayaçtan kontrol et.",
      ],
    },
  },
  15: {
    problemIds: [25, 50],
    title: {
      ar: "اختبر مشروع المرأب حين يختفي الصدى",
      tr: "Yankı kaybolduğunda park projesini test et",
    },
    activity: {
      ar: "اجمع إعادة المحاولة في المسألة 25 وحدّ المحاولات في المسألة 50. صمّم اختبار قبول لمشروع ركن السيارة. اسمح بثلاث قراءات كحد أقصى للحصول على مسافة بين 2 و400 سم. مثّل انتهاء مهلة الصدى بالقيمة 0. ماذا تعرض للقراءات 0، 0، 18؟ وماذا تفعل عند 0، 0، 0؟",
      tr: "25. sorunun yeniden deneme ve 50. sorunun deneme sınırı fikirlerini birleştir. Park sensörü projesinde 2–400 cm arasında geçerli bir ölçüm almak için en çok üç kez dene. Yankı zaman aşımını 0 ile göster. 0, 0, 18 ve 0, 0, 0 dizileri için sonuçları karşılaştır.",
    },
    expected: {
      ar: "في الاختبار الأول تُقبل 18 سم في المحاولة الثالثة ويضيء الأصفر وفق فئات الجلسة 8. في الثاني تظهر «No echo»، وتنطفئ إشارات المسافة ويتوقف الاختبار بعد ثلاث محاولات. جرّب 8 سم في أول محاولة لتتحقق أيضًا من التوقف المبكر وإضاءة الأحمر.",
      tr: "İlk testte 18 cm üçüncü denemede kabul edilir ve 8. dersteki eşiklere göre sarı yanar. İkinci testte “No echo” görünür, mesafe ışıkları söner ve test üç denemeden sonra biter. Erken durmayı ve kırmızı ışığı kontrol etmek için ilk ölçüm olarak 8 cm’yi de dene.",
    },
    blocks: {
      ar: [
        "ابدأ بعدد محاولات صفر وعلامة «قراءة صالحة» غير مفعّلة.",
        "كرّر حتى تنجح القراءة أو تصل المحاولات إلى 3. زِد العداد وخذ قراءة. إذا كانت ضمن 2–400 سم فاحفظها وفعّل العلامة. انتظر 0.1 ثانية قبل محاولة جديدة.",
        "إذا نجحت فاعرض المسافة وأضئ الليد المناسب، وإلا فأطفئ أضواء المسافة واعرض «No echo».",
      ],
      tr: [
        "Deneme sayısını sıfırla ve “geçerli okuma” işaretini kapat.",
        "Geçerli okuma elde edilene veya deneme sayısı 3 olana kadar tekrarla. Sayacı artır, bir ölçüm al. 2–400 cm içindeyse kaydet ve işareti aç. Yeni denemeden önce 0,1 saniye bekle.",
        "Başarı varsa mesafeyi göster ve ilgili ışığı yak. Diğer durumda mesafe ışıklarını söndür ve “No echo” yaz.",
      ],
    },
  },
};
