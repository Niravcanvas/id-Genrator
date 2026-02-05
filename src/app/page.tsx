'use client';

import Link from 'next/link';

export default function Home() {
  const handleDownloadTemplate = () => {
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
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Noise texture overlay */}
      <div style={{
        position: 'fixed',
        inset: '0',
        opacity: '0.02',
        pointerEvents: 'none',
        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')"
      }} />
      
      {/* Gradient orbs */}
      <div style={{
        position: 'fixed',
        inset: '0',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '-10rem',
          width: '20rem',
          height: '20rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          filter: 'blur(120px)'
        }} />
        <div style={{
          position: 'absolute',
          top: '33.333%',
          right: '-10rem',
          width: '24rem',
          height: '24rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          filter: 'blur(120px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '33.333%',
          width: '20rem',
          height: '20rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          filter: 'blur(120px)'
        }} />
      </div>
      
      <div style={{ position: 'relative' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>ID</span>
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>ID Generator</div>
            </div>
            <Link 
              href="/generator"
              style={{
                padding: '0.625rem 1.5rem',
                background: '#fff',
                color: '#000',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
            >
              <span>Launch App</span>
              <span>→</span>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '5rem 1.5rem 10rem'
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            {/* Label */}
            <div style={{ display: 'inline-block', marginBottom: '2.5rem' }}>
              <div style={{
                padding: '0.625rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: '600'
                }}>Automated Badge System</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: 'clamp(3.5rem, 13vw, 12rem)',
              fontWeight: 'bold',
              lineHeight: '0.88',
              letterSpacing: '-0.02em',
              marginBottom: '2.5rem'
            }}>
              <span style={{ display: 'block' }}>ID CARD</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>GENERATOR</span>
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '42rem',
              marginBottom: '3.5rem',
              lineHeight: '1.75',
              fontWeight: '300'
            }}>
              Professional ID card generation for events, conferences, and organizations. 
              Upload CSV, generate cards with QR codes, download in bulk.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              marginBottom: '5rem',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/generator"
                style={{
                  padding: '1.25rem 2.5rem',
                  background: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Start Generating</span>
                <span>→</span>
              </Link>
              
              <button
                onClick={handleDownloadTemplate}
                style={{
                  padding: '1.25rem 2.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative'
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
                Download Template
              </button>
            </div>

            {/* Stats Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {[
                { label: 'Fast', sub: 'Batch Processing' },
                { label: 'Easy', sub: 'CSV Upload' },
                { label: 'QR', sub: 'Auto Generated' },
                { label: 'PNG', sub: 'High Quality' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>{stat.label}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '8rem 1.5rem'
          }}>
            <div style={{
              marginBottom: '5rem',
              textAlign: 'center',
              maxWidth: '48rem',
              margin: '0 auto 5rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                lineHeight: '1'
              }}>
                How It Works
              </h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '1.125rem',
                fontWeight: '300'
              }}>Three simple steps to generate professional ID cards</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  num: '01',
                  step: '1',
                  title: 'Upload CSV',
                  desc: 'Prepare your participant data in CSV format with required fields: name, email, role, company, and phone number.'
                },
                {
                  num: '02',
                  step: '2',
                  title: 'Generate',
                  desc: 'Our system processes your data and creates professional ID cards with embedded QR codes containing participant information.'
                },
                {
                  num: '03',
                  step: '3',
                  title: 'Download',
                  desc: 'Download all generated ID cards as high-quality PNG images bundled together in a convenient ZIP archive.'
                }
              ].map((item, i) => (
                <div key={i} style={{
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '2.5rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-1.5rem',
                    right: '-1.5rem',
                    width: '6rem',
                    height: '6rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: 'rgba(255, 255, 255, 0.1)'
                    }}>{item.num}</span>
                  </div>
                  <div>
                    <div style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      background: '#fff',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      marginBottom: '2rem',
                      transition: 'transform 0.3s'
                    }}>{item.step}</div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      marginBottom: '1.25rem',
                      letterSpacing: '-0.01em'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: '1.75',
                      fontWeight: '300'
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CSV Format Section */}
        <section style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '8rem 1.5rem'
          }}>
            <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  lineHeight: '1'
                }}>
                  CSV Format
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '1.125rem',
                  fontWeight: '300'
                }}>Simple format, powerful results</p>
              </div>

              <div style={{
                background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '2.5rem',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '16rem',
                  height: '16rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '50%',
                  filter: 'blur(100px)'
                }} />
                
                <div style={{
                  position: 'relative',
                  marginBottom: '2.5rem'
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '1.5rem',
                    fontWeight: '600'
                  }}>Required Columns</h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}>
                    {['name', 'email', 'role', 'company', 'phone'].map((field) => (
                      <div key={field} style={{
                        padding: '0.75rem 1.25rem',
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        backdropFilter: 'blur(12px)',
                        transition: 'border-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                      >
                        {field}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  paddingTop: '2.5rem',
                  position: 'relative'
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '1.5rem',
                    fontWeight: '600'
                  }}>Example Data</h3>
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '1.5rem',
                    overflowX: 'auto',
                    backdropFilter: 'blur(12px)'
                  }}>
                    <pre style={{
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                      margin: '0'
                    }}>
                      <div style={{
                        color: '#4ade80',
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                      }}>name,email,role,company,phone</div>
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: '0.25rem'
                      }}>John Doe,john@example.com,Developer,TechCorp,+1234567890</div>
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}>Jane Smith,jane@example.com,Designer,DesignCo,+0987654321</div>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '4rem 1.5rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    color: '#000',
                    fontWeight: 'bold'
                  }}>ID</span>
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontWeight: '600',
                  margin: '0'
                }}>
                  ID Card Generator
                </p>
              </div>
              <Link 
                href="/generator"
                style={{
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '600',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                <span>Get Started</span>
                <span>→</span>
              </Link>
            </div>
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '2rem'
            }}>
              <p style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: '0'
              }}>
                © 2024 All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}