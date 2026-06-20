import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { API_URL } from '../config';

const questions = [
  // Pillar 1: Training Structure
  { id: 'q1', pillar: 1, title: 'Know Your Numbers', desc: 'Do you know your current bench press, deadlift, and pull-up numbers? Not what you used to lift.', minLabel: 'I have no idea', maxLabel: 'I log every session' },
  { id: 'q2', pillar: 1, title: 'Measurable Progression', desc: 'Has your strength gone up in the last 8 weeks? More weight or more reps on paper.', minLabel: 'Same weights for months', maxLabel: 'Clear documented progression' },
  { id: 'q3', pillar: 1, title: 'Baseline Strength Standards', desc: 'Can you bench your body weight, deadlift 1.5x, and do 6 strict pull-ups?', minLabel: 'Cannot hit any of these', maxLabel: 'Can hit all 3' },
  
  // Pillar 2: Nutrition Awareness
  { id: 'q4', pillar: 2, title: 'Daily Protein Target', desc: 'Do you know your daily protein target in grams, and do you hit it? (1.6 to 2g per kg of body weight)', minLabel: 'I do not know my target', maxLabel: 'I hit it 6 or 7 days a week' },
  { id: 'q5', pillar: 2, title: 'Go-To Meals You Enjoy', desc: 'Can you name 10 meals you enjoy that support your goals?', minLabel: 'No go-to meals', maxLabel: '10+ meals I enjoy' },
  { id: 'q6', pillar: 2, title: 'Calorie Awareness', desc: 'Do you know roughly how many calories you eat on an average day? Not a guess.', minLabel: 'Never tracked, no idea', maxLabel: 'I know my range and hit it' },
  
  // Pillar 3: Sleep and Recovery
  { id: 'q7', pillar: 3, title: '7+ Hours of Sleep', desc: 'Do you consistently sleep 7 or more hours per night? Not "in bed", asleep.', minLabel: 'Less than 5 hours', maxLabel: '7+ hours protected' },
  { id: 'q8', pillar: 3, title: 'Phone Out by 10pm', desc: 'Is your phone out of the bedroom by 10pm? Not on silent. Out of the room.', minLabel: 'I scroll until I fall asleep', maxLabel: 'Phone is out every night' },
  { id: 'q9', pillar: 3, title: 'Daily Stress Management', desc: 'Do you have a daily stress management practice? (Breathwork, walking, etc.)', minLabel: 'Nothing, no stress management', maxLabel: 'Daily practice without fail' },
  
  // Pillar 4: Body Composition Awareness
  { id: 'q10', pillar: 4, title: 'Progress Photos & Measurements', desc: 'Have you taken progress photos or body measurements in the last 4 weeks?', minLabel: 'Not in months or ever', maxLabel: 'Every 2 weeks, consistently' },
  { id: 'q11', pillar: 4, title: 'Body Fat Percentage', desc: 'Do you know your approximate body fat percentage right now from an actual measurement?', minLabel: 'No idea', maxLabel: 'Recent reliable measurement' },
  { id: 'q12', pillar: 4, title: 'Tracking Beyond the Scale', desc: 'Do you track anything beyond scale weight? Strength, waist, energy, clothes fitting.', minLabel: 'Scale weight or nothing', maxLabel: 'Multiple metrics, reviewed' },
  
  // Pillar 5: Consistency and Systems
  { id: 'q13', pillar: 5, title: 'Survives Travel and Busy Weeks', desc: 'When your schedule changes, can you still complete three workouts and reach your protein goal?', minLabel: 'Any disruption kills my routine', maxLabel: 'Survives travel consistently' },
  { id: 'q14', pillar: 5, title: '12+ Consecutive Weeks', desc: 'Have you followed the same structured approach for 12 or more consecutive weeks?', minLabel: 'Never beyond 4 to 6 weeks', maxLabel: '12+ weeks straight' },
  { id: 'q15', pillar: 5, title: 'Bi-Weekly Review and Adjust', desc: 'Do you review your progress and adjust every 2 weeks based on data?', minLabel: 'Never review or adjust', maxLabel: 'Every 2 weeks, adjust on data' }
];

const pillars = [
  "Training Structure",
  "Nutrition Awareness",
  "Sleep and Recovery",
  "Body Composition Awareness",
  "Consistency and Systems"
];

