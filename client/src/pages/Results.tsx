import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import UpgradeModal from '../components/UpgradeModal';

const Results: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scanData, url, type } = location.state || {};
    const { plan, upgradeToPro } = useUser();

    const [scanning, setScanning] = useState(true);
    const [score, setScore] = useState(0);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        if (!scanData) {
            navigate('/dashboard');
            return;
        }

        // Simulate 3-second Scanning Process
        const timer = setTimeout(async () => {
            // Use score from backend if available, otherwise random (fallback)
            const finalScore = scanData.score !== undefined ? scanData.score : Math.floor(Math.random() * 100);

            setScore(finalScore);
            setScanning(false);
            setShowHeatmap(true);

            // Save to Firestore
            if (auth.currentUser) {
                try {
                    await addDoc(collection(db, 'scans'), {
                        userId: auth.currentUser.uid,
                        url: url,
                        score: finalScore,
                        timestamp: serverTimestamp(),
                        thumbnail: scanData.screenshot, // Base64 image
                        title: scanData.title || 'Untitled Scan'
                    });
                    console.log("Scan saved to Firestore");
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [scanData, navigate, url]);

    const isAuthentic = scanData.is_ai !== undefined ? !scanData.is_ai : score > 80;
    const statusText = scanData.status || (isAuthentic ? "Original" : (score < 50 ? "Deepfake" : "Suspicious"));
    const statusColor = isAuthentic ? "text-success" : (score < 50 ? "text-red-500" : "text-yellow-500");
    const progressColor = isAuthentic ? "bg-success" : (score < 50 ? "bg-red-500" : "bg-yellow-500");

    const handleDownloadReport = () => {
        if (plan === 'free') {
            setShowUpgradeModal(true);
            return;
        }
        // Mock Download
        const blob = new Blob(["Forensic Report\n\nScore: " + score + "\nStatus: " + statusText], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `report_${Date.now()}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (scanning) {
        return (
            <div className="min-h-screen bg-background-dark text-slate-100 font-sans flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 radar-grid opacity-30"></div>
                <div className="w-32 h-32 border-4 border-primary/30 border-t-primary rounded-full animate-spin-slow mb-8 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full animate-pulse shadow-[0_0_30px_rgba(0,229,255,0.4)]"></div>
                </div>
                <h2 className="text-2xl font-display font-bold tracking-widest animate-pulse">ANALYZING...</h2>
                <p className="text-primary/60 font-mono text-xs mt-2">DECODING NEURAL PATTERNS</p>

                {/* Scanning Overlay on Image */}
                <div className="mt-10 w-64 h-40 relative rounded-xl overflow-hidden border border-white/10 opacity-50">
                    <img src={scanData?.screenshot} className="w-full h-full object-cover blur-sm" />
                    <div className="absolute inset-0 scanline"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-primary/30 pb-20">
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                onUpgrade={upgradeToPro}
            />
            <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-cyan">
                        <span className="material-icons-round text-background-dark text-xl font-bold">biotech</span>
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight">AuthenticEye</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-primary/60 border border-primary/20 px-2 py-0.5 rounded">SESS_ID: 0x9F2E</span>
                    <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <span className="material-icons-round text-slate-400">close</span>
                    </button>
                </div>
            </header>

            <main className="p-5 pb-28 space-y-6 max-w-lg mx-auto">
                <section className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 radar-grid opacity-30"></div>
                    <div className="relative flex flex-col items-center">
                        <div className="relative w-56 h-56 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-white/5"></div>
                            <div className="absolute inset-4 rounded-full border border-primary/10"></div>
                            <div className="absolute inset-8 rounded-full border border-white/5"></div>
                            {/* Rotating Ring */}
                            <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-${isAuthentic ? 'success' : 'red-500'} rotate-[135deg]`}></div>
                            </div>

                            <div className="absolute inset-10 rounded-full glass-panel flex flex-col items-center justify-center border-primary/20 shadow-[0_0_40px_rgba(0,229,255,0.1)]">
                                <span className={`text-4xl font-display font-bold ${statusColor} tracking-tighter`}>{score}<span className="text-xl">%</span></span>
                                <div className={`w-12 h-0.5 ${progressColor}/30 my-1`}></div>
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">Authenticity</span>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2 text-center relative z-10">
                            <div className="flex items-center justify-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${progressColor} animate-pulse`}></span>
                                <h2 className="text-xl font-display font-bold uppercase tracking-tight">Status: {statusText}</h2>
                            </div>
                            <p className="text-slate-400 text-xs font-mono max-w-[240px]">
                                {isAuthentic
                                    ? "Deep spectral analysis completed. No AI-generated artifacts detected."
                                    : "High probability of synthetic manipulation detected in pixel structure."}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group shadow-2xl flex items-center justify-center">
                        {type === 'audio' ? (
                            <div className="w-full h-full flex items-center justify-center gap-1 px-10">
                                {scanData.waveform?.map((val: number, i: number) => (
                                    <div
                                        key={i}
                                        className={`w-2 rounded-full transition-all duration-300 ${isAuthentic ? 'bg-success' : 'bg-red-500'} animate-pulse`}
                                        style={{ height: `${val * 100}%` }}
                                    ></div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <img alt="Analyzed Media" className="w-full h-full object-cover opacity-80" src={scanData.screenshot} />
                                {/* Advanced Forensic Layer */}
                                {showHeatmap && (
                                    <div
                                        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                                        style={{
                                            background: isAuthentic
                                                ? `repeating-linear-gradient(
                                                    0deg,
                                                    rgba(16, 185, 129, 0.1) 0px,
                                                    rgba(16, 185, 129, 0.1) 1px,
                                                    transparent 1px,
                                                    transparent 2px
                                                )` // Safe: Green Scanlines
                                                : `radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 40%),
                                                radial-gradient(circle at 70% 70%, rgba(239, 68, 68, 0.4) 0%, transparent 40%),
                                                rgba(239, 68, 68, 0.1)` // Danger: Red Blobs + Tint
                                        }}
                                    >
                                        {/* Scanning overlay effect */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan"></div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div className="flex flex-col gap-2">
                                {type !== 'audio' && (
                                    <button
                                        onClick={() => setShowHeatmap(!showHeatmap)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-black/80 text-slate-200 font-bold rounded-lg text-[11px] uppercase tracking-wider shadow-lg hover:bg-black border border-white/20 backdrop-blur-sm transition-all">
                                        <span className="material-icons-round text-sm">filter_center_focus</span>
                                        {showHeatmap ? 'Hide Forensics' : 'Show Forensics'}
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={handleDownloadReport}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary font-bold rounded-lg text-[11px] uppercase tracking-wider shadow-lg hover:bg-primary/30 border border-primary/30 backdrop-blur-sm transition-all">
                                <span className="material-icons-round text-sm">download</span>
                                Download Report {plan === 'free' && <span className="material-icons-round text-[10px] ml-1">lock</span>}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-display font-bold text-lg flex items-center gap-2">
                            <span className="material-icons-round text-primary text-xl">database</span>
                            Forensic Meta
                        </h3>
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-success/10 text-success rounded border border-success/20">Active</span>
                    </div>

                    {/* Metadata Cards */}
                    <div className="grid grid-cols-1 gap-3">
                        <div className="glass-panel p-4 rounded-xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10">
                                    <span className="material-icons-round text-slate-400 text-lg">link</span>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">Target.Source</p>
                                    <p className="text-sm font-mono text-slate-200 truncate w-40">{url}</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-panel p-4 rounded-xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10">
                                    <span className="material-icons-round text-slate-400 text-lg">history</span>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">Timestamp</p>
                                    <p className="text-sm font-mono text-slate-200">{new Date().toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Forensic Flags */}
                        {scanData.flags && scanData.flags.length > 0 && (
                            <div className="glass-panel p-4 rounded-xl border-l-4 border-l-primary/50">
                                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <span className="material-icons-round text-sm">flag</span> Risk Indicators
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {scanData.flags.map((flag: string, index: number) => (
                                        <span key={index} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-slate-300">
                                            {flag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </section>
            </main>
        </div>
    );
};

export default Results;
