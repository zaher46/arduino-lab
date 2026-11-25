// Turkish teaching edition: concise, independently readable lessons.
// Stable IDs and technical metadata are shared with the Arabic curriculum.
import { sessions, type Session, type ComponentKey } from './sessions';
import { pythonLessons, type PythonLesson, type AlgorithmProblem } from './python-course';
import { projects, type Project } from './projects';
export const difficultyTr: Record<string,string> = {'مبتدئ':'Başlangıç','متوسط':'Orta','متقدم':'İleri'};
export const componentLabelsTr: Record<ComponentKey,string> = {
 arduino:'Arduino kartı',breadboard:'Deney tahtası',led:'LED',ledRed:'Kırmızı LED',ledGreen:'Yeşil LED',ledBlue:'Mavi LED',resistor:'Direnç',pushButton:'Buton',buzzer:'Buzzer',rgbLed:'RGB LED',sevenSegment:'7 segment gösterge',lcd:'LCD ekran',irSensor:'IR sensörü',ultrasonic:'Ultrasonik sensör',soundSensor:'Ses sensörü',dht:'Sıcaklık ve nem sensörü',ldr:'LDR ışık sensörü',relay:'Röle',potentiometer:'Potansiyometre',joystick:'Joystick',dcMotor:'DC motor',servo:'Servo motor',stepper:'Adım motoru',jumperWires:'Bağlantı kabloları',battery:'Pil'
};
// id: [title, task, explicit algorithm steps]
const problemText: Record<number,[string,string,string]> = {
1:['Adını yazdır','Ekrana sabit bir ad yazdır.','Başla|Ad metnini print ile yazdır|Bitir'],
2:['Adı kullanıcıdan al','Kullanıcının adını oku ve aynen yazdır.','Adı input ile oku|name değişkenine kaydet|print(name) çalıştır'],
3:['Tek mi çift mi?','Bir tam sayının 2 ile bölümünden kalanı kullan.','Tam sayıyı oku|num % 2 hesapla|Kalan 0 ise Çift, değilse Tek yazdır'],
4:['İki koşulu birlikte kontrol et','Kaynak alıştırmasında yaş 21’den büyük ve ehliyet varsa Kabul yazdırılır. Bu yalnızca mantık alıştırmasıdır.','Yaşı ve ehliyet durumunu oku|age > 21 and has_license koşulunu değerlendir|Kabul veya Ret yazdır'],
5:['AND ve OR karşılaştırması','Özel izin veya yaş/ehliyet koşulunu incele. Kaynaktaki bu senaryo gerçek işe alım önerisi değil, OR mantığı alıştırmasıdır.','Girdileri oku|Yaş ve ehliyet koşullarını AND ile bağla|Özel izni OR ile bağla|Sonucu yazdır'],
6:['Ad ve soyadı birleştir','Adı ve soyadı araya bir boşluk koyarak birleştir.','Adı oku|Soyadı oku|first + boşluk + last oluştur|Tam adı yazdır'],
7:['Sayının yarısı','Bir sayıyı 2’ye böl; sonuç ondalıklı olabilir.','Sayıyı oku|half = num / 2 hesapla|Sonucu yazdır'],
8:['Geçti mi kaldı mı?','Not en az 50 ise Geçti, değilse Kaldı yazdır.','Notu oku|Not >= 50 koşulunu denetle|İki sonuçtan birini yazdır'],
9:['Üç sayının toplamı','Üç sayıyı okuyup toplamını bul.','Üç sayıyı oku|n1 + n2 + n3 hesapla|Toplamı yazdır'],
10:['Üç notun ortalaması','Üç notun toplamını 3’e böl.','Üç notu oku|Toplamı hesapla|Toplam / 3 hesapla|Ortalamayı yazdır'],
11:['Ortalama ve başarı','Üç notun ortalamasını bul ve 50 eşiğini kontrol et.','Üç notu oku|Ortalamayı hesapla ve yazdır|Ortalama >= 50 ise Geçti, değilse Kaldı yazdır'],
12:['İki sayının büyüğü','İki sayıyı karşılaştır; eşitlik durumunu da dene.','İki sayıyı oku|İlk sayı büyükse onu seç|Değilse ikinciyi seç|Sonucu yazdır'],
13:['Üç sayının büyüğü','Üç sayının en büyüğünü bul.','Üç sayıyı oku|Birinciyi diğer ikisiyle karşılaştır|İkinciyi diğer ikisiyle karşılaştır|En büyük değeri yazdır'],
14:['İki değeri değiştir','a ve b değerlerini geçici değişken yardımıyla değiştir.','a ve b değerlerini oku ve yazdır|temp = a|a = b|b = temp|Yeni değerleri yazdır'],
15:['Dikdörtgenin alanı','Pozitif uzunluk ve genişlikten alanı bul.','Uzunluğu ve genişliği oku|Alan = uzunluk × genişlik|Alanı birim kare olarak yazdır'],
16:['Köşegenden dikdörtgen alanı','Bir kenar a, köşegen d ise alan a × √(d² − a²) olur; d > a > 0 gerekir.','a ve d değerlerini oku|d > a > 0 koşulunu doğrula|Diğer kenarı karekökle bul|Alanı yazdır'],
17:['Üçgenin alanı','Taban ve o tabana ait dik yükseklikle alanı bul.','Taban a ve yükseklik h oku|Alan = a × h / 2|Alanı yazdır'],
18:['Yarıçaptan daire alanı','r yarıçaplı dairenin alanı πr² olur.','Yarıçapı oku|Alan = 3.14 × r²|Alanı yazdır'],
19:['Çaptan daire alanı','Çap yarıçapın iki katıdır; alan πd²/4 olur.','Çapı oku|Alan = 3.14 × d² / 4|Alanı yazdır'],
20:['Kare içine çizilen daire','Karenin kenarı dairenin çapına eşittir.','Kare kenarı a değerini oku|r = a / 2 hesapla|Alan = π × r²|Alanı yazdır'],
21:['Çevreden daire alanı','Çevresi L olan dairenin alanını L²/(4π) ile hesapla.','Çevre uzunluğunu oku|Alan = L² / (4 × π)|Alanı yazdır'],
22:['İkizkenar üçgende içteğet daire','Eş kenarlar a, taban b olsun. a > 0 ve 0 < b < 2a için alan πb²/4 × (2a−b)/(2a+b) olur.','a ve b değerlerini oku|Üçgen eşitsizliğini doğrula|Verilen alan formülünü uygula|Sonucu yazdır'],
23:['Üçgenin çevrel daire alanı','p=(a+b+c)/2, üçgen alanı K=√(p(p−a)(p−b)(p−c)), yarıçap R=abc/(4K), daire alanı πR². Üçgenin dik olması şart değildir.','Üç kenarı oku; pozitiflik ve üçgen eşitsizliklerini doğrula|Heron formülüyle K hesapla|R = abc / (4K)|πR² yazdır'],
24:['Yaş aralığını denetle','18 ve 45 dahil yaş aralığını kontrol et.','Yaşı oku|18 <= age <= 45 koşulunu değerlendir|Geçerli yaş veya Geçersiz yaş yazdır'],
25:['Geçerli girdi gelene kadar sor','18–45 aralığı dışında yaş girilirse tekrar sor.','Yaşı oku|Aralık dışındaysa uyarıp başa dön|Geçerliyse sonucu yazdır ve bitir'],
26:['1’den N’ye say','Kaynak soru 26: 1’den pozitif N sayısına kadar artarak yazdır.','N oku|Sayaç i=1 olsun|i <= N oldukça i yazdır|i değerini 1 artır'],
27:['N’den 1’e say','Kaynak soru 27: N’den 1’e azalarak yazdır.','N oku|N >= 1 oldukça N yazdır|N değerini 1 azalt|Koşul yanlışsa bitir'],
28:['Tek sayıların toplamı','1’den N’ye kadar tek sayıları topla.','N oku ve total=0 yap|1–N arasında dolaş|i % 2 != 0 ise toplama ekle|Toplamı yazdır'],
29:['Çift sayıların toplamı','1’den N’ye kadar çift sayıları topla.','N oku ve total=0 yap|1–N arasında dolaş|i % 2 == 0 ise toplama ekle|Toplamı yazdır'],
30:['Faktöriyel','Negatif olmayan tam sayı N için faktöriyeli bul. 0! = 1 olur.','Negatif olmayan N oku|Çarpımı 1 ile başlat|1’den N’ye kadar her sayıyla çarp|Sonucu yazdır'],
31:['İkinci, üçüncü ve dördüncü kuvvet','Sayının karesini, küpünü ve dördüncü kuvvetini yazdır.','Sayıyı oku|num ** 2 hesapla|num ** 3 hesapla|num ** 4 hesapla|Sonuçları yazdır'],
32:['Tekrarlı çarpımla üs','Tam sayı taban ve negatif olmayan tam sayı üs için sonucu bul.','Taban ve üs oku|Sonucu 1 ile başlat|Üs kadar tekrar ederek tabanla çarp|Üs 0 ise sonuç 1 kalır'],
33:['Harf notu','90–100 A, 80–89 B, 70–79 C, 60–69 D, 50–59 E; daha düşük not F olur.','0–100 arası notu oku|Koşulları büyük eşikten küçüğe sırala|İlk doğru aralığın harfini yazdır'],
34:['Komisyon hesabı','Kaynak tablosu: ≥1,000,000 için %1; ≥500,000 için %2; ≥100,000 için %3; ≥50,000 için %5; diğerleri 0.','Satış toplamını oku|Eşikleri büyükten küçüğe denetle|Komisyon = satış × oran|Sonucu yazdır'],
35:['Madeni paraları topla','1,5,10,25 ve 100 cent değerindeki paraları topla.','Her para türünün adedini oku|Adedi değeriyle çarp|Cent tutarlarını topla|100’e bölerek dolar değerini göster'],
36:['Basit hesap makinesi','İki sayı ve +,−,*,/ işlemlerinden birini oku. Sıfıra bölmeyi reddet.','İki sayı ve işlemi oku|İşleme göre uygun dalı seç|Bölmeden önce bölenin 0 olmadığını denetle|Sonucu veya hatayı yazdır'],
37:['Durdurma değeriyle toplam','-99 girilene kadar sayıları topla. -99 toplama dahil değildir.','Toplamı 0 yap|Bir sayı oku|-99 ise döngüden çık|Değilse toplama ekle ve tekrar oku|Toplamı yazdır'],
38:['Asal sayı denetimi','Asal sayı 1’den büyük, yalnız 1’e ve kendisine tam bölünen tam sayıdır.','Sayıyı oku|2’den küçükse asal değil|2’den başlayarak bölenleri dene|Bir bölen varsa asal değil|Hiç bölen yoksa asal'],
39:['Para üstü','Ödenen tutardan faturayı çıkar. Negatif sonuç kalan borcu gösterir.','Faturayı ve ödeneni oku|Fark = ödenen − fatura|Sonucu yorumla'],
40:['Hizmet ve vergi ekle','Önce %10 hizmet, ardından yeni tutara %16 vergi ekle. Bu güncel vergi kuralı değil, kaynak alıştırmasıdır.','Faturayı oku|1.10 ile çarp|Yeni tutarı 1.16 ile çarp|Toplamı yazdır'],
41:['Saatten gün ve hafta','Saati 24’e bölerek toplam günü, 168’e bölerek toplam haftayı bul.','Saati oku|Gün = saat / 24|Hafta = gün / 7|Kesirli sonuçları da göster'],
42:['Süreyi saniyeye dönüştür','Gün, saat, dakika ve saniyeyi toplam saniyede birleştir.','Değerleri oku|Günü 86400, saati 3600, dakikayı 60 ile çarp|Saniyeyi ekle|Toplamı yazdır'],
43:['Saniyeyi parçalara ayır','Toplam saniyeyi gün, saat, dakika ve saniye olarak çöz.','86400 ile tam bölüm ve kalan al|Kalanı 3600 ile böl|Yeni kalanı 60 ile böl|Son kalan saniyedir'],
44:['Günün adını bul','Kaynak sırası: 1=Pazar, 2=Pazartesi, …, 7=Cumartesi.','1–7 arasında gün oku|Aralık dışıysa tekrar sor|day−1 indeksindeki adı yazdır'],
45:['Ayın adını bul','1=Ocak, …, 12=Aralık eşlemesini kullan.','1–12 arasında ay oku|Aralık dışıysa tekrar sor|m−1 indeksindeki adı yazdır'],
46:['A’dan Z’ye harfler','65–90 karakter kodlarını chr ile harfe dönüştür.','65’ten 90’a kadar dolaş|chr(i) hesapla|Harfleri sırayla yazdır'],
47:['Ödeme süresini hesapla','Faizsiz örnekte tutarı pozitif aylık ödemeye böl ve kısmi ayı bir tam taksit ayına yuvarla.','Toplamı ve aylık ödemeyi oku|Ödemenin pozitif olduğunu denetle|Toplam / aylık ödeme hesapla ve math.ceil ile yukarı yuvarla|Ay sayısını yazdır'],
48:['Aylık ödemeyi hesapla','Faizsiz modelde toplamı pozitif ay sayısına böl.','Toplamı ve ay sayısını oku|Ay sayısını doğrula|Aylık = toplam / ay|Sonucu yazdır'],
49:['PIN doğrulama simülasyonu','Deneme PIN’i 1234 gelene kadar sor ve örnek bakiyeyi göster. Gerçek banka uygulaması değildir.','PIN’i metin olarak oku|1234 ile karşılaştır|Yanlışsa tekrar sor|Doğruysa 7500 bakiyeyi göster ve bitir'],
50:['Üç deneme sınırı','Üçüncü yanlış PIN denemesinden sonra simülasyonu kilitle.','Yanlış sayacını 0 yap|PIN oku|Doğruysa bakiyeyi göster ve bitir|Yanlışsa sayacı artır|Sayaç 3 ise kilitle; değilse yeniden sor']
};
type WorkedExample = { pythonCode: string; input: string; output: string };
const workedExamples: Record<number, WorkedExample> = {
  1: {
    pythonCode: `print('Saeed')`,
    input: "",
    output: "Saeed",
  },
  2: {
    pythonCode: `name = input('Adını gir: ')
print(name)`,
    input: "Deniz",
    output: "Deniz",
  },
  3: {
    pythonCode: `num = int(input('Sayı gir: '))
if num % 2 == 0:
    print('Çift')
else:
    print('Tek')`,
    input: "10",
    output: "Çift",
  },
  4: {
    pythonCode: `age = int(input('Yaş: '))
has_license = input('Ehliyet var mı? (evet/hayır): ') == 'evet'
if age > 21 and has_license:
    print('Kabul')
else:
    print('Ret')`,
    input: "25, evet",
    output: "Kabul",
  },
  5: {
    pythonCode: `age = int(input('Yaş: '))
has_license = input('Ehliyet var mı? (evet/hayır): ') == 'evet'
has_rec = input('Özel izin var mı? (evet/hayır): ') == 'evet'
if has_rec or (age > 21 and has_license):
    print('Kabul')
else:
    print('Ret')`,
    input: "19, hayır, evet",
    output: "Kabul",
  },
  6: {
    pythonCode: `first = input('Ad: ')
last = input('Soyad: ')
full = first + ' ' + last
print(full)`,
    input: "Deniz, Kaya",
    output: "Deniz Kaya",
  },
  7: {
    pythonCode: `num = int(input('Sayı: '))
half = num / 2
print(f'{num} sayısının yarısı {half}')`,
    input: "60",
    output: "60 sayısının yarısı 30.0",
  },
  8: {
    pythonCode: `mark = int(input('Notu gir: '))
if mark >= 50:
    print('Geçti')
else:
    print('Kaldı')`,
    input: "45",
    output: "Kaldı",
  },
  9: {
    pythonCode: `n1 = int(input('Sayı 1: '))
n2 = int(input('Sayı 2: '))
n3 = int(input('Sayı 3: '))
print(n1 + n2 + n3)`,
    input: "10, 20, 30",
    output: "60",
  },
  10: {
    pythonCode: `m1 = int(input('Not 1: '))
m2 = int(input('Not 2: '))
m3 = int(input('Not 3: '))
avg = (m1 + m2 + m3) / 3
print(avg)`,
    input: "90, 80, 70",
    output: "80.0",
  },
  11: {
    pythonCode: `m1 = int(input('Not 1: '))
m2 = int(input('Not 2: '))
m3 = int(input('Not 3: '))
avg = (m1 + m2 + m3) / 3
print(avg)
if avg >= 50:
    print('Geçti')
else:
    print('Kaldı')`,
    input: "90, 80, 70",
    output: "80.0\nGeçti",
  },
  12: {
    pythonCode: `num1 = int(input('Birinci sayı: '))
num2 = int(input('İkinci sayı: '))
if num1 > num2:
    print(num1)
else:
    print(num2)`,
    input: "10, 20",
    output: "20",
  },
  13: {
    pythonCode: `n1 = int(input('Sayı 1: '))
n2 = int(input('Sayı 2: '))
n3 = int(input('Sayı 3: '))
if n1 >= n2 and n1 >= n3:
    print(n1)
elif n2 >= n1 and n2 >= n3:
    print(n2)
else:
    print(n3)`,
    input: "20, 10, 30",
    output: "30",
  },
  14: {
    pythonCode: `a = int(input('a: '))
b = int(input('b: '))
print(f'Önce: {a}, {b}')
temp = a
a = b
b = temp
print(f'Sonra: {a}, {b}')`,
    input: "5, 10",
    output: "Önce: 5, 10\nSonra: 10, 5",
  },
  15: {
    pythonCode: `length = float(input('Uzunluk: '))
width = float(input('Genişlik: '))
area = length * width
print(f'Alan = {area}')`,
    input: "10, 20",
    output: "Alan = 200.0",
  },
  16: {
    pythonCode: `import math

a = float(input('Kenar: '))
d = float(input('Köşegen: '))
if d > a > 0:
    area = a * math.sqrt(d*d - a*a)
    print(f'Alan = {area:.3f}')
else:
    print('Köşegen kenardan büyük, kenar pozitif olmalı')`,
    input: "5, 40",
    output: "Alan = 198.431",
  },
  17: {
    pythonCode: `a = float(input('Taban: '))
h = float(input('Yükseklik: '))
area = (a / 2) * h
print(f'Alan = {area}')`,
    input: "10, 8",
    output: "Alan = 40.0",
  },
  18: {
    pythonCode: `r = float(input('Yarıçap: '))
pi = 3.14
area = pi * (r ** 2)
print(f'Alan = {area}')`,
    input: "5",
    output: "Alan = 78.5",
  },
  19: {
    pythonCode: `d = float(input('Çap: '))
pi = 3.14
area = (pi * d * d) / 4
print(f'Alan = {area}')`,
    input: "10",
    output: "Alan = 78.5",
  },
  20: {
    pythonCode: `import math
a = float(input('Kare kenarı: '))
if a > 0:
    print(math.pi * a*a / 4)
else:
    print('Pozitif kenar gerekli')`,
    input: "2",
    output: "3.141592653589793",
  },
  21: {
    pythonCode: `import math
L = float(input('Çevre: '))
if L > 0:
    print(L*L/(4*math.pi))
else:
    print('Pozitif çevre gerekli')`,
    input: "6.283185307179586",
    output: "3.141592653589793",
  },
  22: {
    pythonCode: `import math
a = float(input('Eş kenar a: '))
b = float(input('Taban b: '))
if a > 0 and 0 < b < 2*a:
    print(math.pi*b*b/4*(2*a-b)/(2*a+b))
else:
    print('Geçersiz üçgen')`,
    input: "5, 6",
    output: "7.0685834705770345",
  },
  23: {
    pythonCode: `import math
a = float(input('a: '))
b = float(input('b: '))
c = float(input('c: '))
if min(a,b,c)>0 and a+b>c and a+c>b and b+c>a:
    p = (a+b+c)/2
    K = math.sqrt(p*(p-a)*(p-b)*(p-c))
    R = a*b*c/(4*K)
    print(math.pi*R*R)
else:
    print('Geçersiz üçgen')`,
    input: "3, 4, 5",
    output: "19.634954084936208",
  },
  24: {
    pythonCode: `age = int(input('Yaş: '))
if age >= 18 and age <= 45:
    print('Geçerli yaş')
else:
    print('Geçersiz yaş')`,
    input: "30",
    output: "Geçerli yaş",
  },
  25: {
    pythonCode: `while True:
    age = int(input('Yaş: '))
    if age >= 18 and age <= 45:
        print('Geçerli yaş')
        break
    else:
        print('Geçersiz yaş')`,
    input: "10, 30",
    output: "Geçersiz yaş\nGeçerli yaş",
  },
  26: {
    pythonCode: `n = int(input('N: '))
for i in range(1,n+1):
    print(i)`,
    input: "3",
    output: "1\n2\n3",
  },
  27: {
    pythonCode: `n = int(input('N: '))
while n >= 1:
    print(n)
    n -= 1`,
    input: "3",
    output: "3\n2\n1",
  },
  28: {
    pythonCode: `num = int(input('Sayı: '))
total = 0
for i in range(1, num + 1):
    if i % 2 != 0:
        total += i
print(total)`,
    input: "10",
    output: "25",
  },
  29: {
    pythonCode: `num = int(input('Sayı: '))
total = 0
for i in range(1, num + 1):
    if i % 2 == 0:
        total += i
print(total)`,
    input: "10",
    output: "30",
  },
  30: {
    pythonCode: `n = int(input('Sayı: '))
if n < 0:
    print('Negatif sayıların faktöriyeli bu tanımda yoktur')
else:
    product = 1
    for i in range(1, n + 1):
        product *= i
    print(product)`,
    input: "0",
    output: "1",
  },
  31: {
    pythonCode: `num = int(input('Sayı: '))
print(f'Üs 2: {num ** 2}')
print(f'Üs 3: {num ** 3}')
print(f'Üs 4: {num ** 4}')`,
    input: "3",
    output: "Üs 2: 9\nÜs 3: 27\nÜs 4: 81",
  },
  32: {
    pythonCode: `base = int(input('Taban: '))
power = int(input('Üs: '))
if power < 0:
    print('Negatif olmayan üs gerekli')
else:
    result = 1
    for i in range(power):
        result *= base
    print(result)`,
    input: "2, 4",
    output: "16",
  },
  33: {
    pythonCode: `grade = int(input('Not: '))
if not 0 <= grade <= 100:
    print('Not 0–100 arasında olmalı')
elif grade >= 90:
    print('A')
elif grade >= 80:
    print('B')
elif grade >= 70:
    print('C')
elif grade >= 60:
    print('D')
elif grade >= 50:
    print('E')
else:
    print('F')`,
    input: "95",
    output: "A",
  },
  34: {
    pythonCode: `sales = float(input('Toplam satış: '))
if sales >= 1000000:
    rate = 0.01
elif sales >= 500000:
    rate = 0.02
elif sales >= 100000:
    rate = 0.03
elif sales >= 50000:
    rate = 0.05
else:
    rate = 0
commission = sales * rate
print(f'Komisyon = {commission}')`,
    input: "110000",
    output: "Komisyon = 3300.0",
  },
  35: {
    pythonCode: `p = int(input('cent: '))
n = int(input('5 cent: '))
d = int(input('10 cent: '))
q = int(input('25 cent: '))
dl = int(input('dolar adedi: '))
total_p = p + n*5 + d*10 + q*25 + dl*100
total_d = total_p / 100
print(f'{total_p} cent = {total_d} dolar')`,
    input: "5, 5, 5, 5, 5",
    output: "705 cent = 7.05 dolar",
  },
  36: {
    pythonCode: `n1 = float(input('Sayı 1: '))
n2 = float(input('Sayı 2: '))
op = input('İşlem (+,-,*,/): ')
if op == '+':
    print(n1 + n2)
elif op == '-':
    print(n1 - n2)
elif op == '*':
    print(n1 * n2)
elif op == '/':
    if n2 == 0:
        print('Sıfıra bölünemez')
    else:
        print(n1 / n2)
else:
    print('Geçersiz işlem')`,
    input: "10, 20, *",
    output: "200.0",
  },
  37: {
    pythonCode: `total = 0
while True:
    num = int(input('Sayı (-99 bitirmek için): '))
    if num == -99:
        break
    total += num
print(total)`,
    input: "10, 20, 30, 40, -99",
    output: "100",
  },
  38: {
    pythonCode: `n = int(input('Tam sayı: '))
prime = n >= 2
d = 2
while prime and d*d <= n:
    if n % d == 0:
        prime = False
    d += 1
if prime:
    print('Asal')
else:
    print('Asal değil')`,
    input: "5",
    output: "Asal",
  },
  39: {
    pythonCode: `bill = float(input('Fatura: '))
paid = float(input('Ödenen: '))
change = paid - bill
print(f'Fark = {change}')`,
    input: "20, 50",
    output: "Fark = 30.0",
  },
  40: {
    pythonCode: `bill = float(input('Fatura tutarı: '))
total = bill * 1.10  # %10 hizmet
total = total * 1.16  # %16 vergi
print(f'Toplam = {total:.2f}')`,
    input: "100",
    output: "Toplam = 127.60",
  },
  41: {
    pythonCode: `hours = float(input('Saat sayısı: '))
days = hours / 24
weeks = days / 7
print(f'{weeks:.2f} hafta')
print(f'{days:.2f} gün')`,
    input: "365",
    output: "2.17 hafta\n15.21 gün",
  },
  42: {
    pythonCode: `d = int(input('gün: '))
h = int(input('saat: '))
m = int(input('dakika: '))
s = int(input('saniye: '))
total = (d * 86400) + (h * 3600) + (m * 60) + s
print(f'{total} saniye')`,
    input: "2, 5, 45, 35",
    output: "193535 saniye",
  },
  43: {
    pythonCode: `total = int(input('Saniye: '))
days = total // 86400
r = total % 86400
hours = r // 3600
r = r % 3600
minutes = r // 60
seconds = r % 60
print(f'{days}:{hours}:{minutes}:{seconds}')`,
    input: "193535",
    output: "2:5:45:35",
  },
  44: {
    pythonCode: `while True:
    day = int(input('Gün numarası (1-7): '))
    if day < 1 or day > 7:
        print('Geçersiz gün')
        continue
    days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi']
    print(days[day - 1])
    break`,
    input: "6",
    output: "Cuma",
  },
  45: {
    pythonCode: `while True:
    m = int(input('Ay numarası (1-12): '))
    if m < 1 or m > 12:
        print('Geçersiz ay')
        continue
    months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
    print(months[m - 1])
    break`,
    input: "6",
    output: "Haziran",
  },
  46: {
    pythonCode: `for i in range(65, 91):
    print(chr(i), end=' ')`,
    input: "",
    output: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
  },
  47: {
    pythonCode: `import math

amount = float(input('Toplam tutar: '))
monthly = float(input('Aylık ödeme: '))
if amount >= 0 and monthly > 0:
    print(f'{math.ceil(amount / monthly)} ay')
else:
    print('Tutar negatif olamaz ve ödeme pozitif olmalı')`,
    input: "5100, 500",
    output: "11 ay",
  },
  48: {
    pythonCode: `amount = float(input('Toplam tutar: '))
months = int(input('Ay sayısı: '))
if amount >= 0 and months > 0:
    print(f'Aylık ödeme = {amount / months:.2f}')
else:
    print('Tutar negatif olamaz ve ay sayısı pozitif olmalı')`,
    input: "5000, 10",
    output: "Aylık ödeme = 500.00",
  },
  49: {
    pythonCode: `balance = 7500
while True:
    pin = input('PIN: ')
    if pin == '1234':
        print(f'Bakiyen: {balance}')
        break
    else:
        print('Yanlış PIN')`,
    input: "5151, 1234",
    output: "Yanlış PIN\nBakiyen: 7500",
  },
  50: {
    pythonCode: `balance = 7500
failed = 0
while True:
    pin = input('PIN: ')
    if pin == '1234':
        print(f'Bakiyen: {balance}')
        break
    else:
        print('Yanlış PIN')
        failed += 1
        if failed == 3:
            print('Simülasyon kilitlendi')
            break`,
    input: "1111, 2222, 3333",
    output: "Yanlış PIN\nYanlış PIN\nYanlış PIN\nSimülasyon kilitlendi",
  },
};

