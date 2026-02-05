'use client';

import React, { useState, useRef } from 'react';
import { Participant, IDCardData, HackathonInfo } from '@/types';
import { parseCSV, downloadCSVTemplate } from '@/utils/processCSV';
import { generateQRCode } from '@/utils/generateQR';
import IDCardTemplate from '@/components/IDCardTemplate';
import TemplatePreview from '@/components/TemplatePreview';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

const GeneratorPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [idCards, setIdCards] = useState<IDCardData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const hackathonInfo: HackathonInfo = {
    name: 'HackFest 2026',
    date: 'February 15-16, 2026',
    venue: 'Tech Hub Convention Center',
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    try {
      const parsedData = await parseCSV(uploadedFile);
      setParticipants(parsedData);
      alert(`✓ ${parsedData.length} participants loaded`);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the format.');
    }
  };

  const generateIDCards = async () => {
    if (participants.length === 0) {
      alert('Please upload a CSV file first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const cards: IDCardData[] = [];

      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        const qrCodeDataURL = await generateQRCode(participant);

        cards.push({
          ...participant,
          qrCodeDataURL,
        });

        setProgress(Math.round(((i + 1) / participants.length) * 100));
      }

      setIdCards(cards);
      alert(`✓ Generated ${cards.length} ID cards successfully!`);
    } catch (error) {
      console.error('Error generating ID cards:', error);
      alert('Error generating ID cards');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAllCards = async () => {
    if (idCards.length === 0) {
      alert('Please generate ID cards first');
      return;
    }

    setIsProcessing(true);
    const zip = new JSZip();

    try {
      for (let i = 0; i < idCards.length; i++) {
        const cardRef = cardRefs.current[i];
        if (!cardRef) continue;

        const canvas = await html2canvas(cardRef, {
          scale: 2,
          backgroundColor: '#ffffff',
        });

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), 'image/png');
        });

        const fileName = `${idCards[i].name.replace(/\s+/g, '_')}_${idCards[i].participantId}.png`;
        zip.file(fileName, blob);

        setProgress(Math.round(((i + 1) / idCards.length) * 100));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ID_Cards_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      alert('✓ All ID cards downloaded successfully!');
    } catch (error) {
      console.error('Error downloading cards:', error);
      alert('Error downloading ID cards');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-4 border-black p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold uppercase tracking-tight">ID Card Generator</h1>
          <p className="mt-2 text-sm">Generate professional ID cards in seconds</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Template Preview */}
            <div className="border-4 border-black p-6">
              <TemplatePreview />
            </div>

            {/* Upload Section */}
            <div className="border-4 border-black p-6">
              <h2 className="text-xl font-bold uppercase mb-4">Upload CSV</h2>
              
              <button
                onClick={downloadCSVTemplate}
                className="w-full mb-4 px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors font-medium uppercase text-sm"
              >
                ↓ Download CSV Template
              </button>

              <div className="border-2 border-dashed border-black p-8 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer block"
                >
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-semibold">Click to upload CSV</p>
                  <p className="text-xs mt-1">or drag and drop</p>
                </label>
              </div>

              {file && (
                <div className="mt-4 p-3 border-2 border-black bg-gray-50">
                  <p className="text-sm">
                    <span className="font-semibold">File:</span> {file.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Participants:</span> {participants.length}
                  </p>
                </div>
              )}
            </div>

            {/* Generate Section */}
            <div className="border-4 border-black p-6">
              <h2 className="text-xl font-bold uppercase mb-4">Generate</h2>
              
              <button
                onClick={generateIDCards}
                disabled={participants.length === 0 || isProcessing}
                className="w-full mb-3 px-4 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-bold uppercase"
              >
                {isProcessing ? 'Generating...' : '⚡ Generate ID Cards'}
              </button>

              <button
                onClick={downloadAllCards}
                disabled={idCards.length === 0 || isProcessing}
                className="w-full px-4 py-3 border-2 border-black hover:bg-black hover:text-white disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed transition-colors font-bold uppercase"
              >
                ↓ Download All ({idCards.length})
              </button>

              {isProcessing && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 border-2 border-black h-8">
                    <div
                      className="bg-black h-full transition-all duration-300 flex items-center justify-center"
                      style={{ width: `${progress}%` }}
                    >
                      <span className="text-white text-xs font-bold">{progress}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Generated Cards */}
          <div className="border-4 border-black p-6">
            <h2 className="text-xl font-bold uppercase mb-4">Generated Cards ({idCards.length})</h2>
            
            {idCards.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">No cards generated yet</p>
                <p className="text-xs mt-1">Upload CSV and click generate</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {idCards.map((card, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="transform scale-75 origin-top-left"
                  >
                    <IDCardTemplate data={card} hackathonInfo={hackathonInfo} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;