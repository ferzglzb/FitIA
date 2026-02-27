import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Brain, Target, Flame, Activity, Scale, Plus, Minus, CheckCircle2, Zap } from 'lucide-react';
import Navbar from './Navbar';

const Questionnaire = ({ onSubmit, isLoading }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: 25,
        gender: 'male',
        weight: 74,
        height: 180,
        goal: 'muscle',
        activityLevel: 'moderate',
        daysPerWeek: '4',
        dietaryRestrictions: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFieldChange = (field, delta) => {
        setFormData(prev => ({ ...prev, [field]: prev[field] + delta }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const goals = [
        { key: 'muscle', label: 'Build Muscle', icon: <Target size={26} />, desc: 'Increase strength and hypertrophy.' },
        { key: 'weight_loss', label: 'Fat Loss', icon: <Flame size={26} />, desc: 'Shed weight while keeping muscle.' },
        { key: 'endurance', label: 'Endurance', icon: <Activity size={26} />, desc: 'Boost stamina and cardio output.' },
        { key: 'maintenance', label: 'Maintenance', icon: <Scale size={26} />, desc: 'Stabilize and focus on health.' },
    ];

    return (
        <div className="min-h-screen bg-background-light">
            <Navbar />
            <main className="flex justify-center py-12 px-6 pt-28">
                <div className="max-w-[800px] w-full flex flex-col items-center">
                    <div className="w-full max-w-md flex flex-col gap-3 mb-12">
                        <div className="flex justify-between items-end">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Profile Setup</span>
                            <span className="text-slate-900 text-sm font-semibold">Step 1 of 2</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-navy-deep to-crimson-athletic rounded-full w-1/2" />
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-slate-900 text-4xl font-bold tracking-tight mb-3">Tailor your journey</h1>
                        <p className="text-slate-500 text-lg">Personalized metrics for professional results.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { field: 'age', label: 'Age', unit: 'yrs', min: 14, max: 100 },
                                { field: 'weight', label: 'Weight', unit: 'kg', min: 30, max: 300 },
                                { field: 'height', label: 'Height', unit: 'cm', min: 100, max: 250 },
                            ].map(({ field, label, unit, min, max }) => (
                                <div key={field} className="flex flex-col items-center gap-4">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</span>
                                    <div className="flex items-center gap-4">
                                        <button type="button" onClick={() => handleFieldChange(field, -1)} disabled={formData[field] <= min}
                                            className="size-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 hover:border-navy-deep disabled:opacity-40 transition-colors shadow-sm">
                                            <Minus size={18} />
                                        </button>
                                        <div className="text-center min-w-[60px]">
                                            <span className="text-3xl font-bold text-slate-900">{formData[field]}</span>
                                            <span className="text-slate-400 font-medium ml-1 text-sm">{unit}</span>
                                        </div>
                                        <button type="button" onClick={() => handleFieldChange(field, 1)} disabled={formData[field] >= max}
                                            className="size-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 hover:border-navy-deep disabled:opacity-40 transition-colors shadow-sm">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Gender</span>
                            <div className="bg-slate-100 p-1 rounded-full flex gap-1">
                                {['male', 'female'].map(g => (
                                    <button key={g} type="button" onClick={() => setFormData(p => ({ ...p, gender: g }))}
                                        className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all capitalize ${formData.gender === g ? 'bg-navy-deep text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                                        {g.charAt(0).toUpperCase() + g.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr className="border-slate-200" />

                        <div>
                            <h4 className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Primary Goal</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {goals.map(({ key, label, icon, desc }) => (
                                    <button key={key} type="button" onClick={() => setFormData(p => ({ ...p, goal: key }))}
                                        className={`relative p-6 rounded-2xl cursor-pointer transition-all text-left ${formData.goal === key ? 'bg-white border-2 border-navy-deep shadow-xl shadow-navy-deep/10' : 'bg-white border border-slate-200 hover:border-navy-deep/50 shadow-sm'}`}>
                                        {formData.goal === key && <CheckCircle2 size={18} className="absolute top-3 right-3 text-crimson-athletic fill-crimson-athletic" />}
                                        <div className="flex flex-col items-center text-center gap-3">
                                            <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center text-navy-deep border border-slate-100">{icon}</div>
                                            <span className="text-base font-bold text-slate-900">{label}</span>
                                            <p className="text-xs text-slate-500 leading-snug">{desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Activity Level</label>
                                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-navy-deep focus:ring-1 focus:ring-navy-deep shadow-sm">
                                    <option value="sedentary">Sedentary (Little/no exercise)</option>
                                    <option value="light">Light (1-3 days/week)</option>
                                    <option value="moderate">Moderate (3-5 days/week)</option>
                                    <option value="active">Active (6-7 days/week)</option>
                                    <option value="very_active">Very Active (Hard exercise/job)</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Workout Days/Week</label>
                                <select name="daysPerWeek" value={formData.daysPerWeek} onChange={handleChange}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-navy-deep focus:ring-1 focus:ring-navy-deep shadow-sm">
                                    <option value="2">2 Days</option>
                                    <option value="3">3 Days</option>
                                    <option value="4">4 Days</option>
                                    <option value="5">5 Days</option>
                                    <option value="6">6 Days</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Dietary Restrictions <span className="font-normal normal-case">(Optional)</span></label>
                            <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange}
                                placeholder="e.g. Vegan, Keto, Lactose Intolerant..."
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-navy-deep focus:ring-1 focus:ring-navy-deep shadow-sm" />
                        </div>

                        <div className="w-full flex justify-between items-center pt-8 border-t border-slate-200">
                            <button type="button" onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-6 py-3 rounded-full text-slate-500 font-semibold hover:text-navy-deep transition-colors">
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button type="submit" disabled={isLoading}
                                className="bg-gradient-to-r from-navy-deep to-crimson-athletic text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-navy-deep/20 hover:shadow-navy-deep/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                                {isLoading ? <><Brain className="animate-pulse" size={20} /> Generating Plan...</> :
                                    <>Create AI Plan <ArrowRight size={20} /></>}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Questionnaire;
