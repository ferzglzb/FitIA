import React, { useState } from 'react';
import Hero from './components/Hero';
import Questionnaire from './components/Questionnaire';
import PlanResults from './components/PlanResults';
import { generatePlan } from './services/openai';
import './index.css';

function App() {
  const [step, setStep] = useState('hero'); // 'hero', 'questionnaire', 'results'
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setStep('questionnaire');
    setError(null);
  };

  const handleBack = () => {
    setStep('hero');
    setError(null);
  };

  const handleSubmit = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generatePlan(userData);
      setPlan(generatedData);
      setStep('results');
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while communicating with AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setStep('hero');
  };

  return (
    <div className="bg-background-light min-h-screen font-display text-navy-deep selection:bg-crimson-athletic/20">
      <main className="w-full">
        {error && (
          <div className="bg-red-50 border border-red-500 text-red-700 p-4 rounded-xl max-w-2xl mx-auto my-6 text-center shadow-sm">
            {error}
          </div>
        )}

        {step === 'hero' && <Hero onStart={handleStart} />}
        {step === 'questionnaire' && (
          <Questionnaire onSubmit={handleSubmit} onBack={handleBack} isLoading={isLoading} />
        )}
        {step === 'results' && <PlanResults plan={plan} onReset={handleReset} />}
      </main>
    </div>
  );
}

export default App;
