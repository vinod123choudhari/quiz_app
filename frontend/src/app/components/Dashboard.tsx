import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Trophy, Brain, Target, BookOpen, Layers, 
  ArrowRight, Lock, CheckCircle2, ChevronRight,
  TrendingUp, Clock, Zap
} from "lucide-react";
import { motion } from "motion/react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// Mock Data
export const SUBJECTS = [
  { 
    id: "science", 
    name: "Science", 
    icon: <Brain className="w-8 h-8" />, 
    color: "indigo",
    levels: [
      { id: 1, name: "Fundamentals", questions: 10, unlocked: true },
      { id: 2, name: "Advanced Theory", questions: 15, unlocked: false },
      { id: 3, name: "Quantum Reality", questions: 20, unlocked: false },
    ]
  },
  { 
    id: "tech", 
    name: "Technology", 
    icon: <Zap className="w-8 h-8" />, 
    color: "violet",
    levels: [
      { id: 1, name: "Digital Basics", questions: 10, unlocked: true },
      { id: 2, name: "Cloud Architecture", questions: 15, unlocked: false },
      { id: 3, name: "Cybersecurity Expert", questions: 20, unlocked: false },
    ]
  },
  { 
    id: "literature", 
    name: "Literature", 
    icon: <BookOpen className="w-8 h-8" />, 
    color: "emerald",
    levels: [
      { id: 1, name: "Classic Eras", questions: 10, unlocked: true },
      { id: 2, name: "Modern Narratives", questions: 15, unlocked: false },
      { id: 3, name: "Poetic Structures", questions: 20, unlocked: false },
    ]
  }
];

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex items-center gap-6">
    <div className={`p-4 rounded-2xl bg-${color}-50`}>
      <Icon className={`w-8 h-8 text-${color}-600`} />
    </div>
    <div>
      <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-3xl font-black text-slate-900">{value}</h4>
    </div>
  </div>
);

export const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("quizzo_user") || "null");
    if (!storedUser) navigate("/auth");
    else setUser(storedUser);
  }, [navigate]);

  if (!user) return null;

  // Mock chart data
  const chartData = [
    { name: 'Mon', score: 40 },
    { name: 'Tue', score: 65 },
    { name: 'Wed', score: 55 },
    { name: 'Thu', score: 85 },
    { name: 'Fri', score: 70 },
    { name: 'Sat', score: 95 },
    { name: 'Sun', score: 88 },
  ];

  const getSubjectProgress = (subjectId: string) => {
    const progress = user.progress?.[subjectId] || [];
    return progress;
  };

  const isLevelUnlocked = (subjectId: string, levelId: number) => {
    if (levelId === 1) return true;
    const progress = getSubjectProgress(subjectId);
    return progress.some((p: any) => p.levelId === levelId - 1 && p.score >= 80);
  };

  const getLevelScore = (subjectId: string, levelId: number) => {
    const progress = getSubjectProgress(subjectId);
    const levelData = progress.find((p: any) => p.levelId === levelId);
    return levelData ? levelData.score : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{user.username}</span>!
          </h1>
          <p className="text-slate-500 font-semibold text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            You're in the top 5% of learners this week. Keep it up!
          </p>
        </div>
        <Link 
          to="/final-test"
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group"
        >
          Take Final Test
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Trophy} label="Total Score" value={user.totalScore || 0} color="indigo" />
        <StatCard icon={Target} label="Quizzes Done" value={user.quizzesTaken || 0} color="violet" />
        <StatCard icon={Clock} label="Avg. Score" value={`${user.avgScore || 0}%`} color="emerald" />
        <StatCard icon={Layers} label="Unlocked Levels" value={Object.keys(user.progress || {}).length} color="amber" />
      </div>

      {/* Analytics & Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-indigo-50 shadow-sm flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">Performance Growth</h3>
              <p className="text-slate-400 font-bold text-sm">Your scoring history over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full font-black text-indigo-600 text-sm border border-indigo-100">
              <TrendingUp className="w-4 h-4" />
              +12.4%
            </div>
          </div>
          <div className="flex-1 w-full" key="performance-chart-container">
            <ResponsiveContainer width="100%" height="100%" id="performance-chart-resp">
              <AreaChart data={chartData} id="performance-chart-main">
                <defs>
                  <linearGradient id="colorScoreDashboard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" key="grid" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontWeight: 600, fontSize: 12 }} 
                  dy={10}
                  key="xaxis"
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontWeight: 600, fontSize: 12 }} 
                  key="yaxis"
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '1.5rem', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    padding: '1rem'
                  }}
                  itemStyle={{ fontWeight: 800, color: '#4f46e5' }}
                  key="tooltip"
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorScoreDashboard)" 
                  key="area"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black text-slate-900">Your Paths</h3>
            <button className="text-indigo-600 font-black text-sm hover:underline">See All</button>
          </div>
          
          <div className="space-y-6 overflow-y-auto pr-2 max-h-[400px] flex-1">
            {SUBJECTS.map((subject) => (
              <div key={subject.id} className="bg-white p-6 rounded-[2.5rem] border border-indigo-50 shadow-sm group">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-${subject.color}-50 text-${subject.color}-600 group-hover:scale-110 transition-transform`}>
                    {subject.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{subject.name}</h4>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                      {subject.levels.length} Levels Available
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {subject.levels.map((level) => {
                    const unlocked = isLevelUnlocked(subject.id, level.id);
                    const score = getLevelScore(subject.id, level.id);
                    
                    return (
                      <div 
                        key={`${subject.id}-level-${level.id}`}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          unlocked 
                            ? "bg-slate-50 border-slate-100 hover:border-indigo-200 cursor-pointer" 
                            : "bg-slate-50/50 border-slate-50 opacity-60 grayscale"
                        }`}
                        onClick={() => unlocked && navigate(`/quiz/${subject.id}/${level.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                            score && score >= 80 ? "bg-green-100 text-green-600" : "bg-white text-slate-500"
                          }`}>
                            {score && score >= 80 ? <CheckCircle2 className="w-5 h-5" /> : level.id}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-700 leading-tight">{level.name}</p>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                              {score !== null ? `Score: ${score}%` : `${level.questions} Questions`}
                            </p>
                          </div>
                        </div>
                        {unlocked ? (
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        ) : (
                          <Lock className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
