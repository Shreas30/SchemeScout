const CategoryCard = ({ title, icon, onClick, description }) => {
  return (
    <div className="card cat-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{icon}</div>
      <h3 style={{ margin: '5px 0', color: 'var(--primary)' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>{description}</p>
    </div>
  );
};
export default CategoryCard;