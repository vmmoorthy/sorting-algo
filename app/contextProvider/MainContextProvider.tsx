import { createContext, useEffect, useRef, useState } from "react";
import click from '../assets/audio/click.wav'
import trans from '../assets/audio/transition.wav'
import mark from '../assets/audio/swapMark.mp3'

type ContextType = {
    sortCompleted: boolean
    setSortCompleted: React.Dispatch<React.SetStateAction<boolean>>
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>
    pause: () => void
    play: () => void
    onPlay: boolean
    isMuted: boolean
    audioClickRef: React.RefObject<HTMLAudioElement>
    audioTransRef: React.RefObject<HTMLAudioElement>
    audioMarkRef: React.RefObject<HTMLAudioElement>
    nextBtnRef: React.RefObject<HTMLDivElement>
}

export const MainContext = createContext<ContextType>({
    setSortCompleted: (() => { }) as React.Dispatch<React.SetStateAction<boolean>>,
    sortCompleted: false,
    onPlay: false,
    isMuted: false,
    setIsMuted: (() => { }) as React.Dispatch<React.SetStateAction<boolean>>,
    pause: () => { },
    play: () => { },
    audioTransRef: null as never as React.RefObject<HTMLAudioElement>,
    audioClickRef: null as never as React.RefObject<HTMLAudioElement>,
    audioMarkRef: null as never as React.RefObject<HTMLAudioElement>,
    nextBtnRef: null as never as React.RefObject<HTMLDivElement>,

})
const MainContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [sortCompleted, setSortCompleted] = useState(false);
    const playTimeRef = useRef<NodeJS.Timeout>(-1 as never as NodeJS.Timeout)
    const nextBtnRef = useRef<HTMLDivElement>(null as never as HTMLDivElement)
    const [onPlay, setOnPlay] = useState(false);

    const [isMuted, setIsMuted] = useState(false);

    const audioClickRef = useRef<HTMLAudioElement>(null as never as HTMLAudioElement)
    const audioTransRef = useRef<HTMLAudioElement>(null as never as HTMLAudioElement)
    const audioMarkRef = useRef<HTMLAudioElement>(null as never as HTMLAudioElement)

    const play = () => {
        const pl = setInterval(() => nextBtnRef.current.click(), 100)
        playTimeRef.current = pl
        setOnPlay(true)
    }
    const pause = () => {
        clearInterval(playTimeRef.current)
        playTimeRef.current = -1 as never as NodeJS.Timeout
        setOnPlay(false)
    }

    useEffect(() => {
        clearInterval(playTimeRef.current)
        playTimeRef.current = -1 as never as NodeJS.Timeout
        setOnPlay(false)
    }, [sortCompleted]);


    return (
        <MainContext.Provider value={{ sortCompleted, setSortCompleted, nextBtnRef, isMuted, setIsMuted, onPlay, play, pause, audioClickRef, audioTransRef, audioMarkRef }}>
            <audio muted={isMuted} src={click} hidden ref={audioClickRef} ></audio>
            <audio muted={isMuted} src={trans} hidden ref={audioTransRef} ></audio>
            <audio muted={isMuted} src={mark} hidden ref={audioMarkRef} ></audio>
            {children}
        </MainContext.Provider>
    );
}

export default MainContextProvider;