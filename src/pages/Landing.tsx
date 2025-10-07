import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import candidateHero from "@/assets/candidate-hero.jpg";
import heroBg1 from "@/assets/hero-bg-1.png";
import heroBg2 from "@/assets/hero-bg-2.png";
import dmkSymbol from "@/assets/dmk-symbol-new.png";
import leaderImage from "@/assets/leader-namaste-new.png";
import { useNavigate } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Landing = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgrounds = [candidateHero, heroBg1, heroBg2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    // Generate guest ID and store locally
    const guestId = crypto.randomUUID();
    localStorage.setItem('guestId', guestId);
    
    // Enter app in guest mode (no authentication required)
    navigate('/app');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen hero backgrounds with fade animation */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <img
            key={index}
            src={bg}
            alt={`DMK Coimbatore Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              currentBg === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
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
          
          {/* Right side: Language Toggle + Social Links */}
          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
              className="bg-white/95 backdrop-blur-sm hover:bg-white font-tamil shadow-lg"
            >
              {language === 'ta' ? 'English' : 'தமிழ்'}
            </Button>
            
            {/* Social Media Links */}
            <div className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/dmkcoimbatore/profilecard/?igsh=MTF1cjVxYm81aDdmZw=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 backdrop-blur-sm hover:bg-white p-2 rounded-lg shadow-lg transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
              </a>
              
              <a
                href="https://whatsapp.com/channel/0029VaAHapBD38CU6FrPhu2r"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 backdrop-blur-sm hover:bg-white p-2 rounded-lg shadow-lg transition-all hover:scale-110"
              >
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              
              <a
                href="https://www.facebook.com/DMKKOVAI/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 backdrop-blur-sm hover:bg-white p-2 rounded-lg shadow-lg transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
              </a>
            </div>
          </div>
        </header>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom section with title, leader image and login button */}
        <div className="p-6 md:p-8 pb-8 space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-tamil drop-shadow-2xl">
              {language === 'ta' ? 'தி.மு.க' : 'DMK'}
            </h1>
            <p className="text-2xl md:text-3xl text-white/95 font-tamil drop-shadow-2xl font-semibold">
              {language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore'}
            </p>
          </div>

          {/* Leader Image with Glow Effect */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-dmk-red via-dmk-black to-dmk-red rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse"></div>
              <div className="relative">
                <img 
                  src={leaderImage} 
                  alt="DMK Leaders"
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl shadow-2xl ring-4 ring-white/20 transform transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-dmk-red/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Login Button - Large and Prominent */}
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full h-16 text-xl font-semibold dmk-gradient text-white shadow-2xl hover:shadow-dmk-red/50 transition-all duration-300 font-tamil hover:scale-105 transform"
          >
            {language === 'ta' ? 'உள் நுழை' : 'Login'} / {language === 'ta' ? 'Login' : 'உள் நுழை'}
          </Button>
          
          <p className="text-center text-sm text-white/90 font-tamil drop-shadow">
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