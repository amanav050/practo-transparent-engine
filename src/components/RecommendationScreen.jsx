import { Stethoscope, Star, Clock, Users, IndianRupee, ChevronRight, RotateCcw, ShieldAlert, CircleCheck, CircleX, ClipboardList } from 'lucide-react'

const CONFIDENCE_STYLES = {
  high: { bg: 'bg-green/10', text: 'text-green', border: 'border-green/30', label: 'High Confidence' },
  medium: { bg: 'bg-amber/10', text: 'text-amber', border: 'border-amber/30', label: 'Medium Confidence' },
  low: { bg: 'bg-red/10', text: 'text-red', border: 'border-red/30', label: 'Low Confidence' },
}

function RecommendationScreen({ recommendation, onDoctorSelect, onStartOver }) {
  const { assessment, ruled_out, matched_doctors, consultation_prep } = recommendation
  const confidence = CONFIDENCE_STYLES[assessment.confidence] || CONFIDENCE_STYLES.medium

  return (
    <div className="min-h-screen flex flex-col bg-gray-soft">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-border">
        <div className="px-5 py-3 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-teal" strokeWidth={2} />
          <span className="text-base font-semibold text-dark">CareLogic</span>
          <span className="text-xs text-dark/40 ml-1">by Care AI</span>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="px-5 py-3 bg-amber-light border-b border-amber/20">
        <div className="max-w-2xl mx-auto flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            This is a suggested assessment based on your described symptoms. It is
            exploratory, not a deduction. Please consult a qualified medical
            professional for diagnosis and treatment.
          </p>
        </div>
      </div>

      {/* Cards */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Card 1 — Specialist Recommendation */}
          <div className="bg-white rounded-xl border border-gray-border shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-dark">Recommended Specialist</h2>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${confidence.bg} ${confidence.text} ${confidence.border}`}>
                {confidence.label}
              </span>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-lg font-bold text-dark">{assessment.recommended_specialist}</h3>
              </div>
              <p className="text-sm text-dark/60 leading-relaxed">{assessment.reasoning}</p>
            </div>
          </div>

          {/* Card 2 — Ruled-Out Alternatives */}
          {ruled_out && ruled_out.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-border shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-border">
                <h2 className="text-sm font-semibold text-dark">What We Considered</h2>
              </div>
              <div className="divide-y divide-gray-border">
                {ruled_out.map((item, i) => (
                  <div key={i} className="px-5 py-4 flex items-start gap-3">
                    <CircleX className="w-4 h-4 text-dark/30 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-dark">{item.specialist}</p>
                      <p className="text-sm text-dark/50 mt-1 leading-relaxed">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Card 3 — Matched Doctors */}
          {matched_doctors && matched_doctors.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-border shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-border">
                <h2 className="text-sm font-semibold text-dark">Matched Doctors</h2>
              </div>
              <div className="divide-y divide-gray-border">
                {matched_doctors.map((doc, i) => (
                  <button
                    key={i}
                    onClick={() => onDoctorSelect(doc)}
                    className="w-full text-left px-5 py-4 hover:bg-gray-soft transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2.5">
                        {/* Name and rating */}
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-dark">{doc.name}</h3>
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3.5 h-3.5 text-amber fill-amber" />
                            <span className="text-xs font-medium text-dark/70">{doc.condition_rating}</span>
                          </div>
                        </div>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-dark/50">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {doc.experience_years} yrs exp
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {doc.similar_patients.toLocaleString()} similar patients
                          </span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            {doc.fee}
                          </span>
                        </div>

                        {/* Review */}
                        <p className="text-xs text-dark/40 italic leading-relaxed">
                          "{doc.relevant_review}"
                        </p>

                        {/* Match reason */}
                        <div className="flex items-start gap-1.5">
                          <CircleCheck className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                          <p className="text-xs font-medium text-teal">{doc.match_reason}</p>
                        </div>

                        {/* Availability */}
                        <p className="text-xs text-dark/40">{doc.availability}</p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-dark/20 shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Card 4 — Consultation Prep */}
          {consultation_prep && consultation_prep.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-border shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-border flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal" />
                <h2 className="text-sm font-semibold text-dark">Before Your Appointment</h2>
              </div>
              <div className="px-5 py-4 space-y-3">
                {consultation_prep.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded border border-gray-border shrink-0 mt-0.5 flex items-center justify-center">
                      <span className="text-[10px] font-medium text-dark/30">{i + 1}</span>
                    </div>
                    <p className="text-sm text-dark/60 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start Over */}
          <div className="pt-2 pb-8">
            <button
              onClick={onStartOver}
              className="w-full py-3 rounded-xl border border-gray-border text-sm font-medium text-dark/50
                         flex items-center justify-center gap-2
                         hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecommendationScreen