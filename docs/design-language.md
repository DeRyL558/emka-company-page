# Język wizualny eMKa — strona firmowa

Strona ma ułatwiać rozpoznanie firmy oraz znalezienie właściwego kontaktu.
Kolejność: znak i nawigacja → nazwa/branża/rok → biuro → kontakty działów →
adresy i rejestr. Wszystkie kontakty są jawne, również bez JavaScript.

- Używamy niesezonowych `assets/logo.png` i `assets/logo-dark.png`, bez filtrów,
  kadrowania ani deformacji. Rozmiar obrazu zachowuje proporcję 1812:685.
- Czerń/biel pochodzą z logo, złoty akcent linków z dotychczasowej strony.
  Tokeny w `assets/site.css` obejmują tekst, tło, link, separator, kontrolkę
  i fokus. Jasny: #fff / #202224, link #806019; ciemny: #17191b / #f0f0ed,
  link #e3c16f. Kolor nie zastępuje podkreślenia ani nazwy działu.
- Font systemowy, treść 1 rem / 1.6, tytuł 2–2.75 rem, nagłówek sekcji 1.5 rem.
  Maksymalna szerokość 70 rem; publiczna wizytówka nie przyjmuje gęstości ERP.
- Główne sekcje oddzielamy odstępem i pojedynczą linią. Osoby są listą pod
  wspólnym nagłówkiem działu, rejestr jest dl. Nie tworzymy kart w kartach,
  pigułek, gradientów, cieni ani ozdobnych ilustracji.
- Siatka składa się zgodnie z DOM; poniżej 42 rem przechodzi w jedną kolumnę.
  Długie odnośniki mogą się łamać. Nie stosujemy globalnego ukrywania overflow.
- Linki prowadzą do kontaktu/sekcji; przycisk zmienia motyw. Cele mają min.
  44 px wysokości. Fokus: obrys 3 px z odstępem 4 px. Jest skip link i main.
- Przycisk „Ciemny motyw” jest przełącznikiem z aria-pressed. Pamięta ręczny
  wybór pod istniejącym kluczem `theme`. Bez zapisu działa w bieżącej wizycie;
  bez JS CSS wybiera motyw systemowy, a nieaktywny przycisk jest ukryty.
- Bez animacji, zewnętrznych fontów, analityki, osadzeń i zależności runtime.
- Teksty są konkretne i polskie. Nie dopisujemy usług, zasięgu ani obietnic.
  „Adres” (Żarowo), „Adres korespondencyjny” (Stargard) i informacja o siedzibie
  w Stargardzie pozostają oddzielnymi danymi; nie rozstrzygamy ich znaczenia.

Przy zmianach sprawdzamy oba motywy, 1440/1280/768/390/320 px, klawiaturę,
200% powiększenia, brak JS i niedostępne localStorage. Audyt automatyczny
uzupełniamy oceną renderu; nie jest pełnym potwierdzeniem zgodności WCAG.
