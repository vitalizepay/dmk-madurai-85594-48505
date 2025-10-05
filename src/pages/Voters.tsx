import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { VoterCard, VoterData } from '@/components/ui/voter-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Users, Download, Plus, UserPlus, Phone, MapPin, Calendar, TrendingUp, RefreshCw, Upload, FileText, ChartBar as BarChart3 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

// Enhanced voter data with more details
const mockVoters: VoterData[] = [
  {
    id: '1',
    epicId: 'TNC1234567',
    firstName: 'Raman',
    lastName: 'Kumar',
    age: 45,
    gender: 'M',
    phone: '+91 98765 43210',
    address: '123 Gandhi Street, Ramanathapuram, Coimbatore - 641002',
    boothNumber: 'B-1901',
    tags: ['supporter', 'member'],
    photoUrl: undefined,
    isVoted: false
  },
  {
    id: '2',
    epicId: 'TNC2345678',
    firstName: 'Priya',
    lastName: 'Devi',
    age: 38,
    gender: 'F',
    phone: '+91 87654 32109',
    address: '456 Nehru Road, Ramanathapuram, Coimbatore - 641002',
    boothNumber: 'B-1901',
    tags: ['postal_voter', 'senior_citizen'],
    photoUrl: undefined,
    isVoted: true
  },
  {
    id: '3',
    epicId: 'TNC3456789',
    firstName: 'Kumar',
    lastName: 'Selvam',
    age: 29,
    gender: 'M',
    phone: undefined,
    address: '789 Anna Street, Ramanathapuram, Coimbatore - 641002',
    boothNumber: 'B-1902',
    tags: ['supporter'],
    photoUrl: undefined,
    isVoted: false
  },
  {
    id: '4',
    epicId: 'TNC4567890',
    firstName: 'Lakshmi',
    lastName: 'Narayanan',
    age: 52,
    gender: 'F',
    phone: '+91 76543 21098',
    address: '321 Periyar Street, Singanallur, Coimbatore - 641005',
    boothNumber: 'B-6101',
    tags: ['member', 'senior_citizen'],
    photoUrl: undefined,
    isVoted: false
  },
  {
    id: '5',
    epicId: 'TNC5678901',
    firstName: 'Muthu',
    lastName: 'Krishnan',
    age: 34,
    gender: 'M',
    phone: '+91 65432 10987',
    address: '654 Kamaraj Road, Singanallur, Coimbatore - 641005',
    boothNumber: 'B-6101',
    tags: ['supporter', 'disabled'],
    photoUrl: undefined,
    isVoted: false
  },
  {
    id: '6',
    epicId: 'TNC6789012',
    firstName: 'Meera',
    lastName: 'Rajesh',
    age: 31,
    gender: 'F',
    phone: '+91 54321 09876',
    address: '987 Bharathi Street, Ramanathapuram, Coimbatore - 641002',
    boothNumber: 'B-1901',
    tags: ['member', 'supporter'],
    photoUrl: undefined,
    isVoted: false
  },
  {
    id: '7',
    epicId: 'TNC7890123',
    firstName: 'Suresh',
    lastName: 'Babu',
    age: 58,
    gender: 'M',
    phone: '+91 43210 98765',
    address: '654 Tilak Road, Singanallur, Coimbatore - 641005',
    boothNumber: 'B-6101',
    tags: ['senior_citizen', 'postal_voter'],
    photoUrl: undefined,
    isVoted: true
  },
  {
    id: '8',
    epicId: 'TNC8901234',
    firstName: 'Kavitha',
    lastName: 'Mohan',
    age: 42,
    gender: 'F',
    phone: '+91 32109 87654',
    address: '321 Subash Road, Ramanathapuram, Coimbatore - 641002',
    boothNumber: 'B-1902',
    tags: ['member'],
    photoUrl: undefined,
    isVoted: false
  }
];

