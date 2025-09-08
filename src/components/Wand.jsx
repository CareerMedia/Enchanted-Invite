import React, { useMemo, useRef } from 'react'
import { Float, Sparkles, Trail } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Wand({ index=0, total=6, radius=5, height=0.5 }) {
  const group = useRef()
  const tip = useRef()
  const phase = (index / total) * Math.PI * 2
  const speed = 0.18 + (index % 3) * 0.03
  const wandLength = 1.2
  const tilt = useMemo(() => (Math.random() * 0.4) - 0.2, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * speed + phase
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    const y = Math.sin(t * 1.8) * height + 0.6
    group.current.position.set(x, y, z)
    group.current.lookAt(0, 0.2, 0)
    tip.current.position.set(wandLength/2, 0, 0)
  })

  return (
    <Float floatIntensity={0.6} speed={1} rotationIntensity={0.2}>
      <group ref={group}>
        <Trail width={0.3} color={'#b3a6ff'} length={2.5} attenuation={(t) => t} target={group} />
        <mesh rotation={[0, Math.PI/2, tilt]} castShadow>
          {/* Wand shaft */}
          <cylinderGeometry args={[0.03, 0.05, 1.2, 8]} />
          <meshStandardMaterial color={'#3b2b1a'} roughness={0.9} />
        </mesh>
        {/* Wand tip glow */}
        <group ref={tip} position={[wandLength/2,0,0]}>
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial emissive={'#c9b6ff'} emissiveIntensity={1.4} color={'#eee1ff'} />
          </mesh>
          <pointLight intensity={1.3} distance={2.8} color={'#c9b6ff'} />
          <Sparkles count={20} speed={1.2} opacity={0.95} size={3} scale={0.8} />
        </group>
      </group>
    </Float>
  )
}