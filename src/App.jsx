import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Trophy, Activity, Target, Shield, Users,
  MapPin, Calendar, ArrowUpRight, Mail, Phone, Award,
  Clock, ArrowRight, CheckCircle2, ChevronRight, Star,
  Bell, Dumbbell, Play, Clipboard, UserCheck, Building2
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
import newCar1 from './assets/New_Caro1.jpg';
import newCar2 from './assets/New_Caro2.jpg';
import newCar3 from './assets/New_Caro3.jpg';
import facility0 from './assets/facility_0.jpg';
import facility1 from './assets/facility_1.jpg';
import facility2 from './assets/facility_2.jpg';
import facility4 from './assets/facility_4.jpg';
import facility5 from './assets/facility_5.jpg';
import facility6 from './assets/facility_6.jpg';
import facility7 from './assets/facility_7.jpg';
import facility8 from './assets/facility_8.jpg';
import newFac1 from './assets/New_Fac1.jpg';
import newFac2 from './assets/New_Fac2.jpg';
import newFac3 from './assets/New_Fac3.jpg';
import missionVideo from './assets/video/compressed.mp4';

// Key Staff photo imports
import staffCephas from './assets/images/Cephas Kafarma Josheph (Head Coach U17) (1).jpg';
import staffDavid from './assets/images/David Amanyi (General Manager).jpg';
import staffGabrielle from './assets/images/Gabrielle Obaje (Head Coach U15).jpg';
import staffLawrence from './assets/images/Lawrence James (Head Coach U19).jpg';
import staffMercy from './assets/images/Mercy Vihiga Stephen (PM U15).jpg';
import staffOminiyi from './assets/images/Ominiyi Oluchi Vivian (Physiotherapist 1).jpg';
import staffSamuel from './assets/images/Samuel Aruwa Joshua (DOA).jpg';
import staffIdris from './assets/images/W.O Idris Abdulkarim (RTD) (CSO).jpg';
import leaderChair from './assets/images/Chair.jpg';
import leaderPresident from './assets/images/President.jpeg';

const keyStaff = [
  {
    name: "Cephas Kafarma Josheph",
    role: "Head Coach U17",
    license: "CAF B License",
    photo: staffCephas,
    badgeColor: "bg-brand-orange"
  },
  {
    name: "David Amanyi",
    role: "General Manager",
    license: "Executive",
    photo: staffDavid,
    badgeColor: "bg-brand-green"
  },
  {
    name: "Gabrielle Obaje",
    role: "Head Coach U15",
    license: "CAF C License",
    photo: staffGabrielle,
    badgeColor: "bg-brand-orange"
  },
  {
    name: "Lawrence James",
    role: "Head Coach U19",
    license: "UEFA A License",
    photo: staffLawrence,
    badgeColor: "bg-brand-green"
  },
  {
    name: "Mercy Vihiga Stephen",
    role: "PM U15",
    license: "Operations",
    photo: staffMercy,
    badgeColor: "bg-brand-orange"
  },
  {
    name: "Ominiyi Oluchi Vivian",
    role: "Physiotherapist 1",
    license: "Medical",
    photo: staffOminiyi,
    badgeColor: "bg-brand-green"
  },
  {
    name: "Samuel Aruwa Joshua",
    role: "DOA",
    license: "Management",
    photo: staffSamuel,
    badgeColor: "bg-brand-orange"
  },
  {
    name: "W.O Idris Abdulkarim (RTD)",
    role: "CSO",
    license: "Safety",
    photo: staffIdris,
    badgeColor: "bg-brand-green"
  }
];

