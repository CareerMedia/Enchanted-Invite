# Enchanted Summons — 3D Invitation (React + React Three Fiber)

A dark, magical, and **unforgettable** 3D invitation experience inspired by the vibe of *Wizards of Waverly Place* — built with React, React Three Fiber, and procedural audio (Tone.js). A floating envelope hovers in a moonlit scene; click it to reveal a parchment letter with your event details. Floating wands, sparkles, god rays, and ambient music round out the atmosphere.

> ⚠️ No copyrighted assets from the show are used—this is an original, inspired experience.

---

## ✨ Features
- **Floating 3D envelope** that opens when clicked; a parchment **letter slides out** with your invitation.
- **Orbiting magic wands** with sparkles and glowing tips.
- **Atmospheric scene**: night sky, stars, fog, silver moon with god rays, subtle bloom & vignette.
- **Procedural ambient music** (Tone.js) that starts on the first click (to satisfy browser autoplay policies).
- **Responsive & performant** defaults; mobile-friendly overlays.
- **Zero external media assets**—everything is generated in code.

---

## 🛠️ Quick Start

```bash
# 1) Install
npm install

# 2) Run locally
npm run dev

# 3) Build for production
npm run build
npm run preview
```

Open the dev URL from your terminal (typically http://localhost:5173).

---

## 🧰 Tech Stack
- **React** + **Vite**
- **Three.js** via **@react-three/fiber** and **@react-three/drei**
- **Postprocessing**: bloom, god rays, noise, vignette
- **Tone.js** for procedural ambient music

---

## 🧾 Content Editing
Update the invitation text inside **`src/components/Letter.jsx`**. You can adjust sizes (letter width/height) by tweaking the props in **`Envelope.jsx`** where `<Letter />` is used.

---

## 🌓 Tuning the Look
- **Scene colors & fog**: `src/components/MagicScene.jsx`
- **Bloom/God rays**: `src/components/Effects.jsx`
- **Wand count/orbit**: change the array in `App.jsx` and props passed to `<Wand />`

---

## 🔊 Audio
Music is generated live in the browser with Tone.js — no MP3s needed. It starts on your first click. Use the **Mute** button in the bottom-right to toggle sound.

If your security policy disallows WebAudio, simply remove the music calls in `App.jsx` and delete `src/music.js`.

---

## 🧪 GitHub Pages (optional)
If you'd like to deploy to GitHub Pages:

1. Create a new repo and push this project.
2. In `package.json`, add:
   ```json
   "homepage": "https://<your-username>.github.io/<your-repo>/"
   ```
3. Build:
   ```bash
   npm run build
   ```
4. Serve the `dist/` folder via GitHub Pages (e.g., using Actions or settings → Pages → Deploy from `dist`).

Alternatively, use **Netlify**, **Vercel**, or **Cloudflare Pages**—just point them at the project root; they’ll run `npm run build` automatically.

---

## 📄 License & Attribution
- Code is provided under the MIT license (feel free to adapt).
- Ambient music is procedurally generated—no third‑party audio files used.
- “Wizards of Waverly Place” is referenced purely as inspiration; no trademarks or proprietary assets are included.