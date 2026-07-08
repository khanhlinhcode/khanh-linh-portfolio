import { useEffect, useState } from 'react';
import type { Language } from '../i18n/translations';

const LANGUAGE_STORAGE_KEY = 'language';
const LANGUAGE_TRANSITION_MS = 300;

let languageTransitionTimeout: number | undefined;

function startLanguageTransition() {
  if (typeof window === 'undefined') {
    return;
  }

  window.clearTimeout(languageTransitionTimeout);
  document.documentElement.classList.remove('is-language-switching');
  void document.documentElement.offsetWidth;
  document.documentElement.classList.add('is-language-switching');
  languageTransitionTimeout = window.setTimeout(() => {
    document.documentElement.classList.remove('is-language-switching');
  }, LANGUAGE_TRANSITION_MS);
}

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
    startLanguageTransition();
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'vi' : 'en'));
  }

  function changeLanguage(nextLanguage: Language) {
    if (nextLanguage === language) {
      return;
    }

    startLanguageTransition();
    setLanguage(nextLanguage);
  }

  return { language, setLanguage: changeLanguage, toggleLanguage };
}
