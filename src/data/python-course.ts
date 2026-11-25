import { additionalAlgorithmProblems } from "./algorithm-source";
import type { FlowchartData } from "@/components/site/FlowchartRenderer";

export interface AlgorithmProblem {
  id: number;
  title: string;
  description: string;
  steps: string[];
  flowchart?: FlowchartData;
  pythonCode: string;
  example?: { input: string; output: string };
}

export interface PythonLesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  accent: "cyan" | "violet" | "amber" | "emerald" | "rose";
  difficulty: "مبتدئ" | "متوسط" | "متقدم";
  duration: string;
  objectives: string[];
  theorySections: { title: string; content: string[] }[];
  problems: AlgorithmProblem[];
  tips: { type: "info" | "warning" | "success"; title: string; content: string }[];
}

export const pythonLessons: PythonLesson[] = [
  // ===== Lesson 1 =====
  {
    id: 1,
    slug: "intro-flowchart",
    title: "مقدمة عن الخوارزميات والمخطط الانسيابي",
    subtitle: "تعلم الخوارزميات ورموز المخطط الانسيابي",
    badge: "البداية",
    accent: "cyan",
    difficulty: "مبتدئ",
    duration: "120 دقيقة",
    objectives: [
      "أن يفهم الطالب معنى الخوارزمية ك سلسلة من الخطوات لحل مشكلة",
      "أن يتعرّف على المخطط الانسيابي (Flowchart) كأداة لتصوير البرامج",
      "أن يحفظ رموز المخطط الانسيابي واستخدام كل رمز",
      "أن يكتب أول برنامج يطبع اسمه على الشاشة",
    ],
    theorySections: [
      {
        title: "ما هي الخوارزمية؟",
        content: [
          "الخوارزمية (Algorithm) هي سلسلة من الخطوات المرتبة بالتسلسل الصحيح للوصول إلى حل المشكلة.",
          "كل خطوة لها وظيفة محددة، وتؤدي إلى الخطوة التالية حتى نصل إلى الحل النهائي.",
          "مبدأ الخوارزمية: «فرّق تسد» — قسّم المشكلة الكبيرة إلى خطوات صغيرة سهلة.",
        ],
      },
      {
        title: "المخطط الانسيابي (Flowchart)",
        content: [
          "المخطط الانسيابي هو أداة رسومية تستخدم عناصر تصوير بصري لتصميم البرامج.",
          "يصور تدفق البرنامج بشكل مرئي ضمن مخطط منظم.",
          "يساعد على فهم منطق البرنامج قبل كتابة الكود الفعلي.",
        ],
      },
      {
        title: "رموز المخطط الانسيابي",
        content: [
          "البداية / النهاية: شكل بيضاوي يمثل بداية أو نهاية البرنامج.",
          "الإدخال / الإخراج: متوازي أضلاع يمثل قراءة أو طباعة البيانات.",
          "العمليات / الحسابات: مستطيل يمثل العمليات الحسابية والمنطقية.",
          "القرار / السؤال: معين (diamond) يمثل شرطًا له نعم أو لا.",
          "الأسهم: تربط الرموز وتحدد اتجاه تدفق البرنامج.",
        ],
      },
    ],
    problems: [
      {
        id: 1,
        title: "طباعة الاسم على الشاشة",
        description: "اكتب برنامج يطبع اسمك على الشاشة.",
        steps: ["اطبع 'Saeed'"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 15 },
            { id: "p", type: "output", text: "Print 'Saeed'", x: 50, y: 50 },
            { id: "e", type: "end", text: "End", x: 50, y: 85 },
          ],
          edges: [
            { from: "s", to: "p" },
            { from: "p", to: "e" },
          ],
        },
        pythonCode: "print('Saeed')",
        example: { input: "", output: "Saeed" },
      },
      {
        id: 2,
        title: "إدخال الاسم وطباعته",
        description: "اكتب برنامج يطلب من المستخدم إدخال اسمه ثم يطبععه على الشاشة.",
        steps: ["اطلب من المستخدم إدخال اسمه", "اطبع الاسم"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 10 },
            { id: "in", type: "input", text: "Enter Name", x: 50, y: 35 },
            { id: "out", type: "output", text: "Print Name", x: 50, y: 65 },
            { id: "e", type: "end", text: "End", x: 50, y: 90 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "out" },
            { from: "out", to: "e" },
          ],
        },
        pythonCode: "name = input('أدخل اسمك: ')\nprint(name)",
        example: { input: "أحمد", output: "أحمد" },
      },
    ],
    tips: [
      { type: "info", title: "دالة print", content: "في بايثون، نستخدم print() لطباعة أي شيء على الشاشة." },
      { type: "info", title: "دالة input", content: "نستخدم input() لقراءة إدخال من المستخدم. يمكن تمرير رسالة كقائمة." },
      { type: "success", title: "ابدأ بسيطًا", content: "أبسط برنامج في بايثون هو سطر واحد: print('Hello!')" },
    ],
  },

  // ===== Lesson 2 =====
  {
    id: 2,
    slug: "conditions-simple",
    title: "الشروط البسيطة (if / else)",
    subtitle: "اتخاذ القرارات في البرنامج",
    badge: "شروط",
    accent: "violet",
    difficulty: "مبتدئ",
    duration: "120 دقيقة",
    objectives: [
      "أن يفهم الطالب مفهوم الشرط في البرمجة",
      "أن يستخدم جملة if / else في بايثون",
      "أن يحل مسائل فردية/زوجي وناجح/راسب",
    ],
    theorySections: [
      {
        title: "جملة الشرط if / else",
        content: [
          "الشرط يسمح للبرنامج باتخاذ قرار: إذا تحقق شرط معين نفذ كتلة، وإلا نفذ كتلة أخرى.",
          "في بايثون: if الشرط: ثم الكود، ثم else: ثم الكود البديل.",
          "النتيجة تكون True (صحيح) أو False (خطأ).",
        ],
      },
      {
        title: "عملية باقي القسمة (mod)",
        content: [
          "عملية mod (%) تعطي باقي القسمة.",
          "إذا كان رقم mod 2 = 0 فالرقم زوجي (Even).",
          "إذا كان رقم mod 2 ≠ 0 فالرقم فردي (Odd).",
        ],
      },
    ],
    problems: [
      {
        id: 3,
        title: "فردي أم زوجي",
        description: "اكتب برنامج يطلب من المستخدم إدخال رقم، ثم يطبع 'ODD' إذا كان فرديًا أو 'Even' إذا كان زوجيًا.",
        steps: ["أدخل رقم", "احسب رقم mod 2", "إذا الناتج = 0 اطبع 'Even' وإلا اطبع 'ODD'"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 8 },
            { id: "in", type: "input", text: "Enter Number", x: 50, y: 25 },
            { id: "p", type: "process", text: "Result = Num mod 2", x: 50, y: 45 },
            { id: "d", type: "decision", text: "Result = 0 ?", x: 50, y: 65 },
            { id: "even", type: "output", text: "Print 'Even'", x: 20, y: 90 },
            { id: "odd", type: "output", text: "Print 'ODD'", x: 80, y: 90 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "p" },
            { from: "p", to: "d" },
            { from: "d", to: "even", label: "نعم" },
            { from: "d", to: "odd", label: "لا" },
          ],
        },
        pythonCode: "num = int(input('أدخل رقم: '))\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('ODD')",
        example: { input: "10", output: "Even" },
      },
      {
        id: 8,
        title: "ناجح أم راسب",
        description: "اكتب برنامج يطلب إدخال درجة الاختبار، ثم يطبع 'PASS' إذا كانت ≥ 50 وإلا يطبع 'Fail'.",
        steps: ["أدخل الدرجة", "إذا الدرجة ≥ 50 اطبع 'PASS' وإلا اطبع 'Fail'"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 10 },
            { id: "in", type: "input", text: "Read Mark", x: 50, y: 30 },
            { id: "d", type: "decision", text: "Mark >= 50 ?", x: 50, y: 55 },
            { id: "pass", type: "output", text: "Print 'PASS'", x: 20, y: 85 },
            { id: "fail", type: "output", text: "Print 'Fail'", x: 80, y: 85 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "d" },
            { from: "d", to: "pass", label: "نعم" },
            { from: "d", to: "fail", label: "لا" },
          ],
        },
        pythonCode: "mark = int(input('أدخل الدرجة: '))\nif mark >= 50:\n    print('PASS')\nelse:\n    print('Fail')",
        example: { input: "45", output: "Fail" },
      },
      {
        id: 12,
        title: "أكبر رقمين",
        description: "اكتب برنامج يطلب إدخال رقمين، ثم يطبع الأكبر.",
        steps: ["أدخل رقمين", "إذا رقم1 > رقم2 اطبع رقم1 وإلا اطبع رقم2"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 10 },
            { id: "in", type: "input", text: "Read Num1, Num2", x: 50, y: 30 },
            { id: "d", type: "decision", text: "Num1 > Num2 ?", x: 50, y: 55 },
            { id: "p1", type: "output", text: "Print Num1", x: 20, y: 85 },
            { id: "p2", type: "output", text: "Print Num2", x: 80, y: 85 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "d" },
            { from: "d", to: "p1", label: "نعم" },
            { from: "d", to: "p2", label: "لا" },
          ],
        },
        pythonCode: "num1 = int(input('الرقم الأول: '))\nnum2 = int(input('الرقم الثاني: '))\nif num1 > num2:\n    print(num1)\nelse:\n    print(num2)",
        example: { input: "10, 20", output: "20" },
      },
    ],
    tips: [
      { type: "info", title: "المقارنات", content: "نستخدم: == (يساوي)، != (لا يساوي)، > (أكبر)، < (أصغر)، >= ، <=" },
      { type: "warning", title: "المسافات", content: "في بايثون، الكود داخل if يجب أن يكون بادئًا (مزاحًا) بمسافة 4 خانات." },
    ],
  },

  // ===== Lesson 3 =====
  {
    id: 3,
    slug: "compound-conditions",
    title: "الشروط المركبة (AND / OR)",
    subtitle: "ربط شروط متعددة معًا",
    badge: "منطق",
    accent: "amber",
    difficulty: "متوسط",
    duration: "120 دقيقة",
    objectives: [
      "أن يفهم الطالب العوامل المنطقية AND و OR",
      "أن يبني شروطًا مركبة من عدة شروط",
      "أن يحل مسائل التوظيف والتحقق من البيانات",
    ],
    theorySections: [
      {
        title: "العامل المنطقي AND",
        content: [
          "AND يعطي True فقط إذا كان كلا الشرطين محققين.",
          "مثال: العمر > 21 AND لديه رخصة قيادة = True → يوظف.",
          "إذا فشل أي شرط، تكون النتيجة False.",
        ],
      },
      {
        title: "العامل المنطقي OR",
        content: [
          "OR يعطي True إذا تحقق أي شرط واحد على الأقل.",
          "في هذه المحاكاة يمكن استيفاء الشرط بتصريح خاص، أو بتحقق شرطَي العمر والرخصة معًا.",
          "يكفي نجاح شرط واحد لتحقيق OR.",
        ],
      },
    ],
    problems: [
      {
        id: 4,
        title: "شروط التوظيف",
        description: "اكتب برنامج يطلب العمر ورخصة القيادة. إذا العمر > 21 ولديه رخصة اطبع 'Hired' وإلا اطبع 'Rejected'.",
        steps: ["أدخل العمر ورخصة القيادة", "النتيجة = (العمر > 21 AND رخصة = True)", "إذا True اطبع 'Hired' وإلا 'Rejected'"],
        pythonCode: "age = int(input('العمر: '))\nhas_license = input('رخصة قيادة؟ (yes/no): ') == 'yes'\nif age > 21 and has_license:\n    print('Hired')\nelse:\n    print('Rejected')",
        example: { input: "25, yes", output: "Hired" },
      },
      {
        id: 5,
        title: "تصريح خاص أو تحقق الشرطين",
        description: "في سيناريو تدريبي يُقبل طلب عند وجود تصريح خاص أو عندما يكون العمر أكبر من 21 وتتوافر رخصة. جرّب الحالتين.",
        steps: ["اقرأ العمر وحالتي الرخصة والتصريح", "افحص شرطي العمر والرخصة معًا", "اقبل الطلب إذا تحقق الشرطان معًا أو وُجد تصريح خاص"],
        pythonCode: "age = int(input('العمر: '))\nhas_license = input('رخصة؟ (yes/no): ') == 'yes'\npermit = input('تصريح خاص؟ (yes/no): ') == 'yes'\nif permit or (age > 21 and has_license):\n    print('Hired')\nelse:\n    print('Rejected')",
        example: { input: "19, no, yes", output: "Hired" },
      },
      {
        id: 24,
        title: "التحقق من العمر",
        description: "اكتب برنامج يطلب العمر. إذا كان بين 18 و 45 اطبع 'Valid Age' وإلا 'Invalid Age'.",
        steps: ["أدخل العمر", "إذا 18 ≤ العمر ≤ 45 → 'Valid Age'", "وإلا → 'Invalid Age'"],
        pythonCode: "age = int(input('العمر: '))\nif age >= 18 and age <= 45:\n    print('Valid Age')\nelse:\n    print('Invalid Age')",
        example: { input: "30", output: "Valid Age" },
      },
    ],
    tips: [
      { type: "info", title: "الأولوية", content: "AND له أولوية أعلى من OR. استخدم الأقواس لتوضيح الترتيب." },
      { type: "warning", title: "انتبه للنوع", content: "إدخال input() يعطي نص. استخدم int() لتحويله لرقم." },
    ],
  },

  // ===== Lesson 4 =====
  {
    id: 4,
    slug: "math-strings",
    title: "العمليات الحسابية والنصوص",
    subtitle: "الجمع والقسمة ودمج النصوص",
    badge: "حسابات",
    accent: "emerald",
    difficulty: "مبتدئ",
    duration: "120 دقيقة",
    objectives: [
      "أن يجري عمليات حسابية (جمع، قسمة، متوسط)",
      "أن يدمج النصوص (concatenation)",
      "أن يحل مسائل حساب المتوسط والمساحات",
    ],
    theorySections: [
      {
        title: "العمليات الحسابية",
        content: [
          "الجمع (+)، الطرح (-)، الضرب (*)، القسمة (/).",
          "المتوسط = مجموع القيم / عدد القيم.",
          "باقي القسمة (%) يعطي بقية القسمة.",
        ],
      },
      {
        title: "دمج النصوص",
        content: [
          "نستخدم + لدمج نصين معًا.",
          "مثال: 'أحمد' + ' ' + 'محمد' = 'أحمد محمد'.",
          "يمكن تحويل الأرقام لنص بـ str().",
        ],
      },
    ],
    problems: [
      {
        id: 6,
        title: "الاسم والكنية",
        description: "اكتب برنامج يطلب الاسم والكنية ثم يطبع الاسم الكامل.",
        steps: ["أدخل الاسم والكنية", "الاسم الكامل = الاسم + ' ' + الكنية", "اطبع الاسم الكامل"],
        pythonCode: "first = input('الاسم: ')\nlast = input('الكنية: ')\nfull = first + ' ' + last\nprint(full)",
        example: { input: "أحمد، محمد", output: "أحمد محمد" },
      },
      {
        id: 7,
        title: "نصف الرقم",
        description: "اكتب برنامج يطلب رقمًا ثم يطبع نصفه.",
        steps: ["أدخل رقم", "نصف = رقم / 2", "اطبع 'Half of X is Y'"],
        pythonCode: "num = int(input('رقم: '))\nhalf = num / 2\nprint(f'Half of {num} is {half}')",
        example: { input: "60", output: "Half of 60 is 30.0" },
      },
      {
        id: 9,
        title: "مجموع ثلاثة أرقام",
        description: "اكتب برنامج يطلب ثلاثة أرقام ثم يطبع مجموعها.",
        steps: ["أدخل ثلاثة أرقام", "المجموع = رقم1 + رقم2 + رقم3", "اطبع المجموع"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 10 },
            { id: "in", type: "input", text: "Read Num1, Num2, Num3", x: 50, y: 30 },
            { id: "p", type: "process", text: "Sum = Num1 + Num2 + Num3", x: 50, y: 55 },
            { id: "out", type: "output", text: "Print Sum", x: 50, y: 80 },
            { id: "e", type: "end", text: "End", x: 50, y: 95 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "p" },
            { from: "p", to: "out" },
            { from: "out", to: "e" },
          ],
        },
        pythonCode: "n1 = int(input('رقم 1: '))\nn2 = int(input('رقم 2: '))\nn3 = int(input('رقم 3: '))\nprint(n1 + n2 + n3)",
        example: { input: "10, 20, 30", output: "60" },
      },
      {
        id: 10,
        title: "متوسط ثلاث درجات",
        description: "اكتب برنامج يحسب متوسط ثلاث اختبارات.",
        steps: ["أدخل ثلاث درجات", "المتوسط = (درجة1 + درجة2 + درجة3) / 3", "اطبع المتوسط"],
        pythonCode: "m1 = int(input('درجة 1: '))\nm2 = int(input('درجة 2: '))\nm3 = int(input('درجة 3: '))\navg = (m1 + m2 + m3) / 3\nprint(avg)",
        example: { input: "90, 80, 70", output: "80.0" },
      },
      {
        id: 11,
        title: "متوسط مع ناجح/راسب",
        description: "حساب المتوسط ثم طباعة PASS إذا ≥ 50 وإلا FAIL.",
        steps: ["أدخل ثلاث درجات", "احسب المتوسط", "اطبع المتوسط", "إذا المتوسط ≥ 50 → 'PASS' وإلا → 'FAIL'"],
        pythonCode: "m1 = int(input('درجة 1: '))\nm2 = int(input('درجة 2: '))\nm3 = int(input('درجة 3: '))\navg = (m1 + m2 + m3) / 3\nprint(avg)\nif avg >= 50:\n    print('PASS')\nelse:\n    print('FAIL')",
        example: { input: "90, 80, 70", output: "80.0\nPASS" },
      },
      {
        id: 14,
        title: "تبديل رقمين (Swap)",
        description: "اكتب برنامج يبدل قيمة رقمين ثم يطبعهما.",
        steps: ["أدخل رقمين أ، ب", "اطبعهما قبل التبديل", "بدّل: مؤقت = أ، أ = ب، ب = مؤقت", "اطبعهما بعد التبديل"],
        pythonCode: "a = int(input('أ: '))\nb = int(input('ب: '))\nprint(f'قبل: {a}, {b}')\ntemp = a\na = b\nb = temp\nprint(f'بعد: {a}, {b}')",
        example: { input: "5, 10", output: "قبل: 5, 10\nبعد: 10, 5" },
      },
    ],
    tips: [
      { type: "info", title: "f-strings", content: "نستخدم f'...' لدمج المتغيرات في النص بسهولة: f'النتيجة: {x}'" },
      { type: "success", title: "الترتيب", content: "في التبديل (swap)، نحتاج متغير مؤقت (temp) لحفظ القيمة قبل استبدالها." },
    ],
  },

  // ===== Lesson 5 =====
  {
    id: 5,
    slug: "geometry",
    title: "المساحات الهندسية",
    subtitle: "حساب مساحات الأشكال المختلفة",
    badge: "هندسة",
    accent: "rose",
    difficulty: "متوسط",
    duration: "120 دقيقة",
    objectives: [
      "أن يحسب مساحة المستطيل والمثلث",
      "أن يحسب مساحة الدائرة بمختلف الطرق",
      "أن يطبق المعادلات الرياضية في بايثون",
    ],
    theorySections: [
      {
        title: "المعادلات الهندسية",
        content: [
          "مساحة المستطيل = الطول × العرض",
          "مساحة المثلث = ½ × القاعدة × الارتفاع",
          "مساحة الدائرة (بنصف القطر) = π × r²",
          "مساحة الدائرة (بالقطر) = π × D² / 4",
          "π ≈ 3.14",
        ],
      },
      {
        title: "دالة sqrt في بايثون",
        content: [
          "نستخدم import math ثم math.sqrt() لحساب الجذر التربيعي.",
          "مثال: math.sqrt(16) = 4",
          "أو نستخدم ** 0.5: 16 ** 0.5 = 4",
        ],
      },
    ],
    problems: [
      {
        id: 15,
        title: "مساحة المستطيل",
        description: "حساب مساحة مستطيل من الطول والعرض.",
        steps: ["أدخل الطول والعرض", "المساحة = الطول × العرض", "اطبع المساحة"],
        pythonCode: "length = float(input('الطول: '))\nwidth = float(input('العرض: '))\narea = length * width\nprint(f'المساحة = {area}')",
        example: { input: "10, 20", output: "المساحة = 200.0" },
      },
      {
        id: 16,
        title: "مساحة المستطيل بالقطر",
        description: "حساب مساحة المستطيل من الطول والقطر باستخدام: Area = a × √(d² - a²).",
        steps: ["أدخل طول الضلع a وطول القطر d", "تحقق أن d أكبر من a وأن a موجب", "احسب الضلع الآخر بالجذر التربيعي لـ d²−a²، ثم اضربه في a"],
        pythonCode: "import math\na = float(input('الضلع a: '))\nd = float(input('القطر d: '))\nif not (0 < a < d):\n    print('يجب أن يكون القطر أطول من الضلع وكلاهما موجبًا')\nelse:\n    area = a * math.sqrt(d*d - a*a)\n    print(f'المساحة = {area:.3f}')",
        example: { input: "5, 40", output: "المساحة = 198.431" },
      },
      {
        id: 17,
        title: "مساحة المثلث",
        description: "حساب مساحة المثلث: Area = ½ × القاعدة × الارتفاع.",
        steps: ["أدخل القاعدة والارتفاع", "المساحة = (القاعدة / 2) × الارتفاع", "اطبع"],
        pythonCode: "a = float(input('القاعدة: '))\nh = float(input('الارتفاع: '))\narea = (a / 2) * h\nprint(f'المساحة = {area}')",
        example: { input: "10, 8", output: "المساحة = 40.0" },
      },
      {
        id: 18,
        title: "مساحة الدائرة بنصف القطر",
        description: "Area = π × r² حيث π = 3.14.",
        steps: ["أدخل نصف القطر r", "المساحة = 3.14 × r²", "اطبع"],
        pythonCode: "r = float(input('نصف القطر: '))\npi = 3.14\narea = pi * (r ** 2)\nprint(f'المساحة = {area}')",
        example: { input: "5", output: "المساحة = 78.5" },
      },
      {
        id: 19,
        title: "مساحة الدائرة بالقطر",
        description: "Area = π × D² / 4.",
        steps: ["أدخل القطر D", "المساحة = (3.14 × D²) / 4", "اطبع"],
        pythonCode: "d = float(input('القطر: '))\npi = 3.14\narea = (pi * d * d) / 4\nprint(f'المساحة = {area}')",
        example: { input: "10", output: "المساحة = 78.5" },
      },
      {
        id: 13,
        title: "أكبر ثلاثة أرقام",
        description: "اكتب برنامج يطبع أكبر رقم من ثلاثة أرقام مدخلة.",
        steps: ["أدخل ثلاثة أرقام", "قارن الأول بالثاني ثم الأكبر بالثالث", "اطبع الأكبر"],
        pythonCode: "n1 = int(input('رقم 1: '))\nn2 = int(input('رقم 2: '))\nn3 = int(input('رقم 3: '))\nif n1 >= n2 and n1 >= n3:\n    print(n1)\nelif n2 >= n1 and n2 >= n3:\n    print(n2)\nelse:\n    print(n3)",
        example: { input: "20, 10, 30", output: "30" },
      },
    ],
    tips: [
      { type: "info", title: "import math", content: "لاستخدام sqrt وغيرها من الدوال الرياضية، أضف import math في بداية البرنامج." },
      { type: "info", title: "الأس **", content: "في بايثون، نستخدم ** للأس: r ** 2 = r²" },
    ],
  },

  // ===== Lesson 6 =====
  {
    id: 6,
    slug: "loops",
    title: "حلقات التكرار (Loops)",
    subtitle: "تكرار العمليات تلقائيًا",
    badge: "تكرار",
    accent: "cyan",
    difficulty: "متوسط",
    duration: "120 دقيقة",
    objectives: [
      "أن يفهم الطالب مفهوم حلقة التكرار",
      "أن يستخدم while و for في بايثون",
      "أن يحل مسائل العدّ وجمع الأعداد",
    ],
    theorySections: [
      {
        title: "حلقة while",
        content: [
          "while تكرر الكود طالما الشرط محقق (True).",
          "تتوقف عندما يصبح الشرط False.",
          "مثال: while x <= 10: print(x); x = x + 1",
          "انتبه: يجب تغيير المتغير داخل الحلقة وإلا ستستمر للأبد (infinite loop)!",
        ],
      },
      {
        title: "حلقة for",
        content: [
          "for تتكرر على عناصر قائمة أو نطاق محدد.",
          "مثال: for i in range(1, 11): print(i) — يطبع 1 إلى 10.",
          "range(a, b) يعطي أرقام من a إلى b-1.",
        ],
      },
    ],
    problems: [
      {
        id: 27,
        title: "العدّ التنازلي",
        description: "اكتب برنامج يطلب رقمًا ثم يطبع من الرقم إلى 1.",
        steps: ["أدخل رقم", "من الرقم إلى 1: اطبع ثم أنقص 1", "توقف عند 1"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 8 },
            { id: "in", type: "input", text: "Read Num", x: 50, y: 22 },
            { id: "d", type: "decision", text: "Num >= 1 ?", x: 50, y: 45 },
            { id: "out", type: "output", text: "Print Num", x: 20, y: 68 },
            { id: "dec", type: "process", text: "Num = Num - 1", x: 20, y: 85 },
            { id: "e", type: "end", text: "End", x: 80, y: 68 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "d" },
            { from: "d", to: "out", label: "نعم" },
            { from: "out", to: "dec" },
            { from: "dec", to: "d" },
            { from: "d", to: "e", label: "لا" },
          ],
        },
        pythonCode: "num = int(input('رقم: '))\nwhile num >= 1:\n    print(num)\n    num -= 1",
        example: { input: "5", output: "5\n4\n3\n2\n1" },
      },
      {
        id: 26,
        title: "العدّ التصاعدي",
        description: "اكتب برنامج يطبع من 1 إلى الرقم المدخل.",
        steps: ["أدخل رقم", "من 1 إلى الرقم: اطبع ثم زد 1", "توقف عند الرقم"],
        pythonCode: "num = int(input('رقم: '))\nfor i in range(1, num + 1):\n    print(i)",
        example: { input: "5", output: "1\n2\n3\n4\n5" },
      },
      {
        id: 28,
        title: "مجموع الأعداد الفردية",
        description: "اكتب برنامج يجمع الأعداد الفردية من 1 إلى الرقم المدخل.",
        steps: ["أدخل رقم", "كرّر من 1 إلى الرقم", "إذا العدد فردي أضفه للمجموع", "اطبع المجموع"],
        pythonCode: "num = int(input('رقم: '))\ntotal = 0\nfor i in range(1, num + 1):\n    if i % 2 != 0:\n        total += i\nprint(total)",
        example: { input: "10", output: "25" },
      },
      {
        id: 29,
        title: "مجموع الأعداد الزوجية",
        description: "اكتب برنامج يجمع الأعداد الزوجية من 1 إلى الرقم المدخل.",
        steps: ["أدخل رقم", "كرّر من 1 إلى الرقم", "إذا العدد زوجي أضفه للمجموع", "اطبع المجموع"],
        pythonCode: "num = int(input('رقم: '))\ntotal = 0\nfor i in range(1, num + 1):\n    if i % 2 == 0:\n        total += i\nprint(total)",
        example: { input: "10", output: "30" },
      },
      {
        id: 30,
        title: "المضروب (Factorial)",
        description: "احسب مضروب عدد صحيح غير سالب. مضروب الصفر يساوي 1.",
        steps: ["أدخل عددًا صحيحًا", "إذا كان سالبًا فاطلب قيمة غير سالبة", "ابدأ الناتج عند 1، واضربه في الأعداد من 1 إلى العدد شاملًا", "اطبع الناتج"],
        pythonCode: "num = int(input('عدد صحيح غير سالب: '))\nif num < 0:\n    print('المضروب يحتاج إلى عدد صحيح غير سالب')\nelse:\n    result = 1\n    for i in range(1, num + 1):\n        result *= i\n    print(result)",
        example: { input: "6", output: "720" },
      },
      {
        id: 32,
        title: "الأس (Power)",
        description: "ارفع عددًا لأسّ صحيح غير سالب بالضرب المتكرر. جرّب أيضًا الأس صفرًا.",
        steps: ["أدخل الأساس والأس", "تحقق أن الأس غير سالب", "ابدأ الناتج عند 1 واضربه في الأساس بعدد مرات يساوي الأس", "اطبع الناتج"],
        pythonCode: "base = int(input('الأساس: '))\nexponent = int(input('الأس: '))\nif exponent < 0:\n    print('اختر أسًا غير سالب')\nelse:\n    result = 1\n    for i in range(exponent):\n        result *= base\n    print(result)",
        example: { input: "2, 4", output: "16" },
      },
    ],
    tips: [
      { type: "warning", title: "Infinite Loop", content: "إذا نسيت تحديث المتغير في while، ستستمر الحلقة للأبد! تأكد دائمًا من تغيير قيمة المتغير." },
      { type: "info", title: "range", content: "range(1, n+1) يعطي أرقام من 1 إلى n. لاحظ +1 لأن range لا يشمل الرقم الأخير." },
      { type: "success", title: "+= و *=", content: "x += 1 تعني x = x + 1. x *= 2 تعني x = x * 2. اختصارات مفيدة!" },
    ],
  },

  // ===== Lesson 7 =====
  {
    id: 7,
    slug: "advanced-problems",
    title: "المسائل المتقدمة",
    subtitle: "درجات، عمولات، آلة حاسبة، أعداد أولية",
    badge: "متقدم",
    accent: "violet",
    difficulty: "متقدم",
    duration: "120 دقيقة",
    objectives: [
      "أن يحل مسائل متعددة الشروط (elif)",
      "أن يبني آلة حاسبة بسيطة",
      "أن يتحقق من الأعداد الأولية",
      "أن يحسب العمولات والفواتير",
    ],
    theorySections: [
      {
        title: "جملة elif",
        content: [
          "elif تعني «وإلا إذا» — تتيح فحص عدة شروط بالتسلسل.",
          "مثال: if grade >= 90: 'A' elif grade >= 80: 'B' ...",
          "بايثون يفحص الشروط بالترتيب وينفذ أول شرط محقق فقط.",
        ],
      },
      {
        title: "الأعداد الأولية",
        content: [
          "العدد الأولي عدد صحيح أكبر من 1 له قاسمان موجبان فقط، هما 1 والعدد نفسه.",
          "للتحقق: نقسم الرقم على جميع الأعداد من 2 إلى نصف الرقم.",
          "إذا قبل القسمة على أي منها → ليس أولي.",
          "أمثلة: 2, 3, 5, 7, 11 أولية. 4, 6, 8, 9, 10 ليست أولية.",
        ],
      },
    ],
    problems: [
      {
        id: 33,
        title: "تقدير الدرجات",
        description: "تحويل الدرجة إلى تقدير: 90-100=A, 80-89=B, 70-79=C, 60-69=D, 50-59=E, أقل=F.",
        steps: ["أدخل الدرجة", "استخدم elif لفحص النطاقات", "اطبع التقدير"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 55, y: 3 },
            { id: "in", type: "input", text: "Read grade (0–100)", x: 55, y: 10 },
            { id: "d0", type: "decision", text: "Grade ≥ 90?", x: 55, y: 21 },
            { id: "o0", type: "output", text: "A", x: 16, y: 25 },
            { id: "d1", type: "decision", text: "Grade ≥ 80?", x: 55, y: 36 },
            { id: "o1", type: "output", text: "B", x: 16, y: 40 },
            { id: "d2", type: "decision", text: "Grade ≥ 70?", x: 55, y: 51 },
            { id: "o2", type: "output", text: "C", x: 16, y: 55 },
            { id: "d3", type: "decision", text: "Grade ≥ 60?", x: 55, y: 66 },
            { id: "o3", type: "output", text: "D", x: 16, y: 70 },
            { id: "d4", type: "decision", text: "Grade ≥ 50?", x: 55, y: 81 },
            { id: "o4", type: "output", text: "E", x: 16, y: 85 },
            { id: "f", type: "output", text: "F", x: 55, y: 94 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "d0" },
            { from: "d0", to: "o0", label: "نعم" },
            { from: "d0", to: "d1", label: "لا" },
            { from: "d1", to: "o1", label: "نعم" },
            { from: "d1", to: "d2", label: "لا" },
            { from: "d2", to: "o2", label: "نعم" },
            { from: "d2", to: "d3", label: "لا" },
            { from: "d3", to: "o3", label: "نعم" },
            { from: "d3", to: "d4", label: "لا" },
            { from: "d4", to: "o4", label: "نعم" },
            { from: "d4", to: "f", label: "لا" },
          ],
        },
        pythonCode: "grade = int(input('الدرجة: '))\nif grade >= 90:\n    print('A')\nelif grade >= 80:\n    print('B')\nelif grade >= 70:\n    print('C')\nelif grade >= 60:\n    print('D')\nelif grade >= 50:\n    print('E')\nelse:\n    print('F')",
        example: { input: "95", output: "A" },
      },
      {
        id: 36,
        title: "الآلة الحاسبة",
        description: "برنامج يطلب رقمين ونوع العملية (+, -, *, /) ثم ينفذها.",
        steps: ["أدخل رقمين ورمز العملية", "تحقّق من أن الرمز أحد الرموز الأربعة", "عند القسمة تحقّق من أن المقسوم عليه لا يساوي صفرًا", "نفّذ العملية واطبع الناتج"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 57, y: 3 },
            { id: "in", type: "input", text: "Read a, b, op", x: 57, y: 12 },
            { id: "sign", type: "decision", text: "op ∈ {+, −, *, /}?", x: 57, y: 27 },
            { id: "err", type: "output", text: "Unknown operation", x: 17, y: 32 },
            { id: "div", type: "decision", text: "op = / AND b = 0?", x: 57, y: 50 },
            { id: "zero", type: "output", text: "Division by zero", x: 17, y: 62 },
            { id: "run", type: "process", text: "Apply op to a, b", x: 57, y: 72 },
            { id: "out", type: "output", text: "Print result", x: 57, y: 92 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "sign" },
            { from: "sign", to: "err", label: "لا" },
            { from: "sign", to: "div", label: "نعم" },
            { from: "div", to: "zero", label: "نعم" },
            { from: "div", to: "run", label: "لا" },
            { from: "run", to: "out" },
          ],
        },
        pythonCode: "n1 = float(input('الرقم الأول: '))\nn2 = float(input('الرقم الثاني: '))\nop = input('العملية (+,-,*,/): ')\nif op == '+':\n    print(n1 + n2)\nelif op == '-':\n    print(n1 - n2)\nelif op == '*':\n    print(n1 * n2)\nelif op == '/':\n    if n2 == 0:\n        print('القسمة على صفر غير معرّفة')\n    else:\n        print(n1 / n2)\nelse:\n    print('عملية غير معروفة')",
        example: { input: "10, 20, *", output: "200.0" },
      },
      {
        id: 38,
        title: "التحقق من عدد أولي",
        description: "اكتب برنامج يتحقق إذا كان الرقم أوليًا أم لا.",
        steps: ["أدخل عددًا صحيحًا", "أي عدد أصغر من 2 غير أولي", "ابحث عن قاسم يبدأ من 2 حتى يصبح مربعه أكبر من العدد", "إذا وُجد قاسم فالعدد غير أولي، وفي غير ذلك هو أولي"],
        pythonCode: "num = int(input('رقم: '))\nis_prime = num >= 2\ndivisor = 2\nwhile is_prime and divisor * divisor <= num:\n    if num % divisor == 0:\n        is_prime = False\n    divisor += 1\nprint('Prime' if is_prime else 'Not Prime')",
        example: { input: "5", output: "Prime" },
      },
      {
        id: 34,
        title: "حساب العمولة",
        description: "حساب عمولة المبيعات حسب النطاق: ≥ مليون=1%، 500K-1M=2%، 100K-500K=3%، 50K-100K=5%، أقل=0%.",
        steps: ["أدخل إجمالي المبيعات", "حدد النسبة حسب النطاق", "العمولة = المبيعات × النسبة", "اطبع العمولة"],
        pythonCode: "sales = float(input('إجمالي المبيعات: '))\nif sales >= 1000000:\n    rate = 0.01\nelif sales >= 500000:\n    rate = 0.02\nelif sales >= 100000:\n    rate = 0.03\nelif sales >= 50000:\n    rate = 0.05\nelse:\n    rate = 0\ncommission = sales * rate\nprint(f'العمولة = {commission}')",
        example: { input: "110000", output: "العمولة = 3300.0" },
      },
      {
        id: 37,
        title: "مجموع حتى رقم معين (Sentinel)",
        description: "اكتب برنامج يقرأ أرقامًا ويجمعها حتى يدخل المستخدم -99.",
        steps: ["المجموع = 0", "اقرأ رقم", "إذا = -99 اطبع المجموع وتوقف", "وإلا أضفه للمجموع وكرر"],
        pythonCode: "total = 0\nwhile True:\n    num = int(input('رقم (-99 للإنهاء): '))\n    if num == -99:\n        break\n    total += num\nprint(total)",
        example: { input: "10, 20, 30, 40, -99", output: "100" },
      },
      {
        id: 40,
        title: "فاتورة المطعم",
        description: "حساب فاتورة مع ضريبة مبيعات 16% ورسوم خدمة 10%.",
        steps: ["أدخل قيمة الفاتورة", "أضف 10% خدمة", "أضف 16% ضريبة", "اطبع الإجمالي"],
        pythonCode: "bill = float(input('قيمة الفاتورة: '))\ntotal = bill * 1.10  # خدمة 10%\ntotal = total * 1.16  # ضريبة 16%\nprint(f'الإجمالي = {total:.2f}')",
        example: { input: "100", output: "الإجمالي = 127.60" },
      },
    ],
    tips: [
      { type: "info", title: "break", content: "break تخرج من الحلقة فورًا. مفيدة لإيقاف الحلقة عند شرط معين." },
      { type: "warning", title: "ترتيب elif", content: "في تقدير الدرجات، ابدأ من الأعلى للأسفل. إذا بدأت من 50، فكل الدرجات ستحقق الشرط الأول!" },
      { type: "success", title: "العلم (Flag)", content: "في فحص الأعداد الأولية، نستخدم متغير منطقي (is_prime) كعلم: نبدأه True ونغيره لـ False إذا وجدنا قاسم." },
    ],
  },

  // ===== Lesson 8 =====
  {
    id: 8,
    slug: "days-months",
    title: "الأيام والأشهر والتحويلات",
    subtitle: "تحويل الوقت وعرض الأسماء",
    badge: "تحويلات",
    accent: "amber",
    difficulty: "متوسط",
    duration: "120 دقيقة",
    objectives: [
      "أن يعرض أسماء الأيام والأشهر حسب الرقم",
      "أن يحول بين الثواني والأيام والساعات",
      "أن يستخدم الأحرف ورموز ASCII",
    ],
    theorySections: [
      {
        title: "تحويل الوقت",
        content: [
          "1 يوم = 24 ساعة = 1440 دقيقة = 86400 ثانية",
          "1 ساعة = 60 دقيقة = 3600 ثانية",
          "1 دقيقة = 60 ثانية",
          "للتحويل: قسمة للحصول على الكل، وباقي القسمة (mod) للحصول على الباقي.",
        ],
      },
      {
        title: "دالة chr",
        content: [
          "chr(عدد) تحول رقم إلى حرف حسب جدول ASCII.",
          "chr(65) = 'A', chr(66) = 'B', ..., chr(90) = 'Z'.",
          "نستخدمها لطباعة الحروف من A إلى Z في حلقة.",
        ],
      },
    ],
    problems: [
      {
        id: 44,
        title: "اسم اليوم",
        description: "اكتب برنامج يطلب رقم يوم (1-7) ويطبع اسمه.",
        steps: ["أدخل رقم 1-7", "1=الأحد، 2=الاثنين، ... 7=السبت", "إذا خارج النطاق اطلب إعادة الإدخال"],
        pythonCode: "while True:\n    day = int(input('رقم اليوم (1-7): '))\n    if day < 1 or day > 7:\n        print('يوم خاطئ')\n        continue\n    days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']\n    print(days[day - 1])\n    break",
        example: { input: "6", output: "الجمعة" },
      },
      {
        id: 45,
        title: "اسم الشهر",
        description: "اكتب برنامج يطلب رقم شهر (1-12) ويطبع اسمه.",
        steps: ["أدخل رقم 1-12", "1=يناير، 2=فبراير، ... 12=ديسمبر", "إذا خارج النطاق اطبع 'شهر خاطئ'"],
        pythonCode: "while True:\n    m = int(input('رقم الشهر (1-12): '))\n    if m < 1 or m > 12:\n        print('شهر خاطئ')\n        continue\n    months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']\n    print(months[m - 1])\n    break",
        example: { input: "6", output: "يونيو" },
      },
      {
        id: 46,
        title: "طباعة A إلى Z",
        description: "اكتب برنامج يطبع جميع الأحرف من A إلى Z.",
        steps: ["عداد = 65 (ASCII لـ A)", "اطبع chr(العداد)", "زد العداد", "توقف عند 90 (Z)"],
        pythonCode: "for i in range(65, 91):\n    print(chr(i), end=' ')",
        example: { input: "", output: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" },
      },
      {
        id: 42,
        title: "تحويل أيام/ساعات/دقائق/ثواني إلى ثواني",
        description: "اكتب برنامج يحول الأيام والساعات والدقائق والثواني إلى إجمالي الثواني.",
        steps: ["أدخل الأيام والساعات والدقائق والثواني", "الإجمالي = (أيام×86400) + (ساعات×3600) + (دقائق×60) + ثواني", "اطبع"],
        pythonCode: "d = int(input('أيام: '))\nh = int(input('ساعات: '))\nm = int(input('دقائق: '))\ns = int(input('ثواني: '))\ntotal = (d * 86400) + (h * 3600) + (m * 60) + s\nprint(f'{total} ثانية')",
        example: { input: "2, 5, 45, 35", output: "193535 ثانية" },
      },
      {
        id: 43,
        title: "تحويل الثواني إلى أيام/ساعات/دقائق/ثواني",
        description: "العكس: تحويل إجمالي الثواني إلى أيام وساعات ودقائق وثواني.",
        steps: ["أدخل الثواني", "احسب الأيام = ثواني // 86400", "الباقي = ثواني % 86400", "كرر للساعات والدقائق", "اطعب بالصيغة d:h:m:s"],
        pythonCode: "total = int(input('الثواني: '))\ndays = total // 86400\nr = total % 86400\nhours = r // 3600\nr = r % 3600\nminutes = r // 60\nseconds = r % 60\nprint(f'{days}:{hours}:{minutes}:{seconds}')",
        example: { input: "193535", output: "2:5:45:35" },
      },
    ],
    tips: [
      { type: "info", title: "القوائم (Lists)", content: "القائمة في بايثون: ['أ','ب','ج']. نصل للعنصر بالفهرس: list[0] = 'أ' (يبدأ من 0)." },
      { type: "info", title: "// و %", content: "// قسمة بدون كسر (Floor). % باقي القسمة (Mod). أساسيان في تحويلات الوقت." },
    ],
  },

  // ===== Lesson 9 =====
  {
    id: 9,
    slug: "atm-loans",
    title: "المسائل التطبيقية: الصراف الآلي والقروض",
    subtitle: "محاكاة أنظمة حقيقية",
    badge: "تطبيقات",
    accent: "emerald",
    difficulty: "متقدم",
    duration: "120 دقيقة",
    objectives: [
      "أن يحاكي نظام صراف آلي بسيط",
      "أن يحسب القروض والأقساط",
      "أن يطبق حلقات التحقق بكلمات سر",
    ],
    theorySections: [
      {
        title: "نظام التحقق بكلمة السر",
        content: [
          "الصراف الآلي يطلب كلمة سر ويتحقق منها.",
          "إذا خاطئة، يطلب إعادة الإدخال.",
          "بعد عدد محدد من المحاولات الخاطئة، يقفل البطاقة.",
          "هذا يطبق مفهوم: حلقة + عداد + شرط الخروج.",
        ],
      },
    ],
    problems: [
      {
        id: 49,
        title: "الصراف الآلي البسيط",
        description: "اكتب برنامج يطلب كلمة سر (1234). إذا صحيحة يعرض الرصيد (7500) وإلا يطلب إعادة الإدخال.",
        steps: ["أدخل كلمة السر", "إذا = 1234 → اطبع الرصيد", "وإلا → 'خاطئة' وأعد الإدخال"],
        flowchart: {
          nodes: [
            { id: "s", type: "start", text: "Start", x: 50, y: 8 },
            { id: "in", type: "input", text: "Read PIN", x: 50, y: 25 },
            { id: "d", type: "decision", text: "PIN = 1234 ?", x: 50, y: 50 },
            { id: "ok", type: "output", text: "Balance = 7500", x: 15, y: 75 },
            { id: "wrong", type: "output", text: "Wrong PIN", x: 85, y: 75 },
            { id: "e", type: "end", text: "End", x: 15, y: 95 },
          ],
          edges: [
            { from: "s", to: "in" },
            { from: "in", to: "d" },
            { from: "d", to: "ok", label: "نعم" },
            { from: "d", to: "wrong", label: "لا" },
            { from: "ok", to: "e" },
            { from: "wrong", to: "in" },
          ],
        },
        pythonCode: "balance = 7500\nwhile True:\n    pin = input('كلمة السر: ')\n    if pin == '1234':\n        print(f'رصيدك هو: {balance}')\n        break\n    else:\n        print('الرقم السري خاطئ')",
        example: { input: "5151, 1234", output: "الرقم السري خاطئ\nرصيدك هو: 7500" },
      },
      {
        id: 50,
        title: "الصراف الآلي مع قفل البطاقة",
        description: "نفس المسألة لكن بعد 3 محاولات خاطئة، اطبع 'تم سحب البطاقة'.",
        steps: ["عدّاد المحاولات = 0", "أدخل كلمة السر", "إذا صحيحة → اطبع الرصيد", "وإلا → زد العدّاد", "إذا العدّاد = 3 → 'تم سحب البطاقة'"],
        pythonCode: "balance = 7500\nfailed = 0\nwhile True:\n    pin = input('كلمة السر: ')\n    if pin == '1234':\n        print(f'رصيدك هو: {balance}')\n        break\n    else:\n        print('الرقم السري خاطئ')\n        failed += 1\n        if failed == 3:\n            print('تم سحب البطاقة')\n            break",
        example: { input: "1111, 2222, 3333", output: "الرقم السري خاطئ\nالرقم السري خاطئ\nالرقم السري خاطئ\nتم سحب البطاقة" },
      },
      {
        id: 47,
        title: "عدد الدفعات الشهرية",
        description: "في مثال حسابي دون فوائد يُدفع مبلغ ثابت كل شهر. احسب عدد الدفعات مع احتساب آخر دفعة جزئية.",
        steps: ["اقرأ المبلغ والدفعة الشهرية", "تحقق أن المبلغ غير سالب والدفعة موجبة", "اقسم المبلغ على الدفعة وقرّب الناتج إلى العدد الصحيح الأعلى", "اطبع عدد الدفعات"],
        pythonCode: "from math import ceil\namount = float(input('المبلغ: '))\npayment = float(input('الدفعة الشهرية: '))\nif amount < 0 or payment <= 0:\n    print('تحقق من المبلغ وقيمة الدفعة')\nelse:\n    print(ceil(amount / payment))",
        example: { input: "5100, 500", output: "11" },
      },
      {
        id: 48,
        title: "حساب القسط الشهري",
        description: "في مثال حسابي دون فوائد، اقسم المبلغ على عدد أشهر صحيح موجب.",
        steps: ["اقرأ المبلغ وعدد الأشهر", "تحقّق أن المبلغ غير سالب وأن عدد الأشهر موجب", "اطبع المبلغ مقسومًا على عدد الأشهر إلى منزلتين عشريتين"],
        pythonCode: "amount = float(input('المبلغ: '))\nmonths = int(input('عدد الأشهر: '))\nif amount < 0 or months <= 0:\n    print('تحقق من المبلغ وعدد الأشهر')\nelse:\n    print(f'{amount / months:.2f}')",
        example: { input: "5000, 10", output: "500.00" },
      },
      {
        id: 25,
        title: "التحقق من العمر مع إعادة",
        description: "اطلب العمر. إذا بين 18 و45 اطبع 'Valid' وإلا 'Invalid' وأعد الطلب.",
        steps: ["أدخل العمر", "إذا 18 ≤ عمر ≤ 45 → 'Valid Age'", "وإلا → 'Invalid Age' وأعد الإدخال"],
        pythonCode: "while True:\n    age = int(input('العمر: '))\n    if age >= 18 and age <= 45:\n        print('Valid Age')\n        break\n    else:\n        print('Invalid Age')",
        example: { input: "10, 30", output: "Invalid Age\nValid Age" },
      },
      {
        id: 35,
        title: "حساب العملات",
        description: "اقرأ عدد البنسات والنيكل والدايم والأرباع والدولارات واحسب الإجمالي.",
        steps: ["أدخل عدد كل عملة", "البنسات = بنس×1 + نيكل×5 + دايم×10 + ربع×25 + دولار×100", "الدولارات = البنسات / 100", "اطبع"],
        pythonCode: "p = int(input('بنس: '))\nn = int(input('نيكل: '))\nd = int(input('دايم: '))\nq = int(input('أرباع: '))\ndl = int(input('دولارات: '))\ntotal_p = p + n*5 + d*10 + q*25 + dl*100\ntotal_d = total_p / 100\nprint(f'{total_p} بنس = {total_d} دولار')",
        example: { input: "5, 5, 5, 5, 5", output: "705 بنس = 7.05 دولار" },
      },
    ],
    tips: [
      { type: "warning", title: "كلمة السر", content: "في برامج حقيقية، لا تخزن كلمات السر كنص عادي! هذا فقط للتعلم." },
      { type: "info", title: "while True", content: "while True تخلق حلقة لا نهائية. استخدم break للخروج عند تحقق الشرط." },
    ],
  },

  // ===== Lesson 10 =====
  {
    id: 10,
    slug: "review-projects",
    title: "مراجعة وتطبيقات شاملة",
    subtitle: "مراجعة كل ما تعلمته بمشاريع عملية",
    badge: "الختام",
    accent: "rose",
    difficulty: "متقدم",
    duration: "120 دقيقة",
    objectives: [
      "أن يراجع الطالب كل المفاهيم السابقة",
      "أن يحل مسائل شاملة تجمع عدة مفاهيم",
      "أن يبني مشاريع صغيرة بنفسه",
    ],
    theorySections: [
      {
        title: "ملخص ما تعلمناه",
        content: [
          "1. الإدخال والإخراج: input() و print()",
          "2. الشروط: if / elif / else مع AND و OR",
          "3. العمليات الحسابية: + - * / % ** //",
          "4. الحلقات: while و for مع range",
          "5. القوائم: الوصول بالفهرس والطرق الأساسية",
          "6. المسائل التطبيقية: صراف آلي، عمولات، فواتير",
        ],
      },
    ],
    problems: [
      {
        id: 31,
        title: "الأسس 2 و 3 و 4",
        description: "اكتب برنامج يحسب رقم مرفوع للأس 2 و 3 و 4.",
        steps: ["أدخل رقم", "احسب الأس 2 و 3 و 4", "اطبع النتائج"],
        pythonCode: "num = int(input('رقم: '))\nprint(f'الأس 2: {num ** 2}')\nprint(f'الأس 3: {num ** 3}')\nprint(f'الأس 4: {num ** 4}')",
        example: { input: "3", output: "الأس 2: 9\nالأس 3: 27\nالأس 4: 81" },
      },
      {
        id: 39,
        title: "حساب الباقي",
        description: "اقرأ الفاتورة والمدفوع واحسب الباقي.",
        steps: ["أدخل الفاتورة والمدفوع", "الباقي = المدفوع - الفاتورة", "اطبع الباقي"],
        pythonCode: "bill = float(input('الفاتورة: '))\npaid = float(input('المدفوع: '))\nchange = paid - bill\nprint(f'الباقي = {change}')",
        example: { input: "20, 50", output: "الباقي = 30.0" },
      },
      {
        id: 41,
        title: "تحويل الساعات لأسابيع وأيام",
        description: "حوّل الساعات إلى إجمالي الأيام وإجمالي الأسابيع. يعرض كل سطر الوحدة مستقلة إلى منزلتين عشريتين.",
        steps: ["أدخل عدد الساعات", "اقسم الساعات على 24 لحساب إجمالي الأيام", "اقسم الأيام على 7 لحساب إجمالي الأسابيع", "اعرض الإجماليين إلى منزلتين عشريتين"],
        pythonCode: "hours = float(input('عدد الساعات: '))\ndays = hours / 24\nweeks = days / 7\nprint(f'{weeks:.2f} أسابيع')\nprint(f'{days:.2f} أيام')",
        example: { input: "365", output: "2.17 أسابيع\n15.21 أيام" },
      },
    ],
    tips: [
      { type: "success", title: "تذكّر", content: "البرمجة مهارة تُكتسب بالممارسة. كل مسألة تحلها تجعلك أفضل!" },
      { type: "info", title: "خطوات حل أي مسألة", content: "1) افهم المسألة 2) ارسم المخطط الانسيابي 3) اكتب الكود 4) اختبر بأمثلة" },
    ],
  },
];

export function getPythonLessonById(id: number): PythonLesson | undefined {
  return pythonLessons.find((l) => l.id === id);
}

// Total problems count
pythonLessons.find(l => l.id === 10)!.problems.push(...additionalAlgorithmProblems);

export const totalProblems = pythonLessons.reduce((sum, l) => sum + l.problems.length, 0);
