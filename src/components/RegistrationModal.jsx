import React, { useState, useEffect, useRef } from 'react';
import { X, User, Phone, Mail, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from '../assets/logo.png';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[\d\s\-()]{8,20}$/;

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Full name is required';
  if (!fields.phone.trim()) errors.phone = 'Phone number is required';
  else if (!phoneRegex.test(fields.phone)) errors.phone = 'Enter a valid phone number';
  if (!fields.email.trim()) errors.email = 'Email address is required';
  else if (!emailRegex.test(fields.email)) errors.email = 'Enter a valid email address';
  if (!fields.childAge.trim()) errors.childAge = "Child's age is required";
  else if (isNaN(Number(fields.childAge)) || Number(fields.childAge) < 1 || Number(fields.childAge) > 25)
    errors.childAge = 'Please enter a valid age (1–25)';
  if (!fields.homeAddress.trim()) errors.homeAddress = 'Home address is required';
  return errors;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const INITIAL = {
  name: '',
  phone: '',
  email: '',
  childAge: '',
  homeAddress: '',
  // honeypot — never shown to real users
  website: '',
};

export default function RegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const firstInputRef = useRef(null);

  /* Reset when modal opens/closes */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setFormData(INITIAL);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
      setSubmitError(null);
      // Focus first field after paint
      setTimeout(() => firstInputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  /* ── Field change ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user fixes it
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /* ── Validate on blur for instant feedback ── */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] || '' }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched and run full validation
    const allTouched = Object.keys(INITIAL).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          childAge: formData.childAge,
          homeAddress: formData.homeAddress,
          website: formData.website, // honeypot
        }),
      });

      // Safely parse JSON — Vercel can return HTML error pages on infrastructure
      // failures (cold-start crash, missing env var, etc.) which makes a bare
      // response.json() throw a SyntaxError before we can read the real error.
      let data = {};
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try { data = await response.json(); } catch { /* ignore parse error */ }
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error (${response.status}). Please try again.`);
      }

      // ── Success ──
      setStep(2);
      launchConfetti();
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-dark/85 backdrop-blur-md"
        onClick={isSubmitting ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-y-auto max-h-[92dvh] rounded-2xl border border-white/10 bg-neutral-card shadow-2xl glow-orange">

        {/* ── Close ── */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-brand-orange transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <X size={22} />
        </button>

        <div className="p-6 md:p-8">

          {/* ══════════════════════════════════
              STEP 1 — Enquiry Form
          ══════════════════════════════════ */}
          {step === 1 && (
            <>
              {/* Header */}
              <div className="mb-6 flex items-center gap-4">
                <img src={logo} className="w-13 h-13 object-contain shrink-0" alt="Croc City Badge" />
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                    Register Your Child
                  </h3>
                  <p className="text-xs text-white/55 mt-0.5">
                    Fill in the form and we'll be in touch within 48 hours.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />

                {/* Name */}
                <Field
                  id="reg-name"
                  label="Your Full Name"
                  error={touched.name && errors.name}
                  icon={<User size={17} className="absolute left-3 top-3.5 text-white/35 pointer-events-none" />}
                >
                  <input
                    ref={firstInputRef}
                    id="reg-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    placeholder="e.g. Adebayo John Musa"
                    autoComplete="name"
                    className={inputCls(touched.name && errors.name)}
                  />
                </Field>

                {/* Phone */}
                <Field
                  id="reg-phone"
                  label="Phone Number"
                  error={touched.phone && errors.phone}
                  icon={<Phone size={17} className="absolute left-3 top-3.5 text-white/35 pointer-events-none" />}
                >
                  <input
                    id="reg-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    placeholder="+234 800 123 4567"
                    autoComplete="tel"
                    className={inputCls(touched.phone && errors.phone)}
                  />
                </Field>

                {/* Email */}
                <Field
                  id="reg-email"
                  label="Email Address"
                  error={touched.email && errors.email}
                  icon={<Mail size={17} className="absolute left-3 top-3.5 text-white/35 pointer-events-none" />}
                >
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputCls(touched.email && errors.email)}
                  />
                </Field>

                {/* Child's Age */}
                <Field
                  id="reg-childAge"
                  label="Child's Age"
                  error={touched.childAge && errors.childAge}
                  icon={
                    <span className="absolute left-3 top-3 text-white/35 text-sm font-semibold pointer-events-none select-none">
                      yrs
                    </span>
                  }
                >
                  <input
                    id="reg-childAge"
                    type="number"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    placeholder="e.g. 10"
                    min="1"
                    max="25"
                    className={inputCls(touched.childAge && errors.childAge)}
                  />
                </Field>

                {/* Home Address */}
                <Field
                  id="reg-homeAddress"
                  label="Home Address"
                  error={touched.homeAddress && errors.homeAddress}
                  icon={<MapPin size={17} className="absolute left-3 top-3.5 text-white/35 pointer-events-none" />}
                >
                  <textarea
                    id="reg-homeAddress"
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    placeholder="Street, area, city…"
                    rows={3}
                    autoComplete="street-address"
                    className={`${inputCls(touched.homeAddress && errors.homeAddress)} resize-none h-20`}
                  />
                </Field>

                {/* API error */}
                {submitError && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                    {submitError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="reg-submit-btn"
                  className="w-full mt-2 bg-gradient-to-r from-brand-green to-brand-green-light hover:brightness-110 text-white font-semibold py-3.5 px-4 rounded-xl flex justify-center items-center gap-2.5 cursor-pointer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:brightness-100 text-sm tracking-wide"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit Enquiry <CheckCircle2 size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-white/30 text-xs pt-1">
                  We'll reply within 48 hours · No spam, ever
                </p>
              </form>
            </>
          )}

          {/* ══════════════════════════════════
              STEP 2 — Success Screen
          ══════════════════════════════════ */}
          {step === 2 && (
            <div className="py-6 text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-green/20 border-2 border-brand-green text-brand-green glow-green">
                <CheckCircle2 size={44} />
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h4 className="text-xl font-display font-bold text-white">Enquiry Received! 🎉</h4>
                <p className="text-sm text-white/60 px-2 leading-relaxed">
                  Thank you! We've sent a confirmation to{' '}
                  <span className="text-brand-orange font-medium">{formData.email}</span>.
                  Our team will be in touch within 48 hours.
                </p>
              </div>

              {/* What next */}
              <div className="bg-white/5 rounded-xl p-4 text-left border border-white/5 space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">What happens next?</h5>
                {[
                  'Check your inbox — a confirmation email is on its way.',
                  'Our coaching staff will contact you to discuss next steps.',
                  'Attend your trial session and join the Croc City family!',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-green/30 text-brand-green text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-xs text-white/60 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full bg-white text-neutral-dark hover:bg-neutral-light font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer text-sm"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sub-components & utilities
───────────────────────────────────────────── */

/** Reusable labelled field wrapper */
function Field({ id, label, error, icon, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-white/55 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon}
        {children}
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

/** Dynamic input classes */
function inputCls(hasError) {
  const base =
    'w-full bg-neutral-dark border rounded-lg py-3 pl-10 pr-4 text-white text-sm placeholder-white/25 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  return hasError
    ? `${base} border-red-500/60 focus:border-red-400`
    : `${base} border-white/10 focus:border-brand-orange`;
}

/** Confetti burst in academy colours */
function launchConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ['#F7941D', '#6AA018', '#ffffff'];
  const defaults = { startVelocity: 28, spread: 360, ticks: 55, zIndex: 9999, colors };

  const rand = (a, b) => Math.random() * (b - a) + a;
  const tick = () => {
    const left = end - Date.now();
    if (left <= 0) return;
    const count = 45 * (left / duration);
    confetti({ ...defaults, particleCount: count, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount: count, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } });
    requestAnimationFrame(tick);
  };
  tick();
}
