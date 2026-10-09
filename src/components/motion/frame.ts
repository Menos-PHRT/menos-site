// Um único loop de requestAnimationFrame para todo o site. Cada componente se
// inscreve com subscribe() e escreve direto no DOM (refs, element.style,
// setAttribute). Nada aqui passa por estado do React a cada frame.
type FrameFn = (now: number, dt: number) => void;

const subs = new Set<FrameFn>();
let raf = 0;
let last = 0;

function loop(now: number) {
  raf = requestAnimationFrame(loop);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  subs.forEach((fn) => {
    try {
      fn(now, dt);
    } catch (err) {
      console.error(err);
    }
  });
}

export function subscribe(fn: FrameFn): () => void {
  subs.add(fn);
  if (subs.size === 1) {
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }
  return () => {
    subs.delete(fn);
    if (subs.size === 0) cancelAnimationFrame(raf);
  };
}
