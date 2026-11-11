import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {themeVariables,type ThemeOverrides,cx} from './tokens';
const MotionContext=createContext({paused:false,reduced:false,toggle:()=>{}});
export function ThemeProvider({children,overrides={},className}:{children:ReactNode;overrides?:ThemeOverrides;className?:string}){const[paused,setPaused]=useState(false);const[reduced,setReduced]=useState(false);useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);return <MotionContext.Provider value={{paused,reduced,toggle:()=>setPaused(p=>!p)}}><div className={cx('pa-theme',className)} style={themeVariables(overrides)} data-motion={paused||reduced?'paused':'running'}>{children}</div></MotionContext.Provider>}
export const useMotion=()=>useContext(MotionContext);
