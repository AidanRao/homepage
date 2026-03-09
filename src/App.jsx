import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Github, ExternalLink, BookOpen, Code2, Sparkles, Zap } from 'lucide-react'
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

  const techStack = {
    frontend: ["React", "Vue", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    tools: ["Git", "Webpack", "Vite", "Docker", "Figma"]
  }

  if (!mounted) return null

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : theme === 'light'
          ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}>
        {/* 顶部导航栏 */}
        <Header theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={
            <main className="relative z-10 pt-24">
              {/* 背景装饰 */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-float transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-400/20'
                }`} />
                <div className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl animate-float animation-delay-200 transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-400/20'
                }`} />
                <div className={`absolute bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl animate-float animation-delay-400 transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-pink-500/10' : 'bg-pink-400/20'
                }`} />
              </div>

              {/* Hero Section */}
              <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-6xl mx-auto w-full">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* 左侧：个人信息 */}
                    <div className={`space-y-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'bg-blue-900/30 text-blue-400'
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Sparkles className="w-4 h-4" />
                        <span>{t('hero.title')}</span>
                      </div>
                      
                      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                        <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{t('hero.greeting')}</span>
                        <br />
                        <span className="gradient-text">{t('hero.name')}</span>
                      </h1>
                      
                      <p className={`text-lg max-w-lg leading-relaxed transition-colors duration-300 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {t('hero.description')}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 pt-4">
                        <a
                          href="https://blog.example.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                        >
                          <BookOpen className="w-5 h-5" />
                          {t('hero.blog')}
                        </a>
                        <a
                          href="https://github.com/AidanRao"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium hover-lift transition-colors duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800 text-slate-200 border border-slate-700'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          <Github className="w-5 h-5" />
                          {t('hero.github')}
                        </a>
                      </div>
                    </div>

                    {/* 右侧：头像卡片 */}
                    <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                      <div className="relative">
                        {/* 装饰圆环 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse-slow" />
                        
                        {/* 头像卡片 */}
                        <div className="relative w-80 h-80 rounded-3xl glass-card p-2 glow-border">
                          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-8xl font-bold text-white">R</span>
                          </div>
                          
                          {/* 浮动标签 */}
                          <div className={`absolute -top-4 -right-4 px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-float transition-colors duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800 text-slate-200 border border-slate-700'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}>
                            {t('hero.experience')}
                          </div>
                          <div className={`absolute -bottom-4 -left-4 px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-float animation-delay-200 transition-colors duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800 text-slate-200 border border-slate-700'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}>
                            {t('hero.fullstack')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Details Section */}
              <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-4xl font-bold text-center mb-16">
                    <span className="gradient-text">{t('details.title')}</span>
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* 学习经历 */}
                    <div className={`glass-card rounded-2xl p-8 hover-lift glow-border transition-colors duration-300 ${
                      theme === 'dark' ? 'border-slate-700/50' : 'border-white/20'
                    }`}>
                      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        {t('details.education.title')}
                      </h3>
                      <div className="space-y-6">
                        {education.map((edu, index) => (
                          <div key={index} className="relative pl-6 border-l-2 border-blue-500 dark:border-blue-400">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-slate-800" />
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{edu.period}</div>
                                <h4 className={`text-lg font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                                }`}>{edu.degree}</h4>
                                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{edu.school}</p>
                                {edu.college && (
                                  <p className={`text-sm mt-1 ${
                                    theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                                  }`}>{edu.college}</p>
                                )}
                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                                  theme === 'dark'
                                    ? 'bg-blue-900/30 text-blue-400'
                                    : 'bg-blue-100 text-blue-600'
                                }`}>
                                  {edu.type}
                                </span>
                              </div>
                              {edu.logo && (
                                <img 
                                  src={edu.logo} 
                                  alt={edu.school} 
                                  className="w-12 h-12 object-contain flex-shrink-0"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 工作经历 */}
                    <div className={`glass-card rounded-2xl p-8 hover-lift glow-border transition-colors duration-300 ${
                      theme === 'dark' ? 'border-slate-700/50' : 'border-white/20'
                    }`}>
                      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-white" />
                        </div>
                        {t('details.experience.title')}
                      </h3>
                      <div className="space-y-6">
                        {experience.map((exp, index) => (
                          <div key={index} className="relative pl-6 border-l-2 border-purple-500 dark:border-purple-400">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-400 border-4 border-white dark:border-slate-800" />
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">{exp.period}</div>
                                <h4 className={`text-lg font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                                }`}>{exp.role}</h4>
                                {exp.link ? (
                                  <a 
                                    href={exp.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`font-medium hover:underline inline-block mt-1 ${
                                      theme === 'dark' ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'
                                    }`}
                                  >
                                    {exp.company}
                                  </a>
                                ) : (
                                  <p className={`font-medium mt-1 ${
                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                  }`}>{exp.company}</p>
                                )}
                                <p className={`text-sm mt-2 ${
                                  theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                                }`}>{exp.description}</p>
                              </div>
                              {exp.logo && (
                                <img 
                                  src={exp.logo} 
                                  alt={exp.company} 
                                  className="w-12 h-12 object-contain flex-shrink-0"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 研究方向 */}
                    <div className={`glass-card rounded-2xl p-8 hover-lift glow-border transition-colors duration-300 ${
                      theme === 'dark' ? 'border-slate-700/50' : 'border-white/20'
                    }`}>
                      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        {t('details.research.title')}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {researchTopics.map((topic, index) => (
                          <span
                            key={index}
                            className={`px-4 py-2 rounded-full text-sm font-medium border hover:scale-105 transition-transform cursor-default ${
                              theme === 'dark'
                                ? 'bg-gradient-to-r from-pink-900/30 to-orange-900/30 text-pink-300 border-pink-800'
                                : 'bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border-pink-200'
                            }`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 技术栈 */}
                    <div className={`glass-card rounded-2xl p-8 hover-lift glow-border transition-colors duration-300 ${
                      theme === 'dark' ? 'border-slate-700/50' : 'border-white/20'
                    }`}>
                      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        {t('details.techStack.title')}
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(techStack).map(([category, techs]) => (
                          <div key={category}>
                            <h4 className={`text-sm font-medium uppercase tracking-wider mb-2 ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              {category === 'frontend' ? t('details.techStack.frontend') : category === 'backend' ? t('details.techStack.backend') : t('details.techStack.tools')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {techs.map((tech, index) => (
                                <span
                                  key={index}
                                  className={`px-3 py-1 rounded-lg text-sm transition-colors cursor-default ${
                                    theme === 'dark'
                                      ? 'bg-slate-700 text-slate-300 hover:bg-blue-900/30 hover:text-blue-400'
                                      : 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-600'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <Footer theme={theme} />
            </main>
          } />
          <Route path="/projects" element={<ProjectsPage theme={theme} />} />
        </Routes>
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
