import { useState, useEffect } from 'react';
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
  const [matches, setMatches] = useState([]); // Added missing state
  
  const [user, setUser] = useLocalStorage('user-data', {
    name: '', age: '', gender: '', state: '', occupation: '', income: '',
    educationLevel: '', courseType: '', institute: '',
    landSize: '', farmerType: '', cropType: '',
    maritalStatus: '', selfEmployed: '',
    businessType: '', businessAge: '',
    category: 'General', disability: 'No'
  });

  // Auto-scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const findSchemes = () => {
    const results = filterSchemes(user, schemeData, category);
    setMatches(results);
    setPage('results');
  };

  const handleAskAI = async (scheme) => {
    setIsLoading(scheme.id); 
    const text = await explainSchemeWithAI(scheme, user);
    
    setMatches(prev => prev.map(s => 
      s.id === scheme.id ? { ...s, aiReason: text } : s
    ));
    setIsLoading(null);
  };

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
            <button className="primary-btn" style={{marginTop: '20px'}} onClick={() => setPage('categories')}>
              Start Scouting
            </button>
          </div>
        )}

        {/* PAGE 2: CATEGORY SELECTION */}
        {page === 'categories' && (
          <div className="results-container no-print">
            <button className="back-link" onClick={() => setPage('home')}>← Back</button>
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
          <div className="card form-card" style={{ maxWidth: '800px' }}>
            <button className="back-link no-print" onClick={() => setPage('categories')}>← Back to Categories</button>
            <h2>Create Your Profile</h2>
            <p className="subtitle">Helping AI find <strong>{category}</strong> matches for {user.name || 'you'}.</p>
            
            <div className="form-grid">
              {/* BASIC INFO */}
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Enter name" />
              </div>
              <div className="input-group">
                <label>Applicant Age</label>
                <input type="number" value={user.age} onChange={(e) => setUser({...user, age: e.target.value})} placeholder="e.g. 22" />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select value={user.gender} onChange={(e) => setUser({...user, gender: e.target.value})}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>Occupation</label>
                <select value={user.occupation} onChange={(e) => setUser({...user, occupation: e.target.value})}>
                  <option value="">Select Occupation</option>
                  <option value="Student">Student</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Employed">Employed</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>

              {/* CONDITIONAL: STUDENT */}
              {user.occupation === 'Student' && (
                <>
                  <div className="form-section">🎓 Education Details</div>
                  <div className="input-group">
                    <label>Current Level</label>
                    <select value={user.educationLevel} onChange={(e) => setUser({...user, educationLevel: e.target.value})}>
                      <option>School</option><option>Undergraduate</option><option>Postgraduate</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Institute Type</label>
                    <select value={user.institute} onChange={(e) => setUser({...user, institute: e.target.value})}>
                      <option>Government</option><option>Private</option>
                    </select>
                  </div>
                </>
              )}

              {/* CONDITIONAL: FARMER */}
              {user.occupation === 'Farmer' && (
                <>
                  <div className="form-section">🚜 Farming Details</div>
                  <div className="input-group">
                    <label>Land Ownership</label>
                    <select value={user.landSize} onChange={(e) => setUser({...user, landSize: e.target.value})}>
                      <option>No land</option><option>Small (1-2 Hectare)</option><option>Large (Above 2 Hectare)</option>
                    </select>
                  </div>
                </>
              )}

              {/* CONDITIONAL: WOMEN */}
              {user.gender === 'Female' && (
                <>
                  <div className="form-section">👩‍💼 Women Empowerment</div>
                  <div className="input-group">
                    <label>Marital Status</label>
                    <select value={user.maritalStatus} onChange={(e) => setUser({...user, maritalStatus: e.target.value})}>
                      <option>Unmarried</option><option>Married</option><option>Widow</option>
                    </select>
                  </div>
                </>
              )}

              {/* SPECIAL CATEGORY */}
              <div className="form-section">⚖️ Category & Income</div>
              <div className="input-group">
                <label>Caste Category</label>
                <select value={user.category} onChange={(e) => setUser({...user, category: e.target.value})}>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                </select>
              </div>
              <div className="input-group">
                <label>Annual Family Income</label>
                <select value={user.income} onChange={(e) => setUser({...user, income: e.target.value})}>
                  <option value="">Select Range</option>
                  <option value="100000">Below ₹1 Lakh</option>
                  <option value="300000">₹1–3 Lakh</option>
                  <option value="800000">₹3–8 Lakh</option>
                  <option value="1500000">Above ₹10 Lakh</option>
                </select>
              </div>
            </div>

            <button className="primary-btn full-width" style={{marginTop: '30px'}} onClick={findSchemes}>Find My Schemes</button>
          </div>
        )}

        {/* PAGE 4: RESULTS */}
        {page === 'results' && (
          <div className="results-container">
            <div className="print-header">
               <h1>SchemeScout Eligibility Report</h1>
               <p>User Profile: {user.name} | Age {user.age} | Income: {user.income} | Sector: {category}</p>
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
                    userProfile={user}
                    onAskAI={handleAskAI} 
                    isLoading={isLoading} 
                  />
                ))
              ) : (
                <div className="card no-print" style={{textAlign: 'center', gridColumn: '1 / -1', padding: '3rem'}}>
                  <span style={{fontSize: '3rem'}}>🔍</span>
                  <h3>No Schemes Found</h3>
                  <p style={{color: 'var(--text-light)'}}>Try adjusting your profile or explore a different category.</p>
                  <button className="primary-btn" onClick={() => setPage('categories')}>Try Another Category</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
