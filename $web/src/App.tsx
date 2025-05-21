import React, { Suspense } from 'react';
import LanguageToggleButton from './components/LanguageToggleButton';

const App: React.FC = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LanguageToggleButton />
                <style>{`
                    button:hover {
                        transform: scale(1.05);
                        transition: transform 0.2s ease-in-out;
                    }
                `}</style>
            </Suspense>
        </div>
    );
};

export default App;