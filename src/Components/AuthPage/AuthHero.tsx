import React from "react";

export const AuthHero: React.FC = () => {
    const title = "InvestIQ";

    return (
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div className="animate__animated animate__fadeInLeft animate__fast inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18102b] border border-[#2c1d4d] w-fit shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#cdf27e] animate-pulse" />
                <span className="text-[11px] font-bold tracking-wider text-[#cdf27e] uppercase">
                    SMART WEALTH INTELLIGENCE
                </span>
            </div>

            <div className="animate__animated animate__fadeInLeft">
                <h1 className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight leading-none cursor-default select-none">
                    {title.split("").map((letter, index) => (
                        <span
                            key={index}
                            className="inline-block transition-all duration-200 hover:scale-125 hover:-translate-y-2 hover:text-[#cdf27e] hover:drop-shadow-[0_0_10px_rgba(205,242,126,0.5)] origin-bottom"
                        >
                            {letter}
                        </span>
                    ))}
                </h1>
            </div>

            <div className="animate__animated animate__fadeInUp animate__delay-1s grid grid-cols-3 gap-6 pt-12 border-t border-slate-800/60 max-w-lg">
                <div className="group cursor-default transition-transform hover:-translate-y-1 duration-300">
                    <div className="text-xl font-bold text-white group-hover:text-[#cdf27e] transition-colors">
                        $4.2B+
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Protected TVL</div>
                </div>
                <div className="group cursor-default transition-transform hover:-translate-y-1 duration-300">
                    <div className="text-xl font-bold text-[#cdf27e] font-mono">
                        0.02ms
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Execution Speed</div>
                </div>
                <div className="group cursor-default transition-transform hover:-translate-y-1 duration-300">
                    <div className="text-xl font-bold text-[#cdf27e]">Audited</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                        CertiK & OpenZeppelin
                    </div>
                </div>
            </div>
        </div>
    );
};