const chartLabels: Record<string, string> = {
  "Start": "Başla",
  "End": "Bitir",
  "Print 'Saeed'": "“Saeed” yaz",
  "Enter Name": "Adı oku",
  "Print Name": "Adı yaz",
  "Enter Number": "Sayıyı oku",
  "Result = Num mod 2": "kalan = sayı % 2",
  "Result = 0 ?": "kalan = 0 mı?",
  "Print 'Even'": "“Çift” yaz",
  "Print 'ODD'": "“Tek” yaz",
  "Read Mark": "Notu oku",
  "Mark >= 50 ?": "not ≥ 50 mi?",
  "Print 'PASS'": "“Geçti” yaz",
  "Print 'Fail'": "“Kaldı” yaz",
  "Read Num1, Num2, Num3": "Üç sayıyı oku",
  "Sum = Num1 + Num2 + Num3": "toplam = n1 + n2 + n3",
  "Print Sum": "Toplamı yaz",
  "Read Num1, Num2": "İki sayıyı oku",
  "Num1 > Num2 ?": "n1 > n2 mi?",
  "Print Num1": "n1 yaz",
  "Print Num2": "n2 yaz",
  "Read Num": "N değerini oku",
  "Num >= 1 ?": "N ≥ 1 mi?",
  "Print Num": "N yaz",
  "Num = Num - 1": "N = N − 1",
  "Read PIN": "PIN oku",
  "PIN = 1234 ?": "PIN = “1234” mü?",
  "Balance = 7500": "Bakiyeyi yaz: 7500",
  "Wrong PIN": "“Yanlış PIN” yaz"
};

