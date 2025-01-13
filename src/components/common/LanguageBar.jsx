import React, { useState } from "react";
import down from "../../assets/down.png";
import up from "../../assets/up.png";

function LanguageBar({ setLanguage, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const languages = ["English", "Urdu/Hindi"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };

  return (
    <div className="language-dropdown p-abs">
      <div className="selected-language" onClick={toggleDropdown}>
        {language ? language : "Select Language"}
        <span className="d-flex box">
          <img src={isOpen ? up : down} alt="" />
        </span>
      </div>
      {isOpen && (
        <div className="language-list">
          {languages.map((lang) => (
            <div key={lang} className={`language-option ${language === lang ? "selected" : ""}`} onClick={() => handleLanguageSelect(lang)}>
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageBar;
