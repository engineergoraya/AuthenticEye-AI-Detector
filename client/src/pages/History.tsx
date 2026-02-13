import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface ScanResult {
    id: string;
    url: string;
    score: number;
    timestamp: any;
    thumbnail: string;
    title?: string;
}

const History: React.FC = () => {
    const [scans, setScans] = useState<ScanResult[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!auth.currentUser) return;

            try {
                const q = query(
                    collection(db, 'scans'),
                    where('userId', '==', auth.currentUser.uid),
                    orderBy('timestamp', 'desc'),
                    limit(20) // Limit to last 20 scans for speed
                );

                const querySnapshot = await getDocs(q);
                const historyData: ScanResult[] = [];
                querySnapshot.forEach((doc) => {
                    historyData.push({ id: doc.id, ...doc.data() } as ScanResult);
                });

                setScans(historyData);
            } catch (error) {
                console.error("Error fetching history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const getStatusParams = (score: number) => {
        if (score > 80) return { text: "Authentic", color: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500/20" };
        if (score < 50) return { text: "AI Generated", color: "text-red-500", bg: "bg-red-500", border: "border-red-500/20" };
        return { text: "Partial AI", color: "text-amber-500", bg: "bg-amber-500", border: "border-amber-500/20" };
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans pb-24 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[30%] bg-primary/10 blur-[100px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] -z-10 pointer-events-none"></div>

            <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-effect">
                        <span className="material-icons-round text-background-dark text-xl">visibility</span>
                    </div>
                    <h1 className="font-display text-xl font-bold tracking-tight">AuthenticEye</h1>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary/30 p-0.5 overflow-hidden">
                    <div className="w-full h-full bg-slate-700 rounded-full"></div>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-lg mx-auto">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
                        <input className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Search history..." type="text" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-lg font-bold font-display">Recent Verifications</h2>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">{scans.length} Total</span>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 opacity-50 flex items-center justify-center gap-2">
                            <span className="material-icons-round animate-spin">refresh</span> Loading recent scans...
                        </div>
                    ) : scans.length === 0 ? (
                        <div className="text-center py-10 opacity-50">No scans found. Start verifying!</div>
                    ) : (
                        scans.map((scan) => {
                            const params = getStatusParams(scan.score);
                            return (
                                <div
                                    key={scan.id}
                                    onClick={() => navigate('/results', { state: { scanData: { ...scan, screenshot: scan.thumbnail }, url: scan.url } })}
                                    className="glass-panel rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] mb-4 cursor-pointer hover:shadow-lg hover:shadow-primary/10"
                                >
                                    <div className="p-4 flex gap-4">
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                                            <img alt="Scan thumbnail" className="w-full h-full object-cover opacity-80" src={scan.thumbnail || 'https://via.placeholder.com/80'} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-sm truncate w-40">{scan.title || scan.url}</h3>
                                                    <span className="material-icons-round text-slate-500 text-lg">chevron_right</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                                    <span>{scan.timestamp?.toDate().toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${params.color} bg-opacity-10 ${params.bg} border ${params.border}`}>
                                                    {params.text}
                                                </span>
                                                <span className={`text-sm font-bold ${params.color}`}>{scan.score}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-1 bg-slate-800 w-full overflow-hidden">
                                        <div className={`h-full ${params.bg}`} style={{ width: `${scan.score}%` }}></div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default History;
