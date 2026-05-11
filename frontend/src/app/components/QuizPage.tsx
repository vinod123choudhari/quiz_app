import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, Clock, Trophy, ChevronRight, HelpCircle, 
  Sparkles, CheckCircle2, XCircle, AlertCircle, RefreshCw, ArrowRight 
} from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

// Mock Question Database
const QUESTIONS_DB: any = {
  science: {
    1: [
      { 
        id: 1, type: "mcq", question: "What is the primary gas found in Earth's atmosphere?", 
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 
        answer: "Nitrogen", 
        explanation: "Nitrogen makes up about 78% of Earth's atmosphere, while oxygen makes up about 21%."
      },
      { 
        id: 2, type: "tf", question: "Water expands when it freezes.", 
        answer: true, 
        explanation: "Unlike most substances, water becomes less dense and expands when it transitions from liquid to solid."
      },
      {
        id: 3, type: "match", 
        question: "Match the following organs to their primary functions:",
        pairs: [
          { left: "Heart", right: "Pumps Blood" },
          { left: "Lungs", right: "Oxygen Exchange" },
          { left: "Brain", right: "Central Processing" }
        ],
        explanation: "The heart pumps blood, the lungs manage oxygen exchange, and the brain processes central nervous system information."
      }
    ],
    2: [
      { id: 4, type: "mcq", question: "Which of these is NOT a type of subatomic particle?", options: ["Proton", "Neutron", "Electron", "Photon"], answer: "Photon", explanation: "While photons are fundamental particles, they are gauge bosons, not components of an atom like protons, neutrons, and electrons." }
    ]
  },
  tech: {
    1: [
      { id: 101, type: "mcq", question: "What does 'RAM' stand for in computing?", options: ["Real Access Mode", "Random Access Memory", "Rapid Application Management", "Remote Access Module"], answer: "Random Access Memory", explanation: "RAM is a form of computer data storage that stores data and machine code currently being used." }
    ]
  }
};

