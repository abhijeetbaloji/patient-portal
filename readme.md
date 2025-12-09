# Patient Document Portal

A Full Stack application for uploading, managing, and retrieving patient medical records. Built with **Java Spring Boot** and **React**.

**Created by:** Abhijeet Baloji  
**Contact:** abhijeetmbaloji@gmail.com

---

## 🚀 Features
* **Secure Uploads:** Backend validation ensures only PDF files are accepted.
* **Persistent Storage:** File metadata is stored in an embedded SQL database (H2), and files are saved locally.
* **Modern UI:** A responsive, dark-mode interface with drag-and-drop capabilities.
* **Full CRUD:** Upload, List, Download, and Delete functionality.

## 🛠 Tech Stack
* **Frontend:** React 18, Vite, Axios, CSS Modules
* **Backend:** Java 17, Spring Boot 3.4 (Web, Data JPA)
* **Database:** H2 (In-Memory with File Persistence)

## 📋 Prerequisites
Ensure you have the following installed:
* **Java 17** or higher
* **Node.js 16** or higher

---

## ⚙️ How to Run Locally

### Step 1: Start the Backend Server
1.  Open a terminal and navigate to the `backend` folder.
2.  Run the application using the Maven Wrapper:

```bash
cd backend
./mvnw spring-boot:run
```

* The server will start on: `http://localhost:8080`
* **Note:** Folders named `uploads` and `data` will be created automatically in the backend directory.

### Step 2: Start the Frontend Application
1.  Open a **new** terminal window and navigate to the `frontend` folder.
2.  Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

* The application will be available at: `http://localhost:5173` (or the port shown in your terminal).

---

## 🔌 API Usage (Examples)

You can test the API directly using `curl` if you prefer not to use the UI.

**1. Upload a File**
```bash
curl -F "file=@/path/to/your/test.pdf" http://localhost:8080/api/documents/upload
```

**2. List All Documents**
```bash
curl http://localhost:8080/api/documents
```

**3. Delete a Document**
```bash
curl -X DELETE http://localhost:8080/api/documents/1
```