const leadershipData = [
  {
    id: 'president',
    role: 'The President',
    name: 'Umar Babawo Wushishi',
    photo: leaderPresident,
    icon: 'userCheck',
    badgeColor: 'brand-orange',
    bio: "Umar Babawo Wushishi is the Founder and President of Croc City Football Academy, providing the strategic leadership and vision that drive the Academy's growth and long-term development. With a deep passion for youth empowerment and football development, he established the Academy with the goal of creating a world-class institution where talented young footballers can develop their abilities, build character, and access opportunities to excel both on and off the pitch.",
    fullBio: `Umar Babawo Wushishi is the Founder and President of Croc City Football Academy, providing the strategic leadership and vision that drive the Academy's growth and long-term development. With a deep passion for youth empowerment and football development, he established the Academy with the goal of creating a world-class institution where talented young footballers can develop their abilities, build character, and access opportunities to excel both on and off the pitch.

As President, he provides overall leadership for the Academy, overseeing its strategic direction, governance, institutional development, partnerships, and major investment initiatives. He works closely with Management to ensure that the Academy operates with professionalism, accountability, and excellence while maintaining the highest standards in player welfare, technical development, and organizational management.`
  },
  {
    id: 'chairman',
    role: 'The Chairman',
    name: 'Abdul-Azeez Wushishi',
    photo: leaderChair,
    icon: 'building2',
    badgeColor: 'brand-green',
    bio: "As the Chairman of Croc City Football Academy, Abdul-Azeez Wushishi is dedicated to transforming grassroots football in Kaduna state. Alongside his brother, the Academy's president, he leads the organisation with a shared vision to discover, nurture and elevate local talent to global standards through strategic international partnerships and character mentorship.",
    fullBio: `As the Chairman of Croc City Football Academy, he is dedicated to transforming grassroots football in Kaduna state. Alongside his brother, the Academy’s president, he leads the organisation with a shared vision to discover, nurture and elevate local talent to global standards. His leadership focuses on building strategic international partnerships, improving training facilities and ensuring a highly professional environment for young athletes. He firmly believes in holistic youth development, combining elite athletic excellence with character mentorship.

His inspiration comes from a deep-rooted passion for football since he was little and the desire to create a pathway for young talent in Kaduna state and Nigeria as a whole. He saw the potential in our communities and knowing how sports can change the lives of these players, this became his driving force to set up the academy. Croc city aims to build a professional, supportive environment where the players can thrive on and off the pitch.`
  },
  {
    id: 'gm',
    role: 'General Manager',
    name: 'David Amanyi',
    photo: staffDavid,
    photoStyle: { objectPosition: '85% center' },
    badgeColor: 'brand-orange',
    bio: "David Amanyi is a seasoned football administrator with over 14 years of experience in football management, player development, and sports administration. A former footballer who played both locally and internationally, he brings a wealth of practical knowledge and industry experience to Croc City Football Academy.",
    fullBio: `David Amanyi is a seasoned football administrator with over 14 years of experience in football management, player development, and sports administration. A former footballer who played both locally and internationally, he brings a wealth of practical knowledge and industry experience to Croc City Football Academy. As General Manager (Sports), he is responsible for the planning, coordination, supervision, and overall management of the Academy's football programmes and teams, ensuring that technical, developmental, and operational objectives are effectively achieved.

His extensive understanding of the football ecosystem, combined with his passion for talent development, enables him to provide strategic direction that supports both player progression and the Academy's long-term growth. David is committed to creating opportunities for young footballers and fostering an environment where talent can be identified, nurtured, and successfully transitioned to higher levels of the game.`
  }
];

