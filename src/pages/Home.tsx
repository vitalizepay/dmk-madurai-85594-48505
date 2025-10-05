import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MapPin, 
  MessageSquare, 
  Calendar,
  UserCheck,
  TrendingUp,
  Bell,
  Plus
} from 'lucide-react';

// Mock data - will be replaced with real data later
const mockStats = {
  totalVoters: 45678,
  totalMembers: 12456,
  totalBooths: 156,
  pendingGrievances: 23,
  upcomingEvents: 5,
  coverage: 78.5
};

const recentNews = [
  {
    id: 1,
    title_ta: 'மதுரை தெற்கு தொகுதியில் சாலை புனரமைப்பு பணிகள் தொடக்கம்',
    title_en: 'Road reconstruction work begins in Madurai South constituency',
    time: '2 hours ago'
  },
  {
    id: 2,
    title_ta: 'வார்டு 19: வாக்காளர் சந்திப்பு அறிவிப்பு',
    title_en: 'Ward 19: Voter meeting announcement',
    time: '5 hours ago'
  },
  {
    id: 3,
    title_ta: 'புதிய உறுப்பினர் சேர்க்கை முகாம்',
    title_en: 'New membership enrollment camp',
    time: '1 day ago'
  }
];

export const Home: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="container px-4 space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl dmk-gradient p-6 text-white">
        <div className="relative z-10">
          <h1 className={`text-2xl font-bold mb-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
            {t('home.welcome')} 🙏
          </h1>
          <p className={`text-white/90 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
            {t('home.dashboard')}
          </p>
        </div>
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-white/10" />
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
          {t('home.quick_stats')}
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title={t('stats.total_voters')}
            value={mockStats.totalVoters}
            icon={Users}
            variant="primary"
            description="Active voters in district"
          />
          
          <StatCard
            title={t('stats.total_members')}
            value={mockStats.totalMembers}
            icon={UserCheck}
            variant="secondary"
            trend={{ value: 12, label: 'this month', positive: true }}
          />
          
          <StatCard
            title={t('stats.booths')}
            value={mockStats.totalBooths}
            icon={MapPin}
            variant="success"
            description="Across 6 constituencies"
          />
          
          <StatCard
            title={t('stats.pending_grievances')}
            value={mockStats.pendingGrievances}
            icon={MessageSquare}
            variant="warning"
          />
          
          <StatCard
            title={t('stats.upcoming_events')}
            value={mockStats.upcomingEvents}
            icon={Calendar}
            variant="default"
          />
          
          <StatCard
            title={t('booth.coverage')}
            value={`${mockStats.coverage}%`}
            icon={TrendingUp}
            variant="primary"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => window.location.href = '/grievances'}
          >
            <Plus className="h-5 w-5" />
            <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
              {t('grievance.new')}
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => window.location.href = '/events'}
          >
            <Calendar className="h-5 w-5" />
            <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
              {t('event.new')}
            </span>
          </Button>
        </div>
      </div>

      {/* Recent News */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className={`text-lg ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
            Latest Updates
          </CardTitle>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          {recentNews.map((news) => (
            <div key={news.id} className="flex justify-between items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 smooth-transition">
              <div className="flex-1">
                <p className={`text-sm font-medium ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                  {language === 'ta' ? news.title_ta : news.title_en}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {news.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};