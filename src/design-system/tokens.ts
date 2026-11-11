import type { CSSProperties } from 'react';
export const themeTokens={canvas:'#FFFFFF',surface:'#FFFFFF',soft:'#EFF6FC',ink:'#243447',muted:'#52677C',line:'#C5D5E4',azure:'#1769AA',teal:'#087F8C',violet:'#7957BD'} as const;
export type ThemeOverrides=Partial<Record<keyof typeof themeTokens,string>>;
export function themeVariables(overrides:ThemeOverrides):CSSProperties{return Object.fromEntries(Object.entries(overrides).map(([key,value])=>[`--pa-${key}`,value])) as CSSProperties;}
export const cx=(...values:(string|false|undefined)[])=>values.filter(Boolean).join(' ');
export type Tone='azure'|'teal'|'violet';
