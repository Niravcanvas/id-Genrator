import { jsPDF } from 'jspdf';
import { IDCardData, HackathonInfo } from '@/types';

/**
 * Generate a vector-based PDF ID card (crisp at any zoom level)
 */
export const generateVectorPDF = async (
  data: IDCardData,
  hackathonInfo: HackathonInfo,
  fileName: string = 'id-card.pdf'
): Promise<void> => {
  // Create PDF with exact card dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [101.6, 165.1] // 400x650px at 96dpi = 101.6x165.1mm
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Card dimensions and padding
  const padding = 3;
  const contentWidth = pageWidth - (padding * 2);

  // Draw white background
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Draw black border
  pdf.setLineWidth(0.8);
  pdf.setDrawColor(0, 0, 0);
  pdf.rect(0, 0, pageWidth, pageHeight, 'S');

  let yPos = padding;

  // ===== HEADER SECTION =====
  const headerHeight = 38;
  
  // Black header background with gradient effect (simulate with rectangles)
  pdf.setFillColor(0, 0, 0);
  pdf.rect(0, 0, pageWidth, headerHeight, 'F');

  // Add decorative white corners
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(255, 255, 255);
  pdf.line(padding, padding, padding + 5, padding); // Top left horizontal
  pdf.line(padding, padding, padding, padding + 5); // Top left vertical
  pdf.line(pageWidth - padding, padding, pageWidth - padding - 5, padding); // Top right horizontal
  pdf.line(pageWidth - padding, padding, pageWidth - padding, padding + 5); // Top right vertical

  yPos = 6;

  // "Mahatma Education Society's"
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'normal');
  pdf.text("MAHATMA EDUCATION SOCIETY'S", pageWidth / 2, yPos, { align: 'center' });

  yPos += 4;

  // College name
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'bold');
  const collegeLine1 = "PILLAI HOC COLLEGE OF ENGINEERING";
  const collegeLine2 = "AND TECHNOLOGY, RASAYANI";
  pdf.text(collegeLine1, pageWidth / 2, yPos, { align: 'center' });
  yPos += 4;
  pdf.text(collegeLine2, pageWidth / 2, yPos, { align: 'center' });

  yPos += 3;

  // (Autonomous)
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'normal');
  pdf.text("(AUTONOMOUS)", pageWidth / 2, yPos, { align: 'center' });

  yPos += 4;

  // Separator line
  const lineWidth = contentWidth * 0.8;
  const lineX = (pageWidth - lineWidth) / 2;
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(0.1);
  pdf.line(lineX, yPos, lineX + lineWidth, yPos);

  yPos += 3;

  // Department
  pdf.setFontSize(6);
  pdf.setFont('helvetica', 'bold');
  pdf.text("DEPARTMENT OF COMPUTER ENGINEERING", pageWidth / 2, yPos, { align: 'center' });

  yPos += 4;

  // HACKOVERFLOW 4.0
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text("HACKOVERFLOW 4.0", pageWidth / 2, yPos, { align: 'center' });

  // White border at bottom of header
  pdf.setLineWidth(1);
  pdf.setDrawColor(255, 255, 255);
  pdf.line(0, headerHeight, pageWidth, headerHeight);

  yPos = headerHeight + 6;

  // ===== PARTICIPANT NAME CARD =====
  const nameCardX = padding + 3;
  const nameCardY = yPos;
  const nameCardWidth = contentWidth - 6;
  const nameCardHeight = 20;

  // Draw name card border
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(0, 0, 0);
  pdf.setFillColor(248, 248, 248);
  pdf.rect(nameCardX, nameCardY, nameCardWidth, nameCardHeight, 'FD');

  // "PARTICIPANT" label at top of card
  pdf.setFillColor(255, 255, 255);
  const labelWidth = 22;
  const labelX = nameCardX + 5;
  const labelY = nameCardY - 1;
  pdf.rect(labelX, labelY, labelWidth, 2, 'F');
  
  pdf.setFontSize(5);
  pdf.setTextColor(102, 102, 102);
  pdf.setFont('helvetica', 'bold');
  pdf.text("PARTICIPANT", labelX + labelWidth / 2, labelY + 1.5, { align: 'center' });

  // Participant name
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  const nameParts = data.name.toUpperCase().split(' ');
  const nameY = nameCardY + 8;
  
  if (nameParts.length > 2) {
    // Split long names across lines
    const line1 = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' ');
    const line2 = nameParts.slice(Math.ceil(nameParts.length / 2)).join(' ');
    pdf.text(line1, nameCardX + nameCardWidth / 2, nameY, { align: 'center', maxWidth: nameCardWidth - 4 });
    pdf.text(line2, nameCardX + nameCardWidth / 2, nameY + 5, { align: 'center', maxWidth: nameCardWidth - 4 });
  } else {
    pdf.text(data.name.toUpperCase(), nameCardX + nameCardWidth / 2, nameY + 2, { align: 'center', maxWidth: nameCardWidth - 4 });
  }

  // Role badge
  const roleText = data.role.toUpperCase();
  pdf.setFontSize(7);
  const roleWidth = pdf.getTextWidth(roleText) + 6;
  const roleX = nameCardX + 3;
  const roleY = nameCardY + nameCardHeight - 6;
  
  pdf.setFillColor(0, 0, 0);
  pdf.rect(roleX, roleY, roleWidth, 4, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.text(roleText, roleX + roleWidth / 2, roleY + 2.8, { align: 'center' });

  yPos = nameCardY + nameCardHeight + 6;

  // ===== DETAILS SECTION =====
  const detailsX = padding + 3;
  const detailsWidth = contentWidth - 6;
  const detailHeight = 7;
  const detailGap = 1.5;

  const details = [
    { label: 'COMPANY:', value: data.company },
    { label: 'EMAIL:', value: data.email },
    { label: 'PHONE:', value: data.phone },
    { label: 'ID:', value: data.participantId }
  ];

  details.forEach((detail, index) => {
    const detailY = yPos + (index * (detailHeight + detailGap));
    
    // Background
    pdf.setFillColor(250, 250, 250);
    pdf.setDrawColor(224, 224, 224);
    pdf.setLineWidth(0.2);
    pdf.rect(detailsX, detailY, detailsWidth, detailHeight, 'FD');

    // Label
    pdf.setTextColor(102, 102, 102);
    pdf.setFontSize(5.5);
    pdf.setFont('helvetica', 'bold');
    pdf.text(detail.label, detailsX + 2, detailY + 4);

    // Value
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(detail.label === 'EMAIL:' ? 5 : 6);
    pdf.setFont('helvetica', 'normal');
    const valueX = detailsX + 19;
    pdf.text(detail.value, valueX, detailY + 4, { maxWidth: detailsWidth - 21 });
  });

  yPos += (details.length * (detailHeight + detailGap)) + 5;

  // ===== QR CODE SECTION =====
  const qrSectionX = padding + 3;
  const qrSectionWidth = contentWidth - 6;
  const qrSectionHeight = 32;

  // QR section border
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(0, 0, 0);
  pdf.setFillColor(255, 255, 255);
  pdf.rect(qrSectionX, yPos, qrSectionWidth, qrSectionHeight, 'FD');

  // "SCAN FOR DETAILS" text
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(6);
  pdf.setFont('helvetica', 'bold');
  pdf.text("SCAN FOR DETAILS", pageWidth / 2, yPos + 4, { align: 'center' });

  // QR Code (as image - this is the only raster element, but small and crisp)
  const qrSize = 25;
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = yPos + 6;
  
  try {
    pdf.addImage(data.qrCodeDataURL, 'PNG', qrX, qrY, qrSize, qrSize);
  } catch (error) {
    console.error('Error adding QR code:', error);
  }

  yPos = pageHeight - 6;

  // ===== FOOTER =====
  const footerHeight = 5;
  const footerY = pageHeight - footerHeight;

  // Black footer background
  pdf.setFillColor(0, 0, 0);
  pdf.rect(0, footerY, pageWidth, footerHeight, 'F');

  // White top border
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(255, 255, 255);
  pdf.line(0, footerY, pageWidth, footerY);

  // Footer text
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(5.5);
  pdf.setFont('helvetica', 'bold');
  pdf.text("OFFICIAL PARTICIPANT ID CARD", pageWidth / 2, footerY + 3.5, { align: 'center' });

  // Save the PDF
  pdf.save(fileName);
};

