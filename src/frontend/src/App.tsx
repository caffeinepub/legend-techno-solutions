import { useEffect, useState } from 'react';
import Header from './components/site/Header';
import Footer from './components/site/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import RatingsSection from './components/sections/RatingsSection';
import AdminPage from './pages/AdminPage';
import CookieConsentBanner from './components/site/CookieConsentBanner';
import { Toaster } from '@/components/ui/sonner';
import { useGetSiteContent } from './hooks/useSiteContent';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const { data: siteContent } = useGetSiteContent();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove leading #
      // Normalize hash: remove trailing slashes and handle variations
      const normalizedHash = hash.replace(/\/+$/, '');
      
      if (normalizedHash === '/admin') {
        setCurrentView('admin');
      } else {
        // Any other hash (including empty, unknown routes) goes to home
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentView === 'admin') {
    return (
      <>
        <AdminPage />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection
          heading={siteContent?.heroHeading}
          subheading={siteContent?.heroSubheading}
        />
        <ServicesSection
          heading={siteContent?.servicesHeading}
          description={siteContent?.servicesDescription}
        />
        <AboutSection
          heading={siteContent?.aboutHeading}
          description={siteContent?.aboutDescription}
        />
        <ContactSection
          heading={siteContent?.contactHeading}
          subheading={siteContent?.contactSubheading}
          businessHours={siteContent?.businessHours}
        />
        <RatingsSection />
      </main>
      <Footer />
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

export default App;
