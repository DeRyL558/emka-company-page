# Weryfikacja przebudowy — 28.09.2026

## Badany kod i zakres

- Dokładny merge-base i ponownie pobrany `origin/main`:
  `aff0f14e43a50e2bf190cf6ecd0a60a56db17153`.
- Commit z kompletnym wdrożeniem HTML/CSS/JS:
  `000f50aa031ed79100ff556d13f01ebb0d33e672`. Późniejszy commit dodaje wyłącznie
  dokumentację i dowody; nie zmienia badanego kodu strony.
- Gałąź `IDE/feature/company-page-redesign`, osobny worktree, remote zweryfikowany.
- Chromium 151.0.7922.34 / Playwright na macOS. Rendery prawdziwej strony,
  nie makiety. Ręczna ocena screenshotów i podglądu przeglądarkowego uzupełnia
  pomiary DOM i zdarzenia klawiatury wysyłane przez automat.
- [Audyt](audit.md), [porównania przed/po](screenshots.md),
  [niezależne review](review.md), [zapis wyników](qa-results.json).

| Kontrola | Wynik |
| --- | --- |
| 1440×900, 1280×900, 768×1024, 390×844, 320×844; light/dark | 10/10: scrollWidth = clientWidth, brak przycięć danych w obejrzanych renderach |
| Baza 320 px | Potwierdzone 361 px szerokości dokumentu; wynik 320 px |
| Widoczność biura | Jawny odnośnik w pierwszym ekranie 390×844 i 320×844; bez details |
| Kontakty | 6 mailto + 4 tel: href i widoczne teksty identyczne z bazą; 6 przypisań osoby/roli/działu zgodnych |
| Dane | Nazwa, NIP, REGON, oba adresy, rok 2001 i informacja o siedzibie zachowane |
| Klawiatura | Skip link → nawigacja → przełącznik → biuro → działy; 16 kolejnych celów z obrysem 3 px; Enter/Spacja obsługują motyw |
| Skip link i kotwice | Enter przenosi fokus do main; kolejny Tab do biura; Kontakt i Dane firmy przewijają do właściwych sekcji |
| Cele dotykowe | Wszystkie widoczne linki i przycisk ≥44×44 px we wszystkich 10 kombinacjach |
| Bez JavaScript | 390×844 light/dark: cała treść, 10 kontaktów, motyw systemowy; nieaktywny przycisk ukryty |
| localStorage niedostępne | Błąd SecurityError przy dostępie: start z motywu systemowego, kolejne przełączenia działają bez błędów JS |
| Preferencja motywu | Zapis i odświeżenie w obu kierunkach; ręczny wybór wygrywa z systemowym; błędna wartość ignorowana; zmiana systemowa aktualizuje stan bez zapisanego wyboru |
| Logo | Jeden widoczny poprawny wariant na motyw; oryginalne obrazy 1812×685, bez deformacji; oba pliki bez zmian |
| Ruch | Brak animacji; również przy prefers-reduced-motion: reduce |
| Zasoby i konsola | Brak pageerror/console.error, odpowiedzi wymaganych lokalnych zasobów 200 we wszystkich 10 renderach; tylko ten sam origin |
| Metadane | Zachowane title/description/favicon; absolutny og:image, wymiary i alt; favicon oraz publiczne logo HTTP 200 |
| Statyczność | Bez frameworka, bundlera, bibliotek runtime, fontów zewnętrznych, formularza, analityki i cookies |
| CNAME / publikacja | Bez zmian; logo, favicon i materiały sezonowe bez zmian; materiały sezonowe niewykorzystywane |

## Rzeczywiste powiększenie i reflow

W osobnym profilu pełnego Chromium ustawiono **natywny zoom 2.0**, przez
`chrome.settingsPrivate.setDefaultZoom(2)`. Potwierdzono `devicePixelRatio = 2`
oraz `innerWidth = outerWidth / 2`; nie użyto CSS zoom ani samego skalowania
screenshota. Przy obszarze treści 1280×900 uzyskano **640×450 CSS px**, a przy
640×900 — **320×450 CSS px**. Przed i po, oba motywy, identyczne warunki i stan
początkowy: 8 screenshotów. Wynik zachowuje wszystkie 10 jawnych kontaktów
oraz szerokość dokumentu równą 640 lub 320 px. Baza przy 320 CSS px nadal ma
361 px i ukryte kontakty. Obejrzano render powiększony.

