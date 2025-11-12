# 📝 To-Do App

Eine einfache To-Do-Applikation mit **Django REST Framework** im Backend und **React + TypeScript + Tailwind CSS** im Frontend.  
Sie ermöglicht das Erstellen, Anzeigen, Bearbeiten und Löschen von Aufgaben – inklusive Such- und Filterfunktion.

---

## 🚀 Tech Stack

### **Backend**
- 🐍 [Python](https://www.python.org/)
- ⚙️ [Django](https://www.djangoproject.com/)
- 🧩 [Django REST Framework](https://www.django-rest-framework.org/)
- 🗄️ SQLite 

### **Frontend**
- ⚛️ [React](https://react.dev/)
- 🧠 [TypeScript](https://www.typescriptlang.org/)
- 💅 [Tailwind CSS](https://tailwindcss.com/)

---

## 🎯 Features

- ✨ **Create:** Neue Aufgaben hinzufügen  
- 👀 **Read:** Aufgabenliste anzeigen  
- 🛠️ **Update:** Bestehende Aufgaben bearbeiten  
- ❌ **Delete:** Aufgaben löschen  
- 🔍 **Suchfunktion** zum schnellen Finden von Aufgaben  
- ⚙️ **Filteroptionen** nach Status oder anderen Kriterien  

---

## 🔗 API Endpoints

| Methode | Endpoint | Beschreibung | Statuscodes |
|----------|-----------|---------------|--------------|
| **GET** | `/api/todos/` | Liste aller To-Dos | 200 |
| **POST** | `/api/todos/` | Neues To-Do erstellen | 201 |
| **GET** | `/api/todos/<id>/` | Einzelnes To-Do abrufen | 200 |
| **PUT** | `/api/todos/<id>/` | To-Do vollständig aktualisieren | 404 |
| **DELETE** | `/api/todos/<id>/` | To-Do löschen | 204 |

---

## ⚙️ Installation & Setup

### **1️⃣ Backend Setup**

```bash
# Repository klonen
git clone https://github.com/KittyVu/To-Do-Applikation.git
cd To-Do-Applikation/backend

# Virtuelle Umgebung erstellen
python3 -m venv .venv
source venv/bin/activate  

# Abhängigkeiten installieren
pip install django django-cors-headers 


# Datenbankmigrationen ausführen
python manage.py migrate

# Server starten
python manage.py runserver

Der Backend-Server läuft standardmäßig auf:
👉 http://127.0.0.1:8000/
```
### **2️⃣ Frontend Setup**
```bash
cd ../frontend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

Der Frontend-Server läuft standardmäßig auf:
👉 http://localhost:5173/ 
```

# Docker 

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

- A docker image is build, and to initialize the docker container:  `docker compose up --build -d`
- Then open browser and start with url: `http://localhost:5173/` to run some tests. 

## 👩‍💻 Autor
### Xuyen Vu
- 📧 asthrough@gmail.com
- 🌐 [github.com/KittyVu](https://github.com/KittyVu)

