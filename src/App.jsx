import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import SymptomChat from './components/SymptomChat'
import RecommendationScreen from './components/RecommendationScreen'
import DoctorDetail from './components/DoctorDetail'
import { QUESTIONS, EMPATHETIC_INTROS, getAssociatedSuggestions, checkEmergency } from './constants/questions'
import { getRecommendation } from './utils/api'

function App() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [messages, setMessages] = useState([])
  const [recommendation, setRecommendation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEmergency, setIsEmergency] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  function handleStart() {
    const firstQ = QUESTIONS[0]
    setMessages([
      {
        role: 'assistant',
        text: "Hi, I'm here to help you find the right specialist. Let me ask you a few quick questions.",
      },
      {
        role: 'assistant',
        text: firstQ.question,
        subtext: firstQ.subtext,
        type: firstQ.type,
        options: firstQ.options || null,
      },
    ])
    setCurrentPhase(2)
  }

  function handleAnswer(answer) {
    const currentQ = QUESTIONS[questionIndex]
    const updatedAnswers = { ...answers, [currentQ.id]: answer }

    const updatedMessages = [...messages, { role: 'user', text: answer }]

    if (checkEmergency(updatedAnswers)) {
      setAnswers(updatedAnswers)
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          text: 'Based on what you\'ve described, your symptoms may require immediate medical attention. Please visit your nearest emergency room or call emergency services right away. Do not wait for an online consultation.',
          isEmergency: true,
        },
      ])
      setIsEmergency(true)
      return
    }

    const nextIndex = questionIndex + 1

    if (nextIndex >= QUESTIONS.length) {
      setAnswers(updatedAnswers)
      setMessages(updatedMessages)
      setQuestionIndex(nextIndex)
      triggerRecommendation(updatedAnswers, updatedMessages)
      return
    }

    const nextQ = QUESTIONS[nextIndex]
    const intro = EMPATHETIC_INTROS[Math.min(questionIndex, EMPATHETIC_INTROS.length - 1)]

    let options = nextQ.options || null
    if (nextQ.id === 'associated_symptoms') {
      options = getAssociatedSuggestions(updatedAnswers)
    }

    setAnswers(updatedAnswers)
    setQuestionIndex(nextIndex)
    setMessages([
      ...updatedMessages,
      { role: 'assistant', text: intro },
      {
        role: 'assistant',
        text: nextQ.question,
        subtext: nextQ.subtext,
        type: nextQ.type,
        options,
      },
    ])
  }

  async function triggerRecommendation(finalAnswers, currentMessages) {
    setCurrentPhase(3)
    setIsLoading(true)

    try {
      const result = await getRecommendation(finalAnswers)
      setRecommendation(result)
      setCurrentPhase(4)
    } catch (error) {
      console.error('Recommendation error:', error)
      setMessages([
        ...currentMessages,
        {
          role: 'assistant',
          text: "I'm sorry, something went wrong while analysing your symptoms. Please try again.",
        },
      ])
      setCurrentPhase(2)
    } finally {
      setIsLoading(false)
    }
  }

  function handleStartOver() {
    setCurrentPhase(1)
    setQuestionIndex(0)
    setAnswers({})
    setMessages([])
    setRecommendation(null)
    setIsLoading(false)
    setIsEmergency(false)
    setSelectedDoctor(null)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-dark">
      {currentPhase === 1 && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {currentPhase === 2 && (
        <SymptomChat
          messages={messages}
          questionIndex={questionIndex}
          onAnswer={handleAnswer}
          isEmergency={isEmergency}
          onStartOver={handleStartOver}
        />
      )}

      {currentPhase === 3 && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 border-3 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-dark/60 text-sm">Analysing your symptoms...</p>
          </div>
        </div>
      )}

      {currentPhase === 4 && recommendation && (
        <RecommendationScreen
          recommendation={recommendation}
          onDoctorSelect={(doc) => setSelectedDoctor(doc)}
          onStartOver={handleStartOver}
        />
      )}

      {selectedDoctor && (
        <DoctorDetail
          doctor={selectedDoctor}
          specialistType={recommendation?.assessment?.recommended_specialist || ''}
          onBack={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  )
}

export default App