import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Trophy, Activity, Target, Shield, Users, 
  MapPin, Calendar, ArrowUpRight, Mail, Phone, Award, 
  Clock, ArrowRight, CheckCircle2, ChevronRight, Star,
  Bell, Dumbbell, Play, Clipboard
} from 'lucide-react';
import gsap from 'gsap';
import AOS from 'aos';
import RegistrationModal from './components/RegistrationModal';
import heroAction from './assets/hero_action.png';
import teamCelebrative from './assets/team_celebrative.png';
import logo from './assets/logo.png';
import carousel1 from './assets/carousel_1.JPG';
import carousel2 from './assets/carousel_2.JPG';
import carousel3 from './assets/carousel_3.jpg';
import carousel4 from './assets/carousel_4.JPG';
import carousel5 from './assets/carousel_5.jpeg';
import carousel6 from './assets/carousel_6.JPG';
import carousel7 from './assets/carousel_7.JPG';
import carousel8 from './assets/carousel_8.JPG';
import carousel9 from './assets/carousel_9.JPG';
import carousel10 from './assets/carousel_10.JPG';
import facility0 from './assets/facility_0.jpg';
import facility1 from './assets/facility_1.jpg';
import facility2 from './assets/facility_2.jpg';
import facility3 from './assets/facility_3.jpg';
import facility4 from './assets/facility_4.jpg';
import facility5 from './assets/facility_5.jpg';
import facility6 from './assets/facility_6.jpg';
import facility7 from './assets/facility_7.jpg';
import facility8 from './assets/facility_8.jpg';

