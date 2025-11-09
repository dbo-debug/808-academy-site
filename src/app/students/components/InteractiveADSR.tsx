"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveADSR() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [attack, setAttack] = useState(0.03);
  const [decay, setDecay] = useState(0.15);
  const [sustain, setSustain] = useState(0.6);
  const [release, setRelease] = useState(0.25);
  const [freq, setFreq] = useState(440);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const ensureCtx = () => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    return ctxRef.current;
  };

  const trigger = async () => {
    const ctx = ensureCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);

    // A
    gain.gain.linearRampToValueAtTime(1, now + attack);
    // D
    gain.gain.linearRampToValueAtTime(sustain, now + attack + decay);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);

    // schedule release
    const stopAt = now + attack + decay + 0.4; // short hold
    gain.gain.setValueAtTime(sustain, stopAt);
    gain.gain.linearRampToValueAtTime(0, stopAt + release);
    osc.stop(stopAt + release + 0.02);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-3 text-sm font-semibold text-white">ADSR Playground</div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <Slider label="Attack" v={attack} set={setAttack} min={0.005} max={1} step={0.005} />
        <Slider label="Decay" v={decay} set={setDecay} min={0.01} max={1.5} step={0.01} />
        <Slider label="Sustain" v={sustain} set={setSustain} min={0} max={1} step={0.01} />
        <Slider label="Release" v={release} set={setRelease} min={0.01} max={1.5} step={0.01} />
        <Slider label="Freq (Hz)" v={freq} set={setFreq} min={110} max={1760} step={1} />
      </div>
      <button
        onClick={trigger}
        className="mt-4 rounded-full bg-teal-400 px-4 py-2 font-semibold text-black hover:bg-teal-300"
      >
        Preview Note
      </button>
      <p className="mt-3 text-xs text-white/60">
        Drag the sliders — you’re shaping volume over time. Try short A/D for drum-like hits,
        or long A/R for pads.
      </p>
    </div>
  );
}

function Slider({
  label,
  v,
  set,
  min,
  max,
  step,
}: {
  label: string;
  v: number;
  set: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label className="block text-xs text-white/70">
      <div className="mb-1">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full"
      />
      <div className="mt-1 text-[11px] text-white/50">{Number(v).toFixed(3)}</div>
    </label>
  );
}
