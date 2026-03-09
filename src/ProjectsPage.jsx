import { useState, useEffect } from 'react'
import { Github, ArrowRight, X, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useLanguage } from './i18n/LanguageContext'
import projectsData from './data/projects.json'
import Footer from './components/Footer'

const ProjectsPage = ({ theme }) => {
  const { t, language } = useLanguage()
  
  const [selectedProject, setSelectedProject] = useState(projectsData[0])
  const [previewImage, setPreviewImage] = useState(null)
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('projectFavorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('projectFavorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (projectId, e) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const sortedProjects = [...projectsData].sort((a, b) => {
    const aFav = favorites.includes(a.id)
    const bFav = favorites.includes(b.id)
    if (aFav && !bFav) return -1
    if (!aFav && bFav) return 1
    return 0
  })
  
  return (
    <div className={`min-h-screen transition-colors duration-700 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'
    }`}>
      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-9">
              <div className={`${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                <div className="flex items-start gap-8 mb-8">
                  <div className={`w-20 h-20 flex items-center justify-center transition-all duration-500 overflow-hidden ${
                    theme === 'dark' ? 'bg-white' : 'bg-[#0a0a0a]'
                  }`}>
                    <img 
                      src={selectedProject.icon} 
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        {selectedProject.name}
                      </h2>
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 mt-4 md:mt-0 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white text-[#0a0a0a] hover:bg-slate-200 shadow-lg hover:shadow-xl' 
                            : 'bg-[#0a0a0a] text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'
                        } transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          theme === 'dark' ? 'focus:ring-white focus:ring-offset-[#0a0a0a]' : 'focus:ring-[#0a0a0a] focus:ring-offset-[#fafafa]'
                        }`}
                      >
                        {t('projects.viewProject')}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                    <p className={`text-xl leading-relaxed mb-8 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
                
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <div className="mb-16 mt-12">
                    <div className="relative">
                      {selectedProject.screenshots.length > 3 && (
                        <>
                          <button
                            onClick={() => setCurrentScreenshotIndex(prev => Math.max(0, prev - 1))}
                            className={`absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full ${
                              theme === 'dark' ? 'bg-black bg-opacity-70 text-white' : 'bg-white bg-opacity-70 text-black'
                            } hover:bg-opacity-90 transition-all shadow-lg`}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setCurrentScreenshotIndex(prev => Math.min(selectedProject.screenshots.length - 3, prev + 1))}
                            className={`absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full ${
                              theme === 'dark' ? 'bg-black bg-opacity-70 text-white' : 'bg-white bg-opacity-70 text-black'
                            } hover:bg-opacity-90 transition-all shadow-lg`}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <div className="flex overflow-hidden gap-4">
                        <div 
                          className="flex gap-4 transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentScreenshotIndex * (100/3)}%)` }}
                        >
                          {selectedProject.screenshots.map((screenshot, index) => (
                            <div 
                              key={index} 
                              className="min-w-[33.333%] overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-700"
                              onClick={() => setPreviewImage(screenshot)}
                            >
                              <img 
                                src={screenshot} 
                                alt={`${selectedProject.name} screenshot ${index + 1}`}
                                className="w-full h-auto max-h-80 object-contain transition-transform duration-500 hover:scale-105"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className={`pt-8 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className={`text-xs font-bold tracking-widest uppercase mb-6 ${
                        theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {t('projects.repositories')}
                      </h3>
                      <div className="space-y-4">
                        {selectedProject.repositories.map((repo, repoIndex) => (
                          <a
                            key={repoIndex}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center gap-4 text-base transition-all duration-300 ${
                              theme === 'dark' 
                                ? 'text-slate-400 hover:text-white' 
                                : 'text-slate-600 hover:text-[#0a0a0a]'
                            }`}
                          >
                            <Github className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                            <span className="font-medium">{repo.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-xs font-bold tracking-widest uppercase mb-6 ${
                        theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {t('projects.tags')}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-5 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                              theme === 'dark' 
                                ? 'border border-slate-700 text-slate-300 hover:border-white hover:text-white' 
                                : 'border border-slate-300 text-slate-600 hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
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
            
            <div className="lg:col-span-3">
              <div className="sticky top-32">
                <div className="space-y-2">
                  {sortedProjects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project)
                        setCurrentScreenshotIndex(0)
                      }}
                      className={`w-full text-left p-4 transition-all duration-500 group ${
                        selectedProject.id === project.id 
                          ? theme === 'dark' 
                            ? 'bg-white text-[#0a0a0a]' 
                            : 'bg-[#0a0a0a] text-white'
                          : theme === 'dark' 
                            ? 'hover:bg-slate-900 text-slate-400' 
                            : 'hover:bg-slate-100 text-slate-600'
                      }`}
                      style={{
                        transitionDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300 overflow-hidden ${
                          selectedProject.id === project.id 
                            ? theme === 'dark' 
                              ? 'bg-[#0a0a0a]' 
                              : 'bg-white'
                            : ''
                        }`}>
                          <img 
                            src={project.icon} 
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm font-bold tracking-wide uppercase block truncate ${
                            selectedProject.id === project.id 
                              ? '' 
                              : 'opacity-60'
                          }`}>
                            {project.name}
                          </span>
                        </div>
                        <div
                          onClick={(e) => toggleFavorite(project.id, e)}
                          className={`p-1.5 rounded transition-all duration-200 ${
                            favorites.includes(project.id)
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : theme === 'dark'
                                ? 'text-slate-600 hover:text-yellow-500'
                                : 'text-slate-400 hover:text-yellow-500'
                          }`}
                        >
                          <Star 
                            className="w-4 h-4 transition-transform duration-200 hover:scale-110"
                            fill={favorites.includes(project.id) ? 'currentColor' : 'none'}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 图片预览模态框 */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[90vh] overflow-auto">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
      
      <Footer theme={theme} />
    </div>
  )
}

export default ProjectsPage