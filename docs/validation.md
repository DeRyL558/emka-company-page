# Weryfikacja: dane firmy wyżej i przełącznik słońce/księżyc

28.09.2026. Kod: **`cb2b61d3b3d7ea21a9092d512d1efc3b55aaf00a`**. Poprzedni wariant: `e4ef94946d9ad07741585579c0d4bb8c80d8788b`.
Dokładny merge-base i zweryfikowany origin/main: `aff0f14e43a50e2bf190cf6ecd0a60a56db17153`.
Kolejny commit dodaje dokumentację i dowody. [JSON](qa-results-v4.json) zawiera
SHA-256 czterech plików runtime i szczegółowe pomiary.

[Audyt bazowy](audit.md) · [56 screenshotów przed/po](screenshots-v4.md) ·
[Niezależne review](review-v4.md) · [Historyczna walidacja v3](validation-v3.md).

## Rezultat

Dane firmy są wyróżnioną powierzchnią przed kontaktami działów: pełna nazwa,
NIP/REGON, następnie dwa adresy. Na telefonie logo i przycisk motywu zajmują
pierwszy rząd, nawigacja kolejny. Numery automatycznie przechodzą w jedną kolumnę,
gdy powiększony tekst potrzebuje więcej miejsca. Biuro pozostaje zawsze jawne.

Przycisk motywu ma sam symbol 24 px w okręgu min.48×48 px. Słońce oznacza
bieżący jasny motyw, księżyc ciemny. Aria-label i title opisują akcję:
„Włącz ciemny motyw” / „Włącz jasny motyw”, bez aria-pressed. Lokalny SVG
płynnie zmienia kształt tarczy i maski; promienie zanikają, symbol lekko się
obraca. Transformacje, paleta i logo: 420 ms; opacity promieni: 200 ms.
Tekst interpoluje kolor na własnym elemencie, aby dziedziczenie nie wydłużało
przejścia. Usunięto podtytuł „Transport, spedycja i rozliczenia”.

Zachowano native details, płynne przewijanie/rozwijanie, zapis preferencji,
no-JS i reduced-motion. Nowe zależności/żądania do podmiotów trzecich: brak.
CNAME, publikacja, favicon i oryginalne obrazy bez zmian.

## Wykonane kontrole

Chromium 151.0.7922.34 na macOS przez Playwright; ręczny ogląd rzeczywistych
renderów, klatek przejścia i fokusu, uzupełniony pomiarami. Brak runnera/CI
w repo; narzędzia testowe są poza projektem. Nie uruchamiano hosted Actions.

| Kontrola | Wynik |
| --- | --- |
| 1440×900, 1280×900, 768×1024, 390×844, 320×844 × jasny/ciemny | Stany zwinięty i otwarty: brak poziomego overflow; obrazy poprawnie decode(); brak błędów JS/konsoli/zasobów |
| Dane kontra dokładny merge-base | 6 mailto + 4 tel: identyczne href, tekst i 6 przypisań; nazwa, NIP, REGON, oba adresy, opis siedziby i rok założenia zachowane |
| Hierarchia | #dane przed #kontakt w DOM; nazwa/numery przed adresami, jedno h1; biuro widoczne w pierwszym ekranie 390/320 |
| Klawiatura i fokus | 16 celów przy otwartych kontaktach; fokus 3 px; skip link, Enter/Spacja przełącznika i summary; Tab do pierwszego kontaktu |
| Rozmiary | Linki/przycisk ≥44×44 px; przycisk motywu 48×48 px przy standardowym tekście; summary min.86 px wysokości |
| Przycisk motywu | Nazwa akcji/title/data-theme zgodne z motywem; kształt, maska i obrót interpolują w obu kierunkach; po 550 ms brak aktywnych przejść |
| Szybkie akcje | 2 rzeczywiste kliknięcia co 100 ms i 9 co 30 ms bez zgubionych zdarzeń; 9 szybkich Spacji, poprawne DOM/nazwa/storage/fokus |
| Nawigacja i disclosure | Oba odnośniki #kontakt, deep link, historia, szybkie Kontakt → Dane: PASS; pośrednie wysokości/scroll potwierdzają ruch |
| Reduced motion | 0 aktywnych animacji, 0s dla ikony, scroll auto; funkcje nadal działają |
| No-JS, oba motywy | Biuro jawne; summary natywnie ujawnia pozostałe 9 odnośników; motyw systemowy, ukryty nieaktywny przycisk |
| LocalStorage | Niedostępny/błędny zapis nie blokuje strony; reload i pierwszeństwo wyboru nad systemem działają |
| Zoom Chromium 200% | Natywny zoom, DPR=2, viewport 640×450 i 320×450 CSS px, oba motywy; brak overflow/utraty 10 kontaktów |
| Tekst 200% | 390 i 320 px w obu motywach: brak overflow, prawidłowa proporcja/niezerowy rozmiar logo, numery w jednej kolumnie bez łamania cyfr |
| Zasoby i metadane | Lokalne zasoby runtime; favicon i publiczny og:image HTTP 200; logo 1812:685 bez zmian plików |
| Podgląd file:// | Motyw, rozwijanie i nawigacja działają; zapisano nagranie, brak błędów JS |
| Składnia | HTML Validate 11.16.1 recommended: 0 błędów/ostrzeżeń; CSS Tree 3.2.1, node --check obu JS i git diff --check: PASS |

