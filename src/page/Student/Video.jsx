import React, { useState } from 'react';

const Video = () => {
  const VIDEO_URL = "https://www.youtube.com/embed/nrpy3fOU0es?si=GAcJy6JlzM9Mu9Pv";
  const [selectedModule, setSelectedModule] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample modules data
  const modules = [
    { id: 75, title: "Git & GitHub, Collaboration and Team Project(Advanced)", points: "5G" },
    { id: 76, title: "Introduction to react day tool", points: "5G" },
    { id: 77, title: "NextJS Core Concepts (Part 2)", points: "7G" },
    { id: 78, title: "NextJS Core Concepts (Part 3)", points: "7G" },
    { id: 79, title: "Integrate SSLCOMMERCE", points: "5G" },
    { id: 80, title: "NextJS Core Concepts Part-1", points: "5G" },
    { id: 81, title: "Authentication in NextJs with Next Auth", points: "5G" },
    { id: 82, title: "Car Doctor Pro with NextJS Part-1", points: "5G" },
    { id: 83, title: "Car Doctor Pro with NextJS Part-2", points: "5G" }
  ];

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#000',
      minHeight: '100vh',
      color: '#fff'
    }}>
      {/* Header Section */}
      <header style={{
        backgroundColor: '#111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ color: '#e91e63', fontSize: '1.5rem', margin: 0 }}>Programming Hero</h1>
          <nav style={{ display: 'flex', gap: '1.5rem', color: '#ccc' }}>
            <span>Donovan Einstein</span>
            <span>Osama Berlin</span>
            <div style={{ position: 'relative' }}>
              <span 
                style={{ cursor: 'pointer' }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Bupont ▼
              </span>
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  minWidth: '200px',
                  zIndex: 100
                }}>
                  <div style={{ padding: '0.5rem', color: '#ccc' }}>Profile</div>
                  <div style={{ padding: '0.5rem', color: '#ccc' }}>Settings</div>
                  <div style={{ padding: '0.5rem', color: '#ccc' }}>Logout</div>
                </div>
              )}
            </div>
            <span>Blog</span>
            <span>My Dreams</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ 
            backgroundColor: '#e91e63', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}>
            Pink 3D mindset
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 150px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: '280px',
          backgroundColor: '#111',
          padding: '2rem',
          borderRight: '1px solid #222'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Search modules..."
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #222',
                backgroundColor: '#1a1a1a',
                color: '#fff'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h2 style={{ 
            marginBottom: '1.5rem',
            color: '#e91e63',
            fontSize: '1.2rem'
          }}>
            Modules
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredModules.map((module, i) => (
              <div 
                key={module.id}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedModule === module.id ? '#2a2a2a' : '#1a1a1a',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #222',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateX(5px)',
                    boxShadow: '0 2px 8px rgba(233,30,99,0.2)'
                  }
                }}
                onClick={() => setSelectedModule(module.id)}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#ccc' }}>Module {module.id}</span>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>
                    {module.title}
                  </span>
                </div>
                <span style={{ 
                  backgroundColor: '#e91e63', 
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {module.points}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Video Container */}
        <main style={{ 
          flex: 1, 
          padding: '2rem',
          background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)'
        }}>
          <div style={{ 
            backgroundColor: '#111',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid #222',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ 
                marginBottom: '1.5rem', 
                fontSize: '1.5rem',
                color: '#e91e63'
              }}>
                8h-9 Deployment To Vered
              </h2>
              <div style={{ position: 'relative' }}>
                <button
                  style={{
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    border: '1px solid #222',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Quality Settings ▼
                </button>
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #222',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    minWidth: '150px',
                    zIndex: 100
                  }}>
                    <div style={{ padding: '0.5rem', color: '#ccc' }}>1080p</div>
                    <div style={{ padding: '0.5rem', color: '#ccc' }}>720p</div>
                    <div style={{ padding: '0.5rem', color: '#ccc' }}>480p</div>
                  </div>
                )}
              </div>
            </div>
            <div style={{
              position: 'relative',
              paddingTop: '56.25%',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #222'
            }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#000'
                }}
                src={VIDEO_URL}
                title="YouTube video player"
                allowFullScreen
              />
            </div>
            <div style={{ marginTop: '1rem', color: '#ccc' }}>
              {selectedModule && (
                <div>
                  <h3 style={{ color: '#e91e63' }}>
                    {modules.find(m => m.id === selectedModule)?.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#e91e63',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer'
                    }}>
                      Mark as Complete
                    </button>
                    <button style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #222',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer'
                    }}>
                      Save Notes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Video;