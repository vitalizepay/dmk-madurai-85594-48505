import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  MapPin, 
  Users, 
  MessageSquare, 
  Calendar, 
  User,
  Newspaper
} from 'lucide-react';

const navItems = [
  { to: '/app/', icon: Home, key: 'nav.home' },
  { to: '/app/booths', icon: MapPin, key: 'nav.booths' },
  { to: '/app/voters', icon: Users, key: 'nav.voters' },
  { to: '/app/grievances', icon: MessageSquare, key: 'nav.grievances' },
  { to: '/app/events', icon: Calendar, key: 'nav.events' },
  { to: '/app/news', icon: Newspaper, key: 'nav.news' },
  { to: '/app/profile', icon: User, key: 'nav.profile' },
];

export const BottomNav: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className={`text-xs mt-1 truncate max-w-full ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              {t(key)}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};