// Page numbers use 1-based PDF numbering. Original pages are preserved; corrections are editorial.
export type BilingualText = { ar: string; tr: string };
export interface AlgorithmSourceProblem { id: number; pages: number[]; lessonId: number; title: BilingualText; description: BilingualText; correction?: BilingualText; }
export const algorithmSourceInfo = { pdfUrl: "/algorithms/source.pdf", pageCount: 59, problemCount: 50, introductionPages: [1], title: { ar: "الخوارزميات — المستوى الأول", tr: "Algoritmalar — Birinci Seviye" } };
export const algorithmSourceProblems: AlgorithmSourceProblem[] = [
  {
    "id": 1,
    "pages": [
      2
    ],
    "lessonId": 1,
    "title": {
      "ar": "طباعة الاسم",
      "tr": "Adı yazdırma"
    },
    "description": {
      "ar": "اطبع اسمًا ثابتًا على الشاشة.",
      "tr": "Ekrana sabit bir ad yazdır."
    }
  },
  {
    "id": 2,
    "pages": [
      2
    ],
    "lessonId": 1,
    "title": {
      "ar": "إدخال الاسم وطباعته",
      "tr": "Adı okuma ve yazdırma"
    },
    "description": {
      "ar": "اقرأ اسم المستخدم ثم اطبعه.",
      "tr": "Kullanıcının adını oku ve yazdır."
    }
  },
  {
    "id": 3,
    "pages": [
      3
    ],
    "lessonId": 2,
    "title": {
      "ar": "زوجي أم فردي؟",
      "tr": "Tek mi çift mi?"
    },
    "description": {
      "ar": "اقرأ عددًا صحيحًا وافحص باقي قسمته على 2.",
      "tr": "Bir tam sayının 2 ile bölümünden kalanı kontrol et."
    },
    "correction": {
      "ar": "نستخدم باقي القسمة % وليس /؛ 7 % 2 = 1.",
      "tr": "Kalan % kullanılır, / değil; 7 % 2 = 1."
    }
  },
  {
    "id": 4,
    "pages": [
      4
    ],
    "lessonId": 3,
    "title": {
      "ar": "شرطان معًا",
      "tr": "İki koşul birlikte"
    },
    "description": {
      "ar": "طبّق شرط العمر أكبر من 21 مع وجود رخصة قيادة.",
      "tr": "Yaşın 21’den büyük olması ve sürücü belgesinin bulunması koşullarını uygula."
    },
    "correction": {
      "ar": "الشروط افتراضية وليست قاعدة قانونية. كلمة Float في المصدر يقصد بها False.",
      "tr": "Koşullar varsayımsaldır, yasal kural değildir. Kaynaktaki Float yerine False olmalıdır."
    }
  },
  {
    "id": 5,
    "pages": [
      5,
      6
    ],
    "lessonId": 3,
    "title": {
      "ar": "الشروط وبديل القبول",
      "tr": "Alternatif kabul koşulu"
    },
    "description": {
      "ar": "قارن شرطين مرتبطين بـ AND مع خيار بديل مرتبط بـ OR.",
      "tr": "AND ile bağlanan iki koşulu OR ile bağlanan alternatifle karşılaştır."
    },
    "correction": {
      "ar": "نستخدم «تصريح خاص» بدل الواسطة في الشرح التعليمي لـ OR.",
      "tr": "OR açıklamasında kayırmacılık yerine “özel izin” kullanılır."
    }
  },
  {
    "id": 6,
    "pages": [
      7
    ],
    "lessonId": 4,
    "title": {
      "ar": "دمج الاسم والكنية",
      "tr": "Ad ve soyadı birleştirme"
    },
    "description": {
      "ar": "اقرأ الاسم والكنية وادمجهما مع مسافة.",
      "tr": "Adı ve soyadı aralarına boşluk koyarak birleştir."
    }
  },
  {
    "id": 7,
    "pages": [
      8
    ],
    "lessonId": 4,
    "title": {
      "ar": "نصف العدد",
      "tr": "Sayının yarısı"
    },
    "description": {
      "ar": "اقرأ عددًا واحسب نصفه واطبعه.",
      "tr": "Bir sayı oku, yarısını hesapla ve yazdır."
    }
  },
  {
    "id": 8,
    "pages": [
      9
    ],
    "lessonId": 2,
    "title": {
      "ar": "النجاح والرسوب",
      "tr": "Geçti veya kaldı"
    },
    "description": {
      "ar": "قارن الدرجة بحد النجاح 50.",
      "tr": "Notu geçme sınırı olan 50 ile karşılaştır."
    }
  },
  {
    "id": 9,
    "pages": [
      10
    ],
    "lessonId": 4,
    "title": {
      "ar": "مجموع ثلاثة أعداد",
      "tr": "Üç sayının toplamı"
    },
    "description": {
      "ar": "اقرأ ثلاثة أعداد ثم اطبع مجموعها.",
      "tr": "Üç sayı oku ve toplamlarını yazdır."
    }
  },
  {
    "id": 10,
    "pages": [
      11
    ],
    "lessonId": 4,
    "title": {
      "ar": "متوسط ثلاث درجات",
      "tr": "Üç notun ortalaması"
    },
    "description": {
      "ar": "اجمع الدرجات الثلاث واقسم على 3.",
      "tr": "Üç notu topla ve 3’e böl."
    }
  },
  {
    "id": 11,
    "pages": [
      12
    ],
    "lessonId": 4,
    "title": {
      "ar": "المتوسط والنجاح",
      "tr": "Ortalama ve başarı"
    },
    "description": {
      "ar": "احسب المتوسط وحدد النجاح عند 50 أو أكثر.",
      "tr": "Ortalamayı hesapla; 50 veya üzerindeyse başarılı olarak işaretle."
    }
  },
  {
    "id": 12,
    "pages": [
      13
    ],
    "lessonId": 2,
    "title": {
      "ar": "الأكبر بين عددين",
      "tr": "İki sayıdan büyük olanı"
    },
    "description": {
      "ar": "قارن عددين واطبع الأكبر واختبر التساوي.",
      "tr": "İki sayının büyüğünü yazdır; eşitliği de dene."
    }
  },
  {
    "id": 13,
    "pages": [
      14
    ],
    "lessonId": 5,
    "title": {
      "ar": "الأكبر بين ثلاثة أعداد",
      "tr": "Üç sayının en büyüğü"
    },
    "description": {
      "ar": "استخدم المقارنات لإيجاد أكبر ثلاثة أعداد.",
      "tr": "Üç sayının en büyüğünü karşılaştırmalarla bul."
    }
  },
  {
    "id": 14,
    "pages": [
      15
    ],
    "lessonId": 4,
    "title": {
      "ar": "تبديل قيمتين",
      "tr": "İki değeri değiştirme"
    },
    "description": {
      "ar": "بدّل قيمتي متغيرين باستخدام متغير مساعد.",
      "tr": "İki değişkenin değerlerini yardımcı değişkenle değiştir."
    }
  },
  {
    "id": 15,
    "pages": [
      16
    ],
    "lessonId": 5,
    "title": {
      "ar": "مساحة المستطيل",
      "tr": "Dikdörtgen alanı"
    },
    "description": {
      "ar": "احسب الطول × العرض.",
      "tr": "Uzunluk × genişlik hesabını yap."
    }
  },
  {
    "id": 16,
    "pages": [
      17
    ],
    "lessonId": 5,
    "title": {
      "ar": "المستطيل من ضلع وقطر",
      "tr": "Kenar ve köşegenden alan"
    },
    "description": {
      "ar": "احسب الضلع الآخر بفيثاغورس ثم المساحة.",
      "tr": "Diğer kenarı Pisagor ile bul ve alanı hesapla."
    },
    "correction": {
      "ar": "d هو القطر لا الميل؛ اشترط d > a > 0.",
      "tr": "d köşegendir; d > a > 0 koşulunu denetle."
    }
  },
  {
    "id": 17,
    "pages": [
      18
    ],
    "lessonId": 5,
    "title": {
      "ar": "مساحة المثلث",
      "tr": "Üçgen alanı"
    },
    "description": {
      "ar": "احسب نصف حاصل ضرب القاعدة بالارتفاع.",
      "tr": "Taban ile yüksekliğin çarpımının yarısını hesapla."
    }
  },
  {
    "id": 18,
    "pages": [
      19
    ],
    "lessonId": 5,
    "title": {
      "ar": "الدائرة من نصف القطر",
      "tr": "Yarıçaptan daire alanı"
    },
    "description": {
      "ar": "احسب المساحة A = π × r².",
      "tr": "Alanı A = π × r² ile hesapla."
    },
    "correction": {
      "ar": "المطلوب مساحة الدائرة. عند r=5، استخدام 3.14 يعطي 78.5 بينما math.pi يعطي نحو 78.54.",
      "tr": "İstenen dairenin alanıdır. r=5 için 3.14 ile 78.5, math.pi ile yaklaşık 78.54 bulunur."
    }
  },
  {
    "id": 19,
    "pages": [
      20
    ],
    "lessonId": 5,
    "title": {
      "ar": "الدائرة من القطر",
      "tr": "Çaptan daire alanı"
    },
    "description": {
      "ar": "احسب المساحة A = π × D² / 4.",
      "tr": "Alanı A = π × D² / 4 ile hesapla."
    },
    "correction": {
      "ar": "المطلوب مساحة الدائرة من قطرها؛ القطر ليس له مساحة.",
      "tr": "İstenen çaptan daire alanıdır; çapın alanı yoktur."
    }
  },
  {
    "id": 20,
    "pages": [
      21
    ],
    "lessonId": 10,
    "title": {
      "ar": "دائرة داخل مربع",
      "tr": "Karenin içindeki daire"
    },
    "description": {
      "ar": "احسب مساحة دائرة تمس أضلاع المربع.",
      "tr": "Karenin kenarlarına teğet dairenin alanını hesapla."
    },
    "correction": {
      "ar": "نصف قطر الدائرة يساوي نصف ضلع المربع.",
      "tr": "Yarıçap karenin kenarının yarısıdır."
    }
  },
  {
    "id": 21,
    "pages": [
      22
    ],
    "lessonId": 10,
    "title": {
      "ar": "الدائرة من محيطها",
      "tr": "Çevreden daire alanı"
    },
    "description": {
      "ar": "اقرأ المحيط L واحسب A = L² / (4π).",
      "tr": "Çevre L’yi oku; A = L² / (4π) hesapla."
    },
    "correction": {
      "ar": "المطلوب المساحة من المحيط: L² / (4π)، وليس حساب المحيط.",
      "tr": "İstenen çevreden alan: L² / (4π); çevre hesabı değildir."
    }
  },
  {
    "id": 22,
    "pages": [
      23
    ],
    "lessonId": 10,
    "title": {
      "ar": "دائرة داخل مثلث متساوي الساقين",
      "tr": "İkizkenar üçgenin içteğet çemberi"
    },
    "description": {
      "ar": "احسب مساحة الدائرة داخل مثلث ساقاه a وقاعدته b.",
      "tr": "Eşit kenarları a, tabanı b olan üçgenin içteğet dairesinin alanını hesapla."
    },
    "correction": {
      "ar": "القانون خاص بمتساوي الساقين، مع a > 0 و0 < b < 2a.",
      "tr": "Formül ikizkenar üçgen içindir: a > 0 ve 0 < b < 2a."
    }
  },
  {
    "id": 23,
    "pages": [
      24
    ],
    "lessonId": 10,
    "title": {
      "ar": "الدائرة المحيطة بمثلث",
      "tr": "Üçgenin çevrel çemberi"
    },
    "description": {
      "ar": "استخدم هيرون لمساحة المثلث ثم احسب مساحة الدائرة المحيطة.",
      "tr": "Heron ile üçgen alanını, sonra çevrel dairenin alanını hesapla."
    },
    "correction": {
      "ar": "القانون لأي مثلث صالح وليس للقائم فقط. s=(a+b+c)/2 ثم Δ=√(s(s-a)(s-b)(s-c)) وR=abc/(4Δ) وA=πR². مثال 5,6,7 ليس قائمًا.",
      "tr": "Formül her geçerli üçgen içindir: s=(a+b+c)/2, Δ=√(s(s-a)(s-b)(s-c)), R=abc/(4Δ), A=πR². 5,6,7 dik üçgen değildir."
    }
  },
  {
    "id": 24,
    "pages": [
      25
    ],
    "lessonId": 3,
    "title": {
      "ar": "العمر ضمن مجال",
      "tr": "Yaş aralığı"
    },
    "description": {
      "ar": "تحقق أن العمر بين 18 و45 شاملًا الطرفين.",
      "tr": "Yaşın 18 ile 45 arasında, sınırlar dahil olduğunu kontrol et."
    }
  },
  {
    "id": 25,
    "pages": [
      26
    ],
    "lessonId": 9,
    "title": {
      "ar": "تكرار إدخال العمر",
      "tr": "Yaş girişini tekrarlama"
    },
    "description": {
      "ar": "كرر الإدخال حتى يصبح العمر ضمن المجال.",
      "tr": "Yaş aralıkta olana kadar girişi tekrarla."
    }
  },
  {
    "id": 26,
    "pages": [
      27
    ],
    "lessonId": 6,
    "title": {
      "ar": "العد التصاعدي",
      "tr": "İleri sayma"
    },
    "description": {
      "ar": "اطبع من 1 إلى N.",
      "tr": "1’den N’ye kadar yazdır."
    }
  },
  {
    "id": 27,
    "pages": [
      28
    ],
    "lessonId": 6,
    "title": {
      "ar": "العد التنازلي",
      "tr": "Geri sayma"
    },
    "description": {
      "ar": "اطبع من N إلى 1.",
      "tr": "N’den 1’e kadar yazdır."
    }
  },
  {
    "id": 28,
    "pages": [
      29
    ],
    "lessonId": 6,
    "title": {
      "ar": "مجموع الأعداد الفردية",
      "tr": "Tek sayıların toplamı"
    },
    "description": {
      "ar": "اجمع الأعداد الفردية من 1 إلى N.",
      "tr": "1’den N’ye kadar tek sayıları topla."
    }
  },
  {
    "id": 29,
    "pages": [
      30
    ],
    "lessonId": 6,
    "title": {
      "ar": "مجموع الأعداد الزوجية",
      "tr": "Çift sayıların toplamı"
    },
    "description": {
      "ar": "اجمع الأعداد الزوجية من 1 إلى N.",
      "tr": "1’den N’ye kadar çift sayıları topla."
    }
  },
  {
    "id": 30,
    "pages": [
      31
    ],
    "lessonId": 6,
    "title": {
      "ar": "مضروب العدد",
      "tr": "Faktöriyel"
    },
    "description": {
      "ar": "احسب حاصل ضرب الأعداد من 1 إلى N.",
      "tr": "1’den N’ye kadar sayıların çarpımını hesapla."
    },
    "correction": {
      "ar": "المضروب يشمل N نفسه؛ 0! = 1، والأعداد السالبة غير مقبولة هنا.",
      "tr": "Faktöriyel N’yi içerir; 0! = 1. Negatif sayılar kabul edilmez."
    }
  },
  {
    "id": 31,
    "pages": [
      32
    ],
    "lessonId": 10,
    "title": {
      "ar": "القوى 2 و3 و4",
      "tr": "2, 3 ve 4. kuvvetler"
    },
    "description": {
      "ar": "احسب مربع عدد ومكعبه وقوته الرابعة.",
      "tr": "Sayının karesini, küpünü ve dördüncü kuvvetini hesapla."
    }
  },
  {
    "id": 32,
    "pages": [
      33
    ],
    "lessonId": 6,
    "title": {
      "ar": "الأس بالتكرار",
      "tr": "Döngüyle üs alma"
    },
    "description": {
      "ar": "اضرب الأساس في نفسه بعدد مرات يساوي الأس الصحيح غير السالب.",
      "tr": "Tabanı, negatif olmayan tam sayı üs kadar tekrarlı çarp."
    },
    "correction": {
      "ar": "ابدأ الناتج من 1؛ الأس 0 يعطي 1 للأساس غير الصفري.",
      "tr": "Sonucu 1’den başlat; sıfır olmayan tabanın 0. kuvveti 1’dir."
    }
  },
  {
    "id": 33,
    "pages": [
      34
    ],
    "lessonId": 7,
    "title": {
      "ar": "تصنيف الدرجات",
      "tr": "Not sınıflandırma"
    },
    "description": {
      "ar": "حوّل الدرجة إلى تقدير حرفي بشروط مرتبة.",
      "tr": "Notu sıralı koşullarla harf notuna dönüştür."
    }
  },
  {
    "id": 34,
    "pages": [
      35,
      36
    ],
    "lessonId": 7,
    "title": {
      "ar": "شرائح العمولة",
      "tr": "Komisyon dilimleri"
    },
    "description": {
      "ar": "حدد نسبة العمولة بحسب المبيعات واحسبها.",
      "tr": "Satışlara göre komisyon oranını seç ve hesapla."
    }
  },
  {
    "id": 35,
    "pages": [
      37
    ],
    "lessonId": 9,
    "title": {
      "ar": "العملات المعدنية",
      "tr": "Madeni paralar"
    },
    "description": {
      "ar": "احسب قيمة العملات بالسنت ثم بالدولار.",
      "tr": "Madeni paraların değerini sent, sonra dolar olarak hesapla."
    }
  },
  {
    "id": 36,
    "pages": [
      38
    ],
    "lessonId": 7,
    "title": {
      "ar": "آلة حاسبة بسيطة",
      "tr": "Basit hesap makinesi"
    },
    "description": {
      "ar": "اقرأ عددين وعملية ثم نفّذ العملية المناسبة.",
      "tr": "İki sayı ve işlem oku, uygun hesabı yap."
    },
    "correction": {
      "ar": "امنع القسمة على صفر وتحقق من رمز العملية.",
      "tr": "Sıfıra bölmeyi engelle ve işlem simgesini doğrula."
    }
  },
  {
    "id": 37,
    "pages": [
      39
    ],
    "lessonId": 7,
    "title": {
      "ar": "الجمع حتى علامة التوقف",
      "tr": "Durma değerine kadar toplama"
    },
    "description": {
      "ar": "اجمع القيم حتى -99 دون إضافته إلى المجموع.",
      "tr": "-99 girilene kadar topla; bu değeri toplama ekleme."
    },
    "correction": {
      "ar": "افحص -99 قبل الجمع فلا يدخل في المجموع.",
      "tr": "Toplamadan önce -99 kontrol edilir; toplama katılmaz."
    }
  },
  {
    "id": 38,
    "pages": [
      40,
      41
    ],
    "lessonId": 7,
    "title": {
      "ar": "العدد الأولي",
      "tr": "Asal sayı"
    },
    "description": {
      "ar": "تحقق أن العدد أكبر من 1 ولا يقبل القسمة إلا على 1 ونفسه.",
      "tr": "Sayının 1’den büyük ve yalnızca 1’e ve kendisine bölündüğünü kontrol et."
    },
    "correction": {
      "ar": "المخطط الأصلي قد يعدّ 1 أوليًا. الصحيح أن n < 2 ليس أوليًا، ويكفي اختبار d*d <= n.",
      "tr": "Özgün şema 1’i asal sayabilir. n < 2 asal değildir; d*d <= n kadar denemek yeterlidir."
    }
  },
  {
    "id": 39,
    "pages": [
      42
    ],
    "lessonId": 10,
    "title": {
      "ar": "الباقي من الدفع",
      "tr": "Para üstü"
    },
    "description": {
      "ar": "احسب المدفوع ناقص الفاتورة.",
      "tr": "Ödenen tutardan faturayı çıkar."
    }
  },
  {
    "id": 40,
    "pages": [
      43
    ],
    "lessonId": 7,
    "title": {
      "ar": "الخدمة والضريبة",
      "tr": "Servis ve vergi"
    },
    "description": {
      "ar": "أضف 10% خدمة ثم 16% ضريبة على الناتج وفق المثال.",
      "tr": "Örnekteki gibi %10 servis, sonra sonuca %16 vergi ekle."
    },
    "correction": {
      "ar": "هذه نسب تدريبية لا ضرائب حالية: bill × 1.10 × 1.16.",
      "tr": "Bunlar eğitim oranlarıdır, güncel vergiler değildir: bill × 1.10 × 1.16."
    }
  },
  {
    "id": 41,
    "pages": [
      44
    ],
    "lessonId": 10,
    "title": {
      "ar": "الساعات والأيام والأسابيع",
      "tr": "Saat, gün ve hafta"
    },
    "description": {
      "ar": "حوّل الساعات إلى أيام وأسابيع وميّز الإجمالي عن الباقي.",
      "tr": "Saatleri gün ve haftaya dönüştür; toplam ile kalanı ayır."
    }
  },
  {
    "id": 42,
    "pages": [
      45
    ],
    "lessonId": 8,
    "title": {
      "ar": "المدة إلى ثوانٍ",
      "tr": "Süreyi saniyeye çevirme"
    },
    "description": {
      "ar": "حوّل الأيام والساعات والدقائق والثواني إلى ثوانٍ.",
      "tr": "Gün, saat, dakika ve saniyeyi toplam saniyeye çevir."
    }
  },
  {
    "id": 43,
    "pages": [
      46,
      47
    ],
    "lessonId": 8,
    "title": {
      "ar": "الثواني إلى مدة",
      "tr": "Saniyeyi süreye ayırma"
    },
    "description": {
      "ar": "استخدم القسمة الصحيحة والباقي لتفكيك المدة.",
      "tr": "Süreyi tam bölme ve kalanla parçalara ayır."
    },
    "correction": {
      "ar": "تصحيح المصدر: 5 // 4 = 1 و15 % 7 = 1. ‏193535 ثانية = 2 يوم و5 ساعات و45 دقيقة و35 ثانية.",
      "tr": "Kaynak düzeltmesi: 5 // 4 = 1 ve 15 % 7 = 1. 193535 saniye = 2 gün, 5 saat, 45 dakika, 35 saniye."
    }
  },
  {
    "id": 44,
    "pages": [
      48,
      49
    ],
    "lessonId": 8,
    "title": {
      "ar": "رقم اليوم واسمه",
      "tr": "Gün numarası ve adı"
    },
    "description": {
      "ar": "حوّل 1–7 إلى اسم يوم وفق ترتيب المصدر.",
      "tr": "Kaynak sırasına göre 1–7 sayılarını gün adına çevir."
    },
    "correction": {
      "ar": "المصدر يبدأ بالأحد = 1 وينتهي بالسبت = 7.",
      "tr": "Kaynak Pazar = 1 ile başlar, Cumartesi = 7 ile biter."
    }
  },
  {
    "id": 45,
    "pages": [
      50,
      51,
      52,
      53
    ],
    "lessonId": 8,
    "title": {
      "ar": "رقم الشهر واسمه",
      "tr": "Ay numarası ve adı"
    },
    "description": {
      "ar": "حوّل 1–12 إلى اسم شهر مع التحقق من المجال.",
      "tr": "Aralığı doğrulayarak 1–12 sayılarını ay adına çevir."
    }
  },
  {
    "id": 46,
    "pages": [
      54
    ],
    "lessonId": 8,
    "title": {
      "ar": "الحروف من A إلى Z",
      "tr": "A’dan Z’ye harfler"
    },
    "description": {
      "ar": "اطبع الأحرف الإنجليزية الكبيرة بالتكرار.",
      "tr": "Büyük İngilizce harfleri döngüyle yazdır."
    }
  },
  {
    "id": 47,
    "pages": [
      55
    ],
    "lessonId": 9,
    "title": {
      "ar": "عدد الدفعات الشهرية",
      "tr": "Aylık ödeme sayısı"
    },
    "description": {
      "ar": "احسب عدد الدفعات دون فوائد وقرّب للأعلى إذا بقي جزء.",
      "tr": "Faizsiz taksit sayısını bul; kalan varsa yukarı yuvarla."
    },
    "correction": {
      "ar": "عدد الدفعات الكاملة = ceil(amount / payment)، مع payment > 0.",
      "tr": "Tam taksit sayısı = ceil(amount / payment); payment > 0 olmalıdır."
    }
  },
  {
    "id": 48,
    "pages": [
      56
    ],
    "lessonId": 9,
    "title": {
      "ar": "القسط الشهري",
      "tr": "Aylık taksit"
    },
    "description": {
      "ar": "اقسم المبلغ على عدد أشهر موجب.",
      "tr": "Tutarı pozitif ay sayısına böl."
    },
    "correction": {
      "ar": "عدد الأشهر صحيح موجب لتجنب القسمة على صفر.",
      "tr": "Sıfıra bölmemek için ay sayısı pozitif tam sayıdır."
    }
  },
  {
    "id": 49,
    "pages": [
      57
    ],
    "lessonId": 9,
    "title": {
      "ar": "رمز تجريبي متكرر",
      "tr": "Deneme kodunu tekrar girme"
    },
    "description": {
      "ar": "كرر طلب الرمز حتى يطابق 1234 في محاكاة تعليمية.",
      "tr": "Eğitim benzetiminde kod 1234 olana kadar tekrar sor."
    },
    "correction": {
      "ar": "الرمز والرصيد خياليان؛ لا تدخل بيانات مصرفية حقيقية.",
      "tr": "Kod ve bakiye kurgusaldır; gerçek banka bilgileri girilmez."
    }
  },
  {
    "id": 50,
    "pages": [
      58,
      59
    ],
    "lessonId": 9,
    "title": {
      "ar": "ثلاث محاولات فقط",
      "tr": "Yalnızca üç deneme"
    },
    "description": {
      "ar": "توقف عند نجاح الرمز أو نفاد ثلاث محاولات.",
      "tr": "Kod doğruysa veya üç hak bittiyse dur."
    },
    "correction": {
      "ar": "وحّد FailedCount وFailedCounter؛ ابدأ العداد خارج الحلقة وزده بعد الخطأ.",
      "tr": "FailedCount ve FailedCounter adlarını birleştir; sayacı döngü dışında başlat ve yanlış girişte artır."
    }
  }
];
export const algorithmSourceById = Object.fromEntries(algorithmSourceProblems.map(problem => [problem.id, problem])) as Record<number, AlgorithmSourceProblem>;
export const algorithmPageImage = (page: number) => `/algorithms/pages/${String(page).padStart(2, "0")}.webp`;
// Optional geometry enrichment for lesson 10: missing questions in the prior course.
export const additionalAlgorithmProblems = [
  {
    id: 20,
    title: "مساحة دائرة داخل مربع",
    description: "دائرة تمس أضلاع مربع طول ضلعه a. احسب المساحة بعد التحقق أن a موجب.",
    steps: ["اقرأ ضلع المربع a", "تحقق أن a > 0", "نصف القطر r = a / 2", "المساحة A = π × r²", "اطبع المساحة"],
    pythonCode: "import math\na = float(input('Square side: '))\nif a <= 0:\n    print('Side must be positive')\nelse:\n    radius = a / 2\n    print(round(math.pi * radius ** 2, 3))",
    example: { input: "10", output: "78.54" },
  },
  {
    id: 21,
    title: "مساحة الدائرة من محيطها",
    description: "اقرأ المحيط L واحسب مساحة الدائرة: A = L² / (4π).",
    steps: ["اقرأ المحيط L", "تحقق أن L > 0", "احسب A = L × L / (4 × π)", "اطبع المساحة"],
    pythonCode: "import math\nlength = float(input('Circumference: '))\nif length <= 0:\n    print('Circumference must be positive')\nelse:\n    print(round(length ** 2 / (4 * math.pi), 3))",
    example: { input: "20", output: "31.831" },
  },
  {
    id: 22,
    title: "دائرة داخل مثلث متساوي الساقين",
    description: "مثلث طول كل ساق فيه a وطول القاعدة b. احسب مساحة الدائرة المماسة لأضلاعه. نشاط إثرائي متقدم.",
    steps: ["اقرأ a وb", "تحقق أن a > 0 و0 < b < 2a", "احسب A = π × (b² / 4) × ((2a - b) / (2a + b))", "اطبع المساحة"],
    pythonCode: "import math\na = float(input('Equal side a: '))\nb = float(input('Base b: '))\nif not (a > 0 and 0 < b < 2 * a):\n    print('Invalid triangle')\nelse:\n    area = math.pi * (b ** 2 / 4) * ((2 * a - b) / (2 * a + b))\n    print(round(area, 3))",
    example: { input: "20, 10", output: "47.124" },
  },
  {
    id: 23,
    title: "الدائرة المحيطة بمثلث",
    description: "احسب مساحة الدائرة المارة برؤوس مثلث معلوم الأضلاع. القانون لأي مثلث صالح، وليس للقائم فقط. نشاط إثرائي متقدم.",
    steps: ["اقرأ a وb وc", "تحقق أنها موجبة ومجموع كل ضلعين أكبر من الثالث", "نصف المحيط s = (a + b + c) / 2", "مساحة المثلث Δ = √(s(s-a)(s-b)(s-c))", "نصف القطر R = abc / (4Δ)", "اطبع A = πR²"],
    pythonCode: "import math\na = float(input('Side a: '))\nb = float(input('Side b: '))\nc = float(input('Side c: '))\nif min(a, b, c) <= 0 or a + b <= c or a + c <= b or b + c <= a:\n    print('Invalid triangle')\nelse:\n    s = (a + b + c) / 2\n    triangle_area = math.sqrt(s * (s - a) * (s - b) * (s - c))\n    radius = a * b * c / (4 * triangle_area)\n    print(round(math.pi * radius ** 2, 3))",
    example: { input: "5, 6, 7", output: "40.088" },
  },
];
