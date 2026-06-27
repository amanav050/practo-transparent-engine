import { Stethoscope, Brain, ListChecks, ShieldCheck } from 'lucide-react'

function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-5 py-4 border-b border-gray-border">
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
      <main className="flex-1 flex flex-col items-center px-4 sm:px-5 py-8 sm:py-12">
        <div className="max-w-xl w-full space-y-8 sm:space-y-10">

          {/* Hero image section */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="w-full h-44 sm:h-56 relative">
              <img
                src="/hero-consultation.jpg"
                alt="Doctor consulting with patient"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-teal/10 via-transparent to-white" />
            </div>
          </div>

          {/* Hero text */}
          <div className="space-y-3 sm:space-y-4 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark leading-snug">
              Describe what you feel.
              <br />
              <span className="text-teal">We'll tell you which specialist
              you need, and why.</span>
            </h1>
            <p className="text-dark/50 text-sm sm:text-base max-w-md mx-auto">
              A recommendation you can understand, question, and trust.
            </p>
          </div>

          {/* Value propositions */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-teal-light/40 border-l-3 border-teal">
              <Brain className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark">
                  See the reasoning, not just the answer
                </p>
                <p className="text-xs sm:text-sm text-dark/50 mt-0.5">
                  Know why a neurologist was suggested over an ophthalmologist
                  — every recommendation is explained.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-gray-soft">
              <ListChecks className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark">
                  What was considered and what was ruled out
                </p>
                <p className="text-xs sm:text-sm text-dark/50 mt-0.5">
                  Other specialist types we evaluated and why they were
                  deprioritised for your specific symptoms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-gray-soft">
              <ShieldCheck className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark">
                  Walk into your appointment prepared
                </p>
                <p className="text-xs sm:text-sm text-dark/50 mt-0.5">
                  A personalised checklist of what to mention and bring to
                  your consultation.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center px-2">
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
      <footer className="px-4 sm:px-5 py-4 bg-amber-light border-t border-amber/20">
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