/**
 * Generate multiple vector PDFs and zip them
 */
export const generateBulkVectorPDFs = async (
  cards: IDCardData[],
  hackathonInfo: HackathonInfo,
  baseFileName: string = 'id-cards',
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  for (let i = 0; i < cards.length; i++) {
    try {
      const card = cards[i];
      const fileName = `${card.name.replace(/\s+/g, '_')}_${card.participantId}.pdf`;

      // Create PDF with exact card dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [101.6, 165.1]
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const padding = 3;
      const contentWidth = pageWidth - (padding * 2);

      // Draw white background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Draw black border
      pdf.setLineWidth(0.8);
      pdf.setDrawColor(0, 0, 0);
      pdf.rect(0, 0, pageWidth, pageHeight, 'S');

      let yPos = padding;

      // ===== HEADER SECTION =====
      const headerHeight = 38;
      
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pageWidth, headerHeight, 'F');

      pdf.setLineWidth(0.5);
      pdf.setDrawColor(255, 255, 255);
      pdf.line(padding, padding, padding + 5, padding);
      pdf.line(padding, padding, padding, padding + 5);
      pdf.line(pageWidth - padding, padding, pageWidth - padding - 5, padding);
      pdf.line(pageWidth - padding, padding, pageWidth - padding, padding + 5);

      yPos = 6;

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(5);
      pdf.setFont('helvetica', 'normal');
      pdf.text("MAHATMA EDUCATION SOCIETY'S", pageWidth / 2, yPos, { align: 'center' });

      yPos += 4;

      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'bold');
      pdf.text("PILLAI HOC COLLEGE OF ENGINEERING", pageWidth / 2, yPos, { align: 'center' });
      yPos += 4;
      pdf.text("AND TECHNOLOGY, RASAYANI", pageWidth / 2, yPos, { align: 'center' });

      yPos += 3;

      pdf.setFontSize(5);
      pdf.setFont('helvetica', 'normal');
      pdf.text("(AUTONOMOUS)", pageWidth / 2, yPos, { align: 'center' });

      yPos += 4;

      const lineWidth = contentWidth * 0.8;
      const lineX = (pageWidth - lineWidth) / 2;
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(0.1);
      pdf.line(lineX, yPos, lineX + lineWidth, yPos);

      yPos += 3;

      pdf.setFontSize(6);
      pdf.setFont('helvetica', 'bold');
      pdf.text("DEPARTMENT OF COMPUTER ENGINEERING", pageWidth / 2, yPos, { align: 'center' });

      yPos += 4;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("HACKOVERFLOW 4.0", pageWidth / 2, yPos, { align: 'center' });

      pdf.setLineWidth(1);
      pdf.setDrawColor(255, 255, 255);
      pdf.line(0, headerHeight, pageWidth, headerHeight);

      yPos = headerHeight + 6;

      // ===== NAME CARD =====
      const nameCardX = padding + 3;
      const nameCardY = yPos;
      const nameCardWidth = contentWidth - 6;
      const nameCardHeight = 20;

      pdf.setLineWidth(0.5);
      pdf.setDrawColor(0, 0, 0);
      pdf.setFillColor(248, 248, 248);
      pdf.rect(nameCardX, nameCardY, nameCardWidth, nameCardHeight, 'FD');

      pdf.setFillColor(255, 255, 255);
      const labelWidth = 22;
      const labelX = nameCardX + 5;
      const labelY = nameCardY - 1;
      pdf.rect(labelX, labelY, labelWidth, 2, 'F');
      
      pdf.setFontSize(5);
      pdf.setTextColor(102, 102, 102);
      pdf.setFont('helvetica', 'bold');
      pdf.text("PARTICIPANT", labelX + labelWidth / 2, labelY + 1.5, { align: 'center' });

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      const nameParts = card.name.toUpperCase().split(' ');
      const nameY = nameCardY + 8;
      
      if (nameParts.length > 2) {
        const line1 = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' ');
        const line2 = nameParts.slice(Math.ceil(nameParts.length / 2)).join(' ');
        pdf.text(line1, nameCardX + nameCardWidth / 2, nameY, { align: 'center', maxWidth: nameCardWidth - 4 });
        pdf.text(line2, nameCardX + nameCardWidth / 2, nameY + 5, { align: 'center', maxWidth: nameCardWidth - 4 });
      } else {
        pdf.text(card.name.toUpperCase(), nameCardX + nameCardWidth / 2, nameY + 2, { align: 'center', maxWidth: nameCardWidth - 4 });
      }

      const roleText = card.role.toUpperCase();
      pdf.setFontSize(7);
      const roleWidth = pdf.getTextWidth(roleText) + 6;
      const roleX = nameCardX + 3;
      const roleY = nameCardY + nameCardHeight - 6;
      
      pdf.setFillColor(0, 0, 0);
      pdf.rect(roleX, roleY, roleWidth, 4, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.text(roleText, roleX + roleWidth / 2, roleY + 2.8, { align: 'center' });

      yPos = nameCardY + nameCardHeight + 6;

      // ===== DETAILS =====
      const detailsX = padding + 3;
      const detailsWidth = contentWidth - 6;
      const detailHeight = 7;
      const detailGap = 1.5;

      const details = [
        { label: 'COMPANY:', value: card.company },
        { label: 'EMAIL:', value: card.email },
        { label: 'PHONE:', value: card.phone },
        { label: 'ID:', value: card.participantId }
      ];

      details.forEach((detail, index) => {
        const detailY = yPos + (index * (detailHeight + detailGap));
        
        pdf.setFillColor(250, 250, 250);
        pdf.setDrawColor(224, 224, 224);
        pdf.setLineWidth(0.2);
        pdf.rect(detailsX, detailY, detailsWidth, detailHeight, 'FD');

        pdf.setTextColor(102, 102, 102);
        pdf.setFontSize(5.5);
        pdf.setFont('helvetica', 'bold');
        pdf.text(detail.label, detailsX + 2, detailY + 4);

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(detail.label === 'EMAIL:' ? 5 : 6);
        pdf.setFont('helvetica', 'normal');
        const valueX = detailsX + 19;
        pdf.text(detail.value, valueX, detailY + 4, { maxWidth: detailsWidth - 21 });
      });

      yPos += (details.length * (detailHeight + detailGap)) + 5;

      // ===== QR CODE =====
      const qrSectionX = padding + 3;
      const qrSectionWidth = contentWidth - 6;
      const qrSectionHeight = 32;

      pdf.setLineWidth(0.5);
      pdf.setDrawColor(0, 0, 0);
      pdf.setFillColor(255, 255, 255);
      pdf.rect(qrSectionX, yPos, qrSectionWidth, qrSectionHeight, 'FD');

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(6);
      pdf.setFont('helvetica', 'bold');
      pdf.text("SCAN FOR DETAILS", pageWidth / 2, yPos + 4, { align: 'center' });

      const qrSize = 25;
      const qrX = (pageWidth - qrSize) / 2;
      const qrY = yPos + 6;
      
      try {
        pdf.addImage(card.qrCodeDataURL, 'PNG', qrX, qrY, qrSize, qrSize);
      } catch (error) {
        console.error('Error adding QR code:', error);
      }

      // ===== FOOTER =====
      const footerHeight = 5;
      const footerY = pageHeight - footerHeight;

      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, footerY, pageWidth, footerHeight, 'F');

      pdf.setLineWidth(0.5);
      pdf.setDrawColor(255, 255, 255);
      pdf.line(0, footerY, pageWidth, footerY);

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(5.5);
      pdf.setFont('helvetica', 'bold');
      pdf.text("OFFICIAL PARTICIPANT ID CARD", pageWidth / 2, footerY + 3.5, { align: 'center' });

      // Get PDF as blob
      const pdfBlob = pdf.output('blob');
      zip.file(fileName, pdfBlob);

      if (onProgress) {
        onProgress(i + 1, cards.length);
      }
    } catch (error) {
      console.error(`Error generating PDF for card ${i}:`, error);
    }
  }

  // Generate zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  // Download
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${baseFileName}_all.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Keep old functions for backward compatibility but mark as deprecated
export const generateSinglePDF = generateVectorPDF;
export const generateBulkPDFs = generateBulkVectorPDFs;
export const downloadPDF = generateVectorPDF;
export const downloadBulkPDFs = generateBulkVectorPDFs;