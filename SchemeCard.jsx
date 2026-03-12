const SchemeCard = ({ scheme, onAskAI, isLoading }) => {
  // Mapping categories to icons for a better look
  const categoryIcons = {
    women: "👩‍💼",
    startup: "🚀",
    education: "🎓",
    farmer: "🚜",
    general: "📋"
  };

  return (
    <div className="card scheme-card" style={{ 
      borderLeft: `5px solid ${scheme.category === 'women' ? '#ec4899' : 'var(--primary)'}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ color: 'var(--primary)', marginTop: 0 }}>
          {categoryIcons[scheme.category] || "🔹"} {scheme.name}
        </h3>
      </div>
      
      <p><strong>Benefit:</strong> {scheme.benefit}</p>
      
      <button 
        className="secondary-btn" 
        onClick={() => onAskAI(scheme)}
        disabled={isLoading === scheme.id}
        style={{ width: '100%', cursor: isLoading === scheme.id ? 'not-allowed' : 'pointer' }}
      >
        {isLoading === scheme.id ? "🤖 Analyzing Profile..." : "✨ Personalized AI Analysis"}
      </button>

      {scheme.aiReason && (
        <div className="ai-box" style={{
          marginTop: '15px',
          padding: '15px',
          background: '#f0f7ff',
          borderRadius: '10px',
          border: '1px solid #bae6fd',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          color: '#0c4a6e',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div style={{fontWeight: 'bold', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
            <span>🪄</span> AI Recommendation
          </div>
          {scheme.aiReason}
        </div>
      )}
    </div>
  );
};

export default SchemeCard;