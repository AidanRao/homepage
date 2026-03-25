import { useLanguage } from '../i18n/LanguageContext'
import { Globe } from 'lucide-react'

const Footer = ({ theme }) => {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <footer className={`relative py-8 px-4 sm:px-6 lg:px-8 border-t transition-all duration-500 ${
      theme === 'dark'
        ? 'bg-zinc-950/80 backdrop-blur-sm border-zinc-800/50 text-zinc-400'
        : 'bg-white/80 backdrop-blur-sm border-zinc-200/50 text-zinc-500'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="w-full md:w-auto flex-shrink-0">
            <p className="text-sm font-medium text-center md:text-left whitespace-nowrap">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Links - Grid Layout */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 items-center">
            <a
              href="/"
              className={`text-sm font-medium transition-all duration-300 hover:underline cursor-pointer whitespace-nowrap ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              Home
            </a>
            <a
              href="https://joinup-admin.aidanrao.top"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-all duration-300 hover:underline cursor-pointer whitespace-nowrap ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              Joinup
            </a>
            <a
              href="https://blog.aidanrao.top"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-all duration-300 hover:underline cursor-pointer whitespace-nowrap ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              Blog
            </a>
            <a
              href="https://cv.aidanrao.top"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-all duration-300 hover:underline cursor-pointer whitespace-nowrap ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              {t('footer.cv')}
            </a>
            <a
              href="https://sso.aidanrao.top"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-all duration-300 hover:underline cursor-pointer whitespace-nowrap ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              {t('footer.sso')}
            </a>
          </div>

          {/* Language Switcher - Fixed Width */}
          <div className="w-full md:w-auto flex-shrink-0 flex justify-center md:justify-end">
            <button
              onClick={() => toggleLanguage(language === 'zh' ? 'en' : 'zh')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                theme === 'dark'
                  ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-blue-400 border border-zinc-700/50 hover:border-zinc-700'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-blue-600 border border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="min-w-[3rem]">{language === 'zh' ? 'English' : '中文'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
