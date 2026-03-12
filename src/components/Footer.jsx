import { useLanguage } from '../i18n/LanguageContext'
import { Globe } from 'lucide-react'

const Footer = ({ theme }) => {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <footer className={`py-12 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-zinc-950 border-zinc-900 text-zinc-400' 
        : 'bg-zinc-50 border-zinc-200 text-zinc-500'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm">
            {t('footer.copyright')}
          </p>

          {/* Links */}
          <div className="flex items-start gap-12">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-8">
                <a 
                  href="/" 
                  className={`text-sm hover:underline ${
                    theme === 'dark' ? 'hover:text-zinc-200' : 'hover:text-zinc-900'
                  }`}
                >
                  Home
                </a>
                <a 
                  href="https://joinup-admin.aidanrao.top" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-sm hover:underline ${
                    theme === 'dark' ? 'hover:text-zinc-200' : 'hover:text-zinc-900'
                  }`}
                >
                  joinup
                </a>
              </div>
              <a 
                href="https://blog.aidanrao.top" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm hover:underline ${
                  theme === 'dark' ? 'hover:text-zinc-200' : 'hover:text-zinc-900'
                }`}
              >
                Blog
              </a>
            </div>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => toggleLanguage(language === 'zh' ? 'en' : 'zh')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-700'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'zh' ? 'English' : '中文'}</span>
          </button>
      </div>
    </footer>
  )
}

export default Footer
