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


# 🛒 Lista de Compras Inteligente Parcial 2

Aplicación móvil desarrollada en **React Native + Expo + TypeScript** para el **Parcial 2 de Aplicaciones Móviles**.

---

# 📌 Opción elegida

**Lista de Compras Inteligente**

---

# 📋 Descripción

Aplicación móvil desarrollada en React Native + Expo + TypeScript que permite gestionar una lista de compras inteligente con funcionalidades avanzadas de acceso al dispositivo.

El usuario puede:

- Registrarse e iniciar sesión  
- Agregar productos a la lista  
- Adjuntar imágenes (cámara o galería)  
- Obtener ubicación del lugar donde se obtiene el producto
- Seleccionar contactos del dispositivo  
- Crear eventos en el calendario  
- Recibir notificaciones automáticas  
- Persistir datos localmente con AsyncStorage  
- Manejar estado global con Zustand  
- Ejecutar tests automatizados con Jest  

---

# 📁 Estructura del proyecto

📦 parcialcompras

```txt
┣ 📂 app
┃ ┣ 📜 _layout.tsx
┃ ┣ 📜 add-item.tsx
┃ ┣ 📜 home.tsx
┃ ┣ 📜 index.tsx
┃ ┗ 📜 login.tsx
┃ ┗ 📜 register.tsx

┣ 📂 components
┃ ┣ 📂 __tests__
┃ ┃  ┗ 📜 ProductCard.test.tsx
┃ ┗ 📜 ProductCard.tsx

┣ 📂 lib
┃ ┗ 📜 storage.ts

┣ 📂 store
┃ ┣ 📂 __tests__
┃ ┃  ┗ 📜 productStore.test.ts
┃ ┗ 📜 productStore.ts

┣ 📂 utils
┃ ┣ 📂 __tests__
┃ ┃  ┗ 📜 validation.test.ts
┃ ┣ 📜 permissions.ts
┃ ┗ 📜 validation.ts

┣ 📂 lib
┃ ┗ 📜 storage.ts

┗ 📜 README.md
```

---

# 🧩 Nuevas funcionalidades implementadas

## 🔐 Permisos y acceso a recursos del dispositivo

Se implementó un sistema centralizado de permisos mediante `checkPermission`, manejando:

- Estado concedido  
- Estado denegado  
- Estado pendiente  

### Permisos utilizados:

- 📸 Cámara (`expo-image-picker`)  
- 🖼 Galería  
- 📍 Ubicación (`expo-location`)  
- 👤 Contactos (`expo-contacts`)  
- 📅 Calendario (`expo-calendar`)  
- 🔔 Notificaciones (`expo-notifications`)  

---

## 📸 Cámara y galería

- Selección de imagen desde galería  
- Captura de foto con cámara  
- Imagen asociada a cada producto  
- Visualización en lista y card  

---

## 📍 Ubicación

- Obtención de ubicación GPS en tiempo real  
- Asociación de coordenadas al producto  
- Visualización en pantalla y card  

---

## 👤 Contactos

- Acceso a contactos del dispositivo  
- Selección de contacto desde modal  
- Asociación de nombre y teléfono al producto  

---

## 📅 Calendario

- Creación automática de evento al agregar producto  
- Evento con:
  - Título personalizado  
  - Notas  
  - Duración de 1 hora  
- Integración con calendario del dispositivo  

---

## 🔔 Notificaciones locales

- Notificación al agregar producto  
- Programada a los 5 segundos  
- Configuración para Android con canal de alta importancia  

---

# 🧠 Estado global (Zustand)

Se implementó **Zustand** para manejo global de productos:

- Agregar producto  
- Eliminar producto  
- Sincronización con AsyncStorage  
- Evita prop drilling  

📦 Store: `useProductStore`

---

# 🧪 Testing con Jest

Se implementaron tests automatizados:

## ✔ ProductCard (componente)
- Verifica renderizado correcto  

## ✔ validation.ts (lógica de negocio)
- Valida nombre de producto  
- Maneja strings vacíos y espacios  

## ✔ productStore (estado global)
- Agrega productos correctamente  
- Elimina productos  
- Reemplaza lista completa  

## ▶ Ejecutar tests

```bash
npm test
```

---

# 🧭 Navegación

Implementada con:

- Expo Router
- React Navigation

## Pantallas

- 🔐 Login
- 📝 Registro
- 🏠 Home
- ➕ Agregar producto

---

# 🎨 Diseño

- UI moderna y minimalista
- Botones personalizados
- Cards para productos
- Modal para contactos
- Interfaz responsive

---

# 🧩 Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- Zustand
- AsyncStorage
- Expo Router
- Expo Image Picker
- Expo Location
- Expo Contacts
- Expo Calendar
- Expo Notifications
- Jest

---