export function turkishProblem(id: number, original?: AlgorithmProblem): AlgorithmProblem {
  const sourceChart = original?.flowchart;
  const [title, description, steps] = problemText[id];
  const { pythonCode, input, output } = workedExamples[id];
  // The simplified legacy charts for these two questions omit branches.
  // Their complete diagrams are visible in the corresponding source pages.
  const flowchart = sourceChart && ![33, 36].includes(id) ? {
    nodes: sourceChart.nodes.map(node => ({ ...node, text: chartLabels[node.text] ?? node.text })),
    edges: sourceChart.edges.map(edge => ({ ...edge, label: edge.label === 'نعم' ? 'Evet' : edge.label === 'لا' ? 'Hayır' : edge.label })),
  } : undefined;
  return { id, title, description, steps: steps.split('|'), pythonCode, flowchart, example: { input, output } };
}
const lessonText:[string,string,string][]=[
 ['Algoritma ve akış şeması','Adım adım düşün; ilk programını yaz.','Algoritma, bir işi çözmek için sıralı ve anlaşılır adımlardır. Başlangıç/bitiş oval, giriş/çıkış paralelkenar, işlem dikdörtgen, karar eşkenar dörtgenle gösterilir. Oklar sırayı belirler. print ekrana yazar; input kullanıcıdan metin alır.'],
 ['Basit koşullar','if ve else ile iki yol arasında seçim yap.','Koşul doğruysa if, yanlışsa else çalışır. == eşitliği sınar; = değer atar. % bölümden kalanı verir. Kod bloklarını tutarlı dört boşlukla girintile. Koşulun iki tarafını da test et.'],
 ['Birleşik koşullar','and ve or ile kuralları birleştir.','and için iki koşul da doğru olmalıdır. or için en az biri yeterlidir. Parantezler koşul gruplarını açıklar. 18 <= age <= 45 iki sınırı da içerir.'],
 ['Hesaplama ve metinler','Toplam, ortalama ve değişkenleri öğren.','input metin döndürür; hesap için int veya float gerekir. + sayıları toplar, metinleri birleştirir. İşlem önceliğini parantezle açık tut. Ortalama için toplamı değer sayısına böl. Geçici değişken iki değeri kaybetmeden değiştirmeyi sağlar.'],
 ['Geometri ve formüller','Alanları kodla; ölçü birimlerini koru.','Uzunluklar aynı birimde olmalı; alan birimi karedir. Çap yarıçapın iki katıdır. math.sqrt karekök, ** üs alma işlemidir. Karekök içi ve üçgen koşulları geçerli olmalıdır. İleri geometri sorularına 10. dersteki ek çalışmada döneceksin.'],
 ['Döngüler','Tekrarlanan işlemleri kısa kodla anlat.','for bir aralıkta ilerler; while koşul doğruyken çalışır. range bitiş değerini içermez. Toplamı 0, çarpımı 1 ile başlatırız. while içinde sayacı güncellemezsek sonsuz döngü oluşabilir.'],
 ['Birden fazla karar','Hesap makinesi ve sayı problemleri geliştir.','elif koşulları sırayla sınar; ilk doğru dal çalışır. Bölmeden önce bölenin sıfır olmadığını denetle. Asal sayı 1’den büyüktür. Bir bölen bulununca aramayı durdurabiliriz. Durdurma değeri toplama eklenmez.'],
 ['Zaman, günler ve aylar','Bölüm ve kalanla dönüşüm yap.','1 gün=86400 saniye, 1 saat=3600 saniye, 1 dakika=60 saniyedir. // tam bölümü, % kalanı verir. Liste indeksleri 0’dan başlar; kullanıcı 1 girdiyse indeks 0 kullanılır. chr sayı kodunu karaktere dönüştürür.'],
 ['Doğrulama ve uygulamalar','Deneme sayısını ve geçersiz girdileri yönet.','PIN metindir; başındaki sıfır kaybolmamalıdır. Yanlış deneme sayacını artır ve sınıra gelince dur. Bunlar gerçek güvenlik veya finans sistemleri değildir. Bölme modellerinde ay ve ödeme pozitif olmalıdır.'],
 ['Tekrar ve final uygulaması','Çözümü planla, test et ve açıkla.','Her problemde girdi, işlem, çıktı ve sınır durumlarını yaz. Önce şemayı çiz, sonra kodu oluştur. Normal değer, sınır değeri ve geçersiz girdi dene. Hata olduğunda değişkenleri adım adım izle.']
];
export const turkishPythonLessons: PythonLesson[] = pythonLessons.map((lesson, index) => {
  const [title, subtitle, theory] = lessonText[index];
  return {
    ...lesson,
    title,
    subtitle,
    badge: 'Algoritma atölyesi',
    duration: '120 dakika',
    objectives: [subtitle, 'Akış şemasındaki adımları sırayla takip et.', 'Normal bir değer ve bir sınır değeri ile çözümü dene.'],
    theorySections: [{ title: 'Kavramları keşfet', content: [theory] }],
    problems: lesson.problems.map(problem => turkishProblem(problem.id, problem)),
    tips: [
      { type: 'info', title: 'Çözümü elle dene', content: 'Koddan önce bir girdi seç. Okları izlerken değişkenlerin yeni değerlerini bir tabloya yaz ve beklediğin çıktıyı programla karşılaştır.' },
      { type: 'warning', title: 'Girdi sırası', content: 'Örnekte virgülle ayrılmış değerleri program sorduğunda tek tek, her biri ayrı satırda gir. Ondalık sayı yazarken nokta kullan.' },
    ],
  };
});
// [title, goal, explanation, wiring steps separated by |, algorithm, extension]
const sessionText:[string,string,string,string,string,string][]=[
 ['Arduino ve elektrik','İlk güvenli LED devreni kur.','Gerilim elektriksel potansiyel farkıdır; akım yüklerin akışıdır. Direnç akımı sınırlar. LED tek yönde iletir ve akım sınırlama direnci ister. Deney tahtasının orta kanalı iki tarafı ayırır. Genellikle beşli delikler kendi içinde bağlıdır; güç rayları bazen ortadan kesilir.','USB gücünü çıkar; GND ucunu eksi raya bağla.|5V → 220–330 Ω direnç → LED anot; katot → GND. Uzun bacak çoğunlukla anottur; doğrula.|Öğretmen kontrolünden sonra USB gücünü bağla.','Bu etkinlikte kod yok.|Akım yolunu çiz.|LED durumunu gözle.','LED ters bağlanırsa ne olur? Direnci çıkarmadan önce simülasyonda düşün.'],
 ['LED ve buton','Kod yazmadan anahtarlamayı keşfet.','Seri bağlantıda akımın tek yolu vardır; paralel bağlantıda yollar ayrılır. Her paralel LED kolunun kendi direnci olmalıdır. Dört bacaklı butonun bazı uçları zaten bağlıdır. Butonu orta kanala yerleştir ve kontak çiftlerini kontrol et.','Güç kapalıyken iki LED kolu kur; her kolda 220–330 Ω direnç kullan.|Butonu besleme ve LED kolu arasına seri bağla.|Butona basıp bırak; basılıyken devrenin kapanmasını izle.','Tahmin et.|Butona bas.|LED durumunu gözle ve kaydet.','İki LED’i tek butonla aç; ayrı dirençleri koru.'],
 ['mBlock ile ilk program','Yerleşik LED’i yakıp söndür.','Program sıralı komutlardan oluşur. Sonsuz döngü komutları yeniden çalıştırır. HIGH çıkışı yüksek, LOW düşük yapar. Bekleme olmadan değişim çok hızlı olabilir. Uno’nun yerleşik LED’i çoğunlukla 13 numaralı pine bağlıdır.','Uno’yu USB ile bağla.|mBlock içinde kartı, portu ve yükleme modunu seç.|Harici LED varsa 13 → direnç → anot; katot → GND bağla.','Arduino başladığında|Sürekli tekrarla|13 numaralı pini HIGH yap|1 saniye bekle|13 numaralı pini LOW yap|1 saniye bekle','Beklemeyi 0.2 saniyeye indir; kısa–uzun bir ışık işareti oluştur.'],
 ['RGB ışık ve buzzer','Renklerle sesleri birlikte yönet.','RGB LED üç renk LED’i içerir. Ortak katot GND’ye gider; ortak anot +5V’a gider ve mantık tersine döner. Her rengin ayrı direnci gerekir. PWM hızlı açma-kapama oranıyla parlaklığı değiştirir. Pasif buzzer farklı frekansta ton üretir; aktif buzzer kendi osilatörünü içerir.','RGB türünü doğrula; ortak katot örneğinde ortak uç GND’ye gider.|R/G/B uçlarını ayrı 220–330 Ω dirençlerle 9/10/11 PWM pinlerine bağla.|Küçük pasif piezo buzzer sinyalini 8’e, diğer ucunu GND’ye bağla.','Sürekli tekrarla|Kırmızı=255, yeşil=0, mavi=0; buzzer8 üzerinde 700 Hz|0.3 saniye bekle|Kırmızı=0, yeşil=0, mavi=255; buzzer8 üzerinde 1000 Hz|0.3 saniye bekle','Renk ve ton sırasını değiştiren bir polis ışığı simülasyonu yap.'],
 ['7 segment gösterge','Rakamları küçük ışıklardan oluştur.','Gösterge a–g adlı yedi LED bölümünden oluşur. Yanan bölümler rakamı belirler. Ortak anot ve ortak katot tiplerinin mantığı farklıdır. Bacak sırasını veri sayfasından öğren; fiziksel sıra a–g sırası olmayabilir.','a–g uçlarını veri sayfasıyla belirle.|Her bölümü ayrı dirençle 2–8 pinlerine bağla.|Ortak katot örneğinde ortak ucu GND’ye bağla; önce tek bölüm, sonra 8 rakamını dene.','2–8 pinlerini çıkış yap|Rakamın bölüm desenini uygula|1 saniye bekle|Sonraki rakama geç','0’dan 9’a sayan bir sayaç tasarla.'],
 ['LCD ile yazı gösterme','İsmini ve sayıları ekrana yaz.','16×2 LCD iki satırda 16’şar karakter gösterir. İndeksler kullanılan uzantıya göre genellikle 0’dan başlar. Paralel 4-bit LCD ile I2C modülü farklı bağlantı ve uzantı ister. VO kontrastı ayarlar.','Paralel LCD: VSS→GND, VDD→5V, RW→GND. 10k potansiyometrenin orta ucu→VO.|RS→12, E→11, D4/D5/D6/D7→5/4/3/2 bağla.|Arka ışık A/K uçlarını veri sayfasındaki direnç şartıyla bağla; kontrastı ayarla.','LCD’yi 16×2 olarak başlat|İmleci 0,0 konumuna getir|Merhaba yaz|İmleci 0,1 konumuna getir|İsmini yaz','Kayan yazılı bir tanıtım kartı yap.'],
 ['Sensörler ve IR algılama','Girdiyi okuyup karar ver.','Sensör çevredeki büyüklüğü elektriksel sinyale dönüştürür. Dijital çıkış iki durum, analog çıkış değişken değer verir. IR sensörü yansıyan kızılötesi ışığı algılar. Bazı modüller nesne algıladığında LOW verir; bunu ölçerek öğren.','IR VCC/GND uçlarını uygun beslemeye bağla; OUT→2.|Geri bildirim için yerleşik LED13 kullan.|Uzak/yakın nesnelerde okumayı izle; etkin durumun HIGH mı LOW mu olduğunu kaydet.','2 numaralı pini oku|Algılama etkinse LED13 aç|Değilse LED13 kapat|Tekrar oku','Nesne yaklaştığında yanan kapı göstergesi yap.'],
 ['Ultrasonik mesafe','Sesin gidiş-dönüş süresini kullan.','HC-SR04 yankı süresini ölçer. Ses hem gider hem döner: mesafe = süre × ses hızı / 2. Yaklaşık cm hesabı süre(µs)/58 olur. Eğik ve yumuşak yüzeyler sonucu etkiler. Zaman aşımını geçerli mesafe sayma.','HC-SR04 VCC→5V, GND→GND, Trig→9, Echo→10.|İlk denemede yalnız sensör kullan; sonucu seri ekrana yaz.|Uyarı LED’lerini 5/6/7’ye ayrı dirençlerle bağla; aynı pinlerde paralel LCD kullanma.','Mesafeyi oku|Geçerliyse karşılaştır|Mesafe < 10 cm ise kırmızı uyarı|Değilse güvenli gösterge|0.1 saniye bekle','Üç mesafe aralığı olan park yardımcısı yap.'],
 ['Ses, sıcaklık ve nem','Çevreden veri topla.','Ses modülü eşik aşımını veya analog şiddeti bildirir; konuşmayı anlamaz. DHT sıcaklık ve bağıl nem ölçer. Modeli doğru seç ve okumalar arasında yaklaşık 2 saniye bırak. Geçersiz okumaları karar için kullanma.','Ses modülü OUT→7; VCC/GND uçlarını uygun beslemeye bağla.|DHT Data→2; çıplak sensörde veri hattına 10k çekme direnci gerekebilir.|Önce her sensörü seri ekranda ayrı test et; ekran eklerken pinleri yeniden planla.','DHT2 sıcaklık ve nemini oku|Geçerli değeri göster|Ses7 etkinse göstergeyi değiştir|2 saniye bekle','Sınıfın sabah ve öğleden sonraki sıcaklıklarını karşılaştır.'],
 ['LDR ve düşük gerilimli röle','Karanlıkta çalışan bir lamba yap.','LDR direnci ışıkla değişir. 10k dirençle gerilim bölücü kurup A0’dan 0–1023 arası değer okuruz. LDR’nin konumuna göre aydınlıkta değer artar veya azalır. Röle bir anahtardır; kontrol ve yük devresi farklıdır.','5V → LDR → ölçüm noktası → 10k direnç → GND. Ölçüm noktası→A0.|Sürücülü röle modülünün sinyalini 7’ye bağla; etkin HIGH/LOW türünü doğrula.|Yalnız düşük gerilimli pil yükünü COM–NO üzerinden bağla. Sınıfta şebeke gerilimi kullanma.','A0 oku|Ölçülen karanlık eşiğinde röleyi aç|Aydınlıkta kapat|Titremeyi önlemek için iki ayrı eşik kullan','Eşik çevresinde sürekli tıklamayan bir lamba geliştir.'],
 ['Potansiyometre ve joystick','El hareketini sayıya dönüştür.','Potansiyometrenin orta ucu değişken gerilim verir. Analog okuma 0–1023 aralığındadır. Joystick iki potansiyometre ve bir butondan oluşur. Merkez çevresindeki küçük dalgalanmalar için ölü bölge kullanılabilir.','Potansiyometrenin dış uçları→5V/GND; orta uç→A0.|Joystick VRx→A1, VRy→A2, SW→7; buton için INPUT_PULLUP kullan.|Önce değerleri seri ekranda izle; ek parçalar için boş pinleri belirle.','A0 oku|0–1023 değerini 0–255 aralığına ölçekle|PWM9 değerini güncelle|Tekrarla','Joystick merkezdeyken motoru durduran bir kontrol tasarla.'],
 ['DC motor ve sürücü','Hızı ve yönü güvenle kontrol et.','Motor Arduino pininden fazla akım çeker; doğrudan pine bağlanmaz. Sürücü ayrı motor beslemesini kontrol eder; ortak GND gerekir. PWM hızı, yön girişleri dönüş yönünü belirler. Sürücünün gerilim düşümünü ve motorun akımını dikkate al.','L298N IN1→6, IN2→7, ENA→5. PWM için ENA jumper ayarını kontrol et.|Motor→OUT1/OUT2; motor için uygun ayrı güç kaynağı kullan.|Arduino ve sürücü GND uçlarını birleştir; öğretmene kontrol ettir.','IN1 HIGH, IN2 LOW|ENA5 PWM=120|2 saniye bekle|ENA5 PWM=0|Yön değiştirmeden motorun durmasını bekle','Üç hız seçeneği ve durdurma düğmesi ekle.'],
 ['Servo ile açısal hareket','Küçük bir kapıyı belirli açıda aç.','Servo geri beslemeyle hedef açıyı korur. Servo sinyali normal PWM parlaklık komutundan farklıdır; servo uzantısı kullan. Çoğu küçük servo yaklaşık 0–180° çalışır; model sınırlarını doğrula ve mekanizmayı zorlamaktan kaçın.','Sinyal→9; kablo renklerini veri sayfasından doğrula.|Uygun akım sağlayan 5V kaynak kullan; GND uçlarını ortaklaştır.|Mekanik yük takmadan önce 90° konumunu test et.','Servo9=90°|1 saniye bekle|Servo9=30°|1 saniye bekle|Servo9=150°','Butonla açılan bir bariyer üret.'],
 ['Adım motoru ve sistemler','Adım ve yön sinyalleriyle konumu belirle.','A4988 gibi STEP/DIR sürücüleri yönü DIR ile seçer ve her geçerli STEP darbesi için bir tam veya mikro adım üretir. Tur başına adım sayısı motorun adım açısına ve mikro adım seçimine bağlıdır. Örneğin 1,8° motorda tam adım modunda tur başına 200 adım vardır.','Gücü kes. Öğretmenle motorun iki bobin çiftini belirleyip sürücüde ilgili A ve B çıkışlarına bağla.|D6→STEP, D7→DIR. Kart ve motor beslemesi için sürücünün şemasını izle. GND hattını ortaklaştır.|Öğretmen motor ve kart için uygun akım sınırını ve motor beslemesindeki filtre kondansatörünü kontrol etsin. Motoru yalnız güç kapalıyken bağla.','D7 yönünü ileri ayarla|D6 üzerinde önce yüksek sonra düşük düzeyle bir STEP darbesi üret|Yeterince yavaş bir tempoda 200 darbe yinele|Bekle ve motor durduğunda yönü değiştir|Aynı sayıda darbe ile geri dön','Kâğıt ibrenin başlangıç işaretine geri dönmesini test et.'],
 ['Final projesi ve sunum','Fikrini çalışan bir ürüne dönüştür.','Projeyi ihtiyaç, girdi, karar ve çıktı olarak planla. Her parçayı önce ayrı test etmek hata bulmayı kolaylaştırır. Pin tablosu çakışmaları önler. Başarı çalıştırmak, açıklamak, test etmek ve geliştirmektir.','Parça listesi ve pin tablosu hazırla.|Güç kapalıyken bağla; besleme ve ortak GND’yi kontrol et.|Girdi, karar ve çıktıyı ayrı test edip birleştir.','Girdiyi oku|Geçerliliğini denetle|Koşulu değerlendir|Çıktıyı güncelle|Sonucu gözle ve yeniden dene','Amacı, bir hatanı ve düzeltmeni 3 dakikada anlat.']
];
type LabActivity = {
  prediction: string;
  experiment: string;
  observation: string;
  application: string;
  fault: [string, string];
  connections: [string, string][];
  quiz: Session['quiz'];
};

