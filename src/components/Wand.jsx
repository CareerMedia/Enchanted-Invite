import React, { useRef } from 'react'
import { Float, Sparkles, Trail } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Wand({ index=0, total=4, radius=4.5, height=0.5 }) {
  const group = useRef()
  const phase = (index / total) * Math.PI * 2
  const speed = 0.16 + (index % 3) * 0.03

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    const y = Math.sin(t * 1.8) * height + 0.6
    group.current.position.set(x, y, z)
    group.current.lookAt(0, 0.2, 0)
  })

  return (
    <Float floatIntensity={0.6} speed={1} rotationIntensity={0.2}>
      <group ref={group}>
        <Trail width={0.25} length={2.2} attenuation={(t) => t} target={group} />
        <mesh rotation={[0, Math.PI/2, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.05, 1.2, 8]} />
          <meshStandardMaterial color={'#3b2b1a'} roughness={0.9} />
        </mesh>
        <pointLight intensity={1.1} distance={2.6} color={'#c9b6ff'} position={[0.6,0,0]} />
        <Sparkles count={16} speed={1.2} opacity={0.95} size={2.5} scale={0.8} />
      </group>
    </Float>
  )
}
