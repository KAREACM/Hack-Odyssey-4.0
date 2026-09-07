import { MdArrowOutward } from "react-icons/md";
import AnimateBtn from "./AnimateBtn";

const ReserveBtn = () => {
    return (
        <div className="relative z-49">
            <a 
                href="https://euphoria.kalasalingam.ac.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute right-4 md:right-6 top-4 md:top-[2vw] w-fit bg-[#f4efe7] px-3.5 py-1.5 flex justify-end items-center rounded-4xl gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
                <AnimateBtn btnName="Register Now"/>
                <MdArrowOutward className="bg-[#2a2725] text-[#f4efe7] w-5 h-5 md:w-6 md:h-6 rounded-full p-1 shrink-0" />
            </a>
        </div>
    )
}

export default ReserveBtn;