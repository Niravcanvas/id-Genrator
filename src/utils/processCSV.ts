import { IDCardData } from '@/types';
import { generateQRCode } from './generateQR';

/**
 * Process CSV text and convert to ID card data
 */
export async function processCSV(csvText: string): Promise<IDCardData[]> {
  const lines = csvText.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV file is empty or invalid');
  }

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  // Validate required columns
  const requiredColumns = ['name', 'email', 'role', 'company', 'phone'];
  const missingColumns = requiredColumns.filter(col => !headers.includes(col));
  
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  // Process data rows
  const cards: IDCardData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    const values = line.split(',').map(v => v.trim());
    
    // Create participant object
    const participant: Record<string, string> = {};
    headers.forEach((header, index) => {
      participant[header] = values[index] || '';
    });

    // Generate participant ID
    const participantId = `PART-${String(i).padStart(4, '0')}`;

    // Generate QR code data
    const qrData = JSON.stringify({
      name: participant.name,
      email: participant.email,
      role: participant.role,
      company: participant.company,
      phone: participant.phone,
      id: participantId
    });

    const qrCodeDataURL = await generateQRCode(qrData);

    // Add to cards array
    cards.push({
      name: participant.name,
      email: participant.email,
      role: participant.role,
      company: participant.company,
      phone: participant.phone,
      participantId,
      qrCodeDataURL
    });
  }

  return cards;
}

/**
 * Alias for backward compatibility
 */
export const parseCSV = processCSV;