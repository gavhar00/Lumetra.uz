import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Flame, Sparkles, Compass } from "lucide-react";

type SoundType = "none" | "space" | "rain" | "meditation";

export default function FocusLounge() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sound, setSound] = useState<SoundType>("none");
  const [volume, setVolume] = useState(50);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Web Audio Nodes refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const rainNodeRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const bellIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Audio Context on demand (User Interaction)
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      mainGainRef.current = audioCtxRef.current.createGain();
      mainGainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Handle Pomodoro countdown
  useEffect(() => {
    if (isActive) {
      timerIntervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            // Play alert bell
            triggerAlertBell();
            setMinutes(25);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isActive, minutes, seconds]);

  // Adjust Volume
  useEffect(() => {
    if (mainGainRef.current) {
      mainGainRef.current.gain.setValueAtTime(volume / 100, audioCtxRef.current?.currentTime || 0);
    }
  }, [volume]);

  // Handle active ambient sound loop
  useEffect(() => {
    if (isPlayingSound) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
    return () => {
      stopAmbientSound();
    };
  }, [isPlayingSound, sound]);

  const triggerAlertBell = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const main = mainGainRef.current;
    if (!ctx || !main) return;

    // Sweet sine chime
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.5); // A5

    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.0);

    osc.connect(gain);
    gain.connect(main);
    osc.start();
    osc.stop(ctx.currentTime + 2.2);
  };

  const startAmbientSound = () => {
    initAudio();
    stopAmbientSound(); // Reset any playing oscs
    const ctx = audioCtxRef.current;
    const main = mainGainRef.current;
    if (!ctx || !main) return;

    if (sound === "space") {
      // Scientific Low Frequency Lab Drone (Dual Detuned oscillators)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const detuneGain = ctx.createGain();
      
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(110.5, ctx.currentTime); // slightly detuned
      
      detuneGain.gain.setValueAtTime(0.12, ctx.currentTime);

      osc1.connect(detuneGain);
      osc2.connect(detuneGain);
      detuneGain.connect(main);

      osc1.start();
      osc2.start();

      oscillatorsRef.current = [osc1, osc2];
    } 
    else if (sound === "rain") {
      // Synthesize rain using pink/brown noise algorithm via ScriptProcessor
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Simple 1-pole filter to convert white noise to brown/pink noise (deep rain rumble)
        output[i] = (lastOut * 0.985 + white * 0.015);
        lastOut = output[i];
        // Normalize
        output[i] *= 4.5;
      }

      const rainSource = ctx.createBufferSource();
      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      // Filter out high hiss for warm cozy rain
      const biquad = ctx.createBiquadFilter();
      biquad.type = "lowpass";
      biquad.frequency.setValueAtTime(800, ctx.currentTime);

      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.2, ctx.currentTime);

      rainSource.connect(biquad);
      biquad.connect(rainGain);
      rainGain.connect(main);
      
      rainSource.start();
      // Store in oscillatorsRef as dynamic type to dismantle easily
      oscillatorsRef.current = [rainSource as unknown as OscillatorNode];
    }
    else if (sound === "meditation") {
      // Random delicate chime bells repeating at cozy intervals
      const triggerBell = () => {
        const now = ctx.currentTime;
        
        // Random pentatonic frequencies for beautiful celestial alignment
        const freqs = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // E4, G4, A4, C5, D5, E5
        const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

        const osc = ctx.createOscillator();
        const bGain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(randomFreq, now);
        
        bGain.gain.setValueAtTime(0.08, now);
        bGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

        // Low-pass filter for cozy warmth
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(1200, now);

        osc.connect(lp);
        lp.connect(bGain);
        bGain.connect(main);

        osc.start(now);
        osc.stop(now + 4.2);
      };

      triggerBell(); // First trigger
      // Repeat bell every 4.5 seconds
      bellIntervalRef.current = setInterval(triggerBell, 4500);
    }
  };

  const stopAmbientSound = () => {
    // Stop and clear bells
    if (bellIntervalRef.current) {
      clearInterval(bellIntervalRef.current);
      bellIntervalRef.current = null;
    }
    // Stop detuned oscs
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorsRef.current = [];
  };

  const toggleTimer = () => {
    initAudio();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleSoundToggle = (type: SoundType) => {
    initAudio();
    if (sound === type && isPlayingSound) {
      setIsPlayingSound(false);
      setSound("none");
    } else {
      setSound(type);
      setIsPlayingSound(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-[40px] bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-950 border border-white/5 relative overflow-hidden shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-primary/10 p-2.5 rounded-2xl text-primary border border-primary/20">
          <Compass className="w-5 h-5 animate-spin-slow" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-text-primary">Fokus Lounge</h3>
          <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">O'quvchilar Diqqat Markazi</p>
        </div>
      </div>

      {/* Main Grid: Timer & Sounds */}
      <div className="space-y-6 relative z-10">
        {/* Timer UI */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 text-center shadow-inner relative overflow-hidden group">
          <div className="text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-primary-dark to-accent tracking-wider">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <p className="text-[10.5px] text-text-secondary font-bold uppercase tracking-wider mt-1.5">
            {isActive ? "Fokus seans faol" : "Pomodoro hisoblagich"}
          </p>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button 
              onClick={toggleTimer}
              className={`p-3 rounded-xl transition-all font-bold text-xs flex items-center justify-center gap-2 cursor-pointer ${
                isActive ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-primary text-white hover:shadow-lg hover:shadow-primary/30"
              }`}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              {isActive ? "To'xtatish" : "Boshlash"}
            </button>
            <button 
              onClick={resetTimer}
              className="p-3 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary rounded-xl border border-white/5 transition-all cursor-pointer"
              title="Qayta o'rnatish"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Wave Audio Synth */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-2">Ambient Tinchlik</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "space", label: "Laboratoriya", sub: "Lab g'o'ng'illashi" },
              { id: "rain", label: "Yomg'ir", sub: "Cozy rain" },
              { id: "meditation", label: "Chime", sub: "Tinch Sadolar" }
            ].map(snd => (
              <button
                key={snd.id}
                onClick={() => handleSoundToggle(snd.id as SoundType)}
                className={`py-3.5 px-2.5 rounded-2xl border transition-all text-center flex flex-col justify-center items-center cursor-pointer ${
                  sound === snd.id && isPlayingSound
                    ? "bg-primary/20 border-primary shadow-lg shadow-primary/25 text-primary"
                    : "bg-white/5 border-white/5 text-text-secondary hover:text-text-primary hover:border-white/15"
                }`}
              >
                <div className="relative">
                  <span className="text-xs font-bold block">{snd.label}</span>
                  {sound === snd.id && isPlayingSound && (
                    <span className="absolute -top-1 -right-2 h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  )}
                </div>
                <span className="text-[8px] text-text-secondary/70 uppercase tracking-tight mt-0.5 mt-0.5">{snd.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Volume controller */}
        {isPlayingSound && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-3 rounded-2xl"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-text-secondary" /> : <Volume2 className="w-4 h-4 text-primary" />}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 accent-primary h-1 bg-white/10 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono font-bold text-text-secondary">{volume}%</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