const MatchFollowing = ({ question, onComplete }: { question: any, onComplete: (isCorrect: boolean) => void }) => {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleSelectLeft = (item: string) => {
    if (isLocked) return;
    setSelectedLeft(item);
  };

  const handleSelectRight = (item: string) => {
    if (isLocked || !selectedLeft) return;
    setMatches(prev => ({ ...prev, [selectedLeft]: item }));
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    if (Object.keys(matches).length !== question.pairs.length) {
      toast.error("Please match all items.");
      return;
    }
    setIsLocked(true);
    let correct = 0;
    question.pairs.forEach((pair: any) => {
      if (matches[pair.left] === pair.right) correct++;
    });
    onComplete(correct === question.pairs.length);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Column A</p>
          {question.pairs.map((p: any) => (
            <button
              key={p.left}
              onClick={() => handleSelectLeft(p.left)}
              className={`w-full p-4 rounded-2xl border-2 text-left font-black transition-all ${
                matches[p.left] 
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                  : selectedLeft === p.left 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" 
                    : "bg-white border-slate-100 text-slate-700 hover:border-indigo-200"
              } ${isLocked && "cursor-default"}`}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Column B</p>
          {question.pairs.map((p: any) => (
            <button
              key={p.right}
              onClick={() => handleSelectRight(p.right)}
              className={`w-full p-4 rounded-2xl border-2 text-left font-black transition-all ${
                Object.values(matches).includes(p.right)
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-slate-100 text-slate-700 hover:border-indigo-200"
              } ${isLocked && "cursor-default"}`}
            >
              {p.right}
            </button>
          ))}
        </div>
      </div>
      {!isLocked && (
        <button 
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:-translate-y-1 transition-all"
        >
          Check Matching
        </button>
      )}
    </div>
  );
};

export const QuizPage = () => {
  const { subjectId, levelId } = useParams();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(subjectId ? 120 : 300); // 5 mins for final test
  const [isComplete, setIsComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const questions = useMemo(() => {
    if (subjectId && levelId) {
      return QUESTIONS_DB[subjectId]?.[levelId] || [];
    }
    // Aggregate all for final test
    const all: any[] = [];
    for (const sub in QUESTIONS_DB) {
      for (const level in QUESTIONS_DB[sub]) {
        all.push(...QUESTIONS_DB[sub][level]);
      }
    }
    return all.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [subjectId, levelId]);

  const currentQuestion = questions[currentIdx];

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(false);
      setIsAnsweredCorrectly(null);
      setSelectedOption(null);
    } else {
      setIsComplete(true);
      handleQuizComplete();
    }
  }, [currentIdx, questions.length]);

  const handleQuizComplete = useCallback(() => {
    const finalScore = Math.round((score / questions.length) * 100);
    const user = JSON.parse(localStorage.getItem("quizzo_user") || "null");
    
    if (user) {
      const updatedUser = { ...user };
      if (!updatedUser.progress) updatedUser.progress = {};
      if (!updatedUser.progress[subjectId!]) updatedUser.progress[subjectId!] = [];
      
      const existingIdx = updatedUser.progress[subjectId!].findIndex((p: any) => p.levelId === parseInt(levelId!));
      if (existingIdx > -1) {
        updatedUser.progress[subjectId!][existingIdx].score = Math.max(updatedUser.progress[subjectId!][existingIdx].score, finalScore);
      } else {
        updatedUser.progress[subjectId!].push({ levelId: parseInt(levelId!), score: finalScore });
      }

      updatedUser.totalScore = (updatedUser.totalScore || 0) + finalScore;
      updatedUser.quizzesTaken = (updatedUser.quizzesTaken || 0) + 1;
      
      localStorage.setItem("quizzo_user", JSON.stringify(updatedUser));
      
      // Update global users array
      const users = JSON.parse(localStorage.getItem("quizzo_users") || "[]");
      const globalIdx = users.findIndex((u: any) => u.id === user.id);
      if (globalIdx > -1) {
        users[globalIdx] = updatedUser;
        localStorage.setItem("quizzo_users", JSON.stringify(users));
      }
    }

    if (finalScore >= 80) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [score, questions.length, subjectId, levelId]);

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsComplete(true);
      handleQuizComplete();
    }
  }, [timeLeft, isComplete, handleQuizComplete]);

  const handleMCQSelect = (option: string) => {
    if (showExplanation) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsAnsweredCorrectly(correct);
    if (correct) setScore(score + 1);
    setShowExplanation(true);
  };

  const handleTFSelect = (val: boolean) => {
    if (showExplanation) return;
    const correct = val === currentQuestion.answer;
    setIsAnsweredCorrectly(correct);
    if (correct) setScore(score + 1);
    setShowExplanation(true);
  };

  const handleMatchComplete = (isCorrect: boolean) => {
    setIsAnsweredCorrectly(isCorrect);
    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
  };

  if (isComplete) {
    const finalPercentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-10">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="inline-flex items-center justify-center p-8 rounded-full bg-indigo-50 mb-8 border-4 border-white shadow-xl">
            <Trophy className={`w-24 h-24 ${finalPercentage >= 80 ? "text-yellow-500" : "text-indigo-400"}`} />
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-4">Quiz Completed!</h2>
          <p className="text-slate-500 font-bold text-xl mb-12">
            Level {levelId}: {finalPercentage >= 80 ? "You're a master! Next level unlocked." : "Good try, but you need 80% to unlock the next level."}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
          <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm">
            <p className="text-slate-400 font-black text-xs uppercase mb-2">SCORE</p>
            <p className="text-4xl font-black text-indigo-600">{finalPercentage}%</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm">
            <p className="text-slate-400 font-black text-xs uppercase mb-2">CORRECT</p>
            <p className="text-4xl font-black text-violet-600">{score}/{questions.length}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all"
          >
            <RefreshCw className="w-6 h-6" />
            Try Again
          </button>
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
          >
            Back to Dashboard
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-12 bg-white p-6 rounded-[2.5rem] border border-indigo-50 shadow-sm sticky top-[100px] z-30">
        <div className="flex items-center gap-6">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">LEVEL {levelId}</p>
            <h3 className="text-xl font-black text-slate-900 leading-tight">Question {currentIdx + 1} of {questions.length}</h3>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-red-50 px-5 py-2.5 rounded-2xl border border-red-100">
            <Clock className={`w-5 h-5 ${timeLeft < 30 ? "text-red-600 animate-pulse" : "text-red-500"}`} />
            <span className={`font-black text-lg ${timeLeft < 30 ? "text-red-600" : "text-red-700"}`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Body */}
      <div className="space-y-12 min-h-[500px]">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-10"
        >
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            {currentQuestion.question}
          </h2>

          {/* Question Types */}
          <div className="pt-4">
            {currentQuestion.type === "mcq" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentQuestion.options.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => handleMCQSelect(option)}
                    disabled={showExplanation}
                    className={`p-6 rounded-3xl border-2 font-black text-lg text-left transition-all relative overflow-hidden group ${
                      showExplanation 
                        ? option === currentQuestion.answer 
                          ? "bg-green-50 border-green-500 text-green-700" 
                          : option === selectedOption 
                            ? "bg-red-50 border-red-500 text-red-700" 
                            : "bg-white border-slate-100 text-slate-400 opacity-50"
                        : "bg-white border-slate-100 text-slate-700 hover:border-indigo-600 hover:bg-indigo-50/30"
                    }`}
                  >
                    <div className="flex items-center justify-between z-10 relative">
                      {option}
                      {showExplanation && option === currentQuestion.answer && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                      {showExplanation && option === selectedOption && option !== currentQuestion.answer && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "tf" && (
              <div className="grid grid-cols-2 gap-8">
                {[true, false].map((val) => (
                  <button
                    key={val.toString()}
                    onClick={() => handleTFSelect(val)}
                    disabled={showExplanation}
                    className={`p-8 rounded-[2.5rem] border-2 font-black text-2xl transition-all ${
                      showExplanation 
                        ? val === currentQuestion.answer 
                          ? "bg-green-50 border-green-500 text-green-700" 
                          : "bg-white border-slate-100 opacity-50"
                        : "bg-white border-slate-100 text-slate-700 hover:border-indigo-600 hover:bg-indigo-50/30"
                    }`}
                  >
                    {val ? "TRUE" : "FALSE"}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "match" && (
              <MatchFollowing question={currentQuestion} onComplete={handleMatchComplete} />
            )}
          </div>
        </motion.div>

        {/* AI Explanation Section */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-[3rem] border shadow-xl ${
                isAnsweredCorrectly ? "bg-green-50/50 border-green-100" : "bg-red-50/50 border-red-100"
              }`}
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${isAnsweredCorrectly ? "bg-green-100" : "bg-red-100"}`}>
                  <Sparkles className={`w-8 h-8 ${isAnsweredCorrectly ? "text-green-600" : "text-red-600"}`} />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-xl font-black ${isAnsweredCorrectly ? "text-green-800" : "text-red-800"}`}>
                      {isAnsweredCorrectly ? "Fantastic Work!" : "Not quite, but let's learn!"}
                    </h4>
                    <p className={`font-semibold text-sm uppercase tracking-widest ${isAnsweredCorrectly ? "text-green-600" : "text-red-600"}`}>
                      AI-GENERATED EXPLANATION
                    </p>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed text-lg italic">
                    "{currentQuestion.explanation}"
                  </p>
                  <button
                    onClick={handleNext}
                    className={`mt-6 inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-lg text-white transition-all shadow-lg hover:-translate-y-1 ${
                      isAnsweredCorrectly ? "bg-green-600 hover:bg-green-700 shadow-green-100" : "bg-red-600 hover:bg-red-700 shadow-red-100"
                    }`}
                  >
                    {currentIdx < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative */}
      <div className="fixed bottom-0 left-0 p-8 z-0 pointer-events-none opacity-20 hidden lg:block">
        <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-2xl border border-indigo-50">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-800 font-black">Think deeply, answer correctly.</p>
        </div>
      </div>
    </div>
  );
};
