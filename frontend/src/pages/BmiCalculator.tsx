import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Activity, Scale, Ruler } from 'lucide-react';

const BmiCalculator = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  
  // Imperial
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weightLbs, setWeightLbs] = useState('');

  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    let calculatedBmi = 0;

    if (unit === 'metric') {
      const heightInMeters = parseFloat(heightCm) / 100;
      const weight = parseFloat(weightKg);
      if (heightInMeters > 0 && weight > 0) {
        calculatedBmi = weight / (heightInMeters * heightInMeters);
      }
    } else {
      const totalHeightInInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      const weight = parseFloat(weightLbs);
      if (totalHeightInInches > 0 && weight > 0) {
        calculatedBmi = (weight / (totalHeightInInches * totalHeightInInches)) * 703;
      }
    }

    if (calculatedBmi > 0) {
      setBmi(parseFloat(calculatedBmi.toFixed(1)));
    }
  };

  const getBmiCategory = (score: number) => {
    if (score < 18.5) return { label: 'Underweight', color: '#3b82f6', desc: 'You are below the healthy weight range.' };
    if (score >= 18.5 && score <= 24.9) return { label: 'Normal Weight', color: '#16a34a', desc: 'You are in a healthy weight range.' };
    if (score >= 25 && score <= 29.9) return { label: 'Overweight', color: '#f59e0b', desc: 'You are slightly above the healthy weight range.' };
    return { label: 'Obese', color: '#ef4444', desc: 'You are significantly above the healthy weight range.' };
  };

  return (
    <div className="container" style={{ padding: '8rem 2rem 6rem 2rem', maxWidth: '900px', margin: '0 auto', minHeight: '80vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="h2" style={{ marginBottom: '1rem', color: 'var(--color-black)' }}>BMI Calculator</h1>
        <p className="p-large" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Find out where you stand. Body Mass Index (BMI) is a simple measure using your height and weight to work out if your weight is healthy.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
        
        {/* INPUT SECTION */}
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '0.5rem', padding: '0.25rem', marginBottom: '2rem' }}>
            <button 
              type="button"
              onClick={() => { setUnit('metric'); setBmi(null); }}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '0.375rem', fontWeight: 600, background: unit === 'metric' ? '#fff' : 'transparent', color: unit === 'metric' ? 'var(--color-black)' : '#64748b', boxShadow: unit === 'metric' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
            >
              Metric
            </button>
            <button 
              type="button"
              onClick={() => { setUnit('imperial'); setBmi(null); }}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '0.375rem', fontWeight: 600, background: unit === 'imperial' ? '#fff' : 'transparent', color: unit === 'imperial' ? 'var(--color-black)' : '#64748b', boxShadow: unit === 'imperial' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
            >
              Imperial
            </button>
          </div>

          <form onSubmit={calculateBmi}>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-black)' }}>
                <Ruler size={18} color="#64748b" /> Height
              </label>
              
              {unit === 'metric' ? (
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" required min="50" max="300" step="0.1"
                    value={heightCm} onChange={e => setHeightCm(e.target.value)}
                    style={{ width: '100%', padding: '1rem', paddingRight: '4rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none' }}
                    placeholder="e.g. 180"
                  />
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 600 }}>cm</span>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input 
                      type="number" required min="2" max="8"
                      value={heightFt} onChange={e => setHeightFt(e.target.value)}
                      style={{ width: '100%', padding: '1rem', paddingRight: '3rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none' }}
                      placeholder="ft"
                    />
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 600 }}>ft</span>
                  </div>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input 
                      type="number" required min="0" max="11"
                      value={heightIn} onChange={e => setHeightIn(e.target.value)}
                      style={{ width: '100%', padding: '1rem', paddingRight: '3rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none' }}
                      placeholder="in"
                    />
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 600 }}>in</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-black)' }}>
                <Scale size={18} color="#64748b" /> Weight
              </label>
              
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" required min="20" max="400" step="0.1"
                  value={unit === 'metric' ? weightKg : weightLbs} 
                  onChange={e => unit === 'metric' ? setWeightKg(e.target.value) : setWeightLbs(e.target.value)}
                  style={{ width: '100%', padding: '1rem', paddingRight: '4rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none' }}
                  placeholder={unit === 'metric' ? 'e.g. 80' : 'e.g. 175'}
                />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 600 }}>
                  {unit === 'metric' ? 'kg' : 'lbs'}
                </span>
              </div>
            </div>

            <button type="submit" className="button-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }}>
              <Calculator size={20} /> Calculate BMI
            </button>
          </form>
        </div>

        {/* RESULTS SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <AnimatePresence mode="wait">
            {!bmi ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '1rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: '#94a3b8', textAlign: 'center' }}
              >
                <Activity size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Enter your details to see your results.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: 'var(--color-black)', borderRadius: '1rem', padding: '3rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: getBmiCategory(bmi).color }}></div>
                
                <h3 style={{ fontSize: '1.2rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Your BMI Result</h3>
                <div style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, marginBottom: '1rem', color: 'var(--color-lime)' }}>
                  {bmi}
                </div>
                
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', width: 'fit-content', marginBottom: '1.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: getBmiCategory(bmi).color }}></div>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{getBmiCategory(bmi).label}</span>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {getBmiCategory(bmi).desc}
                </p>

                <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem' }}>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>Next Steps</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>BMI is just one metric. To get a complete picture of your body composition and why your body isn't changing, take our comprehensive Body Diagnostic.</p>
                  <a href="/scorecard" style={{ color: 'var(--color-lime)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    Take Body Diagnostic <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};

export default BmiCalculator;
