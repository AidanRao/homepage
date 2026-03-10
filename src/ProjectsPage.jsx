import { useState, useRef } from 'react'
import { Github, ArrowRight, X, ExternalLink, Code, Maximize2 } from 'lucide-react'
import { useLanguage } from './i18n/LanguageContext'
import projectsData from './data/projects.json'
import Footer from './components/Footer'
import ProjectGallery from './components/ProjectGallery'
import ProjectModal from './components/ProjectModal'

const ProjectsPage = ({ theme }) => {
  const { t, language } = useLanguage()
  
  const [selectedProject, setSelectedProject] = useState(projectsData[0])
  const [previewImage, setPreviewImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Ref for scrolling to top of detail view on mobile
  const detailRef = useRef(null)

  const isDark = theme === 'dark'
  
  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${
      isDark ? 'bg-[#0a0a0a] text-slate-100' : 'bg-[#fafafa] text-slate-900'
    }`}>
      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start h-full">
          
          {/* Main Detail View (Left/Top) */}
          <div className="lg:col-span-8 lg:sticky lg:top-24 transition-all duration-500" ref={detailRef}>
            <div className={`rounded-3xl p-8 md:p-12 transition-all duration-500 shadow-xl border ${
              isDark 
                ? 'bg-[#121212] border-white/5 shadow-black/50' 
                : 'bg-white border-black/5 shadow-slate-200/50'
            }`}>
              {/* Header: Icon + Title */}
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div 
                  className={`w-24 h-24 shrink-0 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer ${
                    isDark ? 'bg-white/5' : 'bg-slate-50'
                  }`}
                  onClick={() => setIsModalOpen(true)}
                >
                  <img 
                    src={selectedProject.icon} 
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <h2 
                      className={`text-3xl md:text-4xl font-bold tracking-tight leading-tight cursor-pointer hover:opacity-80 transition-opacity ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                      onClick={() => setIsModalOpen(true)}
                    >
                      {selectedProject.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className={`p-3 rounded-full transition-all duration-300 ${
                          isDark 
                            ? 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white' 
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                        title="View Full Details"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wide uppercase rounded-full transition-all duration-300 ${
                          isDark 
                            ? 'bg-white text-black hover:bg-slate-200' 
                            : 'bg-black text-white hover:bg-slate-800'
                        } hover:shadow-lg hover:-translate-y-0.5`}
                      >
                        {t('projects.viewProject')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                  
                  <p className={`text-lg md:text-xl leading-relaxed font-light line-clamp-3 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {selectedProject.description}
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className={`mt-2 text-sm font-medium hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    Read more
                  </button>
                </div>
              </div>
              
              {/* Gallery Component */}
              {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                <div className="mb-12">
                  <ProjectGallery 
                    images={selectedProject.screenshots}
                    onImageClick={setPreviewImage}
                    theme={theme}
                  />
                </div>
              )}
              
              {/* Info Grid: Repos & Tags */}
              <div className={`pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  
                  {/* Repositories */}
                  <div>
                    <h3 className={`text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2 ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <Code className="w-4 h-4" />
                      {t('projects.repositories')}
                    </h3>
                    <div className="space-y-3">
                      {selectedProject.repositories.map((repo, repoIndex) => (
                        <a
                          key={repoIndex}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${
                            isDark 
                              ? 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10 hover:text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 hover:text-slate-900 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Github className="w-5 h-5" />
                            <span className="font-medium text-sm">{repo.name}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className={`text-xs font-bold tracking-widest uppercase mb-4 ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {t('projects.tags')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-3 py-1.5 text-xs font-medium tracking-wide uppercase rounded-lg transition-all duration-300 ${
                            isDark 
                              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20' 
                              : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* List Sidebar (Right/Bottom) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar lg:pl-4 pt-2">
            {projectsData.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project)
                  // Scroll to top on mobile
                  if (window.innerWidth < 1024) {
                    detailRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`w-full text-left p-3 rounded-xl transition-all duration-300 group border relative overflow-hidden ${
                  selectedProject.id === project.id 
                    ? isDark 
                      ? 'bg-slate-800/80 border-slate-700 shadow-md ring-1 ring-blue-500/30' 
                      : 'bg-white border-slate-200 shadow-sm ring-1 ring-blue-500/30'
                    : isDark 
                      ? 'bg-transparent border-transparent hover:bg-slate-800/50' 
                      : 'bg-transparent border-transparent hover:bg-slate-100'
                }`}
              >
                {/* Active Indicator (Subtle vertical pill) */}
                {selectedProject.id === project.id && (
                  <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-500 rounded-full" />
                )}

                <div className="flex items-center gap-4 pl-3">
                  <div className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedProject.id === project.id 
                      ? 'scale-100 ring-2 ring-blue-500/20'
                      : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                  } ${isDark ? 'bg-black/40' : 'bg-slate-100'}`}>
                    <img 
                      src={project.icon} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`text-base font-bold tracking-tight truncate transition-colors duration-300 ${
                        selectedProject.id === project.id 
                          ? isDark ? 'text-blue-400' : 'text-blue-600'
                          : isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        {project.name}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${
                      selectedProject.id === project.id
                        ? isDark ? 'text-slate-400' : 'text-slate-500'
                        : isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {project.tags.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </main>
      
      {/* Full Screen Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-7xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
      
      <Footer theme={theme} />

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={() => setIsModalOpen(false)}
          onImageClick={setPreviewImage}
          theme={theme}
        />
      )}
    </div>
  )
}

export default ProjectsPage