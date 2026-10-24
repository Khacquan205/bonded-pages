import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Music2, Pause } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRsvpButton } from "@/context/RsvpButtonContext";

const API_URL = "https://open.spotify.com/embed/iframe-api/v1";

type PlaybackEvent = { data: { isPaused: boolean } };
type SpotifyController = {
  play: () => void;
  pause: () => void;
  destroy: () => void;
  addListener: {
    (event: "ready", callback: () => void): void;
    (event: "playback_update", callback: (event: PlaybackEvent) => void): void;
  };
};
type SpotifyApi = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width: string; height: number },
    callback: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyApi) => void;
  }
}

let apiPromise: Promise<SpotifyApi> | undefined;

function loadSpotifyApi() {
  if (!apiPromise) {
    apiPromise = new Promise<SpotifyApi>((resolve, reject) => {
      window.onSpotifyIframeApiReady = resolve;
      const script = document.createElement("script");
      script.src = API_URL;
      script.async = true;
      script.onerror = () => {
        apiPromise = undefined;
        script.remove();
        reject(new Error("Spotify could not load"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export function MusicPlayer() {
  const { lang } = useLanguage();
  const { isSticky } = useRsvpButton();
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const musicButton = useRef<HTMLButtonElement>(null);
  const controller = useRef<SpotifyController | null>(null);
  const autoStartPending = useRef(true);
  const vi = lang === "vi";

  useEffect(() => {
    if (!host.current) return;
    let disposed = false;
    let timedOut = false;
    let ready = false;
    let embed: SpotifyController | null = null;
    const removeGestureListeners = () => {
      document.removeEventListener("click", startOnGesture);
      document.removeEventListener("keydown", startOnGesture);
    };
    function startOnGesture(event: MouseEvent | KeyboardEvent) {
      if (!event.isTrusted || !ready || disposed || timedOut || !autoStartPending.current) return;
      // The music button handles its own action; do not issue two play/pause commands.
      if (event.target instanceof Node && musicButton.current?.contains(event.target)) return;
      if (
        event instanceof KeyboardEvent &&
        (event.repeat || event.ctrlKey || event.metaKey || event.altKey)
      )
        return;
      embed?.play();
    }
    // A tap generates click too. Keep trying on genuine gestures until Spotify
    // confirms playback, because the initial autoplay request may be blocked.
    document.addEventListener("click", startOnGesture);
    document.addEventListener("keydown", startOnGesture);
    // Spotify replaces its target. Keep React's host intact for safe cleanup.
    const target = document.createElement("div");
    host.current.appendChild(target);
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.current = null;
      removeGestureListeners();
      embed?.destroy();
      setPlaying(false);
      setStatus("error");
    }, 15000);

    loadSpotifyApi()
      .then((api) => {
        if (disposed || timedOut) return;
        api.createController(
          target,
          { uri: "spotify:track:4Hhv2vrOTy89HFRcjU3QOx", width: "100%", height: 152 },
          (created) => {
            if (disposed || timedOut) {
              created.destroy();
              return;
            }
            embed = created;
            controller.current = created;
            created.addListener("ready", () => {
              if (disposed || timedOut) return;
              window.clearTimeout(timeout);
              ready = true;
              setStatus("ready");
              if (autoStartPending.current) created.play();
            });
            created.addListener("playback_update", ({ data }) => {
              if (disposed || timedOut) return;
              setPlaying(!data.isPaused);
              if (!data.isPaused) {
                autoStartPending.current = false;
                removeGestureListeners();
              }
            });
          },
        );
      })
      .catch(() => {
        if (disposed || timedOut) return;
        window.clearTimeout(timeout);
        removeGestureListeners();
        setStatus("error");
      });

    const container = host.current;
    return () => {
      disposed = true;
      removeGestureListeners();
      window.clearTimeout(timeout);
      controller.current = null;
      if (!timedOut) embed?.destroy();
      container.replaceChildren();
    };
  }, [attempt]);

  const toggleMusic = () => {
    if (status === "error") {
      autoStartPending.current = true;
      setStatus("loading");
      setPlaying(false);
      setAttempt((value) => value + 1);
    } else if (status === "ready") {
      autoStartPending.current = false;
      if (playing) controller.current?.pause();
      else controller.current?.play();
    }
  };

  const label =
    status === "error"
      ? vi
        ? "Thử tải lại nhạc"
        : "Retry loading music"
      : status === "loading"
        ? vi
          ? "Đang tải nhạc"
          : "Loading music"
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
      className={`fixed right-3 z-40 sm:right-6 ${isSticky ? "bottom-[max(1.25rem,env(safe-area-inset-bottom))]" : "bottom-[max(0.625rem,env(safe-area-inset-bottom))]"}`}
    >
      {/* Keep Spotify mounted without a visible panel or keyboard focus targets. */}
      <div ref={host} className="sr-only pointer-events-none" aria-hidden="true" inert />
      <span role="status" className="sr-only">
        {status === "error"
          ? vi
            ? "Không thể kết nối Spotify. Bấm nút nhạc để thử lại."
            : "Unable to connect to Spotify. Press the music button to retry."
          : label}
      </span>
      <button
        ref={musicButton}
        type="button"
        onClick={toggleMusic}
        disabled={status === "loading"}
        aria-label={label}
        aria-pressed={playing}
        aria-busy={status === "loading"}
        title={label}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#faf6f0]/30 bg-[#451020] text-[#faf6f0] shadow-[0_8px_24px_rgba(45,8,29,0.3)] transition-colors hover:bg-[#5c1a2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#451020] disabled:cursor-wait"
      >
        {status === "loading" ? (
          <LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" />
        ) : playing ? (
          <Pause className="size-5" aria-hidden="true" />
        ) : (
          <Music2 className="size-5" aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
