Projekt wykonał: Mateusz Kisiel 321758

Instalacja:
1) npm install
2) 
Stworzyć pustą bazę danych postgresql i zmienić w pliku .env jej dane. Np.:
TYPEORM_HOST = localhost
TYPEORM_USERNAME = postgres
TYPEORM_PASSWORD = qweqwe12321
TYPEORM_DATABASE = shop_express
TYPEORM_PORT = 5432
jeżeli baza danych używa ssl to odkomentować z .env
TYPEORM_DRIVER_EXTRA='{ "ssl": true }'
NODE_TLS_REJECT_UNAUTHORIZED=0
3)
Wykonać: npm run typeorm migration:run
Wykona to wszystkie migracje na bazie danych tworząc odpowiednie tabele
4)
npm start   aby uruchomić w trybie developmentu
5) Aby przypisać kontu uprawnienia administratora trzeba ręcznie w bazie danych dodać go do odpowienij roli
Czyli w praktyce stworzyć nowy rekord w tabeli user_roles_role z id usera i rolą o id 1


Przydatne informacje:
User może dodawać produkty do koszyka, a następnie składać, zamówienie.
Dowolny admin może następnie oznaczyć dane zamówienie jako wysyłanie
Następnie klient możeo oznaczyć wysłane zamówienie jako otrzymane

Przy tworzniu zamówienia user może wybrać dowolny użyty wcześniej przez niego adres, lub wpisać nowy, który automatycznie się doda do listy na przyszłość.

Itemy nie są usuwane z bazy danych, a dostają flagę jako usunięte, bo złożone zamówienia mogą się opierać o stare wersje produktów

Przy składaniu zamówienia nie wystepuje proces płatności za produkty

Zakładka orders jest dla klientow, a manage orders dla admina

Działa opcja logowania za się także za pomocą googla i facebooka (w .env są dla nich działające klucze)


Dodawanie migracji:
npm run typeorm migration:generate -- -n "Nazwa migracji" 

Uruchamianie migracji 
npm run typeorm migration:run

Lista migracji:
npm run typeorm migration:show
