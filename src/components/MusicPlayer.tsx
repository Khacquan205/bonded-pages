import { useEffect, useRef, useState } from "react";
import { Music2, Pause, RotateCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// "At Last" (Etta James), the two "At last…" verses, looped. Served from our own origin so
// play() runs on the page itself: iOS / Zalo only honour a play() made directly inside the
// guest's touch handler, which a cross-origin player (e.g. a Spotify iframe) cannot get.
const SONG_SRC = "/audio/at-last-chorus.mp3";

// Browsers block audible autoplay until the first interaction, so retry on every early input
// event (finger down, finger up, click, key) until the audio actually starts.
const GESTURE_EVENTS = ["pointerdown", "touchend", "click", "keydown"] as const;
const LISTENER_OPTIONS = { capture: true, passive: true } as const;

export function MusicPlayer() {
  const { lang } = useLanguage();
  const vi = lang === "vi";
  const audio = useRef<HTMLAudioElement>(null);
  const musicButton = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  // Desktop hint until the music has started once (wheel scrolling can't unlock audio there).
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    el.volume = 0.8;

    const removeGestureListeners = () => {
      for (const type of GESTURE_EVENTS)
        document.removeEventListener(type, startOnGesture, LISTENER_OPTIONS);
    };
    function startOnGesture(event: Event) {
      if (!event.isTrusted) return;
      // The music button handles its own play / pause.
      if (event.target instanceof Node && musicButton.current?.contains(event.target)) return;
      if (
        event instanceof KeyboardEvent &&
        (event.repeat || event.ctrlKey || event.metaKey || event.altKey)
      )
        return;
      // Must be called synchronously inside the gesture for iOS to allow sound.
      el?.play().catch(() => {});
    }

    // State follows what the audio element really does, not what we asked it to do.
    const onPlaying = () => {
      setPlaying(true);
      setStarted(true);
      setFailed(false);
      removeGestureListeners();
    };
    const onPause = () => setPlaying(false);
    const onError = () => {
      setPlaying(false);
      setFailed(true);
    };
    el.addEventListener("playing", onPlaying);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);
    for (const type of GESTURE_EVENTS)
      document.addEventListener(type, startOnGesture, LISTENER_OPTIONS);

    // Try right away: some browsers / in-app webviews allow it without a tap.
    el.play().catch(() => {});

    return () => {
      removeGestureListeners();
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
      el.pause();
    };
  }, []);

  const toggleMusic = () => {
    const el = audio.current;
    if (!el) return;
    if (failed) {
      setFailed(false);
      el.load();
      el.play().catch(() => {});
    } else if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const label = failed
    ? vi
      ? "Thử tải lại nhạc"
      : "Retry loading music"
    : playing
      ? vi
        ? "Tạm dừng nhạc"
        : "Pause music"
      : vi
        ? "Phát nhạc"
        : "Play music";

  return (
    <aside
      aria-label={vi ? "Nhạc thiệp cưới" : "Wedding music"}
      className="fixed right-3 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 sm:right-6"
    >
      {/* Desktop only: on phones the first tap already starts the music. Clicking it bubbles
          to the document gesture listener, which starts playback. */}
      {!started && !failed && (
        <span
          aria-hidden="true"
          className="hidden cursor-pointer rounded-full border border-[#451020]/15 bg-[#faf6f0]/95 px-3 py-1.5 font-serif text-xs font-semibold tracking-wide text-[#451020] shadow-[0_4px_14px_rgba(45,8,29,0.15)] backdrop-blur-sm lg:block"
        >
          {vi ? "Bấm để nghe nhạc" : "Click to play music"}
        </span>
      )}
      <audio ref={audio} src={SONG_SRC} preload="auto" loop playsInline />
      <span role="status" className="sr-only">
        {failed
          ? vi
            ? "Không thể tải nhạc. Bấm nút nhạc để thử lại."
            : "Unable to load the music. Press the music button to retry."
          : label}
      </span>
      <button
        ref={musicButton}
        type="button"
        onClick={toggleMusic}
        aria-label={label}
        aria-pressed={playing}
        title={label}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#faf6f0]/30 bg-[#451020] text-[#faf6f0] shadow-[0_8px_24px_rgba(45,8,29,0.3)] transition-colors hover:bg-[#5c1a2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#451020]"
      >
        {failed ? (
          <RotateCw className="size-5" aria-hidden="true" />
        ) : playing ? (
          <Pause className="size-5" aria-hidden="true" />
        ) : (
          <Music2 className="size-5" aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
