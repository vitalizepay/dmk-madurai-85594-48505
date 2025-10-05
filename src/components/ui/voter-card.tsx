import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  MoreVertical, 
  Phone, 
  Camera, 
  UserPlus, 
  Edit, 
  FileText,
  MessageCircle,
  CheckCircle,
  Users
} from 'lucide-react';

export interface VoterData {
  id: string;
  epicId: string;
  firstName: string;
  lastName?: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  phone?: string;
  address: string;
  boothNumber: string;
  tags: string[];
  photoUrl?: string;
  isVoted?: boolean;
}

interface VoterCardProps {
  voter: VoterData;
  onAction: (action: string, voterId: string) => void;
}

const tagColors: Record<string, string> = {
  'supporter': 'bg-success/10 text-success border-success/20',
  'member': 'bg-primary/10 text-primary border-primary/20',
  'postal_voter': 'bg-info/10 text-info border-info/20',
  'senior_citizen': 'bg-warning/10 text-warning border-warning/20',
  'disabled': 'bg-purple-100 text-purple-800 border-purple-200',
  'dead': 'bg-destructive/10 text-destructive border-destructive/20',
};

export const VoterCard: React.FC<VoterCardProps> = ({ voter, onAction }) => {
  const { language, t } = useLanguage();
  
  const getInitials = (firstName: string, lastName?: string) => {
    return `${firstName[0]}${lastName ? lastName[0] : ''}`.toUpperCase();
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'M': return '👨';
      case 'F': return '👩';
      default: return '👤';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md smooth-transition">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={voter.photoUrl} alt={`${voter.firstName} photo`} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(voter.firstName, voter.lastName)}
            </AvatarFallback>
          </Avatar>

          {/* Voter Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className={`font-semibold text-sm truncate ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
                  {voter.firstName} {voter.lastName}
                  <span className="ml-2">{getGenderIcon(voter.gender)}</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  {voter.epicId} • Age {voter.age}
                </p>
              </div>
              
              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onAction('attach_mobile', voter.id)}>
                    <Phone className="mr-2 h-4 w-4" />
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t('action.attach_mobile')}
                    </span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onAction('attach_photo', voter.id)}>
                    <Camera className="mr-2 h-4 w-4" />
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t('action.attach_photo')}
                    </span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onAction('convert_member', voter.id)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t('action.convert_member')}
                    </span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => onAction('send_slip', voter.id)}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t('action.send_slip')}
                    </span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onAction('send_whatsapp', voter.id)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t('action.send_whatsapp')}
                    </span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => onAction('mark_voted', voter.id)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t('action.mark_voted')}
                    </span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onAction('edit', voter.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t('action.edit')}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Phone */}
            {voter.phone && (
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{voter.phone}</span>
              </div>
            )}

            {/* Address */}
            <p className={`text-xs text-muted-foreground mb-3 ${language === 'ta' ? 'font-tamil' : 'font-inter'}`}>
              {voter.address}
            </p>

            {/* Tags */}
            {voter.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {voter.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className={`text-xs ${tagColors[tag] || 'bg-muted/50'}`}
                  >
                    <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                      {t(`tag.${tag}`) || tag}
                    </span>
                  </Badge>
                ))}
              </div>
            )}

            {/* Voted Status */}
            {voter.isVoted && (
              <Badge variant="default" className="bg-success text-success-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span className={language === 'ta' ? 'font-tamil' : 'font-inter'}>
                  Voted
                </span>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};