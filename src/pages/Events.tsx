import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, MapPin, Users, Plus, Clock, User, Phone, Share, CreditCard as Edit, Trash2, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Search, Filter, Download, Upload, Camera, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  title_ta: string;
  description: string;
  description_ta: string;
  date: string;
  time: string;
  venue: string;
  venue_ta: string;
  organizer: string;
  organizer_phone: string;
  category: 'meeting' | 'rally' | 'campaign' | 'social' | 'training';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  expectedAttendance: number;
  actualAttendance?: number;
  booth?: string;
  ward?: string;
  constituency: string;
  priority: 'high' | 'medium' | 'low';
  createdBy: string;
  createdAt: string;
  imageUrl?: string;
  requirements?: string[];
  rsvpRequired: boolean;
  rsvpCount?: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Ward 19 Voter Meeting',
    title_ta: 'வார்டு 19 வாக்காளர் கூட்டம்',
    description: 'Monthly meeting with voters to discuss local issues and upcoming initiatives.',
    description_ta: 'உள்ளூர் பிரச்சினைகள் மற்றும் வரவிருக்கும் முன்முயற்சிகளைப் பற்றி விவாதிக்க வாக்காளர்களுடன் மாதாந்திர கூட்டம்.',
    date: '2024-01-20',
    time: '18:00',
    venue: 'Community Hall, Ramanathapuram',
    venue_ta: 'சமுதாய மண்டபம், ராமநாதபுரம்',
    organizer: 'Raman Kumar',
    organizer_phone: '+91 98765 43210',
    category: 'meeting',
    status: 'upcoming',
    expectedAttendance: 150,
    booth: 'B-1901',
    ward: 'Ward 19',
    constituency: 'Coimbatore South',
    priority: 'high',
    createdBy: 'Admin',
    createdAt: '2024-01-15T10:30:00Z',
    requirements: ['Microphone', 'Chairs', 'Water'],
    rsvpRequired: true,
    rsvpCount: 89
  },
  {
    id: '2',
    title: 'Youth Wing Training Program',
    title_ta: 'இளைஞர் பிரிவு பயிற்சி திட்டம்',
    description: 'Leadership training program for young party members and volunteers.',
    description_ta: 'இளம் கட்சி உறுப்பினர்கள் மற்றும் தன்னார்வலர்களுக்கான தலைமைத்துவ பயிற்சி திட்டம்.',
    date: '2024-01-22',
    time: '09:00',
    venue: 'DMK Office, Singanallur',
    venue_ta: 'தி.மு.க அலுவலகம், சிங்காநல்லூர்',
    organizer: 'Priya Devi',
    organizer_phone: '+91 87654 32109',
    category: 'training',
    status: 'upcoming',
    expectedAttendance: 50,
    constituency: 'Coimbatore North',
    priority: 'medium',
    createdBy: 'Youth Coordinator',
    createdAt: '2024-01-12T14:20:00Z',
    requirements: ['Projector', 'Training Materials', 'Refreshments'],
    rsvpRequired: true,
    rsvpCount: 32
  },
  {
    id: '3',
    title: 'Road Development Rally',
    title_ta: 'சாலை மேம்பாட்டு பேரணி',
    description: 'Public rally demanding better road infrastructure in the constituency.',
    description_ta: 'தொகுதியில் சிறந்த சாலை உள்கட்டமைப்பை கோரி பொதுப் பேரணி.',
    date: '2024-01-18',
    time: '16:00',
    venue: 'Gandhi Maidan',
    venue_ta: 'காந்தி மைதான்',
    organizer: 'Kumar Selvam',
    organizer_phone: '+91 76543 21098',
    category: 'rally',
    status: 'completed',
    expectedAttendance: 500,
    actualAttendance: 650,
    constituency: 'Coimbatore South',
    priority: 'high',
    createdBy: 'District Secretary',
    createdAt: '2024-01-10T11:45:00Z',
    requirements: ['Sound System', 'Banners', 'Security'],
    rsvpRequired: false
  },
  {
    id: '4',
    title: 'Women Empowerment Workshop',
    title_ta: 'பெண்கள் அதிகாரமளித்தல் பட்டறை',
    description: 'Workshop on women empowerment and skill development programs.',
    description_ta: 'பெண்கள் அதிகாரமளித்தல் மற்றும் திறன் மேம்பாட்டு திட்டங்கள் குறித்த பட்டறை.',
    date: '2024-01-25',
    time: '10:00',
    venue: 'Women\'s College Auditorium',
    venue_ta: 'பெண்கள் கல்லூரி அரங்கம்',
    organizer: 'Lakshmi Narayanan',
    organizer_phone: '+91 76543 21098',
    category: 'social',
    status: 'upcoming',
    expectedAttendance: 200,
    constituency: 'Coimbatore North',
    priority: 'medium',
    createdBy: 'Women Wing Head',
    createdAt: '2024-01-13T16:10:00Z',
    requirements: ['Registration Desk', 'Certificates', 'Lunch'],
    rsvpRequired: true,
    rsvpCount: 156
  },
  {
    id: '5',
    title: 'Door-to-Door Campaign',
    title_ta: 'வீடு வீடாக பிரச்சாரம்',
    description: 'Systematic door-to-door campaign to connect with voters and understand their concerns.',
    description_ta: 'வாக்காளர்களுடன் தொடர்பு கொள்ளவும் அவர்களின் கவலைகளைப் புரிந்து கொள்ளவும் முறையான வீடு வீடாக பிரச்சாரம்.',
    date: '2024-01-21',
    time: '08:00',
    venue: 'Multiple Locations',
    venue_ta: 'பல இடங்கள்',
    organizer: 'Muthu Krishnan',
    organizer_phone: '+91 65432 10987',
    category: 'campaign',
    status: 'upcoming',
    expectedAttendance: 30,
    booth: 'B-6101',
    ward: 'Ward 61',
    constituency: 'Coimbatore North',
    priority: 'high',
    createdBy: 'Booth Agent',
    createdAt: '2024-01-14T12:30:00Z',
    requirements: ['Pamphlets', 'Volunteer Badges', 'Water Bottles'],
    rsvpRequired: false
  }
];

