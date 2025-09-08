import React from 'react'
import { Stars } from '@react-three/drei'

export default function MagicScene({ moonRef }) {
  return (
    <>
      <color attach="background" args={['#070813']} />
      <fog attach="fog" args={['#0a0b1a', 18, 60]} />

      <ambientLight intensity={0.7} color={'#dfe3ff'} />
      <directionalLight position={[-4, 8, 6]} intensity={1.2} color={'#e7ebff'} castShadow />
      <directionalLight position={[6, 4, -6]} intensity={0.5} color={'#99a4ff'} />

      <mesh ref={moonRef} position={[-10, 14, -12]}>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshStandardMaterial emissive={'#dfe6ff'} emissiveIntensity={1.2} color={'#f2f5ff'} roughness={0.6} />
      </mesh>

      <Stars radius={140} depth={90} count={5000} factor={4} saturation={0} fade speed={0.3} />
    </>
  )
}