function question(prompt: string, options: string[], correctAnswer: number, explanation: string) {
  return { question: prompt, options, correctAnswer, explanation };
}

const sessionLabs: LabActivity[] = [
  {
    prediction: 'Şemada 5V’tan başlayıp akımın geri döndüğü yolu kalemle izle. LED’in uzun ve kısa bacağını işaretle.',
    experiment: 'Gücü kesip direnç ve LED ile bir seri yol kur. Öğretmene kontrol ettirdikten sonra besle; ardından gücü kesip bir bağlantıyı aç.',
    observation: 'Kapalı ve açık devrede LED’in durumunu iki satırlık gözlem tablosuna yaz.',
    application: 'Bir masa lambasının anahtarı açıldığında akım yolunun hangi noktada kesildiğini çiz.',
    fault: ['LED hiç yanmıyor.','Gücü kes. LED yönünü, direncin seri olmasını ve deney tahtasındaki deliklerin aynı sıraya bağlı olup olmadığını kontrol et.'],
    connections: [['Uno GND','Eksi ray'],['5V ve direnç','LED ve GND'],['USB','Uno']],
    quiz: [
      question('Seri direncin görevi nedir?', ['LED’in rengini belirlemek','Akımı sınırlamak','Programı yüklemek'], 1, 'Direnç LED’den geçen akımı sınırlar.'),
      question('Dönüş kablosu açıkken LED neden sönüktür?', ['Akımın izleyeceği yol tamamlanmamıştır','Besleme mutlaka bitmiştir','Direnç küçülmüştür'], 0, 'Sürekli akım için beslemeden başlayıp geri dönen kapalı bir yol gerekir.'),
    ],
  },
  {
    prediction: 'İki LED’i paralel kollar olarak çiz. Bir kolun çıkması durumunda diğer kolun ne yapacağını tahmin et.',
    experiment: 'Her kol için ayrı direnç kullan. Bir butonla iki kolun beslemesini birlikte açıp kapat. Sonra güç kapalıyken bir kolu ayırıp diğerini test et.',
    observation: 'Buton bırakılmışken iki LED sönmeli. Basılıyken sağlam paralel kollar birbirinden bağımsız yanar.',
    application: 'Ayrı kollardaki iki masa lambasının birini söndürünce diğerinde ne olacağını açıkla.',
    fault: ['Butona basmadan LED yanıyor.','Butonun aynı tarafta zaten birbirine bağlı iki ucunu seçmiş olabilirsin. Güç kesikken kontak çiftlerini kontrol et.'],
    connections: [['5V','İki dirençli kol'],['Buton','Besleme yolu'],['Kapalı kontaklar','LED kolları']],
    quiz: [
      question('İki LED paralel bağlanıyorsa hangi seçim uygundur?', ['İki LED’e de direnç koymamak','Yalnızca uzun kablo kullanmak','Her kola ayrı seri direnç koymak'], 2, 'Her kol kendi LED akımını sınırlar.'),
      question('Butona basıldığında açık olan kontak kapanırsa ne olur?', ['LED programı silinir','Akım yolu tamamlanır','Gerilim daima sıfır olur'], 1, 'Doğru bağlanan buton kapalı devreyi tamamlar.'),
    ],
  },
  {
    prediction: 'D13 bir saniye yüksek, bir saniye düşük olacak. On saniyede kaç tam yanıp sönme beklersin?',
    experiment: 'Yükleme modunda kart başlarken sonsuz döngüyü çalıştır. İlk turda iki beklemeyi de 1 s, ikinci turda yalnızca açık beklemeyi 0,25 s yap.',
    observation: 'İlk durumda bir çevrim iki saniyedir. İkinci durumda kapalı süre aynı kalır ancak açık süre kısalır.',
    application: 'Bir cihazın durum ışığına uzun ve kısa yanışlarla iki farklı durum kodu tasarla.',
    fault: ['LED sürekli yanıyor gibi görünüyor.','HIGH ve LOW komutlarının arasına gözle fark edilebilir bekleme koy. Doğru kart ve porta yükleme yapıldığını kontrol et.'],
    connections: [['USB kablosu','Uno'],['mBlock','Uno yükleme modu'],['D13','Yerleşik veya dirençli LED']],
    quiz: [
      question('D13 bir saniye yüksek, bir saniye düşükse çevrim kaç saniyedir?', ['1','2','10'], 1, 'Bir tam çevrim açık ve kapalı sürelerin toplamıdır.'),
      question('Hangi blok bir kez yazılan davranışı tekrarlar?', ['Sürekli tekrarla','Bir kez yazdır','Programı durdur'], 0, 'Sonsuz döngünün içindeki komutlar program çalıştığı sürece yinelenir.'),
    ],
  },
  {
    prediction: 'Ortak katot RGB LED’de kırmızı ve yeşil kanallar birlikte yükselirse hangi rengi görmeyi beklersin?',
    experiment: 'Önce kanalları tek tek aç. Sonra R=180, G=180, B=0 uygula. Piezo ile kısa bir tonu ayrıca dene ve renk dizisine kat.',
    observation: 'Kırmızı ve yeşil ışık birleşerek sarıya yakın görünür. Her kanal ayrı dirençle korunur.',
    application: 'Bir oyundaki doğru ve yanlış cevap için farklı renk ile kısa bir ses deseni tasarla.',
    fault: ['Kırmızı yerine mavi yanıyor.','RGB bacak sırasını parça şemasıyla kontrol et. Ortak anot modülü kullanıyorsan düzey mantığını gözden geçir.'],
    connections: [['Ortak katot','GND'],['D9/D10/D11','Dirençlerle R/G/B'],['D8','Pasif piezo']],
    quiz: [
      question('Ortak katot RGB’de sarıya yakın renk için hangi kanallar kullanılır?', ['Yalnız mavi','Yeşil ve mavi','Kırmızı ve yeşil'], 2, 'Kırmızı ile yeşil ışığın toplamsal karışımı sarıya yakındır.'),
      question('Pasif piezoda daha ince sesi hangi değişiklik üretir?', ['Frekansı artırmak','RGB direncini çıkarmak','Bekleme süresini sıfırlamak'], 0, 'Frekans yükseldikçe algılanan ses perdesi yükselir.'),
    ],
  },
  {
    prediction: 'Kâğıtta a–g bölümlerini işaretle. 1 ve 8 rakamları için kaç bölüm yanacağını hesapla.',
    experiment: 'Önce tek bir bölümü ve ona ait pini belirle. 1 için b/c, 8 için yedi bölümün hepsini tabloya göre aç.',
    observation: '1 için iki, 8 için yedi bölüm gerekir. Yanlış rakam varsa değişen bölümü tablodan bul.',
    application: 'Skor tabelasında 0–9 için her satırda bir rakam olmak üzere yedi sütunlu desen tablosu hazırla.',
    fault: ['Bütün rakamlar ters desenle çıkıyor.','Gösterge ortak anot ise yanma düzeyi ortak katot örneğinin tersidir. Modül tipini doğrula.'],
    connections: [['Parça şeması','a–g uçları'],['D2–D8','Bölüm dirençleri'],['Ortak katot','GND']],
    quiz: [
      question('Standart yedi bölümde 1 rakamı için hangileri yanar?', ['a ve d','b ve c','e ve g'], 1, 'Sağ üst ve sağ alt bölümler b ve c’dir.'),
      question('8 rakamını gösterirken kaç bölüm yanar?', ['2','8','7'], 2, 'Ondalık nokta ayrı bir LED’dir. Yedi ana bölüm 8 için yeterlidir.'),
    ],
  },
  {
    prediction: '16×2 ekranda satır numaraları 0’dan başlıyorsa ikinci satıra ulaşmak için hangi satırı seçmelisin?',
    experiment: 'İlk satıra MERHABA, ikinci satıra ismini yaz. Sonra bir karakteri sabit konumda değiştirip ekranın kalanını koru.',
    observation: 'İkinci satırın ilk sütunu (0,1) olur. Sürekli temizleme yazının titremesine yol açabilir.',
    application: 'Bir sıcaklık göstergesinin sabit etiketi ile değişen sayıyı ekran üzerinde ayrı konumlara yerleştir.',
    fault: ['Arka ışık var ama harf yok.','Önce VO kontrastını ayarla. Ardından RS/E, veri hattı sırası ve R/W=GND bağlantılarını denetle.'],
    connections: [['5V/GND ve pot','VDD/VSS/VO'],['D12/D11/D5/D4/D3/D2','RS/E/veri hatları'],['Arka ışık','A ve K uçları']],
    quiz: [
      question('16×2 LCD’nin iki satırında toplam kaç karakter yeri vardır?', ['16','18','32'], 2, 'Her satırda 16 konum vardır. 2 × 16 = 32.'),
      question('LCD’nin VO ucundaki potansiyometre neyi değiştirir?', ['Kontrastı','Karakterin harfini','Yüklenen kart türünü'], 0, 'VO kontrast gerilimini belirler.'),
    ],
  },
  {
    prediction: 'IR modülü nesne algıladığında LOW oluyorsa hangi giriş durumunda LED yanmalı?',
    experiment: 'Aynı uzaklıkta açık ve koyu kartonları sırayla yaklaştır. Seri ekranda D2 seviyesini ve D13 LED durumunu her deneme için yaz.',
    observation: 'Çıkış seviyesi modüle, yüzeye ve yansımaya bağlıdır. Koddaki etkin değeri kendi gözleminden seç.',
    application: 'Masada bir nesnenin rafta durduğunu gösteren basit bir durum ışığı kur.',
    fault: ['Gösterge nesne uzakken yanıyor.','Sensörün aktif düşük olup olmadığını test et. Karşılaştırmayı gözlediğin etkin seviyeyle eşleştir.'],
    connections: [['IR OUT','D2'],['D13','Yerleşik LED'],['D2 değeri','Karar bloğu']],
    quiz: [
      question('Nesne varken çıkış LOW ise hangi koşul algılamayı temsil eder?', ['D2 = HIGH','D2 = LOW','A0 = 1023'], 1, 'Dijital seviyenin anlamını modülün ölçülen etkin düzeyi belirler.'),
      question('Koyu ve açık yüzeyler neden farklı sonuç verebilir?', ['Program saati değişir','Dirençler saymayı bırakır','Kızılötesi ışığı farklı yansıtırlar'], 2, 'Alıcıya dönen ışık yüzeye göre değişebilir.'),
    ],
  },
  {
    prediction: 'Sesin gidip dönme süresi iki katına çıkarsa aynı koşullarda hesaplanan mesafe nasıl değişir?',
    experiment: 'Düz kartonu cetvelle 10, 20 ve 30 cm’ye yerleştir. Her noktada üç geçerli süre ve mesafe oku. Boş alana da bir ölçüm yap.',
    observation: 'Yaklaşık 1160 µs gidiş-dönüş süresi 20 cm’ye karşılık gelir. Zaman aşımını sonuç tablosunda ayrı işaretle.',
    application: 'Karton park kutusunda hangi mesafelerde renk değiştirilmesi gerektiğine karar ver.',
    fault: ['Bazen sıfır mesafe görülüyor.','Zaman aşımı sıfır dönebilir. Yankısı olmayan okumayı ayır ve sensörü düz yüzeye doğrult.'],
    connections: [['D9/D10','TRIG/ECHO'],['Seri ekran','Mesafe çıktısı'],['D5/D6/D7','Ayrı dirençli ışıklar']],
    quiz: [
      question('Mesafe hesabında neden ikiye bölünür?', ['İki LED vardır','Ses gider ve geri döner','Kart iki kez açılır'], 1, 'Süre tek yönün değil, toplam gidiş-dönüş yolunun süresidir.'),
      question('1160 µs / 58 yaklaşık kaç santimetredir?', ['20','58','116'], 0, '1160 / 58 = 20 cm.'),
    ],
  },
  {
    prediction: 'Bir alkış sesinde dijital ses çıkışı kısa süre değişebilir. DHT sıcaklık değerinin aynı hızla değişmesini bekler misin?',
    experiment: 'Ses modülünü ve DHT’yi önce ayrı göster. Sese ait D7’nin değişimlerini izle. D2’de sıcaklık ve nemi iki saniye aralıkla üç kez kaydet.',
    observation: 'DHT’nin iki değerinin birimleri farklıdır. Sıcaklık °C, bağıl nem % ile yazılır. Eksik okumayı sonuç diye kaydetme.',
    application: 'Bir sınıf gözlem çizelgesinde sıcaklık, nem ve ses olayı için ayrı sütunlar oluştur.',
    fault: ['DHT sayı vermiyor.','DHT türünü, DATA pinini ve çekme direncini denetle. Ardışık okumaları yeterince ayır.'],
    connections: [['Ses OUT','D7'],['DHT DATA','D2'],['İki algılayıcı','Seri ekran']],
    quiz: [
      question('DHT’nin verdiği iki ölçüm hangisidir?', ['Işık ve hız','Ses ve mesafe','Sıcaklık ve bağıl nem'], 2, 'DHT sıcaklık ve nem algılayıcılarını içerir.'),
      question('Sayısal ses modülünün eşik çıkışı bize ne söyler?', ['Hangi kelimenin söylendiğini','Sesin ayarlanan eşiği aşıp aşmadığını','Nem yüzdesini'], 1, 'Çıkış ikili bir olay bilgisidir.'),
    ],
  },
  {
    prediction: '5V–LDR–A0–10 kΩ–GND düzeninde LDR aydınlanınca A0 artar mı azalır mı?',
    experiment: 'A0’ı kapalı kutuda, masa ışığında ve pencere yakınında oku. Pil lambası için açma ve kapatma eşiğini ölçtüğün değerlere göre seç.',
    observation: 'LDR üst kolda iken aydınlanınca direnci azalır ve A0 gerilimi yükselir. İki eşik yakın değerlerde röle tıklamasını azaltır.',
    application: 'Karton ev için iç mekân ışığının sensörü kendi kendine tetiklemediği bir konum seç.',
    fault: ['Röle eşikte çok sık tıklıyor.','Açma ve kapama için ayrı eşikler kullan. Lambanın LDR’ye doğrudan vurup vurmadığına bak.'],
    connections: [['LDR ve 10 kΩ düğümü','A0'],['D7','Sürücülü röle IN'],['Pil ve lamba','COM/NO']],
    quiz: [
      question('Belirtilen bölücüde ışık arttığında A0 neden artar?', ['LDR’nin üst koldaki direnci azalır','Program sıfırlanır','GND çıkarılır'], 0, 'Üst koldaki direnç azaldığında düğüm gerilimi 5V’a yaklaşır.'),
      question('İki yakın fakat farklı aç/kapat eşiği kullanmanın yararı nedir?', ['Ekran satırı artar','Motor yönü ters döner','Eşik yakınında hızlı aç-kapa azalır'], 2, 'Aradaki bölgede durum korunduğu için küçük dalgalanmalar anahtarlamayı değiştirmez.'),
    ],
  },
  {
    prediction: 'Joystiği bıraktığında X/Y ortası tam olarak 512 değilse yön kararı nasıl kararlı kalabilir?',
    experiment: 'Sol, merkez, sağ ve serbest konumlarda VRx/VRy değerlerini yaz. Merkezde on okuma yap. Ölçümlerin çevresinde bir ölü bölge tanımla.',
    observation: 'Merkezde sayı biraz değişebilir. Ölü bölge içindeyken her örnekte merkez kararı üretilmeli.',
    application: 'Bir oyundaki karakterin joystick serbest kalınca yerinde kalmasını sağla.',
    fault: ['Joystick dokunmadan yön değiştiriyor.','Gerçek orta okumaları kaydet. Tek bir sayıya eşitlik aramak yerine orta aralık kullan.'],
    connections: [['Pot orta ucu','A0'],['VRx/VRy/SW','A1/A2/D7'],['A0 ve dönüşüm','D9 PWM']],
    quiz: [
      question('Potansiyometrede değişken gerilim hangi uçtan alınır?', ['İki dış ucun ikisinden aynı anda','Orta uçtan','Kablonun renginden'], 1, 'Orta uç direnç üzerinde hareket eden sürgüdür.'),
      question('Joystick merkezindeki ölü bölge niçin seçilir?', ['Merkez gürültüsünü yön sanmamak için','Sinyali 5V üstüne çıkarmak için','Düğmeyi sürekli basılı tutmak için'], 0, 'Küçük oynamalar aynı merkez kararı içinde kalır.'),
    ],
  },
  {
    prediction: 'Yön girişleri aynı kalırken ENA PWM değerini azaltmak hangi davranışı değiştirir?',
    experiment: 'Sürücüyle motoru boşta başlat. Aynı yönde iki farklı PWM dene, ardından 0 verip durmasını bekle. Yön girişlerini değiştirip tekrar başlat.',
    observation: 'Yön, IN1 ve IN2 sırasına bağlıdır. Belirli bir yükte düşük PWM motoru harekete geçirmeye yetmeyebilir.',
    application: 'Maket taşıma bandına dur, yavaş ve hızlı durumları ekle.',
    fault: ['Arduino düğmesine basılmadan yeniden başlıyor.','Motor beslemesini, akım kapasitesini ve ortak GND’yi kontrol et. Motoru dijital pinden besleme.'],
    connections: [['D6/D7/D5','IN1/IN2/ENA'],['OUT1/OUT2','Motor'],['Kart GND','Sürücü GND']],
    quiz: [
      question('DC motor için ayrı sürücü neden kullanılır?', ['Kablo sayısını artırmak için','PWM her zaman tehlikeli olduğu için','Motor akımını uygun devreden sağlamak için'], 2, 'Dijital pin motorun çalışma ve kalkış akımını doğrudan sağlamaz.'),
      question('Dönüş yönünü değiştirmeden hemen önce ne yapılır?', ['Hızı sıfırlayıp motorun durması beklenir','Besleme gerilimi iki katına çıkarılır','Rastgele bir pin seçilir'], 0, 'Durduktan sonra yön girişleri kontrollü biçimde değiştirilir.'),
    ],
  },
  {
    prediction: 'Servo için 30°, 90°, 150° komutlarının her birinde sürekli dönme mi, konuma gitme mi beklersin?',
    experiment: 'Yüksüz servoyu 90°’ye getirip kâğıda işaret koy. Sonra 60° ve 120° komutlarını ver. Her seferinde eski işaretine döndür.',
    observation: 'Konumsal servo hedef açıya gidip onu korur. Hareket aralığı mekanizma ile sınırlandırılmış olabilir.',
    application: 'Hafif bir kâğıt ibreyi üç değeri gösterecek şekilde işaretli skalaya hizala.',
    fault: ['Servo titriyor ve kart yeniden başlıyor.','Mekanik yükü çıkar. Beslemenin gerilim ve yeterli akım sağladığını, GND’nin ortak olduğunu kontrol et.'],
    connections: [['D9','Servo sinyali'],['Ayrı 5V ve GND','Servo beslemesi'],['90° komutu','Servo kolu']],
    quiz: [
      question('Konumsal servoya ne gönderilir?', ['Hedef açı','Saniyede tur garantisi','Ekran satır numarası'], 0, 'Kontrol sinyali hedef konumu belirtir.'),
      question('Servo kolunu mekanik sınıra sürekli bastırmak neden sakıncalıdır?', ['Renk değiştirdiği için','Sürekli zorlanıp fazla akım çekebildiği için','GND tanımsız olduğu için'], 1, 'Hedefe ulaşamayan servo yük altında ısınabilir veya beslemeyi zorlayabilir.'),
    ],
  },
  {
    prediction: 'Bir adım motoru aynı sayıda adım ileri ve geri giderse işaretçinin nerede duracağını tahmin et.',
    experiment: 'A4988 ile düşük hızda sabit sayıda STEP darbesi gönder. Aynı sayıda geri dön. İşaretin nerede durduğunu farklı hızlarda gözlemle.',
    observation: 'Sürücü sıralaması ve hız uygunken başlangıca yaklaşır. Adım kaçırma veya dişli boşluğu fark oluşturabilir.',
    application: 'Bir maket göstergede üç farklı açıya karşılık gelen adım sayılarını deneyerek belirle.',
    fault: ['Motor ilerlemeyip yalnız titreşiyor.','Gücü kapat. Bobin çiftlerinin A/B çıkışlarına doğru gittiğini ve STEP/DIR sırasını kontrol et. Öğretmen akım sınırını gözden geçirsin. Daha düşük hızla başla.'],
    connections: [['Motor bobin çiftleri','A4988 çıkışları'],['D6/D7','STEP/DIR'],['Motor beslemesi','Sürücü ve filtre']],
    quiz: [
      question('Tur başına adım sayısı neye bağlıdır?', ['LCD metnine','Her durumda yalnız 200’e','Motor, dişli ve sürme moduna'], 2, 'Farklı motor ve sürme yöntemleri farklı etkin adım sayıları verir.'),
      question('Hız artırıldığında işaret geride kalırsa ilk deneme nedir?', ['Daha düşük hızda tekrarlamak','Motoru doğrudan pine bağlamak','GND’yi ayırmak'], 0, 'Aşırı adım hızı mekanik sistemin adımları kaçırmasına yol açabilir.'),
    ],
  },
  {
    prediction: 'Projen için üç test seç: normal giriş, tam eşik ve sensörün veri vermediği durum. Her birinde beklenen çıktıyı yaz.',
    experiment: 'Her parçayı birer küçük programla sına. Sonra giriş, karar ve çıktı bloklarını birleştir. Test tablosunda beklenen ile gözleneni yan yana yaz.',
    observation: 'Üç testten hangisinin ilk kez başarısız olduğunu ve hangi tek değişikliğin sonucu düzelttiğini anlat.',
    application: 'Üç dakikalık gösterimde ihtiyacı, seçilen bileşenleri, bir test sonucunu ve bir sonraki geliştirmeyi paylaş.',
    fault: ['Parçalar tek başına çalışıyor ama birlikte çalışmıyor.','Önce pin tablosunda çakışan satırları ara, sonra süreleri ve tüm yük için gereken besleme kapasitesini kontrol et.'],
    connections: [['Proje çizimi','Pin tablosu'],['Besleme planı','Bileşenler'],['Sensör ve kontrol','Çıkış']],
    quiz: [
      question('İki modülün aynı dijital pinde farklı iş yapmasını hangi belge önce ortaya çıkarır?', ['Poster başlığı','Parça ve pin eşleme tablosu','Sunum tarihi'], 1, 'Pin tablosunda tüm görevler yan yana görüldüğü için çakışma önceden fark edilir.'),
      question('30 cm eşiği olan model için hangi test seti daha açıklayıcıdır?', ['Yalnız 20 cm','Yalnızca bir kez çalıştırmak','29, 30, 31 cm ve yankı yok'], 2, 'Eşiğin iki yanını, eşitlik durumunu ve eksik girdiyi ayrı ayrı sınar.'),
    ],
  },
];

