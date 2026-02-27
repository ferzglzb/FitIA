import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import Questionnaire from './components/Questionnaire';
import PlanResults from './components/PlanResults';
import WorkoutsPage from './pages/WorkoutsPage';
import NutritionPage from './pages/NutritionPage';
import PerformancePage from './pages/PerformancePage';
import { generatePlan } from './services/openai';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="bg-background-light min-h-screen font-display text-navy-deep selection:bg-crimson-athletic/20">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/questionnaire" element={
          <QuestionnaireWrapper
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setPlan={setPlan}
            error={error}
            setError={setError}
          />
        } />
        <Route path="/results" element={
          <PlanResults plan={plan} />
        } />
      </Routes>
    </div>
  );
}

function QuestionnaireWrapper({ isLoading, setIsLoading, setPlan, error, setError }) {
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generatePlan(userData);
      setPlan(generatedData);
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while communicating with AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-500 text-red-700 p-4 rounded-xl max-w-2xl mx-auto my-6 text-center shadow-sm">
          {error}
        </div>
      )}
      <Questionnaire onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}

export default App;
