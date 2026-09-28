# Audyt i kierunek — 28.09.2026

Baza: `aff0f14e43a50e2bf190cf6ecd0a60a56db17153`, aktualny `origin/main`
sprawdzony przed utworzeniem gałęzi `IDE/feature/company-page-redesign`.
Remote: `https://github.com/DeRyL558/emka-company-page.git`.
Repozytorium nie miało AGENTS.md, runnera testów ani konfiguracji CI.
Publiczny HTML pobrany z https://emka-ts.eu/ miał ten sam SHA-256 co bazowy
`index.html`: `f6bd3631515a988ac046fc7f4d33d32966485ec967953b0140cfc41e59df68ac`.
Osobno obejrzano publiczny render oraz lokalny render dokładnej bazy.

Kategorie: **B** — potwierdzone w Chromium; **K** — wniosek z kodu;
**P** — ocena projektowa, nie dowód pochodzenia strony. P1: blokuje istotny
cel; P2: utrudnia; P3: dopracowanie. Nie stosujemy „wyniku AI”.

| Element / dowód | Obserwowany problem | Wpływ na użytkownika | Proponowana zmiana | Priorytet |
| --- | --- | --- | --- | --- |
| header.hero (B) | Stała kolumna logo 120 px i trzy kolumny na telefonie; przy 320 px strona ma 361 px szerokości. Przy 390 px nazwa łamie się na trzy wiersze. | Poziome przewijanie i słaba proporcja znaku do nazwy. | Osobny elastyczny nagłówek, proporcjonalne logo, treść w naturalnym przepływie. | P1 |
| Kontakt w details wewnątrz .card (B) | Wszystkie adresy i telefony domyślnie schowane; przy 390 px sekcja jest poniżej obu adresów. | Dodatkowe szukanie i kliknięcie przed podstawowym zadaniem. | Biuro przy wprowadzeniu, wszystkie kontakty działowe jawne. | P1 |
| .cards / .card (P + B) | Opis, rejestr, adresy i kontakt mają podobną wagę; krótki opis zostawia dużo pustego pola obok rejestru. | Trudniej rozpoznać kolejność ważności. | Wprowadzenie → kontakt według działu → adresy/rejestr. | P2 |
| .kv (B + K) | Przy <600 px etykiety i wartości to sześć osobnych wierszy z separatorami; struktura to divy. | Wysoki blok wypiera kontakt; słabsze powiązanie etykiety z wartością. | dl/dt/dd, każda para pozostaje razem. | P2 |
| Cienie, promienie 14/18 px, podwójna obudowa kontaktu (P) | Każdy blok ma obrys i cień, także zagnieżdżone details. | Oprawa konkuruje z informacją. | Płaskie sekcje, pojedyncze separatory; mały promień tylko kontrolek. | P2 |
| .gold-rule i .section-title::after (P) | Gradientowe kreski powtarzają akcent w prawie każdej części. | Wiele podobnych wyróżnień osłabia hierarchię. | Zachować złoty akcent linków; usunąć dekoracyjne kreski. | P3 |
| .pill (B + P) | Działy są czytelne, ale etykieta powtarza się przy każdej osobie; jasne tło pigułek pozostaje w ciemnym motywie. | Dodatkowy szum i niepotrzebnie duży kontrast powierzchni. | Działy jako wspólne nagłówki, role jako zwykły tekst. | P2 |
| Motyw (B + K) | Przycisk 36×36 px, nazwa nie mówi o stanie; localStorage czytany/zapisywany bez try/catch. | Mały cel; awaria pamięci może przerwać inicjalizację i zmianę motywu. | Przycisk ≥44 px z tekstem, aria-pressed i odpornym zapisem; systemowy fallback CSS. | P2 |
| Logo (B + K) | Oba niesezonowe warianty istnieją i zachowują proporcje, ale znak jest tłem div, nie img. | Słabsza semantyka i mały znak w kwadratowej ramie. | Zachować oryginalne pliki, img z alt i naturalnymi proporcjami, dobór motywu przez CSS. | P2 |
| Ciemny motyw (B + K) | Jasne przerywane linie .kv/.contact i pigułki mają kolory niezależne od motywu. | Separatory przyciągają nadmierną uwagę. | Wspólne tokeny obu motywów. | P3 |
| Semantyka (K) | Brak main; jedno h1 i natywne details są poprawnymi punktami wyjścia. | Brak głównego landmarku utrudnia nawigację pomocniczą. | header/main/footer, skip link; nagłówki opisujące rzeczywiste grupy. | P2 |
| Dane (K) | Opis mówi „z siedzibą w Stargardzie”, blok „Adres” wskazuje Żarowo, korespondencja Stargard. | Możliwa niejasność znaczenia adresów. | Zachować wszystkie wartości i etykietę „Adres”; nie nazywać go samodzielnie siedzibą. | P2 |

## Zachowane dobre rozwiązania

Krótka treść bez niepotwierdzonych obietnic, lokalne zasoby, polski język,
bezpośrednie mailto/tel, dwa warianty logo, preferencja motywu, brak zewnętrznych
fontów i formularza. Natywne details działa bez JS, ale nie odpowiada priorytetowi
widoczności głównego kontaktu w tej konkretnej stronie.

## Wybrany kierunek (przed implementacją)

Spokojna wizytówka: logo i krótka nawigacja, pełna nazwa firmy oraz branża i rok
założenia, widoczny e-mail biura, kontakty według działów, potem adresy i rejestr.
Szerokość treści około 70 rem, font systemowy 16 px, większy tytuł dostosowany
do strony publicznej. Neutralna biel/czerń wynikają z istniejącego znaku;
złoto pozostaje oszczędnym akcentem linków ze starej strony. Bez dekoracyjnego
ruchu, stockowych zdjęć, nowych usług i zagnieżdżonych kart.

## Niesprawdzone na etapie audytu

Nie weryfikowano prawdziwości danych w rejestrach, dostarczalności poczty ani
osiągalności telefonów. Nie inicjowano wiadomości lub połączeń. Nie badano
Safari, fizycznego telefonu, czytnika ekranu ani komfortu użytkowników.
Wyniki kontroli wdrożenia i porównania: [validation.md](validation.md).
