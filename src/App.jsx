import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import MagicScene from './components/MagicScene.jsx'
import Envelope from './components/Envelope.jsx'
import Wand from './components/Wand.jsx'
import Effects from './components/Effects.jsx'
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
      } catch (e) {
        // Will try again on next click if needed
        console.warn('Audio could not start until user gesture', e)
      }
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

  // Fallback: start audio on first document click anywhere
  useEffect(() => {
    const handle = async () => { await kickAudio() }
    document.addEventListener('pointerdown', handle, { once: true, capture: true })
    return () => document.removeEventListener('pointerdown', handle, { capture: true })
  }, [kickAudio])

  return (
    <div className="app-root">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.2, 8.5], fov: 50 }}
      >
        <MagicScene moonRef={moonRef} />
        {/* Floating, clickable envelope at center */}
        <Envelope position={[0, 0.2, 0]} opened={opened} onOpen={handleOpen} />
        {/* Magic wands orbiting with sparkles/trails */}
        {Array.from({ length: 7 }).map((_, i) => (
          <Wand key={i} index={i} total={7} radius={5.5} height={0.6} />
        ))}
        {/* Global postprocessing */}
        <Effects moonRef={moonRef} />
        {/* Subtle camera controls for parallax only */}
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/2} rotateSpeed={0.35} />
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
