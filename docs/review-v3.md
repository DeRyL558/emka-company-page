# Niezależne review interakcji — 28.09.2026

Świeży podagent `review_interactions` sam przeczytał diff i uruchomił stronę.
Nie uczestniczył w implementacji i nie zmieniał repo. Zakres zmian:
`d8edaaa654af3b1834633bf71b7ee0e3bd6a189c` → finalna implementacja
`b8681ee7692ab7f9d21d59bfbba596524e98e130`, z odniesieniem danych do merge-base
`aff0f14e43a50e2bf190cf6ecd0a60a56db17153`.

**Po poprawce: brak otwartych potwierdzonych usterek w sprawdzonym zakresie.**

## Wykryte i naprawione

P2: rzeczywiste kliknięcie „Kontakt”, a po 35 ms „Dane firmy” ustawiało dobry
hash i fokus, lecz przewijało do zmieniającej pozycję sekcji. Przy 1440×900
początek danych kończył na 812 px zamiast około 484 px. Nawigacja czeka teraz
na stabilny układ również przy celu poniżej kontaktów; ostatni wybór wygrywa.
Retest: 3 próby × 1440/390/320 px, **9/9 poprawnych**.

SHA-256 sprawdzonego navigation.js:
`89a8c38abf4299a9a7662159301e44b72b8e9a0986db38946d71da480b9b299f`.

## Własna weryfikacja reviewera

- 12 renderów: 1440×900, 390×844, 320×844 × light/dark × kontakty zamknięte/
  otwarte. Ogląd screenshotów, brak overflow i axe violations, błędów strony,
  brakujących zasobów i żądań poza serwerem lokalnym.
- Hierarchia oceniona jako czytelna; biuro jawne, dane rejestrowe przed adresami.
  Na 320 px switch przechodzi do osobnego wiersza, bez przycinania.
- Pomiar 38 klatek zmiany motywu: 23 z kolorem pośrednim, przenikanie logo
  i ruch symbolu potwierdzone. 7 kliknięć co 35 ms: brak zgubionych zmian.
- Rozwijanie/zamykanie: pośrednie wysokości 100 → 593,59 → 100 px. Oba linki
  otwierają kontakty i przenoszą fokus. Hash, reload oraz historia wstecz/dalej: OK.
- Klawiatura/skip link/fokus 3 px/Enter/Spacja/Tab do pierwszego kontaktu: OK.
  Reduced-motion: 0s, scroll auto. No-JS: natywne summary; motyw systemowy;
  niedostępny storage i zapis preferencji po odświeżeniu: OK.
- Tekst 200% (root 32 px), 1440/390/320 × oba motywy: 6/6 bez overflow.
- Wszystkie 10 href/tekstów mail/tel, osoby/działy, NIP, REGON, oba adresy zachowane.

Dane pomiarowe w [QA JSON](qa-results-v3.json): `independentReviewInitial`
i `independentReviewRetest`. Pełny raport autora review, skrypty i własne PNG
zachowano w lokalnym pakiecie wyników `review-niezalezne-v3`.

## Ograniczenia

Chromium headless 151.0.7922.34. Bez Safari/Firefox, fizycznego telefonu lub
klawiatury, czytnika ekranu i natywnego zoomu przeglądarki. Zoom sprawdził
osobno autor implementacji. No-JS/storage/axe sprawdzono przed poprawką
synchronizacji scrollu; retest po niej obejmował nawigację, klawiaturę,
animację i tekst 200%; autor powtórzył pełny zestaw kontroli na finalnym kodzie.
Nie aktywowano kontaktów; nie testowano wdrożenia. To nie jest pełny audyt WCAG.
