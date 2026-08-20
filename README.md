# Railway Reservation System

A full-stack railway reservation app with a focused booking workflow, a responsive operations dashboard, and MySQL-backed persistence.

## What It Does

- Create passenger ticket reservations
- View all saved bookings
- Cancel a booking by ID
- Use dashboard shortcuts to move between workflows
- Store application data in MySQL
- Run automated tests against an isolated H2 database

## Stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Java 25, Spring Boot 4.1.0, Spring Data JPA
- **Database:** MySQL 9.7+ for the application, H2 for tests
- **Build:** Maven Wrapper 3.9.16

## Run It

Start MySQL and create the database if needed:

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS railway_reservation;"
```

Start the backend:

```bash
cd Backend/railway-reservation/railway-reservation
JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home sh ./mvnw spring-boot:run
```

Start the frontend in a second terminal:

```bash
cd Frontend
python3 -m http.server 5500
```

Open `http://localhost:5500`. The API runs at `http://localhost:8080`.

The application defaults to MySQL on `localhost:3306` with database `railway_reservation` and user `root`. Deployment environments can override these values with `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, and `MYSQLPASSWORD`.

## API

| Method   | Endpoint             | Purpose           |
| -------- | -------------------- | ----------------- |
| `POST`   | `/api/bookings`      | Create a booking  |
| `GET`    | `/api/bookings`      | List all bookings |
| `GET`    | `/api/bookings/{id}` | Get one booking   |
| `DELETE` | `/api/bookings/{id}` | Cancel a booking  |

## Test

Tests use an in-memory H2 database and do not require MySQL:

```bash
cd Backend/railway-reservation/railway-reservation
JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home sh ./mvnw clean test
```
