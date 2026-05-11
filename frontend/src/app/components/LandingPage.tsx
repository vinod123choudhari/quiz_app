import { Link } from "react-router";
import { ArrowRight, Brain, Zap, Trophy, Target, Sparkles, BookOpen, Layers } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-8 rounded-3xl border border-indigo-50 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all group"
  >
    <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-8 h-8 text-indigo-600" />
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
  </motion.div>
);

export const LandingPage = () => {
  const user = localStorage.getItem("quizzo_user");

  return (
    <div className="relative overflow-hidden bg-[#F8F9FE]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center md:text-left z-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-black text-sm mb-8 tracking-wide border border-indigo-100 shadow-sm shadow-indigo-50/50"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              THE FUTURE OF LEARNING IS HERE
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
              Master Any Subject with <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Adaptive AI Quizzes</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-2xl leading-relaxed">
              Experience a multi-level learning path with real-time scoring, AI-powered explanations, and interactive question types designed to boost your knowledge retention.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <Link 
                to={user ? "/dashboard" : "/auth"} 
                className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-1 hover:shadow-indigo-300 active:translate-y-0"
              >
                {user ? "Continue Learning" : "Start For Free"}
                <ArrowRight className="w-6 h-6" />
              </Link>
              <a href="#features" className="text-slate-600 font-bold hover:text-indigo-600 transition-colors flex items-center gap-2 text-lg">
                See How It Works
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200 border-8 border-white group">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1568650136602-ded24b86c5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3AlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzY3ODcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                className="w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Student learning"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
            </div>
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden lg:block border border-indigo-50"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400">DAILY GOAL</p>
                  <p className="text-lg font-black text-slate-900">Level 5 Master</p>
                </div>
              </div>
              <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-indigo-600 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-200/30 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-violet-200/30 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4 md:px-8 max-w-7xl mx-auto bg-white/50 rounded-[4rem] backdrop-blur-sm border border-white my-20">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight"
          >
            Everything You Need <br /> To <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Scale Your Knowledge</span>
          </motion.h2>
          <p className="text-slate-500 font-semibold max-w-2xl mx-auto text-lg">
            Built for students who want more than just multiple choice. Quizzo uses cognitive science to help you learn faster and remember longer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={Layers}
            title="Multi-Level Paths"
            description="Unlock increasingly difficult levels as you prove your mastery. Each level adapts to your previous performance."
          />
          <FeatureCard 
            icon={Brain}
            title="AI Explanations"
            description="Get real-time feedback and detailed explanations for every answer, powered by advanced language models."
          />
          <FeatureCard 
            icon={Zap}
            title="Interactive Types"
            description="Engage with MCQ, True/False, and 'Match the Following' questions that challenge different parts of your memory."
          />
          <FeatureCard 
            icon={Target}
            title="Progress Tracking"
            description="Visualize your growth with detailed performance charts and subject-specific analytics."
          />
          <FeatureCard 
            icon={Trophy}
            title="Timed Final Test"
            description="Test your ultimate knowledge with high-stakes timed assessments that aggregate all topics without assistance."
          />
          <FeatureCard 
            icon={BookOpen}
            title="Comprehensive Library"
            description="Choose from a wide variety of subjects including Science, Mathematics, Literature, and Technology."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-indigo-600 rounded-[5rem] mx-4 md:mx-10 my-20 overflow-hidden relative group">
        <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-white leading-tight">100k+</h4>
            <p className="text-indigo-100 font-black text-sm tracking-widest uppercase opacity-80">Quizzes Created</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-white leading-tight">50+</h4>
            <p className="text-indigo-100 font-black text-sm tracking-widest uppercase opacity-80">Subject Areas</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-white leading-tight">94%</h4>
            <p className="text-indigo-100 font-black text-sm tracking-widest uppercase opacity-80">Improvement Rate</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-white leading-tight">24/7</h4>
            <p className="text-indigo-100 font-black text-sm tracking-widest uppercase opacity-80">AI Support</p>
          </div>
        </div>
      </section>
    </div>
  );
};
