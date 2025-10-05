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
      {/* Fresh Modern Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-yellow-400" />
        
        {/* DMK Leader Image with overlay */}
        <img
          src={candidateHero}
          alt="DMK Leaders"
          className="w-full h-full object-cover object-center opacity-30"
        />
        
        {/* Pattern overlay for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        
        {/* Central gradient overlay for content focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Language Toggle - Fixed Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="bg-white/95 backdrop-blur-sm hover:bg-white font-tamil shadow-lg border-2 border-white/20"
        >
          {language === 'ta' ? 'English' : 'தமிழ்'}
        </Button>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center space-y-8">
          {/* DMK Symbol - Centered */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-yellow-400/50">
              <img 
                src={dmkSymbol} 
                alt="DMK Symbol" 
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </div>

          {/* Title Section - Centered */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-tamil drop-shadow-2xl">
              {language === 'ta' ? 'தி.மு.க' : 'DMK'}
            </h1>
            <div className="h-1 w-24 bg-yellow-400 mx-auto rounded-full"></div>
            <p className="text-2xl md:text-3xl text-yellow-200 font-tamil drop-shadow-lg font-medium">
              {language === 'ta' ? 'மதுரை' : 'Madurai'}
            </p>
            <p className="text-lg text-white/90 font-tamil drop-shadow">
              {language === 'ta' 
                ? 'மாவட்ட நிர்வாக செயலி' 
                : 'District Management App'
              }
            </p>
          </div>

          {/* Login Section - Centered */}
          <div className="space-y-4">
            <Button
              onClick={handleLogin}
              size="lg"
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 font-tamil border-2 border-yellow-400/30 rounded-xl"
            >
              {language === 'ta' ? 'உள் நுழை' : 'Enter App'}
            </Button>
            
            <p className="text-sm text-white/80 font-tamil bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
              {language === 'ta' 
                ? 'எந்த பதிவும் தேவையில்லை - உடனடியாக நுழையுங்கள்' 
                : 'No registration required - Enter instantly'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Fixed Bottom */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 p-4 text-center">
        <p className="text-xs text-white/70 font-tamil drop-shadow bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
          {language === 'ta' 
            ? '© 2024 தி.மு.க மதுரை • அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை'
            : '© 2024 DMK Madurai • All rights reserved'
          }
        </p>
      </footer>
    </div>
  );
};

export default Landing;