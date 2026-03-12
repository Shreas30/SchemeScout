import React from 'react';

const Navbar = ({ onHome }) => {
  return (
    <nav className="navbar no-print">
      {/* Brand Name - Static (Non-clickable) */}
      <div className="logo">
        <h2 style={{ margin: 0, cursor: 'default', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'white' }}>SCHEME</span>
          <span style={{ 
            color: 'var(--secondary)', 
            background: 'rgba(255,255,255,0.1)', 
            padding: '2px 8px', 
            borderRadius: '6px' 
          }}>SCOUT</span>
        </h2>
      </div>

      {/* Professional Menu Links */}
      <div className="nav-links">
        <button onClick={onHome} className="nav-item">Home</button>
        <button 
          onClick={() => alert("SchemeScout helps Indian citizens find government benefits using AI.")} 
          className="nav-item"
        >
          About
        </button>
        <button 
          onClick={() => alert("Contact us at: support@schemescout.in")} 
          className="nav-item"
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar;