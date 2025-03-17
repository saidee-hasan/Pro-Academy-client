import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
const MODULES = Array(10).fill().map((_, moduleIndex) => ({
  id: moduleIndex + 1,
  title: `Module ${moduleIndex + 1}: Advanced Concepts`,
  points: "5G",
  videos: Array(10).fill().map((_, videoIndex) => ({
    id: `${moduleIndex + 1}-${videoIndex + 1}`,
    title: `Video ${videoIndex + 1} - Core Concept`,
    url: `https://www.youtube.com/embed/${[
      'rePN-VFo1Eo',
      'cTXLxXj88kw',
      'JUwePydwbUI',
      'l4xtqOoz3QA',
      'wn_wKQ_UR90',
      'Uq39E81jPho',
      'SAojG-qJIcY',
      'b5BY1k9G0Zg',
      'uUZVgjVf3I8',
      'wiLPVCA4xQg'
    ][videoIndex]}`
  }))
}));

// Design Images (Example Data)
const DESIGN_IMAGES = [
  { id: 1, src: 'https://via.placeholder.com/300', alt: 'Design 1' },
  { id: 2, src: 'https://via.placeholder.com/300', alt: 'Design 2' },
  { id: 3, src: 'https://via.placeholder.com/300', alt: 'Design 3' },
  { id: 4, src: 'https://via.placeholder.com/300', alt: 'Design 4' },
];

// Custom CSS
const styles = `
  .video-end-screen {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }
  .completed-tick {
    filter: drop-shadow(0 0 10px #10b981);
  }
  .design-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  .design-image {
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .design-image:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .video-overlay {
    position: absolute;
    color: white;
    padding: 10px;
    border-radius: 8px;
    z-index: 10;
    max-width: 300px;
    animation: moveEmail 0s linear infinite;
    opacity: 0; /* Start invisible */
  }

 @keyframes moveEmail {
  0% {
    top: 20px;
    left: 20px;
    opacity: 1; /* Visible at Top Left */
  }
  10% {
    opacity: 0; /* Fade out */
  }
  20% {
    top: 20px;
    left: calc(100% - 320px);
    opacity: 1; /* Visible at Top Right */
  }
  30% {
    opacity: 0; /* Fade out */
  }
  40% {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1; /* Visible at Center */
  }
  50% {
    opacity: 0; /* Fade out */
  }
  60% {
    top: calc(100% - 60px);
    left: 20px;
    opacity: 1; /* Visible at Bottom Left */
  }
  70% {
    opacity: 0; /* Fade out */
  }
  80% {
    top: calc(100% - 60px);
    left: calc(100% - 320px);
    opacity: 1; /* Visible at Bottom Right */
  }
  90% {
    opacity: 0; /* Fade out */
  }
  100% {
    top: 20px;
    left: 20px;
    opacity: 1; /* Back to Top Left */
  }
}

.elementToAnimate {
  position: absolute;
  animation: moveEmail 5s ease-in-out infinite; /* Apply the animation with infinite loop */
  will-change: transform, opacity; /* Optimize performance */
}


  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
    .sidebar {
      order: 2; /* Move sidebar below the main content */
    }
    .main-content {
      order: 1; /* Move video player to the top */
    }
    .header-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .video-controls {
      flex-direction: column;
      gap: 8px;
    }
    .design-gallery {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    .video-overlay {
      max-width: 200px;
    }

    @keyframes moveEmail {
      0% {
        top: 10px;
        left: 10px;
        opacity: 1; /* Visible at Top Left */
      }
      10% {
        opacity: 0; /* Fade out */
      }
      20% {
        top: 10px;
        left: calc(100% - 220px);
        opacity: 1; /* Visible at Top Right */
      }
      30% {
        opacity: 0; /* Fade out */
      }
      40% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 1; /* Visible at Center */
      }
      50% {
        opacity: 0; /* Fade out */
      }
      60% {
        top: calc(100% - 60px);
        left: 10px;
        opacity: 1; /* Visible at Bottom Left */
      }
      70% {
        opacity: 0; /* Fade out */
      }
      80% {
        top: calc(100% - 60px);
        left: calc(100% - 220px);
        opacity: 1; /* Visible at Bottom Right */
      }
      90% {
        opacity: 0; /* Fade out */
      }
      100% {
        top: 10px;
        left: 10px;
        opacity: 1; /* Back to Top Left */
      }
    }
  }
`;

