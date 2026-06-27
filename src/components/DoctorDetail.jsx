import { useState } from 'react'
import { ArrowLeft, Star, Clock, Users, IndianRupee, CircleCheck, CalendarCheck, MessageSquareQuote } from 'lucide-react'

function DoctorDetail({ doctor, specialistType, onBack }) {
  const [showBookingConfirm, setShowBookingConfirm] = useState(false)

  function handleBook() {
    setShowBookingConfirm(true)
    setTimeout(() => setShowBookingConfirm(false), 4000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-border px-4 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-dark/60 hover:text-dark transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to recommendations
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-5 py-6 space-y-6">

          {/* Doctor identity */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-light flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-teal">
                {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
              </span>
            </div>
            <div className="space-y-1">
              <h1 className="text-lg font-bold text-dark">{doctor.name}</h1>
              <p className="text-sm text-dark/50">{specialistType}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber fill-amber" />
                <span className="text-sm font-semibold text-dark">{doctor.condition_rating}</span>
                <span className="text-xs text-dark/40 ml-1">condition-specific rating</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-soft rounded-xl p-3.5 text-center">
              <Clock className="w-4 h-4 text-teal mx-auto mb-1.5" />
              <p className="text-base font-bold text-dark">{doctor.experience_years}</p>
              <p className="text-[11px] text-dark/40 mt-0.5">Years Exp</p>
            </div>
            <div className="bg-gray-soft rounded-xl p-3.5 text-center">
              <Users className="w-4 h-4 text-teal mx-auto mb-1.5" />
              <p className="text-base font-bold text-dark">{doctor.similar_patients.toLocaleString()}</p>
              <p className="text-[11px] text-dark/40 mt-0.5">Similar Patients</p>
            </div>
            <div className="bg-gray-soft rounded-xl p-3.5 text-center">
              <IndianRupee className="w-4 h-4 text-teal mx-auto mb-1.5" />
              <p className="text-base font-bold text-dark">₹{doctor.fee}</p>
              <p className="text-[11px] text-dark/40 mt-0.5">Consultation Fee</p>
            </div>
          </div>

          {/* Match reason */}
          <div className="bg-teal-light/40 border border-teal/20 rounded-xl px-5 py-4">
            <div className="flex items-start gap-2.5">
              <CircleCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-1">Why This Doctor Matches You</p>
                <p className="text-sm text-dark/70 leading-relaxed">{doctor.match_reason}</p>
              </div>
            </div>
          </div>

          {/* Review */}
          <div className="bg-white rounded-xl border border-gray-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquareQuote className="w-4 h-4 text-dark/30" />
              <h3 className="text-sm font-semibold text-dark">Patient Review</h3>
            </div>
            <p className="text-sm text-dark/50 italic leading-relaxed">
              "{doctor.relevant_review}"
            </p>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl border border-gray-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <CalendarCheck className="w-4 h-4 text-dark/30" />
              <h3 className="text-sm font-semibold text-dark">Next Available</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {doctor.availability.split(', ').map((slot, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-soft text-dark/60 border border-gray-border"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Book CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-border px-5 py-4">
        <div className="max-w-2xl mx-auto">
          {showBookingConfirm ? (
            <div className="w-full py-3 rounded-xl bg-green/10 border border-green/30 text-center">
              <p className="text-sm font-medium text-green">
                Consultation request sent to {doctor.name}'s clinic
              </p>
              <p className="text-xs text-green/70 mt-0.5">
                This is a prototype — no real booking has been made
              </p>
            </div>
          ) : (
            <button
              onClick={handleBook}
              className="w-full py-3.5 rounded-xl bg-teal text-white text-sm font-semibold
                         hover:bg-teal-dark active:scale-[0.98] transition-all cursor-pointer"
            >
              Book Consultation — ₹{doctor.fee}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorDetail