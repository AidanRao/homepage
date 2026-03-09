import { useLanguage } from '../i18n/LanguageContext'
import { Globe } from 'lucide-react'

const Footer = ({ theme }) => {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <footer className={`py-8 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900/50 border-slate-800' 
        : 'bg-white/50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 版权信息 */}
          <p className={`text-sm transition-colors duration-300 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {t('footer.copyright')}
          </p>

          {/* 导航链接 */}
          <div className="flex items-start gap-8">
            <div className="flex flex-col items-start gap-2">
              <a 
                href="/" 
                className={`text-sm transition-colors duration-300 hover:underline ${
                  theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Home
              </a>
              <a 
                href="https://blog.aidanrao.top" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm transition-colors duration-300 hover:underline ${
                  theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Blog
              </a>
            </div>
            <div className="flex flex-col items-start gap-2">
              <a 
                href="https://joinup-admin.aidanrao.top" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm transition-colors duration-300 hover:underline ${
                  theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Joinup
              </a>
            </div>
          </div>

          {/* 语言切换 - 带动画 */}
          <div className="flex items-center gap-2">
            <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
            <span className={`text-sm mr-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {t('footer.language')}
            </span>
            <div className={`relative flex items-center p-1.5 rounded-full transition-colors duration-500 ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
            }`}>
              {/* 滑动背景 */}
              <div
                className={`absolute h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-all duration-500 ease-spring ${
                  language === 'en' ? 'left-1/2 right-1.5' : 'left-1.5 right-1/2'
                }`}
              />

              <button
                onClick={() => toggleLanguage('zh')}
                className={`relative z-10 px-4 h-8 flex items-center justify-center gap-2 rounded-full transition-all duration-300 ${
                  language === 'zh' ? 'text-white' : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="text-sm font-medium">中文</span>
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className={`relative z-10 px-4 h-8 flex items-center justify-center gap-2 rounded-full transition-all duration-300 ${
                  language === 'en' ? 'text-white' : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="text-sm font-medium">EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer