import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert("Failed to sign in. Please check your configuration.");
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden mesh-bg">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="absolute top-12 left-0 right-0 flex justify-center">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg glow-effect">
                        <span className="material-icons-round text-slate-900 font-bold">visibility</span>
                    </div>
                    <span className="font-display text-2xl font-extrabold tracking-tight">Authentic<span className="text-primary">Eye</span></span>
                </div>
            </div>

            <main className="w-full max-w-sm z-10">
                <div className="glass-panel p-8 rounded-[2rem] shadow-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Verify the truth in every pixel.</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center space-x-3 bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200 py-3.5 px-4 rounded-2xl border border-slate-200 shadow-sm font-semibold text-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        <div className="flex items-center py-2">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                            <span className="px-3 text-xs text-slate-400 font-medium uppercase tracking-widest">or</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        </div>

                        <button className="w-full bg-primary hover:opacity-90 text-slate-900 transition-all duration-200 py-3.5 px-4 rounded-2xl font-bold text-sm shadow-lg glow-effect">
                            Continue with Email
                        </button>
                    </div>

                    <div className="pt-2 text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            New to AuthenticEye?
                            <a className="text-primary font-semibold hover:underline ml-1" href="#">Create an account</a>
                        </p>
                    </div>
                </div>
            </main>

            <footer className="absolute bottom-10 left-0 right-0 px-8 text-center">
                <div className="flex justify-center space-x-6 mb-6">
                    <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-round text-xl">help_outline</span></a>
                    <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-round text-xl">language</span></a>
                    <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-round text-xl">info</span></a>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-600 font-medium uppercase tracking-[0.2em]">
                    Secure Analysis Powered by AI 2.0
                </p>
            </footer>

            <button className="absolute top-6 right-6 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400" onClick={() => document.documentElement.classList.toggle('dark')}>
                <span className="material-icons-round block dark:hidden">dark_mode</span>
                <span className="material-icons-round hidden dark:block">light_mode</span>
            </button>
        </div>
    );
};

export default Login;
