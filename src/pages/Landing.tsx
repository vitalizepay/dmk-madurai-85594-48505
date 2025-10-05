import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import leaderImage from "@/assets/leader-namaste-new.png";
import dmkSymbol from "@/assets/dmk-symbol-new.png";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy login - redirect to app
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/5 flex flex-col">
      {/* Header with Language Toggle */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center gap-3">
          <img 
            src={dmkSymbol} 
            alt="DMK Symbol" 
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold text-primary font-tamil">
              {language === 'ta' ? 'தி.மு.க' : 'DMK'}
            </h1>
            <p className="text-sm text-muted-foreground font-tamil">
              {language === 'ta' ? 'மதுரை' : 'Madurai'}
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="font-tamil"
        >
          {language === 'ta' ? 'English' : 'தமிழ்'}
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 text-center">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 font-tamil">
            {t('landing.welcome')}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-tamil">
            {t('landing.subtitle')}
          </p>
        </div>

        {/* Leader Image */}
        <div className="relative mb-8">
          <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-white">
            <img
              src={leaderImage}
              alt="Party Leader"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Login Button */}
        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            size="lg"
            className="px-8 py-6 text-lg font-semibold dmk-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 font-tamil"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {t('auth.login')}
          </Button>
          
          <p className="text-sm text-muted-foreground font-tamil">
            {t('landing.loginMessage')}
          </p>
        </div>

        {/* Party Motto */}
        <div className="mt-12 max-w-md">
          <blockquote className="text-center border-l-4 border-primary pl-4 italic">
            <p className="text-muted-foreground font-tamil">
              {language === 'ta' 
                ? '"கலைஞர் கனவு, மணிமாறன் உழைப்பு"' 
                : '"Kalaignar\'s dream, Manimaran\'s work"'
              }
            </p>
          </blockquote>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center border-t">
        <p className="text-sm text-muted-foreground font-tamil">
          {language === 'ta' 
            ? '© 2024 தி.மு.க மதுரை। அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
            : '© 2024 DMK Madurai. All rights reserved.'
          }
        </p>
      </footer>
    </div>
  );
};

export default Landing;