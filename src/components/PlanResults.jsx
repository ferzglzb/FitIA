import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Utensils, Flame, ArrowLeft, Egg, Wheat, Droplets, RefreshCw } from 'lucide-react';
import Navbar from './Navbar';

const PlanResults = ({ plan }) => {
    const navigate = useNavigate();

    if (!plan) {
        return (
            <div className="min-h-screen bg-background-light">
                <Navbar />
                <div className="flex flex-col items-center justify-center pt-40 text-center px-6">
                    <Dumbbell size={48} className="text-slate-300 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No Plan Generated Yet</h2>
                    <p className="text-slate-500 mb-6">Generate a personalized workout and nutrition plan first.</p>
                    <Link to="/questionnaire"
                        className="bg-gradient-to-r from-navy-deep to-crimson-athletic text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-[1.02] transition-all no-underline">
                        Create AI Plan
                    </Link>
                </div>
            </div>
        );
    }

    const { workoutPlan, nutritionPlan } = plan;

    const macroCards = [
        { label: 'Calories', value: nutritionPlan.dailyCalories, unit: 'kcal', icon: <Flame size={20} className="text-crimson-athletic" />, bg: 'bg-crimson-athletic/5', border: 'border-crimson-athletic/15', text: 'text-crimson-athletic', bar: 'bg-crimson-athletic', width: 'w-[85%]' },
        { label: 'Protein', value: nutritionPlan.macros.protein, unit: '', icon: <Egg size={20} className="text-navy-deep" />, bg: 'bg-navy-deep/5', border: 'border-navy-deep/15', text: 'text-navy-deep', bar: 'bg-navy-deep', width: 'w-[80%]' },
        { label: 'Carbs', value: nutritionPlan.macros.carbs, unit: '', icon: <Wheat size={20} className="text-amber-600" />, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', bar: 'bg-amber-500', width: 'w-[70%]' },
        { label: 'Fats', value: nutritionPlan.macros.fats, unit: '', icon: <Droplets size={20} className="text-slate-500" />, bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-500', bar: 'bg-slate-400', width: 'w-[60%]' },
    ];

    return (
        <div className="min-h-screen bg-background-light pb-20 animate-fade-in">
            <Navbar />
            <div className="max-w-[1200px] mx-auto w-full px-6 pt-24 pb-8 space-y-14">

                <div>
                    <h1 className="text-5xl font-black tracking-tight text-navy-deep uppercase italic">Performance Hub</h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Your AI-generated training and nutrition protocol.</p>
                </div>

                {/* Nutrition Panel */}
                <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10 space-y-8">
                    <div className="flex items-start gap-3">
                        <Utensils size={28} className="text-navy-deep mt-1 shrink-0" />
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Nutrition Protocol</h2>
                            <p className="text-slate-500 mt-1 leading-relaxed max-w-2xl">{nutritionPlan.summary}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {macroCards.map(({ label, value, unit, icon, bg, border, text, bar, width }) => (
                            <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${text}`}>{label}</span>
                                    {icon}
                                </div>
                                <p className="text-2xl font-black text-slate-900">{value} <span className="text-xs font-normal text-slate-400">{unit}</span></p>
                                <div className="h-1.5 w-full bg-white/60 rounded-full overflow-hidden mt-3">
                                    <div className={`h-full ${bar} ${width} rounded-full`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Daily Meal Structure</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {nutritionPlan.meals.map((meal, idx) => (
                                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy-deep border border-slate-200 shrink-0 shadow-sm">
                                        <Flame size={18} className="text-crimson-athletic" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-navy-deep">{meal.type}</span>
                                            <span className="text-xs font-semibold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md">{meal.calories} kcal</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">{meal.suggestion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Workout Section */}
                <section>
                    <div className="flex items-start gap-3 mb-6">
                        <Dumbbell size={28} className="text-navy-deep mt-1 shrink-0" />
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Training Regimen</h2>
                            <p className="text-slate-500 mt-1 leading-relaxed max-w-2xl">{workoutPlan.summary}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workoutPlan.days.map((day, dIdx) => (
                            <div key={dIdx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                                    <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{day.dayName}</h3>
                                    {day.isRest ?
                                        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase">Rest</span> :
                                        <span className="text-xs font-bold px-3 py-1 bg-crimson-athletic text-white rounded-full uppercase">Active</span>}
                                </div>
                                <div className="p-4 space-y-3">
                                    {day.isRest ? (
                                        <p className="text-sm text-slate-500 italic px-2 py-3">Focus on recovery, hydration, and light stretching.</p>
                                    ) : (
                                        day.exercises.map((ex, eIdx) => (
                                            <div key={eIdx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="size-10 rounded-xl bg-white flex items-center justify-center text-navy-deep border border-slate-200 shrink-0 shadow-sm">
                                                    <Dumbbell size={16} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-slate-900 truncate">{ex.name}</p>
                                                    {ex.notes && <p className="text-xs text-slate-500 truncate">{ex.notes}</p>}
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-lg font-black text-navy-deep">{ex.sets}<span className="text-xs font-medium text-slate-400 mx-0.5">×</span>{ex.reps}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link to="/questionnaire"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-navy-deep to-crimson-athletic text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all no-underline">
                        <RefreshCw size={18} /> Generate New Plan
                    </Link>
                    <Link to="/workouts"
                        className="inline-flex items-center gap-3 border-2 border-navy-deep/20 text-navy-deep font-bold px-8 py-4 rounded-full hover:border-navy-deep transition-all no-underline">
                        Browse Exercises
                    </Link>
                    <Link to="/nutrition"
                        className="inline-flex items-center gap-3 border-2 border-navy-deep/20 text-navy-deep font-bold px-8 py-4 rounded-full hover:border-navy-deep transition-all no-underline">
                        Nutrition Hub
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlanResults;
