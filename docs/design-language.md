# Język wizualny eMKa — strona firmowa

Strona ma rozpoznawalny charakter firmowej papeterii i czytelnego spisu kontaktów.
Kolejność: znak i nawigacja → branża i biuro → dane firmy → rozwijane działy.
W danych firmy najpierw nazwa i numery rejestrowe, pod nimi dwa adresy.
Nie budujemy rozbudowanej opowieści marketingowej z kilku danych kontaktowych.

## Kompozycja i typografia

- Tytuł branży używa systemowej Georgii: szeryfy łączą go z istniejącym logo.
  Drugi wiersz jest kursywą. Rok założenia i opis siedziby są pod tytułem;
  pełna nazwa firmy znajduje się w danych rejestrowych. Nie dodajemy sloganu.
- Treść i nawigacja: system-ui 1 rem/1.6. Nazwiska 1.1875 rem; numery telefonów
  mają systemowy krój o stałej szerokości i nie zmieniają zapisu.
- Szerokość maksymalna 72 rem. Na desktopie wprowadzenie i biuro zajmują
  wspólny pas; otwarty panel kontaktów ma kolumnę działów i spis po prawej.
- Działy są nagłówkami, osoby listą. Krótkie pionowe separatory wiążą nazwisko
  z jego odnośnikami, poziome rozdzielają działy. Nie otaczamy osób kartami.
- Dane firmy są jednym wyróżnionym polem z cienką granicą. Pełna nazwa jest
  nagłówkiem (32 px na desktopie, 28 px na telefonie), obok NIP i REGON;
  adresy zajmują drugi rząd. Numery korzystają z siatki auto-fit:
  przy powiększonym tekście przechodzą w jedną kolumnę, bez łamania cyfr. Tożsamość firmy pozostaje nad kontaktami również
  po ich rozwinięciu. Na telefonie układ przechodzi w jedną kolumnę.
- Logo i przycisk motywu zajmują pierwszy rząd nagłówka na telefonie,
  nawigacja drugi. Flex z zawijaniem zachowuje logo także przy tekście 200%.
- Fonty i odstępy używają rem; na telefonie marginesy/padding mają limit vw,
  aby powiększanie tekstu nie zabierało miejsca na treść. Tytuł i długie adresy
  mogą się zawijać; nie ukrywamy globalnego overflow.

## Logo i powierzchnie

- Oryginalne niesezonowe logo.png i logo-dark.png, bez kadrowania, deformacji
  i zmian plików. Proporcja 1812:685. `mix-blend-mode: multiply` w jasnym
  wariancie wtapia białe tło oryginalnego pliku w powierzchnię strony.
- Neutralne tło #f1f2ef / #171c19 i powierzchnia danych firmy #fff / #202722
  porządkują grupy. Ciemny motyw jest zaprojektowany osobno w tych samych rolach.
- Jeden mocny akcent: złote pole biura #e5c477 z tekstem #30291b (8,57:1).
  To rozwinięcie złotego akcentu poprzedniej strony, nie nowy kolor marki.
- Tekst: #232725 / #f0f2ed; pomocniczy #5f6561 / #b8c1b9;
  linki #775718 / #e5c477. Nie stosujemy cieni, gradientów ani pigułek etykiet.
  Promień .25 rem wykańcza powierzchnie. Kontakty mają tylko separatory;
  okrągły plus/minus i przycisk motywu tworzą spójną parę kontrolek.

## Interakcja i dostępność

- Biuro jest stale widoczne. Działy są domyślnie zwiniętym, natywnym details
  z summary: działają myszą, dotykiem i klawiaturą również bez JS.
  „Kontakt” i „Kontakty do działów” prowadzą do #kontakt; JS dodatkowo otwiera
  listę, przenosi fokus do summary i przewija. Link bezpośredni #kontakt otwiera
  listę przy JS. Bez JS odnośnik dociera do nagłówka, a summary otwiera listę.
- Główne cele mają min.44×44 px; cały przycisk motywu min.48 px.
  Fokus 3 px z odstępem 4 px; złote biuro używa #234c7c. Skip link prowadzi
  do main; numery rejestrowe mają dl, adresy znaczniki address.
- Przycisk motywu jest okrągły, ma min.48×48 px i sam symbol 24 px. Słońce
  oznacza bieżący jasny motyw, księżyc ciemny. Dynamiczne aria-label i title
  opisują akcję: „Włącz ciemny motyw” / „Włącz jasny motyw”. Nie łączymy
  zmiennej nazwy akcji z aria-pressed ani nie pokazujemy mylącej stałej etykiety.
- Autorski SVG płynnie zmienia kształt: promienie zanikają, tarcza rośnie,
  przesuwana maska wycina sierp, a cały symbol lekko obraca się. Transformacje
  trwają 420 ms, zanik promieni 200 ms, równolegle z przenikaniem palety i logo.
  Animacja dotyczy prawdziwych elementów CSS, bez warstwy blokującej kliknięcia.
  Kolor tekstu interpolujemy na elementach tekstowych; kontenery zmieniają
  tylko tło i granice, aby dziedziczenie nie wydłużało przejścia.
  Włączamy ją po świadomym użyciu przełącznika, aby nie animować startu strony.
  Zapis pod kluczem theme jest opcjonalny; błąd localStorage nie blokuje strony.
- Rozwijanie/zamykanie kontaktów: 360 ms, obrót plusa w minus: 320 ms.
  Natywny ::details-content + interpolate-size mają fallback do zwykłego
  otwierania w przeglądarce bez tych właściwości. Scroll używa zachowania
  smooth przeglądarki, po zakończeniu zmiany wysokości listy. Przy szybkiej
  zmianie celu aktualna jest ostatnia nawigacja.
- prefers-reduced-motion wyłącza przenikanie, obrót, rozwijanie i płynny scroll.
  Ruch jest odpowiedzią na działanie użytkownika; nie ma animacji wejścia,
  parallaxu, pulsowania ani skalowania przy hover.
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
mechanizm i uwzględnianie preferencji ruchu;
[::details-content / MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content)
— animację treści natywnego elementu rozwijanego.
[Button / WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
wyjaśnia różnicę między zmienną nazwą akcji a stałą etykietą z aria-pressed.
Geometria ikony powstaje lokalnie w SVG; nie korzysta z biblioteki ikon.

Zmiany sprawdzamy w obu motywach na 1440/1280/768/390/320 px, z klawiaturą,
bez JS/pamięci, przy zoomie 200% i powiększonym tekście. Wynik automatu jest
uzupełnieniem oceny renderu, nie deklaracją pełnej zgodności WCAG.
