import { useState, useRef, useEffect } from 'react'
import { Stethoscope, Send, AlertTriangle } from 'lucide-react'
import { QUESTIONS } from '../constants/questions'

function SymptomChat({ messages, questionIndex, onAnswer, isEmergency, onStartOver }) {
  const [input, setInput] = useState('')
  const [selectedChips, setSelectedChips] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const progress = Math.min((questionIndex / QUESTIONS.length) * 100, 100)
  const currentQ = QUESTIONS[questionIndex] || null
  const isHybrid = currentQ?.type === 'hybrid'
  const isChoice = currentQ?.type === 'choice'
  const isComplete = questionIndex >= QUESTIONS.length

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!isChoice && !isComplete && !isEmergency) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [questionIndex, isChoice, isComplete, isEmergency])

  function handleSubmit(e) {
    e?.preventDefault()

    if (isHybrid) {
      const chipText = selectedChips.join(', ')
      const freeText = input.trim()
      let combined = ''

      if (chipText && freeText) {
        combined = `${chipText}, ${freeText}`
      } else if (chipText) {
        combined = chipText
      } else if (freeText) {
        combined = freeText
      } else {
        return
      }

      onAnswer(combined)
      setSelectedChips([])
      setInput('')
      return
    }

    if (!input.trim()) return
    onAnswer(input.trim())
    setInput('')
  }

  function handleChoiceSelect(option) {
    onAnswer(option)
  }

  function toggleChip(chip) {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    )
  }

  // Find the latest question message to identify which has active options
  const lastQuestionIdx = [...messages].reverse().findIndex(
    m => m.role === 'assistant' && m.options
  )
  const activeQuestionMsgIdx = lastQuestionIdx >= 0 ? messages.length - 1 - lastQuestionIdx : -1

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-border">
        <div className="px-5 py-3 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-teal" strokeWidth={2} />
          <span className="text-base font-semibold text-dark">CareLogic</span>
          <span className="text-xs text-dark/40 ml-1">by Care AI</span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-border">
          <div
            className="h-full bg-teal transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-xl mx-auto space-y-3">
          {messages.map((msg, i) => (
            <div key={i}>
              {/* Message bubble */}
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.isEmergency
                      ? 'bg-red/10 border border-red/30 text-red-900'
                      : msg.role === 'user'
                        ? 'bg-teal text-white rounded-br-sm'
                        : 'bg-gray-soft text-dark rounded-bl-sm'
                  }`}
                >
                  {msg.isEmergency && (
                    <div className="flex items-center gap-2 mb-2 font-semibold text-red">
                      <AlertTriangle className="w-4 h-4" />
                      Seek Immediate Care
                    </div>
                  )}
                  <p>{msg.text}</p>
                  {msg.subtext && (
                    <p className={`text-xs mt-1.5 ${
                      msg.role === 'user' ? 'text-white/70' : 'text-dark/40'
                    }`}>
                      {msg.subtext}
                    </p>
                  )}
                </div>
              </div>

              {/* Choice buttons — only on the active (latest) question */}
              {msg.options && i === activeQuestionMsgIdx && !isComplete && !isEmergency && (
                <div className="mt-3 flex flex-wrap gap-2 pl-1">
                  {msg.type === 'choice' && msg.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleChoiceSelect(option)}
                      className="px-4 py-2 text-sm font-medium rounded-full border border-teal text-teal
                                 hover:bg-teal hover:text-white active:scale-95 transition-all cursor-pointer"
                    >
                      {option}
                    </button>
                  ))}
                  {msg.type === 'hybrid' && msg.options.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => toggleChip(chip)}
                      className={`px-4 py-2 text-sm font-medium rounded-full border transition-all cursor-pointer active:scale-95 ${
                        selectedChips.includes(chip)
                          ? 'bg-teal text-white border-teal'
                          : 'border-teal text-teal hover:bg-teal/10'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area — hidden for pure choice questions and when complete/emergency */}
      {!isComplete && !isEmergency && !isChoice && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-border px-4 py-3">
          <div className="max-w-xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                placeholder={isHybrid ? 'Add anything else or tap chips above...' : 'Type your answer...'}
                className="w-full px-4 py-3 rounded-xl border border-gray-border text-sm text-dark
                           placeholder:text-dark/30 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input.trim() && selectedChips.length === 0}
              className="p-3 rounded-xl bg-teal text-white disabled:opacity-30
                         hover:bg-teal-dark active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Emergency / complete — start over */}
      {(isEmergency || isComplete) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-border px-4 py-3">
          <div className="max-w-xl mx-auto">
            <button
              onClick={onStartOver}
              className="w-full py-3 rounded-xl border border-gray-border text-sm font-medium text-dark/60
                         hover:bg-gray-soft active:scale-[0.98] transition-all cursor-pointer"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SymptomChat