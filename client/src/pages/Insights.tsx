import React from 'react';
import BottomNav from '../components/BottomNav';

const Insights: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans pb-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[30%] bg-purple-600/10 blur-[100px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-primary/10 blur-[100px] -z-10 pointer-events-none"></div>

            <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-b border-white/10">
                <h1 className="font-display text-xl font-bold tracking-tight">Analytics & Insights</h1>
            </header>

            <main className="p-6 space-y-6 max-w-lg mx-auto">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-icons-round text-4xl text-primary">radar</span>
                        </div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Scans Performed</p>
                        <h3 className="text-3xl font-display font-bold text-white">1,248</h3>
                        <p className="text-success text-xs font-mono mt-2 flex items-center gap-1">
                            <span className="material-icons-round text-sm">trending_up</span> +12% this week
                        </p>
                    </div>

                    <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-icons-round text-4xl text-red-500">security</span>
                        </div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Threats Blocked</p>
                        <h3 className="text-3xl font-display font-bold text-white">83</h3>
                        <p className="text-red-400 text-xs font-mono mt-2 flex items-center gap-1">
                            <span className="material-icons-round text-sm">warning</span> 2 critical
                        </p>
                    </div>

                    <div className="col-span-2 glass-panel p-4 rounded-xl relative overflow-hidden bg-gradient-to-br from-emerald-900/20 to-transparent border-t border-emerald-500/20">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest mb-1">Money Saved</p>
                                <h3 className="text-4xl font-display font-bold text-emerald-500">$450.00</h3>
                            </div>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                                <span className="material-icons-round text-2xl">savings</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-xs mt-2">Estimated processing costs saved via AI detection.</p>
                    </div>
                </div>

                {/* Visual Graph - Monthly Activity */}
                <section className="glass-panel p-5 rounded-xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                        <span className="material-icons-round text-primary text-base">bar_chart</span> Monthly Activity
                    </h3>

                    <div className="flex items-end justify-between h-32 gap-2">
                        {[35, 55, 40, 70, 45, 90, 60].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                <div className="w-full relative h-full flex items-end">
                                    <div
                                        className={`w-full bg-slate-700/50 rounded-t-sm transition-all duration-500 group-hover:bg-primary/80 ${i === 5 ? 'bg-primary shadow-[0_0_15px_rgba(0,229,255,0.3)]' : ''}`}
                                        style={{ height: `${height}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono group-hover:text-white">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Threat Alert Feed */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                        <span className="material-icons-round text-red-500 text-base">public</span> Recent Global Attacks
                    </h3>

                    <div className="space-y-2">
                        {[
                            { title: 'New Crypto Scam detected in UK', time: '2h ago', severity: 'High', type: 'Phishing' },
                            { title: 'Deepfake CEO Voice Fraud spreading', time: '5h ago', severity: 'Critical', type: 'Audio' },
                            { title: 'Fake Banking App on App Store', time: '1d ago', severity: 'Medium', type: 'Malware' },
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-3 rounded-lg flex items-center gap-3 border-l-2 border-l-red-500 hover:bg-white/5 transition-colors">
                                <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                                    <span className="material-icons-round">
                                        {item.type === 'Audio' ? 'graphic_eq' : item.type === 'Phishing' ? 'link_off' : 'bug_report'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] text-slate-500 font-mono">{item.time}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold uppercase tracking-wider">{item.type}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
};

export default Insights;
