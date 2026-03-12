import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  Star,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'practice-areas' | 'attorneys' | 'case-results' | 'contact';

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string, id: Page }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Practice Areas', id: 'practice-areas' },
    { name: 'Attorneys', id: 'attorneys' },
    { name: 'Case Results', id: 'case-results' },
    { name: 'Contact', id: 'contact' },
  ];

  const isTransparent = currentPage === 'home' && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent py-6' : 'bg-navy py-3 shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Scale className="h-8 w-8 text-gold mr-2" />
            <span className="text-white font-serif text-xl font-bold tracking-tight">
              ANDERSON <span className="text-gold">&</span> COLE
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold ${currentPage === link.id ? 'text-gold' : 'text-white/90'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-gold hover:bg-gold-light text-navy px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-all"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-4 text-base font-medium ${currentPage === link.id ? 'text-gold' : 'text-white'}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setCurrentPage('contact');
                  setIsOpen(false);
                }}
                className="w-full bg-gold text-navy font-bold py-3 mt-4 rounded-sm"
              >
                Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <footer className="bg-navy text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <Scale className="h-8 w-8 text-gold mr-2" />
              <span className="font-serif text-xl font-bold tracking-tight">
                ANDERSON <span className="text-gold">&</span> COLE
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Providing aggressive and compassionate legal representation for over 25 years. We stand by our clients when it matters most.
            </p>
            <div className="flex space-x-4">
              <Award className="h-6 w-6 text-gold opacity-50" />
              <ShieldCheck className="h-6 w-6 text-gold opacity-50" />
              <Star className="h-6 w-6 text-gold opacity-50" />
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-gold transition-colors">Home</button></li>
              <li><button onClick={() => setCurrentPage('practice-areas')} className="hover:text-gold transition-colors">Practice Areas</button></li>
              <li><button onClick={() => setCurrentPage('attorneys')} className="hover:text-gold transition-colors">Our Attorneys</button></li>
              <li><button onClick={() => setCurrentPage('case-results')} className="hover:text-gold transition-colors">Case Results</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-gold">Practice Areas</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>Personal Injury</li>
              <li>Family Law</li>
              <li>Criminal Defense</li>
              <li>Business Litigation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-gold">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold mr-3 shrink-0" />
                <span>123 Justice Plaza, Suite 500<br />Chicago, IL 60601</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold mr-3 shrink-0" />
                <span>(312) 555-0199</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold mr-3 shrink-0" />
                <span>contact@andersoncole.law</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Anderson & Cole Law Firm. All Rights Reserved. Attorney Advertising.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/law-office-hero/1920/1080" 
            alt="Law office" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Anderson & Cole Law Firm</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8 max-w-3xl">
              Experienced Legal Representation When It <span className="italic text-gold">Matters Most</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              We provide sophisticated legal solutions for complex challenges. Our record of success speaks for our commitment to justice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-gold hover:bg-gold-light text-navy font-bold px-8 py-4 rounded-sm transition-all flex items-center justify-center group"
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setCurrentPage('practice-areas')}
                className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-sm transition-all"
              >
                Our Practice Areas
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Practice Areas</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-navy/60 max-w-2xl mx-auto">
              We specialize in multiple disciplines to provide comprehensive legal support for our clients' diverse needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: 'Personal Injury', desc: 'Fighting for the compensation you deserve after an accident.' },
              { icon: Users, title: 'Family Law', desc: 'Compassionate guidance through divorce, custody, and more.' },
              { icon: Scale, title: 'Criminal Defense', desc: 'Aggressive defense for your rights and your future.' },
              { icon: Briefcase, title: 'Business Law', desc: 'Strategic legal counsel for businesses of all sizes.' },
            ].map((area, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 border border-navy/5 bg-navy/[0.02] hover:bg-white hover:shadow-xl transition-all group"
              >
                <area.icon className="h-12 w-12 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-serif font-bold mb-4">{area.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-6">{area.desc}</p>
                <button 
                  onClick={() => setCurrentPage('practice-areas')}
                  className="text-gold font-bold text-xs uppercase tracking-widest flex items-center"
                >
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorney Intro */}
      <section className="py-24 bg-navy text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 z-0"></div>
              <img 
                src="https://picsum.photos/seed/robert-anderson/800/1000" 
                alt="Lead Attorney" 
                className="relative z-10 w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Meet Our Leadership</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Decades of Proven Excellence</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Founded by Robert Anderson and Sarah Cole, our firm has built a reputation for excellence in the courtroom and at the negotiating table. We believe every client deserves a champion who is both skilled and dedicated.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-gold mr-3" />
                  <span>Top 100 Trial Lawyers in America</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-gold mr-3" />
                  <span>Over $500 Million Recovered for Clients</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-gold mr-3" />
                  <span>AV Preeminent Peer Review Rated</span>
                </li>
              </ul>
              <button 
                onClick={() => setCurrentPage('attorneys')}
                className="bg-gold hover:bg-gold-light text-navy font-bold px-8 py-4 rounded-sm transition-all"
              >
                View Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Results Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Recent Case Victories</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { amount: '$12.5 Million', type: 'Personal Injury', detail: 'Settlement for commercial trucking accident victim.' },
              { amount: '$4.2 Million', type: 'Business Litigation', detail: 'Verdict for breach of contract in tech sector.' },
              { amount: '$2.8 Million', type: 'Medical Malpractice', detail: 'Recovery for surgical error negligence.' },
            ].map((result, i) => (
              <div key={i} className="bg-navy p-10 text-center border-b-4 border-gold">
                <div className="text-gold text-3xl font-serif font-bold mb-2">{result.amount}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest mb-4">{result.type}</div>
                <p className="text-white/80 text-sm italic">"{result.detail}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('case-results')}
              className="text-navy font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors"
            >
              View More Case Results
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy/[0.02] border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Client Testimonials</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: 'Michael Thompson', text: 'Anderson & Cole took a very stressful situation and handled it with incredible professionalism. They fought for me when I couldn\'t fight for myself.' },
              { name: 'Elena Rodriguez', text: 'The level of communication and dedication from Sarah Cole was unmatched. I felt heard and supported throughout my entire case.' },
            ].map((t, i) => (
              <div key={i} className="relative p-12 bg-white shadow-sm italic">
                <span className="absolute top-4 left-4 text-gold/20 text-8xl font-serif">"</span>
                <p className="relative z-10 text-navy/80 text-lg mb-6 leading-relaxed">
                  {t.text}
                </p>
                <div className="font-bold text-navy">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-6">Ready to Discuss Your Case?</h2>
          <p className="text-navy/80 text-lg mb-10 max-w-2xl mx-auto">
            Contact us today for a free, confidential consultation. Our attorneys are ready to help you navigate your legal journey.
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-navy text-white hover:bg-navy/90 font-bold px-10 py-4 rounded-sm transition-all uppercase tracking-widest"
          >
            Get Your Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

const PracticeAreasPage = () => {
  const areas = [
    {
      title: 'Personal Injury',
      image: 'https://picsum.photos/seed/legal-injury/800/600',
      description: 'If you have been injured due to someone else\'s negligence, you deserve justice. We handle complex personal injury cases including motor vehicle accidents, workplace injuries, and wrongful death.',
      services: ['Car & Truck Accidents', 'Slip and Fall', 'Medical Malpractice', 'Product Liability', 'Workplace Injuries']
    },
    {
      title: 'Family Law',
      image: 'https://picsum.photos/seed/legal-family/800/600',
      description: 'Navigating family transitions requires both legal expertise and emotional intelligence. We provide compassionate representation for divorce, child custody, and asset division.',
      services: ['Divorce & Separation', 'Child Custody & Support', 'Alimony', 'Prenuptial Agreements', 'Adoption']
    },
    {
      title: 'Criminal Defense',
      image: 'https://picsum.photos/seed/legal-defense/800/600',
      description: 'Your freedom and reputation are at stake. We provide aggressive defense against state and federal charges, ensuring your constitutional rights are protected at every stage.',
      services: ['DUI & Traffic Offenses', 'Drug Crimes', 'White Collar Crimes', 'Theft & Burglary', 'Assault & Battery']
    },
    {
      title: 'Business Law',
      image: 'https://picsum.photos/seed/legal-business/800/600',
      description: 'We serve as strategic partners for businesses, providing counsel on formation, contracts, and litigation. We help you minimize risk so you can focus on growth.',
      services: ['Business Formation', 'Contract Disputes', 'Employment Law', 'Intellectual Property', 'Mergers & Acquisitions']
    }
  ];

  return (
    <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold mb-6">Our Practice Areas</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-navy/60 max-w-3xl mx-auto text-lg leading-relaxed">
            Anderson & Cole Law Firm offers a broad range of legal services. Our attorneys bring specialized knowledge to each case, ensuring high-quality representation across diverse legal disciplines.
          </p>
        </div>

        <div className="space-y-24">
          {areas.map((area, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              <div className="lg:w-1/2">
                <img 
                  src={area.image} 
                  alt={area.title} 
                  className="w-full h-[400px] object-cover shadow-2xl rounded-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-serif font-bold mb-6 text-navy">{area.title}</h2>
                <p className="text-navy/70 text-lg mb-8 leading-relaxed italic">
                  {area.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {area.services.map((service, j) => (
                    <div key={j} className="flex items-center text-navy/90">
                      <ChevronRight className="h-4 w-4 text-gold mr-2" />
                      <span className="text-sm font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AttorneysPage = () => {
  const attorneys = [
    {
      name: 'Robert Anderson',
      role: 'Founding Partner',
      image: 'https://picsum.photos/seed/attorney-robert/800/1000',
      bio: 'With over 30 years of experience, Robert specializes in high-stakes business litigation and personal injury.',
      education: 'Harvard Law School, J.D.'
    },
    {
      name: 'Sarah Cole',
      role: 'Founding Partner',
      image: 'https://picsum.photos/seed/attorney-sarah/800/1000',
      bio: 'Sarah is a renowned expert in family law and mediation, known for her compassionate yet firm approach.',
      education: 'Yale Law School, J.D.'
    },
    {
      name: 'James Wilson',
      role: 'Senior Associate',
      image: 'https://picsum.photos/seed/attorney-james/800/1000',
      bio: 'James leads our criminal defense department, bringing aggressive advocacy to every case.',
      education: 'University of Chicago Law, J.D.'
    },
    {
      name: 'Emily Chen',
      role: 'Senior Associate',
      image: 'https://picsum.photos/seed/attorney-emily/800/1000',
      bio: 'Emily specializes in corporate law and intellectual property, helping startups protect their assets.',
      education: 'Stanford Law School, J.D.'
    }
  ];

  return (
    <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold mb-6">Our Attorneys</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-navy/60 max-w-3xl mx-auto text-lg leading-relaxed">
            Our team consists of highly skilled legal professionals dedicated to achieving the best possible outcomes for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {attorneys.map((attorney, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white border border-navy/5 shadow-sm overflow-hidden group"
            >
              <div className="h-80 overflow-hidden">
                <img 
                  src={attorney.image} 
                  alt={attorney.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-1">{attorney.name}</h3>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">{attorney.role}</p>
                <p className="text-navy/70 text-sm mb-4 leading-relaxed">{attorney.bio}</p>
                <div className="pt-4 border-t border-navy/5 text-xs text-navy/50 italic">
                  {attorney.education}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CaseResultsPage = () => {
  const cases = [
    {
      amount: '$12,500,000',
      title: 'Commercial Trucking Accident',
      category: 'Personal Injury',
      description: 'A multi-million dollar settlement for a client who sustained permanent injuries in a collision with a commercial vehicle.'
    },
    {
      amount: '$4,200,000',
      title: 'Tech Sector Breach of Contract',
      category: 'Business Law',
      description: 'A successful jury verdict for a software company against a major corporation for breach of a licensing agreement.'
    },
    {
      amount: '$2,800,000',
      title: 'Surgical Malpractice Recovery',
      category: 'Medical Malpractice',
      description: 'Compensation secured for a patient who suffered life-altering complications due to a preventable surgical error.'
    },
    {
      amount: '$1,500,000',
      title: 'Wrongful Termination Settlement',
      category: 'Employment Law',
      description: 'Settlement reached for a senior executive who was unlawfully terminated following a whistleblower report.'
    },
    {
      amount: 'Not Guilty',
      title: 'Federal White Collar Defense',
      category: 'Criminal Defense',
      description: 'Full acquittal for a client facing federal charges of wire fraud and money laundering.'
    },
    {
      amount: '$950,000',
      title: 'Premises Liability Settlement',
      category: 'Personal Injury',
      description: 'Recovery for a client injured due to unsafe conditions at a major retail establishment.'
    }
  ];

  return (
    <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold mb-6">Case Results</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-navy/60 max-w-3xl mx-auto text-lg leading-relaxed">
            While every case is unique and past results do not guarantee future outcomes, our record demonstrates our commitment to securing justice for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="bg-white border border-navy/10 p-8 hover:shadow-xl transition-all border-t-4 border-t-gold">
              <div className="text-navy font-serif text-3xl font-bold mb-2">{c.amount}</div>
              <div className="text-gold text-xs font-bold uppercase tracking-widest mb-6">{c.category}</div>
              <h3 className="text-lg font-bold mb-4">{c.title}</h3>
              <p className="text-navy/70 text-sm leading-relaxed italic">"{c.description}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold mb-6">Contact Us</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-navy/60 max-w-3xl mx-auto text-lg leading-relaxed">
            Take the first step toward resolving your legal matter. Contact us for a free, confidential consultation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <div className="bg-navy text-white p-12 rounded-sm shadow-2xl">
              <h2 className="text-3xl font-serif font-bold mb-8 text-gold">Request a Consultation</h2>
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 p-8 text-center rounded-sm"
                >
                  <CheckCircle2 className="h-16 w-16 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Received</h3>
                  <p className="text-white/70">Thank you for reaching out. An attorney will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/60">Full Name</label>
                      <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/60">Email Address</label>
                      <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/60">Phone Number</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/60">Practice Area</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option className="bg-navy">Personal Injury</option>
                      <option className="bg-navy">Family Law</option>
                      <option className="bg-navy">Criminal Defense</option>
                      <option className="bg-navy">Business Law</option>
                      <option className="bg-navy">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/60">Message</label>
                    <textarea rows={4} required className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-4 rounded-sm transition-all uppercase tracking-widest">
                    Send Request
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-6 flex items-center">
                  <MapPin className="h-6 w-6 text-gold mr-3" /> Office Location
                </h3>
                <p className="text-navy/70 mb-6 leading-relaxed">
                  Our office is conveniently located in the heart of downtown Chicago, accessible by public transportation and with nearby parking available.
                </p>
                <div className="w-full h-80 bg-navy/5 border border-navy/10 rounded-sm flex items-center justify-center relative overflow-hidden group">
                  <img 
                    src="https://picsum.photos/seed/chicago-city-map/800/600" 
                    alt="Map Placeholder" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 text-center p-8">
                    <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
                    <p className="font-bold text-navy">123 Justice Plaza, Suite 500</p>
                    <p className="text-navy/60 text-sm">Chicago, IL 60601</p>
                    <button className="mt-4 text-gold text-xs font-bold uppercase tracking-widest border-b border-gold">Get Directions</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-serif font-bold mb-4 flex items-center">
                    <Phone className="h-5 w-5 text-gold mr-3" /> Call Us
                  </h3>
                  <p className="text-navy/70 text-sm">(312) 555-0199</p>
                  <p className="text-navy/40 text-xs mt-1">Available 24/7 for emergencies</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-4 flex items-center">
                    <Mail className="h-5 w-5 text-gold mr-3" /> Email Us
                  </h3>
                  <p className="text-navy/70 text-sm">contact@andersoncole.law</p>
                  <p className="text-navy/70 text-sm">consult@andersoncole.law</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'practice-areas': return <PracticeAreasPage />;
      case 'attorneys': return <AttorneysPage />;
      case 'case-results': return <CaseResultsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
