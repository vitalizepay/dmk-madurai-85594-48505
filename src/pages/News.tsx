import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Share2, 
  ExternalLink, 
  Heart,
  MessageCircle,
  Filter,
  Clock
} from 'lucide-react';

const mockNews = [
  {
    id: 1,
    title_ta: 'கோயம்புத்தூர் மாநகராட்சியில் புதிய சாலை திட்டங்கள் அறிவிப்பு',
    title_en: 'New road projects announced in Coimbatore Corporation',
    category: 'Infrastructure',
    category_ta: 'உள்கட்டமைப்பு',
    summary_ta: 'கோயம்புத்தூர் மாநகராட்சி எல்லையில் 50 கோடி ரூபாய் மதிப்பிலான புதிய சாலை மேம்பாட்டு திட்டங்கள் அறிவிக்கப்பட்டுள்ளன.',
    summary_en: 'New road development projects worth ₹50 crores announced within Coimbatore Corporation limits.',
    publishedAt: '2024-01-16T10:30:00Z',
    source: 'The Hindu Tamil',
    imageUrl: '/api/placeholder/400/200',
    likes: 234,
    comments: 45,
    ward: 'Multiple Wards',
    constituency: 'Coimbatore South'
  },
  {
    id: 2,
    title_ta: 'கோயம்புத்தூர் மாரியம்மன் கோவிலில் சிறப்பு அபிஷேகம்',
    title_en: 'Special abhishekam at Coimbatore Mariamman Temple',
    category: 'Religious',
    category_ta: 'மத சார்ந்த',
    summary_ta: 'கோயம்புத்தூர் மாரியம்மன் கோவிலில் மாசி மாத சிறப்பு அபிஷேகம் நடைபெற உள்ளது.',
    summary_en: 'Special Masi month abhishekam to be conducted at Coimbatore Mariamman Temple.',
    publishedAt: '2024-01-16T08:15:00Z',
    source: 'Dinamalar',
    imageUrl: '/api/placeholder/400/200',
    likes: 567,
    comments: 89,
    ward: 'Central Coimbatore',
    constituency: 'Coimbatore Central'
  },
  {
    id: 3,
    title_ta: 'கோயம்புத்தூர் கிழக்கு தொகுதியில் இலவச மருத்துவ முகாம்',
    title_en: 'Free medical camp in Coimbatore East constituency',
    category: 'Healthcare',
    category_ta: 'சுகாதாரம்',
    summary_ta: 'கோயம்புத்தூர் கிழக்கு தொகுதியில் இலவச மருத்துவ பரிசோதனை முகாம் நடத்தப்பட்டது.',
    summary_en: 'Free medical checkup camp conducted in Coimbatore East constituency.',
    publishedAt: '2024-01-15T16:45:00Z',
    source: 'Tamil Guardian',
    imageUrl: '/api/placeholder/400/200',
    likes: 123,
    comments: 23,
    ward: 'Ward 15',
    constituency: 'Coimbatore East'
  },
  {
    id: 4,
    title_ta: 'கோயம்புத்தூர் நொய்யல் நதி சுத்திகரிப்பு திட்டம் தொடக்கம்',
    title_en: 'Coimbatore Noyyal River cleanup project begins',
    category: 'Environment',
    category_ta: 'சுற்றுச்சூழல்',
    summary_ta: 'கோயம்புத்தூரில் நொய்யல் நதி சுத்திகரிப்பு மற்றும் அழகுபடுத்தும் திட்டம் தொடங்கப்பட்டுள்ளது.',
    summary_en: 'Noyyal River cleanup and beautification project launched in Coimbatore.',
    publishedAt: '2024-01-15T12:20:00Z',
    source: 'Deccan Chronicle',
    imageUrl: '/api/placeholder/400/200',
    likes: 445,
    comments: 67,
    ward: 'Multiple Wards',
    constituency: 'Multiple'
  }
];

export const News: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');

  const filteredNews = mockNews.filter(article => {
    const matchesSearch = 
      (language === 'ta' ? article.title_ta : article.title_en)
        .toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
    const matchesConstituency = selectedConstituency === '' || article.constituency === selectedConstituency;
    
    return matchesSearch && matchesCategory && matchesConstituency;
  });

  const categories = [...new Set(mockNews.map(article => article.category))];
  const constituencies = [...new Set(mockNews.map(article => article.constituency))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Infrastructure': 'bg-blue-500/10 text-blue-700',
      'Religious': 'bg-orange-500/10 text-orange-700',
      'Healthcare': 'bg-green-500/10 text-green-700',
      'Environment': 'bg-emerald-500/10 text-emerald-700',
      'Politics': 'bg-red-500/10 text-red-700',
      'Education': 'bg-purple-500/10 text-purple-700'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-700';
  };

  return (
    <div className="container px-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className={`text-2xl font-bold ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
          {language === 'ta' ? 'கோயம்புத்தூர் செய்திகள்' : 'Coimbatore News'}
        </h1>
        
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`${t('common.search')} news...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={selectedCategory === '' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button 
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={selectedConstituency === '' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedConstituency('')}
            >
              All Areas
            </Button>
            {constituencies.map((constituency) => (
              <Button 
                key={constituency}
                variant={selectedConstituency === constituency ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedConstituency(constituency)}
                className="whitespace-nowrap"
              >
                {constituency}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* News Articles */}
      <div className="space-y-4">
        {filteredNews.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg smooth-transition">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={article.imageUrl} 
                  alt={language === 'ta' ? article.title_ta : article.title_en}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-2/3">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(article.category)}>
                          {language === 'ta' ? article.category_ta : article.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {article.constituency}
                        </div>
                      </div>
                      
                      <CardTitle className={`text-lg leading-tight ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                        {language === 'ta' ? article.title_ta : article.title_en}
                      </CardTitle>
                      
                      <p className={`text-sm text-muted-foreground mt-2 line-clamp-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                        {language === 'ta' ? article.summary_ta : article.summary_en}
                      </p>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {article.source}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        {article.likes}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageCircle className="h-3 w-3" />
                        {article.comments}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={`text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              No news found matching your search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};