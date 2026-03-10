import { X, ExternalLink, Code, ArrowRight } from 'lucide-react'
import ProjectGallery from './ProjectGallery'
import { useLanguage } from '../i18n/LanguageContext'

const ProjectModal = ({ project, onClose, onImageClick, theme = 'light' }) => {
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl transform transition-all flex flex-col lg:flex-row ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
      }`}>
        
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-colors ${
            isDark ? 'bg-black/50 hover:bg-black/70 text-white' : 'bg-white/50 hover:bg-white/80 text-black'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Media */}
        <div className={`lg:w-7/12 relative flex flex-col ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
          {project.screenshots && project.screenshots.length > 0 ? (
            <div className="w-full h-full flex flex-col p-4">
              <ProjectGallery 
                images={project.screenshots}
                onImageClick={onImageClick}
                theme={theme}
                fullHeight={true}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-12">
              <img src={project.icon} alt={project.name} className="w-32 h-32 opacity-20" />
            </div>
          )}
        </div>

        {/* Right Column: Content */}
        <div className="lg:w-5/12 p-8 lg:p-10 flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl p-3 flex items-center justify-center shadow-lg ${
              isDark ? 'bg-slate-800' : 'bg-white border border-slate-100'
            }`}>
              <img src={project.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
              <div className="flex gap-2 mt-2 flex-wrap">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className={`text-xs px-2 py-1 rounded font-medium ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none mb-8 flex-grow">
            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {project.description}
            </p>
          </div>

          <div className="space-y-6 mt-auto pt-6 border-t border-dashed border-slate-200 dark:border-slate-800">
            {/* Repositories */}
            {project.repositories && project.repositories.length > 0 && (
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Repositories
                </h4>
                <div className="space-y-2">
                  {project.repositories.map((repo, idx) => (
                    <a
                      key={idx}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        isDark 
                          ? 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600' 
                          : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-medium text-sm">
                        <Code className="w-4 h-4" />
                        {repo.name}
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl ${
                isDark 
                  ? 'bg-white text-slate-900 hover:bg-slate-200' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {t('projects.viewProject') || 'View Project'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
