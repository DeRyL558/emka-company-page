# Weryfikacja wariantu z rozwijanymi kontaktami — 28.09.2026

Badany kod: **`b8681ee7692ab7f9d21d59bfbba596524e98e130`**. Dokładny merge-base i aktualny origin/main:
`aff0f14e43a50e2bf190cf6ecd0a60a56db17153`. Poprzedni wariant: `d8edaaa654af3b1834633bf71b7ee0e3bd6a189c`.
Commit po implementacji dodaje wyłącznie dokumentację i screenshoty;
[QA JSON](qa-results-v3.json) zawiera SHA-256 czterech plików HTML/CSS/JS.

[Audyt bazy](audit.md) · [46 screenshotów](screenshots-v3.md) ·
[Niezależne review](review-v3.md) · [Historyczne wyniki v2](validation-v2.md).

## Wynik i zachowanie

Motyw przenika przez 420 ms; równolegle symbol przesuwa się i obraca, a warianty
logo przenikają. To przejścia rzeczywistych elementów CSS, bez nakładki obrazu
przechwytującej kliknięcia. Kontakty działów są domyślnie zwinięte w natywnym
`details`. Oba linki do #kontakt rozwijają listę, ustawiają fokus na summary
i płynnie przewijają po zmianie jej wysokości. Biuro pozostaje stale widoczne.

Pełna nazwa firmy, NIP i REGON poprzedzają adresy w DOM i renderze. Usunięto
powtórzenie nazwy nad h1. Copyright zmieniono z 2025 na aktualny 2026.
Nie zmieniono informacji o założeniu w 2001 r. ani danych firmy/kontaktów.

## Wykonane kontrole

Chromium 151.0.7922.34 na macOS, rzeczywisty render przez Playwright,
automatyczne pomiary i ręczny ogląd screenshotów. Repo nie ma runnera ani CI;
narzędzia QA pozostają poza projektem, bez nowych zależności runtime.

| Kontrola | Wynik |
| --- | --- |
| 1440×900, 1280×900, 768×1024, 390×844, 320×844 × light/dark | Brak poziomego overflow w stanach zwiniętym i rozwiniętym; brak błędów JS/konsoli i brakujących zasobów |
| Biuro na telefonie | E-mail w pierwszym ekranie 390×844 i 320×844; bez rozwijania |
| Dane wobec merge-base | 6 mailto + 4 tel: identyczne wartości i teksty, 6 zgodnych przypisań; nazwa, NIP, REGON, oba adresy i opis siedziby zachowane |
| Klawiatura | Kolejność 16 elementów przy otwartych kontaktach; fokus 3 px, skip link, Enter/Spacja na motywie i summary; następny Tab dociera do pierwszego kontaktu |
| Dotyk | Widoczne odnośniki/przycisk ≥44×44 px; summary jest całym szerokim wierszem o wysokości ≥100 px |
| Nawigacja | Oba odnośniki #kontakt, bezpośredni hash, powrót w historii i szybka zmiana celu: PASS |
| Ruch kontaktów | Zmierzone pośrednie wysokości podczas otwierania i zamykania; smooth scroll z pośrednimi pozycjami, poprawny końcowy fokus |
| Motyw | Po 100 ms kolor tła pośredni rgb(197,198,195), między jasnym rgb(241,242,239) i ciemnym rgb(23,28,25); symbol 420 ms |
| Szybkie akcje | 2 kliknięcia co 100 ms i 9 co 30 ms: wszystkie odebrane; 9 szybkich Spacji: zgodne DOM/aria/storage |
| Reduced motion | Brak animacji, duration 0s, scroll-behavior auto; funkcje działają |
| No-JS, oba motywy | Biuro dostępne, summary natywnie otwiera pozostałe 9 odnośników, systemowy motyw; nieaktywny switch ukryty |
| Storage | Niedostępny i błędny zapis nie blokują strony; zapis po odświeżeniu i pierwszeństwo jawnego wyboru nad systemem: PASS |
| Logo / zasoby | Oryginalne pliki/proporcje; jeden opis dostępny dla przenikających wariantów; tylko lokalne zasoby runtime |
| Metadane | Favicon i publiczny absolutny og:image HTTP 200; domena/CNAME/publikacja bez zmian |
| Podgląd offline | Motyw, kontakt, nawigacja przez file:// i konsola: PASS |

