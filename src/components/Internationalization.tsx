import { useEffect, useCallback } from 'react';

interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

const supportedLocales: LocaleConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', direction: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', direction: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', direction: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl' }
];

export function Internationalization() {
  // Detect user's preferred language
  const detectUserLanguage = useCallback(() => {
    const browserLang = navigator.language.split('-')[0];
    const storedLang = localStorage.getItem('preferred-language');
    
    return storedLang || browserLang || 'en';
  }, []);

  // Set language and direction
  const setLanguage = useCallback((localeCode: string) => {
    const locale = supportedLocales.find(loc => loc.code === localeCode);
    if (locale) {
      document.documentElement.lang = localeCode;
      document.documentElement.dir = locale.direction;
      localStorage.setItem('preferred-language', localeCode);
      
      // Update page title and meta tags
      updatePageContent(localeCode);
      
      // Trigger language change event
      window.dispatchEvent(new CustomEvent('languageChange', { detail: locale }));
    }
  }, []);

  // Update page content based on language
  const updatePageContent = useCallback((localeCode: string) => {
    // This would typically involve loading translation files
    // For now, we'll just update basic elements
    
    const titleElement = document.querySelector('title');
    if (titleElement) {
      switch (localeCode) {
        case 'id':
          titleElement.textContent = 'Gusti Padaka - Mahasiswa Informatika & Full-Stack Developer';
          break;
        case 'ja':
          titleElement.textContent = 'Gusti Padaka - 情報学学生 & フルスタック開発者';
          break;
        case 'zh':
          titleElement.textContent = 'Gusti Padaka - 信息学学生 & 全栈开发者';
          break;
        case 'ar':
          titleElement.textContent = 'Gusti Padaka - طالب علوم الحاسوب ومطور Full-Stack';
          break;
        default:
          titleElement.textContent = 'Gusti Padaka - Informatics Student & Full-Stack Developer';
      }
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      switch (localeCode) {
        case 'id':
          metaDescription.setAttribute('content', 'Mahasiswa informatika yang mengkhususkan diri dalam pengembangan web, AI/ML, dan solusi perangkat lunak modern. Jelajahi proyek dan pengalaman saya dalam pengembangan full-stack.');
          break;
        case 'ja':
          metaDescription.setAttribute('content', 'Web開発、AI/ML、モダンなソフトウェアソリューションを専門とする情報学学生。フルスタック開発における私のプロジェクトと経験をご覧ください。');
          break;
        case 'zh':
          metaDescription.setAttribute('content', '专注于Web开发、AI/ML和现代软件解决方案的信息学学生。探索我在全栈开发中的项目和经验。');
          break;
        case 'ar':
          metaDescription.setAttribute('content', 'طالب علوم الحاسوب متخصص في تطوير الويب والذكاء الاصطناعي/التعلم الآلي والحلول البرمجية الحديثة. اكتشف مشاريعي وخبرتي في التطوير الشامل.');
          break;
        default:
          metaDescription.setAttribute('content', 'Informatics student specializing in web development, AI/ML, and modern software solutions. Explore my projects and experience in full-stack development.');
      }
    }
  }, []);

  // Add language switcher to the page
  const addLanguageSwitcher = useCallback(() => {
    // Check if language switcher already exists
    if (document.querySelector('#language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.id = 'language-switcher';
    switcher.className = 'fixed top-20 right-4 z-40 bg-background border border-border rounded-lg shadow-lg p-2';
    switcher.innerHTML = `
      <div class="text-xs text-muted-foreground mb-2 px-2">Language</div>
      ${supportedLocales.map(locale => `
        <button 
          class="w-full text-left px-3 py-2 rounded hover:bg-muted transition-colors flex items-center space-x-2 ${
            document.documentElement.lang === locale.code ? 'bg-primary text-primary-foreground' : ''
          }"
          data-locale="${locale.code}"
        >
          <span>${locale.flag}</span>
          <span>${locale.name}</span>
        </button>
      `).join('')}
    `;

    // Add event listeners
    switcher.addEventListener('click', (e) => {
      const button = (e.target as HTMLElement).closest('button');
      if (button) {
        const localeCode = button.dataset.locale;
        if (localeCode) {
          setLanguage(localeCode);
          // Update active state
          switcher.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('bg-primary', 'text-primary-foreground');
          });
          button.classList.add('bg-primary', 'text-primary-foreground');
        }
      }
    });

    document.body.appendChild(switcher);
  }, [setLanguage]);

  // Initialize internationalization
  useEffect(() => {
    const userLanguage = detectUserLanguage();
    setLanguage(userLanguage);
    
    // Add language switcher after a delay
    const timer = setTimeout(addLanguageSwitcher, 1000);

    return () => {
      clearTimeout(timer);
      // Remove language switcher on cleanup
      const switcher = document.querySelector('#language-switcher');
      if (switcher) {
        switcher.remove();
      }
    };
  }, [detectUserLanguage, setLanguage, addLanguageSwitcher]);

  return null;
}
