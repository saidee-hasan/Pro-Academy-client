import useAuth from '@/Hooks/useAuth';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import modulesData from '../../../public/video.json';

// Enhanced module data with project submission requirements
const enhancedModulesData = {
  ...modulesData,
  modules: modulesData.modules.map(module => ({
    ...module,
    projectRequirements: `Build a ${module.title.toLowerCase()} application that demonstrates the concepts covered in this module. Include at least 3 key features we've discussed.`,
    submissionDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 week from now
  }))
};

// Project submissions data structure
const initialSubmissions = {
  '1': {
    liveLink: '',
    codeLink: '',
    description: '',
    submitted: false,
    grade: null,
    feedback: ''
  },
  '2': {
    liveLink: '',
    codeLink: '',
    description: '',
    submitted: false,
    grade: null,
    feedback: ''
  }
};

// Custom CSS with improved responsive styles
const styles = `
  /* ... (keep all your existing styles) ... */
`;

const VideoPlayer = ({ video, isLocked, onUnlock }) => {
  if (isLocked) {
    return (
      <div className="video-container locked-video">
        <div className="locked-overlay">
          <h3>This video is locked</h3>
          <p>Complete the previous video to unlock</p>
          <button className="unlock-btn" onClick={onUnlock}>
            Complete Previous Video
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-container">
      <iframe
        src={video.url}
        className="video-player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
      />
      <span className="duration-badge">{video.duration}</span>
    </div>
  );
};

const ModuleItem = ({ module, isOpen, onClick, selectedVideo, onVideoSelect, completedVideos, favoriteVideos, searchTerm }) => {
  const isMatch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 module.videos.some(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (searchTerm && !isMatch) return null;

  // Calculate module progress
  const completedCount = module.videos.filter(v => completedVideos.includes(v.id)).length;
  const progressPercentage = (completedCount / module.videos.length) * 100;

  return (
    <div className={`mb-2 group ${isMatch ? 'module-highlight' : ''}`}>
      <button 
        onClick={onClick}
        className="w-full text-left p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl hover:from-gray-700 hover:to-gray-600 transition-all"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-pink-500' : 'bg-gray-500'} transition-colors`} />
            <span className="font-medium text-gray-200">{module.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 module-progress">
              {completedCount}/{module.videos.length}
            </span>
            <span className="text-gray-400 transform transition-transform">
              {isOpen ? '▼' : '▶'}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
          <div 
            className="bg-pink-500 h-1.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 ml-6 space-y-2">
          {module.videos.map((video, videoIndex) => {
            const isLocked = videoIndex > 0 && !completedVideos.includes(module.videos[videoIndex - 1].id);
            const isFavorite = favoriteVideos.includes(video.id);
            const videoMatchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (searchTerm && !videoMatchesSearch) return null;

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
                } ${videoMatchesSearch ? 'module-highlight' : ''}`}
              >
                <span className="text-gray-300 truncate">{video.title}</span>
                <div className="flex items-center gap-2">
                  {isLocked ? (
                    <span className="text-gray-400">🔒</span>
                  ) : completedVideos.includes(video.id) ? (
                    <span className="text-emerald-400">✓</span>
                  ) : null}
                  {isFavorite && !isLocked && (
                    <span className="text-pink-400">❤️</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ProjectSubmission = ({ moduleId, moduleTitle, requirements, deadline, submissions, setSubmissions }) => {
  const [formData, setFormData] = useState(submissions[moduleId] || {
    liveLink: '',
    codeLink: '',
    description: '',
    submitted: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      ...formData,
      submitted: true,
      submittedAt: new Date().toISOString()
    };
    setSubmissions(prev => ({
      ...prev,
      [moduleId]: submission
    }));
    toast.success('Project submitted successfully!', { position: 'bottom-right' });
  };

  return (
    <div className="project-submission">
      <h3 className="text-lg font-semibold mb-4">Project Submission: {moduleTitle}</h3>
      <p className="text-gray-300 mb-2"><strong>Requirements:</strong> {requirements}</p>
      <p className="text-gray-300 mb-4"><strong>Deadline:</strong> {deadline}</p>
      
      {formData.submitted ? (
        <div className="submission-status submitted">
          <p className="font-semibold text-emerald-400">✓ Project Submitted</p>
          <p className="mt-2"><strong>Live Link:</strong> <a href={formData.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{formData.liveLink}</a></p>
          <p className="mt-1"><strong>Code Link:</strong> <a href={formData.codeLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{formData.codeLink}</a></p>
          <p className="mt-1"><strong>Description:</strong> {formData.description}</p>
          {formData.grade && (
            <p className="mt-2"><strong>Grade:</strong> {formData.grade}/10</p>
          )}
          {formData.feedback && (
            <p className="mt-1"><strong>Feedback:</strong> {formData.feedback}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleChange}
            placeholder="Live project URL"
            className="submission-input"
            required
          />
          <input
            type="url"
            name="codeLink"
            value={formData.codeLink}
            onChange={handleChange}
            placeholder="Code repository URL"
            className="submission-input"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project description (explain your implementation)"
            className="submission-input submission-textarea"
            required
          />
          <button type="submit" className="submission-btn">
            Submit Project
          </button>
        </form>
      )}
    </div>
  );
};

const VideoPlatform = () => {
  const [modules, setModules] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [expandedModule, setExpandedModule] = useState(1);
  const [completedVideos, setCompletedVideos] = useState(() => {
    const savedCompletedVideos = localStorage.getItem('completedVideos');
    return savedCompletedVideos ? JSON.parse(savedCompletedVideos) : [];
  });
  const [favoriteVideos, setFavoriteVideos] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteVideos');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('videoNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });
  const [currentNote, setCurrentNote] = useState('');
  const [submissions, setSubmissions] = useState(() => {
    const savedSubmissions = localStorage.getItem('projectSubmissions');
    return savedSubmissions ? JSON.parse(savedSubmissions) : initialSubmissions;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const {user} = useAuth();

  useEffect(() => {
    setModules(enhancedModulesData.modules);
    if (enhancedModulesData.modules.length > 0) {
      const firstModule = enhancedModulesData.modules[0];
      setSelectedModule(firstModule);
      if (firstModule.videos.length > 0) {
        setSelectedVideo(firstModule.videos[0]);
      }
    }
  }, []);

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('completedVideos', JSON.stringify(completedVideos));
    localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
    localStorage.setItem('videoNotes', JSON.stringify(notes));
    localStorage.setItem('projectSubmissions', JSON.stringify(submissions));
  }, [completedVideos, favoriteVideos, notes, submissions]);

  // Load note when video changes
  useEffect(() => {
    if (selectedVideo) {
      setCurrentNote(notes[selectedVideo.id] || '');
      // Set the current module when video changes
      const module = modules.find(m => m.id === parseInt(selectedVideo.id.split('-')[0]));
      if (module) setSelectedModule(module);
    }
  }, [selectedVideo, notes, modules]);

  const handleModuleToggle = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const isVideoLocked = (videoId) => {
    if (!videoId) return false;
    
    const [moduleId, videoNumber] = videoId.split('-').map(Number);
    if (videoNumber === 1) return false; // First video is never locked
    
    const module = modules.find(m => m.id === moduleId);
    if (!module) return true;
    
    const prevVideoId = `${moduleId}-${videoNumber - 1}`;
    return !completedVideos.includes(prevVideoId);
  };

  const handleNextVideo = () => {
    if (!selectedVideo) return;
  
    // Mark current video as completed
    if (!completedVideos.includes(selectedVideo.id)) {
      setCompletedVideos(prev => [...prev, selectedVideo.id]);
    }
  
    // Existing navigation logic
    const currentModuleIndex = modules.findIndex(m => m.id === parseInt(selectedVideo.id.split('-')[0]));
    const currentVideoIndex = modules[currentModuleIndex].videos.findIndex(v => v.id === selectedVideo.id);
  
    if (currentVideoIndex < modules[currentModuleIndex].videos.length - 1) {
      const nextVideo = modules[currentModuleIndex].videos[currentVideoIndex + 1];
      if (!isVideoLocked(nextVideo.id)) {
        setSelectedVideo(nextVideo);
      }
    } else if (currentModuleIndex < modules.length - 1) {
      const nextModule = modules[currentModuleIndex + 1];
      if (nextModule.videos.length > 0) {
        setSelectedVideo(nextModule.videos[0]);
        setExpandedModule(nextModule.id);
      }
    }
  };

  const handlePreviousVideo = () => {
    if (!selectedVideo) return;

    const currentModuleIndex = modules.findIndex(m => m.id === parseInt(selectedVideo.id.split('-')[0]));
    const currentVideoIndex = modules[currentModuleIndex].videos.findIndex(v => v.id === selectedVideo.id);

    if (currentVideoIndex > 0) {
      // Previous video in same module
      setSelectedVideo(modules[currentModuleIndex].videos[currentVideoIndex - 1]);
    } else if (currentModuleIndex > 0) {
      // Last video of previous module
      const prevModule = modules[currentModuleIndex - 1];
      setSelectedVideo(prevModule.videos[prevModule.videos.length - 1]);
      setExpandedModule(prevModule.id);
    }
  };

  const toggleFavorite = (videoId) => {
    setFavoriteVideos(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const saveNote = () => {
    if (selectedVideo) {
      setNotes(prev => ({
        ...prev,
        [selectedVideo.id]: currentNote
      }));
      toast.success('Note saved!', { position: 'bottom-right' });
    }
  };

  const currentModuleProgress = modules.map(module => {
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
      
      <header className="bg-gray-800/80 backdrop-blur-sm py-4 px-4 sm:px-8 border-b border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center header-content">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-500 rounded-lg" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Code Mastery
            </h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 text-sm">
            <span className="text-gray-400 hidden sm:inline">Progress:</span>
            <span className="text-pink-400">
              {overallProgress.completed}/{overallProgress.total}
            </span>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-pink-400">
              {favoriteVideos.length} ❤️
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6">
        {/* Main content area - appears first on mobile */}
        <main className="lg:col-span-3 space-y-6 main-content">
          {selectedVideo ? (
            <>
              <div className="video-container-wrapper" style={{ marginTop: 0 }}>
                <VideoPlayer
                  video={selectedVideo}
                  isLocked={isVideoLocked(selectedVideo.id)}
                  onUnlock={() => {
                    // Navigate to previous video if locked
                    const currentModuleIndex = modules.findIndex(m => m.id === parseInt(selectedVideo.id.split('-')[0]));
                    const currentVideoIndex = modules[currentModuleIndex].videos.findIndex(v => v.id === selectedVideo.id);
                    if (currentVideoIndex > 0) {
                      setSelectedVideo(modules[currentModuleIndex].videos[currentVideoIndex - 1]);
                    }
                  }}
                />
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-200 truncate">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-2 video-controls">
                    <button
                      onClick={handlePreviousVideo}
                      className="border border-purple-500 text-purple-300 px-3 sm:px-5 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300 shadow-lg text-sm sm:text-base"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextVideo}
                      disabled={isVideoLocked(selectedVideo.id)}
                      className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-5 py-2 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg text-sm sm:text-base ${
                        isVideoLocked(selectedVideo.id) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Next
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedVideo.id)}
                      className={`favorite-btn ${favoriteVideos.includes(selectedVideo.id) ? 'active' : ''} border border-gray-600 px-3 py-2 rounded-lg`}
                    >
                      {favoriteVideos.includes(selectedVideo.id) ? '❤️ Unfavorite' : '🤍 Favorite'}
                    </button>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Notes
                  </label>
                  <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    onBlur={saveNote}
                    className="w-full note-textarea rounded-lg p-4 bg-black text-gray-200 border border-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                    rows="4"
                    placeholder="Write your notes here..."
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={saveNote}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Save Note
                    </button>
                  </div>
                </div>

                {/* Project Submission Section */}
                {selectedVideo.id.endsWith('-1') && selectedModule && (
                  <ProjectSubmission
                    moduleId={selectedModule.id.toString()}
                    moduleTitle={selectedModule.title}
                    requirements={selectedModule.projectRequirements}
                    deadline={selectedModule.submissionDeadline}
                    submissions={submissions}
                    setSubmissions={setSubmissions}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a video to start learning
            </div>
          )}
        </main>
        
        {/* Sidebar - appears second on mobile */}
        <aside className="lg:col-span-1 space-y-4 sidebar">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {modules.map(module => (
            <ModuleItem
              key={module.id}
              module={module}
              isOpen={expandedModule === module.id}
              onClick={() => handleModuleToggle(module.id)}
              selectedVideo={selectedVideo}
              onVideoSelect={setSelectedVideo}
              completedVideos={completedVideos}
              favoriteVideos={favoriteVideos}
              searchTerm={searchTerm}
            />
          ))}
        </aside>
      </div>
    </div>
  );
};

export default VideoPlatform;