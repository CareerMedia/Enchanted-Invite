import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MagicScene from './components/MagicScene.jsx'
import Envelope from './components/Envelope.jsx'
import Wand from './components/Wand.jsx'
import { startMagicMusic, toggleMute } from './music.js'

// Visible canary cube (leave it until you confirm the envelope shows)
function DebugCube() {
  return (
    <mesh position={[0, 0, -2]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  )
}

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
        camera={{ position: [0, 1.2, 7], fov: 55 }}
      >
        <MagicScene moonRef={moonRef} />
        <Envelope position={[0, 0.5, 0]} opened={opened} onOpen={handleOpen} />
        {Array.from({ length: 4 }).map((_, i) => (
          <Wand key={i} index={i} total={4} radius={4.5} height={0.5} />
        ))}
        <DebugCube />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>

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
          Original, immersive 3D invitation. No copyrighted assets used.
        </small>
      </div>
    </div>
  )
}
