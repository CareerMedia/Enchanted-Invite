import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { startMagicMusic, toggleMute } from './music.js'

// TEMP: super-simple scene to prove render path
function DebugScene() {
  return (
    <>
      <color attach="background" args={['#070813']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      {/* Big hotpink cube at the origin */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
      <OrbitControls enablePan={false} />
    </>
  )
}

export default function App() {
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

  useEffect(() => {
    const h = () => { kickAudio() }
    document.addEventListener('pointerdown', h, { once: true, capture: true })
    return () => document.removeEventListener('pointerdown', h, { capture: true })
  }, [kickAudio])

  const handleToggleMute = useCallback(() => {
    const next = toggleMute()
    setMuted(next)
  }, [])

  return (
    <div className="app-root">
      <Canvas
        // **Key: make the canvas actually cover the screen**
        style={{ position: 'absolute', inset: 0 }}
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 6], fov: 50 }}
      >
        <DebugScene />
      </Canvas>

      {/* Overlay UI (unchanged) */}
      <div className="overlay-center">
        <div className="prompt glow-pulse">Click the envelope</div>
        <div className="hint">Best experienced with sound on 🔊</div>
      </div>

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
