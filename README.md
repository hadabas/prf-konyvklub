# Virtuális Könyvklub Platform
Az SZTE programrendszerek fejlesztése nevű kurzusára készített program.
## Használat:
Először el kell dönteni, hogy hagyományos vagy dockeres módban szeretnénk futtatni a programot. A dockeres az egyszerűbb, az az ajánlott.
## Dockeres futtatás:
1. Klónozzuk az állományt a következő paranccsal:
   ```
   git clone 'https://github.com/hadabas/prf-konyvklub.git'
   ```
2. Navigáljunk egy terminállal a letöltött mappába, és adjuk ki a következő parancsot:
   ```
   docker build -t konyvklub_image .
   ```
Ez elkezd építeni egy image-t a letöltött dockerfile alapján, ezt várjuk végig türelmesen (30-60 másodperc, de ez internet/hardver sebességtől függően több is lehet.)

3. Ha végzett a buildelés, adjuk ki a következő parancsot:
   ```
   docker run -p 4200:4200 -p 5000:5000 konyvklub_image
   ```
Ki kell kötnünk a 4200-as és az 5000-es portot is a működéshez. A háttérben úgy működik, hogy párhuzamos szálakon futtatja a szervert és a klienst is, és a végén az interaktív terminálba mind a kettő standard outputja ki lesz kötve (de a háttérben fut a szerver, és a kliens is.)


4. Ha ez a parancs is lefutott (vigyázzunk, mert lehet hogy 1-2 percet várni kell a futtatás során hogy tényleg minden lefusson, a package installációk eltarthatnak egy ideig), akkor hozzáférhetünk a klienshez a
   **http://localhost:4200**
címen a böngészőnkben.
