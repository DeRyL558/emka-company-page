# Niezależne review

28.09.2026, świeży podagent `independent_review`, bez udziału w implementacji.
Baza: `aff0f14e43a50e2bf190cf6ecd0a60a56db17153`. Review objęło diff,
nowe CSS/JS, AGENTS.md oraz język wizualny. Reviewer sam uruchomił stronę
w Chromium i obejrzał własne screenshoty; nie opierał oceny tylko na raporcie autora.

**Wynik: brak blokujących ustaleń ani potwierdzonych regresji wymagających poprawki.**

- Własne rendery 1440/768/390/320 px × jasny/ciemny: dobra hierarchia,
  proporcje tytułu i autentyczny znak, jawne biuro i czytelne działy.
- 10/10 mailto/tel oraz teksty zgodne z bazą; ręcznie potwierdzone wszystkie
  osoby/przypisania, firma, rok, NIP, REGON, oba adresy i opis siedziby.
- 8/8 renderów bez poziomego overflow, błędów JS i HTTP ≥400; poprawne logo.
- Bez JS przy 320 px: oba motywy systemowe i wszystkie kontakty działają.
  Niedostępny localStorage nie blokuje przełączania.
- Logiczna kolejność klawiatury, obrys 3 px, skip link do main; nagłówki,
  lista osób i dl odpowiadają treści.
- Kontrast tekstu minimum 5,83:1 jasny i 8,46:1 ciemny; fokus i kontrolka >3:1.
- Dodatkowe szerokości 672/673/680/720/896 px oraz 200% bazowego rozmiaru
  tekstu na 390 px: bez overflow.
- CNAME/publikacja/obrazy bez zmian; brak zależności i obcych żądań runtime.

SHA-256 sprawdzonych plików (identycznych z commitem wdrożenia `000f50a`):

```text
bff10508a158113782cf8495410d00726cf0e8a9f18484ac132304e7a53640cc  index.html
22eabf0be522939629dbb9a65df07e5cbc1c1277635f0bd61a6e92bc1f5ca0ff  assets/site.css
c1f31d4d375781bad25ecd9b13b2c2d5f40f9ebc6162051933d2ddaae5913460  assets/theme.js
```

Ograniczenia review: Chromium na macOS, bez Safari/fizycznego telefonu/czytnika
ekranu. Reviewer badał 200% rozmiaru tekstu, autor osobno natywny zoom 200%.
Reviewer nie uruchamiał axe, poczty ani telefonów; nie potwierdza pełnej zgodności
WCAG ani działania publikacji. Własne dowody review zostały zachowane lokalnie;
porównywalny zestaw autora jest dołączony w [screenshots.md](screenshots.md).
