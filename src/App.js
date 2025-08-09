import React from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingLeaves from './components/leaves/leaves';
import './App.css';

function App() {
  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      {/* Info overlay */}
      
      <div className = "start-page">
        <div className="rose-div"><img className="rose" src="roses.png"></img></div>
        <div className="save-the-date-title">
          <h1 className="save-the-date-text">12. Oktobar 2025</h1>
        </div>
        <div className="subtitle">
          <h1 className="subtitle-text">POZIVAMO VAS DA SVOJIM PRISUSTVOM UVELIČATE NAŠE VENČANJE</h1>
        </div>
        <div className="names-title">
          <h1 className="names-title-text">PETRA & DANILO</h1>
        </div>
        <div className="save-the-date-title">
          <h1 className="subtitle-text">MOLIMO DA DOLAZAK POTVRDITE DO 1. OKTOBRA 2025</h1>
        </div>
        <div className="rose-div"><img className="rose inverted" src="roses.png"></img></div>
      </div>

      <div className = "church-wedding">
        <div className="church-sub title">
          <h1 className="church-text">CRKVENO VENČANJE</h1>
        </div>
        <div className="church-sub text">
          <h1 className="church-sub-expl">12H SABORNA CRKVA U NIŠU</h1>
        </div>
        <div className="btm-img">
          <img className="img" src="saborna.png"></img>
          <div className="gradient-overlay"></div>
        </div>
      </div>

      <div className = "church-wedding">
        <div className="church-sub title">
          <h1 className="church-text">PROSLAVA U RESTORANU</h1>
        </div>
        <div className="church-sub text">
          <h1 className="church-sub-expl">14H RESTORAN GUSAR</h1>
        </div>
        <div className="btm-img">
          <img className="img" src="gusar.png"/>
          <div className="gradient-overlay"></div>
        </div>
      </div>

      {/* Three.js Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',  // Makes canvas non-interactive, allows clicks to pass through
          zIndex: 1000,          // High z-index to stay on top
          background: 'transparent'
        }}
        gl={{ alpha: true }}     // Enable alpha/transparency
      >
        {/* Lighting */}
        
        {/* 3D Objects */}
        <FloatingLeaves count={150} />
        
      </Canvas>
    </div>
  );
}

export default App;