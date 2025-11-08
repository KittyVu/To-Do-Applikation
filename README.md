# 📝 To-Do App

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
- **Create:** Neue Aufgaben hinzufügen  
- **Read:** Aufgabenliste anzeigen  
- **Update:** Bestehende Aufgaben bearbeiten  
- **Delete:** Aufgaben löschen
- 🔍 Suchfunktion  
- ⚙️ Filter

---

## 🔗 API Endpoints

| Methode | Endpoint | Beschreibung | Statuscodes |
|----------|-----------|---------------|--------------|
| **GET** | `/api/todos/` | Liste aller To-Dos | 200 |
| **POST** | `/api/todos/` | Neues To-Do erstellen | 201, 400 |
| **GET** | `/api/todos/<id>/` | Einzelnes To-Do abrufen | 200, 404 |
| **PUT** | `/api/todos/<id>/` | To-Do vollständig aktualisieren | 200, 400, 404 |
| **DELETE** | `/api/todos/<id>/` | To-Do löschen | 204, 404 |

---

## ⚙️ Installation & Setup

### **1️⃣ Backend Setup**
# Repository klonen
git clone [https://github.com/<your-username>/<your-repo>.git](https://github.com/KittyVu/To-Do-Applikation.git)
cd To-Do-Applikation/backend

# Virtuelle Umgebung erstellen
python -m venv venv
source venv/bin/activate 

# Abhängigkeiten installieren
pip install -r requirements.txt

# Datenbankmigrationen ausführen
python manage.py migrate

# Server starten
python manage.py runserver

### **1️⃣ Frontend Setup**
cd ../frontend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

