import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import ImageFromSeed from './components/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ImageFromSeed/>
    </React.StrictMode>
);
