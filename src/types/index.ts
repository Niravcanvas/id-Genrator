export interface Participant {
  name: string;
  email: string;
  role: string;
  company: string;
  phone: string;
  participantId?: string;
}

export interface IDCardData extends Participant {
  qrCodeDataURL: string;
}

export interface HackathonInfo {
  name: string;
  date: string;
  venue: string;
  logo?: string;
}