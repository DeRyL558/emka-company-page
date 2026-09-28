# emka-company-page

Statyczna strona firmowa: HTML, CSS i niewielki JS. Przed zmianą wyglądu
przeczytaj [docs/design-language.md](docs/design-language.md).

- Zachowuj nazwę firmy, dane, oba adresy oraz przypisanie osób i kontaktów.
  Nie dodawaj niepotwierdzonych usług ani deklaracji marketingowych.
- Podstawowa treść i kontakt działają bez JS. Motyw ma systemowy fallback
  i odporny na niedostępne localStorage zapis preferencji.
- Nie dodawaj frameworków, bundlerów, zewnętrznych fontów ani żądań do
  podmiotów trzecich. Zasoby strony pozostają lokalne.
- CNAME i konfigurację publikacji zmieniaj tylko na wyraźne polecenie.
- Sprawdzaj faktyczny render w obu motywach, telefon 390 i 320 px, desktop,
  fokus/klawiaturę, reflow, kontrast, zasoby oraz zgodność mailto/tel z bazą.
  Nie uruchamiaj połączeń ani nie wysyłaj wiadomości w ramach testów.
- Po zmianie animacji sprawdź również szybkie rzeczywiste kliknięcia, zmianę
  celu podczas rozwijania kontaktów oraz prefers-reduced-motion.
- W PR podaj bazę i sprawdzony kod, dowody przed/po, wykonane kontrole
  i ograniczenia. Nie nazywaj emulacji Chromium testem Safari lub telefonu.
