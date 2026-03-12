export const schemeData = {
  education: [
    {
      id: 1,
      name: "PM-YASASVI Scholarship",
      incomeLimit: 250000,
      minAge: 14,
      benefit: "Up to ₹1.25 Lakh/year for top-class education.",
      pros: "Covers tuition and hostel fees.",
      cons: "Limited to OBC, EBC, and DNT categories.",
      steps: "Apply on National Scholarship Portal (NSP) -> Upload Income Cert -> School Verification."
    },
    {
      id: 2,
      name: "Post-Matric Scholarship (SC/ST)",
      incomeLimit: 250000,
      minAge: 16,
      benefit: "Full tuition fee waiver and monthly stipend.",
      pros: "Direct Bank Transfer (DBT) ensures no middlemen.",
      cons: "Requires 75% attendance for renewal.",
      steps: "Register on State DBT Portal -> Submit Caste/Income Proof -> Bank Account Link."
    },
    {
      id: 3,
      name: "Pragati Scholarship for Girls",
      incomeLimit: 800000,
      minAge: 17,
      benefit: "₹50,000 per year for technical degree/diploma.",
      pros: "High income limit (8L), great for middle-class students.",
      cons: "Only for first-year technical students.",
      steps: "Apply via AICTE portal -> Upload college admission receipt -> Verification by HOD."
    }
  ],
  farming: [
    {
      id: 4,
      name: "PM-Kisan Samman Nidhi",
      incomeLimit: 9999999, // Open to all land-holding farmers
      minAge: 18,
      benefit: "₹6,000 per year in 3 installments.",
      pros: "Guaranteed income support for landholders.",
      cons: "Not applicable for tenant farmers (landless).",
      steps: "Visit PM-Kisan portal -> e-KYC via Aadhaar -> Village Patwari verification."
    },
    {
      id: 5,
      name: "PM Fasal Bima Yojana",
      incomeLimit: 9999999, 
      minAge: 18,
      benefit: "Comprehensive insurance against crop failure.",
      pros: "Very low premium (1.5% - 2% for farmers).",
      cons: "Assessment of damage can sometimes be slow.",
      steps: "Apply via Bank or Common Service Center (CSC) -> Pay premium -> Submit crop sowing details."
    },
    {
      id: 6,
      name: "PM Krishi Sinchai Yojana",
      incomeLimit: 9999999,
      minAge: 18,
      benefit: "Subsidies for drip and sprinkler irrigation systems.",
      pros: "Saves water and increases crop yield significantly.",
      cons: "Requires initial investment before subsidy release.",
      steps: "Apply at District Agriculture Office -> Technical survey of land -> Installation and verification."
    }
  ],
  general: [
    {
      id: 7,
      name: "Ayushman Bharat (PM-JAY)",
      incomeLimit: 250000,
      minAge: 0,
      benefit: "₹5 Lakh health cover per family per year.",
      pros: "Cashless treatment at all empanelled hospitals.",
      cons: "Eligibility is based on SECC 2011 data.",
      steps: "Check name in beneficiary list -> Get Golden Card -> Visit hospital."
    },
    {
      id: 8,
      name: "PM Surya Ghar: Muft Bijli Yojana",
      incomeLimit: 9999999,
      minAge: 18,
      benefit: "300 units free electricity via rooftop solar.",
      pros: "Reduces electricity bills to zero; high subsidy.",
      cons: "Requires roof space.",
      steps: "Apply on National Rooftop Solar portal -> Vendor feasibility check -> Subsidy release."
    },
    {
      id: 9,
      name: "Pradhan Mantri Awas Yojana (Urban/Gramin)",
      incomeLimit: 600000,
      minAge: 18,
      benefit: "Subsidy of up to ₹2.67 Lakh for building your first house.",
      pros: "Makes home ownership affordable for low-income groups.",
      cons: "Long waiting list in some states.",
      steps: "Apply on PMAY portal -> Submit Aadhaar and Income details -> Local body verification."
    },
    {
      id: 10,
      name: "Atal Pension Yojana",
      incomeLimit: 9999999,
      minAge: 18, // Eligible between 18-40
      benefit: "Fixed monthly pension of ₹1,000 to ₹5,000 after age 60.",
      pros: "Government guarantees the minimum pension.",
      cons: "Investment is locked until age 60.",
      steps: "Visit your bank branch -> Fill APY registration form -> Set up auto-debit."
    }
  ],
  women: [
    {
     id: 3,
     name: "Lakhpati Didi",
     category: "women",
     minAge: 18,
     maxIncome: 300000,
     benefit: "Skill training and financial guidance to help women earn ₹1 Lakh/year."
    },
    {
     id: 5,
     name: "Mahila Samman Certificate",
     category: "women",
     minAge: 10,
     maxIncome: 9999999,
     benefit: "High-interest savings scheme exclusively for women and girls."
    }
  ],
  Startup: [
    {
     id: 4,
     name: "Startup India Seed Fund",
     category: "startup",
     minAge: 18,
     maxIncome: 9999999, // Open to most
     benefit: "Financial assistance for startups for proof of concept and prototype development."
    }
  ],
  
};