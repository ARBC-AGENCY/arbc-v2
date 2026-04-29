"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface VideoPlayerState {
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  toggle: () => void;
  seek: (time: number) => void;
  setVol: (v: number) => void;
  toggleMute: () => void;
  toggleFullscreen: (container: HTMLElement | null) => void;
}

export function formatTime(seconds: number): string {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, "0")}`;
}

export function useVideoPlayer(
  videoRef: React.RefObject<HTMLVideoElement | null>,
): VideoPlayerState {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setMuted(video.muted);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("volumechange", onVolumeChange);

    // rAF loop for smooth progress bar
    const tick = () => {
      if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("volumechange", onVolumeChange);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  }, [videoRef]);

  const seek = useCallback(
    (time: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = time;
      setCurrentTime(time);
    },
    [videoRef],
  );

  const setVol = useCallback(
    (val: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.volume = val;
      v.muted = val === 0;
    },
    [videoRef],
  );

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  }, [videoRef]);

  const toggleFullscreen = useCallback(
    (container: HTMLElement | null) => {
      const el = container ?? videoRef.current;
      if (!el) return;
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    },
    [videoRef],
  );

  return {
    playing,
    currentTime,
    duration,
    volume,
    muted,
    toggle,
    seek,
    setVol,
    toggleMute,
    toggleFullscreen,
  };
}
