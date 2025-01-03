# Aplikacja do zarządzania kanałami pozyskania klientów

## Spis treści
1. [Opis](#opis)
2. [Funkcje aplikacji](#funkcje-aplikacji)
3. [Instrukcja obsługi aplikacji](#instrukcja-obsługi-aplikacji)
4. [Technologie](#technologie)
5. [Testy](#testy)
6. [Struktura projektu](#struktura-projektu)

## Opis

Aplikacja umożliwia zarządzanie kanałami pozyskania klientów. Użytkownik może dodać nowe źródła pozyskania, edytować istniejące i usuwać je. Dane te są prezentowane w tabeli oraz na wykresie kołowym, które są generowane na podstawie wartości przypisanych do kanałów.

## Funkcje aplikacji

- **CRUD** dla kanałów pozyskania (dodawanie, edytowanie, usuwanie)
- Tabela oraz wykres kołowy przedstawiający dane w bazie
- Obsługa błędów walidacji

### Instrukcja obsługi aplikacji

1. **Dodawanie nowego kanału:**
   - Aby dodać nowy kanał pozyskania, należy wprowadzić odpowiednie dane w pola formularza (np. nazwę kanału oraz wartość) i kliknąć przycisk **"Dodaj"**.
   - Upewnij się, że dane zostały wprowadzone poprawnie, aby proces dodawania zakończył się sukcesem.

2. **Usuwanie kanału:**
   - Aby usunąć kanał, należy kliknąć przycisk **"Usuń"** w odpowiednim wierszu tabeli, który znajduje się obok kanału, który chcesz usunąć.
   - Po kliknięciu, kanał zostanie usunięty, a dane zaktualizują się zarówno w tabeli, jak i na wykresie.

3. **Edycja kanału:**
   - Aby edytować istniejący kanał, wystarczy dwukrotnie kliknąć na wartość w tabeli, którą chcesz zmienić.
   - Po kliknięciu wartość stanie się edytowalna – wprowadź nową wartość i naciśnij **Enter**, aby zapisać zmiany.
   - Edytowana wartość zaktualizuje się zarówno w tabeli, jak i na wykresie kołowym.

## Technologie

- **Frontend**: React (v19.0.0), TypeScript (v4.9.5), react-google-charts (v5.2.1)
- **Backend**: Laravel (v11.31), PHP (v8.2)
- **Baza danych**: MySQL (produkcyjna), SQLite (testowa)
- **Testowanie**: Jest (v27.5.2), React Testing Library (v16.1.0), PHPUnit (v11.0.1)

## Testy

### Backend (Laravel)

Testy backendowe obejmują testy integracyjne dla operacji CRUD na kanałach. Testy można uruchomić za pomocą poniższego polecenia:
```bash
php artisan test
```
### Frontend (React + TypeScript)

Testy frontendowe obejmują testy jednostkowe oraz integracyjne dla komponentów i głównej aplikacji. Można je uruchomić za pomocą:
```bash
npm test
```

## Struktura projektu

**Backend (Laravel)**:
- `app/Http/Controllers/`: Główna logika aplikacji
- `app/Models/`: Modele
- `routes/api/`: Definicje API
- `database/`: Migracje
- `tests/Feature`: Testy backendowe

**Frontend (React + TypeScript)**:
- `src/`: Główna logika frontendu
- `src/components/`: Komponenty
- `src/App.test.tsx`: Testy głównej aplikacji
- `src/components/`: Testy komponentów

```bash
backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── ChannelController.php
│   └── Models/
│       └── Channel.php
├── database/
│   └── migrations/
│       └── 2024_12_20_190340_create_channels.php
├── routes/
│   └── api.php
└── tests/
    └── Feature/
        └── ApiTest.php
frontend/
├── src/
│   ├── components/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.test.tsx
│   │   ├── PieChart.tsx
│   │   ├── PieChart.test.tsx
│   ├── App.css
│   ├── App.tsx
│   └── App.test.tsx
```