import * as Tone from 'tone'

let started = false
let muted = false

export async function startMagicMusic() {
  if (started) return
  await Tone.start()

  const reverb = new Tone.Reverb({ decay: 8, wet: 0.6 })
  const delay = new Tone.FeedbackDelay({ delayTime: 0.6, feedback: 0.35, wet: 0.3 })
  reverb.connect(delay)
  delay.toDestination()

  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 2.5, decay: 1, sustain: 0.7, release: 4 }
  }).connect(reverb)

  Tone.Transport.bpm.value = 52
  Tone.Transport.start('+0.05')

  const chords = [
    ['A3','C4','E4','A4'],
    ['F3','A3','C4','F4'],
    ['C3','E3','G3','C4'],
    ['G3','B3','D4','G4']
  ]
  let idx = 0

  new Tone.Loop((time) => {
    pad.triggerAttackRelease(chords[idx], '2m', time)
    idx = (idx + 1) % chords.length
  }, '2m').start(0)

  started = true
}

export function toggleMute() {
  muted = !muted
  Tone.Destination.mute = muted
  return muted
}
