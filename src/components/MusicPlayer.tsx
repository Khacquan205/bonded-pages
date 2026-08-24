import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const MUSIC_PREF_KEY = "wedding_bg_music_enabled";
const DEFAULT_VOLUME = 0.4;
const FADE_DURATION = 800; // ms

export function MusicPlayer() {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(wedding.music.src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const onCanPlay = () => setIsLoaded(true);
    audio.addEventListener("canplaythrough", onCanPlay);

    // Auto-resume if user previously enabled music
    const userPref = localStorage.getItem(MUSIC_PREF_KEY) === "true";
    if (userPref) {
      const handleFirstInteraction = () => {
        playWithFade();
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("scroll", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      };

      window.addEventListener("click", handleFirstInteraction, { once: true });
      window.addEventListener("scroll", handleFirstInteraction, { once: true });
      window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    }

    // Pause when tab is hidden / resume when visible
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        if (isPlaying) {
          audioRef.current.pause();
        }
      } else {
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
    };
  }, []);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const playWithFade = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio.play().then(() => {
      setIsPlaying(true);
      localStorage.setItem(MUSIC_PREF_KEY, "true");

      const stepTime = 50;
      const steps = FADE_DURATION / stepTime;
      const volumeStep = DEFAULT_VOLUME / steps;

      fadeIntervalRef.current = window.setInterval(() => {
        if (audio.volume + volumeStep < DEFAULT_VOLUME) {
          audio.volume += volumeStep;
        } else {
          audio.volume = DEFAULT_VOLUME;
          clearFade();
        }
      }, stepTime);
    }).catch((err) => {
      console.warn("Audio autoplay blocked by browser:", err);
      setIsPlaying(false);
    });
  };

  const pauseWithFade = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    localStorage.setItem(MUSIC_PREF_KEY, "false");

    const stepTime = 50;
    const steps = FADE_DURATION / stepTime;
    const volumeStep = audio.volume / steps;

    fadeIntervalRef.current = window.setInterval(() => {
      if (audio.volume - volumeStep > 0) {
        audio.volume -= volumeStep;
      } else {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        clearFade();
      }
    }, stepTime);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseWithFade();
    } else {
      playWithFade();
    }
  };

  const label = isPlaying
    ? lang === "vi"
      ? "Tắt nhạc nền"
      : "Turn off background music"
    : lang === "vi"
      ? "Bật nhạc nền"
      : "Play background music";

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={label}
        title={`${wedding.music.title} (${label})`}
        className={cn(
          "relative flex size-11 items-center justify-center rounded-full border border-eucalyptus/80 bg-cream/90 text-olive-deep shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-cream",
          isPlaying ? "border-olive ring-2 ring-olive/30 ring-offset-2 ring-offset-cream" : "",
        )}
      >
        {isPlaying ? (
          <>
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-olive" />
            </span>
            <Volume2 className="size-5 text-olive animate-pulse" />
          </>
        ) : (
          <VolumeX className="size-5 text-ink-muted" />
        )}
      </button>
    </div>
  );
}
