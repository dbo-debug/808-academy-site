"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  label?: string;
  className?: string;
};

export default function AudioPlay({ src, label, className }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onDur = () => setDur(a.duration || 0);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("durationchange", onDur);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("durationchange", onDur);
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      try {
        await a.play();
        setIsPlaying(true);
      } catch {
        // ignore autoplay errors
      }
    }
  };

  const seek = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = v;
    setProgress(v);
  };

  return (
    <div
      className={
        "flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 " +
        (className || "")
      }
    >
      <audio ref={audioRef} preload="metadata" src={src} />
      <button
        onClick={toggle}
        className={
          "rounded-full px-3 py-1 text-sm font-semibold transition " +
          (isPlaying
            ? "bg-teal-400 text-black hover:bg-teal-300"
            : "bg-white/10 text-white hover:bg-white/20")
        }
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={dur || 0}
          step={0.01}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-1 flex justify-between text-[11px] text-white/60">
          <span>{label ?? src.split("/").pop()}</span>
          <span>
            {format(progress)} / {format(dur)}
          </span>
        </div>
      </div>
    </div>
  );
}

function format(sec: number) {
  if (!sec || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
