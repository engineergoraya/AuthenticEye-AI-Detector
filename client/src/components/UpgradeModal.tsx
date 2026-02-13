import React from 'react';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl glow-effect">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                        <span className="material-icons-round text-2xl">diamond</span>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <span className="material-icons-round">close</span>
                    </button>
                </div>

                <h2 className="text-2xl font-display font-bold text-white mb-2">Upgrade to Pro</h2>
                <p className="text-slate-400 text-sm mb-6">
                    Unlock unlimited scans, deep forensic analysis, and advanced insights.
                </p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="material-icons-round text-primary text-base">check_circle</span>
                        Unlimited Scans
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="material-icons-round text-primary text-base">check_circle</span>
                        Deep Scan Engine
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="material-icons-round text-primary text-base">check_circle</span>
                        Priority Support
                    </div>
                </div>

                <button
                    onClick={() => {
                        onUpgrade();
                        onClose();
                    }}
                    className="w-full py-3 bg-primary text-background-dark font-bold rounded-xl glow-effect hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Subscribe for $9/mo
                </button>
            </div>
        </div>
    );
};

export default UpgradeModal;