export const turkishSessions: Session[] = sessions.map((session, index) => {
  const [title, subtitle, theory, wiring, algorithm, challenge] = sessionText[index];
  const lab = sessionLabs[index];
  const blocks = algorithm.split('|').map((label, blockIndex) => ({
    label, description: label,
    color: (['cyan', 'violet', 'amber', 'emerald', 'rose'] as const)[blockIndex % 5],
  }));
  const softwareLesson = session.id > 2;
  return {
    ...session, title, subtitle, badge: title, duration: '120 dakika',
    objectives: [subtitle, lab.prediction, 'Test gözlemini kendi cümlelerinle açıkla.'],
    firstHourTopics: ['10 dk · Önceki dersten bir kavramı hatırla.', '20 dk · ' + theory.split('. ')[0] + '.', '30 dk · ' + lab.prediction],
    secondHourTopics: ['35 dk · ' + lab.experiment, '15 dk · ' + lab.observation, '10 dk · Sonucu sun, gücü kapatıp masayı düzenle.'],
    theorySections: [{ title: 'Nasıl çalışır?', icon: 'lightbulb', content: [theory] }],
    wiringSteps: wiring.split('|').map((description, i) => ({
      step: i + 1, title: lab.connections[i][1], description,
      from: lab.connections[i][0], to: lab.connections[i][1],
    })),
    codeGroups: softwareLesson ? [{
      title: 'Algoritma', description: 'Önce adımları elle izle. Ardından giriş ve çıkış pinlerini planla karşılaştır.',
      blocks,
    }] : [],
    mblockCode: softwareLesson ? [{
      title: 'mBlock blok sırası', description: 'Arduino Uno aygıtını ve gerekli parça uzantısını seç. Aşağıdaki sırayı ve değerleri kendi bağlantınla eşleştir.',
      blocks: blocks.map(block => ({ ...block, arabicLabel: block.label })),
    }] : [],
    practicalSteps: [
      { step: 1, title: 'Tahmin et', description: lab.prediction },
      { step: 2, title: 'Kur ve sınayarak ölç', description: lab.experiment, observation: lab.observation },
      { step: 3, title: 'Kendi uygulamanı geliştir', description: challenge },
    ],
    tips: [
      { type: 'warning', title: 'Bağlantı değiştirirken', content: 'Gücü kes. Besleme gerilimini, pin tablosunu ve GND bağlantılarını denetledikten sonra yeniden aç.' },
      { type: 'info', title: lab.fault[0], content: lab.fault[1] },
    ],
    quiz: lab.quiz,
    enrichedContent: { realWorldExamples: [lab.application], troubleshooting: [{ problem: lab.fault[0], solution: lab.fault[1] }] },
    project: { title: title + ' · uygulama', description: challenge },
  };
});

