Trzeba utworzyć plik .env z:
SESSION_SECRET

ormconfig.json zawiera dane do bazy danych






Konieczne do zmiany/dodania modelów:

Dodawanie migracji:
npm run typeorm migration:generate -- -n "Nazwa migracji" 

Uruchamianie migracji 
npm run typeorm migration:run

lista migracji:
npm run typeorm migration:show
