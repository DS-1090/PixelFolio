# PixelFolio

Interactive 3D portfolio built with React, Vite, Three.js, and React Three Fiber.

## Features
- 3D desk scene with clickable/hoverable objects
- Resume inside monitor view
- Project cards with GitHub links and live GitHub snapshot
- About timeline, tech stack, hobbies, food, and blog sections
- Theme switching (`studio`, `terminal`, `paper`)
- Command palette (`Ctrl/Cmd + K`)

## Tech Stack
- React 19
- Vite 7
- Three.js
- @react-three/fiber
- @react-three/drei

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and update values if needed.

```bash
cp .env.example .env
```

Current env variables:
- `VITE_RESUME_PDF_URL`: URL to resume PDF (default: `/assets/resume.pdf`)
- `VITE_PAINTING_IMAGE_URL`: URL to painting/hobbies image (default: `/assets/painting.png`)

Note: These files should be available from the Vite `public` folder (for example `public/assets/...`).

### 3. Run locally
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

## Scene Interactions
- **Monitor screen**: Resume
- **Monitor body**: About Me
- **Keyboard**: Blog
- **Lamp / drive-related meshes**: Projects
- **Mouse/coding-related meshes**: Tech Stack
- **Painting**: Hobbies
- **Coffee cup**: Food section

## Project Structure
- `src/components/` - 3D scene and overlay UI components
- `src/data/portfolioContent.js` - content for projects, about, tech, hobbies, food, themes
- `src/config/assets.js` - env-based asset URL mapping
- `public/assets/` - static assets served at runtime

## Notes
- Restart the dev server after changing `.env`.
- `.env` is ignored by git; `.env.example` is committed.
