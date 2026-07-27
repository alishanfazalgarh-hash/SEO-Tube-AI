import confetti from 'canvas-confetti';

export function triggerBoomAnimation() {
  if (typeof window === 'undefined') return;

  // 1. Center Explosive Burst
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { y: 0.6 },
    colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
  });

  // 2. Left and Right Cannons after 150ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.7 },
      colors: ['#fbbf24', '#f43f5e', '#34d399'],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.7 },
      colors: ['#fbbf24', '#f43f5e', '#34d399'],
    });
  }, 150);

  // 3. Gold Star Burst after 300ms
  setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 160,
      startVelocity: 45,
      decay: 0.9,
      scalar: 1.2,
      shapes: ['star'],
      colors: ['#ffd700', '#ffae00', '#ffffff'],
      origin: { y: 0.5 },
    });
  }, 300);
}