const eventCategories = [
  { key: 'all', label: 'All Events', icon: Calendar },
  { key: 'meeting', label: 'Meetings', icon: Users },
  { key: 'rally', label: 'Rallies', icon: Users },
  { key: 'campaign', label: 'Campaigns', icon: Users },
  { key: 'social', label: 'Social', icon: Users },
  { key: 'training', label: 'Training', icon: Users }
];

export const Events: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedConstituency, setSelectedConstituency] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<'upcoming' | 'all' | 'completed'>('upcoming');
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    title_ta: '',
    description: '',
    description_ta: '',
    date: '',
    time: '',
    venue: '',
    venue_ta: '',
    organizer: '',
    organizer_phone: '',
    category: 'meeting' as Event['category'],
    expectedAttendance: 50,
    constituency: '',
    priority: 'medium' as Event['priority'],
    rsvpRequired: false
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'ta' && (
        event.title_ta.includes(searchTerm) ||
        event.venue_ta.includes(searchTerm)
      ));
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesConstituency = selectedConstituency === 'all' || event.constituency === selectedConstituency;
    
    const matchesViewMode = 
      viewMode === 'all' ||
      (viewMode === 'upcoming' && (event.status === 'upcoming' || event.status === 'ongoing')) ||
      (viewMode === 'completed' && event.status === 'completed');
    
    return matchesSearch && matchesCategory && matchesStatus && matchesConstituency && matchesViewMode;
  });

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-muted text-muted-foreground border-muted';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: Event['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted';
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.venue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Created",
      description: `${newEvent.title} has been scheduled successfully`,
    });
    
    setNewEvent({
      title: '',
      title_ta: '',
      description: '',
      description_ta: '',
      date: '',
      time: '',
      venue: '',
      venue_ta: '',
      organizer: '',
      organizer_phone: '',
      category: 'meeting',
      expectedAttendance: 50,
      constituency: '',
      priority: 'medium',
      rsvpRequired: false
    });
    setShowCreateDialog(false);
  };

  const handleEventAction = (action: string, eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    
    switch (action) {
      case 'edit':
        setSelectedEvent(event || null);
        break;
      case 'delete':
        toast({
          title: "Event Deleted",
          description: `${event?.title} has been deleted`,
        });
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: event?.title,
            text: `${event?.description}\n\nDate: ${event?.date}\nVenue: ${event?.venue}`,
            url: window.location.href
          });
        }
        break;
      case 'call_organizer':
        window.open(`tel:${event?.organizer_phone}`, '_self');
        break;
      case 'navigate':
        // Open Google Maps for venue
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event?.venue || '')}`;
        window.open(mapsUrl, '_blank');
        break;
      case 'mark_attendance':
        toast({
          title: "Attendance Marked",
          description: "Attendance has been recorded for this event",
        });
        break;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const uniqueConstituencies = [...new Set(mockEvents.map(e => e.constituency))];

  const getEventStats = () => {
    const total = filteredEvents.length;
    const upcoming = filteredEvents.filter(e => e.status === 'upcoming').length;
    const completed = filteredEvents.filter(e => e.status === 'completed').length;
    const totalExpectedAttendance = filteredEvents.reduce((sum, e) => sum + e.expectedAttendance, 0);
    
    return { total, upcoming, completed, totalExpectedAttendance };
  };

  const stats = getEventStats();

  return (
    <div className="container px-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
            {t('event.title')}
          </h1>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                  {t('event.new')}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new event
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title (English) *</label>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Event title in English"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title (Tamil)</label>
                    <Input
                      value={newEvent.title_ta}
                      onChange={(e) => setNewEvent({ ...newEvent, title_ta: e.target.value })}
                      placeholder="Event title in Tamil"
                      className="font-tamil"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Venue (English) *</label>
                    <Input
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                      placeholder="Event venue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Venue (Tamil)</label>
                    <Input
                      value={newEvent.venue_ta}
                      onChange={(e) => setNewEvent({ ...newEvent, venue_ta: e.target.value })}
                      placeholder="Event venue in Tamil"
                      className="font-tamil"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Organizer</label>
                    <Input
                      value={newEvent.organizer}
                      onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                      placeholder="Organizer name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Organizer Phone</label>
                    <Input
                      value={newEvent.organizer_phone}
                      onChange={(e) => setNewEvent({ ...newEvent, organizer_phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={newEvent.category} onValueChange={(value) => setNewEvent({ ...newEvent, category: value as Event['category'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="rally">Rally</SelectItem>
                        <SelectItem value="campaign">Campaign</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <Select value={newEvent.priority} onValueChange={(value) => setNewEvent({ ...newEvent, priority: value as Event['priority'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Attendance</label>
                    <Input
                      type="number"
                      value={newEvent.expectedAttendance}
                      onChange={(e) => setNewEvent({ ...newEvent, expectedAttendance: parseInt(e.target.value) || 0 })}
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Constituency</label>
                  <Select value={newEvent.constituency} onValueChange={(value) => setNewEvent({ ...newEvent, constituency: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select constituency" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueConstituencies.map(constituency => (
                        <SelectItem key={constituency} value={constituency}>{constituency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>
                  Create Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">
              <Clock className="h-4 w-4 mr-2" />
              Upcoming ({stats.upcoming})
            </TabsTrigger>
            <TabsTrigger value="all">
              <Calendar className="h-4 w-4 mr-2" />
              All ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="completed">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed ({stats.completed})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events by title or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {eventCategories.map((category) => (
              <Button 
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className="whitespace-nowrap"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedConstituency} onValueChange={setSelectedConstituency}>
              <SelectTrigger>
                <SelectValue placeholder="All Constituencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Constituencies</SelectItem>
                {uniqueConstituencies.map(constituency => (
                  <SelectItem key={constituency} value={constituency}>{constituency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Events</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{stats.upcoming}</div>
              <div className="text-xs text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{stats.completed}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-info">{stats.totalExpectedAttendance}</div>
              <div className="text-xs text-muted-foreground">Expected Attendance</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg smooth-transition">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className={`text-lg ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                      {language === 'ta' && event.title_ta ? event.title_ta : event.title}
                    </CardTitle>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                    <Badge className={getPriorityColor(event.priority)}>
                      {event.priority}
                    </Badge>
                  </div>
                  
                  <p className={`text-sm text-muted-foreground mb-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                    {language === 'ta' && event.description_ta ? event.description_ta : event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.date)} at {formatTime(event.time)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {language === 'ta' && event.venue_ta ? event.venue_ta : event.venue}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.actualAttendance || event.expectedAttendance} attendees
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(event)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Organizer Info */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.organizer}</p>
                    <p className="text-xs text-muted-foreground">Organizer</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEventAction('call_organizer', event.id)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <span className="ml-2 capitalize">{event.category}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Constituency:</span>
                  <span className="ml-2">{event.constituency}</span>
                </div>
                {event.booth && (
                  <div>
                    <span className="text-muted-foreground">Booth:</span>
                    <span className="ml-2">{event.booth}</span>
                  </div>
                )}
                {event.ward && (
                  <div>
                    <span className="text-muted-foreground">Ward:</span>
                    <span className="ml-2">{event.ward}</span>
                  </div>
                )}
              </div>

              {/* RSVP Info */}
              {event.rsvpRequired && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">RSVP Required</p>
                      <p className="text-xs text-blue-600">
                        {event.rsvpCount || 0} / {event.expectedAttendance} confirmed
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Notify
                    </Button>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {event.requirements && event.requirements.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-1">
                    {event.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEventAction('navigate', event.id)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEventAction('share', event.id)}
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                {event.status === 'ongoing' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEventAction('mark_attendance', event.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Attendance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={`text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              No events found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};