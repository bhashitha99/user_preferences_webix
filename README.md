# 🎨 User Preferences Web App (Webix + Django)

A customizable **User Preferences Page** built using **Webix** (Frontend) and **Django** (Backend), allowing users to update UI themes, font settings, and notification preferences.

---

## 📌 Features

- 🔐 User Registration and Login
- 👤 User Profile View & Update
- 🔔 Notification Preferences
- 🔒 Privacy Settings
- 🎨 Theme & Font Configuration
- 🔁 Password Change Functionality

---

## 🧰 Tech Stack

| Frontend       | Backend   | Tools & Libs       |
|----------------|-----------|--------------------|
| Webix UI       | Django    | Jest (Testing)     |
| JavaScript     | Python    | Webpack            |
| HTML/CSS       | DRF       | localStorage API   |

---


---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v16+
- Python 3.8+

---

### 🔥 Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/bhashitha99/user_preferences_webix.git

```
#### Terminal 1: Setup Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
```
#### Configure Environment:

Rename .EXAMPLE to .env in the backend folder
Add your frontend URL (e.g., http://localhost:5173) to FRONTEND_URL
```bash
python manage.py migrate
python manage.py runserver
```
#### Terminal 2: Frontend Setup Frontend
````bash
cd ../frontend
npm install
````
#### Configure Environment:
Rename .EXAMPLE to .env in the frontend folder
Add your backend URL (e.g., http://localhost:8000) to VITE_API_URL
### Run the App
```bash
npm install
npm run dev
```




