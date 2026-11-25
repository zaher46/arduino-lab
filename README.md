# Arduino Lab

Arduino Lab is a teaching website for Arduino Uno beginners, especially Arabic-speaking children. It pairs guided lessons with experiments on physical circuits. It includes Arduino sessions, Arduino and mBlock examples, a Python and algorithms course, final projects, and a local classroom register. The interface supports Arabic and Turkish.

## Run locally on Windows

Install Node.js 22.13 or later (Node.js 24 LTS recommended). Open Command Prompt in the folder containing `package.json` and run:

```cmd
npm ci
npm run build
npm start
```

Open http://localhost:3000. For development with automatic reload, use `npm run dev` after installing dependencies.

The app creates an empty SQLite database at `db/custom.db` on first run. The local register keeps students, attendance, and progress by classroom. Keep its database and exported backups outside the published repository.

## التشغيل محليًا على ويندوز

ثبّت Node.js بإصدار 22.13 أو أحدث، ثم افتح CMD في المجلد الذي يحتوي على `package.json` ونفّذ الأوامر أعلاه بالترتيب. بعدها افتح http://localhost:3000. ابدأ من قسم الجلسات للدروس، أو افتح «الطلاب» لإنشاء صف وإضافة الطلاب.

يُنشئ الموقع سجلًا فارغًا في `db/custom.db` تلقائيًا. يُشغَّل سجل الطلاب محليًا عبر خادم Node.js.
