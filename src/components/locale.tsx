import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage('vi')}>🇻🇳</button>
      <button onClick={() => changeLanguage('en')}>🇺🇸</button>
      <button onClick={() => changeLanguage('zh')}>🇨🇳</button>
    </div>
  );
};

export default LanguageSwitcher;
