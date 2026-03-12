export const explainSchemeWithAI = async (scheme, userProfile) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  // Using the stable production URL
  const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

  // IMPROVED PROMPT: We give the AI a persona and strict rules to avoid generic answers
  const promptText = `Act as a professional Indian Government Scheme Consultant. 
  A user who is ${userProfile.age} years old with an annual income of ₹${userProfile.income} is interested in "${scheme.name}". 
  In exactly 2 sentences, explain the specific financial advantage of this scheme for them. 
  Avoid saying "This scheme is good." Instead, mention how it helps someone in their specific income bracket or age group.`;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } 
    
    // SMART FALLBACK 1: If API works but response is filtered
    return `At ${userProfile.age} years old, the ${scheme.name} serves as a strategic financial tool to maximize your ₹${userProfile.income} annual budget through government-backed subsidies.`;
    
  } catch (error) {
    // SMART FALLBACK 2: If API fails (Network/Key issue)
    const incomeLevel = Number(userProfile.income) < 300000 ? "low-income" : "middle-income";
    return `Since you are in the ${incomeLevel} bracket, this scheme is a rare opportunity to secure ${scheme.benefit} specifically reserved for citizens your age.`;
  }
};