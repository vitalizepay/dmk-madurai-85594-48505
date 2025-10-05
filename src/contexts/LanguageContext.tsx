import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ta' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ta: {
    // App Title
    'app.title': 'தி.மு.க - மதுரை',
    'app.subtitle': 'மதுரை மாவட்ட நிர்வாக செயலி',
    
    // Landing Page
    'landing.welcome': 'வணக்கம்!',
    'landing.subtitle': 'மதுரை மாவட்ட நிர்வாக செயலி',
    'landing.loginMessage': 'தொடர உள்நுழையவும்',
    
    // Authentication
    'auth.login': 'உள்நுழைய',
    'auth.logout': 'வெளியேறு',
    
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.booths': 'வாக்குச் சாவடிகள்',
    'nav.voters': 'வாக்காளர்கள்',
    'nav.grievances': 'புகார்கள்',
    'nav.events': 'நிகழ்வுகள்',
    'nav.news': 'செய்திகள்',
    'nav.profile': 'சுயவிவரம்',
    
    // Home Page
    'home.welcome': 'வரவேற்கிறோம்',
    'home.dashboard': 'முகப்பு பக்கம்',
    'home.quick_stats': 'விரைவு புள்ளிவிவரங்கள்',
    
    // Stats Cards
    'stats.total_voters': 'மொத்த வாக்காளர்கள்',
    'stats.total_members': 'மொத்த உறுப்பினர்கள்',
    'stats.booths': 'வாக்குச் சாவடிகள்',
    'stats.pending_grievances': 'நிலுவை புகார்கள்',
    'stats.upcoming_events': 'வரவிருக்கும் நிகழ்வுகள்',
    
    // Booth Management
    'booth.title': 'வாக்குச் சாவடி நிர்வாகம்',
    'booth.number': 'சாவடி எண்',
    'booth.location': 'இடம்',
    'booth.total_doors': 'மொத்த வீடுகள்',
    'booth.total_voters': 'மொத்த வாக்காளர்கள்',
    'booth.members': 'உறுப்பினர்கள்',
    'booth.coverage': 'கவரேஜ்',
    
    // Voter Management
    'voter.name': 'பெயர்',
    'voter.epic_id': 'வாக்காளர் அட்டை எண்',
    'voter.phone': 'தொலைபேசி',
    'voter.address': 'முகவரி',
    'voter.status': 'நிலை',
    'voter.tags': 'குறிச்சொற்கள்',
    
    // Tags
    'tag.supporter': 'ஆதரவாளர்',
    'tag.member': 'உறுப்பினர்',
    'tag.postal_voter': 'அஞ்சல் வாக்காளர்',
    'tag.senior_citizen': 'மூத்த குடிமகன்',
    'tag.disabled': 'மாற்றுத்திறனாளி',
    
    // Actions
    'action.attach_mobile': 'மொபைல் இணைக்க',
    'action.attach_photo': 'புகைப்படம் இணைக்க',
    'action.convert_member': 'உறுப்பினராக மாற்ற',
    'action.send_slip': 'சீட்டு அனுப்ப',
    'action.send_whatsapp': 'WhatsApp செய்தி',
    'action.mark_voted': 'வாக்களித்ததாக குறிக்க',
    'action.edit': 'திருத்த',
    'action.delete': 'நீக்க',
    'action.save': 'சேமிக்க',
    'action.cancel': 'ரத்து செய்',
    
    // Grievances
    'grievance.title': 'புகார் நிர்வாகம்',
    'grievance.new': 'புதிய புகார்',
    'grievance.category': 'வகை',
    'grievance.description': 'விளக்கம்',
    'grievance.status.open': 'திறந்தது',
    'grievance.status.in_progress': 'நடைபெறுகிறது',
    'grievance.status.resolved': 'தீர்க்கப்பட்டது',
    'grievance.status.rejected': 'நிராகரிக்கப்பட்டது',
    
    // Events
    'event.title': 'நிகழ்வு நிர்வாகம்',
    'event.new': 'புதிய நிகழ்வு',
    'event.date': 'தேதி',
    'event.venue': 'இடம்',
    'event.description': 'விளக்கம்',
    'event.attendance': 'வருகை',
    
    // Share Voice
    'voice.title': 'உங்கள் குரலைப் பகிருங்கள்',
    'voice.category': 'வகை',
    'voice.subject': 'பொருள்',
    'voice.description': 'விளக்கம்',
    'voice.attachment': 'இணைப்பு',
    'voice.submit': 'சமர்ப்பிக்க',
    
    // Common
    'common.search': 'தேடுக',
    'common.filter': 'வடிகட்ட',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை ஏற்பட்டது',
    'common.success': 'வெற்றிகரமாக முடிந்தது',
  },
  en: {
    // App Title
    'app.title': 'DMK - Madurai',
    'app.subtitle': 'Madurai District Management App',
    
    // Landing Page
    'landing.welcome': 'Welcome!',
    'landing.subtitle': 'Madurai District Management App',
    'landing.loginMessage': 'Please login to continue',
    
    // Authentication
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    
    // Navigation
    'nav.home': 'Home',
    'nav.booths': 'Booths',
    'nav.voters': 'Voters',
    'nav.grievances': 'Grievances',
    'nav.events': 'Events',
    'nav.news': 'News',
    'nav.profile': 'Profile',
    
    // Home Page
    'home.welcome': 'Welcome',
    'home.dashboard': 'Dashboard',
    'home.quick_stats': 'Quick Stats',
    
    // Stats Cards
    'stats.total_voters': 'Total Voters',
    'stats.total_members': 'Total Members',
    'stats.booths': 'Booths',
    'stats.pending_grievances': 'Pending Grievances',
    'stats.upcoming_events': 'Upcoming Events',
    
    // Booth Management
    'booth.title': 'Booth Management',
    'booth.number': 'Booth Number',
    'booth.location': 'Location',
    'booth.total_doors': 'Total Doors',
    'booth.total_voters': 'Total Voters',
    'booth.members': 'Members',
    'booth.coverage': 'Coverage',
    
    // Voter Management
    'voter.name': 'Name',
    'voter.epic_id': 'Voter ID',
    'voter.phone': 'Phone',
    'voter.address': 'Address',
    'voter.status': 'Status',
    'voter.tags': 'Tags',
    
    // Tags
    'tag.supporter': 'Supporter',
    'tag.member': 'Member',
    'tag.postal_voter': 'Postal Voter',
    'tag.senior_citizen': 'Senior Citizen',
    'tag.disabled': 'Disabled',
    
    // Actions
    'action.attach_mobile': 'Attach Mobile',
    'action.attach_photo': 'Attach Photo',
    'action.convert_member': 'Convert to Member',
    'action.send_slip': 'Send Slip',
    'action.send_whatsapp': 'Send WhatsApp',
    'action.mark_voted': 'Mark as Voted',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    
    // Grievances
    'grievance.title': 'Grievance Management',
    'grievance.new': 'New Grievance',
    'grievance.category': 'Category',
    'grievance.description': 'Description',
    'grievance.status.open': 'Open',
    'grievance.status.in_progress': 'In Progress',
    'grievance.status.resolved': 'Resolved',
    'grievance.status.rejected': 'Rejected',
    
    // Events
    'event.title': 'Event Management',
    'event.new': 'New Event',
    'event.date': 'Date',
    'event.venue': 'Venue',
    'event.description': 'Description',
    'event.attendance': 'Attendance',
    
    // Share Voice
    'voice.title': 'Share Your Voice',
    'voice.category': 'Category',
    'voice.subject': 'Subject',
    'voice.description': 'Description',
    'voice.attachment': 'Attachment',
    'voice.submit': 'Submit',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Successfully completed',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ta');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ta']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};