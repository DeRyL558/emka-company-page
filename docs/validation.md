# Weryfikacja finalnego wariantu — 28.09.2026

Badany kod: **`1c555258bce9b3bb48a2b3779401d114d70c0c6f`**.
Dokładny merge-base: `aff0f14e43a50e2bf190cf6ecd0a60a56db17153`.
Poprzedni wariant: `1637575cfa16c2d1e1ce0c9ba7c780ad25ea15a9`.
Kolejny commit uzupełnia wyłącznie dokumentację i obrazy. SHA-256 źródeł
znajdują się w [zapisie wyników](qa-results-v2.json) i [review](review-v2.md).

[Audyt bazowy](audit.md) · [Porównania aktualne](screenshots-v2.md) ·
[Walidacja pierwszej iteracji](validation-v1.md)

## Co oceniono

Większy tytuł szeryfowy nawiązuje do istniejącego logo. Złote biuro jest jedynym
mocnym polem akcentowym. Wspólna powierzchnia zespołu oraz kolumna tytułów
budują hierarchię bez otaczania każdej osoby kartą. Nazwa firmy pozostaje
nad tytułem branży, bez dopisywania usług lub sloganów. To decyzje projektowe,
nie dowód dotyczący autorstwa starej strony.

Animacja dotyczy wyłącznie kontrolki motywu (obrót symbolu 260 ms), reakcji
nawigacji/tła przycisku (160 ms) i strzałki odnośnika (180 ms, 3 px). Wszystkie
są wyłączone przy prefers-reduced-motion. Nie ma wejść/scroll reveal, parallaxu,
zmiany skali elementów ani pełnoekranowej animacji. Motyw stosuje się od razu.

## Kontrole wykonane

Chromium 151.0.7922.34 na macOS, Playwright i ręczny ogląd rzeczywistych renderów.

| Kontrola | Wynik finalnego kodu |
| --- | --- |
| 1440×900, 1280×900, 768×1024, 390×844, 320×844 × light/dark | 10/10 bez poziomego overflow, błędów JS/konsoli i niezaładowanych zasobów |
| Biuro | E-mail widoczny w pierwszym ekranie 390×844 i 320×844; pozostałe kontakty jawne |
| Dane względem merge-base | 6 mailto + 4 tel: identyczne href/teksty; 6 przypisań osoby/roli/działu zgodnych; nazwa, NIP, REGON, oba adresy, rok i opis siedziby zachowane |
| Semantyka | Jeden h1, header/main/footer, skip link, nagłówki działów, listy osób, dl danych |
| Klawiatura | Pełna kolejność 15 kontrolek/odnośników z widocznym fokusem 3 px; Enter/Spacja działają; skip link przenosi fokus do main, następny Tab do biura |
| Dotyk | Wszystkie widoczne linki i przycisk ≥44×44 px w 10 kombinacjach |
| No-JS | Oba motywy systemowe, cała treść i 10 kontaktów; nieaktywny przycisk ukryty |
| Storage | Niedostępny/błędny zapis nie blokuje; preferencja działa i pamięta się po odświeżeniu; ręczny wybór wygrywa z systemowym |
| Szybka mysz | 2 rzeczywiste kliknięcia co 100 ms: 2/2; 9 co 30 ms: 9/9. Motyw, aria-pressed i zapis zgodne, fokus zachowany |
| Szybka klawiatura | 9 naciśnięć Spacji: końcowy motyw i aria-pressed zgodne |
| Reduced motion | 0 animacji, transition-duration: 0s, motyw stosowany natychmiast |
| Logo | Oryginalne oba pliki bez zmian, właściwy widoczny wariant; multiply w jasnym wtapia białe tło, nie zmienia geometrii |
| Zasoby / metadane | Tylko lokalne zasoby runtime; favicon i publiczny og:image HTTP 200; CNAME/publikacja/obrazy bez zmian |

**Powiększenie:** natywny zoom Chromium 200%, potwierdzony devicePixelRatio=2
oraz innerWidth=outerWidth/2: viewporty 640×450 i 320×450 CSS px, oba motywy,
bez overflow i utraty kontaktów. Zapis przez Page.captureScreenshot uwzględnia
rzeczywisty rozmiar powiększonego dokumentu. Osobno reviewer sprawdził
powiększenie samego tekstu 200% przy 390/320 px, oba motywy: brak overflow.
Nie utożsamiamy tych dwóch prób.

## Dostępność i kontrast

axe-core 4.10.3: **0 violations** w 10 wariantach, 38 reguł zaliczonych na render.
Jeden incomplete nadal dotyczy pomocniczej strzałki ↓. Ma ona kolor tekstu
biura, kontrast 8,57:1 i aria-hidden; link ma pełną nazwę tekstową.

| Para z faktyczną powierzchnią | Jasny | Ciemny |
| --- | ---: | ---: |
| Główny tekst / tło strony | 13,46:1 | 15,31:1 |
| Pomocniczy / tło strony | 5,31:1 | 9,34:1 |
| Pomocniczy / panel kontaktów | 5,96:1 | 8,27:1 |
| E-mail / panel kontaktów | 6,64:1 | 9,09:1 |
| Telefon / panel kontaktów | 15,13:1 | 13,55:1 |
| Tekst i link / złote biuro | 8,57:1 | 8,57:1 |
| Granica kontrolki / tło strony | 3,89:1 | 6,40:1 |
| Fokus / tło strony | 5,91:1 | 10,02:1 |
| Fokus / złote biuro | 5,21:1 | 5,21:1 |

Pomiary z computed styles / luminancji sRGB i ogląd źródeł/renderów.
Automat oraz powyższe pomiary nie są pełnym audytem WCAG.

## Walidacja i review

HTML Validate 11.16.1 recommended: 0 błędów i ostrzeżeń; wyłączona wyłącznie
stylistyczna reguła tel-non-breaking, aby zachować zapis telefonów bazy.
CSS Tree 3.2.1, node --check theme.js i git diff --check: PASS.
Repo nie ma runnera ani CI; narzędzia QA są poza repo, brak nowych zależności.

Świeży reviewer sam przeczytał diff i obejrzał własne 8 renderów. Potwierdzone
problemy z prototypu zostały naprawione w tej samej gałęzi: blokowanie szybkich
kliknięć, brak spacji po składanym br oraz overflow przy dużym tekście.
Finalny retest: **brak otwartych problemów blokujących**. [Raport](review-v2.md).

## Ograniczenia i ryzyko

Bez Safari, Firefox, fizycznego telefonu, czytnika ekranu i badania użytkowników.
Nie inicjowano połączeń/maili; nie badano dostarczalności, danych rejestrowych,
produkcji ani cache podglądów społecznościowych. Nie wykonano merge lub
wdrożenia. Brak CI nie oznacza zaliczonych checks.

Ryzyko: odbiór zmienionej typografii i kolejności informacji; różnice systemowych
fontów między platformami; publikacja musi zawierać nowe lokalne CSS/JS wraz
z HTML. Podstawowa treść i kontakt pozostają dostępne bez JS.
Niejasność opisu siedziby Stargard / Adres Żarowo zachowana bez interpretacji.

Odbiór ręczny: rozpoznaj firmę i biuro na telefonie; znajdź transport/spedycję/
księgowość; przejdź Tabem i przełącz motyw Spacją/Enterem oraz szybko myszą;
sprawdź zapis po odświeżeniu, oba motywy przy 200%, 320 CSS px i bez JS;
porównaj wszystkie dane/odnośniki bez ich aktywowania; po publikacji sprawdź
HTTP 200 HTML/CSS/JS/logo/favicon i konsolę.
