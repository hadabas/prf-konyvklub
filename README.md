# Virtuális Könyvklub Platform
Az SZTE programrendszerek fejlesztése nevű kurzusára készített program. Az adatbázis megvalósítása és használata a háttérben, felhőn keresztül történik, az órán tárgyalt MongoDB Atlas szolgáltatás használatával, emiatt az adatbázis-szolgáltatás telepítésével a felhasználónak nem kell foglalkoznia.

Fontos megjegyezni még, hogy a program helyes működéséhez **folyamatos internetelérés szükséges** (a program telepítésénél is, de mivel felhőn keresztül kommunikál az adatbázissal, ezért az alapvető működéshez is.)

A kliens és szerver telepítéséhez pedig a lentebb tárgyalt lépések szükségesek.
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
Ki kell kötnünk a 4200-as és az 5000-es portot is a működéshez. A háttérben úgy működik, hogy párhuzamos szálakon futtatja a szervert és a klienst is, és a végén a terminálba mind a kettő standard outputja ki lesz kötve (de a háttérben fut a szerver, és a kliens is.)


4. Ha ez a parancs is lefutott (vigyázzunk, mert lehet hogy 1-2 percet várni kell a futtatás során hogy tényleg minden lefusson, a package installációk eltarthatnak egy ideig), akkor hozzáférhetünk a klienshez a
   **http://localhost:4200**
címen a böngészőnkben.

## Sima futtatás:
Ennél a módszernél kézzel kell elindítanunk két külön terminálban a szervert és a klienst is. Figyeljünk rá, hogyha ezt a módszert használjuk, rendelkeznie kell a futtatónak saját maga által telepített v22-es verziójú (vagy azzal kompatibilis) node-al, illetve globálisan telepített angular-cli package-el. (Az npm install és az ng serve parancsok miatt.)

1. Klónozzuk az állományt a következő paranccsal:
   ```
   git clone 'https://github.com/hadabas/prf-konyvklub.git'
   ```
2. Nyissunk meg két terminált, és az egyikkel navigáljunk a server mappába. Ez után, adjuk ki ezt a két parancsot egymás után sorrendben:
   ```
   npm install
   npm run start
   ```
3. A másik terminállal navigáljunk a client mappába. Ez után, adjuk ki ezt a két parancsot egymás utáni sorrendben:
   ```
   npm install
   ng serve
   ```
4. Ha minden jól ment, akkor két külön terminálban fut a kliens és a szerver. Ez után, nyissunk egy böngészőt, és a
   **http://localhost:4200**
címen elérhetjük a kliens programot. Itt fontos megjegyezni, hogy a terminálokat **ne zárjuk be használat közben, azoknak folyamatosan futnia kell.**

## Telepítés és futtatás után:
Két különböző felhasználói jogkör létezik az oldalon, admin és sima felhasználó. Jelenleg minta adatokkal van feltöltve az adatbázis, de megadok egy-egy felhasználót mind a két jogkörnél a porgram kipróbálásához:
1. Admin jogú felhasználó: Felhasználónév: admin, Jelszó: adminpw12
2. Alapjogú felhasználó  : Felhasználónév: user1, Jelszó: userpw12

De mint látható a kezdőlapon, alapjogú felhasználót lehet regisztrálni sajátot, ha sajátot szeretnénk.
