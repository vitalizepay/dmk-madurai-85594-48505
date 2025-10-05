import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, Chrome as Home, UserCheck, Search, MoveVertical as MoreVertical, Eye, Navigation, Phone, Calendar, TrendingUp, Filter, Download, Share, RefreshCw, Map } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { GoogleMap } from '@/components/ui/google-map';

// Enhanced booth data with more details
const mockBooths = [
  {
    id: 'B-1901',
    number: 'B-1901',
    location: 'Govt Hr Sec School, Ramanathapuram',
    location_ta: 'அரசு மேல்நிலைப் பள்ளி, ராமநாதபுரம்',
    ward: 'Ward 19',
    ward_ta: 'வார்டு 19',
    constituency: 'Coimbatore South',
    constituency_ta: 'மதுரை தெற்கு',
    totalVoters: 987,
    totalDoors: 234,
    totalMembers: 156,
    supporters: 89,
    coverage: 67,
    lat: 10.998,
    lng: 76.987,
    incharge: 'Raman Kumar',
    incharge_phone: '+91 98765 43210',
    lastUpdated: '2024-01-15T10:30:00Z',
    status: 'active',
    facilities: ['Parking', 'Wheelchair Access', 'Water'],
    recentActivity: [
      { type: 'member_added', count: 5, date: '2024-01-15' },
      { type: 'door_to_door', count: 23, date: '2024-01-14' }
    ]
  },
  {
    id: 'B-1902',
    number: 'B-1902',
    location: 'Nehru Matric School',
    location_ta: 'நேரு மெட்ரிக் பள்ளி',
    ward: 'Ward 19',
    ward_ta: 'வார்டு 19',
    constituency: 'Coimbatore South',
    constituency_ta: 'மதுரை தெற்கு',
    totalVoters: 1124,
    totalDoors: 287,
    totalMembers: 201,
    supporters: 145,
    coverage: 85,
    lat: 11.001,
    lng: 76.990,
    incharge: 'Priya Devi',
    incharge_phone: '+91 87654 32109',
    lastUpdated: '2024-01-16T14:20:00Z',
    status: 'active',
    facilities: ['Parking', 'Water', 'Restroom'],
    recentActivity: [
      { type: 'member_added', count: 8, date: '2024-01-16' },
      { type: 'grievance_resolved', count: 2, date: '2024-01-15' }
    ]
  },
  {
    id: 'B-6101',
    number: 'B-6101',
    location: 'PUPS Singanallur',
    location_ta: 'PUPS சிங்காநல்லூர்',
    ward: 'Ward 61',
    ward_ta: 'வார்டு 61',
    constituency: 'Coimbatore North',
    constituency_ta: 'மதுரை வடக்கு',
    totalVoters: 756,
    totalDoors: 189,
    totalMembers: 98,
    supporters: 67,
    coverage: 52,
    lat: 11.003,
    lng: 77.012,
    incharge: 'Kumar Selvam',
    incharge_phone: '+91 76543 21098',
    lastUpdated: '2024-01-14T09:15:00Z',
    status: 'needs_attention',
    facilities: ['Water'],
    recentActivity: [
      { type: 'door_to_door', count: 15, date: '2024-01-14' }
    ]
  }
];

