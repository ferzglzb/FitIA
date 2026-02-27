import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Flame, Egg, Wheat, Droplets, ArrowRight, Brain, Loader2, Apple, Salad } from 'lucide-react';
import { generateMealIdeas } from '../services/openai';

const NutritionPage = () => {
    const [macroInput, setMacroInput] = useState({ weight: 75, goal: 'muscle' });
    const [aiMeals, setAiMeals] = useState(null);
    const [loadingMeals, setLoadingMeals] = useState(false);

    const calcMacros = () => {
        const w = macroInput.weight;
        const goals = {
            muscle: { cal: w * 35, protein: w * 2.2, carbs: w * 4, fats: w * 0.9 },
            weight_loss: { cal: w * 25, protein: w * 2.4, carbs: w * 2.5, fats: w * 0.7 },
            maintenance: { cal: w * 30, protein: w * 1.8, carbs: w * 3.5, fats: w * 0.8 },
        };
        const m = goals[macroInput.goal] || goals.maintenance;
        return { cal: Math.round(m.cal), protein: Math.round(m.protein), carbs: Math.round(m.carbs), fats: Math.round(m.fats) };
    };

    const macros = calcMacros();

    const handleGenerateMeals = async () => {
        setLoadingMeals(true);
        try {
            const meals = await generateMealIdeas(macros);
            setAiMeals(meals);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMeals(false);
        }
    };

    const tips = [
        { icon: <Apple size={22} className="text-emerald-500" />, title: 'Eat Whole Foods', desc: 'Prioritize unprocessed foods rich in micronutrients for optimal cellular health and recovery.' },
        { icon: <Droplets size={22} className="text-blue-500" />, title: 'Stay Hydrated', desc: 'Aim for at least 3L of water daily. Add electrolytes during intense training days.' },
        { icon: <Flame size={22} className="text-crimson-athletic" />, title: 'Time Your Meals', desc: 'Consume protein within 2 hours post-workout and carbs around training for best performance.' },
        { icon: <Salad size={22} className="text-amber-600" />, title: 'Fiber Matters', desc: 'Include 25-35g of fiber daily for gut health. Vegetables, legumes, and oats are great sources.' },
    ];

    return (
        <div className="min-h-screen bg-background-light">
            <Navbar />
            <main className="max-w-[1200px] mx-auto px-6 pt-28 pb-20 space-y-16">
                <div>
                    <span className="inline-block px-4 py-1.5 bg-navy-deep/5 text-navy-deep text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-navy-deep/10 mb-4">
                        Smart Nutrition
                    </span>
                    <h1 className="text-5xl font-black tracking-tight text-navy-deep">Nutrition Hub</h1>
                    <p className="text-slate-500 mt-3 text-lg font-medium max-w-2xl">Calculate your macros, get AI-powered meal suggestions, and learn the science behind fueling your performance.</p>
                </div>

                {/* Macro Calculator */}
                <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Macro Calculator</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Body Weight (kg)</label>
                            <input type="number" value={macroInput.weight}
                                onChange={(e) => setMacroInput(p => ({ ...p, weight: Number(e.target.value) }))}
                                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-navy-deep focus:ring-1 focus:ring-navy-deep shadow-sm w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Goal</label>
                            <div className="bg-slate-100 p-1 rounded-full flex gap-1">
                                {[{ k: 'muscle', l: 'Build Muscle' }, { k: 'weight_loss', l: 'Fat Loss' }, { k: 'maintenance', l: 'Maintain' }].map(g => (
                                    <button key={g.k} onClick={() => setMacroInput(p => ({ ...p, goal: g.k }))}
                                        className={`flex-1 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${macroInput.goal === g.k ? 'bg-navy-deep text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                                        {g.l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Calories', value: `${macros.cal}`, unit: 'kcal', icon: <Flame size={20} className="text-crimson-athletic" />, bg: 'bg-crimson-athletic/5', border: 'border-crimson-athletic/15', text: 'text-crimson-athletic' },
                            { label: 'Protein', value: `${macros.protein}g`, unit: '', icon: <Egg size={20} className="text-navy-deep" />, bg: 'bg-navy-deep/5', border: 'border-navy-deep/15', text: 'text-navy-deep' },
                            { label: 'Carbs', value: `${macros.carbs}g`, unit: '', icon: <Wheat size={20} className="text-amber-600" />, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
                            { label: 'Fats', value: `${macros.fats}g`, unit: '', icon: <Droplets size={20} className="text-slate-500" />, bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-500' },
                        ].map(m => (
                            <div key={m.label} className={`p-5 rounded-2xl ${m.bg} border ${m.border}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${m.text}`}>{m.label}</span>
                                    {m.icon}
                                </div>
                                <p className="text-2xl font-black text-slate-900">{m.value} <span className="text-xs font-normal text-slate-400">{m.unit}</span></p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AI Meal Suggestions */}
                <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">AI Meal Suggestions</h2>
                            <p className="text-slate-500 mt-1">Get personalized meal ideas based on your calculated macros.</p>
                        </div>
                        <button onClick={handleGenerateMeals} disabled={loadingMeals}
                            className="bg-gradient-to-r from-navy-deep to-crimson-athletic text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70">
                            {loadingMeals ? <><Loader2 size={18} className="animate-spin" /> Generating...</> :
                                <><Brain size={18} /> Generate Meals</>}
                        </button>
                    </div>

                    {aiMeals && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                            {aiMeals.map((meal, idx) => (
                                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-navy-deep">{meal.name}</span>
                                        <span className="text-xs font-semibold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md">{meal.calories} kcal</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-2">{meal.description}</p>
                                    <p className="text-xs text-slate-400">P: {meal.protein} • C: {meal.carbs} • F: {meal.fats}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {!aiMeals && !loadingMeals && (
                        <div className="text-center py-12 text-slate-400">
                            <Brain size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="font-medium">Click "Generate Meals" to get AI-powered suggestions</p>
                        </div>
                    )}
                </section>

                {/* Tips */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Nutrition Fundamentals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tips.map((tip, i) => (
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
            </main>
        </div>
    );
};

export default NutritionPage;