Próba otwarcia ustawień zoomu w nietrwałym kontekście Chromium zakończyła się
awarią przeglądarki; finalny test wykonano skutecznie w izolowanym trwałym
profilu testowym. To problem narzędzia, nie błąd konsoli strony.
Reviewer dodatkowo sprawdził 200% rozmiaru tekstu na 390 px oraz granice
672/673/680/720/896 px bez poziomego overflow.

## Dostępność i kontrast

axe-core **4.10.3**: **0 violations** w każdej z 10 kombinacji. 38 reguł zaliczonych
w każdym renderze. Jeden `incomplete` dotyczył znaku strzałki ↓ (automat nie
ocenia samych znaków nietekstowych). Strzałka jest pomocnicza, aria-hidden,
ma kolor linku i kontrast **5,83:1 / 10,18:1**; link ma pełną nazwę tekstową.

Pomiary z computed styles, według luminancji względnej sRGB:

| Para z tłem strony | Jasny | Ciemny |
| --- | ---: | ---: |
| Tekst główny | 15,96:1 | 15,44:1 |
| Tekst pomocniczy | 6,05:1 | 8,46:1 |
| Link / strzałka | 5,83:1 | 10,18:1 |
| Granica przycisku | 4,32:1 | 5,91:1 |
| Fokus | 6,64:1 | 10,23:1 |
| Tekst przycisku na tle hover/aktywnego | 14,14:1 | 12,47:1 |

Ręcznie oceniono hierarchię nagłówków, dwa rodzaje adresów, proporcje logo,
grupy kontaktów, kolejność tabulacji, fokus i brak nakładania tekstu. Nie jest
to pełny audyt ani deklaracja zgodności WCAG.

## Walidacja źródeł

- `node --check assets/theme.js`: PASS.
- HTML Validate **11.16.1**, zestaw recommended: 0 błędów, 0 ostrzeżeń po
  wyłączeniu wyłącznie stylistycznej reguły `tel-non-breaking`. Zwykłe spacje
  w telefonach zachowano identycznie jak w bazie; numery mogą się zawijać.
- CSS Tree **3.2.1**: poprawna składnia i wartości rozpoznanych właściwości;
  wartości oparte na zmiennych dodatkowo ocenione w faktycznym renderze.
- `git diff --check`: PASS. Brak istniejącego runnera projektu/CI do uruchomienia.
- Narzędzia QA i pobrany Chromium znajdowały się poza repozytorium; nie dodano
  package.json, lockfile ani zależności produkcyjnych.

## Niezależny reviewer

Świeży podagent osobno przeczytał diff i nowe pliki, uruchomił własny Chromium,
obejrzał 8 renderów 1440/768/390/320 × light/dark i wykonał dodatkowe próby.
**Brak blokujących ustaleń i potwierdzonych regresji wymagających poprawki.**
Szczegóły oraz hashe zgodne z badanym kodem: [review.md](review.md).

## Kontrole niewykonane / ograniczenia

Nie testowano Safari, Firefox, fizycznego telefonu, czytnika ekranu ani obsługi
przez rzeczywistych klientów firmy. Nie uruchamiano mailto/tel, nie wysyłano
wiadomości i nie inicjowano połączeń. Nie potwierdzono dostarczalności poczty,
telefonów, zgodności z rejestrem przedsiębiorców ani semantyki rozbieżności
„siedziba Stargard” / „Adres Żarowo”. Nie wykonano wdrożenia ani merge.
Nie sprawdzono odświeżenia cache podglądu w serwisach społecznościowych.
Nie uruchamiano hosted Actions; brak projektu testowego nie jest wynikiem CI.

## Ryzyko i odbiór po publikacji

Ryzyko ogranicza się głównie do zmiany kolejności i prezentacji informacji
oraz ładowania nowych lokalnych CSS/JS. Publikacja musi zawierać `index.html`,
`assets/site.css` i `assets/theme.js`. Treść/kontakt pozostają dostępne bez JS.

1. Otwórz stronę na desktopie i telefonie: firma oraz e-mail biura są od razu
   rozpoznawalne, działy poprzedzają dane firmy.
2. Przejdź Tabem przez skip link, nawigację i motyw; przełącz Spacją/Enterem,
   odśwież i potwierdź zapamiętanie.
3. Sprawdź wszystkie osoby, adresy e-mail i numery bez inicjowania kontaktu;
   porównaj oba adresy i NIP/REGON z obecną stroną.
4. Ustaw 200% i wąski ekran; potwierdź reflow, brak poziomego przewijania,
   czytelność adresów oraz właściwe logo w obu motywach.
5. Wyłącz JS; sprawdź kontakty i systemowy motyw. Po publikacji sprawdź
   lokalne CSS/JS/logo/favicon (HTTP 200) i konsolę.
