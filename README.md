
# **🔗 URL Shortener – React + Vite Frontend**

A fast and responsive URL Shortener web application built using **React + Vite**, **Tailwind CSS**, and **Axios**.
This frontend connects with the backend API to shorten long URLs, generate unique short URLs, and view analytics.

---

## 🚀 **Features**

##  **Landing Page**
<img width="1913" height="857" alt="image" src="https://github.com/user-attachments/assets/3afdb124-a426-4002-9cfa-6af909607d6a" />

##  **List of generated URL Page**
<img width="1875" height="852" alt="image" src="https://github.com/user-attachments/assets/aa97d456-58de-40cb-b4e3-2b7939b25c3b" />

##  **Get URL by Code Page**
# Where we can check the no fo view and visted date
<img width="1890" height="862" alt="image" src="https://github.com/user-attachments/assets/291b20d6-24e1-4a82-a15f-caea7e97b4ed" />


### 🔥 Core Functionality

* Shorten any long URL in one click
* Copy short URL to clipboard
* View click analytics for each link
* Responsive UI using Tailwind CSS
* Clean and elegant layout similar to Bitly

### 🛠️ Tech Stack

* **React (Vite)**
* **Tailwind CSS**
* **React Router**
* **Modern ES6+**

---

## 📁 **Project Structure**

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── services/
 ├── utils/
 ├── App.jsx
 ├── main.jsx
```

---

## 🧩 **Prerequisites**

Make sure you have installed:

* **Node.js** (>= 16)
* **npm** or **yarn**

---

## 🔧 **Setup & Installation**

### 1️⃣ Clone the repository

```sh
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Add environment file

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Run development server

```sh
npm run dev
```

### 5️⃣ Build for production

```sh
npm run build
```

### 6️⃣ Preview build output

```sh
npm run preview
```

---

## 🔗 **API Integration**

You can configure your backend URL inside:

```
import.meta.env.VITE_API_URL
```

This will automatically point all Axios requests to your backend.

---

## 📦 **Deployment**

You can deploy the production build using:

* Vercel
* GitHub Pages
* Docker

Build command:

```sh
npm run build
```

Output folder:

```
dist/
```

---

## 🐳 **Docker Support**

Example Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview"]
```


