import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 glass-panel border-t border-white/10 px-6 py-4 flex items-center justify-around z-50 h-[88px] pb-8">
            <button
                onClick={() => navigate('/dashboard')}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <span className="material-icons-round">dashboard</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Scan</span>
            </button>

            <button
                onClick={() => navigate('/history')}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/history') ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <span className="material-icons-round">history</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">History</span>
            </button>

            <div className="relative -top-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-background-dark shadow-[0_0_20px_rgba(0,229,255,0.4)] glow-effect transform transition-transform active:scale-95 rotate-45 hover:rotate-90 hover:scale-105 duration-300"
                >
                    <span className="material-icons-round text-3xl -rotate-45">add</span>
                </button>
            </div>

            <button
                onClick={() => navigate('/insights')}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/insights') ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <span className="material-icons-round">bar_chart</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Insights</span>
            </button>

            <button
                onClick={() => navigate('/settings')}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/settings') ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <span className="material-icons-round">settings</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Settings</span>
            </button>
        </nav>
    );
};

export default BottomNav;