W HTML Validate wyłączono wyłącznie stylistyczną regułę tel-non-breaking,
aby nie zmieniać bazowego zapisu telefonów. Nie dodawano infrastruktury testowej
ani zależności do repozytorium. Po dwóch poprawkach CSS powtórzono końcowe
rendery, interakcje, kontrole dostępności i powiększenia.

## Dostępność i kontrast

Axe-core 4.10.3: **0 violations** w 10 renderach z otwartymi kontaktami
(45 zaliczonych reguł) i 2 renderach ze zwiniętymi kontaktami. Incomplete
color-contrast dotyczy wyłącznie dekoracyjnej strzałki `.department-link > span`:
aria-hidden, link ma pełną nazwę, kontrast ręcznie policzony 8,57:1.
Automat nie stanowi pełnego audytu WCAG.

Kontrasty computed styles w ustalonych stanach:

| Para | Jasny | Ciemny |
| --- | ---: | ---: |
| Główny tekst / strona | 13,46:1 | 15,31:1 |
| Pomocniczy tekst / strona | 5,31:1 | 9,34:1 |
| Nazwa firmy / pole danych | 15,13:1 | 13,55:1 |
| Etykieta / pole danych | 5,96:1 | 8,27:1 |
| Link kontaktu / strona | 5,91:1 | 10,27:1 |
| Symbol motywu / strona | 5,91:1 | 10,27:1 |
| Symbol motywu / tło hover | 6,64:1 | 9,09:1 |
| Granica przycisku / strona | 3,89:1 | 6,40:1 |
| Fokus / strona | 5,91:1 | 10,02:1 |
| Tekst i link / biuro | 8,57:1 | 8,57:1 |
| Fokus / biuro | 5,21:1 | 5,21:1 |

## Review i ograniczenia

Świeży niezależny reviewer sam przeczytał diff względem merge-base, zebrał
własne rendery i obejrzał oba kierunki morph, oba motywy i fokus. Drobny problem
P3 z łamaniem NIP/REGON przy tekście 200% poprawiono w tej gałęzi i poddano
retestowi. Szczegółowy werdykt, dowody i zakres: [review-v4.md](review-v4.md).

Nie testowano Safari/Firefox, fizycznego telefonu/klawiatury, czytnika ekranu,
produkcji/cache, rejestrów przedsiębiorcy ani dostarczalności kontaktów.
Nie aktywowano mailto/tel. Nie wykonano merge ani wdrożenia. Viewport Chromium
nie jest dowodem testu fizycznego urządzenia ani innej przeglądarki.

Ryzyko wdrożenia: należy opublikować HTML razem z CSS i oboma JS. Fonty systemowe
mogą nieznacznie różnić się między platformami. Starsze przeglądarki bez
interpolate-size/::details-content zachowują natywne otwieranie bez animacji;
nie sprawdzano takiej przeglądarki. Bez JS link przewija do summary i użytkownik
rozwija je natywnie. Niejednoznaczność „siedziba Stargard” / „Adres Żarowo”
zachowano bez interpretacji.

Odbiór: desktop/telefon → odnajdź biuro i dane firmy; sprawdź cały numer NIP/REGON
przy większym tekście; otwórz działy obydwoma linkami i zamknij summary; przejdź
Tabem, użyj Spacji/Enter na motywie; przełącz go zwyczajnie i szybko, odśwież;
sprawdź 200%, 320 CSS px, no-JS i reduced-motion. Po publikacji sprawdź zasoby
oraz konsolę. Wszystkie dane i href porównaj bez inicjowania kontaktu.
