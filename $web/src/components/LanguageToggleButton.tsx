import React, { useState, useEffect } from 'react';

const LanguageToggleButton: React.FC = () => {
    const [language, setLanguage] = useState<'en' | 'he'>('he');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
        // Smooth transition for direction and color
        document.body.style.transition = 'background 0.5s, color 0.5s';
        document.documentElement.style.transition = 'background 0.5s, color 0.5s';
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'he' : 'en'));
    };

    return (
        <button
            onClick={toggleLanguage}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: language === 'he'
                    ? 'linear-gradient(135deg, #E5E5E5, #FF4141)'
                    : 'linear-gradient(135deg, #FF4141, #E5E5E5)',
                color: '#0b0c10',
                textShadow: '0 1px 1px rgba(255, 255, 255, 0.2)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.5s, transform 0.3s, box-shadow 0.3s, color 0.5s',
                boxShadow: language === 'he'
                    ? '0 2px 8px rgba(255, 65, 65, 0.4)'
                    : '0 2px 8px rgba(229, 229, 229, 0.4)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                fontWeight: 700,
                fontSize: '1.1em',
                letterSpacing: '0.05em',
            }}
            aria-label={language === 'he' ? 'Switch to English' : 'החלף לעברית'}
        >
            {language === 'he' ? 'English' : 'עברית'}
        </button>
    );
};

export default LanguageToggleButton;
