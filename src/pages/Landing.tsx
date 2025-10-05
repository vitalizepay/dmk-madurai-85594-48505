import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import candidateHero from "@/assets/candidate-hero.jpg";
import dmkSymbol from "@/assets/dmk-symbol-new.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Generate guest ID and store locally
    const guestId = crypto.randomUUID();
    localStorage.setItem('guestId', guestId);
    
    // Enter app in guest mode (no authentication required)
    navigate('/app');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen hero background with candidate photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={candidateHero}
          alt="DMK Coimbatore Leader"
          className="w-full h-full object-cover object-center"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top overlays */}
        <header className="flex justify-between items-start p-4 md:p-6">
          {/* DMK Symbol - Top Left */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <img 
              src={dmkSymbol} 
              alt="DMK Symbol" 
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
          
          {/* Language Toggle - Top Right */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
            className="bg-white/95 backdrop-blur-sm hover:bg-white font-tamil shadow-lg"
          >
            {language === 'ta' ? 'English' : 'தமிழ்'}
          </Button>
        </header>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom section with title and login button */}
        <div className="p-6 md:p-8 pb-8 space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold text-white font-tamil drop-shadow-lg">
              {language === 'ta' ? 'தி.மு.க' : 'DMK'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-tamil drop-shadow-lg">
              {language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore'}
            </p>
          </div>

          {/* Login Button - Large and Prominent */}
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full h-16 text-xl font-semibold dmk-gradient text-white shadow-2xl hover:shadow-primary/50 transition-all duration-300 font-tamil"
          >
            {language === 'ta' ? 'உள் நுழை' : 'Login'} / {language === 'ta' ? 'Login' : 'உள் நுழை'}
          </Button>
          
          <p className="text-center text-sm text-white/80 font-tamil">
            {language === 'ta' 
              ? 'எந்த பதிவும் தேவையில்லை - உடனடியாக நுழையுங்கள்' 
              : 'No registration required - Enter instantly'
            }
          </p>
        </div>

        {/* Footer */}
        <footer className="p-4 text-center">
          <p className="text-xs text-white/70 font-tamil drop-shadow">
            {language === 'ta' 
              ? '© 2024 தி.மு.க கோயம்புத்தூர் • அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை'
              : '© 2024 DMK Coimbatore • All rights reserved'
            }
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;