// Enhanced Components
const Accordion = ({ module, isOpen, onClick, selectedVideo, onVideoSelect, completedVideos }) => (
  <div className="mb-2 group">
    <button 
      onClick={onClick}
      className="w-full text-left p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl hover:from-gray-700 hover:to-gray-600 transition-all"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-pink-500' : 'bg-gray-500'} transition-colors`} />
          <span className="font-medium text-gray-200">{module.title}</span>
        </div>
        <span className="text-gray-400 transform transition-transform">
          {isOpen ? '▼' : '▶'}
        </span>
      </div>
    </button>
    {isOpen && (
      <div className="mt-2 ml-6 space-y-2">
        {module.videos.map((video, videoIndex) => {
          const isLocked = videoIndex > 0 && !completedVideos.includes(module.videos[videoIndex - 1].id);
          return (
            <div
              key={video.id}
              onClick={() => !isLocked && onVideoSelect(video)}
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                selectedVideo?.id === video.id 
                  ? 'bg-pink-600/20 border border-pink-500' 
                  : 'hover:bg-gray-700/30'
              } ${
                isLocked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="text-gray-300">{video.title}</span>
              {isLocked ? (
                <span className="text-gray-400">🔒</span>
              ) : completedVideos.includes(video.id) ? (
                <span className="text-emerald-400">✓</span>
              ) : null}
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const VideoPlayer = ({ video, playbackSpeed, quality, volume }) => {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
      <iframe
        className="w-full h-full"
        src={`${video.url}?autoplay=1&mute=${volume === 0}&playback-rate=${playbackSpeed}&quality=${quality}`}
        title={video.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {/* Overlay Email Text */}
      <div className="video-overlay">
        <p className="text-sm text-red-500">mdsaideehasan@gmail.com</p>
      </div>
    </div>
  );
};

// Design Gallery Component
const DesignGallery = () => {
  const handleCloneDesign = (designId) => {
    alert(`Cloning design ${designId}`);
    // Add logic to clone the design (e.g., download or copy to clipboard)
  };

  return (
    <div className="design-gallery">
      {DESIGN_IMAGES.map(design => (
        <div
          key={design.id}
          className="design-image"
          onClick={() => handleCloneDesign(design.id)}
        >
          <img
            src={design.src}
            alt={design.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

// Main Component
const VideoPlatform = () => {
  const [selectedVideo, setSelectedVideo] = useState(MODULES[0].videos[0]);
  const [expandedModule, setExpandedModule] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [completedVideos, setCompletedVideos] = useState(() => {
    // Load completed videos from local storage on initial load
    const savedCompletedVideos = localStorage.getItem('completedVideos');
    return savedCompletedVideos ? JSON.parse(savedCompletedVideos) : [];
  });
  const [volume, setVolume] = useState(1);
  const [quality, setQuality] = useState('hd1080');

  useEffect(() => {
    // Save completed videos to local storage whenever it changes
    localStorage.setItem('completedVideos', JSON.stringify(completedVideos));
  }, [completedVideos]);

  useEffect(() => {
    // Initialize first video selection
    if (!selectedVideo) {
      setSelectedVideo(MODULES[0].videos[0]);
    }
  }, []);

  const handleModuleToggle = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const markVideoCompleted = () => {
    if (selectedVideo && !completedVideos.includes(selectedVideo.id)) {
      const newCompleted = [...completedVideos, selectedVideo.id];
      setCompletedVideos(newCompleted);
    }
  };

  const handleNextVideo = () => {
    const currentModuleIndex = MODULES.findIndex(module => module.id === parseInt(selectedVideo.id.split('-')[0]));
    const currentModule = MODULES[currentModuleIndex];
    const currentVideoIndex = currentModule.videos.findIndex(video => video.id === selectedVideo.id);
    const nextVideoIndex = currentVideoIndex + 1;

    // Mark the current video as completed
    if (!completedVideos.includes(selectedVideo.id)) {
      setCompletedVideos([...completedVideos, selectedVideo.id]);
    }

    if (nextVideoIndex < currentModule.videos.length) {
      // Move to the next video in the current module
      setSelectedVideo(currentModule.videos[nextVideoIndex]);
      toast.success('Next video unlocked!', { position: 'bottom-right' });
    } else {
      // If it's the last video in the module, move to the next module
      const nextModuleIndex = currentModuleIndex + 1;
      if (nextModuleIndex < MODULES.length) {
        const nextModule = MODULES[nextModuleIndex];
        setSelectedVideo(nextModule.videos[0]);
        setExpandedModule(nextModule.id); // Expand the next module
        toast.success('Next module unlocked!', { position: 'bottom-right' });
      } else {
        // If it's the last module, loop back to the first module
        setSelectedVideo(MODULES[0].videos[0]);
        setExpandedModule(MODULES[0].id); // Expand the first module
        toast.success('Restarted from the first module!', { position: 'bottom-right' });
      }
    }
  };

  const handlePreviousVideo = () => {
    const currentModuleIndex = MODULES.findIndex(module => module.id === parseInt(selectedVideo.id.split('-')[0]));
    const currentModule = MODULES[currentModuleIndex];
    const currentVideoIndex = currentModule.videos.findIndex(video => video.id === selectedVideo.id);
    const previousVideoIndex = currentVideoIndex - 1;

    if (previousVideoIndex >= 0) {
      setSelectedVideo(currentModule.videos[previousVideoIndex]);
    } else {
      // If it's the first video, loop back to the last video
      setSelectedVideo(currentModule.videos[currentModule.videos.length - 1]);
    }
  };

  // Check if the next video is locked
  const isNextVideoLocked = () => {
    const currentModuleIndex = MODULES.findIndex(module => module.id === parseInt(selectedVideo.id.split('-')[0]));
    const currentModule = MODULES[currentModuleIndex];
    const currentVideoIndex = currentModule.videos.findIndex(video => video.id === selectedVideo.id);
    const nextVideoIndex = currentVideoIndex + 1;

    if (nextVideoIndex < currentModule.videos.length) {
      return !completedVideos.includes(currentModule.videos[currentVideoIndex].id);
    }
    return false;
  };

  // Calculate progress
  const currentModuleProgress = MODULES.map(module => {
    const completed = module.videos.filter(video => completedVideos.includes(video.id)).length;
    return { id: module.id, completed, total: module.videos.length };
  });

  const overallProgress = currentModuleProgress.reduce((acc, curr) => {
    acc.completed += curr.completed;
    acc.total += curr.total;
    return acc;
  }, { completed: 0, total: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <style>{styles}</style>
      <ToastContainer />
      
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm py-4 px-8 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center header-content">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-500 rounded-lg" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Code Mastery
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Progress:</span>
              <span className="text-pink-400">
                {overallProgress.completed}/{overallProgress.total} Videos
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-gray-700/50 px-3 py-2 rounded-lg border border-gray-600"
              >
                {['hd1080', 'hd720', 'medium'].map(q => (
                  <option key={q} value={q}>
                    {q.replace('hd', '').toUpperCase()}
                  </option>
                ))}
              </select>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 hidden md:block accent-pink-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-4 sidebar">
          {MODULES.map(module => (
            <Accordion
              key={module.id}
              module={module}
              isOpen={expandedModule === module.id}
              onClick={() => handleModuleToggle(module.id)}
              selectedVideo={selectedVideo}
              onVideoSelect={setSelectedVideo}
              completedVideos={completedVideos}
            />
          ))}
        </aside>
        {/* Main Content */}
        <main className="md:col-span-3 space-y-6 main-content">
          {selectedVideo ? (
            <>
              <VideoPlayer
                video={selectedVideo}
                playbackSpeed={playbackSpeed}
                quality={quality}
                volume={volume}
              />
              
              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-200">
                    {selectedVideo.title}
                  </h2>
                  <div className="space-x-4 video-controls flex">
                    <div className="flex space-x-4">
                      {/* Previous Button */}
                      <button
                        onClick={handlePreviousVideo}
                        className="border border-purple-500 text-purple-300 px-5 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300 shadow-lg"
                      >
                        Previous
                      </button>
                      {/* Next Button */}
                      <button
                        onClick={handleNextVideo}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Module {selectedVideo.id.split('-')[0]}</span>
                  <span>•</span>
                  <span>{quality.toUpperCase()}</span>
                  <span>•</span>
                  <span className='md:block hidden'>Volume: {Math.round(volume * 100)}%</span>
                  <select 
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-gray-900/50 px-3 py-2 text-white rounded-lg border border-gray-600"
                  >
                    {[0.5, 1, 1.5, 2].map(speed => (
                      <option key={speed} value={speed}>{speed}x Speed</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a video to start learning
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
