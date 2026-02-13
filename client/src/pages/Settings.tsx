import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { auth } from '../firebase';
import { useUser } from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
    const { plan, upgradeToPro } = useUser();
    const navigate = useNavigate();
    const [toggles, setToggles] = useState({
        darkMode: true,
        emailAlerts: true,
        realtimeProtection: false
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans pb-24 relative overflow-hidden">

            <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-b border-white/10">
                <h1 className="font-display text-xl font-bold tracking-tight">Settings</h1>
            </header>

            <main className="p-6 space-y-6 max-w-lg mx-auto">

                {/* Profile Section */}
                <section className="flex items-center gap-4 glass-panel p-4 rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-0.5">
                        <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Guest User</h2>
                        <p className="text-xs text-slate-400 font-mono">{auth.currentUser?.email || 'user@example.com'}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-slate-300">
                            ID: 8F29A...
                        </span>
                    </div>
                </section>

                {/* Subscription Card */}
                <section className="glass-panel p-6 rounded-2xl relative overflow-hidden border border-amber-500/20">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-icons-round text-6xl text-amber-500">workspace_premium</span>
                    </div>

                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Current Plan</p>
                    <h3 className={`text-2xl font-display font-bold ${plan === 'pro' ? 'text-amber-500' : 'text-white'}`}>
                        {plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
                    </h3>

                    <div className="mt-4 flex flex-col gap-3">
                        {plan === 'free' ? (
                            <>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className="material-icons-round text-sm text-slate-600">check_circle</span>
                                        <span>Basic URL Scanning</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className="material-icons-round text-sm text-slate-600">cancel</span>
                                        <span>Audio & Image Forensics</span>
                                    </div>
                                </div>
                                <button
                                    onClick={upgradeToPro}
                                    className="mt-2 w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-bold rounded-xl glow-effect hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                                >
                                    <span className="material-icons-round">upgrade</span> Upgrade to PRO
                                </button>
                            </>
                        ) : (
                            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-center">
                                <p className="text-amber-500 text-sm font-bold">You are a Pro Member</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Toggles */}
                <section className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/5">
                    {[
                        { key: 'darkMode', label: 'Dark Mode', icon: 'dark_mode' },
                        { key: 'emailAlerts', label: 'Email Alerts', icon: 'notifications_active' },
                        { key: 'realtimeProtection', label: 'Real-time Protection', icon: 'gpp_good' },
                    ].map((item) => (
                        <div key={item.key} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                                    <span className="material-icons-round text-lg">{item.icon}</span>
                                </div>
                                <span className="font-medium text-sm text-slate-200">{item.label}</span>
                            </div>
                            <button
                                onClick={() => handleToggle(item.key as any)}
                                className={`w-11 h-6 rounded-full relative transition-colors ${toggles[item.key as keyof typeof toggles] ? 'bg-primary' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md ${toggles[item.key as keyof typeof toggles] ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                    ))}
                </section>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 font-bold hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                >
                    <span className="material-icons-round">logout</span> Sign Out
                </button>

                <p className="text-center text-[10px] text-slate-600 font-mono pt-4">Version 1.0.4 (Build 2024)</p>

            </main>

            <BottomNav />
        </div>
    );
};

export default Settings;