type ProjectGuide = {
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  idea: string;
  materials: [string, number][];
  wiringNotes: string;
  steps: [string, string][];
  codeDescription: string;
  tips: string[];
  challenges: string[];
};

const parallelLcd = '16×2 paralel LCD için RS→A1, E→A2, veri hatları D4/D5/D6/D7→Arduino A3/A4/A5/D4. Bu devrede A1–A5 dijital çıkış olarak kullanılır. VSS ve R/W→GND, VDD→5V. 10 kΩ kontrast potunun dış uçları 5V ve GND’ye, orta ucu VO’ya gider. Arka ışığı modülün direnç gereksinimine göre bağla.';
const projectGuides: Record<string, ProjectGuide> = {
  'smart-fan': {
    title: 'Sıcaklığa göre çalışan fan',
    subtitle: 'İki eşik ile fanın kararlı çalışmasını sağla.',
    duration: '3 saat',
    description: 'Ortam sıcaklığını LCD’de gösteren ve ısınınca küçük bir fanı kendi kendine çalıştıran bir masaüstü modeli kur.',
    idea: 'Sıcaklık 28 °C üzerine çıktığında fan çalışsın, 24 °C altına düşünce dursun. İki eşik arasındayken önceki durumu koruyarak motorun sık sık açılıp kapanmasını önle.',
    materials: [['Arduino Uno',1],['DHT11 veya DHT22 sensör modülü',1],['Korumalı pervaneli küçük DC motor',1],['L298N motor sürücü modülü',1],['16×2 paralel LCD',1],['10 kΩ kontrast potansiyometresi',1],['Motor ve sürücüye uygun düşük gerilimli besleme',1],['Bağlantı kablosu takımı',1]],
    wiringNotes: 'DHT DATA→D2. L298N IN1→D5, IN2→D6, ENA→D9. '+parallelLcd,
    steps: [
      ['Sıcaklığı oku','Güç kesikken DHT modülünün besleme ve GND uçlarını bağla, DATA hattını D2’ye ver. DHT türünü uzantıda seç. İki saniyede bir okuyarak oda sıcaklığını doğrula.'],
      ['Ekranı sınayarak bağla','LCD’yi bağlantı planıyla bağlayıp 16×2 olarak başlat. İlk satıra SICAKLIK yaz. Harfler görünmezse kontrastı ayarla.'],
      ['Motoru ayrı sınayarak bağla','Motor uçlarını OUT1/OUT2’ye bağla. Sürücünün motor beslemesini ayır ve GND uçlarını ortaklaştır. D9 ile hız kontrolünde modüldeki ENA köprüsünü kaldır.'],
      ['Başlangıç durumunu belirle','Fan kapalıyken ENA değerini 0 yap. Yön için IN1 yüksek, IN2 düşük kalsın. Geçerli sıcaklığı LCD’ye yaz.'],
      ['Eşikleri kodla','Sıcaklık 28’den büyükse fanAçık değişkenini doğru, 24’ten küçükse yanlış yap. Aralık içinde bu değişkene yeni değer atama.'],
      ['Sınırları dene','Sensör yerine geçici olarak 23, 29, 26 ve 23 değerlerini sırayla ver. Fanın kapalı, açık, açık, kapalı sırasını izlediğini doğrula. Ardından sensörü geri seç.'],
    ],
    codeDescription: 'Başlangıçta fanAçık = yanlış. İki saniyede bir geçerli sıcaklığı karşılaştır. fanAçık doğruysa D9 PWM=255, değilse 0. Geçersiz okumada motoru durdur ve ekranda sensör hatasını göster.',
    tips: ['Motor akımı Uno’nun dijital pininden geçmez. DHT kartında çekme direnci yoksa DATA ile besleme arasına sensörün önerdiği direnci ekle.','Pervaneyi yerine takmadan önce yön ve hız çıkışını test et.'],
    challenges: ['LCD’nin ikinci satırına fanın durumunu yaz.','İki sıcaklık eşiği arasındaki farkı değiştirerek açılış sayısını karşılaştır.'],
  },
  'parking-assistant': {
    title: 'Masaüstü park yardımcısı',
    subtitle: 'Mesafeyi üç renk ve kısa bir ses ile bildir.',
    duration: '2,5 saat',
    description: 'Bir karton duvara yaklaşan oyuncak araç için santimetre cinsinden mesafe, renkli gösterge ve yaklaşma sesi oluştur.',
    idea: 'Uzaklık 30 cm üzerindeyken yeşil, 10 cm üzeri ile 30 cm arasında sarı, 10 cm veya altındayken kırmızı ışık ve ses kullan.',
    materials: [['Arduino Uno',1],['HC-SR04 ultrasonik sensör',1],['Kırmızı, sarı ve yeşil LED',3],['220–330 Ω LED direnci',3],['Küçük pasif piezo',1],['16×2 paralel LCD',1],['10 kΩ kontrast potansiyometresi',1],['Kablo takımı ve deney tahtası',1]],
    wiringNotes: 'HC-SR04 TRIG→D9, ECHO→D10. Yeşil/sarı/kırmızı LED→D5/D6/D7, piezo→D8. '+parallelLcd,
    steps: [
      ['Sensörü ölç','HC-SR04’ü 5V ve GND’ye bağla. TRIG üzerinden yaklaşık 10 µs darbe ver. ECHO darbesini zaman aşımıyla ölç.'],
      ['Santimetreye çevir','Geçerli yankı için mesafe_cm = süre_µs × 0,034 / 2 hesapla. Bölme, sesin gidip dönmesini hesaba katar.'],
      ['Işık ve sesi ayrı dene','Her LED’e ayrı seri direnç tak. Çıkışları tek tek sür. Küçük pasif piezoyu D8 ile GND arasına bağlayıp kısa bir ton dene.'],
      ['Üç aralığı karşılaştır','Önce mesafe ≤ 10 dalını, sonra mesafe ≤ 30 dalını, en son uzak dalını işle. Aynı anda yalnız seçilen rengin çıktısı yüksek olsun.'],
      ['Ekrana yaz','Planla kurduğun LCD’ye ilk satırda mesafeyi, ikinci satırda DUR, YAVAS veya UZAK yaz. Yankı gelmezse ölçüm olmadığını bildir.'],
      ['Cetvelle test et','Düz kartonu 9, 10, 11, 30 ve 31 cm’de tut. Her değerin beklediğin aralığa geçtiğini işaretle.'],
    ],
    codeDescription: 'Yaklaşık 100 ms aralıkla ölç. Zaman aşımında ölçüm uyarısı göster. Geçerli mesafede renk eşiklerini sırayla kontrol et. Yalnızca yakın bölgede kısa ton üret.',
    tips: ['Eğik veya yumuşak yüzey yansıyan sesi azaltabilir.','Yankı gelmediğinde süre sıfır dönebilir. Bunu sıfır santimetre gibi yorumlama.'],
    challenges: ['Mesafe azaldıkça uyarı aralığını kısalt.','Üç geçerli ölçümün ortanca değerini ham ölçümle karşılaştır.'],
  },
  'smart-garage': {
    title: 'Servo motorlu garaj maketi',
    subtitle: 'Oyuncak araç yaklaşınca karton bariyeri aç.',
    duration: '3 saat',
    description: 'Yansımalı bir IR sensörü, servo ve iki ışıkla açık ya da kapalı durumunu gösteren bir masaüstü bariyer yap.',
    idea: 'Araç sensörün önündeyken bariyer açık kalsın. Alan beş saniye boyunca boş kaldığında bariyer kapansın. Yeni algılama boş süre sayacını sıfırlasın.',
    materials: [['Arduino Uno',1],['Ayarlanabilir IR nesne sensörü',1],['Küçük konumsal servo',1],['Servoya uygun 5V besleme',1],['16×2 paralel LCD',1],['10 kΩ kontrast potansiyometresi',1],['Kırmızı ve yeşil LED',2],['220–330 Ω direnç',2],['Hafif karton ve kablo takımı',1]],
    wiringNotes: 'IR OUT→D7, servo sinyali→D9, yeşil LED→D6, kırmızı→D5. LED’lere ayrı direnç kullan. Servo beslemesi ile kart GND’si ortak olsun. '+parallelLcd,
    steps: [
      ['Algılama seviyesini bul','IR modülünün çıkışını D7’de oku. Beyaz bir kartonu yaklaştırıp nesne varken HIGH mı LOW mu olduğunu not et.'],
      ['Servoyu ortala','Servoyu yüksüz dene. D9 için servo bloğuyla güvenli kapalı ve açık açıları sırayla ayarla, sonra hafif karton kolu tak.'],
      ['Göstergeleri bağla','LCD ve iki LED’i pin planına göre kur. Önce KAPALI mesajını ve kırmızı LED’i dene.'],
      ['Açık durumunu kur','Nesne varken servoya açık açısını ver, yeşili yak ve LCD’ye ACIK yaz. En son görülme anını sakla.'],
      ['Gecikmeli kapat','Nesne yokken geçen süre beş saniyeye ulaştığında kapat. Uzun bir bekleme bloğuyla programı kilitlemeden sensörü okumaya devam et.'],
      ['İki senaryoyu sına','Arabayı sensör önünde tutunca kapı açık kalmalı. Arabayı çekip üç saniye sonra geri getirince kapanma sayacı baştan başlamalı.'],
    ],
    codeDescription: 'Algılama etkinken sonGörülme = zaman ve durum = açık. Alan boş ve zaman − sonGörülme ≥ 5000 ms ise durum = kapalı. Duruma göre servo açılarını, iki LED’i ve ekranı güncelle.',
    tips: ['Servo hareket sınırlarını mekanik engellere dayanmadan seç.','Bu karton modeli masada dene.'],
    challenges: ['İkinci satırda kapanmaya kalan saniyeyi göster.','Her kapalıdan açığa geçişte geçiş sayısını bir artır.'],
  },
  'auto-lighting-alarm': {
    title: 'Gece lambası ve ışık uyarısı',
    subtitle: 'Karanlık ile ani aydınlanmayı birbirinden ayır.',
    duration: '3 saat',
    description: 'Işığı ölçüp karanlıkta pil lambasını yakan, ışık birden artınca kısa ses veren bir kutu kur.',
    idea: 'Gece lambası ortamın seviyesine, uyarı ise art arda iki ölçüm arasındaki farka göre çalışır. Aynı ölçümden iki ayrı karar çıkar.',
    materials: [['Arduino Uno',1],['LDR',1],['10 kΩ direnç',1],['Sürücülü 5V röle modülü',1],['Küçük pasif piezo',1],['Pil ve ona uygun düşük gerilimli lamba',1],['Kablo takımı',1]],
    wiringNotes: '5V→LDR→A0 düğümü→10 kΩ→GND. Röle IN→D7, piezo→D8. Lamba pilinin devresini COM ve NO üzerinden geçir. Kart üzerindeki D13 LED’ini gösterge kullan.',
    steps: [
      ['Işık bölücüsünü kur','A0 değerini açıkta ve kapağı kapatınca kaydet. Belirtilen bağlantıda ışık artınca değer yükselir.'],
      ['Lambayı dene','Röle modülünü ve yalnız pil ile çalışan lambayı bağla. Modülün etkin LOW ya da HIGH davranışını dene ve kodda bunu kullan.'],
      ['İki eşik seç','Ölçtüğün aydınlık ve karanlık değerlerinin arasına iki ayrı anahtarlama eşiği yerleştir.'],
      ['Lambayı denetle','Alt eşiğin altında lambayı aç. Üst eşiğin üzerinde kapat. Arada önceki durumu koru.'],
      ['Ani değişimi yakala','100 ms aralıkla A0 oku. Yeni ölçüm − önceki ölçüm, belirlediğin artış eşiğini geçerse D8’de kısa bir ses ver.'],
      ['Sonucu karşılaştır','Kapağı yavaşça aç, sonra bir kez hızla aç. Sabit parlaklıkta uyarının sürekli çalmadığını gözle.'],
    ],
    codeDescription: 'İlk A0 değerini önceki değişkenine kaydet. Döngüde lambayı iki eşikle yönet, farkı kontrol et, sonra önceki = yeni yap.',
    tips: ['Lambadan LDR’ye doğrudan ışık gelmesi aç-kapa döngüsü yaratır. Yeri veya yönü değiştir.','Röle kontaklarında yalnızca düşük gerilimli pil devresi kullan.'],
    challenges: ['Gün ışığında yüksek değer oluştuğunda sesin yalnızca bir kez çalmasını dene.','İki farklı odada uygun eşiklerin nasıl değiştiğini kaydet.'],
  },
  'all-seeing-eye': {
    title: 'Gidip gelen ışık çizgisi',
    subtitle: 'On LED arasında ilerleyen ışığın hızını ayarla.',
    duration: '2 saat',
    description: 'Tek bir ışık noktası sıranın bir ucundan diğerine ilerler ve geri döner. Potansiyometreyi çevirerek hareket hızını değiştir.',
    idea: 'On LED’in pinlerini bir listede tut. Bir konum ve bir yön değişkeni bütün hareketi tanımlar.',
    materials: [['Arduino Uno',1],['Deney tahtası',1],['LED',10],['220–330 Ω direnç',10],['4,7–10 kΩ potansiyometre',1],['Bağlantı kablosu takımı',1]],
    wiringNotes: 'LED anotlarını ayrı dirençlerle sırasıyla D4–D13’e, katotları GND’ye bağla. Potun orta ucu A0, dış uçları 5V ve GND.',
    steps: [
      ['Sırayı yerleştir','On LED’i aynı yönde dizip her LED’in direncini bağla. Pin numaralarını soldan sağa yaz.'],
      ['Hatları doğrula','4’ten 13’e ilerleyip her pini tek başına kısa süre yak. Yanlış sıradaki LED’in bağlantısını düzelt.'],
      ['Konumu tut','ledPinleri listesine D4–D13’ü koy. konum=0 ve yön=1 ile başla. Listede ilk eleman 0, son eleman 9’dur.'],
      ['Sırayı yürüt','Güncel LED’i yak, bekle ve söndür. Son konumda yönü −1, ilk konumda 1 yap. konum değerine yönü ekle.'],
      ['Hızı ayarla','A0 değerini 0–1023 aralığından 40–400 ms bekleme aralığına dönüştür.'],
      ['Uçları test et','Dönüşte uç LED’in iki kez üst üste yanmadığını ve 0–9 aralığından çıkılmadığını doğrula.'],
    ],
    codeDescription: 'Bir tur örneği 0,1,…,8,9,8,…,1,0 dizisini izler. Her konum için listedeki pini yak ve bekleme bitince söndür.',
    tips: ['Tek seferde yalnızca bir LED yak.','Çalışmaya üç LED’le başlayıp sonra onu tamamlayabilirsin.'],
    challenges: ['Bir butonla hareketi durdur ve kaldığı konumdan sürdür.','Tepede tek yanış ile çift yanış arasındaki farkı zaman çizelgesinde göster.'],
  },
  'light-pet': {
    title: 'Renk değiştiren ışık dostu',
    subtitle: 'Bir RGB LED’e renklerle ifade edilen üç ruh hâli ver.',
    duration: '2,5 saat',
    description: 'Yarı saydam yüzeyin arkasındaki bir LED yavaş renk geçişleriyle sakin, neşeli veya uykulu görünür.',
    idea: 'Her ruh hâlini üç PWM değeriyle temsil et. Yeni hedef renge birden atlamak yerine her kanalı ona doğru küçük adımlarla ilerlet.',
    materials: [['Arduino Uno',1],['Ortak katot RGB LED',1],['220–330 Ω direnç',3],['Yarı saydam kâğıt ya da kutu',1],['Kablo takımı ve USB güç kaynağı',1]],
    wiringNotes: 'RGB ortak katodu→GND. Kırmızı/yeşil/mavi uçları ayrı dirençlerle D9/D10/D11 PWM çıkışlarına bağla. LED’in bacak sırasını parça şemasından doğrula.',
    steps: [
      ['Kanalları tanı','Tek tek (255,0,0), (0,255,0) ve (0,0,255) uygula. Yanlış renk çıkarsa kanal sırasını düzelt.'],
      ['Üç durum oluştur','Örneğin neşeli için (0,180,30), sakin için (20,40,130), uykulu için (100,20,50) hedefini seç.'],
      ['Hedefe ilerle','Her 20 ms’de her kanal hedefinden küçükse bir artır, büyükse bir azalt. Eşitken olduğu yerde bırak.'],
      ['Durumu değiştir','Yaklaşık her on saniyede listeden yeni bir hedef seç. Önceki PWM değerlerinden geçişe başla.'],
      ['Kılıfı yerleştir','Işığı dağıtmak için LED’in önüne yarı saydam kâğıt yerleştir, bağlantıların birbirine değmediğini denetle.'],
      ['Renk günlüğü tut','Her hedef için tahmin ettiğin ve gördüğün rengi yaz. İki kanalın birlikte etkisini karşılaştır.'],
    ],
    codeDescription: 'Durum numarası hedef R, G ve B’yi seçer. Döngüde mevcut R, G ve B’yi hedefe bir adım yaklaştır ve üç PWM çıkışına yaz.',
    tips: ['Ortak anot RGB kullanırsan ortak uç ve çıktı mantığı değişir. Bu pin planı ortak katot içindir.','Önce sabit renkleri doğrula, sonra rastgele seçimi ekle.'],
    challenges: ['İki renk arasında geçiş süresini ölç.','D2 üzerindeki bir butonla ruh hâlini seç.'],
  },
  'password-alarm': {
    title: 'Tuş takımlı mesafe uyarısı',
    subtitle: 'Bir makette tuşları ve sensörü durumlara göre yönet.',
    duration: '4 saat',
    description: 'Oyuncak bir kutuda izleme başladığında nesnenin mesafesini kaydet. Mesafe belirgin biçimde değişince ses ve kırmızı ışıkla uyar. Örnek PIN ile izlemeyi durdur.',
    idea: 'Bekleme, hazırlık, izleme ve uyarı durumlarını ayrı düşün. Her durumda hangi girişlerin kabul edildiğini oklarla bir şemaya çiz.',
    materials: [['Arduino Mega 2560',1],['4×4 matris tuş takımı',1],['HC-SR04',1],['16×2 paralel LCD ve 10 kΩ kontrast potu',1],['Küçük pasif piezo',1],['Kırmızı ve yeşil LED',2],['220–330 Ω direnç',2],['Kablo takımı',1]],
    wiringNotes: 'Bu plan Mega içindir. Tuş takımının R1–R4 uçları→D22–D25, C1–C4→D26–D29. TRIG→D9, ECHO→D10. LCD RS/E/D4/D5/D6/D7→D12/D11/D5/D4/D3/D2. Piezo→D8, LED’ler dirençle D6/D7.',
    steps: [
      ['Tuşları doğrula','Satır ve sütunları tuş takımının bağlantı şemasından belirle. Her tuşu seri ekrana yazdırarak sıranın doğru olduğunu denetle.'],
      ['Mesafe referansını al','Sensörden geçerli birkaç ölçüm al. Sabit bir karton hedefin normal mesafesini ve ne kadar dalgalandığını kaydet.'],
      ['Hazırlık durumunu kur','A tuşuna basılınca LCD’de on saniyelik geri sayımı göster. Bittiğinde referans mesafeyi kaydedip izleme durumuna geç.'],
      ['Uyarı kararını ver','Referans ile ölçüm farkının mutlak değerini al. Örneğin 5 cm sınırını arka arkaya üç geçerli okumada aşarsa piezo ve kırmızı LED’i aç.'],
      ['Örnek kodu işle','Eğitim PIN’i olarak örneğin 2468 seç. # ile girişi tamamla, * ile sil. Eşleşirse sesi durdur ve beklemeye dön.'],
      ['Durumları test et','A, geri sayım, sabit hedef, hareket, yanlış giriş ve doğru giriş sırasını dene. Yankı gelmediğinde ayrı bir ölçüm uyarısı göster.'],
    ],
    codeDescription: 'Durum değişkeni bir anda tek değer taşır. Her döngüde tuşu oku, ardından o duruma ait geçişleri uygula. PIN girişini LCD’de yıldızlarla göster; makette yalnızca örnek PIN kullan.',
    tips: ['Mega D22–D29 sayıları Uno üzerinde bulunmaz.','Uzun delay blokları yerine zaman damgası kullanmak tuş takımının akıcı çalışmasını sağlar.'],
    challenges: ['Durum tablosuna her geçişe neden olan olayı yaz.','Bir iptal tuşu ekleyip yalnızca hazırlık durumunda etkinleştir.'],
  },
  'weather-station': {
    title: 'Mini hava istasyonu',
    subtitle: 'Sıcaklık, bağıl nem ve ortam ışığını bir arada izle.',
    duration: '3 saat',
    description: 'İki sensörden farklı türde veri al. Sıcaklık ve nemi LCD’de göster, dört LED ile seçtiğin koşulları duyur.',
    idea: 'DHT11 fiziksel birimlerle sıcaklık ve nem verir. LDR değeri ise kalibrasyon olmadan mutlak ışık birimi değildir. İkisini ekranda doğru birimlerle ayır.',
    materials: [['Arduino Uno',1],['DHT11 modülü',1],['LDR',1],['10 kΩ direnç',1],['16×2 paralel LCD',1],['10 kΩ kontrast potansiyometresi',1],['Mavi, kırmızı, yeşil ve sarı LED',4],['220–330 Ω direnç',4],['Kablo takımı',1]],
    wiringNotes: 'DHT DATA→D2. 5V→LDR→A0 düğümü→10 kΩ→GND. Mavi/kırmızı/yeşil/sarı LED→D6/D7/D8/D9, her biri ayrı dirençle. '+parallelLcd,
    steps: [
      ['DHT’yi sınayarak bağla','Sensörü 5V ve GND’ye bağla. DATA=D2, model=DHT11 seç. İki saniyelik aralıkla sıcaklık ve nem değerlerini göster.'],
      ['Işık aralığını ölç','A0 değerini karanlıkta ve aydınlıkta kaydet. İki farklı değer elde ettiğinde bunları yüzde 0 ve 100 için sınır olarak al.'],
      ['Ekranı kur','LCD’nin ilk satırında sıcaklık ve bağıl nemi, ikincisinde bağıl ışık yüzdesini göster. Aydınlık ve karanlık sınırlarını aşan değerleri 0–100 içinde sınırla.'],
      ['Dört göstergeyi bağla','Mavi için 18 °C altı, kırmızı için 28 °C üstü, yeşil için %70 üzeri nem, sarı için %80 üzeri bağıl ışık koşulu kur. Bunlar modelin deneme eşikleridir.'],
      ['Ölçüm hatasını işle','DHT geçersiz değer verirse onun LED kararlarını güncelleme, ekranda sensör hatası göster. Işık ölçümü bağımsız devam edebilir.'],
      ['Karşılaştır','LDR’yi örtüp tekrar aç. Nem ve sıcaklık sabitken hangi göstergenin değiştiğini açıklayıp gözlemini tabloya ekle.'],
    ],
    codeDescription: 'Yaklaşık her iki saniyede DHT’yi ve A0’ı oku. Kalibrasyonun min ve maks değerleri farklıysa ışığı yüzdelik aralığa dönüştür. Ekran satırlarını ve her LED’in kendi koşulunu güncelle.',
    tips: ['Işık yüzdesi o düzenekte seçtiğin iki ölçüme göredir.','A1–A5 burada LCD için dijital hatlardır; A0 ışık ölçümü için boş kalır.'],
    challenges: ['Celsius’tan Fahrenheit’a F = C × 9/5 + 32 dönüşümünü yap.','Ders başlangıcı ve sonundaki ölçümleri aynı yerde karşılaştır.'],
  },
  'traffic-pedestrian': {
    title: 'Yaya düğmeli trafik ışığı',
    subtitle: 'Butona basıldığını hatırlayan bir kavşak maketi yap.',
    duration: '2 saat',
    description: 'Araç ışıklarını sırayla değiştir ve yaya isteğini uygun aşamada işle. Masaüstü karton maket kullan.',
    idea: 'Kısa bir basış, yayaİsteği adlı değişkende saklanır. Araç yeşilden sarıya, ardından kırmızıya geçince bu istek kontrollü biçimde karşılanır.',
    materials: [['Arduino Uno',1],['Araç için kırmızı, sarı, yeşil LED',3],['Yaya için farklı renkte LED',1],['220–330 Ω direnç',4],['Anlık buton',1],['Deney tahtası ve kablo takımı',1]],
    wiringNotes: 'Araç kırmızı/sarı/yeşil LED→D13/D12/D11, yaya LED’i→D10, her LED ayrı dirençle GND’ye. D2 ile GND arasındaki buton için INPUT_PULLUP seç. Basılınca LOW okunur.',
    steps: [
      ['Işıkları etiketle','Her LED’i kendi direnciyle kur. Her çıkışı tek tek yakarak araç ve yaya ışıklarını model üzerinde tanımla.'],
      ['Basma olayını oku','D2’yi INPUT_PULLUP yap. HIGH’dan LOW’a geçişte isteği kaydet. Tek basışı birden fazla saymamak için kısa sıçrama filtresi kullan.'],
      ['Araç sırasını yaz','Zaman damgasıyla yeşil 5 saniye, sarı 2 saniye ve kırmızı 5 saniye aşamalarını kontrol et. Her turda butonu da oku.'],
      ['Geçişi aç','Araç kırmızı durumundayken bekleyen yaya isteği varsa kırmızıyı koru ve yaya LED’ini 10 saniyelik geçiş için yak.'],
      ['Geçişi kapat','Son üç saniyede yaya LED’ini yanıp söndür. Geçiş sonunda önce yayayı söndür, sonra araç yeşiline dön. İşlenen isteği temizle.'],
      ['Çakışmayı dene','Yeşilin ortasında kısa bir basış yap. Buton bırakılmış olsa bile istek işlenmeli. Yaya ve araç yeşili hiçbir anda beraber yanmamalı.'],
    ],
    codeDescription: 'Buton olayı isteği kaydeder. Zamanı dolan durum bir sonraki duruma ilerler. Yaya geçişi boyunca araç kırmızısı her turda korunur.',
    tips: ['Uzun delay kullanılırsa kısa basışlar kaçabilir.','İç çekme direnci kullanılırken butonun basılı mantığı LOW’dur.'],
    challenges: ['Her durumun giriş, çıkış ve süresini bir tabloya geçir.','Bir araç ve iki yaya ile karton kavşakta maketin geçişlerini anlat.'],
  },
  'scrolling-sign': {
    title: 'Kayan yazılı mini tabela',
    subtitle: '8×8 pikselde bir kelimeyi sütun sütun kaydır.',
    duration: '4 saat',
    description: 'MAX7219 sürücülü bir matriste harfleri bitmap olarak çiz. Sola ilerleyen görüntüye sağdan birer sütun ekle.',
    idea: 'Her harfin pikselleri bir desen oluşturur. Ekranı bütünüyle değiştirmek yerine sekiz satırın her birini bir piksel kaydırarak hareket görüntüsü üret.',
    materials: [['Arduino Uno',1],['MAX7219 sürücüsü ve bileşenleri takılı 8×8 LED matris modülü',1],['Bağlantı kablosu',5]],
    wiringNotes: 'MAX7219 modülünde DIN→D11, CS/LOAD→D10, CLK→D13, VCC→5V, GND→GND. Kartın giriş tarafını kullan, DOUT çıkıştır.',
    steps: [
      ['Bağlantıyı başlat','Kullandığın sürücü uzantısında veri, saat ve seçim pinlerini modüle göre tanımla. Düşük parlaklıkla ekranı temizle.'],
      ['Yönü bul','Sol üst köşe için tek piksel komutu ver. Hangi köşenin yandığını işaretleyip satır/sütun yönünü ayarla.'],
      ['Harfi tasarla','Kareli kâğıtta A harfini 8×8 alana çiz. Her satırı sekiz bitlik bir desen olarak sakla ve ekrana gönder.'],
      ['Sütunları kaydır','Sekiz satırın her birini sola bir bit kaydır. Mesajın sıradaki sütunundaki biti sağ uçtan ekle. Harfler arasına boş sütun koy.'],
      ['Mesajı oynat','Önce LAB mesajını 100–150 ms’lik adımlarla göster. Son harfin ardından ekranı boşaltıp başa dön.'],
      ['Okunabilirliği sına','Hızı iki kez değiştir. Harfler aynalı görünürse bitlerin sütun sırasını incele.'],
    ],
    codeDescription: 'Ekran için sekiz satır değeri sakla. Her adımda satırdaki bitleri kaydır, bir sonraki harf sütununu ekle ve güncel satırları sürücüye yaz.',
    tips: ['Hazır modülde akım ayar direnci ve sürücü zaten bulunur. Bare entegreli farklı devrenin pin sırası birebir aynı değildir.','İlk testte tek modül ve düşük parlaklık kullan.'],
    challenges: ['İsmin için gereken yeni harfleri kareli kâğıtta oluştur.','Sola ve sağa kayan iki mod tasarla.'],
  },
  'plant-watering': {
    title: 'Süre sınırlı bitki sulama',
    subtitle: 'Toprak sensörünü kalibre et ve pompayı kısa süreli çalıştır.',
    duration: '3 saat',
    description: 'Kuru ve nemli toprakta kalibrasyon yapıp sulamayı kısa bir darbeyle başlatan sınıf prototipi kur.',
    idea: 'Toprağın suyu emmesi zaman alır. Her sulama darbesi sonrası bekleyip tekrar ölçerek pompanın aralıksız çalışmasını önle.',
    materials: [['Arduino Uno',1],['Analog toprak nem sensörü',1],['Küçük düşük gerilimli DC pompa',1],['Pompa akımına uygun sürücülü 5V röle modülü',1],['Motor akımına uygun koruma diyodu',1],['Pompaya uygun ayrı besleme',1],['Hortum ve su kabı',1],['Kablo takımı',1]],
    wiringNotes: 'Sensör analog çıkışı→A0. Sürücülü röle modülünün IN ucu→D7. Pompa beslemesinin artı hattını COM ve NO üzerinden pompanın artısına geçir. Koruma diyodunu pompa uçlarına ters paralel bağla, işaretli katot artıya gelsin.',
    steps: [
      ['Önce susuz elektroniği dene','Sensör ve röle modülünü bağla. Pompa yerine göstergenin durumunu gözle. Besleme bağlandığında pompa komutunun kapalı başladığını denetle.'],
      ['Kalibrasyon kaydet','A0 değerini kuru ve nemli örneklerde ölç. Hangisi daha büyükse ona göre kuru/ıslak yönünü belirle. İki okumanın arasına bir eşik seç.'],
      ['Pompayı ayrı besle','Öğretmenle pompanın gerilimini, sürücünün akım kapasitesini ve diyot yönünü kontrol et. Kuru taraftaki elektroniği su kabından ayrı yüksekte tut.'],
      ['Darbeyi sınırla','Örneğin kuru okuma birkaç kez doğrulanırsa pompayı 1 saniye çalıştırıp kesin olarak kapat. Küçük bir ölçü kabı ile verilen su miktarını ölç.'],
      ['Emilmesini bekle','Yeni karar vermeden en az 30 saniye bekle. Islak durumda ve geçersiz sensör değerinde pompayı kapalı tut.'],
      ['Denemeyi gözlemle','Öğretmen gözetiminde hortumu sabitle ve tek bir çevrim çalıştır. Toprak ıslakken ikinci bir darbe verilmediğini denetle.'],
    ],
    codeDescription: 'Başlangıçta çıkış kapalıdır. Geçerli kuru ölçüm ve bekleme süresi doluysa kısa pompa darbesi ver. Pompayı kapatınca sonSulama zamanını kaydet. Her karardan önce süreyi kontrol et.',
    tips: ['Pompayı Uno pinine bağlama. Suya yalnız üreticinin suyla teması için tasarladığı parçaları yerleştir.','Ölçtüğün kuru ve ıslak değerler aynıysa kalibrasyonu tekrarla.'],
    challenges: ['Pompa kapalıyken kaç ölçümün eşik altında kalması gerektiğini araştır.','Bir ders boyunca sulama sayısını ve toplam pompa süresini kaydet.'],
  },
  'arduino-clock': {
    title: 'RTC modüllü masa saati',
    subtitle: 'Saati LCD’de göster ve ayarlanan dakikada ses ver.',
    duration: '3,5 saat',
    description: 'Bir gerçek zaman saati modülünden zaman al. Düğmelerle alarmı ayarla, anahtarla etkinleştir ve alarmı tek basışta sustur.',
    idea: 'RTC enerjisi korunduğunda gerçek zamanı tutar. Alarm ayrı bir saat-dakika çiftidir. Eşleşme boyunca sadece bir kez tetiklenmesini sağla.',
    materials: [['Arduino Uno',1],['Uygun yedek pilli DS1307 RTC modülü',1],['16×2 paralel LCD ve 10 kΩ kontrast potu',1],['Anlık buton',3],['Sürgülü anahtar',1],['Küçük pasif piezo',1],['Kablo takımı',1]],
    wiringNotes: 'RTC SDA→A4, SCL→A5. Paralel LCD RS/E/D4/D5/D6/D7→D12/D11/D5/D4/D3/D2. Saat/dakika/sustur butonları→D6/D7/D8, etkinleştirme anahtarı→D10, piezo→D9. Buton ve anahtarları GND’ye karşı INPUT_PULLUP kur.',
    steps: [
      ['RTC’yi doğrula','Modüle uygun kütüphane ile saati bir kez ayarla. Normal program yeniden başladığında eski derleme saatini her açılışta yazma.'],
      ['LCD’yi bağla','Saat:dakika:saniye değerini ilk satıra iki basamaklı göster. İkinci satıra alarmın saatini ve durumunu yerleştir.'],
      ['Düğme işlevlerini kur','D6 basışında alarm saatini 0–23, D7 basışında dakikayı 0–59 aralığında ilerlet. D8 mevcut sesi keser.'],
      ['Anahtarı oku','D10 etkin konumdayken alarmı kullan. Açma veya kapama geçişlerinde LCD’de durumu güncelle.'],
      ['Tek seferlik zil kur','Saat ve dakika eşleştiğinde o güne ve dakikaya ait anahtarı saklayıp piezoyu çaldır. Aynı dakikada tekrar başlatma.'],
      ['Sınırları dene','Dakikayı 59’dan ve saati 23’ten ilerlet. Saati bir dakika sonrasına ayarla, zil çalınca sustur ve aynı dakikada yeniden başlamadığını doğrula.'],
    ],
    codeDescription: 'RTC’yi yaklaşık saniyede bir oku. Her turda buton geçişlerini denetle. Alarm etkin ve saat/dakika eşleşiyorsa, bu gün ve dakika henüz çalmadıysa sesi başlat. Sustur basılınca veya zaman sınırı dolunca piezoyu kapat.',
    tips: ['I²C hatları için A4 ve A5’i RTC’ye ayır. Bu projede paralel ekran dijital pinlerdedir.','Modülün pil yuvası ve şarj devresi ile uyumlu yedek pili kullan.'],
    challenges: ['Haftanın gününü ikinci satırda göstermek için bir düzen tasarla.','Alarm sustuğunda beş dakika sonrasına ertelenen bir seçenek ekle.'],
  },
};

export const turkishProjects: Project[] = projects.map(project => {
  const guide = projectGuides[project.slug];
  return {
    ...project,
    title: guide.title, subtitle: guide.subtitle, duration: guide.duration,
    description: guide.description, idea: guide.idea, wiringNotes: guide.wiringNotes,
    components: guide.materials.map(([name, quantity]) => ({ name, quantity })),
    steps: guide.steps.map(([title, description], index) => ({ step: index + 1, title, description })),
    codeDescription: guide.codeDescription, tips: guide.tips, challenges: guide.challenges,
  };
});
