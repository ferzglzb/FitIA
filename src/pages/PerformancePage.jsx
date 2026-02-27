import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Activity, Scale, Heart, TrendingUp, Moon, Zap, ArrowRight, Calculator } from 'lucide-react';

const PerformancePage = () => {
    const [bmi, setBmi] = useState({ weight: 75, height: 180 });
    const bmiValue = (bmi.weight / ((bmi.height / 100) ** 2)).toFixed(1);

    const getBmiCategory = (v) => {
        if (v < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-50' };
        if (v < 25) return { label: 'Normal', color: 'text-emerald-600', bg: 'bg-emerald-50' };
        if (v < 30) return { label: 'Overweight', color: 'text-amber-600', bg: 'bg-amber-50' };
        return { label: 'Obese', color: 'text-crimson-athletic', bg: 'bg-crimson-athletic/10' };
    };
    const bmiCat = getBmiCategory(parseFloat(bmiValue));

    const recoveryTips = [
        { icon: <Moon size={22} className="text-indigo-500" />, title: 'Sleep 7-9 Hours', desc: 'Sleep is your #1 recovery tool. Growth hormone peaks during deep sleep phases.' },
        { icon: <Heart size={22} className="text-rose-500" />, title: 'Active Recovery', desc: 'Light walks, yoga, or swimming on rest days boosts blood flow and reduces DOMS.' },
        { icon: <Zap size={22} className="text-amber-500" />, title: 'Manage Stress', desc: 'High cortisol impairs muscle growth. Practice meditation, breathwork, or journaling.' },
        { icon: <Activity size={22} className="text-emerald-500" />, title: 'Track Your Heart Rate', desc: 'Monitor resting heart rate to detect overtraining. A rise of 5+ BPM signals fatigue.' },
    ];

    const benchmarks = [
        { exercise: 'Bench Press', beginner: '0.5x BW', intermediate: '1x BW', advanced: '1.5x BW' },
        { exercise: 'Squat', beginner: '0.75x BW', intermediate: '1.25x BW', advanced: '2x BW' },
        { exercise: 'Deadlift', beginner: '1x BW', intermediate: '1.5x BW', advanced: '2.5x BW' },
        { exercise: 'Overhead Press', beginner: '0.35x BW', intermediate: '0.65x BW', advanced: '1x BW' },
        { exercise: 'Pull-Ups', beginner: '3-5 reps', intermediate: '10-15 reps', advanced: '20+ reps' },
    ];

    return (
        <div className="min-h-screen bg-background-light">
            <Navbar />
            <main className="max-w-[1200px] mx-auto px-6 pt-28 pb-20 space-y-16">
                <div>
                    <span className="inline-block px-4 py-1.5 bg-navy-deep/5 text-navy-deep text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-navy-deep/10 mb-4">
                        Track & Optimize
                    </span>
                    <h1 className="text-5xl font-black tracking-tight text-navy-deep">Performance Center</h1>
                    <p className="text-slate-500 mt-3 text-lg font-medium max-w-2xl">Assess your body composition, track strength benchmarks, and learn optimal recovery strategies.</p>
                </div>

                {/* BMI Calculator */}
                <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Calculator size={24} className="text-navy-deep" />
                        <h2 className="text-2xl font-bold text-slate-900">BMI Calculator</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Weight (kg)</label>
                            <input type="number" value={bmi.weight}
                                onChange={(e) => setBmi(p => ({ ...p, weight: Number(e.target.value) }))}
                                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-navy-deep focus:ring-1 focus:ring-navy-deep shadow-sm" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Height (cm)</label>
                            <input type="number" value={bmi.height}
                                onChange={(e) => setBmi(p => ({ ...p, height: Number(e.target.value) }))}
                                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-navy-deep focus:ring-1 focus:ring-navy-deep shadow-sm" />
                        </div>
                        <div className={`p-5 rounded-2xl ${bmiCat.bg} border border-slate-100 text-center`}>
                            <p className="text-4xl font-black text-slate-900">{bmiValue}</p>
                            <p className={`text-sm font-bold uppercase tracking-wider mt-1 ${bmiCat.color}`}>{bmiCat.label}</p>
                        </div>
                    </div>
                </section>

                {/* Strength Benchmarks */}
                <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp size={24} className="text-navy-deep" />
                        <h2 className="text-2xl font-bold text-slate-900">Strength Benchmarks</h2>
                    </div>
                    <p className="text-slate-500 mb-6">Compare your lifts to these body-weight relative standards (BW = Body Weight).</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="py-3 pr-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Exercise</th>
                                    <th className="py-3 px-4 text-xs font-bold text-emerald-600 uppercase tracking-wider">Beginner</th>
                                    <th className="py-3 px-4 text-xs font-bold text-amber-600 uppercase tracking-wider">Intermediate</th>
                                    <th className="py-3 px-4 text-xs font-bold text-crimson-athletic uppercase tracking-wider">Advanced</th>
                                </tr>
                            </thead>
                            <tbody>
                                {benchmarks.map((b, i) => (
                                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 pr-4 font-bold text-slate-900">{b.exercise}</td>
                                        <td className="py-4 px-4 text-sm text-slate-600">{b.beginner}</td>
                                        <td className="py-4 px-4 text-sm text-slate-600">{b.intermediate}</td>
                                        <td className="py-4 px-4 text-sm text-slate-600">{b.advanced}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Recovery Tips */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Recovery & Optimization</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recoveryTips.map((tip, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="size-11 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                    {tip.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">{tip.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="text-center pt-4">
                    <Link to="/questionnaire"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-navy-deep to-crimson-athletic text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all no-underline">
                        Generate AI Training Plan <ArrowRight size={18} />
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default PerformancePage;
