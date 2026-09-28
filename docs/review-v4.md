# Niezależne review kandydata v4 — eMKa

Data: 2026-09-28. Zakres: finalny diff względem `aff0f14e43a50e2bf190cf6ecd0a60a56db17153` oraz samodzielny render lokalnej strony `http://127.0.0.1:8765/company-page-redesign/`. Branch `IDE/feature/company-page-redesign`, HEAD przed zmianami `e4ef94946d9ad07741585579c0d4bb8c80d8788b`; kandydat niezacommitowany. Odczytano `AGENTS.md`, kod runtime i `docs/design-language.md` — również po aktualizacji dokumentacji do v4. Repozytorium nie było edytowane przez reviewera.

**Werdykt końcowy: brak otwartych findings P0–P3. Potwierdzony P3 czytelności przy tekście 200% został poprawiony i niezależnie ponownie sprawdzony.** Ocena dotyczy badanego kandydata i opisanych warunków Chromium.

## Finding rozwiązany i retest finalnego CSS

**[P3 — rozwiązany] Fragmentowanie numerów rejestrowych przy tekście 200%.** Pierwszy kandydat miał w `assets/site.css:121–123` dwie sztywne kolumny z `overflow-wrap:anywhere`. Przy 320 px / tekst 200% NIP dzielił się na `8541 / 6773 / 79`, a REGON na `5113 / 9430 / 2`; przy 390 px każdy zajmował dwa wiersze. Nie ginęła treść, lecz identyfikatory były trudniejsze do odczytania. Pierwotny dowód i pomiary zachowano w `before-p3/`.

Autor zmienił siatkę na `repeat(auto-fit, minmax(min(100%, 12ch), 1fr))`. Niezależny retest potwierdził pełny NIP i REGON po jednym wierszu przy 320 i 390 px / tekst 200%, w obu motywach; `scrollWidth == clientWidth`, logo bez deformacji. Obejrzano nowe kadry `final-320-light-text200-data.png` i `final-390-dark-text200-data.png`; wszystkie pomiary znajdują się w `final-retest.json`. Przy normalnym tekście na 320 px siatka również przechodzi do jednej kolumny. To czytelny układ bez utraty danych, lecz wizualnie różni się od pierwszego kandydata z numerami obok siebie.

Autor skorygował też przejścia kolorów dziedziczonych. Niezależnie ponowiono morph light→dark i dark→light, dziewięć kliknięć co 35 ms oraz reduced-motion. Maska, tarcza, promienie i obrót mają wartości pośrednie w trakcie animacji; po odczekaniu ≥550 ms animacje kończą się całkowicie (0 aktywnych). Kliknięcia zachowują fokus i każdorazowo synchronizują motyw, aria-label, title oraz localStorage. Reduced-motion: 0 animacji, transition 0s, scroll auto. Obejrzano cztery nowe kadry `final-morph-*.png`. Retest nie ujawnił nowych problemów.

## Niezależna ocena wizualna

- Kompozycja ma charakter skromnej strony firmowej: oryginalny znak, szeryfowa nazwa branży, jedno złote pole biura i uporządkowany spis. Nie dopisano usług, obietnic ani pozornej skali przedsiębiorstwa. Informacje istniejące w bazie są zachowane.
- Przeniesienie danych firmy wyżej porządkuje tożsamość firmy. Nazwa jest jednoznaczna, NIP/REGON są osobnymi parametrami, a dwa adresy mają zachowane różne etykiety. Rozwinięcie kontaktów nie wypycha nazwy firmy pod listę osób.
- Biuro jest widoczne także przy zamkniętych kontaktach. Złote pole wyróżnia główną drogę kontaktu. Nagłówek „Kontakt” i plus/minus wystarczają do zrozumienia disclosure bez usuniętego podtytułu.
- Jasny i ciemny motyw są spójne w hierarchii i odstępach. W ciemnym wariancie powierzchnia danych pozostaje odróżnialna od tła, a tekst i odnośniki czytelne. Własne kadry obejrzano na desktopie oraz 390 i 320 px.
- Symbol słońca z promieniami i sierp księżyca są rozpoznawalne w faktycznym 24 px rozmiarze. Cienka okrągła obwódka przycisku jest spójna z kontrolką kontaktów. Dynamiczna nazwa akcji i title pasują do działania; brak aria-pressed jest zgodny z przyjętym wariantem przycisku akcji.
- Morph obejrzano w samodzielnie zebranych kadrach obu kierunków: zanik promieni, wzrost/zmniejszanie tarczy i przesuwanie maski dają płynne przejście do prawidłowego symbolu. Nie stwierdzono znikania symbolu, skoku po końcu przejścia ani warstwy blokującej kolejne kliknięcie.
- Widoczny fokus przycisku jest pełnym, czytelnym pierścieniem w obu motywach; nie jest obcięty. Obejrzano `focus-button-light.png` i `focus-button-dark-after.png`.
- Logo nie znika i zachowuje proporcję 1812:685. Przy 320 px / tekst 200% ma 288×108,859 px, przy 390 px / tekst 200% 231×87,313 px. Przy 320 px i powiększonym tekście przycisk przechodzi do następnego wiersza — nie nakłada się na znak.

