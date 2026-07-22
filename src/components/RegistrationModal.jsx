import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Shield, Mail, Phone, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from '../assets/logo.png';

export default function RegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    position: 'Midfielder',
    experience: 'Beginner',
    parentName: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setFormData({
        fullName: '',
        dob: '',
        position: 'Midfielder',
        experience: 'Beginner',
        parentName: '',
        email: '',
        phone: '',
        notes: ''
      });
      setErrors({});
      setIsSubmitting(false);
      setSubmitError(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
    } else if (currentStep === 2) {
      if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[0-9\s-]{8,20}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const calculateAge = (dobString) => {
    if (!dobString) return '';
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} years (DOB: ${dobString})`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      childAge: calculateAge(formData.dob),
      programInterest: `Position: ${formData.position}, Experience: ${formData.experience}`,
      parentName: formData.parentName,
      notes: formData.notes,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      setStep(3);
      // Trigger premium confetti splash
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // colors: Orange, Green, White
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FF6600', '#0A5C36', '#FFFFFF']
        }));
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FF6600', '#0A5C36', '#FFFFFF']
        }));
      }, 250);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-dark/85 backdrop-blur-md" 
        onClick={isSubmitting ? null : onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-neutral-card p-6 shadow-2xl md:p-8 glow-orange">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-white/50 hover:text-brand-orange transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Close Registration Modal"
        >
          <X size={24} />
        </button>

        {/* Progress Bar */}
        {step < 3 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span className={step >= 1 ? "text-brand-orange font-medium" : ""}>Player Info</span>
              <span className={step >= 2 ? "text-brand-orange font-medium" : ""}>Guardian Contact</span>
              <span>Review & Submit</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-green to-brand-orange transition-all duration-300 ease-out" 
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <img src={logo} className="w-14 h-14 object-contain shrink-0" alt="Croc City Badge" />
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {step === 1 && "Start Your Journey"}
              {step === 2 && "Guardian Details"}
              {step === 3 && "Registration Successful!"}
            </h3>
            <p className="text-xs text-white/60">
              {step === 1 && "Tell us about the aspiring athlete."}
              {step === 2 && "How can we reach you to finalize enrollment?"}
              {step === 3 && "Welcome to Croc City Football Academy."}
            </p>
          </div>
        </div>

        {/* Step 1: Player Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Player's Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3.5 text-white/40" />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Samuel Adebayo"
                  className="w-full bg-neutral-dark border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-3.5 text-white/40" />
                <input 
                  type="date" 
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-neutral-dark border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Preferred Position</label>
                <select 
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full bg-neutral-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                >
                  <option value="Forward">Forward</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Defender">Defender</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Experience Level</label>
                <select 
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-neutral-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                >
                  <option value="Beginner">Beginner / Recreational</option>
                  <option value="Intermediate">Intermediate (School team)</option>
                  <option value="Advanced">Advanced (Club experience)</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="button"
                onClick={handleNext}
                className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold py-3 px-4 rounded-lg flex justify-center items-center gap-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
              >
                Continue <Award size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Guardian Info */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Parent / Guardian Name</label>
              <div className="relative">
                <Shield size={18} className="absolute left-3 top-3.5 text-white/40" />
                <input 
                  type="text" 
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="e.g. John Adebayo"
                  className="w-full bg-neutral-dark border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3.5 text-white/40" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="parent@example.com"
                  className="w-full bg-neutral-dark border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-3.5 text-white/40" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="+234 800 123 4567"
                  className="w-full bg-neutral-dark border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Additional Notes / Medical info</label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Any dietary restrictions, medical conditions or football history we should know..."
                className="w-full bg-neutral-dark border border-white/10 rounded-lg p-3 h-20 text-white placeholder-white/30 focus:outline-none focus:border-brand-orange transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {submitError && (
              <p className="text-red-500 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                {submitError}
              </p>
            )}

            <div className="grid grid-cols-3 gap-3 pt-4">
              <button 
                type="button"
                onClick={handlePrev}
                disabled={isSubmitting}
                className="col-span-1 border border-white/10 hover:border-white/20 text-white font-semibold py-3 px-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="col-span-2 bg-gradient-to-r from-brand-green to-brand-green-light hover:brightness-110 text-white font-semibold py-3 px-4 rounded-lg flex justify-center items-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:brightness-100"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    Register Athlete <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <div className="py-6 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-green/20 border-2 border-brand-green text-brand-orange glow-green animate-bounce">
              <CheckCircle2 size={44} />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-display font-semibold text-white">Application Received!</h4>
              <p className="text-sm text-white/60 px-4">
                Thank you for applying to Croc City Football Academy. We have sent a confirmation email to <span className="text-brand-orange font-medium">{formData.email}</span> with pre-admission trial dates.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-left border border-white/5">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">What happens next?</h5>
              <ul className="text-xs text-white/60 space-y-2 list-disc list-inside">
                <li>Check your email inbox for trial details.</li>
                <li>Attend the next trial session with training gear.</li>
                <li>Meet our lead coaches for a skill assessment.</li>
              </ul>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-white text-neutral-dark hover:bg-neutral-light font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
