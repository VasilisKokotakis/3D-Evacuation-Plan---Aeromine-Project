````markdown
# 3D Evacuation Plan — Aeromine Project

This project is a **3D evacuation plan application** developed for **Aeromine** as part of one of their patents.  
**All copyrights are owned by Aeromine.**

It visualizes **3D models of buildings** and overlays **directional arrows** for evacuation purposes.

---

## 🚀 Features

- Interactive 3D environment rendered in the browser
- Display `.gltf` 3D models of buildings
- Overlay directional arrows for evacuation paths (with adjustable coordinates)
- Future plans: make the system **dynamic** and apply it to **governmental buildings, malls, airports, workplaces**, etc. (pending patent approval)

---

## 🛠️ Tech Stack

- **React 19** — Frontend library  
- **TypeScript** — Strongly typed JavaScript  
- **Vite** — Fast build tool  
- **Three.js** — 3D rendering engine  
- **React Three Fiber** — React renderer for Three.js  
- **@react-three/drei** — Useful helpers for R3F  
- **ESLint** — Code linting  

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-org>/3D-Evacuation-Plan-Aeromine.git
   cd 3D-Evacuation-Plan-Aeromine
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open in your browser:

   ```
   http://localhost:5173
   ```

5. Build for production:

   ```bash
   npm run build
   ```

6. Preview production build:

   ```bash
   npm run preview
   ```

---

## 🔧 Usage

* Replace the default `.gltf` model with your own inside the `public/` folder.
* Adjust the **coordinates for arrows** in the source code (`src/`) to align with your model’s evacuation paths.
* Run the project (`npm run dev`) and view it locally in your browser.

---

## ⚙️ Development Setup

### ESLint Configuration (Optional)

For production or stricter linting:

```js
// eslint.config.js
import tseslint from '@ts-eslint/config'

export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

Optional React-specific linting:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: { 'react-x': reactX, 'react-dom': reactDom },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

---

## 📸 Screenshots

Here are some screenshots of the 3D evacuation plan in action:

<img width="2495" height="1339" alt="image" src="https://github.com/user-attachments/assets/2e935899-4336-4674-89d0-131704bdfda8" />

---

## 🎥 Demo Video

See the 3D viewer in action:

![Demo](demo/demo.gif)

---

## 📖 License

This project is **open source**, licensed under the [MIT License](LICENSE).
⚠️ However, the **idea and patent rights belong to Aeromine**.

---

## 📝 Notes

* Currently, this is a **static prototype**.
* Future development aims to support **dynamic building layouts** and **interactive evacuation paths**.

---

## 👨‍💻 Authors

Developed by **Vasileios** in collaboration with **Aeromine**.
