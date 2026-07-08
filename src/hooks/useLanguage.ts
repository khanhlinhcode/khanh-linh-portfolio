import { useEffect, useState } from 'react';
import type { Language } from '../i18n/translations';

const LANGUAGE_STORAGE_KEY = 'language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage === 'vi' ? 'vi' : 'en';
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'vi' : 'en'));
  }

  return { language, setLanguage, toggleLanguage };
}
