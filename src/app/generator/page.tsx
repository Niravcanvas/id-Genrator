'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import IDCardTemplate from '@/components/IDCardTemplate';
import { IDCardData, HackathonInfo } from '@/types';
import { processCSV } from '@/utils/processCSV';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { generateBulkVectorPDFs } from '@/utils/generatePDF';

export default function GeneratorPage() {
  const [cards, setCards] = useState<IDCardData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'pdf'>('png');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const hackathonInfo: HackathonInfo = {
    name: "HACKOVERFLOW 4.0",
    date: "March 15-16, 2026",
    venue: "Pillai HOC College, Rasayani"
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const processedCards = await processCSV(text);
      setCards(processedCards);
      alert(`Successfully loaded ${processedCards.length} participants!`);
    } catch (error) {
      alert('Error processing CSV file. Please check the format.');
      console.error(error);
    }
  };

  const generatePNGCards = async () => {
    if (cards.length === 0) {
      alert('Please upload a CSV file first!');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const zip = new JSZip();

      for (let i = 0; i < cards.length; i++) {
        const cardElement = cardRefs.current[i];
        if (!cardElement) continue;

        const canvas = await html2canvas(cardElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png');
        });

        const fileName = `${cards[i].name.replace(/\s+/g, '_')}_${cards[i].participantId}.png`;
        zip.file(fileName, blob);

        setProgress(Math.round(((i + 1) / cards.length) * 100));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'id-cards.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('ID cards generated successfully!');
    } catch (error) {
      alert('Error generating cards. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const generatePDFCards = async () => {
    if (cards.length === 0) {
      alert('Please upload a CSV file first!');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      await generateBulkVectorPDFs(
        cards,
        hackathonInfo,
        'id-cards',
        (current, total) => {
          setProgress(Math.round((current / total) * 100));
        }
      );

      alert('Vector PDF cards generated successfully! (Crisp at any zoom level)');
    } catch (error) {
      alert('Error generating PDF cards. Please try again.');
      console.error(error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleGenerate = () => {
    if (downloadFormat === 'pdf') {
      generatePDFCards();
    } else {
      generatePNGCards();
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = `name,email,role,company,phone
John Doe,john@example.com,Developer,TechCorp,+1234567890
Jane Smith,jane@example.com,Designer,DesignCo,+0987654321
Mike Johnson,mike@example.com,Manager,StartupXYZ,+1122334455`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample-participants.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        inset: '0',
        opacity: '0.02',
        pointerEvents: 'none',
        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')"
      }} />

      {/* Navigation */}
      <nav style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'sticky',
        top: '0',
        zIndex: '50'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link 
            href="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: '#fff'
            }}
          >
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '0.625rem',
              fontWeight: 'bold',
              fontSize: '1.125rem'
            }}>
              ID
            </div>
            <span style={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '1.125rem'
            }}>
              ID Generator
            </span>
          </Link>

          <Link
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'transparent',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '3rem 1.5rem'
      }}>
        {/* Page Header */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 'bold',
            lineHeight: '1',
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            GENERATOR
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Upload your CSV file and generate professional ID cards in bulk
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Left Column - Controls */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Template Preview */}
            <div style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem'
              }}>
                Template Preview
              </h2>
              <div style={{
                transform: 'scale(0.6)',
                transformOrigin: 'top left',
                marginBottom: '-120px'
              }}>
                <IDCardTemplate
                  data={{
                    name: 'Sample Name',
                    email: 'sample@example.com',
                    role: 'Participant',
                    company: 'Company Name',
                    phone: '+1234567890',
                    participantId: 'SAMPLE-001',
                    qrCodeDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
                  }}
                  hackathonInfo={hackathonInfo}
                />
              </div>
            </div>

            {/* Upload Section */}
            <div style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem'
              }}>
                Upload CSV
              </h2>
              
              <div style={{
                border: '2px dashed rgba(255, 255, 255, 0.3)',
                padding: '2rem',
                textAlign: 'center',
                marginBottom: '1rem',
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('csv-upload')?.click()}
              >
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '0.5rem'
                }}>
                  Click to upload or drag and drop
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  CSV files only
                </p>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>

              <button
                onClick={downloadSampleCSV}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Download Sample CSV
              </button>

              {cards.length > 0 && (
                <p style={{
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  color: '#4ade80'
                }}>
                  ✓ {cards.length} participants loaded
                </p>
              )}
            </div>

            {/* Generate Section */}
            <div style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem'
              }}>
                Generate Cards
              </h2>

              {/* Format Selection */}
              <div style={{
                marginBottom: '1rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Download Format:
                </label>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => setDownloadFormat('png')}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: downloadFormat === 'png' ? '#fff' : 'transparent',
                      color: downloadFormat === 'png' ? '#000' : '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => setDownloadFormat('pdf')}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: downloadFormat === 'pdf' ? '#fff' : 'transparent',
                      color: downloadFormat === 'pdf' ? '#000' : '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    PDF
                  </button>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || cards.length === 0}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: cards.length === 0 || isGenerating ? 'rgba(255, 255, 255, 0.2)' : '#fff',
                  color: cards.length === 0 || isGenerating ? 'rgba(255, 255, 255, 0.5)' : '#000',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.875rem',
                  cursor: cards.length === 0 || isGenerating ? 'not-allowed' : 'pointer',
                  border: 'none',
                  transition: 'all 0.3s'
                }}
              >
                {isGenerating ? `Generating... ${progress}%` : `Generate ${downloadFormat.toUpperCase()} Cards`}
              </button>

              {isGenerating && (
                <div style={{
                  marginTop: '1rem',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: '#4ade80',
                    width: `${progress}%`,
                    transition: 'width 0.3s'
                  }} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Generated Cards */}
          <div style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            minHeight: '400px'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem'
            }}>
              Generated Cards ({cards.length})
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
              maxHeight: '600px',
              overflowY: 'auto'
            }}>
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  style={{
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    width: '400px',
                    height: '650px'
                  }}
                >
                  <IDCardTemplate
                    data={card}
                    hackathonInfo={hackathonInfo}
                  />
                </div>
              ))}
            </div>

            {cards.length === 0 && (
              <p style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.875rem',
                marginTop: '2rem'
              }}>
                Upload a CSV file to see generated cards here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}