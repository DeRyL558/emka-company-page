# Język wizualny eMKa — strona firmowa

Strona ma rozpoznawalny charakter firmowej papeterii i czytelnego spisu kontaktów.
Kolejność: znak i nawigacja → nazwa firmy i branża → biuro → działy → adresy/rejestr.
Nie budujemy rozbudowanej opowieści marketingowej z kilku danych kontaktowych.

## Kompozycja i typografia

- Tytuł branży używa systemowej Georgii: szeryfy łączą go z istniejącym logo.
  Drugi wiersz jest kursywą. Nazwa eMKa Monika Kogowska pozostaje bezpośrednio
  nad tytułem, a rok i siedziba pod nim. Nie zmieniamy treści na slogan.
- Treść i nawigacja: system-ui 1 rem/1.6. Nazwiska 1.1875 rem; numery telefonów
  mają systemowy krój o stałej szerokości i nie zmieniają zapisu.
- Szerokość maksymalna 72 rem. Na desktopie wprowadzenie i biuro zajmują
  wspólny pas; panel kontaktów ma kolumnę tytułu i spis po prawej.
- Działy są nagłówkami, osoby listą. Krótkie pionowe separatory wiążą nazwisko
  z jego odnośnikami, poziome rozdzielają działy. Nie otaczamy osób kartami.
- Dane firmy pozostają na spokojnym tle: dwa adresy, pod nimi pełny rejestr.
  Na małym ekranie naturalna kolejność DOM przechodzi w jedną kolumnę.
- Fonty i odstępy używają rem; na telefonie marginesy/padding mają limit vw,
  aby powiększanie tekstu nie zabierało miejsca na treść. Tytuł i długie adresy
  mogą się zawijać; nie ukrywamy globalnego overflow.

## Logo i powierzchnie

- Oryginalne niesezonowe logo.png i logo-dark.png, bez kadrowania, deformacji
  i zmian plików. Proporcja 1812:685. `mix-blend-mode: multiply` w jasnym
  wariancie wtapia białe tło oryginalnego pliku w powierzchnię strony.
- Neutralne tło #f1f2ef / #171c19 i powierzchnia kontaktów #fff / #202722
  porządkują grupy. Ciemny motyw jest zaprojektowany osobno w tych samych rolach.
- Jeden mocny akcent: złote pole biura #e5c477 z tekstem #30291b (8,57:1).
  To rozwinięcie złotego akcentu poprzedniej strony, nie nowy kolor marki.
- Tekst: #232725 / #f0f2ed; pomocniczy #5f6561 / #b8c1b9;
  linki #775718 / #e5c477. Nie stosujemy cieni, gradientów ani pigułek etykiet.
  Promień .25 rem służy tylko delikatnemu wykończeniu powierzchni/kontrolki.

## Interakcja i dostępność

- Kontakty są jawne i działają bez JS. Link jest odnośnikiem, przycisk zmienia
  motyw. Wszystkie główne cele mają min.44×44 px; kontrolka motywu min.48 px.
- Fokus 3 px, odstęp 4 px. Złote biuro ma własny kolor fokusu #234c7c.
  Skip link prowadzi do main; nagłówki, listy i dl zachowują strukturę treści.
- Przycisk „Ciemny motyw” ma stałą nazwę i aria-pressed. CSS obraca dwubarwny
  symbol o 180° w 260 ms; stan strony zmienia się natychmiast. Szybkie kliknięcia
  nie są blokowane. Preferencja zostaje pod kluczem `theme`, zapis jest opcjonalny.
- Animujemy wyłącznie drobne reakcje: podkreślenie nawigacji/tło kontrolki
  160 ms, symbol 260 ms, strzałka linku do działów o 3 px w 180 ms.
  Nie stosujemy pełnoekranowych przejść, animowanych wejść ani ruchu przy scrollu.
- Wszystkie przejścia są wewnątrz prefers-reduced-motion: no-preference.
  Przy reduce działanie i widoczność nie zależą od animacji.
- Bez JS działa systemowy motyw CSS, a nieaktywny przycisk jest ukryty.
  Brak bibliotek, zewnętrznych fontów, analityki i żądań do obcych podmiotów.

## Treść i inspiracje

Nie dopisujemy usług, obietnic, skali floty ani zasięgu. „Adres” w Żarowie,
„Adres korespondencyjny” w Stargardzie i opis siedziby w Stargardzie pozostają
oddzielnymi informacjami, których nie interpretujemy samodzielnie.

Punkty odniesienia są zasadami, nie źródłem kodu lub skopiowanych materiałów:
[Impala / Pentagram](https://www.pentagram.com/work/impala) — powiązanie detali
z językiem branży; [Paul Smith / Limesharp](https://limesharp.net/projects/paul-smith-2025-redesign)
— rozwinięcie istniejącego znaku i charakteru marki w typografii/kompozycji.
[CSS transitions / web.dev](https://web.dev/learn/css/transitions) opisuje
mechanizm i uwzględnianie preferencji ruchu.

Zmiany sprawdzamy w obu motywach na 1440/1280/768/390/320 px, z klawiaturą,
bez JS/pamięci, przy zoomie 200% i powiększonym tekście. Wynik automatu jest
uzupełnieniem oceny renderu, nie deklaracją pełnej zgodności WCAG.
