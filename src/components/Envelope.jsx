import React, { useRef, useState } from 'react'
import { Float, Html, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Letter from './Letter.jsx'

export default function Envelope({ position = [0, 0, 0], opened = false, onOpen }) {
  const group = useRef()
  const flap = useRef()
  const [hovered, setHovered] = useState(false)
  const openAmt = useRef(0)
  const letterY = useRef(-0.6) // start tucked just inside the envelope

  const w = 3.2, h = 2.2, t = 0.08

  useFrame((state, delta) => {
    const target = opened ? 1 : 0
    // smooth open
    openAmt.current += (target - openAmt.current) * Math.min(1, delta * 4)
    // slide letter: from -0.6 (inside) to +1.0 (out)
    const yTarget = opened ? 1.0 : -0.6
    letterY.current += (yTarget - letterY.current) * Math.min(1, delta * 4)

    // gentle float
    if (group.current) {
      const ttime = state.clock.getElapsedTime()
      group.current.position.y = position[1] + Math.sin(ttime * 0.9) * 0.05
      group.current.rotation.z = Math.sin(ttime * 0.3) * 0.04
      group.current.rotation.x = Math.sin(ttime * 0.25) * 0.03
    }
    if (flap.current) flap.current.rotation.x = -1.25 * openAmt.current
  })

  // z-position logic:
  // - When closed: put letter BEHIND envelope (negative z), fully hidden.
  // - When opened: bring it IN FRONT so it can be read.
  const letterZ = opened ? t / 2 + 0.03 : -0.05

  return (
    <Float floatIntensity={0.6} speed={0.9} rotationIntensity={0.2}>
      <group
        ref={group}
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onOpen?.() }}
      >
        {/* Envelope body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, t]} />
          <meshStandardMaterial
            color={hovered ? '#f0e4c7' : '#e8dcc2'}
            roughness={0.7}
            metalness={0}
            emissive={'#1f1710'}
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Front face (slightly in front of the box) */}
        <mesh position={[0, 0, t / 2 + 0.02]}>
          <planeGeometry args={[w * 0.98, h * 0.98]} />
          <meshStandardMaterial color={'#fff7df'} roughness={0.9} />
        </mesh>

        {/* Flap: simple plane hinged along top */}
        <group position={[0, h / 2, t / 2 + 0.021]}>
          <mesh ref={flap} position={[0, -h * 0.45, 0]}>
            <planeGeometry args={[w, h * 0.9]} />
            <meshStandardMaterial color={'#efdfc1'} roughness={0.9} />
          </mesh>
        </group>

        {/* Sparkle emphasis */}
        <Sparkles count={120} speed={0.5} opacity={0.95} size={3} scale={[3.6, 3.6, 3.6]} />

        {/* Letter: z is behind when closed, in front when opened */}
        <Letter y={letterY} z={letterZ} width={w * 0.9} height={h * 1.6} opened={opened} />

        {/* 3D hint */}
        {!opened && (
          <Html center distanceFactor={10} position={[0, -h * 0.85, 0]}>
            <div className="hint-3d">Click the envelope ✨</div>
          </Html>
        )}
      </group>
    </Float>
  )
}
