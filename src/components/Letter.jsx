import React from 'react'
import { Html } from '@react-three/drei'

/**
 * If you pass yValue, it uses that number directly.
 * Otherwise, pass a ref via `y` with a `.current` number.
 */
export default function Letter({ y, yValue = 0, z = 0.02, width = 2.6, height = 3.2, opened = true }) {
  const yPos = (y && typeof y.current === 'number') ? y.current : yValue

  return (
    <group position={[0, yPos, z]}>
      {/* Parchment backing */}
      <mesh visible={opened}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={'#f3ecd1'} roughness={0.75} />
      </mesh>

      {/* Text content: scaled via distanceFactor and only visible when opened */}
      <Html
        transform
        position={[0, 0, 0.001]}
        distanceFactor={1.5}
        occlude={false}
        className="letter-html"
        style={{ visibility: opened ? 'visible' : 'hidden' }}
      >
        <div className="letter parchment">
          <h2>A Most Enchanting Summons</h2>
          <h3>✨ You Are Cordially Invited ✨</h3>
          <p>
            By wand and will, under autumn’s silver moon, we beckon you to gather where talents transfigure and skills take flight.
            <br /><strong>Fall 2025 Cross Training</strong>
          </p>
          <p>
            With a flick of the quill and a dash of stardust, your presence is requested for an immersive day of spellbinding growth.
          </p>
          <div className="details">
            <p><strong>When:</strong> Friday, September 19, 2025</p>
            <p><strong>Time:</strong> 8:00 AM – 4:00 PM</p>
            <p><strong>Where:</strong> The Career Center</p>
          </div>
          <p>
            Bring your curiosity, your courage, and your comradery. Together we’ll conjure new capabilities, transfigure teamwork, and illuminate pathways to mastery.
          </p>
        </div>
      </Html>
    </group>
  )
}