## Wykonane kontrole

Własny skrypt `review.cjs`, uzupełnienie `extra.cjs`, Chromium `151.0.7922.34`, Playwright; zasoby pobrane lokalnie. Testy nie uruchamiały mailto/tel.

| Kontrola | Wynik / dowód |
|---|---|
| 1440, 1280, 768, 390 i 320 px, oba motywy, kontakty zamknięte/otwarte | 20 renderów, `scrollWidth == clientWidth == innerWidth`; wszystkie obrazy zapisane |
| 390×844 i 320×844 z powiększeniem tekstu do 200%, oba motywy | 4 rendery pierwszego kandydata oraz 4 scenariusze retestu po poprawce; brak overflow i utraty logo, P3 rozwiązany |
| Rzeczywiste szybkie kliknięcia przełącznika | 9 `page.mouse.click` z odstępami 35 ms; każde zmienia theme, nazwę akcji i localStorage; fokus pozostaje na przycisku; stan końcowy prawidłowy |
| Klawiatura przełącznika | Enter i Space zmieniają motyw; osobno sprawdzono widoczny fokus |
| Tab przy zamkniętych kontaktach | Skip link → Kontakt → Dane firmy → motyw → biuro → Kontakty do działów → summary; ukryte kontakty pomijane |
| Szybka nawigacja podczas rozwijania | Kontakt → po 45 ms Dane firmy; końcowo hash `#dane`, fokus `dane`, sekcja na y≈32 px, kontakty otwarte |
| Deep link `#kontakt` | Kontakty otwarte po załadowaniu |
| Bez JS, oba motywy, 390 px | CSS respektuje motyw systemowy, przycisk ukryty, biuro widoczne, native summary działa Enter/Space i kliknięciem |
| Zablokowany localStorage | Systemowy motyw startowy i ręczna zmiana działają bez błędu JS |
| Reduced motion | 0 aktywnych animacji, transform/disclosure transition `0s`, scroll-behavior `auto` |
| Kolory tekstu | Niezależnie policzone kontrasty 18 reprezentatywnych par computed style: minimum 5,31:1; nie stanowi pełnego audytu WCAG |
| Dane i href względem merge-base | 10 par widoczny tekst + mailto/tel identycznych i w tej samej kolejności; wszystkie 4 osoby mają zachowane przypisanie do działu i odnośniki; nazwa, NIP, REGON, oba adresy zgodne |
| Autentyczność zasobów i publikacja | `logo.png`, `logo-dark.png` oraz CNAME bez diffu względem merge-base |
| Zasoby i konsola | Brak błędów JS/konsoli, brak nieudanych requestów; wszystkie zebrane żądania strony lokalne |
| `git diff --check` | PASS |

`results.json` przechowuje geometrię, logo, href, tab order, requesty i wyniki interakcji; `extra-results.json` — pomiary morph, kontrastu i numerów rejestrowych przed poprawką. `final-retest.json` — 6 scenariuszy reflow (320/100%, 320/200%, 390/200%, oba motywy), morph, szybkie kliknięcia i reduced-motion po finalnej poprawce CSS. Własne PNG w tym samym katalogu.

## Ograniczenia

Nie wykonano niezależnie natywnego browser zoom 200%, testu Safari/Firefox, testu na fizycznym telefonie, czytnika ekranu ani axe. Text 200% oznacza w tym review zmianę bazowego font-size przez wstrzyknięty CSS, a mobile oznacza faktyczny wąski viewport Chromium z emulacją mobile/touch. Nie sprawdzano produkcji ani statusu wdrożenia. Nie aktywowano połączeń i poczty. Nie kopiowano wyników autora do tabeli wykonanych kontroli.

Sprawdzone SHA-256 runtime przy końcowym odczycie:

- `index.html`: `9685682caf513ac6116a6a248d569545fdd9483db52ba61f606232c49aa9b8f0`
- `assets/site.css`: `af0b184077111a27b5eecea09c5b765e99ed2e34ff4ec7f954f3ad4b5cea779b`
- `assets/theme.js`: `5e22dd53155e187a5babddbfbdb553f0feb5f07d502181ede3a32c2d0d681fbc`
- `assets/navigation.js`: `89a8c38abf4299a9a7662159301e44b72b8e9a0986db38946d71da480b9b299f`

Pierwsza macierz renderów poprzedzała usunięcie dwóch pustych wierszy z index.html; uzupełniające kadry i retest dotyczyły powyższego HTML. Po głównej macierzy autor zmienił CSS siatki numerów rejestrowych i przypisania przejść kolorów; zakres zależny od tych zmian został ponownie sprawdzony skryptem retest.cjs. Pozostałe JS, dane i paleta końcowa pozostały bez zmian. Starsze PNG bez prefiksu final pokazują kandydata przed poprawką P3; aktualną korektę obrazują final-*.png.


## Materiały dołączone do PR

Kod finalny: `cb2b61d3b3d7ea21a9092d512d1efc3b55aaf00a`. [Pomiary końcowego retestu](review-v4/final-retest.json) i [wybrane własne kadry reviewera](review-v4/) dołączono do tego raportu. Pozostałe własne materiały review zachowano w lokalnym zestawie przekazanym użytkownikowi.
