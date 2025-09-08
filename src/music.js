import * as Tone from 'tone'

let started = false
let muted = false
let disposers = []

export async function startMagicMusic() {
  if (started) return
  await Tone.start()

  // Master chain
  const reverb = new Tone.Reverb({ decay: 8, wet: 0.6 })
  const delay = new Tone.FeedbackDelay({ delayTime: 0.6, feedback: 0.35, wet: 0.3 })
  reverb.connect(delay)
  delay.toDestination()

  // Gentle pad
  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 2.5, decay: 1, sustain: 0.7, release: 4 }
  }).connect(reverb)

  // Twinkling sparkle
  const sparkle = new Tone.MetalSynth({
    resonance: 4000,
    harmonicity: 5.1,
    modulationIndex: 32,
    envelope: { attack: 0.001, decay: 2.2, release: 0.4 }
  }).connect(new Tone.Gain(0.2).connect(reverb))

  // Whispering wind (noise through filter)
  const noise = new Tone.Noise('pink').start()
  const filt = new Tone.AutoFilter({ frequency: 0.08, depth: 0.5, octaves: 3, baseFrequency: 200, wet: 0.35 }).start()
  noise.connect(filt).connect(new Tone.Gain(0.02).connect(reverb))

  Tone.Transport.bpm.value = 52
  Tone.Transport.start('+0.05')

  const chords = [
    ['A3','C4','E4','A4'],
    ['F3','A3','C4','F4'],
    ['C3','E3','G3','C4'],
    ['G3','B3','D4','G4']
  ]
  let idx = 0

  const padLoop = new Tone.Loop((time) => {
    pad.triggerAttackRelease(chords[idx], '2m', time)
    idx = (idx + 1) % chords.length
  }, '2m').start(0)

  const sparkleLoop = new Tone.Loop((time) => {
    const freq = 400 + Math.random() * 1200
    sparkle.triggerAttackRelease(freq, '16n', time)
  }, '4n').start('1m')

  disposers = [padLoop, sparkleLoop, pad, sparkle, noise, filt, reverb, delay]
  started = true
  return true
}

export function toggleMute() {
  muted = !muted
  Tone.Destination.mute = muted
  return muted
}

export function stopMagicMusic() {
  try {
    Tone.Transport.stop()
  } catch {}
  disposers.forEach(d => { try { d.dispose?.() } catch {} })
  disposers = []
  started = false
}