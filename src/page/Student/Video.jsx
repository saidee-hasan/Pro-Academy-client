import React, { useState, useEffect } from 'react';

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
      'XU0FYUSIDDc',
      'BkKXqyLb694',
      'kZoFgGz0f4g',
      '3tmd-ClpJxA',
      'LDU_Txk06tM',
      'yPYZpwSpKmA',
      'dQw4w9WgXcQ',
      'nrpy3fOU0es',
      '3tmd-ClpJxA'
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
        {module.videos.map(video => (
          <div
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
              selectedVideo?.id === video.id 
                ? 'bg-pink-600/20 border border-pink-500' 
                : 'hover:bg-gray-700/30'
            }`}
          >
            <span className="text-gray-300">{video.title}</span>
            {completedVideos.includes(video.id) && (
              <span className="text-emerald-400">✓</span>
            )}
          </div>
        ))}
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
  const [completedVideos, setCompletedVideos] = useState([]);
  const [volume, setVolume] = useState(1);
  const [quality, setQuality] = useState('hd1080');

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
    const currentModule = MODULES.find(module => module.id === parseInt(selectedVideo.id.split('-')[0]));
    const currentVideoIndex = currentModule.videos.findIndex(video => video.id === selectedVideo.id);
    const nextVideoIndex = currentVideoIndex + 1;

    if (nextVideoIndex < currentModule.videos.length) {
      setSelectedVideo(currentModule.videos[nextVideoIndex]);
    } else {
      // If it's the last video, loop back to the first video
      setSelectedVideo(currentModule.videos[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <style>{styles}</style>
      
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm py-4 px-8 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
                {completedVideos.length}/100 Videos
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
                className="w-24 accent-pink-500"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 p-6">
        {/* Sidebar */}
        <aside className="col-span-1 space-y-4">
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
        <main className="col-span-3 space-y-6">
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
                  <div className="space-x-4">
                  <select 
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-gray-700/50 px-3 py-2  rounded-lg border border-gray-600"
                  >
                    {[0.5, 1, 1.5, 2].map(speed => (
                      <option key={speed} value={speed}>{speed}x Speed</option>
                    ))}
                  </select>
                     {/* Next Button */}
                <button
                  onClick={handleNextVideo}
                  className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Next Video
                </button></div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Module {selectedVideo.id.split('-')[0]}</span>
                  <span>•</span>
                  <span>{quality.toUpperCase()}</span>
                  <span>•</span>
                  <span>Volume: {Math.round(volume * 100)}%</span>
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

export default VideoPlatform;