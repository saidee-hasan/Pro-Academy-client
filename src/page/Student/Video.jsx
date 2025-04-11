import useAuth from '@/Hooks/useAuth';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import modulesData from '../../../public/video.json';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiLock, FiCheck, FiChevronDown, FiChevronRight, FiSearch, FiStar, FiArrowLeft, FiArrowRight, FiDownload } from 'react-icons/fi';

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

const VideoPlayer = ({ video, isLocked, onUnlock }) => {
  if (isLocked) {
    return (
      <motion.div 
        className="video-container locked-video relative rounded-xl overflow-hidden"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-center">
          <FiLock className="text-4xl text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-200 mb-2">This video is locked</h3>
          <p className="text-gray-400 mb-6">Complete the previous video to unlock this content</p>
          <motion.button 
            className="unlock-btn bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            onClick={onUnlock}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiArrowLeft /> Complete Previous Video
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="video-container relative rounded-xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <iframe
        src={video.url}
        className="video-player w-full aspect-video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
      />
      <motion.span 
        className="duration-badge absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {video.duration}
      </motion.span>
    </motion.div>
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
    <motion.div 
      className={`mb-2 group ${isMatch ? 'module-highlight' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button 
        onClick={onClick}
        className="w-full text-left p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl hover:from-gray-700 hover:to-gray-600 transition-all shadow-md"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
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
            {isOpen ? <FiChevronDown className="text-gray-400" /> : <FiChevronRight className="text-gray-400" />}
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
          <motion.div 
            className="bg-pink-500 h-1.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mt-2 ml-6 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {module.videos.map((video, videoIndex) => {
              const isLocked = videoIndex > 0 && !completedVideos.includes(module.videos[videoIndex - 1].id);
              const isFavorite = favoriteVideos.includes(video.id);
              const videoMatchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
              
              if (searchTerm && !videoMatchesSearch) return null;

              return (
                <motion.div
                  key={video.id}
                  onClick={() => !isLocked && onVideoSelect(video)}
                  className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                    selectedVideo?.id === video.id 
                      ? 'bg-pink-600/20 border border-pink-500' 
                      : 'hover:bg-gray-700/30'
                  } ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : ''
                  } ${videoMatchesSearch ? 'module-highlight' : ''}`}
                  whileHover={{ scale: selectedVideo?.id === video.id ? 1 : 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-gray-300 truncate">{video.title}</span>
                  <div className="flex items-center gap-2">
                    {isLocked ? (
                      <FiLock className="text-gray-400" />
                    ) : completedVideos.includes(video.id) ? (
                      <FiCheck className="text-emerald-400" />
                    ) : null}
                    {isFavorite && !isLocked && (
                      <FiHeart className="text-pink-400 fill-current" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
    <motion.div 
      className="project-submission bg-gray-800/50 rounded-xl p-6 mt-6 backdrop-blur-sm border border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Project Submission: {moduleTitle}
      </h3>
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-2">
          <FiStar className="text-yellow-400 mt-1 flex-shrink-0" />
          <p className="text-gray-300"><strong>Requirements:</strong> {requirements}</p>
        </div>
        <div className="flex items-start gap-2">
          <FiStar className="text-yellow-400 mt-1 flex-shrink-0" />
          <p className="text-gray-300"><strong>Deadline:</strong> {deadline}</p>
        </div>
      </div>
      
      {formData.submitted ? (
        <motion.div 
          className="submission-status submitted bg-gray-700/30 rounded-lg p-4 border border-emerald-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <FiCheck className="text-xl" />
            <p className="font-semibold">Project Submitted</p>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Live Link</p>
              <a href={formData.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block truncate">
                {formData.liveLink}
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-400">Code Link</p>
              <a href={formData.codeLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block truncate">
                {formData.codeLink}
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-400">Description</p>
              <p className="text-gray-300">{formData.description}</p>
            </div>
            
            {formData.grade && (
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <p className="text-sm text-gray-400">Grade</p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full" 
                      style={{ width: `${formData.grade * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-yellow-400 font-medium">{formData.grade}/10</span>
                </div>
              </div>
            )}
            
            {formData.feedback && (
              <div className="mt-3">
                <p className="text-sm text-gray-400">Feedback</p>
                <p className="text-gray-300 italic">"{formData.feedback}"</p>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1">Live Project URL</label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="https://your-project.vercel.app"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Code Repository URL</label>
            <input
              type="url"
              name="codeLink"
              value={formData.codeLink}
              onChange={handleChange}
              placeholder="https://github.com/your-username/project-repo"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain your implementation, challenges faced, and key features..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all min-h-[120px]"
              required
            />
          </div>
          
          <motion.button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Project
          </motion.button>
        </motion.form>
      )}
    </motion.div>
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
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    setModules(enhancedModulesData.modules);
    if (enhancedModulesData.modules.length > 0) {
      const firstModule = enhancedModulesData.modules[0];
      setSelectedModule(firstModule);
      if (firstModule.videos.length > 0) {
        setSelectedVideo(firstModule.videos[0]);
      }
    }
    setLoading(false);
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

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 max-w-md mx-auto bg-gray-800 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-300 mb-6">
            You need to be logged in to access this content. Please sign in to continue.
          </p>
          <a 
            href="/login" 
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <style jsx global>{`
        :root {
          --primary: #ec4899;
          --secondary: #8b5cf6;
        }
        
        body {
          color: #e5e7eb;
        }
        
        .video-container {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .module-highlight {
          background: rgba(236, 72, 153, 0.1);
          border-radius: 0.5rem;
        }
      `}</style>
      
      <ToastContainer position="bottom-right" theme="dark" />
      
      <header className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm py-4 px-4 sm:px-8 border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}
              whileHover={{ rotate: 10 }}
            >
              <FiStar className="text-white" />
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Code Mastery
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-4 text-sm">
              <span className="text-gray-400 hidden sm:inline">Progress:</span>
              <span className="text-pink-500 font-medium">
                {overallProgress.completed}/{overallProgress.total}
              </span>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <div className="flex items-center gap-1 text-pink-500">
                <FiHeart className="fill-current" />
                <span>{favoriteVideos.length}</span>
              </div>
            </div>
            
            {user && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6">
        {/* Main content area - appears first on mobile */}
        <main className="lg:col-span-3 space-y-6">
          {selectedVideo ? (
            <>
              <div className="video-container-wrapper">
                <VideoPlayer
                  video={selectedVideo}
                  isLocked={isVideoLocked(selectedVideo.id)}
                  onUnlock={() => {
                    const currentModuleIndex = modules.findIndex(m => m.id === parseInt(selectedVideo.id.split('-')[0]));
                    const currentVideoIndex = modules[currentModuleIndex].videos.findIndex(v => v.id === selectedVideo.id);
                    if (currentVideoIndex > 0) {
                      setSelectedVideo(modules[currentModuleIndex].videos[currentVideoIndex - 1]);
                    }
                  }}
                />
              </div>
              
              <motion.div 
                className="rounded-xl p-4 sm:p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-200 truncate">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <motion.button
                      onClick={handlePreviousVideo}
                      className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 shadow-sm text-sm sm:text-base border border-purple-500 text-purple-300 hover:bg-purple-700 hover:text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiArrowLeft /> Previous
                    </motion.button>
                    <motion.button
                      onClick={handleNextVideo}
                      disabled={isVideoLocked(selectedVideo.id)}
                      className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 shadow-sm text-sm sm:text-base ${
                        isVideoLocked(selectedVideo.id) 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''
                      } bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90`}
                      whileHover={!isVideoLocked(selectedVideo.id) ? { scale: 1.02 } : {}}
                      whileTap={!isVideoLocked(selectedVideo.id) ? { scale: 0.98 } : {}}
                    >
                      Next <FiArrowRight />
                    </motion.button>
                    <motion.button
                      onClick={() => toggleFavorite(selectedVideo.id)}
                      className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 border border-gray-600 hover:bg-gray-700 ${
                        favoriteVideos.includes(selectedVideo.id) 
                          ? 'text-pink-400 bg-pink-900/20 border-pink-500/50' 
                          : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {favoriteVideos.includes(selectedVideo.id) ? (
                        <>
                          <FiHeart className="fill-current" /> Favorited
                        </>
                      ) : (
                        <>
                          <FiHeart /> Favorite
                        </>
                      )}
                    </motion.button>
           
                  </div>
                </div>

                {/* Notes Section */}
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Your Notes
                  </label>
                  <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    onBlur={saveNote}
                    className="w-full rounded-lg p-4 border focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-gray-800 text-gray-200 border-gray-700"
                    rows="4"
                    placeholder="Write your notes here..."
                  />
                  <div className="flex justify-end mt-2">
                    <motion.button
                      onClick={saveNote}
                      className="px-4 py-2 rounded-lg text-sm transition-colors bg-pink-600 hover:bg-pink-700 text-white"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save Note
                    </motion.button>
                  </div>
                </motion.div>

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
              </motion.div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a video to start learning
            </div>
          )}
        </main>
        
        {/* Sidebar - appears second on mobile */}
        <aside className="lg:col-span-1 space-y-4">
          <motion.div
            className="relative bg-gray-800 rounded-lg shadow-sm"
            whileHover={{ y: -2 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 border bg-gray-800 text-gray-200 border-gray-700"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
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
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default VideoPlatform;