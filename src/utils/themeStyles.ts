/**
 * Shared Theme Tokens & Style Helpers
 * 
 * Provides consistent styling classes across all components, panels, toolbars,
 * and modals for both Light Mode and Dark Mode.
 */

export interface ThemeClasses {
  // Shell containers & modal windows
  shell: string;
  header: string;
  content: string;
  footer: string;
  
  // Inner cards & sub-sections
  innerCard: string;
  innerCardMuted: string;
  
  // Inputs & controls
  input: string;
  rangeSlider: string;
  
  // Buttons & pills
  btnPrimary: string;
  btnSecondary: string;
  btnGhost: string;
  btnDanger: string;
  activePill: string;
  inactivePill: string;
  
  // Typography & accents
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderSubtle: string;
}

export function getThemeClasses(theme?: 'light' | 'dark' | string): ThemeClasses {
  const isLight = theme === 'light';

  return {
    shell: isLight
      ? 'bg-white text-neutral-800 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
      : 'bg-[#18191d] text-neutral-100 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)]',
    header: isLight
      ? 'bg-neutral-50 border-b border-black/10 text-neutral-900'
      : 'bg-[#141519] border-b border-white/10 text-white',
    content: isLight ? 'text-neutral-800' : 'text-neutral-200',
    footer: isLight
      ? 'bg-neutral-50 border-t border-black/10'
      : 'bg-[#141519] border-t border-white/10',
    innerCard: isLight
      ? 'bg-[#f4f0e9] border border-black/10 text-neutral-900'
      : 'bg-[#18191f] border border-white/10 text-neutral-100',
    innerCardMuted: isLight
      ? 'bg-neutral-100/70 border border-black/5 text-neutral-700'
      : 'bg-white/[0.035] border border-white/5 text-neutral-300',
    input: isLight
      ? 'bg-white border border-black/15 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400/30'
      : 'bg-black/40 border border-white/15 text-white placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500/30',
    rangeSlider: isLight ? 'accent-neutral-900 cursor-pointer' : 'accent-white cursor-pointer',
    btnPrimary: isLight
      ? 'bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white font-semibold transition-all shadow-xs'
      : 'bg-white hover:bg-neutral-100 active:scale-95 text-zinc-950 font-semibold transition-all shadow-xs',
    btnSecondary: isLight
      ? 'bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-800 border border-black/10 transition-all'
      : 'bg-white/10 hover:bg-white/15 active:scale-95 text-neutral-100 border border-white/10 transition-all',
    btnGhost: isLight
      ? 'hover:bg-black/5 active:scale-95 text-neutral-600 hover:text-neutral-900 transition-all'
      : 'hover:bg-white/10 active:scale-95 text-neutral-400 hover:text-white transition-all',
    btnDanger: isLight
      ? 'bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-600 border border-rose-200 transition-all'
      : 'bg-rose-500/10 hover:bg-rose-500/20 active:scale-95 text-rose-400 border border-rose-500/20 transition-all',
    activePill: isLight
      ? 'bg-black/[0.04] border border-black/30 text-neutral-950 font-semibold shadow-xs'
      : 'bg-white/[0.06] border border-white/25 text-white font-semibold shadow-xs',
    inactivePill: isLight
      ? 'border border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-black/[0.02]'
      : 'border border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.02]',
    textPrimary: isLight ? 'text-neutral-900' : 'text-neutral-100',
    textSecondary: isLight ? 'text-neutral-600' : 'text-neutral-400',
    textMuted: isLight ? 'text-neutral-400' : 'text-neutral-500',
    borderSubtle: isLight ? 'border-black/10' : 'border-white/10',
  };
}