const voterCategories = [
  { key: 'all', label: 'All Voters', count: mockVoters.length },
  { key: 'member', label: 'Members', count: mockVoters.filter(v => v.tags.includes('member')).length },
  { key: 'supporter', label: 'Supporters', count: mockVoters.filter(v => v.tags.includes('supporter')).length },
  { key: 'postal_voter', label: 'Postal Voters', count: mockVoters.filter(v => v.tags.includes('postal_voter')).length },
  { key: 'senior_citizen', label: 'Senior Citizens', count: mockVoters.filter(v => v.tags.includes('senior_citizen')).length },
  { key: 'no_phone', label: 'No Phone', count: mockVoters.filter(v => !v.phone).length },
  { key: 'voted', label: 'Voted', count: mockVoters.filter(v => v.isVoted).length }
];

export const Voters: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [ageRange, setAgeRange] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'analytics'>('cards');
  
  const filteredVoters = mockVoters.filter(voter => {
    const matchesSearch = 
      voter.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.epicId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.phone?.includes(searchTerm);
    
    const matchesBooth = selectedBooth === 'all' || voter.boothNumber === selectedBooth;
    
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'voted' && voter.isVoted) ||
      (selectedCategory === 'no_phone' && !voter.phone) ||
      voter.tags.includes(selectedCategory);
    
    const matchesGender = selectedGender === 'all' || voter.gender === selectedGender;
    
    const matchesAge = ageRange === 'all' || 
      (ageRange === '18-30' && voter.age >= 18 && voter.age <= 30) ||
      (ageRange === '31-50' && voter.age >= 31 && voter.age <= 50) ||
      (ageRange === '51+' && voter.age >= 51);
    
    return matchesSearch && matchesBooth && matchesCategory && matchesGender && matchesAge;
  });

  const handleVoterAction = (action: string, voterId: string) => {
    const voter = mockVoters.find(v => v.id === voterId);
    const actionName = t(`action.${action}`) || action;
    
    switch (action) {
      case 'attach_mobile':
        // Open phone input dialog
        const phone = prompt('Enter mobile number:');
        if (phone) {
          toast({
            title: "Mobile Attached",
            description: `Mobile ${phone} attached to ${voter?.firstName} ${voter?.lastName}`,
          });
        }
        break;
      case 'attach_photo':
        // Open camera or file picker
        toast({
          title: "Photo Capture",
          description: "Camera functionality will be available in mobile app",
        });
        break;
      case 'convert_member':
        toast({
          title: "Member Conversion",
          description: `${voter?.firstName} ${voter?.lastName} converted to member`,
        });
        break;
      case 'send_slip':
        toast({
          title: "Slip Sent",
          description: `Voter slip sent to ${voter?.firstName} ${voter?.lastName}`,
        });
        break;
      case 'send_whatsapp':
        if (voter?.phone) {
          const message = `Hello ${voter.firstName}, this is from DMK Coimbatore. Thank you for your support!`;
          const whatsappUrl = `https://wa.me/${voter.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        } else {
          toast({
            title: "No Phone Number",
            description: "Please attach a mobile number first",
            variant: "destructive"
          });
        }
        break;
      case 'mark_voted':
        toast({
          title: "Voting Status Updated",
          description: `${voter?.firstName} ${voter?.lastName} marked as voted`,
        });
        break;
      default:
        toast({
          title: "Action Executed",
          description: `${actionName} for ${voter?.firstName} ${voter?.lastName}`,
        });
    }
  };

  const handleBulkAction = (action: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bulk Action Completed",
        description: `${action} applied to ${filteredVoters.length} voters`,
      });
    }, 2000);
  };

  const uniqueBooths = [...new Set(mockVoters.map(v => v.boothNumber))];

  const getAnalytics = () => {
    const total = filteredVoters.length;
    const members = filteredVoters.filter(v => v.tags.includes('member')).length;
    const supporters = filteredVoters.filter(v => v.tags.includes('supporter')).length;
    const voted = filteredVoters.filter(v => v.isVoted).length;
    const withPhone = filteredVoters.filter(v => v.phone).length;
    const male = filteredVoters.filter(v => v.gender === 'M').length;
    const female = filteredVoters.filter(v => v.gender === 'F').length;
    
    return {
      total,
      members,
      supporters,
      voted,
      withPhone,
      male,
      female,
      membershipRate: total > 0 ? Math.round((members / total) * 100) : 0,
      phoneRate: total > 0 ? Math.round((withPhone / total) * 100) : 0,
      votingRate: total > 0 ? Math.round((voted / total) * 100) : 0
    };
  };

  const analytics = getAnalytics();

  return (
    <div className="container px-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
            {t('nav.voters')}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLoading(true)}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Sync
            </Button>
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">
              <Users className="h-4 w-4 mr-2" />
              Voter Cards
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4">
            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`${t('common.search')} ${t('voter.name')}, ${t('voter.epic_id')}, ${t('voter.phone')}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {voterCategories.map((category) => (
                  <Button 
                    key={category.key}
                    variant={selectedCategory === category.key ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory(category.key)}
                    className="whitespace-nowrap"
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-3 gap-2">
                <Select value={selectedBooth} onValueChange={setSelectedBooth}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Booths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Booths</SelectItem>
                    {uniqueBooths.map((booth) => (
                      <SelectItem key={booth} value={booth}>{booth}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={ageRange} onValueChange={setAgeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="18-30">18-30 years</SelectItem>
                    <SelectItem value="31-50">31-50 years</SelectItem>
                    <SelectItem value="51+">51+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{filteredVoters.length}</div>
                  <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    Total Results
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">
                    {filteredVoters.filter(v => v.tags.includes('member')).length}
                  </div>
                  <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    {t('stats.total_members')}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">
                    {filteredVoters.filter(v => v.isVoted).length}
                  </div>
                  <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    Voted
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-info">
                    {filteredVoters.filter(v => !v.phone).length}
                  </div>
                  <div className={`text-xs text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    No Phone
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bulk Actions */}
            {filteredVoters.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Bulk Actions ({filteredVoters.length} voters)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBulkAction('Send WhatsApp')}
                      disabled={isLoading}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Send WhatsApp
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBulkAction('Send Voter Slips')}
                      disabled={isLoading}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Send Slips
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleBulkAction('Mark as Members')}
                      disabled={isLoading}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Convert to Members
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Voter List */}
            <div className="space-y-4">
              {filteredVoters.map((voter) => (
                <VoterCard
                  key={voter.id}
                  voter={voter}
                  onAction={handleVoterAction}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredVoters.length === 0 && (
              <Card className="py-12">
                <CardContent className="text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className={`text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    No voters found matching your criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Overview Stats */}
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Voter Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{analytics.total}</div>
                      <div className="text-sm text-muted-foreground">Total Voters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">{analytics.members}</div>
                      <div className="text-sm text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-warning">{analytics.supporters}</div>
                      <div className="text-sm text-muted-foreground">Supporters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-info">{analytics.voted}</div>
                      <div className="text-sm text-muted-foreground">Voted</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Membership Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Membership Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Members</span>
                      <span className="font-bold">{analytics.membershipRate}%</span>
                    </div>
                    <Progress value={analytics.membershipRate} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {analytics.members} out of {analytics.total} voters
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Coverage */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Phone Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>With Phone</span>
                      <span className="font-bold">{analytics.phoneRate}%</span>
                    </div>
                    <Progress value={analytics.phoneRate} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {analytics.withPhone} out of {analytics.total} voters
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Voting Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Voting Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Voted</span>
                      <span className="font-bold">{analytics.votingRate}%</span>
                    </div>
                    <Progress value={analytics.votingRate} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {analytics.voted} out of {analytics.total} voters
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gender Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gender Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Male</span>
                        <span className="font-bold">{analytics.male}</span>
                      </div>
                      <Progress value={(analytics.male / analytics.total) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Female</span>
                        <span className="font-bold">{analytics.female}</span>
                      </div>
                      <Progress value={(analytics.female / analytics.total) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booth-wise Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Booth-wise Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {uniqueBooths.map(booth => {
                      const boothVoters = filteredVoters.filter(v => v.boothNumber === booth);
                      const percentage = (boothVoters.length / analytics.total) * 100;
                      return (
                        <div key={booth} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{booth}</span>
                            <span className="font-bold">{boothVoters.length}</span>
                          </div>
                          <Progress value={percentage} className="h-1" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};