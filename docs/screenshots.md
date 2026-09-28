# Porównania przed / po

Baza `aff0f14`; wynik `000f50a`. Ten sam viewport, skala urządzenia 1 i motyw.
PNG obejmują całą stronę, dlatego wysokość pliku zależy od treści.
„Przed” oznacza stan początkowy z zamkniętym kontaktem; osobno zapisano kontakt rozwinięty.
„Po” to stan początkowy ze wszystkimi kontaktami widocznymi.

| Viewport | Motyw | Przed | Przed: kontakt rozwinięty | Po |
| --- | --- | --- | --- | --- |
| 1440×900 | jasny | [PNG](screenshots/before-1440-light.png) | [PNG](screenshots/before-1440-light-contacts.png) | [PNG](screenshots/after-1440-light.png) |
| 1440×900 | ciemny | [PNG](screenshots/before-1440-dark.png) | [PNG](screenshots/before-1440-dark-contacts.png) | [PNG](screenshots/after-1440-dark.png) |
| 1280×900 | jasny | [PNG](screenshots/before-1280-light.png) | [PNG](screenshots/before-1280-light-contacts.png) | [PNG](screenshots/after-1280-light.png) |
| 1280×900 | ciemny | [PNG](screenshots/before-1280-dark.png) | [PNG](screenshots/before-1280-dark-contacts.png) | [PNG](screenshots/after-1280-dark.png) |
| 768×1024 | jasny | [PNG](screenshots/before-768-light.png) | [PNG](screenshots/before-768-light-contacts.png) | [PNG](screenshots/after-768-light.png) |
| 768×1024 | ciemny | [PNG](screenshots/before-768-dark.png) | [PNG](screenshots/before-768-dark-contacts.png) | [PNG](screenshots/after-768-dark.png) |
| 390×844 | jasny | [PNG](screenshots/before-390-light.png) | [PNG](screenshots/before-390-light-contacts.png) | [PNG](screenshots/after-390-light.png) |
| 390×844 | ciemny | [PNG](screenshots/before-390-dark.png) | [PNG](screenshots/before-390-dark-contacts.png) | [PNG](screenshots/after-390-dark.png) |
| 320×844 | jasny | [PNG](screenshots/before-320-light.png) | [PNG](screenshots/before-320-light-contacts.png) | [PNG](screenshots/after-320-light.png) |
| 320×844 | ciemny | [PNG](screenshots/before-320-dark.png) | [PNG](screenshots/before-320-dark-contacts.png) | [PNG](screenshots/after-320-dark.png) |

## Natywny zoom 200%

Te same warunki przed/po; `devicePixelRatio=2`, szerokość CSS o połowę mniejsza.

| Obszar przed zoomem → CSS | Motyw | Przed | Po |
| --- | --- | --- | --- |
| 1280×900 → 640×450 | jasny | [PNG](screenshots/before-zoom200-1280-light.png) | [PNG](screenshots/after-zoom200-1280-light.png) |
| 1280×900 → 640×450 | ciemny | [PNG](screenshots/before-zoom200-1280-dark.png) | [PNG](screenshots/after-zoom200-1280-dark.png) |
| 640×900 → 320×450 | jasny | [PNG](screenshots/before-zoom200-640-light.png) | [PNG](screenshots/after-zoom200-640-light.png) |
| 640×900 → 320×450 | ciemny | [PNG](screenshots/before-zoom200-640-dark.png) | [PNG](screenshots/after-zoom200-640-dark.png) |

## Pozostałe dowody

- Publiczna strona: [1440](screenshots/public-1440-light.png), [390](screenshots/public-390-light.png).
- Bez JS: [jasny](screenshots/after-no-js-light.png), [ciemny](screenshots/after-no-js-dark.png).
- Fokus przełącznika: [jasny](screenshots/after-focus-light.png), [ciemny](screenshots/after-focus-dark.png).
- [Wyniki i ograniczenia](validation.md).
