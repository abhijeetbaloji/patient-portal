# Patient Document Portal

A Full Stack application for managing patient medical records, built with **Java Spring Boot** and **React**.

## Features
* **Secure Storage:** Uploads are validated for PDF format and stored locally.
* **Metadata Tracking:** File details (Size, Name, Date) are stored in an embedded SQL database.
* **Modern UI:** A clean, dark-mode interface built with React and CSS Modules.

## Tech Stack
* **Frontend:** React 18, Vite, Axios
* **Backend:** Java 17, Spring Boot 3.4
* **Database:** H2 (In-Memory / File Persistent)

## Prerequisites
* Java 17+
* Node.js 16+

## How to Run Locally

### 1. Start the Backend
```bash
cd backend
./mvnw spring-boot:run



Server starts on: http://localhost:8080

Data is stored in: backend/data/patientdb

Files are stored in: backend/uploads/

2. Start the Frontend
Bash

cd frontend
npm install
npm run dev
UI opens at: http://localhost:5173

API Usage (Examples)
Upload a File:

Bash

curl -F "file=@/path/to/report.pdf" http://localhost:8080/api/documents/upload
List Files:

Bash

curl http://localhost:8080/api/documents