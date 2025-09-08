import React from 'react'
import { EffectComposer, Bloom, Noise, Vignette, GodRays } from '@react-three/postprocessing'

export default function Effects({ moonRef }) {
  return (
    <EffectComposer multisampling={4}>
      <Bloom intensity={0.9} luminanceThreshold={0.15} luminanceSmoothing={0.2} mipmapBlur />
      {moonRef?.current && <GodRays sun={moonRef.current} samples={60} density={0.9} decay={0.96} weight={0.4} exposure={0.35} clampMax={1.0} />}
      <Noise premultiply opacity={0.08} />
      <Vignette eskil={false} offset={0.2} darkness={0.8} />
    </EffectComposer>
  )
}