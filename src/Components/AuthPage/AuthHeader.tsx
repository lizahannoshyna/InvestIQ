import React from "react";

export const AuthHeader: React.FC = () => {
    return (
        <header className="animate__animated animate__fadeInDown animate__fast w-full flex items-center justify-between z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2.5 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#6f4bf2] flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-[#6f4bf2]/30 group-hover:scale-105 transition-transform">
                    IQ
                </div>
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#cdf27e] transition-colors">
                    InvestIQ
                </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs">
                <span className="hidden md:flex items-center gap-2 bg-[#18102b] border border-[#2c1d4d] px-3 py-1.5 rounded-full text-slate-300 shadow-inner">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cdf27e] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cdf27e]"></span>
                    </span>
                    <span className="text-[#cdf27e] font-mono font-medium">12 Gwei</span>
                    <span className="text-slate-500">|</span> Ethereum Mainnet
                </span>

                <a 
                    href="#" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group bg-[#18102b] sm:bg-transparent border sm:border-none border-[#2c1d4d] px-3 sm:px-0 py-1.5 sm:py-0 rounded-lg"
                >
                    <span>Help & Docs</span> 
                    <span className="text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
            </div>
        </header>
    );
};

export default AuthHeader;