// @ts-ignore
import confetti from "canvas-confetti";

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#4F7CFF", "#8B5CF6", "#22C1A6"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#FFD700", "#4F7CFF", "#34D8BC"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#8B5CF6", "#FF6B6B", "#4F7CFF"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ["#22C1A6", "#A78BFA"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
