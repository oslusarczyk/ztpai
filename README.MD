# SmartCar

## Spis treści

- [Opis aplikacji](#opis)
- [Technologie](#technologie)
- [Wzorce projektowe/architektoniczne](#Wzorce-projektowe/architektoniczne)
- [Design bazy danych](#design-bazy-danych)
- [Instalacja](#instalacja)
- [Screeny](#screeny)

## Opis aplikacji

SmartCar to aplikacja dla wypożyczalni samochodów. Użytkownik może przeglądać dostępne samochody i je rezerwować. Admin serwisu zarządza rezerwacjami oraz może dodawać nowe samochody.

## Technologie

- Docker
- React, TypeScript
- NestJS, PostgreSQL, Prisma, JWT, Redis, Swagger
- Git, GitHub

## Design bazy danych

- Diagram ERD bazy danych
  ![diagram ERD](readme/diagram-ERD.png)

## Instalacja

1. Sklonuj repozytium

```bash
git clone https://github.com/oslusarczyk/ztpai.git
cd ztpai
```

### Backend

Wejdź do folderu.

```
cd backend
```

Skopiuj plik env.example do .env

```
cp .env.example .env
```

2. Zbuduj kontener docker

```bash
docker-compose build
docker-compose up -d
```

3. Wykonaj migracje w Prisma

```
docker exec -it backend-node-app-1 sh
npx prisma migrate deploy
```

4. Skorzystaj z API pod adresem http://localhost:8080

Dokumentacja Swagger jest dostępna pod adresem http://localhost:8000/api-docs

### Frontend

Wejdź do folderu.

```
cd frontend
```

Skopiuj plik env.example do .env

```
cp .env.example .env
```

Zainstaluj potrzebne paczki

```
npm install
```

Zainstaluj potrzebne paczki

```
npm run start:dev
```

Aplikacja dostępna jest pod adresem
http://localhost:3001

## Screeny

#### Login

|                  Desktop                   |                 Mobilnie                 |
| :----------------------------------------: | :--------------------------------------: |
| ![login-desktop](readme/login-desktop.png) | ![login-mobile](readme/login-mobile.png) |

#### Main

|                 Desktop                  |                Mobilnie                |
| :--------------------------------------: | :------------------------------------: |
| ![main-desktop](readme/main-desktop.png) | ![main-mobile](readme/main-mobile.png) |

#### Samochody

Przeglądanie dostępnych samochodów z możliwością ich filtrowania.
| Desktop | Mobilnie |
|:-------------:|:------------:|
|![search-desktop](readme/search-desktop.png) | ![search-mobile](readme/search-mobile.png)

#### Historia rezerwacji

Widok poszczególnych rezerwacji i ich status dla zalogowanego użytkownika
| Desktop | Mobilnie |
|:-------------:|:------------:|
|![history-desktop](readme/history-desktop.png) | ![history-mobile](readme/history-mobile.png)

#### Dodawanie samochodów przez admina

|                  Desktop                   |                 Mobilnie                 |
| :----------------------------------------: | :--------------------------------------: |
| ![admin-desktop](readme/admin-desktop.png) | ![admin-mobile](readme/admin-mobile.png) |
