import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Github, ExternalLink, BookOpen, Code2, Sparkles, MapPin, Mail, Linkedin } from 'lucide-react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import profileData from './data/profile.json'
import ProjectsPage from './ProjectsPage'
import Header from './components/Header'
import Footer from './components/Footer'

function AppContent() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.classList.toggle('dark', prefersDark)
      } else {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark')
        document.documentElement.classList.toggle('light', savedTheme === 'light')
      }
    } else {
      setTheme('system')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'system') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      document.documentElement.classList.toggle('light', newTheme === 'light')
    }
  }

  const education = profileData.education[language] || []
  const experience = profileData.experience[language] || []
  const researchTopics = profileData.researchTopics[language] || []
  const hero = profileData.hero[language] || {}

  if (!mounted) return null

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 font-sans ${
        theme === 'dark' 
          ? 'bg-zinc-950 text-zinc-100'
          : 'bg-zinc-50 text-zinc-900'
      }`}>
        {/* 顶部导航栏 */}
        <Header theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={
            <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {/* Hero Section - Centered & Minimal */}
              <section className="text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                  theme === 'dark' ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-200 text-zinc-600'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {hero.title}
                </div>
                
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                  {hero.greeting} <span className="text-blue-600 dark:text-blue-500">{profileData.name[language]}</span>
                </h1>
                
                <p className={`text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed mb-8 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {hero.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://github.com/AidanRao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-white text-zinc-900 hover:bg-zinc-200'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href="https://blog.aidanrao.top"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105 border ${
                      theme === 'dark'
                        ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
                        : 'border-zinc-200 hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    Blog
                  </a>
                </div>
              </section>

              {/* Grid Layout for Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
                
                {/* Experience - Spans 7 cols */}
                <div className={`md:col-span-7 p-8 rounded-3xl transition-all hover:shadow-xl ${
                  theme === 'dark' ? 'bg-zinc-900/50 hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50 shadow-sm'
                }`}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{t('details.experience.title')}</h2>
                  </div>
                  <div className="space-y-8">
                    {experience.map((exp, index) => (
                      <div key={index} className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
                        <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ${
                          theme === 'dark' ? 'bg-purple-500 ring-zinc-900' : 'bg-purple-600 ring-white'
                        }`} />
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <span className={`text-xs font-mono mb-1 block ${
                              theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>{exp.period}</span>
                            <h3 className="text-lg font-bold">{exp.role}</h3>
                            
                            {exp.link ? (
                              <a 
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm font-medium mb-2 hover:underline inline-block ${
                                  theme === 'dark' ? 'text-zinc-300 hover:text-purple-400' : 'text-zinc-600 hover:text-purple-600'
                                }`}
                              >
                                {exp.company}
                              </a>
                            ) : (
                              <div className={`text-sm font-medium mb-2 ${
                                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
                              }`}>{exp.company}</div>
                            )}
                            
                            <p className={`text-sm leading-relaxed ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                            }`}>{exp.description}</p>
                          </div>
                          
                          {exp.logo && (
                            <div className={`w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center ${
                              theme === 'dark' ? 'bg-zinc-800' : 'bg-white shadow-sm border border-zinc-100'
                            }`}>
                              <img 
                                src={exp.logo} 
                                alt={exp.company} 
                                className="w-10 h-10 object-contain"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education - Spans 5 cols */}
                <div className={`md:col-span-5 p-8 rounded-3xl transition-all hover:shadow-xl ${
                  theme === 'dark' ? 'bg-zinc-900/50 hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50 shadow-sm'
                }`}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{t('details.education.title')}</h2>
                  </div>
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={index} className={`p-4 rounded-2xl transition-colors ${
                        theme === 'dark' ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-zinc-50 hover:bg-zinc-100'
                      }`}>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold">{edu.school}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className={`text-sm font-medium ${
                                    theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                                  }`}>{edu.degree}</p>
                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                    theme === 'dark'
                                      ? 'bg-zinc-700 text-zinc-300'
                                      : 'bg-zinc-200 text-zinc-600'
                                  }`}>
                                    {edu.type}
                                  </span>
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                                theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                              }`}>{edu.period}</span>
                            </div>
                            
                            {edu.college && (
                              <p className={`text-xs mt-1 ${
                                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                              }`}>{edu.college}</p>
                            )}
                          </div>
                          {edu.logo && (
                            <div className={`w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center ${
                              theme === 'dark' ? 'bg-zinc-800' : 'bg-white shadow-sm border border-zinc-100'
                            }`}>
                              <img 
                                src={edu.logo} 
                                alt={edu.school} 
                                className="w-10 h-10 object-contain"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* About / Bio - Spans full width on mobile, 8 cols on desktop */}
                <div className={`md:col-span-8 p-8 rounded-3xl transition-all hover:shadow-xl ${
                  theme === 'dark' ? 'bg-zinc-900/50 hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50 shadow-sm'
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{t('details.research.title')}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {researchTopics.map((topic, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          theme === 'dark'
                            ? 'bg-zinc-800 text-zinc-300 hover:text-blue-400'
                            : 'bg-zinc-100 text-zinc-700 hover:text-blue-600'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connect / Contact - Spans 4 cols */}
                <div className={`md:col-span-4 p-8 rounded-3xl flex flex-col justify-between transition-all hover:shadow-xl ${
                  theme === 'dark' ? 'bg-zinc-900/50 hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50 shadow-sm'
                }`}>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Connect</h2>
                    <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Let's build something together.
                    </p>
                  </div>
                  <div className="space-y-4">
                     <a href="mailto:chenxuanrao.work@gmail.com" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Email Me</span>
                     </a>
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className={`font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>Beijing</span>
                     </div>
                  </div>
                </div>

              </div>
            </main>
          } />
          <Route path="/projects" element={<ProjectsPage theme={theme} />} />
        </Routes>
        <Footer theme={theme} />
      </div>
    </Router>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
