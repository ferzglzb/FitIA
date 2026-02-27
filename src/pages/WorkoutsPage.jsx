import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Dumbbell, ChevronRight, Flame, Target, Zap, Heart, ArrowRight } from 'lucide-react';

const exerciseData = [
    {
        category: 'Push Day',
        tag: 'Chest, Shoulders, Triceps',
        color: 'crimson-athletic',
        exercises: [
            { name: 'Bench Press', sets: '4', reps: '8-10', muscle: 'Chest', level: 'Intermediate' },
            { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12', muscle: 'Upper Chest', level: 'Beginner' },
            { name: 'Overhead Press', sets: '4', reps: '6-8', muscle: 'Shoulders', level: 'Intermediate' },
            { name: 'Lateral Raises', sets: '3', reps: '12-15', muscle: 'Side Delts', level: 'Beginner' },
            { name: 'Tricep Dips', sets: '3', reps: '10-12', muscle: 'Triceps', level: 'Intermediate' },
            { name: 'Cable Flyes', sets: '3', reps: '12-15', muscle: 'Chest', level: 'Beginner' },
        ]
    },
    {
        category: 'Pull Day',
        tag: 'Back, Biceps, Rear Delts',
        color: 'navy-deep',
        exercises: [
            { name: 'Deadlifts', sets: '5', reps: '5', muscle: 'Posterior Chain', level: 'Advanced' },
            { name: 'Pull-Ups', sets: '4', reps: '8-10', muscle: 'Lats', level: 'Intermediate' },
            { name: 'Barbell Rows', sets: '4', reps: '8-10', muscle: 'Upper Back', level: 'Intermediate' },
            { name: 'Face Pulls', sets: '3', reps: '15-20', muscle: 'Rear Delts', level: 'Beginner' },
            { name: 'Bicep Curls', sets: '3', reps: '10-12', muscle: 'Biceps', level: 'Beginner' },
            { name: 'Hammer Curls', sets: '3', reps: '10-12', muscle: 'Brachialis', level: 'Beginner' },
        ]
    },
    {
        category: 'Leg Day',
        tag: 'Quads, Hamstrings, Glutes',
        color: 'amber-600',
        exercises: [
            { name: 'Barbell Squats', sets: '4', reps: '6-8', muscle: 'Quads & Glutes', level: 'Advanced' },
            { name: 'Romanian Deadlifts', sets: '4', reps: '8-10', muscle: 'Hamstrings', level: 'Intermediate' },
            { name: 'Leg Press', sets: '3', reps: '10-12', muscle: 'Quads', level: 'Beginner' },
            { name: 'Walking Lunges', sets: '3', reps: '12 each', muscle: 'Glutes', level: 'Beginner' },
            { name: 'Leg Curls', sets: '3', reps: '12-15', muscle: 'Hamstrings', level: 'Beginner' },
            { name: 'Calf Raises', sets: '4', reps: '15-20', muscle: 'Calves', level: 'Beginner' },
        ]
    },
    {
        category: 'Core & Abs',
        tag: 'Abs, Obliques, Lower Back',
        color: 'slate-500',
        exercises: [
            { name: 'Hanging Leg Raises', sets: '3', reps: '12-15', muscle: 'Lower Abs', level: 'Intermediate' },
            { name: 'Cable Crunches', sets: '3', reps: '15-20', muscle: 'Upper Abs', level: 'Beginner' },
            { name: 'Russian Twists', sets: '3', reps: '20', muscle: 'Obliques', level: 'Beginner' },
            { name: 'Plank Hold', sets: '3', reps: '60s', muscle: 'Core', level: 'Beginner' },
            { name: 'Ab Wheel Rollouts', sets: '3', reps: '10-12', muscle: 'Core', level: 'Advanced' },
        ]
    }
];

const WorkoutsPage = () => {
    const [openCategory, setOpenCategory] = useState(0);

    const levelColor = (lvl) => {
        if (lvl === 'Advanced') return 'bg-crimson-athletic/10 text-crimson-athletic';
        if (lvl === 'Intermediate') return 'bg-amber-100 text-amber-700';
        return 'bg-emerald-100 text-emerald-700';
    };

    return (
        <div className="min-h-screen bg-background-light">
            <Navbar />
            <main className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
                <div className="mb-12">
                    <span className="inline-block px-4 py-1.5 bg-navy-deep/5 text-navy-deep text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-navy-deep/10 mb-4">
                        Exercise Library
                    </span>
                    <h1 className="text-5xl font-black tracking-tight text-navy-deep">Workout Programs</h1>
                    <p className="text-slate-500 mt-3 text-lg font-medium max-w-2xl">Explore our curated exercise library organized by muscle group. Each exercise includes recommended sets, reps, and difficulty level.</p>
                </div>

                <div className="space-y-4">
                    {exerciseData.map((cat, cIdx) => (
                        <div key={cIdx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <button
                                onClick={() => setOpenCategory(openCategory === cIdx ? -1 : cIdx)}
                                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors text-left">
                                <div className="flex items-center gap-4">
                                    <div className={`size-12 rounded-2xl bg-${cat.color}/10 flex items-center justify-center`}>
                                        <Dumbbell size={22} className={`text-${cat.color}`} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">{cat.category}</h2>
                                        <p className="text-sm text-slate-500">{cat.tag} • {cat.exercises.length} exercises</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className={`text-slate-400 transition-transform ${openCategory === cIdx ? 'rotate-90' : ''}`} />
                            </button>

                            {openCategory === cIdx && (
                                <div className="px-6 pb-6 space-y-3 animate-fade-in">
                                    {cat.exercises.map((ex, eIdx) => (
                                        <div key={eIdx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:-translate-y-0.5 transition-transform">
                                            <div className="size-10 rounded-xl bg-white flex items-center justify-center text-navy-deep border border-slate-200 shadow-sm shrink-0">
                                                <Dumbbell size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-900">{ex.name}</p>
                                                <p className="text-xs text-slate-500">{ex.muscle}</p>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${levelColor(ex.level)}`}>{ex.level}</span>
                                            <div className="text-right shrink-0 min-w-[60px]">
                                                <p className="text-lg font-black text-navy-deep">{ex.sets}<span className="text-xs font-medium text-slate-400 mx-0.5">×</span>{ex.reps}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-slate-500 mb-4 font-medium">Want a plan tailored to YOUR body and goals?</p>
                    <Link to="/questionnaire"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-navy-deep to-crimson-athletic text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all no-underline">
                        Generate AI Custom Plan <ArrowRight size={18} />
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default WorkoutsPage;
