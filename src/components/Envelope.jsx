import React, { useMemo, useRef, useState } from 'react'
import { Float, Html, Sparkles } from '@react-three/drei'
import { Shape } from 'three'
import { useFrame } from '@react-three/fiber'
import * as easing from 'maath/easing'
import Letter from './Letter.jsx'

export default function Envelope({ position=[0,0,0], opened=false, onOpen }) {
  const group = useRef()
  const flapPivot = useRef()
  const [hovered, setHovered] = useState(false)
  const localOpen = useRef(0) // 0 closed, 1 open
  const letterY = useRef(0)   // slide progress for letter

  const w = 3.2, h = 2.2, t = 0.05

  // Triangle flap shape (hinge along its top edge)
  const flapGeom = useMemo(() => {
    const tri = new Shape()
    // top edge along y=0 from -w/2 to +w/2
    tri.moveTo(-w/2, 0)
    tri.lineTo(w/2, 0)
    tri.lineTo(0, -h*0.9)
    tri.lineTo(-w/2, 0)
    return tri
  }, [])

  useFrame((state, delta) => {
    // Open progress target
    const target = opened ? 1 : 0
    localOpen.current = easing.damp(localOpen, 'current', target, 0.25, delta)
    // flap rotation from 0 (closed) to -1.3 rad (open)
    if (flapPivot.current) {
      const rot = -1.3 * localOpen.current
      flapPivot.current.rotation.x = rot
    }
    // Letter slides from hidden (-0.8) to visible (1.1)
    letterY.current = easing.damp(letterY, 'current', opened ? 1.1 : -0.8, 0.25, delta)
    // Gentle envelope sway
    if (group.current) {
      const t = state.clock.getElapsedTime()
      group.current.rotation.z = Math.sin(t * 0.3) * 0.04
      group.current.rotation.x = Math.sin(t * 0.25) * 0.03
    }
  })

  return (
    <Float floatIntensity={0.7} speed={0.8} rotationIntensity={0.2}>
      <group ref={group} position={position}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onOpen?.() }}
      >
        {/* Envelope body (thin box) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, t]} />
          <meshStandardMaterial color={hovered ? '#f2e9d0' : '#e8dcc2'} roughness={0.8} metalness={0} />
        </mesh>

        {/* Front face (subtle) */}
        <mesh position={[0, 0, t/2 + 0.001]}>
          <planeGeometry args={[w*0.98, h*0.98]} />
          <meshStandardMaterial color={'#f6efdb'} roughness={0.9} />
        </mesh>

        {/* Flap group with hinge at top edge */}
        <group ref={flapPivot} position={[0, h/2, t/2 + 0.002]}>
          <mesh position={[0, 0, 0]}>
            <shapeGeometry args={[flapGeom]} />
            <meshStandardMaterial color={'#eadfca'} roughness={0.9} />
          </mesh>
          {/* Edge line for flap */}
          <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.0005]}>
            <planeGeometry args={[w, 0.01]} />
            <meshBasicMaterial color={'#c7b89a'} />
          </mesh>
        </group>

        {/* Magical sparkles around envelope */}
        <Sparkles count={100} speed={0.4} opacity={0.85} size={2} scale={[3.5, 3.5, 3.5]} position={[0,0,0.2]} />

        {/* Letter (slides upward) */}
        <Letter y={letterY} z={t/2 + 0.004} width={w*0.9} height={h*1.6} />

        {/* 3D hint text (fallback to overlay) */}
        {!opened && (
          <Html center distanceFactor={10} position={[0, -h*0.85, 0]}>
            <div className="hint-3d">Click the envelope ✨</div>
          </Html>
        )}
      </group>
    </Float>
  )
}