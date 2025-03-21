
import React from "react";

const MagicButton = ({
    icon,
    position,
    handleClick,
    otherClasses,
}: {
    title: string;
    icon: React.ReactNode;
    position: string;
    handleClick?: () => void;
    otherClasses?: string;
}) => {
    return (
        <button className="relative inline-flex h-12 md:h-16 w-full md:w-60 nd:mt-10 overflow-hidden rounded-xl p-[1px] focus:outline-none" onClick={handleClick}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#e7bd40_100%)]"/>
            <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-900/90 text-base md:text-xl font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
            >
                {position === "left" && icon}
                Celebrer
                {position === "right" && icon}

            </span>
        </button>
    );
};

export default MagicButton;