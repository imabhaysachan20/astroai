"use client"
import React, { useState } from 'react';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import HowItWorks from './components/landing/HowItWorks';
import Testimonials from './components/landing/Testimonials';
import Pricing from './components/landing/Pricing';
import Trust from './components/landing/Trust';
import StickyButton from './components/landing/StickyButton';
import WizardForm from './components/WizardForm';

function App() {
 const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return <WizardForm />;
  }

  return (
    <div className="min-h-screen">
      <Hero setShowWizard={setShowWizard}/>
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Trust />
      <StickyButton />
      
      
    </div>
  );
}

export default App;