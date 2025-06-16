import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      {/* <img src="assets/icons/icon-translate.svg" alt="translate" /> */}
      <button onClick={() => changeLanguage('vi')}>🇻🇳</button>
      <button onClick={() => changeLanguage('en')}>🇺🇸</button>
      <button onClick={() => changeLanguage('zh')}>🇨🇳</button>
    </div>
  );
};

export default LanguageSwitcher;
