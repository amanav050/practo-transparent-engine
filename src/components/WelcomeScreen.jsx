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

          {/* Hero illustration */}
          <div className="flex justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="28" r="14" stroke="#0D9488" strokeWidth="1.5" fill="#CCFBF1" />
              <circle cx="22" cy="56" r="10" stroke="#0D9488" strokeWidth="1.5" fill="#F9FAFB" />
              <circle cx="58" cy="56" r="10" stroke="#0D9488" strokeWidth="1.5" fill="#F9FAFB" />
              <line x1="33" y1="39" x2="25" y2="48" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="47" y1="39" x2="55" y2="48" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="30" y1="52" x2="50" y2="52" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
              <path d="M36 25 L40 18 L44 25 M40 18 L40 34" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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