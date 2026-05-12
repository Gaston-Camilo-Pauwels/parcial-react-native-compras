# 🛒 Lista de Compras Inteligente

Aplicación móvil desarrollada en React Native con Expo para el parcial de Aplicaciones Móviles.

---

# 📌 Opción elegida

Lista de Compras Inteligente.

---

# 📋 Descripción

Este proyecto consiste en el desarrollo de una aplicación móvil de lista de compras utilizando **React Native con Expo y TypeScript**.

La aplicación permite:

- Registrar usuarios
- Iniciar sesión
- Agregar productos
- Eliminar productos
- Guardar información localmente utilizando AsyncStorage
- Mostrar notificaciones locales

Una vez autenticado, el usuario puede administrar su lista de compras desde la pantalla principal de la aplicación.

---

# 📁 Estructura del proyecto

```txt
app/
├── _layout.tsx
├── index.tsx
├── login.tsx
├── register.tsx
├── home.tsx
└── add-item.tsx

lib/
└── storage.ts

assets/
└── ...

README.md
package.json
tsconfig.json
```

---

# 🧩 Funcionalidades implementadas

## 🔐 Autenticación

- Registro de usuario
- Inicio de sesión
- Validación simple de credenciales
- Logout
- Persistencia de usuario mediante AsyncStorage

---

## 🛒 Gestión de productos

- Agregar productos
- Mostrar lista de productos
- Eliminar productos
- Persistencia de datos local

---

## 🔔 Notificaciones locales

- Implementadas con `expo-notifications`
- Se dispara una notificación al agregar un producto
- Recordatorio automático luego de algunos segundos

---

## 🧭 Navegación

La navegación fue implementada utilizando:

- Expo Router
- React Navigation

Pantallas:

- Login
- Registro
- Home
- Agregar producto

---

# 🎨 Diseño

La aplicación cuenta con:

- Diseño moderno
- Botones personalizados
- Inputs estilizados
- Tarjetas visuales
- Interfaz clara y responsive

---

# 🧩 Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- Expo Router
- AsyncStorage
- Expo Notifications

---

# ▶️ Instalación y ejecución

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/Gaston-Camilo-Pauwels/parcial-react-native-compras.git
```

---

## 2️⃣ Instalar dependencias

```bash
npm install
```

---

## 3️⃣ Ejecutar proyecto

```bash
npx expo start
```

---

o

## Ejecutar proyecto con emulador de android (para ver notificaciones)

```bash
npx expo run:android
```

---

## 4️⃣ Ejecutar en

- Android Studio Emulator
- Expo Go
- Development Build

---

# 🎥 Video Demo

https://youtu.be/EiFhrzOFTeA

---

# 👨‍💻 Alumno

- Gaston Camilo Pauwels
