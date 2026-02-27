import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/workouts', label: 'Workouts' },
        { path: '/nutrition', label: 'Nutrition' },
        { path: '/performance', label: 'Performance' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-navy-deep/5 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 no-underline">
                    <div className="w-9 h-9 bg-navy-deep rounded-xl flex items-center justify-center">
                        <Zap size={18} className="text-white" fill="white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-navy-deep">FitPremium</span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ path, label }) => (
                        <Link key={path} to={path}
                            className={`text-sm font-semibold transition-colors no-underline ${isActive(path) ? 'text-crimson-athletic' : 'text-navy-deep/60 hover:text-navy-deep'}`}>
                            {label}
                        </Link>
                    ))}
                </div>
                <Link to="/questionnaire"
                    className="px-6 py-2.5 bg-navy-deep text-white text-sm font-bold rounded-full hover:bg-crimson-athletic transition-all duration-200 shadow-sm no-underline">
                    Get Started
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
