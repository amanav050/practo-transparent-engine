import { Stethoscope, Brain, ListChecks, ShieldCheck } from 'lucide-react'

function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 border-b border-gray-border">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-teal" strokeWidth={2} />
          <span className="text-lg font-semibold text-dark tracking-tight">
            CareLogic
          </span>
          <span className="text-xs text-dark/40 font-normal ml-1 mt-0.5">
            by Care AI
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="max-w-xl w-full space-y-10">

          {/* Hero illustration — symptom → reasoning → specialist */}
          <div className="flex justify-center">
            <svg width="220" height="72" viewBox="0 0 220 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Patient node */}
              <circle cx="36" cy="36" r="22" stroke="#0D9488" strokeWidth="1.5" fill="#CCFBF1" />
              <path d="M36 28 C36 28 30 32 30 36 C30 39.3 32.7 42 36 42 C39.3 42 42 39.3 42 36 C42 32 36 28 36 28Z" fill="#0D9488" opacity="0.3" />
              <circle cx="36" cy="30" r="4" stroke="#0D9488" strokeWidth="1.5" fill="none" />
              <path d="M28 44 C28 40 32 38 36 38 C40 38 44 40 44 44" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Arrow 1 */}
              <line x1="62" y1="36" x2="82" y2="36" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 3" />
              <polyline points="79,32 84,36 79,40" stroke="#0D9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* Brain/reasoning node */}
              <circle cx="110" cy="36" r="22" stroke="#0D9488" strokeWidth="1.5" fill="#CCFBF1" />
              <path d="M102 36 C102 31 105 28 110 28 C115 28 118 31 118 36" stroke="#0D9488" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M104 38 C104 42 107 44 110 44 C113 44 116 42 116 38" stroke="#0D9488" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <line x1="110" y1="28" x2="110" y2="24" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="104" y1="30" x2="101" y2="27" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="116" y1="30" x2="119" y2="27" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="110" cy="36" r="3" fill="#0D9488" opacity="0.3" />

              {/* Arrow 2 */}
              <line x1="136" y1="36" x2="156" y2="36" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 3" />
              <polyline points="153,32 158,36 153,40" stroke="#0D9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* Specialist node */}
              <circle cx="184" cy="36" r="22" stroke="#0D9488" strokeWidth="1.5" fill="#CCFBF1" />
              <path d="M184 28 L184 44" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M176 36 L192 36" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="184" cy="36" r="8" stroke="#0D9488" strokeWidth="1.5" fill="none" />
              <circle cx="184" cy="36" r="3" fill="#0D9488" opacity="0.3" />

              {/* Labels */}
              <text x="36" y="66" textAnchor="middle" fontSize="9" fill="#0D9488" fontFamily="Inter, system-ui, sans-serif" fontWeight="500">You</text>
              <text x="110" y="66" textAnchor="middle" fontSize="9" fill="#0D9488" fontFamily="Inter, system-ui, sans-serif" fontWeight="500">Reasoning</text>
              <text x="184" y="66" textAnchor="middle" fontSize="9" fill="#0D9488" fontFamily="Inter, system-ui, sans-serif" fontWeight="500">Specialist</text>
            </svg>
          </div>

          {/* Hero text */}
          <div className="space-y-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-dark leading-snug">
              Describe what you feel.
              <br />
              <span className="text-teal">We'll tell you which specialist
              you need, and why.</span>
            </h1>
            <p className="text-dark/50 text-base max-w-md mx-auto">
              A recommendation you can understand, question, and trust.
            </p>
          </div>

          {/* Value propositions */}
          <div className="space-y-4">
            {/* Thesis card — visually differentiated */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-teal-light/40 border-l-3 border-teal">
              <Brain className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark">
                  See the reasoning, not just the answer
                </p>
                <p className="text-sm text-dark/50 mt-0.5">
                  Know why a neurologist was suggested over an ophthalmologist
                  — every recommendation is explained.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-soft">
              <ListChecks className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark">
                  What was considered and what was ruled out
                </p>
                <p className="text-sm text-dark/50 mt-0.5">
                  Other specialist types we evaluated and why they were
                  deprioritised for your specific symptoms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-soft">
              <ShieldCheck className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark">
                  Walk into your appointment prepared
                </p>
                <p className="text-sm text-dark/50 mt-0.5">
                  A personalised checklist of what to mention and bring to
                  your consultation.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-3.5 bg-teal text-white font-semibold rounded-xl
                         hover:bg-teal-dark active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              Describe Your Symptoms
            </button>
          </div>
        </div>
      </main>

      {/* Disclaimer footer */}
      <footer className="px-5 py-4 bg-amber-light border-t border-amber/20">
        <p className="max-w-2xl mx-auto text-xs text-center text-amber-800 leading-relaxed">
          This tool provides suggested guidance based on described symptoms, not
          medical diagnosis. Always consult a qualified medical professional for
          diagnosis and treatment.
        </p>
      </footer>
    </div>
  )
}

export default WelcomeScreen