# ▶️ Instalación y ejecución

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/Gaston-Camilo-Pauwels/parcial-react-native-compras.git
```

## 2️⃣ Instalar dependencias

```bash
npm install
```

## 3️⃣ Ejecutar proyecto

```bash
npx expo start
```

---

## 📱 Ejecutar en Android (recomendado)

```bash
npx expo run:android
```

---

## 🧪 Ejecutar tests

```bash
npm test
```

---

## 🎥 Video DEMO

👉 https://www.youtube.com/shorts/_NaIvAQp-Uw



---

## 🤖 Punto Extra: IA aplicada al desarrollo

## Descripcion de codigo:
codigo utilizado para poder saber por consola cual calendario del dispositivo se estaba usando por problemas a las hora de implementar el uso del calendario del dispositivo

## Modificacion:

Se quitan los console.log:
-  console.log(
      'CALENDARIOS:',
      calendars
    );
-  console.log(
      'CALENDARIO USADO:',
      calendar
    );
- console.log(
      'CALENDARIO PRINCIPAL:',
      calendar
    );
- console.log(
      'EVENTO CREADO:',
      eventId
    );

---

###	Hecho por la IA (add-item.tsx):

```txt
const createCalendarEvent =
  async (
    productName: string
  ) => {

    const permission =
      await Calendar.requestCalendarPermissionsAsync();

    if (
      permission.status !==
      'granted'
    ) {
      alert(
        'Permiso calendario denegado'
      );

      return null;
    }

    const calendars =
      await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );

    console.log(
      'CALENDARIOS:',
      calendars
    );

    if (
      calendars.length === 0
    ) {
      alert(
        'No se encontraron calendarios'
      );

      return null;
    }

        const calendar =
      calendars.find(
        (c) =>
          c.isPrimary === true &&
          c.allowsModifications === true
      );

    if (!calendar) {
      alert(
        'No se encontró calendario principal'
      );

      return null;
    }

    console.log(
      'CALENDARIO USADO:',
      calendar
    );

    console.log(
      'CALENDARIO PRINCIPAL:',
      calendar
    );
    
    const eventId =
      await Calendar.createEventAsync(
        calendar.id,
        {
          title:
            `Comprar ${productName}`,

          notes:
            `Recordatorio para comprar ${productName}`,

          startDate:
            new Date(),

          endDate:
            new Date(
              Date.now() +
                3600000
            ),

          timeZone:
            'America/Argentina/Buenos_Aires',
        }
      );

    console.log(
      'EVENTO CREADO:',
      eventId
    );

    alert(
      '✅ Recordatorio creado'
    );

    return eventId;
  };
```
### codigo corregido: 

```txt
const createCalendarEvent =
  async (
    productName: string
  ) => {

    const permission =
      await Calendar.requestCalendarPermissionsAsync();

    if (
      permission.status !==
      'granted'
    ) {
      alert(
        'Permiso calendario denegado'
      );

      return null;
    }

    const calendars =
      await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );

    if (
      calendars.length === 0
    ) {
      alert(
        'No se encontraron calendarios'
      );

      return null;
    }

        const calendar =
      calendars.find(
        (c) =>
          c.isPrimary === true &&
          c.allowsModifications === true
      );

    if (!calendar) {
      alert(
        'No se encontró calendario principal'
      );

      return null;
    }

    const eventId =
      await Calendar.createEventAsync(
        calendar.id,
        {
          title:
            `Comprar ${productName}`,

          notes:
            `Recordatorio para comprar ${productName}`,

          startDate:
            new Date(),

          endDate:
            new Date(
              Date.now() +
                3600000
            ),

          timeZone:
            'America/Argentina/Buenos_Aires',
        }
      );

    alert(
      '✅ Recordatorio creado'
    );

    return eventId;
  };
```

---

### Estructura de examen hecho por ia (incorrecto): 

```txt
📦 parcialcompras

┣ 📂 app
┃ ┣ 📜 login.tsx
┃ ┣ 📜 register.tsx
┃ ┣ 📜 home.tsx
┃ ┣ 📜 add-item.tsx
┃ ┗ 📜 _layout.tsx

┣ 📂 components
┃ ┗ 📜 ProductCard.tsx

┣ 📂 store
┃ ┗ 📜 productStore.ts

┣ 📂 utils
┃ ┣ 📜 permissions.ts
┃ ┗ 📜 validation.ts

┣ 📂 lib
┃ ┗ 📜 storage.ts

┣ 📂 __tests__
┃ ┣ 📜 ProductCard.test.tsx
┃ ┣ 📜 productStore.test.ts
┃ ┗ 📜 validation.test.ts

┗ 📜 README.md
```
---

### 📁 Estructura de examen corregido:

```txt
📦 parcialcompras

┣ 📂 app
┃ ┣ 📜 _layout.tsx
┃ ┣ 📜 add-item.tsx
┃ ┣ 📜 home.tsx
┃ ┣ 📜 index.tsx
┃ ┗ 📜 login.tsx
┃ ┗ 📜 register.tsx

┣ 📂 components
┃ ┣ 📂 __tests__
┃ ┃  ┗ 📜 ProductCard.test.tsx
┃ ┗ 📜 ProductCard.tsx

┣ 📂 lib
┃ ┗ 📜 storage.ts

┣ 📂 store
┃ ┣ 📂 __tests__
┃ ┃  ┗ 📜 productStore.test.ts
┃ ┗ 📜 productStore.ts

┣ 📂 utils
┃ ┣ 📂 __tests__
┃ ┃  ┗ 📜 validation.test.ts
┃ ┣ 📜 permissions.ts
┃ ┗ 📜 validation.ts

┣ 📂 lib
┃ ┗ 📜 storage.ts

┗ 📜 README.md
```

---

- utilizacion de ChatGPT para el uso de emojis, codigo modificado y ayuda con la creacion del README

---

## 👨‍💻 Alumno

**Gaston Camilo Pauwels**

📱 Parcial 2 – Aplicaciones Móviles  
📅 Entrega: 23/06/2026  
🏫 Modalidad: Individual

---

## 🎯 Resumen del cumplimiento

- ✔ Permisos del dispositivo
- ✔ Cámara y galería
- ✔ Ubicación GPS
- ✔ Contactos
- ✔ Calendario
- ✔ Notificaciones
- ✔ Zustand (estado global)
- ✔ Testing con Jest
- ✔ AsyncStorage (persistencia local)
- ✔ Expo Router (navegación)