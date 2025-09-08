import React, { useRef } from 'react'
import { Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

/** A quick sparkle puff that fades out by shrinking over ~1s. */
export default function SparkleBurst({ position = [0, 0, 0], scale = [3, 3, 3] }) {
  const g = useRef()
  const start = useRef(null)

  useFrame((state) => {
    if (!start.current) start.current = state.clock.getElapsedTime()
    const t = state.clock.getElapsedTime() - start.current
    const k = Math.max(0, 1 - t / 1.1) // 1.1s fade
    if (g.current) {
      g.current.scale.set(scale[0] * (1 + (1 - k) * 0.4), scale[1] * (1 + (1 - k) * 0.4), scale[2] * (1 + (1 - k) * 0.4))
      g.current.rotation.y += 0.01
      g.current.position.y = position[1] + t * 0.6 // drift up a bit
    }
  })

  return (
    <group ref={g} position={position}>
      <Sparkles count={220} speed={1.4} opacity={0.95} size={3.2} scale={scale} />
    </group>
  )
}
