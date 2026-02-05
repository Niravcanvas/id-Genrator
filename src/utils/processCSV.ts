import Papa from 'papaparse';
import { Participant } from '@/types';

export function parseCSV(file: File): Promise<Participant[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const participants: Participant[] = results.data.map((row: any, index: number) => ({
            name: row.name || '',
            email: row.email || '',
            role: row.role || '',
            company: row.company || '',
            phone: row.phone || '',
            participantId: row.participantId || `PART-${String(index + 1).padStart(4, '0')}`,
          }));
          resolve(participants);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export function downloadCSVTemplate() {
  const template = `name,email,role,company,phone
John Doe,john@example.com,Developer,TechCorp,+1234567890
Jane Smith,jane@example.com,Designer,DesignCo,+0987654321`;

  const blob = new Blob([template], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'participants_template.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}