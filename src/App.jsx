import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MagicScene from './components/MagicScene.jsx'
import Envelope from './components/Envelope.jsx'
import Letter from './components/Letter.jsx'
import SparkleBurst from './components/SparkleBurst.jsx'
import { startMagicMusic, toggleMute } from './music.js'

export default function App() {
  const moonRef = useRef()
  const [opened, setOpened] = useState(false)
  const [burst, setBurst] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [muted, setMuted] = useState(false)

  const kickAudio = useCallback(async () => {
    if (!audioReady) {
      try {
        await startMagicMusic()
        setAudioReady(true)
      } catch {
        /* try again on next click */
      }
    }
  }, [audioReady])

  const handleOpen = useCallback(async () => {
    await kickAudio()
    setOpened(true)
    setBurst(true)
    setTimeout(() => setBurst(false), 1200)
  }, [kickAudio])

  const handleToggleMute = useCallback(() => {
    const next = toggleMute()
    setMuted(next)
  }, [])

  // Start audio on first user gesture anywhere
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

        {!opened ? (
          <Envelope position={[0, 0.5, 0]} onOpen={handleOpen} opened={false} />
        ) : (
          <>
            {/* Manual size controls: scale & df */}
            <Letter
              yValue={0.5}
              z={0.05}
              width={2.8}
              height={4.2}
              opened
              scale={0.72}  // adjust this value to your taste (e.g. 0.6 .. 0.9)
              df={10}       // higher = smaller Html content
            />
            {burst && <SparkleBurst position={[0, 0.5, 0]} scale={[4, 4, 4]} />}
          </>
        )}

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
        <a className="ui-btn secondary" href="https://github.com/new" target="_blank" rel="noreferrer">
          Fork to GitHub
        </a>
      </div>

      <div className="overlay-credits">
        <small>
          An original, immersive 3D invitation—no copyrighted assets used.
        </small>
      </div>
    </div>
  )
}
