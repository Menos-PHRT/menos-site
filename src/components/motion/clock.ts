// Estado compartilhado entre a intro, o cabeçalho, o logo e as seções da home.
// Fica fora do React de propósito: é lido todo frame pelo loop de animação.
export const clock = {
  /** performance.now() em que o hero começa a entrar (5,1s depois do início da intro). */
  heroT0: 0,
  /** true quando a intro terminou (ou foi pulada). */
  introDone: false,
  /** 1 = cabeçalho sobre fundo claro, 0 = sobre fundo escuro (interpolado). */
  themeK: 1
};

/** Quanto dura até o hero começar, depois do início da intro (segundos). */
export const HERO_DELAY_MS = 5100;
