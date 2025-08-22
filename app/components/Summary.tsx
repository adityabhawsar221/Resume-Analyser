import React from "react";
import ScoreHalfCircle from "./ScoreHalfCircle";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600' : score > 49 ? 'text-yellow-600' : 'text-red-600';
    return (
        <div className="flex flex-row gap-2 items-center bg-gray-50 rounded-xl p-3 justify-between">
            <div className="flex flex-row gap-2 items-center">
                <p className="text-sm font-medium">{title}</p>
                <ScoreBadge score={score} />
            </div>
            <p className="text-sm font-semibold">
                <span className={textColor}>{score || 0}</span>/100
            </p>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border w-full">
            <div className="flex flex-row items-center p-4 gap-4">
                <ScoreHalfCircle score={feedback.overallScore}></ScoreHalfCircle>
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">Your Resume Score</h3>
                    <p className="text-xs text-gray-500">Based on the categories below</p>
                </div>
            </div>
            <div className="px-4 pb-4 space-y-2">
                <Category title='Tone & Style' score={feedback.toneAndStyle?.score || 0}></Category>
                <Category title='Content' score={feedback.content?.score || 0}></Category>
                <Category title='Structure' score={feedback.structure?.score || 0}></Category>
                <Category title='Skills' score={feedback.skills?.score || 0}></Category>
            </div>
        </div>
    );
};

export default Summary;