function App() {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('u15');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [clickedCarousel, setClickedCarousel] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isAboutCarouselPaused, setIsAboutCarouselPaused] = useState(false);
  const [isFacilitiesCarouselPaused, setIsFacilitiesCarouselPaused] = useState(false);

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
            <img src={logo} className="h-10 w-auto object-contain" alt="Croc City Logo" decoding="async" fetchPriority="high" />
            <span className="font-display text-2xl font-black tracking-tight uppercase">
              <span className="text-brand-orange">CROC</span><span className="text-brand-green">CITY</span>
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
              decoding="async"
              fetchPriority="high"
            />
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-brand-orange" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-orange">Welcome</span>
              <span className="h-[2px] w-8 bg-brand-orange" />
            </div>
          </div>

          <h1 ref={heroTitleRef} className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none">
            <span className="text-brand-green">Croc</span> <span className="text-brand-orange">City</span> <span className="text-brand-green">Football</span> <span className="text-brand-orange">Academy</span>
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
          </div>
        </div>

        {/* Photo Carousel — Infinite CSS Scroll Belt (full width, edge to edge) */}
        <div className="relative overflow-hidden" data-aos="fade-up">
          {/* Scrolling belt — original + clone for seamless loop */}
          <div
            className={`carousel-belt flex gap-5 cursor-pointer ${isAboutCarouselPaused ? 'carousel-paused' : ''}`}
            onClick={() => setIsAboutCarouselPaused(!isAboutCarouselPaused)}
          >
            {[...[
              { src: carousel1, caption: 'Academy Training' },
              { src: carousel3, caption: 'Match Day' },
              { src: carousel4, caption: 'Skill Development' },
              { src: carousel5, caption: 'Team Bonding' },
              { src: carousel6, caption: 'Tactical Drills' },
              { src: carousel7, caption: 'Warm-Up Drills' },
              { src: carousel8, caption: 'Game Action' },
              { src: carousel9, caption: 'Celebration' },
              { src: carousel10, caption: 'Academy Life' },
              { src: newCar1 },
              { src: newCar2 },
              { src: newCar3 },
            ], ...[
              { src: carousel1, caption: 'Academy Training' },
              { src: carousel3, caption: 'Match Day' },
              { src: carousel4, caption: 'Skill Development' },
              { src: carousel5, caption: 'Team Bonding' },
              { src: carousel6, caption: 'Tactical Drills' },
              { src: carousel7, caption: 'Warm-Up Drills' },
              { src: carousel8, caption: 'Game Action' },
              { src: carousel9, caption: 'Celebration' },
              { src: carousel10, caption: 'Academy Life' },
              { src: newCar1 },
              { src: newCar2 },
              { src: newCar3 },
            ]].map((photo, i) => (
              <div
                key={i}
                className="carousel-item flex-shrink-0 relative rounded-2xl overflow-hidden border border-white/10 group"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Subtle shine on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Remaining text in centered container */}
          <div className="text-center max-w-3xl mx-auto mt-12 space-y-4">
            <p className="text-white/70 text-base leading-relaxed">
              At CCFA, we believe football is more than a game it is a tool for empowerment, education, and social transformation. We are committed to creating an environment where young talents can grow academically, socially, and athletically while preparing for opportunities in professional football both locally and internationally.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Through our training facilities, accommodation programmes, qualified coaching staff, medical support services, and player welfare systems, we provide a comprehensive development experience designed to help every player reach their full potential.
            </p>
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
              className="flex flex-col gap-4 w-full"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-neutral-dark w-full">
                {isPlayingVideo ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <video
                      src={missionVideo}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlayingVideo(false)}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center bg-cover bg-center cursor-pointer group relative"
                    style={{ backgroundImage: `url(${carousel2})` }}
                    onClick={() => setIsPlayingVideo(true)}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />

                    {/* Play Button Overlay */}
                    <div className="relative z-10 flex flex-col items-center gap-3 transform group-hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white flex items-center justify-center shadow-lg shadow-brand-orange/30 animate-pulse">
                        <Play size={28} className="fill-current ml-1" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/60 px-3 py-1 rounded-full border border-white/10">
                        Click Me
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center lg:justify-end px-2">
                <a
                  href="https://youtu.be/UYYLXfp-80Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-orange-light transition-colors duration-300 group cursor-pointer"
                >
                  <Play size={16} className="text-brand-orange group-hover:scale-110 transition-transform fill-current" />
                  <span>watch more videos on our Youtube</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
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
                className={`px-6 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 cursor-pointer ${activeTab === key
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
            <div
              className={`carousel-belt flex gap-5 cursor-pointer ${isFacilitiesCarouselPaused ? 'carousel-paused' : ''}`}
              onClick={() => setIsFacilitiesCarouselPaused(!isFacilitiesCarouselPaused)}
            >
              {[...[
                { src: facility0 },
                { src: facility1 },
                { src: facility2 },
                { src: facility4 },
                { src: facility5 },
                { src: facility6 },
                { src: facility7 },
                { src: facility8 },
                { src: newFac1 },
                { src: newFac2 },
                { src: newFac3 },
              ], ...[
                { src: facility0 },
                { src: facility1 },
                { src: facility2 },
                { src: facility4 },
                { src: facility5 },
                { src: facility6 },
                { src: facility7 },
                { src: facility8 },
                { src: newFac1 },
                { src: newFac2 },
                { src: newFac3 },
              ]].map((facility, i) => (
                <div
                  key={i}
                  className="carousel-item flex-shrink-0 relative rounded-2xl overflow-hidden border border-white/10 group"
                >
                  <img
                    src={facility.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
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
                    <img src="/football-svgrepo-com.svg" className="w-6 h-6 object-contain" alt="Football Icon" />
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
                    <img src="/football-svgrepo-com.svg" className="w-6 h-6 object-contain" alt="Football Icon" />
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
                    <img src="/football-svgrepo-com.svg" className="w-6 h-6 object-contain" alt="Football Icon" />
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

      {/* Leadership Section */}
      <section id="leadership" className="py-24 bg-neutral-card/40 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange">Executive Board</h2>
            <p className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              Meet Our Leadership
            </p>
            <div className="w-16 h-1 bg-brand-green mx-auto rounded-full" />
            <p className="text-white/60">
              Guiding Croc City Football Academy towards strategic growth, sporting excellence, and global recognition.
            </p>
          </div>

          {/* 3 Profiles: President, Chairman, General Manager */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipData.map((leader, index) => (
              <div
                key={leader.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => setSelectedLeader(leader)}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/5] bg-neutral-dark relative overflow-hidden flex items-center justify-center">
                  {leader.photo ? (
                    <img
                      src={leader.photo}
                      alt={`${leader.name} - ${leader.role}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={leader.photoStyle || {}}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${leader.badgeColor === 'brand-orange' ? 'from-brand-orange-dark/30' : 'from-brand-green-dark/30'} via-neutral-card to-neutral-dark`} />
                      <div className="relative z-10 flex flex-col items-center gap-3 p-6 text-center">
                        <div className={`w-24 h-24 rounded-full ${leader.badgeColor === 'brand-orange' ? 'bg-brand-orange/20 border-brand-orange/40 text-brand-orange' : 'bg-brand-green/20 border-brand-green/40 text-brand-green'} border-2 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                          {leader.icon === 'userCheck' ? <UserCheck size={48} /> : <Building2 size={48} />}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${leader.badgeColor === 'brand-orange' ? 'bg-brand-orange/20 text-brand-orange border-brand-orange/30' : 'bg-brand-green/20 text-brand-green border-brand-green/30'} px-3 py-1 rounded-full border`}>
                          Photo Slot
                        </span>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-neutral-dark/30 to-transparent z-10" />
                  <div className="absolute bottom-4 left-6 right-6 z-20">
                    <h3 className="font-display text-2xl font-black text-white uppercase">{leader.role}</h3>
                    {leader.name && <p className="text-xs text-white/80 font-semibold">{leader.name}</p>}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <p className="text-xs text-white/70 leading-relaxed flex-1">
                    {leader.bio}
                  </p>
                  <div className="pt-2 text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange group-hover:underline inline-flex items-center gap-1">
                      Read Full Bio <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
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

          {/* Key Staff */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-6 w-1.5 bg-brand-orange rounded-full" />
              <h3 className="font-display text-2xl font-extrabold text-white uppercase tracking-tight">
                Key Staff
              </h3>
            </div>

            <div className="relative overflow-hidden" data-aos="fade-up">
              {/* Scrolling belt — original + clone for seamless loop */}
              <div className={`carousel-belt-staff flex gap-5 py-4 ${clickedCarousel === 'key' ? 'carousel-paused' : ''}`}>
                {[...keyStaff, ...keyStaff].map((staff, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setClickedCarousel('key');
                      setSelectedStaff(staff);
                    }}
                    className="w-[300px] flex-shrink-0 glass-card rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-[4/5] bg-neutral-card flex flex-col justify-end p-6 relative overflow-hidden">
                      {staff.photo ? (
                        <img
                          src={staff.photo}
                          alt={staff.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                      ) : (
                        <div className={`absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br ${staff.gradient || 'from-brand-green-dark to-neutral-card'}`}>
                          <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{staff.emoji}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-neutral-dark/30 to-transparent z-10" />
                      <div className="relative z-20 space-y-1">
                        <h4 className="font-display text-lg font-bold text-white uppercase">{staff.name}</h4>
                        <p className="text-xs text-brand-orange font-semibold tracking-wider uppercase">{staff.role}</p>
                      </div>
                    </div>

                  </div>
                ))}
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
              <img src={logo} className="h-10 w-auto object-contain" alt="Croc City Crest Logo" loading="lazy" decoding="async" fetchPriority="low" />
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
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/croccityfa?igsh=MXRmdWF5ZTNoMW8wOQ==" target="_blank" rel="noreferrer" className="text-white/40 hover:text-brand-orange transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-brand-orange transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@CrocCityFootballAcademy" target="_blank" rel="noreferrer" className="text-white/40 hover:text-brand-orange transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
                <span>croccityfainfo@gmail.com</span>
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

        </div>
      </footer>

      {/* Registration Modal Overlay */}
      <RegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
      />

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => {
          setSelectedStaff(null);
          setClickedCarousel(null);
        }}>
          <div className="bg-neutral-card border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-brand-orange text-white rounded-full p-2 transition-colors"
              onClick={() => {
                setSelectedStaff(null);
                setClickedCarousel(null);
              }}
            >
              <X size={20} />
            </button>
            <div className="aspect-[4/3] relative bg-neutral-dark">
              {selectedStaff.photo ? (
                <img
                  src={selectedStaff.photo}
                  alt={selectedStaff.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${selectedStaff.gradient || 'from-brand-green-dark to-neutral-card'}`}>
                  <span className="text-9xl">{selectedStaff.emoji}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-card via-neutral-card/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-3xl font-bold text-white uppercase drop-shadow-md">{selectedStaff.name}</h3>
                <p className="text-brand-orange font-semibold tracking-wider uppercase drop-shadow-md">{selectedStaff.role}</p>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-white/80 font-bold uppercase mb-2 text-sm">About</h4>
              <p className="text-white/70 leading-relaxed">
                {selectedStaff.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Detail Modal */}
      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="bg-neutral-card border border-white/10 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[90vh] flex flex-col md:flex-row transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-brand-orange text-white rounded-full p-2.5 transition-colors cursor-pointer border border-white/10"
              onClick={() => setSelectedLeader(null)}
              aria-label="Close Leadership Modal"
            >
              <X size={20} />
            </button>

            {/* Left Image / Slot */}
            <div className="md:w-1/2 aspect-[4/5] md:aspect-auto relative bg-neutral-dark flex items-center justify-center min-h-[320px]">
              {selectedLeader.photo ? (
                <img
                  src={selectedLeader.photo}
                  alt={`${selectedLeader.name} - ${selectedLeader.role}`}
                  className="w-full h-full object-cover"
                  style={selectedLeader.photoStyle || {}}
                />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br ${selectedLeader.badgeColor === 'brand-orange' ? 'from-brand-orange-dark/30' : 'from-brand-green-dark/30'} via-neutral-card to-neutral-dark`}>
                  <div className={`w-32 h-32 rounded-full ${selectedLeader.badgeColor === 'brand-orange' ? 'bg-brand-orange/20 border-brand-orange/40 text-brand-orange' : 'bg-brand-green/20 border-brand-green/40 text-brand-green'} border-2 flex items-center justify-center shadow-2xl mb-4`}>
                    {selectedLeader.icon === 'userCheck' ? <UserCheck size={64} /> : <Building2 size={64} />}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${selectedLeader.badgeColor === 'brand-orange' ? 'bg-brand-orange/20 text-brand-orange border-brand-orange/30' : 'bg-brand-green/20 text-brand-green border-brand-green/30'} px-4 py-1.5 rounded-full border`}>
                    Photo Slot
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-card via-neutral-card/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 z-20 md:hidden">
                <h3 className="font-display text-3xl font-black text-white uppercase drop-shadow-md">{selectedLeader.role}</h3>
                {selectedLeader.name && <p className="text-brand-orange font-bold uppercase tracking-wider text-sm">{selectedLeader.name}</p>}
              </div>
            </div>

            {/* Right Content / Bio */}
            <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto space-y-6">
              <div className="space-y-3">
                <div className="hidden md:block">
                  <h3 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">{selectedLeader.role}</h3>
                  {selectedLeader.name && <p className="text-brand-orange font-bold uppercase tracking-wider text-sm mt-1">{selectedLeader.name}</p>}
                </div>
                <div className="w-16 h-1 bg-brand-green rounded-full" />
              </div>

              <div className="space-y-4 text-white/80 leading-relaxed text-sm sm:text-base flex-1 overflow-y-auto pr-2">
                {selectedLeader.fullBio?.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold px-6 py-2.5 rounded-full cursor-pointer transition-colors text-xs uppercase tracking-wider"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