function App() {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('u15');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // GSAP animation references
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroBadgeRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });

    // GSAP Page Load Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(heroBadgeRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
      );
      
      tl.fromTo(heroTitleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
      
      tl.fromTo(heroSubtitleRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
      
      tl.fromTo(heroCtaRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
    });

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const programsData = {
    u15: {
      title: "Under-15",
      age: "Ages 13 - 15",
      focus: "Positional Play & Tactical Understanding",
      description: "Transitioning athletes from recreation to competition. We build on core technical skills and introduce positional dynamics, team structures, video analysis, and advanced fitness routines.",
      frequency: "4x Weekly Sessions + League Matches",
      features: [
        "Positional roles and responsibilities",
        "High-pressing and possession systems",
        "Strength, endurance, and flexibility foundations",
        "Introduction to performance psychology"
      ]
    },
    u17: {
      title: "Under-17",
      age: "Ages 15 - 17",
      focus: "Tactical Mastery & Match Intelligence",
      description: "Advanced program designed for players transitioning to competitive football. We focus on tactical mastery, match intelligence, and physical conditioning for aspiring professionals.",
      frequency: "5x Weekly Sessions + Competitive League Matches",
      features: [
        "Advanced tactical formations and systems",
        "Match analysis and opponent scouting",
        "Professional-level fitness conditioning",
        "Mental preparation and sports psychology"
      ]
    },
    u19: {
      title: "Under-19",
      age: "Ages 17 - 19",
      focus: "High-Performance Match Play",
      description: "Designed for players aiming for professional pathways or college scholarships. Academy Elite represents high-intensity training modeled after UEFA academies, focusing on peak physical condition and advanced tactics.",
      frequency: "5x Weekly Sessions + Showcase League Matches",
      features: [
        "Advanced tactical team structures (phases of play)",
        "Individualized strength & conditioning plans",
        "Direct showcases to national and international scouts",
        "Biweekly video review and game analysis"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-neutral-dark text-neutral-light font-sans selection:bg-brand-orange selection:text-white overflow-hidden">
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none">
            <img src={logo} className="h-10 w-auto object-contain" alt="Croc City Logo" />
            <span className="font-display text-2xl font-black tracking-tight text-white group-hover:text-brand-orange transition-colors uppercase">
              CROC<span className="text-brand-green">CITY</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[13px] font-bold tracking-widest uppercase text-white/75 hover:text-brand-orange transition-colors duration-200">About</a>
            <a href="#programs" className="text-[13px] font-bold tracking-widest uppercase text-white/75 hover:text-brand-orange transition-colors duration-200">Programs</a>
            <a href="#facilities" className="text-[13px] font-bold tracking-widest uppercase text-white/75 hover:text-brand-orange transition-colors duration-200">Facilities</a>
            <a href="#structure" className="text-[13px] font-bold tracking-widest uppercase text-white/75 hover:text-brand-orange transition-colors duration-200">Our Structure</a>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsRegModalOpen(true)}
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(255,102,0,0.3)] glow-orange"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-brand-orange transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-dark/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/5 hover:text-brand-orange transition-all"
            >
              About
            </a>
            <a 
              href="#programs" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/5 hover:text-brand-orange transition-all"
            >
              Programs
            </a>
            <a 
              href="#facilities" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/5 hover:text-brand-orange transition-all"
            >
              Facilities
            </a>
            <a 
              href="#structure" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/5 hover:text-brand-orange transition-all"
            >
              Our Structure
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsRegModalOpen(true);
              }}
              className="w-full text-center bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-4 rounded-lg cursor-pointer transition-colors shadow-lg"
            >
              Apply Now
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center pt-20 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroAction})` }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-dark/85 via-neutral-dark/45 to-neutral-dark z-0" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-24 flex flex-col items-center text-center space-y-8">
          
          {/* Centered Star/Croc Badge */}
          <div ref={heroBadgeRef} className="flex flex-col items-center space-y-4">
            <img 
              src={logo} 
              className="w-32 h-32 md:w-36 md:h-36 object-contain drop-shadow-[0_0_30px_rgba(255,102,0,0.35)] transform hover:scale-105 transition-transform duration-300" 
              alt="Croc City Crest Logo" 
            />
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-brand-orange" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-orange">Welcome</span>
              <span className="h-[2px] w-8 bg-brand-orange" />
            </div>
          </div>
          
          <h1 ref={heroTitleRef} className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none">
            <span className="text-brand-green">Croc</span> City <span className="text-brand-orange">Academy</span>
          </h1>
          
          <p ref={heroSubtitleRef} className="text-xs sm:text-sm lg:text-base font-display font-bold tracking-[0.3em] text-brand-green-light uppercase">
            Where Football Is More Than A Game.
          </p>
          
          <div ref={heroCtaRef} className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4 w-full sm:w-auto">
            <button 
              onClick={() => setIsRegModalOpen(true)}
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-light text-white font-extrabold px-8 py-4 rounded-full flex justify-center items-center gap-2 cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(255,102,0,0.4)] uppercase text-xs tracking-wider"
            >
              Join the Academy <ArrowRight size={16} />
            </button>
            <a 
              href="#programs"
              className="w-full sm:w-auto text-center border border-white/20 hover:border-brand-green hover:bg-brand-green/20 text-white font-extrabold px-8 py-4 rounded-full transition-all duration-300 uppercase text-xs tracking-wider"
            >
              Explore Programs
            </a>
          </div>
        </div>


      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-neutral-dark/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange">About Croc City Football Academy</h2>
            <div className="w-16 h-1 bg-brand-green mx-auto rounded-full" />
            <p className="text-white/70 text-base leading-relaxed">
              Croc City Football Academy (CCFA) is a football development institution dedicated to identifying, nurturing, and developing young football talents into well-rounded athletes and responsible individuals. Based in Kaduna, Nigeria, the Academy provides a structured pathway for aspiring footballers through professional coaching, player development programmes, education support, welfare services, and competitive football opportunities.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Our programmes cater to multiple age categories, including Under-15, Under-17, and Under-19 teams, with a focus on technical excellence, tactical understanding, physical conditioning, discipline, leadership, and character development.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              At CCFA, we believe football is more than a game it is a tool for empowerment, education, and social transformation. We are committed to creating an environment where young talents can grow academically, socially, and athletically while preparing for opportunities in professional football both locally and internationally.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Through our training facilities, accommodation programmes, qualified coaching staff, medical support services, and player welfare systems, we provide a comprehensive development experience designed to help every player reach their full potential.
            </p>
          </div>

          {/* Photo Carousel — Infinite CSS Scroll Belt */}
          <div className="relative overflow-hidden" data-aos="fade-up">
            {/* Left edge fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-dark via-neutral-dark/60 to-transparent z-10 pointer-events-none" />
            {/* Right edge fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-dark via-neutral-dark/60 to-transparent z-10 pointer-events-none" />

            {/* Scrolling belt — original + clone for seamless loop */}
            <div className="carousel-belt flex gap-5">
              {[...[ 
                { src: carousel1,       caption: 'Academy Training' },
                { src: carousel2,       caption: 'Coaching Sessions' },
                { src: carousel3,       caption: 'Match Day' },
                { src: carousel4,       caption: 'Skill Development' },
                { src: carousel5,       caption: 'Team Bonding' },
                { src: carousel6,       caption: 'Tactical Drills' },
                { src: carousel7,       caption: 'Warm-Up Drills' },
                { src: carousel8,       caption: 'Game Action' },
                { src: carousel9,       caption: 'Celebration' },
                { src: carousel10,      caption: 'Academy Life' },
              ], ...[ 
                { src: carousel1,       caption: 'Academy Training' },
                { src: carousel2,       caption: 'Coaching Sessions' },
                { src: carousel3,       caption: 'Match Day' },
                { src: carousel4,       caption: 'Skill Development' },
                { src: carousel5,       caption: 'Team Bonding' },
                { src: carousel6,       caption: 'Tactical Drills' },
                { src: carousel7,       caption: 'Warm-Up Drills' },
                { src: carousel8,       caption: 'Game Action' },
                { src: carousel9,       caption: 'Celebration' },
                { src: carousel10,      caption: 'Academy Life' },
              ]].map((photo, i) => (
                <div
                  key={i}
                  className="carousel-item flex-shrink-0 relative rounded-2xl overflow-hidden border border-white/10 group"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                    {photo.caption}
                  </span>
                  {/* Subtle shine on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Side by side philosophy display */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-neutral-card/40 rounded-3xl p-8 border border-white/5">
            <div data-aos="fade-right" className="space-y-6">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                Our Mission
              </h3>
              <p className="text-sm text-white/60">
                To provide a structured, professional, and holistic football development environment that empowers young people through sports, education, discipline, and opportunity.
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3">Our Core Values</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Excellence
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Discipline
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Integrity
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Teamwork
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Development
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Respect
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Leadership
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 size={16} className="text-brand-green-light" />
                  Accountability
                </li>
              </ul>
            </div>

            <div 
              data-aos="fade-left" 
              className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-neutral-dark flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${carousel3})` }}
            />
          </div>

        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-neutral-card/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange">Training Curriculums</h2>
            <p className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Select Your Development Stage
            </p>
            <div className="w-16 h-1 bg-brand-green mx-auto rounded-full" />
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {Object.keys(programsData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === key 
                  ? "bg-brand-green text-white shadow-md border border-brand-green-light" 
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
                }`}
              >
                {key === 'u15' && "Under-15"}
                {key === 'u17' && "Under-17"}
                {key === 'u19' && "Under-19"}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div 
            key={activeTab}
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-dark border border-white/10 rounded-3xl p-6 md:p-10"
          >
            {/* Left description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {programsData[activeTab].age}
              </div>
              
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase">
                {programsData[activeTab].title}
              </h3>
              
              <p className="text-brand-green-light font-semibold text-sm uppercase tracking-wide">
                Core Focus: {programsData[activeTab].focus}
              </p>
              
              <p className="text-sm text-white/60 leading-relaxed">
                {programsData[activeTab].description}
              </p>

              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Clock size={16} className="text-brand-orange" />
                <span className="font-semibold">Schedule:</span> {programsData[activeTab].frequency}
              </div>
            </div>

            {/* Right features checklist */}
            <div className="lg:col-span-5 bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Curriculum Highlights</h4>
              <ul className="space-y-4">
                {programsData[activeTab].features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle2 size={18} className="text-brand-green-light mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button 
                  onClick={() => setIsRegModalOpen(true)}
                  className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-4 rounded-xl cursor-pointer transition-all duration-300"
                >
                  Apply For Intake Trial
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-24 bg-neutral-dark/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange">Elite Infrastructure</h2>
            <p className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Modern Training Grounds
            </p>
            <div className="w-16 h-1 bg-brand-green mx-auto rounded-full" />
            <p className="text-white/60">
              Through our training facilities, accommodation programmes, qualified coaching staff, medical support services, and player welfare systems, we provide a comprehensive development experience designed to help every player reach their full potential.
            </p>
          </div>

          {/* Facilities Carousel — Infinite CSS Scroll Belt */}
          <div className="relative overflow-hidden" data-aos="fade-up">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-dark via-neutral-dark/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-dark via-neutral-dark/60 to-transparent z-10 pointer-events-none" />

            <div className="carousel-belt flex gap-5">
              {[...[ 
                { src: facility0 },
                { src: facility1 },
                { src: facility2 },
                { src: facility3 },
                { src: facility4 },
                { src: facility5 },
                { src: facility6 },
                { src: facility7 },
                { src: facility8 },
              ], ...[ 
                { src: facility0 },
                { src: facility1 },
                { src: facility2 },
                { src: facility3 },
                { src: facility4 },
                { src: facility5 },
                { src: facility6 },
                { src: facility7 },
                { src: facility8 },
              ]].map((facility, i) => (
                <div
                  key={i}
                  className="carousel-item flex-shrink-0 relative rounded-2xl overflow-hidden border border-white/10 group"
                >
                  <img
                    src={facility.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section id="structure" className="py-24 bg-neutral-card/50 relative overflow-hidden">
        <div className="absolute inset-0 sport-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange">Our Structure</h2>
            <p className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Player Development Pathway
            </p>
            <div className="w-16 h-1 bg-brand-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div data-aos="fade-up" className="glass-card rounded-2xl overflow-hidden">
              <div className="p-7 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green-light">Ages 6–15</p>
                    <h3 className="font-display text-xl font-extrabold text-white uppercase mt-1">Grassroots Program</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-green/15 border border-brand-green/25 flex items-center justify-center shrink-0">
                    <Target size={22} className="text-brand-green-light" />
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed">
                  Focused on basic skills, coordination, teamwork, and sportsmanship.
                </p>

                <div className="pt-2 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Technical fundamentals
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Team identity & discipline
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Confidence building
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="glass-card rounded-2xl overflow-hidden">
              <div className="p-7 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange-light">Ages 15–18</p>
                    <h3 className="font-display text-xl font-extrabold text-white uppercase mt-1">Youth Development Program</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/15 border border-brand-orange/25 flex items-center justify-center shrink-0">
                    <Shield size={22} className="text-brand-orange" />
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed">
                  Advanced tactical, technical, and physical training, with focus on competitive exposure.
                </p>

                <div className="pt-2 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Tactical understanding
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Performance conditioning
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Competitive match exposure
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="glass-card rounded-2xl overflow-hidden">
              <div className="p-7 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Ages 19–23</p>
                    <h3 className="font-display text-xl font-extrabold text-white uppercase mt-1">Elite Development Program</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                    <Award size={22} className="text-white" />
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed">
                  Professional-level training, mental preparedness, and pathway support for the next stage.
                </p>

                <div className="pt-2 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    High-performance standards
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Mentorship & leadership
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle2 size={16} className="text-brand-green-light" />
                    Professional transition support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Staff Section */}
      <section id="coaches" className="py-24 bg-neutral-dark/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange">Professional Instruction</h2>
            <p className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Meet Our Coaching Staff
            </p>
            <div className="w-16 h-1 bg-brand-green mx-auto rounded-full" />
            <p className="text-white/60">
              Our coaching staff consists of former professional players, sports scientists, and tacticians holding elite UEFA and CAF credentials.
            </p>
          </div>

          {/* Coach Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Coach 1 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-brand-green-dark to-neutral-card flex flex-col justify-end p-6 relative">
                {/* Visual Placeholder for Coach Profile */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-transparent to-transparent z-10" />
                <div className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-20">
                  UEFA Pro License
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">⚽</span>
                </div>
                
                <div className="relative z-20 space-y-1">
                  <h4 className="font-display text-xl font-bold text-white uppercase">Coach Andrew Cole</h4>
                  <p className="text-xs text-brand-orange font-semibold tracking-wider uppercase">Academy Director</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-white/60">
                  Andrew has over 12 years of professional play in Europe and 10 years coaching elite academies. He leads our overall syllabus development.
                </p>
              </div>
            </div>

            {/* Coach 2 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-brand-orange-dark/30 to-neutral-card flex flex-col justify-end p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-transparent to-transparent z-10" />
                <div className="absolute top-4 right-4 bg-brand-green text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-20">
                  Ph.D. Sports Science
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">🧬</span>
                </div>

                <div className="relative z-20 space-y-1">
                  <h4 className="font-display text-xl font-bold text-white uppercase">Dr. Evelyn Vance</h4>
                  <p className="text-xs text-brand-orange font-semibold tracking-wider uppercase">Head of Biomechanics</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-white/60">
                  Evelyn monitors athlete biomechanical performance, injury recovery metrics, and custom nutritional schedules.
                </p>
              </div>
            </div>

            {/* Coach 3 */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="300"
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-brand-green-dark/40 to-neutral-card flex flex-col justify-end p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-transparent to-transparent z-10" />
                <div className="absolute top-4 right-4 bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-20">
                  CAF A License
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">📋</span>
                </div>

                <div className="relative z-20 space-y-1">
                  <h4 className="font-display text-xl font-bold text-white uppercase">Coach Tariq Yusuf</h4>
                  <p className="text-xs text-brand-orange font-semibold tracking-wider uppercase">Head of Tactics & Scout</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-white/60">
                  Tariq specializes in opposition screening, match-simulation structures, and managing relationships with global scouts.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action / Newsletter section */}
      <section className="py-24 bg-gradient-to-b from-neutral-dark to-neutral-card relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/10 via-transparent to-brand-orange/10 opacity-30 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Ready to unleash <span className="text-brand-orange">your potential</span>?
          </h2>
          <p className="text-base text-white/60 max-w-xl mx-auto">
            Take the first step to becoming a professional athlete. Registration for our seasonal scouting trial intake is now open.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => setIsRegModalOpen(true)}
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-light text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all cursor-pointer"
            >
              Start Trial Application
            </button>
            <a 
              href="mailto:info@croccityfa.com"
              className="w-full sm:w-auto text-center border border-white/10 hover:border-white/30 text-white font-bold px-8 py-4 rounded-full transition-all"
            >
              Email Admissions
            </a>
          </div>

          <div className="max-w-md mx-auto pt-10 border-t border-white/15">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Subscribe to Scouting Updates</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input 
                type="email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter parent or player email" 
                className="flex-grow bg-neutral-dark border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-green"
              />
              <button 
                type="submit" 
                className="bg-brand-green hover:bg-brand-green-light text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                {newsletterSubscribed ? "Subscribed!" : "Join Squad"}
              </button>
            </form>
            {newsletterSubscribed && (
              <p className="text-brand-green-light text-xs mt-2 text-left">✓ Subscription successful! We'll alert you about upcoming academy fixtures and scouting events.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-dark border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} className="h-10 w-auto object-contain" alt="Croc City Crest Logo" />
              <span className="font-display text-xl font-black tracking-tight text-white uppercase">
                CROC<span className="text-brand-green">CITY</span>
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Croc City Football Academy is Nigeria's premier elite football institution, training athletic talent to reach national leagues and European contracts.
            </p>
            <div className="flex gap-4">
              <a href="https://web.facebook.com/CroccityFA/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-brand-orange transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/croccityfa?igsh=MXRmdWF5ZTNoMW8wOQ==" target="_blank" rel="noreferrer" className="text-white/40 hover:text-brand-orange transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-brand-orange transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-brand-orange transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Programs</h5>
            <ul className="space-y-2 text-xs text-white/60">
              <li><a href="#programs" onClick={() => setActiveTab('u15')} className="hover:text-brand-orange transition-colors">Under-15</a></li>
              <li><a href="#programs" onClick={() => setActiveTab('u17')} className="hover:text-brand-orange transition-colors">Under-17</a></li>
              <li><a href="#programs" onClick={() => setActiveTab('u19')} className="hover:text-brand-orange transition-colors">Under-19</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h5>
            <ul className="space-y-2 text-xs text-white/60">
              <li><a href="#about" className="hover:text-brand-orange transition-colors">About</a></li>
              <li><a href="#programs" className="hover:text-brand-orange transition-colors">Programs</a></li>
              <li><a href="#facilities" className="hover:text-brand-orange transition-colors">Facilities</a></li>
              <li><a href="#structure" className="hover:text-brand-orange transition-colors">Our Structure</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Support</h5>
            <ul className="space-y-2 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <MapPin size={12} className="text-brand-orange" />
                <span>No. 1 Lawal Jafaru Isah Layout, Off Isa Kaita Road, Malali, Kaduna State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={12} className="text-brand-orange" />
                <span>croccityfootballacademy@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={12} className="text-brand-orange" />
                <span>+234 802 965 6982</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/40">
            &copy; 2026 Croc City Football Academy. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] text-white/40">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Registration Modal Overlay */}
      <RegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={() => setIsRegModalOpen(false)} 
      />

    </div>
  );
}

export default App;
