export const filterSchemes = (userProfile, allSchemes, category) => {
  // 1. Get schemes for the specific category (education, farming, etc.)
  const categorySchemes = allSchemes[category] || [];
  
  // 2. Add 'general' schemes because everyone should see those too
  const generalSchemes = allSchemes['general'] || [];
  const pool = [...categorySchemes, ...generalSchemes];

  // 3. Filter based on rules
  return pool.filter(scheme => {
    const meetsIncome = userProfile.income <= scheme.incomeLimit;
    const meetsAge = userProfile.age >= scheme.minAge;
    
    // For the hackathon, we only show it if they meet both
    return meetsIncome && meetsAge;
  });
};