**Powiększenie:** natywny zoom Chromium 200% (devicePixelRatio=2,
innerWidth=outerWidth/2): 640×450 i 320×450 CSS px, oba motywy, otwarte kontakty,
bez overflow i utraty 10 odnośników. Osobno tekst 200% przy 390/320 px, oba
motywy: PASS. Reviewer dodatkowo sprawdził tekst 200% na desktopie 1440 px.

HTML Validate 11.16.1 recommended: 0 błędów/ostrzeżeń; wyłączona tylko reguła
stylistyczna tel-non-breaking, aby zachować bazowy zapis telefonów.
CSS Tree 3.2.1, `node --check` obu JS i `git diff --check`: PASS.

## Dostępność i kontrast

axe-core 4.10.3: **0 violations** w 10 renderach z otwartymi kontaktami
(45 zaliczonych reguł w każdym) oraz dwóch z kontaktami zwiniętymi.
Jeden incomplete dla dekoracyjnej strzałki biura: aria-hidden, pełny tekst linku,
ręcznie potwierdzony kontrast 8,57:1. To nie jest pełny audyt WCAG.

Kontrast w końcowych, nieruchomych stanach, obliczony z computed styles:

| Para | Jasny | Ciemny |
| --- | ---: | ---: |
| Tekst główny / strona | 13,46:1 | 15,31:1 |
| Tekst pomocniczy / strona | 5,31:1 | 9,34:1 |
| Tekst pomocniczy / kontakty | 5,96:1 | 8,27:1 |
| E-mail / kontakty | 6,64:1 | 9,09:1 |
| Telefon / kontakty | 15,13:1 | 13,55:1 |
| Tekst i link / biuro | 8,57:1 | 8,57:1 |
| Granica switcha / strona | 3,89:1 | 3,80:1 |
| Granica rozwijania / panel | 4,37:1 | 5,67:1 |
| Fokus / strona | 5,91:1 | 10,02:1 |
| Fokus / biuro | 5,21:1 | 5,21:1 |

## Niezależne review

Świeży reviewer sam przeczytał diff i obejrzał własne rendery. Znalazł błąd
szybkiego przejścia Kontakt → Dane firmy podczas ekspansji. Naprawiono go
w tej samej gałęzi: każdy cel czeka na stabilny układ, ostatnia nawigacja wygrywa.
Retest 9/9 na 1440/390/320 px; **brak otwartych potwierdzonych usterek**.
[Raport, zakres i ograniczenia](review-v3.md).

## Niewykonane kontrole, ryzyko i odbiór

Bez Safari, Firefox, fizycznego telefonu/klawiatury, czytnika ekranu i badań
użytkowników. Nie aktywowano mailto/tel, nie badano dostarczalności ani danych
w rejestrach. Bez merge, wdrożenia, sprawdzania produkcyjnego cache i hosted CI.

Starsze przeglądarki bez interpolate-size/::details-content otworzą natywne
kontakty bez animacji wysokości; nie testowano takiej przeglądarki. Bez JS link
do kontaktu przewija do summary, a użytkownik otwiera listę natywnie. Ruch
wyłączony preferencją reduced-motion jest zamierzonym zachowaniem.

Ryzyko wdrożenia: publikacja musi dostarczyć HTML razem z oboma JS i CSS;
systemowe fonty mogą nieco różnić się między platformami. Niejednoznaczność
„siedziba Stargard” / „Adres Żarowo” zachowana bez interpretacji.

Odbiór: na desktopie i telefonie znajdź biuro; otwórz działy każdym odnośnikiem,
zamknij summary; przejdź klawiaturą; przełącz motyw normalnie i szybko,
odśwież; sprawdź kolejność nazwa/NIP/REGON/adresy oraz 2026; sprawdź 200%,
320 CSS px, reduced-motion i no-JS. Po publikacji sprawdź lokalne zasoby i konsolę.
