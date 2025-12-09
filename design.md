# Patient Portal - Design Document

## 1. Tech Stack Choices

### Q1. Frontend: React.js (Vite)
* **Choice:** React.js initialized with Vite.
* **Justification:** React's component-based architecture allows for a modular UI. I specifically chose **Vite** over Create-React-App for its superior build performance and lighter footprint.

### Q2. Backend: Java Spring Boot
* **Choice:** Spring Boot 3.x (Java 17).
* **Justification:** Spring Boot is the enterprise standard for building robust, scalable REST APIs. It provides:
    * **Strict Type Safety:** Critical for healthcare data.
    * **Embedded Server:** Easy to run locally.
    * **Dependency Injection:** Ensures code is testable and loosely coupled.

### Q3. Database: H2 Database
* **Choice:** H2 (In-Memory / File-based)
* **Justification:** The prompt allows for "SQLite, PostgreSQL, or similar." I chose H2 because it requires zero installation. It runs entirely within the JVM.

### Q4. Scaling to 1,000 Users
To scale to 1,000+ users:
1.  **Storage:** Move from local disk (`uploads/`) to Cloud Storage (AWS S3).
2.  **Database:** Migrate H2 to PostgreSQL for better concurrency.
3.  **Security:** Implement Spring Security with OAuth2/JWT.

## 2. Architecture Overview
[Client (React)] <-> [REST API (Spring Boot)] <-> [Service] <-> [Repository] <-> [Database (H2)]
                                                      |
                                                      v
                                              [File System (/uploads)]

## 3. API Specification

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/documents/upload` | `POST` | Upload PDF (FormData: file) |
| `/api/documents` | `GET` | List all files |
| `/api/documents/{id}` | `GET` | Download file |
| `/api/documents/{id}` | `DELETE` | Delete file |

## 4. Data Flow Description (Q5)
1.  **Upload:** User sends file -> Spring validates PDF -> Saves to `uploads/` folder -> Saves metadata to H2 DB.
2.  **Download:** User requests ID -> Spring finds path in DB -> Streams file from disk to browser.

## 5. Assumptions (Q6)
1.  **Single Tenant:** No login required (as per prompt).
2.  **File Integrity:** Local file system has write permissions.
3.  **Validation:** Only PDF MIME types are allowed.