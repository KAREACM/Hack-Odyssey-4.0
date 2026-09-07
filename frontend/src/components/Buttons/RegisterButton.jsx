import React from "react";
import { MdArrowOutward } from "react-icons/md";

const RegisterButton = ({
  id,
  buttonRef,
  className = "",
  style = {},
  onClick,
  href = "https://euphoria.kalasalingam.ac.in/",
  target = "_blank",
  rel = "noopener noreferrer",
  label = "REGISTER NOW",
  size = "default",
}) => {
  const isNavbar = size === "navbar";

  const containerClasses = isNavbar
    ? `inline-flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2 md:gap-2.5 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full bg-[#f4efe7] hover:bg-white text-[#181717] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(244,239,231,0.25)] hover:shadow-[0_0_35px_rgba(244,239,231,0.55)] transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer select-none whitespace-nowrap ${className}`
    : `inline-flex items-center justify-between sm:justify-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#f4efe7] hover:bg-white text-[#181717] font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(244,239,231,0.3)] hover:shadow-[0_0_35px_rgba(244,239,231,0.55)] transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer select-none ${className}`;

  const textClasses = isNavbar
    ? "font-semibold tracking-wider text-[10px] sm:text-[11px] md:text-xs text-[#181717] whitespace-nowrap"
    : "font-semibold tracking-wider text-[11px] sm:text-xs text-[#181717]";

  const iconCircleClasses = isNavbar
    ? "w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 rounded-full bg-[#181717] text-[#f4efe7] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shrink-0 shadow-sm"
    : "w-5 h-5 rounded-full bg-[#181717] text-[#f4efe7] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shrink-0 shadow-sm";

  const iconClasses = isNavbar
    ? "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
    : "w-3 h-3 sm:w-3.5 sm:h-3.5";

  return (
    <a
      id={id}
      ref={buttonRef}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      style={style}
      className={containerClasses}
    >
      <span className={textClasses}>
        {label}
      </span>
      <div className={iconCircleClasses}>
        <MdArrowOutward className={iconClasses} />
      </div>
    </a>
  );
};

export default RegisterButton;
