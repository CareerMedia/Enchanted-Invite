import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MagicScene from './components/MagicScene.jsx'
import Envelope from './components/Envelope.jsx'
import Letter from './components/Letter.jsx'
import SparkleBurst from './components/SparkleBurst.jsx'
// If you re-enable music later:
// import { startMagicMusic, toggleMute } from './music.js'

export default function App() {
  const moonRef = useRef()
  const [opened, setOpened] = useState(false)
  const [burst, setBurst] = useState(false)
  // const [muted, setMuted] = useState(false)
  // const [audioReady, setAudioReady] = useState(false)

  const handleOpen = useCallback(async () => {
    // if (!audioReady) { try { await startMagicMusic(); setAudioReady(true) } catch {} }
    setOpened(true)
    setBurst(true)
    setTimeout(() => setBurst(false), 1200) // sparkles fade after ~1.2s
  }, [])

  // const handleToggleMute = useCallback(() => {
  //   const next = toggleMute()
  //   setMuted(next)
  // }, [])

  useEffect(() => {
    // If you want audio to start on first click anywhere, you can add it back later.
  }, [])

  return (
    <div className="app-root">
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        dpr={[1, 2]}
        camera={{ position: [0, 1.2, 7], fov: 55 }}
      >
        <MagicScene moonRef={moonRef} />

        {/* Before click: show envelope. After click: show letter. */}
        {!opened ? (
          <Envelope position={[0, 0.5, 0]} onOpen={handleOpen} opened={false} />
        ) : (
          <>
            {/* A little forward so it sits in front of where the envelope was */}
            <Letter yValue={0.5} z={0.05} width={2.8} height={4.2} opened />
            {burst && <SparkleBurst position={[0, 0.5, 0]} scale={[4, 4, 4]} />}
          </>
        )}

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
        {/* Re-add when you re-enable music: 
        <button className="ui-btn" onClick={handleToggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? 'Unmute Music' : 'Mute Music'}
        </button> 
        */}
        <a className="ui-btn secondary" href="https://github.com/new" target="_blank" rel="noreferrer">Fork to GitHub</a>
      </div>

      <div className="overlay-credits">
        <small>
          An original, immersive 3D invitation—no copyrighted assets used.
        </small>
      </div>
    </div>
  )
}
