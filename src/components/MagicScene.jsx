import React from 'react'
import { Environment, Stars } from '@react-three/drei'

export default function MagicScene({ moonRef }) {
  return (
    <>
      <color attach="background" args={['#070813']} />
      <fog attach="fog" args={['#0a0b1a', 10, 45]} />
      {/* Ambient/Fill */}
      <ambientLight intensity={0.35} color={'#d2d6ff'} />
      {/* Moonlight */}
      <directionalLight position={[-6, 10, 2]} intensity={0.6} color={'#c9d1ff'} castShadow />
      {/* Silver moon for god rays */}
      <mesh ref={moonRef} position={[-10, 14, -12]}>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshStandardMaterial emissive={'#dfe6ff'} emissiveIntensity={1.6} color={'#f2f5ff'} roughness={0.6} metalness={0} />
      </mesh>

      {/* Sky */}
      <Stars radius={140} depth={90} count={8000} factor={4} saturation={0} fade speed={0.3} />
      <Environment preset="night" />
    </>
  )
}