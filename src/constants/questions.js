export const QUESTIONS = [
  {
    id: 'primary_symptom',
    question: "What's been bothering you the most?",
    subtext: "Describe your main concern in your own words.",
    type: 'open',
  },
  {
    id: 'location_character',
    question: "Where exactly do you feel it, and what does it feel like?",
    subtext: "For example: sharp pain behind the eyes, dull ache in the lower back, tightness in the chest.",
    type: 'open',
  },
  {
    id: 'duration',
    question: "How long has this been going on?",
    subtext: "This helps us understand whether it's acute or something that's been building up.",
    type: 'choice',
    options: ['Less than a week', '1–4 weeks', 'More than a month', 'Comes and goes'],
  },
  {
    id: 'associated_symptoms',
    question: "Have you noticed anything else along with this?",
    subtext: "Sometimes related symptoms point to a more specific specialist.",
    type: 'hybrid',
  },
  {
    id: 'age_sex',
    question: "May I know your age and sex?",
    subtext: "Certain conditions are more common in specific age groups and sexes. This helps us suggest more accurately.",
    type: 'open',
  },
]

export const EMPATHETIC_INTROS = [
  "Thanks for sharing that. Let me understand a bit more.",
  "Got it. A couple more questions so I can point you in the right direction.",
  "Understood. Almost there.",
  "That's helpful context. One last question.",
]

export const ASSOCIATED_SYMPTOM_MAP = {
  headache: ['Blurred vision', 'Nausea or vomiting', 'Sensitivity to light', 'Dizziness', 'Neck stiffness'],
  head: ['Blurred vision', 'Nausea or vomiting', 'Sensitivity to light', 'Dizziness', 'Neck stiffness'],
  migraine: ['Blurred vision', 'Nausea or vomiting', 'Sensitivity to light', 'Dizziness', 'Neck stiffness'],

  joint: ['Fatigue', 'Morning stiffness', 'Weight loss', 'Swelling', 'Fever'],
  knee: ['Swelling', 'Stiffness', 'Difficulty walking', 'Fatigue', 'Weight loss'],
  elbow: ['Swelling', 'Stiffness', 'Numbness in fingers', 'Fatigue', 'Weight loss'],

  stomach: ['Bloating', 'Nausea', 'Blood in stool', 'Appetite changes', 'Acid reflux'],
  abdomen: ['Bloating', 'Nausea', 'Blood in stool', 'Appetite changes', 'Acid reflux'],
  belly: ['Bloating', 'Nausea', 'Blood in stool', 'Appetite changes', 'Acid reflux'],
  gastric: ['Bloating', 'Nausea', 'Blood in stool', 'Appetite changes', 'Acid reflux'],

  chest: ['Breathlessness', 'Sweating', 'Pain in left arm', 'Palpitations', 'Dizziness'],
  heart: ['Breathlessness', 'Sweating', 'Pain in left arm', 'Palpitations', 'Dizziness'],

  cough: ['Blood in sputum', 'Breathlessness', 'Wheezing', 'Fever', 'Chest tightness'],
  breathing: ['Cough', 'Wheezing', 'Chest tightness', 'Fatigue', 'Fever'],

  skin: ['Itching', 'Joint pain', 'Fever', 'Swelling', 'Hair loss'],
  rash: ['Itching', 'Joint pain', 'Fever', 'Swelling', 'Spreading pattern'],

  anxiety: ['Weight changes', 'Sweating', 'Tremors', 'Sleep issues', 'Palpitations'],
  palpitation: ['Weight changes', 'Sweating', 'Tremors', 'Anxiety', 'Fatigue'],

  fatigue: ['Hair loss', 'Weight gain', 'Cold intolerance', 'Excessive thirst', 'Dry skin'],
  tired: ['Hair loss', 'Weight gain', 'Cold intolerance', 'Excessive thirst', 'Dry skin'],
  exhaustion: ['Hair loss', 'Weight gain', 'Cold intolerance', 'Excessive thirst', 'Dry skin'],

  eye: ['Vision changes', 'Headache', 'Redness', 'Discharge', 'Light sensitivity'],
  vision: ['Headache', 'Eye pain', 'Redness', 'Floaters', 'Light sensitivity'],

  ear: ['Dizziness', 'Hearing loss', 'Ringing', 'Pain', 'Fullness in ear'],
  hearing: ['Dizziness', 'Ringing', 'Ear pain', 'Fullness in ear', 'Nausea'],

  throat: ['Difficulty swallowing', 'Hoarseness', 'Acid reflux', 'Ear pain', 'Fever'],
  swallowing: ['Throat pain', 'Hoarseness', 'Weight loss', 'Acid reflux', 'Chest discomfort'],

  urination: ['Excessive thirst', 'Fatigue', 'Weight changes', 'Blurred vision', 'Slow healing'],
  thirst: ['Frequent urination', 'Fatigue', 'Weight loss', 'Blurred vision', 'Dry mouth'],

  period: ['Weight gain', 'Acne', 'Excess hair growth', 'Mood changes', 'Fatigue'],
  menstrual: ['Weight gain', 'Acne', 'Excess hair growth', 'Mood changes', 'Fatigue'],

  back: ['Leg numbness', 'Tingling', 'Weakness in legs', 'Difficulty walking', 'Stiffness'],
  spine: ['Leg numbness', 'Tingling', 'Weakness in legs', 'Difficulty walking', 'Stiffness'],
}

export const EMERGENCY_KEYWORDS = [
  ['chest pain', 'breathless'],
  ['chest pain', 'sweating'],
  ['sudden', 'worst headache'],
  ['sudden', 'vision loss'],
  ['high fever', 'stiff neck'],
  ['weakness', 'one side'],
  ['face drooping'],
  ['slurred speech'],
  ['coughing blood'],
  ['blood', 'vomit'],
]

export function getAssociatedSuggestions(answers) {
  const text = Object.values(answers).join(' ').toLowerCase()
  const allSuggestions = new Set()

  for (const [keyword, suggestions] of Object.entries(ASSOCIATED_SYMPTOM_MAP)) {
    if (text.includes(keyword)) {
      suggestions.forEach(s => allSuggestions.add(s))
    }
  }

  if (allSuggestions.size === 0) {
    return ['Fever', 'Fatigue', 'Nausea', 'Weight changes', 'Sleep issues']
  }

  return [...allSuggestions].slice(0, 6)
}

export function checkEmergency(answers) {
  const text = Object.values(answers).join(' ').toLowerCase()

  for (const combo of EMERGENCY_KEYWORDS) {
    if (combo.every(keyword => text.includes(keyword))) {
      return true
    }
  }

  return false
}