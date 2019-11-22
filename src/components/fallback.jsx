import React from 'react';
import './app.scss';
const Fallback = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">{'Page Not Found'}</h1>
            </header>
        </div>
    );
};
export default Fallback;
