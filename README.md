-TO-DO-

tuning.ts : liegt in 'src/core/server/vehicle' und beinhaltet neue funktionen bzgl. des Tunings von Stance und Wheels, zum sichern in der Datenbank.

vehicleMod[].ts : liegen in 'src/core/shared/interface' und beinhalten Interfaces die es nicht in den shared-Ordner des Scripts geschafft haben.

Aktivierung: mit 'Shift + F4' wird das Menü geöffnet.

Debugging: ein Ort wurde eingerichtet zum Testen. 

// DEBUG
x: 863.9984741210938,
y: -912.8623046875,
z: 25.902570724487305,
cost: 2000,
uid: 'tuning-shop-debug',
vertices: [
    new alt.Vector3({ x:849.4166259765625, y:-896.3336791992188, z:25.42021942138672 }),
    new alt.Vector3({ x:879.0249633789062, y:-897.2205810546875, z:26.08173179626465 }),
    new alt.Vector3({ x:879.788330078125, y:-927.3583374023438, z:26.28237533569336 }),
    new alt.Vector3({ x:849.0205688476562, y:-927.2130126953125, z:26.282373428344727 }),
],

Update-Tuning und Laden beim Starten des Servers funktioniert noch nicht entsprechend. Fixes kommen...

Leider war ich dazu noch nicht in der Lage auch entsprechende Weichen zustellen für den Core-Change, aber Stand jetzt: Fahrzeug lässt sich Tunen, solange man nicht auf den Buy-Button drückt :)
