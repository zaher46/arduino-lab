export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FinalExam {
  courseId: "arduino" | "python";
  title: string;
  description: string;
  duration: number; // minutes
  passingScore: number; // percentage
  questions: ExamQuestion[];
}

export const finalExams: FinalExam[] = [
  {
    courseId: "arduino",
    title: "الامتحان النهائي - كورس الأردوينو",
    description: "امتحان شامل لكل ما تعلمته في الـ15 جلسة",
    duration: 30,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "ما هو الأردوينو؟",
        options: ["برنامج كمبيوتر فقط", "لوحة إلكترونية مفتوحة المصدر", "نوع من البطاريات", "لغة برمجة"],
        correctAnswer: 1,
        explanation: "الأردوينو لوحة إلكترونية مفتوحة المصدر تتفاعل مع العالم المحيط.",
      },
      {
        id: 2,
        question: "ماذا تعني الإشارة HIGH على منفذ رقمي؟",
        options: ["إطفاء", "إرسال 5 فولت = تشغيل", "انتظار", "إشارة تناظرية"],
        correctAnswer: 1,
        explanation: "HIGH تعني 5 فولت على المنفذ الرقمي، فيضيء الليد الموصول به.",
      },
      {
        id: 3,
        question: "لماذا نستخدم المقاومة مع الليد؟",
        options: ["لزيادة الجهد", "لتحديد التيار وحماية الليد", "لتغيير اللون", "لا فائدة لها"],
        correctAnswer: 1,
        explanation: "المقاومة تحدّ من التيار كي لا يحترق الليد.",
      },
      {
        id: 4,
        question: "ما الفرق بين التوالي والتوازي؟",
        options: ["لا فرق", "التوالي ينقطع بقطع واحدة، التوازي مستقل", "التوازي يحتاج مقاومة أكبر", "التوالي أسرع"],
        correctAnswer: 1,
        explanation: "في التوالي القطع على مسار واحد، في التوازي كل قطعة مستقلة.",
      },
      {
        id: 5,
        question: "كم لونًا نحصل عليه من RGB؟",
        options: ["3 فقط", "7 ألوان + الإطفاء", "ألوان لا نهائية", "لون واحد"],
        correctAnswer: 1,
        explanation: "3 قنوات بثلاث حالات تعطي 8 احتمالات: 7 ألوان + الإطفاء.",
      },
      {
        id: 6,
        question: "ما وظيفة حساس Ultrasonic؟",
        options: ["قياس الحرارة", "قياس المسافة بالأمواج الصوتية", "كشف الحركة", "كشف الضوء"],
        correctAnswer: 1,
        explanation: "يطلق موجة فوق صوتية وينتظر صدئها لحساب المسافة.",
      },
      {
        id: 7,
        question: "متى يعطي شرط AND نتيجة True؟",
        options: ["إذا تحقق شرط واحد", "إذا تحقق كلا الشرطين", "دائمًا", "إذا لم يتحقق أي منهما"],
        correctAnswer: 1,
        explanation: "AND يعطي True فقط إذا كان الشرطان كلاهما محققًا.",
      },
      {
        id: 8,
        question: "ما وظيفة الريليه (Relay)؟",
        options: ["قياس الحرارة", "مفتاح كهرومغناطيسي يتحكم بدائرة أعلى جهدًا", "حساس مسافة", "شاشة عرض"],
        correctAnswer: 1,
        explanation: "الريليه مفتاح كهرومغناطيسي يتحكم بأحمال أعلى جهدًا بإشارة 5V.",
      },
      {
        id: 9,
        question: "ما الفرق بين DC و Servo؟",
        options: ["لا فرق", "السيرفو يدور لزاوية محددة، DC يدور باستمرار", "السيرفو أبطأ فقط", "DC أقوى"],
        correctAnswer: 1,
        explanation: "السيرفو يدور لزاوية (0-180°) ويبقى ثابتًا، DC يدور باستمرار.",
      },
      {
        id: 10,
        question: "لماذا نحتاج درايفر بين الأردوينو ومحرك DC؟",
        options: ["لزيادة الجهد", "لأن المحرك يحتاج تيارًا أكبر مما يتحمله الأردوينو", "لا حاجة له", "لتغيير الاتجاه فقط"],
        correctAnswer: 1,
        explanation: "منفذ الأردوينو يعطي 40mA فقط، المحرك يحتاج مئات الملي أمبير.",
      },
    ],
  },
  {
    courseId: "python",
    title: "الامتحان النهائي - كورس بايثون والخوارزميات",
    description: "امتحان شامل لكل ما تعلمته في الـ10 دروس",
    duration: 30,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "ما هي الخوارزمية؟",
        options: ["برنامج كمبيوتر", "سلسلة خطوات مرتبة لحل مشكلة", "لغة برمجة", "نوع من البيانات"],
        correctAnswer: 1,
        explanation: "الخوارزمية سلسلة من الخطوات المرتبة للوصول إلى حل المشكلة.",
      },
      {
        id: 2,
        question: "أي رمز في المخطط الانسيابي يمثل القرار؟",
        options: ["مستطيل", "معين (diamond)", "بيضاوي", "متوازي أضلاع"],
        correctAnswer: 1,
        explanation: "المعين (diamond) يمثل قرارًا له نعم أو لا.",
      },
      {
        id: 3,
        question: "ما ناتج 10 % 3 في بايثون؟",
        options: ["3", "1", "3.33", "0"],
        correctAnswer: 1,
        explanation: "% يعطي باقي القسمة: 10 ÷ 3 = 3 وباقي 1.",
      },
      {
        id: 4,
        question: "ماذا تطبع: print('Hello' + ' ' + 'World')؟",
        options: ["Hello World", "Hello+World", "خطأ", "HelloWorld"],
        correctAnswer: 0,
        explanation: "+ يدمج النصوص: 'Hello' + ' ' + 'World' = 'Hello World'.",
      },
      {
        id: 5,
        question: "متى تنفذ جملة else؟",
        options: ["دائمًا", "عندما يكون شرط if خاطئًا", "قبل if", "بعد كل حلقة"],
        correctAnswer: 1,
        explanation: "else تنفذ عندما يكون شرط if غير محقق (False).",
      },
      {
        id: 6,
        question: "ما ناتج: for i in range(1, 5): print(i)؟",
        options: ["1 2 3 4 5", "1 2 3 4", "0 1 2 3 4", "5 4 3 2 1"],
        correctAnswer: 1,
        explanation: "range(1,5) يعطي 1 إلى 4 (لا يشمل 5).",
      },
      {
        id: 7,
        question: "ماذا تعني != في بايثون؟",
        options: ["يساوي", "لا يساوي", "أكبر من", "أصغر من"],
        correctAnswer: 1,
        explanation: "!= تعني لا يساوي (not equal).",
      },
      {
        id: 8,
        question: "كيف نحسب مساحة دائرة بنصف قطر r؟",
        options: ["π × r", "π × r²", "2 × π × r", "r²"],
        correctAnswer: 1,
        explanation: "مساحة الدائرة = π × r² حيث π ≈ 3.14.",
      },
      {
        id: 9,
        question: "ماذا تفعل دالة input()؟",
        options: ["تطبع نصًا", "تقرأ إدخال من المستخدم", "تحسب رقمًا", "تكرر الحلقة"],
        correctAnswer: 1,
        explanation: "input() تقرأ إدخالًا من المستخدم كنص.",
      },
      {
        id: 10,
        question: "ما العدد الأولي؟",
        options: ["يقبل القسمة على أي عدد", "يقبل القسمة على 1 ونفسه فقط", "عدد زوجي", "عدد أكبر من 100"],
        correctAnswer: 1,
        explanation: "العدد الأولي يقبل القسمة على 1 وعلى نفسه فقط.",
      },
    ],
  },
];

export function getExamByCourse(course: string): FinalExam | undefined {
  return finalExams.find(e => e.courseId === course);
}
