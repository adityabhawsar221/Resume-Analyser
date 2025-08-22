import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass = score > 69
    ? 'from-green-50'
    : score > 49
      ? 'from-yellow-50'
      : 'from-red-50';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-xl shadow-sm border w-full p-4`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-3 mb-3">
        <img src={iconSrc} alt="ATS Score Icon" className="w-8 h-8" />
        <div>
          <h3 className="text-lg font-bold">ATS Score - {score}/100</h3>
          <p className="text-sm font-medium text-gray-600">{subtitle}</p>
        </div>
      </div>

      {/* Suggestions list */}
      {suggestions && suggestions.length > 0 && (
        <div className="space-y-2 mb-3">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-4 h-4 mt-0.5 shrink-0"
              />
              <p className={`text-sm ${suggestion.type === "good" ? "text-green-700" : "text-amber-700"}`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
          {suggestions.length > 3 && (
            <p className="text-xs text-gray-500 ml-6">+{suggestions.length - 3} more suggestions</p>
          )}
        </div>
      )}

      {/* Closing encouragement */}
      <p className="text-xs text-gray-600 italic">
        Keep refining your resume to improve your ATS compatibility.
      </p>
    </div>
  )
}

export default ATS