export const Booths: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [selectedBooth, setSelectedBooth] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredBooths = mockBooths.filter(booth => {
    const matchesSearch = 
      booth.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booth.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'ta' && booth.location_ta.includes(searchTerm));
    
    const matchesConstituency = selectedConstituency === '' || booth.constituency === selectedConstituency;
    
    return matchesSearch && matchesConstituency;
  });

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'text-success';
    if (coverage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'needs_attention': return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const handleBoothAction = (action: string, boothId: string) => {
    const booth = mockBooths.find(b => b.id === boothId);
    
    switch (action) {
      case 'navigate':
        // Open Google Maps
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${booth?.lat},${booth?.lng}`;
        window.open(mapsUrl, '_blank');
        break;
      case 'call_incharge':
        window.open(`tel:${booth?.incharge_phone}`, '_self');
        break;
      case 'view_voters':
        window.location.href = `/app/voters?booth=${boothId}`;
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: `Booth ${booth?.number}`,
            text: `${booth?.location} - ${booth?.totalVoters} voters`,
            url: window.location.href
          });
        }
        break;
      case 'refresh':
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Data Refreshed",
            description: "Booth data has been updated",
          });
        }, 1000);
        break;
    }
  };

  const uniqueConstituencies = [...new Set(mockBooths.map(b => b.constituency))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container px-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
            {t('booth.title')}
          </h1>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Users className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
            >
              <Map className="h-4 w-4 mr-2" />
              Map
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBoothAction('refresh', '')}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`${t('common.search')} ${t('booth.number')} or ${t('booth.location')}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={selectedConstituency === '' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedConstituency('')}
            >
              All Constituencies
            </Button>
            {uniqueConstituencies.map((constituency) => (
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

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{filteredBooths.length}</div>
              <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                Total Booths
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {filteredBooths.reduce((sum, booth) => sum + booth.totalVoters, 0)}
              </div>
              <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                Total Voters
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {filteredBooths.reduce((sum, booth) => sum + booth.totalMembers, 0)}
              </div>
              <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                Total Members
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-info">
                {Math.round(filteredBooths.reduce((sum, booth) => sum + booth.coverage, 0) / filteredBooths.length)}%
              </div>
              <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                Avg Coverage
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map or List View */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <div className="h-[500px] rounded-lg overflow-hidden border">
            <GoogleMap
              center={{
                lat: filteredBooths.length > 0 ? filteredBooths[0].lat : 9.9252,
                lng: filteredBooths.length > 0 ? filteredBooths[0].lng : 78.1198
              }}
              zoom={12}
              markers={filteredBooths.map(booth => ({
                position: { lat: booth.lat, lng: booth.lng },
                title: `${booth.number} - ${booth.location}`,
                info: `
                  <div class="p-2">
                    <h3 class="font-semibold">${booth.number}</h3>
                    <p class="text-sm text-gray-600">${booth.location}</p>
                    <p class="text-xs text-gray-500">${booth.totalVoters} voters • ${booth.coverage}% coverage</p>
                    <p class="text-xs text-gray-500">In-charge: ${booth.incharge}</p>
                  </div>
                `
              }))}
            />
          </div>
          
          {/* Map Legend */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Active Booths</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Needs Attention</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Inactive</span>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* Booth Cards */
        <div className="space-y-4">
        {filteredBooths.map((booth) => (
          <Card key={booth.id} className="overflow-hidden hover:shadow-lg smooth-transition">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-semibold">
                        {booth.number}
                      </CardTitle>
                      <Badge className={getStatusColor(booth.status)}>
                        {booth.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className={`text-sm text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                      {language === 'ta' ? booth.location_ta : booth.location}
                    </p>
                    <p className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                      {language === 'ta' ? booth.constituency_ta : booth.constituency} • {language === 'ta' ? booth.ward_ta : booth.ward}
                    </p>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => handleBoothAction('view_voters', booth.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Voters
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handleBoothAction('navigate', booth.id)}>
                      <Navigation className="mr-2 h-4 w-4" />
                      Navigate
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handleBoothAction('call_incharge', booth.id)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call In-charge
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => handleBoothAction('share', booth.id)}>
                      <Share className="mr-2 h-4 w-4" />
                      Share Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* In-charge Info */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{booth.incharge}</p>
                  <p className="text-xs text-muted-foreground">Booth In-charge</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBoothAction('call_incharge', booth.id)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center space-y-1">
                  <Users className="h-5 w-5 text-primary mx-auto" />
                  <p className="text-xl font-bold">{booth.totalVoters}</p>
                  <p className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    Voters
                  </p>
                </div>
                
                <div className="text-center space-y-1">
                  <Home className="h-5 w-5 text-secondary mx-auto" />
                  <p className="text-xl font-bold">{booth.totalDoors}</p>
                  <p className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    Doors
                  </p>
                </div>
                
                <div className="text-center space-y-1">
                  <UserCheck className="h-5 w-5 text-success mx-auto" />
                  <p className="text-xl font-bold">{booth.totalMembers}</p>
                  <p className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    Members
                  </p>
                </div>
                
                <div className="text-center space-y-1">
                  <TrendingUp className="h-5 w-5 text-warning mx-auto" />
                  <p className="text-xl font-bold">{booth.supporters}</p>
                  <p className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    Supporters
                  </p>
                </div>
              </div>
              
              {/* Coverage Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    {t('booth.coverage')}
                  </span>
                  <span className={`text-sm font-bold ${getCoverageColor(booth.coverage)}`}>
                    {booth.coverage}%
                  </span>
                </div>
                <Progress value={booth.coverage} className="h-2" />
              </div>
              
              {/* Facilities */}
              <div className="flex flex-wrap gap-1">
                {booth.facilities.map((facility, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
              
              {/* Last Updated */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last updated: {formatDate(booth.lastUpdated)}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBoothAction('view_voters', booth.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {/* Empty State */}
      {filteredBooths.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={`text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              No booths found matching your search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};