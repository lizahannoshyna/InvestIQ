import React from "react";

export const AuthFooter: React.FC = () => {
    return (
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 border-t border-slate-800/40 pt-4 z-10 max-w-7xl mx-auto animate__animated animate__fadeInUp">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cdf27e]" />
                    SOC2 Certified
                </span>
                <span>|</span>
                <span>API Status: <strong className="text-slate-300 font-normal">99.99%</strong></span>
                <span>|</span>
                <span>SSL Secured</span>
            </div>
            <div>
                Network Latency: <span className="text-slate-300 font-mono">14ms</span> • Version 4.12.0-prod • InvestIQ FinTech Ltd. © 2026
            </div>
        </footer>
    );
};