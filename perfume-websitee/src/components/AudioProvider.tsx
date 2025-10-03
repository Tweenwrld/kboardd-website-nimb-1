'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { LuVolume2, LuVolumeX } from 'react-icons/lu';

type AudioTrack = 'intro' | 'keyboard' | 'ambient';

type AudioContextType = {
  isPlaying: boolean;
  togglePlay: () => void;
  currentTrack: AudioTrack;
};

const AudioContext = createContext<AudioContextType | null>(null);

const AUDIO_TRACKS = {
  intro: '/sounds/nimbus_intro_loop.mp3',
  keyboard: '/sounds/nimbus_keyboard_full_sound.mp3',
  ambient: '/sounds/nature_nimbus_ambience_loop.mp3',
};

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>('intro');
  const audioRefs = useRef<Record<AudioTrack, HTMLAudioElement | null>>({
    intro: null,
    keyboard: null,
    ambient: null,
  });

  useEffect(() => {
    // Initialize all audio tracks
    (Object.keys(AUDIO_TRACKS) as AudioTrack[]).forEach((track) => {
      const audio = new Audio(AUDIO_TRACKS[track]);
      audio.loop = true;
      audio.volume = 0; // Start at 0 volume for smooth transitions
      audioRefs.current[track] = audio;
    });

    // Intersection Observer setup for section detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isPlaying) {
            const section = entry.target.getAttribute('data-slice-type');
            let newTrack: AudioTrack = 'ambient';

            if (section === 'heroo') {
              newTrack = 'intro';
            } else if (section === 'color_changer') {
              newTrack = 'keyboard';
            }

            if (newTrack !== currentTrack) {
              // Fade out current track
              const fadeOut = audioRefs.current[currentTrack];
              if (fadeOut) {
                fadeAudio(fadeOut, 'out');
              }

              // Fade in new track
              const fadeIn = audioRefs.current[newTrack];
              if (fadeIn) {
                fadeAudio(fadeIn, 'in');
              }

              setCurrentTrack(newTrack);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe sections
    document.querySelectorAll('[data-slice-type]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      // Cleanup
      observer.disconnect();
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  // Fade audio helper
  const fadeAudio = (audio: HTMLAudioElement, direction: 'in' | 'out') => {
    const startVolume = direction === 'in' ? 0 : 1;
    const endVolume = direction === 'in' ? 1 : 0;
    const duration = 1000; // 1 second fade
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = (endVolume - startVolume) / steps;

    if (direction === 'in') {
      audio.currentTime = 0;
      audio.play();
    }

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      const newVolume = startVolume + (volumeStep * currentStep);
      audio.volume = Math.max(0, Math.min(1, newVolume));

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (direction === 'out') {
          audio.pause();
        }
      }
    }, stepTime);
  };

  const togglePlay = () => {
    Object.entries(audioRefs.current).forEach(([track, audio]) => {
      if (!audio) return;

      if (isPlaying) {
        fadeAudio(audio, 'out');
      } else if (track === currentTrack) {
        fadeAudio(audio, 'in');
      }
    });

    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, currentTrack }}>
      {children}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-black/90 text-white shadow-xl transition-all hover:scale-110 hover:bg-black active:scale-95 backdrop-blur-sm ring-2 ring-white/20"
        aria-label={isPlaying ? 'Mute sound' : 'Play sound'}
      >
        {isPlaying ? <LuVolume2 size={28} /> : <LuVolumeX size={28} />}
      </button>
    </AudioContext.Provider>
  );
}