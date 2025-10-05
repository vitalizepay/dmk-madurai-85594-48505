import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import dmkSymbol from '@/assets/dmk-symbol-new.png';
import { Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img 
            src={dmkSymbol} 
            alt="DMK Symbol" 
            className="h-10 w-10"
          />
          <div className="flex flex-col">
            <h1 className={`text-lg font-bold leading-tight ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              {language === 'ta' ? 'தி.மு.க' : 'DMK'}
            </h1>
            <p className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              {language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore'}
            </p>
          </div>
        </div>

        {/* Language Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">
            {language === 'ta' ? 'English' : 'தமிழ்'}
          </span>
        </Button>
      </div>
    </header>
  );
};