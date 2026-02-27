import React from 'react';
import { ArrowRight, Zap, Activity, Brain, Leaf } from 'lucide-react';

const Hero = ({ onStart }) => {
    return (
        <div className="relative min-h-screen flex flex-col w-full bg-background-light">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-navy-deep/5 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-navy-deep rounded-xl flex items-center justify-center">
                            <Zap size={18} className="text-white" fill="white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-navy-deep">FitPremium</span>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <button onClick={onStart} className="text-sm font-semibold text-navy-deep/70 hover:text-navy-deep transition-colors cursor-pointer bg-transparent border-none">Workouts</button>
                        <button onClick={onStart} className="text-sm font-semibold text-navy-deep/70 hover:text-navy-deep transition-colors cursor-pointer bg-transparent border-none">Nutrition</button>
                        <button onClick={onStart} className="text-sm font-semibold text-navy-deep/70 hover:text-navy-deep transition-colors cursor-pointer bg-transparent border-none">Performance</button>
                    </div>
                    <button
                        onClick={onStart}
                        className="px-7 py-2.5 bg-navy-deep text-white text-sm font-bold rounded-full hover:bg-crimson-athletic transition-all duration-200 shadow-sm">
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Content */}
            <main className="flex-grow pt-20">
                <section className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] items-center gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-6 flex flex-col gap-10 py-20 lg:py-0">
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 bg-navy-deep/5 text-navy-deep text-[11px] font-black tracking-[0.2em] uppercase rounded-full border border-navy-deep/10">
                                AI-Powered Athletic Excellence
                            </span>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-navy-deep">
                                Elevate Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-deep to-crimson-athletic">Human Potential</span>
                            </h1>
                            <p className="text-xl text-navy-deep/60 max-w-lg leading-relaxed font-medium">
                                A premium ecosystem for elite performance. Precision-engineered workout protocols and molecular nutrition tailored to your biology.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button
                                onClick={onStart}
                                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-navy-deep to-crimson-athletic text-white text-lg font-bold rounded-2xl shadow-2xl shadow-navy-deep/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                Generate Workout &amp; Diet
                                <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={onStart}
                                className="w-full sm:w-auto px-10 py-5 border-2 border-navy-deep/20 hover:border-navy-deep hover:bg-white text-navy-deep text-lg font-bold rounded-2xl transition-all">
                                View Sample Plan
                            </button>
                        </div>

                        {/* Social Proof Strip */}
                        <div className="flex items-center gap-6 pt-2">
                            <div className="flex -space-x-3">
                                {['bg-slate-300', 'bg-slate-400', 'bg-slate-500'].map((c, i) => (
                                    <div key={i} className={`w-11 h-11 rounded-full border-4 border-background-light ${c}`} />
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-black text-navy-deep">9,800+ Athletes</p>
                                <p className="text-navy-deep/50 font-medium">Optimizing their physiology with FitPremium</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column – Visual Card */}
                    <div className="lg:col-span-6 relative h-[600px] hidden lg:flex items-center justify-center">
                        <div className="absolute inset-0 rounded-[3.5rem] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop')" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
                        </div>
                        {/* Floating BPM Card */}
                        <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-2xl p-6 rounded-3xl border border-white/60 shadow-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-crimson-athletic flex items-center justify-center shadow-lg shadow-crimson-athletic/30">
                                    <Activity size={24} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-navy-deep/50 text-[10px] uppercase tracking-[0.2em] font-black">Peak Performance</p>
                                    <p className="text-navy-deep text-3xl font-black">168 <span className="text-sm opacity-40">BPM</span></p>
                                </div>
                            </div>
                            <div className="h-14 w-28">
                                <svg className="w-full h-full text-crimson-athletic" viewBox="0 0 100 40">
                                    <path d="M0 35 L 10 32 L 20 38 L 30 10 L 40 30 L 50 5 L 60 35 L 70 20 L 80 35 L 90 15 L 100 30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature grid below hero */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { icon: <Brain size={28} className="text-navy-deep" />, title: 'Biometric Logic', desc: 'Proprietary algorithms analyze your metabolic markers to curate a dynamic nutrition and recovery protocol.' },
                            { icon: <Activity size={28} className="text-navy-deep" />, title: 'Neural Drive', desc: 'Training systems built to enhance motor unit recruitment and optimize central nervous system output.' },
                            { icon: <Leaf size={28} className="text-navy-deep" />, title: 'Systemic Fuel', desc: 'Beyond macros. We optimize your cellular health through precise micronutrient and hydration scheduling.' },
                        ].map((f, i) => (
                            <div key={i} className="flex flex-col gap-5">
                                <div className="w-14 h-14 bg-navy-deep/5 rounded-2xl flex items-center justify-center border border-navy-deep/10">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-navy-deep">{f.title}</h3>
                                <p className="text-navy-deep/60 leading-relaxed font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Hero;
