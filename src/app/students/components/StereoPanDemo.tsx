"use client";

import { useEffect, useRef, useState } from "react";

export default function StereoPanDemo() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [pan, setPan] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const oscRef = useRef<OscillatorNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);

  useEffect(() => {
    return () => {
      stopTone();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const ensureChain = () => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (!pannerRef.current) pannerRef.current = new StereoPannerNode(ctx, { pan: 0 });
    if (!oscRef.current) {
      const o = new OscillatorNode(ctx, { type: "sawtooth", frequency: 330 });
      const g = new GainNode(ctx, { gain: 0.05 });
      o.connect(g).connect(pannerRef.current).connect(ctx.destination);
      oscRef.current = o;
    }
  };

  const startTone = async () => {
    ensureChain();
    const ctx = ctxRef.current!;
    await ctx.resume();
    if (oscRef.current) {
      try {
        oscRef.current.start();
      } catch {
        /* already started */
      }
    }
    setIsOn(true);
  };

  const stopTone = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch {
        /* already stopped */
      }
      oscRef.current.disconnect();
      oscRef.current = null;
    }
    setIsOn(false);
  };

  const setPanValue = (v: number) => {
    setPan(v);
    if (pannerRef.current) pannerRef.current.pan.value = v;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-2 text-sm font-semibold text-white">Stereo Field Demo</div>
      <input
        type="range"
        min={-1}
        max={1}
        step={0.01}
        value={pan}
        onChange={(e) => setPanValue(Number(e.target.value))}
        className="w-full"
      />
      <div className="mt-1 text-[11px] text-white/60">Pan: {pan.toFixed(2)} (L ↔ R)</div>
      <div className="mt-3 flex gap-2">
        {!isOn ? (
          <button
            onClick={startTone}
            className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-black hover:bg-teal-300"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopTone}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
