import { useContext, useEffect, useRef, useState } from "react";

import { COLOR_COMPARE, COLOR_SORTED, COLOR_SWAP, COLOR_UNSORTED } from "~/constants";
import { MainContext } from "~/contextProvider/MainContextProvider";
import BubbleSort from "./SortAlgos/BubbleSort";
import InsertionSort from "./SortAlgos/InsertionSort";
import SelectionSort from "./SortAlgos/selectionSort";
import { useLocation } from "react-router";
import { initGA, trackPageView } from "~/helpers/analytics";

const AlgoComponents = {
  Bubble: BubbleSort,
  Insertion: InsertionSort,
  Selection: SelectionSort
}
type AlgorithemsType = keyof typeof AlgoComponents

export function Main() {

  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  const { sortCompleted, setSortCompleted, isMuted, setIsMuted, } = useContext(MainContext)

  const inputRef = useRef<HTMLInputElement>(null as never as HTMLInputElement)

  const [isAsc, setIsAsc] = useState(true);
  const [initValues, setInitValues] = useState([45, 5, 6, 65, 52, 82, 12, 2, 100, 24])

  const [algo, setAlgo] = useState<AlgorithemsType>("Bubble");

  const addElement = () => {
    const val = inputRef.current.value
    if (val === "" || isNaN(Number(val))) return;
    setInitValues(p => [...p, Number(val)])
    inputRef.current.value = ""
    inputRef.current.focus()
  }

  const AlgoComponent = AlgoComponents[algo]


  return (
    <div onContextMenu={e => e.preventDefault()} className="app bg-[#242B2E] overflow-auto w-full h-screen ">
      {sortCompleted && <div className="onCompletion z-10 fixed left-0 top-0 w-full h-full bg-[#0000004D] flex items-center justify-center ">
        <div className="message rounded-[50px] bg-[#6A1B4D] py-8 px-12 flex flex-col text-center justify-center items-center [&>*]:mb-4 ">
          <h1 className="select-none font-bold text-4xl text-white ">Hurry ! Array has sorted successfully</h1>
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.781 71.0937C111.719 91.4062 96.4032 110.532 74.9126 114.806C64.4312 116.894 53.5585 115.621 43.8426 111.169C34.1266 106.718 26.0628 99.3146 20.7992 90.0135C15.5356 80.7125 13.3406 69.9878 14.5268 59.3667C15.713 48.7456 20.2199 38.7695 27.4057 30.8587C42.1444 14.625 67.0313 10.1562 87.3438 18.2812" stroke="#66AD47" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M46.7188 62.9688L67.0312 83.2812L115.781 30.4688" stroke="#66AD47" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div onClick={() => setTimeout(() => setSortCompleted(false), 200)} className="btn bg-[#FF6666] text-white text-[1.5rem] px-5 py-2 cursor-pointer select-none  transition-all font-bold rounded-xl active:scale-125 ">Done</div>
        </div>
      </div>}
      <div className="head min-h-[5rem] flex flex-row justify-center md:justify-end py-4 px-4 items-center ">
        <div className="right text-white grid grid-cols-4 md:flex gap-5">
          <div tabIndex={0} className="dropDown cursor-pointer col-span-2 relative [&:focus>.dropList]:visible flex flex-row justify-center items-center bg-[#6A1B4D] rounded py-1 px-2 ">
            <span className="w-24">{algo}</span>
            <svg width="1.5rem" height="1.5rem" viewBox="0 0 40 40" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.8281 11.7188H7.17189C6.40235 11.7188 5.97267 12.5313 6.44923 13.0859L19.2774 27.9609C19.6445 28.3867 20.3516 28.3867 20.7227 27.9609L33.5508 13.0859C34.0274 12.5313 33.5977 11.7188 32.8281 11.7188Z" fill="white" />
            </svg>
            <div className="dropList invisible mt-2.5 z-10 absolute top-[2.2rem] left-0 w-full  flex flex-col justify-center items-center bg-[#6A1B4D] rounded-b-md">
              {(Object.keys(AlgoComponents) as AlgorithemsType[]).map((key, i) => <div key={i} onClick={() => setAlgo(key)} className="w-full hover:bg-[#872463] text-center hover:opacity-100 opacity-85 item p-2 hover:scale-105 transition-transform  duration-300 ease-in-out">{key}</div>)}
            </div>
          </div>
          <div className="grid grid-flow-col col-span-2 gap-2">
            <label className="cursor-pointer p-1 rounded-lg shadow-2xl " htmlFor="ascOrder" style={isAsc ? { background: "#5A20CB" } : {}} >
              <input type="radio" hidden onChange={() => setIsAsc(true)} name="order" defaultChecked id="ascOrder" />
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33325 31.25L14.5833 37.5M14.5833 37.5L20.8333 31.25M14.5833 37.5V12.5M35.4166 6.25C36.5216 6.25 37.5815 6.68899 38.3629 7.47039C39.1443 8.25179 39.5832 9.3116 39.5832 10.4167V16.6667C39.5832 17.7717 39.1443 18.8315 38.3629 19.6129C37.5815 20.3943 36.5216 20.8333 35.4166 20.8333C34.3115 20.8333 33.2517 20.3943 32.4703 19.6129C31.6889 18.8315 31.2499 17.7717 31.2499 16.6667V10.4167C31.2499 9.3116 31.6889 8.25179 32.4703 7.47039C33.2517 6.68899 34.3115 6.25 35.4166 6.25ZM31.2499 33.3333C31.2499 34.4384 31.6889 35.4982 32.4703 36.2796C33.2517 37.061 34.3115 37.5 35.4166 37.5C36.5216 37.5 37.5815 37.061 38.3629 36.2796C39.1443 35.4982 39.5832 34.4384 39.5832 33.3333C39.5832 32.2283 39.1443 31.1685 38.3629 30.3871C37.5815 29.6057 36.5216 29.1667 35.4166 29.1667C34.3115 29.1667 33.2517 29.6057 32.4703 30.3871C31.6889 31.1685 31.2499 32.2283 31.2499 33.3333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M39.5832 33.3333V39.5833C39.5832 40.6884 39.1442 41.7482 38.3628 42.5296C37.5814 43.311 36.5216 43.75 35.4165 43.75H32.2915" stroke="white" strokeOpacity="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
            <label className="cursor-pointer p-1 rounded-lg shadow-2xl " htmlFor="descOrder" style={isAsc ? {} : { background: "#5A20CB" }}>
              <input type="radio" hidden onChange={() => setIsAsc(false)} name="order" id="descOrder" />
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.1438 19.6129L14.5834 11.8925M14.5834 11.8925L21.3548 19.6129M14.5834 11.8925V37.5M35.4167 6.25C36.5218 6.25 37.5816 6.68899 38.363 7.47039C39.1444 8.25179 39.5834 9.3116 39.5834 10.4167V16.6667C39.5834 17.7717 39.1444 18.8315 38.363 19.6129C37.5816 20.3943 36.5218 20.8333 35.4167 20.8333C34.3116 20.8333 33.2518 20.3943 32.4704 19.6129C31.689 18.8315 31.2501 17.7717 31.2501 16.6667V10.4167C31.2501 9.3116 31.689 8.25179 32.4704 7.47039C33.2518 6.68899 34.3116 6.25 35.4167 6.25ZM31.2501 33.3333C31.2501 34.4384 31.689 35.4982 32.4704 36.2796C33.2518 37.061 34.3116 37.5 35.4167 37.5C36.5218 37.5 37.5816 37.061 38.363 36.2796C39.1444 35.4982 39.5834 34.4384 39.5834 33.3333C39.5834 32.2283 39.1444 31.1685 38.363 30.3871C37.5816 29.6057 36.5218 29.1667 35.4167 29.1667C34.3116 29.1667 33.2518 29.6057 32.4704 30.3871C31.689 31.1685 31.2501 32.2283 31.2501 33.3333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M39.5834 33.3333V39.5833C39.5834 40.6884 39.1444 41.7482 38.363 42.5296C37.5816 43.311 36.5218 43.75 35.4167 43.75H32.2917" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          </div>
          <div className="colorAbbr gap-1 grid md:col-span-1  col-span-3 grid-flow-row grid-cols-2">
            <div className="wrap grid justify-start w-32 grid-flow-col  text-white text-sm ">
              <div className="colorInfo w-5 h-5 shadow-sm " style={{ backgroundColor: COLOR_COMPARE }} ></div><div className="pl-2">To Compare</div>
            </div>
            <div className="wrap grid justify-start w-32 grid-flow-col  text-white text-sm ">
              <div className="colorInfo w-5 h-5 shadow-sm " style={{ backgroundColor: COLOR_SWAP }} ></div><div className="pl-2">Swap/Move</div>
            </div>
            <div className="wrap grid justify-start w-32 grid-flow-col  text-white text-sm ">
              <div className="colorInfo w-5 h-5 shadow-sm " style={{ backgroundColor: COLOR_UNSORTED }} ></div><div className="pl-2">Unsorted</div>
            </div>
            <div className="wrap grid justify-start w-32 grid-flow-col  text-white text-sm ">
              <div className="colorInfo w-5 h-5 shadow-sm " style={{ backgroundColor: COLOR_SORTED }} ></div><div className="pl-2">Sorted</div>
            </div>
          </div>
          <div onClick={() => setIsMuted(p => !p)} className="mute col-span-1 cursor-pointer">
            {isMuted ? <svg width="50" height="50" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.0625 27.3125L67.6875 48.6875M8.3125 27.3125V48.6875H20.1875L39.1875 62.9375V13.0625L20.1875 27.3125H8.3125ZM67.6875 27.3125L51.0625 48.6875L67.6875 27.3125Z" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg> : <svg width="50" height="50" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M54.3438 15.0312C63.5938 19.6562 68.2188 26.5938 68.2188 37C68.2188 47.4062 63.5938 54.3438 54.3438 58.9688M8.09375 26.5938V47.4062H19.6562L38.1562 61.2812V12.7188L19.6562 26.5938H8.09375ZM49.7188 28.9062C49.7188 28.9062 54.3438 31.2188 54.3438 37C54.3438 42.7812 49.7188 45.0938 49.7188 45.0938V28.9062Z" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
          </div>
        </div>
      </div >
      <div className="body  h-[calc(100%_-_5rem)]  grid grid-flow-row md:grid-flow-col">
        <div className="values h-full p-2 px-10 text-white">
          <div className="left md:absolute md:left-10 md:top-5"><h1 className="text-[2rem] bold text-white select-none" >Values</h1> </div>
          <div className="content h-[75vh] overflow-auto">
            {initValues.map((value, index) => <div key={index} className="relative hover:[&_div]:opacity-100"> <div style={{ width: `${value}%` }} className="value px-2 py-1 bg-[#E03B8B] rounded-r text-[1.5rem]  my-3 ">{value}
              <div className="absolute opacity-10 md:opacity-0 right-2 top-1.5 active:scale-105 transition-all cursor-pointer "
                onClick={() => setInitValues(p => p.filter((v, i) => i !== index))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m10.25 5.75l-4.5 4.5m0-4.5l4.5 4.5" /><circle cx="8" cy="8" r="6.25" /></g></svg>
              </div>
            </div></div>)}
          </div>
          <div className="footer mt-5 grid grid-flow-col justify-center gap-2">
            <input type="text" onKeyDown={e => e.key === "Enter" && addElement()} ref={inputRef} className=" rounded min-w-[2rem] max-w-[5rem] w-fit border border-solid border-white p-1  bg-[#6A1B4D]" />
            <svg onClick={addElement} className="active:scale-110 cursor-pointer transition-all" width="2rem" height="2rem" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M30 2.5C14.8125 2.5 2.5 14.8125 2.5 30C2.5 45.1875 14.8125 57.5 30 57.5C45.1875 57.5 57.5 45.1875 57.5 30C57.5 14.8125 45.1875 2.5 30 2.5ZM32.5 40C32.5 40.663 32.2366 41.2989 31.7678 41.7678C31.2989 42.2366 30.663 42.5 30 42.5C29.337 42.5 28.7011 42.2366 28.2322 41.7678C27.7634 41.2989 27.5 40.663 27.5 40V32.5H20C19.337 32.5 18.7011 32.2366 18.2322 31.7678C17.7634 31.2989 17.5 30.663 17.5 30C17.5 29.337 17.7634 28.7011 18.2322 28.2322C18.7011 27.7634 19.337 27.5 20 27.5H27.5V20C27.5 19.337 27.7634 18.7011 28.2322 18.2322C28.7011 17.7634 29.337 17.5 30 17.5C30.663 17.5 31.2989 17.7634 31.7678 18.2322C32.2366 18.7011 32.5 19.337 32.5 20V27.5H40C40.663 27.5 41.2989 27.7634 41.7678 28.2322C42.2366 28.7011 42.5 29.337 42.5 30C42.5 30.663 42.2366 31.2989 41.7678 31.7678C41.2989 32.2366 40.663 32.5 40 32.5H32.5V40Z" fill="white" />
            </svg>
          </div>
        </div>
        <AlgoComponent initValues={initValues} isAsc={isAsc} />
        <div className="h-24 md:h-0 md:hidden"></div>
      </div>
    </div >
  );
}
