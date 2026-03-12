import { useState } from 'react';
import { schemeData } from './data/schemes';
import { filterSchemes } from './utils/filterLogic';
import { explainSchemeWithAI } from './utils/aiHelper';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

// Components
import Navbar from './components/Navbar';
import SchemeCard from './components/SchemeCard';
import CategoryCard from './components/CategoryCard';

function App() {
  const [page, setPage] = useState('home'); 
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(null); 
  
  const [user, setUser] = useLocalStorage('user-data', { age: '', income: '' });
  const [matches, setMatches] = useState([]);

  // Logic to find matches based on user profile and category
  const findSchemes = () => {
    const results = filterSchemes(user, schemeData, category);
    setMatches(results);
    setPage('results');
  };

  // AI Logic for specific scheme explanation
  const handleAskAI = async (scheme) => {
    setIsLoading(scheme.id); 
    const text = await explainSchemeWithAI(scheme, user);
    
    const updatedMatches = matches.map(s => 
      s.id === scheme.id ? { ...s, aiReason: text } : s
    );
    
    setMatches(updatedMatches);
    setIsLoading(null);
  };

  // Triggers browser print dialog styled via @media print in App.css
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="app-container">
      <Navbar onHome={() => setPage('home')} />

      <main className="main-content">
        
        {/* PAGE 1: HERO */}
        {page === 'home' && (
          <div className="card hero-card">
            <h1>SchemeScout 🇮🇳</h1>
            <p>Empowering citizens with AI-driven government scheme discovery.</p>
            <button className="primary-btn" onClick={() => setPage('categories')}>
              Start Scouting
            </button>
          </div>
        )}

        {/* PAGE 2: CATEGORY SELECTION */}
        {page === 'categories' && (
          <div className="card">
            <button className="back-link no-print" onClick={() => setPage('home')}>← Back</button>
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Select a Category</h2>
            <div className="grid">
              <CategoryCard 
                title="Education" icon="🎓" description="Scholarships & Loans"
                onClick={() => { setCategory('education'); setPage('form'); }} 
              />
              <CategoryCard 
                title="Farming" icon="🚜" description="Subsidies & Insurance"
                onClick={() => { setCategory('farming'); setPage('form'); }} 
              />
              <CategoryCard 
                title="Women" icon="👩" description="Empowerment & Savings"
                onClick={() => { setCategory('women'); setPage('form'); }} 
              />
              <CategoryCard 
                title="Startup" icon="🚀" description="Funding & Mentorship"
                onClick={() => { setCategory('startup'); setPage('form'); }} 
              />
            </div>
          </div>
        )}

        {/* PAGE 3: DATA INPUT FORM */}
        {page === 'form' && (
          <div className="card form-card">
            <button className="back-link no-print" onClick={() => setPage('categories')}>← Back to Categories</button>
            <h2>Personalize Your Results</h2>
            <p className="subtitle">Checking eligibility for <strong>{category}</strong> schemes.</p>
            
            <div className="input-group">
              <label>Applicant Age</label>
              <input 
                type="number" 
                placeholder="Enter age (e.g. 22)" 
                value={user.age}
                onChange={(e) => setUser({...user, age: e.target.value})} 
              />
            </div>

            <div className="input-group">
              <label>Annual Family Income (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 500000" 
                value={user.income}
                onChange={(e) => setUser({...user, income: e.target.value})} 
              />
            </div>

            <button className="primary-btn full-width" onClick={findSchemes}>Find My Schemes</button>
          </div>
        )}

        {/* PAGE 4: RESULTS */}
        {page === 'results' && (
          <div className="results-container">
            {/* Header for PDF Export */}
            <div className="print-header">
               <h1>SchemeScout Eligibility Report</h1>
               <p>User Profile: Age {user.age} | Annual Income: ₹{user.income} | Category: {category}</p>
               <hr />
            </div>

            <div className="results-header no-print">
              <button className="back-link" onClick={() => setPage('form')}>← Edit Details</button>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button className="secondary-btn" onClick={handleDownload}>📥 Download PDF</button>
                <h2 style={{margin: 0}}>Best Matches</h2>
              </div>
            </div>
            
            <div className="grid">
              {matches.length > 0 ? (
                matches.map(s => (
                  <SchemeCard 
                    key={s.id} 
                    scheme={s} 
                    onAskAI={handleAskAI} 
                    isLoading={isLoading} 
                  />
                ))
              ) : (
                <div className="card no-print" style={{textAlign: 'center', padding: '3rem'}}>
                  <span style={{fontSize: '3rem'}}>🔍</span>
                  <h3>No Schemes Found</h3>
                  <p style={{color: 'var(--text-light)'}}>Try adjusting your income or age, or explore a different category.</p>
                  <button className="primary-btn" onClick={() => setPage('categories')}>Try Another Category</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating GenAI Chatbot Component */}
    </div>
  );
}

export default App;