const Scorecard = () => {
  const [step, setStep] = useState(0); // 0 = Intro, 1-15 = Questions, 16 = Lead Capture, 17 = Results
  const [scores, setScores] = useState<number[]>(Array(15).fill(5)); // Default score 5 for each
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<{name?: string, email?: string, phone?: string}>({});
  const [resultData, setResultData] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = step >= 1 && step <= 15 ? questions[step - 1] : null;

  const handleNext = () => {
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScoreChange = (val: number) => {
    const newScores = [...scores];
    newScores[step - 1] = val;
    setScores(newScores);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Field level validations
    let newErrors: {name?: string, email?: string, phone?: string} = {};
    if (!lead.name.trim() || lead.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!lead.email.trim() || !emailRegex.test(lead.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (lead.phone.trim() && lead.phone.trim().length < 5) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    
    try {
      const payload = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        q1_score: scores[0], q2_score: scores[1], q3_score: scores[2],
        q4_score: scores[3], q5_score: scores[4], q6_score: scores[5],
        q7_score: scores[6], q8_score: scores[7], q9_score: scores[8],
        q10_score: scores[9], q11_score: scores[10], q12_score: scores[11],
        q13_score: scores[12], q14_score: scores[13], q15_score: scores[14],
      };

      const res = await axios.post(`${API_URL}/api/scorecards/submit`, payload);
      setResultData(res.data);
      setStep(17);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
      alert('Failed to submit scorecard. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getResultCategory = (total: number) => {
    if (total < 50) return { title: 'Below 50', subtitle: 'Running on Guesswork', desc: 'Your body is not changing because there is no system underneath it. You are putting in effort and hoping for the best. That is not a strategy.' };
    if (total <= 100) return { title: '50 to 100', subtitle: 'Some Pieces, Major Gaps', desc: 'You are doing about 60% of the work and getting only 20% of the results, because the missing 40% is what really drives change.' };
    return { title: 'Above 100', subtitle: 'Foundation Built, Precision Needed', desc: 'You have a solid foundation. The difference between 100 and 150 is not working harder. It is working smarter.' };
  };

  const getActionPlan = (total: number) => {
    if (total < 50) return (
      <ul>
        <li>Pick 3 compound lifts (bench, leg press, pull-downs). Write down what you can do today. That is your baseline. Every session, add something.</li>
        <li>Calculate your protein target: body weight in kg × 1.6. Hit it tomorrow.</li>
        <li>Set a bedtime alarm for 10pm. Phone in another room. Aim for 7 hours.</li>
      </ul>
    );
    if (total <= 100) return (
      <ul>
        <li>Identify your weakest section. Attack the weakest link first.</li>
        <li>Keep a food log for 48 hours with photos of everything. The gap between what you think you eat and actually eat is where progress hides.</li>
        <li>Start a bi-weekly review this Sunday (training log, sleep, measurements).</li>
      </ul>
    );
    return (
      <ul>
        <li>Get a proper body composition assessment (DEXA or calipers). Know exact body fat mass.</li>
        <li>Rotate your rep ranges. If you used the same range for 8+ weeks, your body has adapted.</li>
        <li>Audit your recovery honestly. Stress, alcohol, and sleep quality usually hold you back at this stage.</li>
      </ul>
    );
  };

  return (
    <div className="container" style={{ padding: '10rem 2rem 6rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <AnimatePresence mode="wait">
        
        {/* INTRO SCREEN */}
        {step === 0 && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-black)', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              Find Out Exactly Why <br/>Your Body Is Not Changing.
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '3rem' }}>
              Score yourself across 5 areas in 3 minutes. Be completely honest.
            </p>
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', textAlign: 'left', marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-black)' }}>The Problem</h3>
              <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
                You go to the gym 3 to 4 times a week. You try to eat healthy. You do your best to stay consistent. 
                And your body looks the same as it did 2 years ago.
              </p>
              <p style={{ color: '#475569', lineHeight: 1.6 }}>
                You would never run your business this way. No KPIs. No dashboard. Just showing up and hoping revenue goes up. 
                This scorecard will pinpoint exactly where your problem is.
              </p>
            </div>
            <button onClick={handleNext} className="button-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
              Start The Diagnostic <ArrowRight style={{ marginLeft: '0.5rem' }} />
            </button>
          </motion.div>
        )}

        {/* QUESTIONS SCREEN */}
        {step >= 1 && step <= 15 && currentQuestion && (
          <motion.div key={`q${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Question {step} of 15
              </span>
              <span style={{ background: 'var(--color-lime)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 700 }}>
                Pillar {currentQuestion.pillar}: {pillars[currentQuestion.pillar - 1]}
              </span>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-black)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              {currentQuestion.title}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '3rem', lineHeight: 1.6 }}>
              {currentQuestion.desc}
            </p>

            <div style={{ background: '#f8fafc', padding: '3rem 2rem', borderRadius: '1rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                <span style={{ width: '40%' }}>0 = {currentQuestion.minLabel}</span>
                <span style={{ width: '40%', textAlign: 'right' }}>10 = {currentQuestion.maxLabel}</span>
              </div>
              
              <input 
                type="range" 
                min="0" max="10" step="1" 
                value={scores[step - 1]} 
                onChange={(e) => handleScoreChange(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-black)', height: '8px', cursor: 'pointer' }}
              />
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-black)' }}>{scores[step - 1]}</span>
                <span style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: 600 }}> / 10</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handlePrev} className="button-secondary" style={{ display: 'flex', alignItems: 'center' }}>
                <ChevronLeft size={20} /> Back
              </button>
              <button onClick={handleNext} className="button-primary" style={{ display: 'flex', alignItems: 'center' }}>
                {step === 15 ? 'See Results' : 'Next Question'} <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {/* LEAD CAPTURE SCREEN */}
        {step === 16 && (
          <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-black)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Scorecard Complete</h2>
              <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Enter your details below to instantly view your personalized results and action plan.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-black)' }}>Full Name</label>
                <input 
                  type="text" 
                  value={lead.name} onChange={e => { setLead({...lead, name: e.target.value}); setErrors({...errors, name: undefined}); }}
                  style={{ width: '100%', padding: '1rem', border: `1px solid ${errors.name ? '#ef4444' : '#cbd5e1'}`, borderRadius: '0.5rem', fontSize: '1rem', outline: 'none' }}
                  placeholder="John Doe"
                />
                {errors.name && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>{errors.name}</div>}
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-black)' }}>Email Address</label>
                <input 
                  type="email" 
                  value={lead.email} onChange={e => { setLead({...lead, email: e.target.value}); setErrors({...errors, email: undefined}); }}
                  style={{ width: '100%', padding: '1rem', border: `1px solid ${errors.email ? '#ef4444' : '#cbd5e1'}`, borderRadius: '0.5rem', fontSize: '1rem', outline: 'none' }}
                  placeholder="john@example.com"
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>{errors.email}</div>}
              </div>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-black)' }}>Phone Number (Optional)</label>
                <input 
                  type="tel"
                  value={lead.phone} onChange={e => { setLead({...lead, phone: e.target.value}); setErrors({...errors, phone: undefined}); }}
                  style={{ width: '100%', padding: '1rem', border: `1px solid ${errors.phone ? '#ef4444' : '#cbd5e1'}`, borderRadius: '0.5rem', fontSize: '1rem', outline: 'none' }}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>{errors.phone}</div>}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" onClick={handlePrev} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>
                  Back to Questions
                </button>
                <button type="submit" disabled={submitting} className="button-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                  {submitting ? 'Analyzing...' : 'Unlock My Results'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* RESULTS SCREEN */}
        {step === 17 && resultData && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Your Total Score</h2>
              <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--color-black)', lineHeight: 1 }}>
                {resultData.total_score} <span style={{ fontSize: '2rem', color: '#cbd5e1' }}>/ 150</span>
              </div>
            </div>

            <div style={{ background: 'var(--color-black)', color: 'white', padding: '3rem', borderRadius: '1rem', marginBottom: '4rem' }}>
              <h3 style={{ color: 'var(--color-lime)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{getResultCategory(resultData.total_score).title}</h3>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{getResultCategory(resultData.total_score).subtitle}</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#cbd5e1' }}>
                {getResultCategory(resultData.total_score).desc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-black)' }}>Pillar Breakdown</h3>
                {[1, 2, 3, 4, 5].map(p => (
                  <div key={p} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>{pillars[p-1]}</span>
                    <span style={{ fontWeight: 800, color: 'var(--color-black)' }}>{resultData[`pillar_${p}_score`]} / 30</span>
                  </div>
                ))}
              </div>
              
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <AlertTriangle color="#d97706" size={28} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-black)', margin: 0 }}>Action Plan</h3>
                </div>
                <div style={{ lineHeight: 1.8, color: '#475569' }}>
                  {getActionPlan(resultData.total_score)}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', background: 'var(--color-lime)', padding: '4rem 2rem', borderRadius: '1rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-black)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>What Happens Next?</h2>
              <p style={{ fontSize: '1.2rem', color: '#1f2937', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Knowing what to fix is not the same as actually fixing it. I personally review every score that comes through. 
                {resultData.total_score < 75 ? " Since your score is below 75, I will reach out to you directly to map out the first 3 changes." : " Let's build a system that works."}
              </p>
              <button onClick={() => window.location.href = '/contact'} className="button-primary" style={{ background: 'var(--color-black)', color: 'white', padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
                Contact Us
              </button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Scorecard;
