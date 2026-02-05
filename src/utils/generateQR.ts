import QRCode from 'qrcode';
import { Participant } from '@/types';

export async function generateQRCode(data: Participant): Promise<string> {
  try {
    const qrData = JSON.stringify({
      name: data.name,
      email: data.email,
      role: data.role,
      company: data.company,
      phone: data.phone,
      participantId: data.participantId || `ID-${Date.now()}`,
    });

    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}