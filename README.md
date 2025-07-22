# Номын дэлгүүрийн API

Энэ төсөл нь Express.js болон MongoDB ашиглан бүтээсэн номын дэлгүүрийн backend API юм.

## Ашиглах заавар

1. Репозиторийг клон хийнэ:
   ```
   git clone https://github.com/Hellobraincode-lesson/6.3.1-Bookstore-part-1.git
   ```
2. `backend` фолдер руу орж шаардлагатай сангуудыг суулгана:
   ```
   cd backend
   npm install
   ```
3. `.env` файлд өөрийн MongoDB URI болон PORT-ыг тохируулна.
4. Серверийг ажиллуулна:
   ```
   node server.js
   ```

## Орчны хувьсагчид

- `MONGODB_URI` — MongoDB холболтын хаяг
- `PORT` — Серверийн порт (default: 5005)

## Хариу өгөх замууд

- `GET /` — Серверийн статусыг шалгах

## Лиценз

MIT лицензээр түгээгдэнэ.
