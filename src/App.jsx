import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MagicScene from './components/MagicScene.jsx'
import Envelope from './components/Envelope.jsx'
import Wand from './components/Wand.jsx'
// temporarily leave out Effects until we confirm envelope is visible
// import Effects from './components/Effects.jsx'
import { startMagicMusic, toggleMute } from './music.js'

export default function App() {
  const moonRef = useRef()
  const [opened, setOpened] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [muted, setMuted] = useState(false)

  const kickAudio = useCallback(async () => {
    if (!audioReady) {
      try {
        await startMagicMusic()
        setAudioReady(true)
      } catch {}
    }
  }, [audioReady])

  const handleOpen = useCallback(async () => {
    setOpened(true)
    await kickAudio()
  }, [kickAudio])

  const handleToggleMute = useCallback(() => {
    const next = toggleMute()
    setMuted(next)
  }, [])

  // fallback: first click anywhere starts audio
  useEffect(() => {
    const h = () => { kickAudio() }
    document.addEventListener('pointerdown', h, { once: true, capture: true })
    return () => document.removeEventListener('pointerdown', h, { capture: true })
  }, [kickAudio])

  return (
    <div className="app-root">
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 6], fov: 50 }}
      >
        <MagicScene moonRef={moonRef} />
        <Envelope position={[0, 0.2, 0]} opened={opened} onOpen={handleOpen} />
        {Array.from({ length: 5 }).map((_, i) => (
          <Wand key={i} index={i} total={5} radius={5} height={0.5} />
        ))}
        {/* Uncomment once envelope is confirmed visible */}
        {/* <Effects moonRef={moonRef} /> */}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>

      {/* Overlay UI */}
      {!opened && (
        <div className="overlay-center">
          <div className="prompt glow-pulse">Click the envelope</div>
          <div className="hint">Best experienced with sound on 🔊</div>
        </div>
      )}

      <div className="overlay-bottom">
        <button className="ui-btn" onClick={handleToggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? 'Unmute Music' : 'Mute Music'}
        </button>
        <a className="ui-btn secondary" href="https://github.com/new" target="_blank" rel="noreferrer">Fork to GitHub</a>
      </div>

      <div className="overlay-credits">
        <small>
          An original, immersive 3D invitation inspired by the playful magic vibe you know—no copyrighted assets used.
        </small>
      </div>
    </div>
  )
}
