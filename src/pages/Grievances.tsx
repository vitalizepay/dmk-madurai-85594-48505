import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MessageSquare, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Upload,
  Camera,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Grievance {
  id: string;
  category: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'rejected';
  createdAt: string;
  location?: string;
  photoUrl?: string;
  submittedBy: string;
}

const mockGrievances: Grievance[] = [
  {
    id: '1',
    category: 'Roads',
    subject: 'Pothole repair needed',
    description: 'Large potholes on Gandhi Street causing traffic issues and vehicle damage.',
    status: 'in_progress',
    createdAt: '2024-01-15T10:30:00Z',
    location: 'Gandhi Street, Ward 19',
    submittedBy: 'Raman Kumar'
  },
  {
    id: '2',
    category: 'Water Supply',
    subject: 'Low water pressure',
    description: 'Inconsistent water supply in Nehru Road area for the past week.',
    status: 'open',
    createdAt: '2024-01-14T15:45:00Z',
    location: 'Nehru Road, Ward 19',
    submittedBy: 'Priya Devi'
  },
  {
    id: '3',
    category: 'Street Lights',
    subject: 'Broken street light',
    description: 'Street light pole damaged, creating safety concern for evening commuters.',
    status: 'resolved',
    createdAt: '2024-01-10T08:20:00Z',
    location: 'Anna Street, Ward 61',
    submittedBy: 'Kumar Selvam'
  }
];

const categories = [
  'Roads', 'Water Supply', 'Street Lights', 'Drainage', 'Garbage Collection', 
  'Public Transport', 'Healthcare', 'Education', 'Other'
];

export const Grievances: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    location: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.subject || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Grievance submitted successfully",
    });
    
    setFormData({ category: '', subject: '', description: '', location: '' });
    setShowForm(false);
  };

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
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
          {t('grievance.title')}
        </h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
            {t('grievance.new')}
          </span>
        </Button>
      </div>

      {/* New Grievance Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              <MessageSquare className="h-5 w-5" />
              {t('voice.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                  {t('voice.category')} *
                </label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                  {t('voice.subject')} *
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of the issue..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                  {t('voice.description')} *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the problem..."
                  rows={4}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location or use GPS..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                  {t('voice.attachment')}
                </label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                    {t('voice.submit')}
                  </span>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                    {t('action.cancel')}
                  </span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Grievances List */}
      <div className="space-y-4">
        {mockGrievances.map((grievance) => (
          <Card key={grievance.id} className="hover:shadow-md smooth-transition">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {grievance.category}
                    </Badge>
                    <Badge className={getStatusColor(grievance.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(grievance.status)}
                        <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                          {t(`grievance.status.${grievance.status}`)}
                        </span>
                      </div>
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-2">
                    {grievance.subject}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {grievance.description}
                  </p>
                  
                  {grievance.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {grievance.location}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {grievance.submittedBy}</span>
                    <span>{formatDate(grievance.createdAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockGrievances.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className={`text-muted-foreground ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              No grievances submitted yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};