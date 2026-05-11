import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight, Brain, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem("quizzo_users") || "[]");
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem("quizzo_user", JSON.stringify(user));
        toast.success(`Welcome back, ${user.username}!`);
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } else {
      const users = JSON.parse(localStorage.getItem("quizzo_users") || "[]");
      if (users.some((u: any) => u.email === formData.email)) {
        toast.error("User already exists with this email.");
      } else {
        const newUser = { 
          id: Date.now(),
          username: formData.username, 
          email: formData.email, 
          password: formData.password,
          progress: {},
          totalScore: 0,
          quizzesTaken: 0
        };
        users.push(newUser);
        localStorage.setItem("quizzo_users", JSON.stringify(users));
        localStorage.setItem("quizzo_user", JSON.stringify(newUser));
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FE] p-4 md:p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-200/40 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-violet-200/40 blur-[150px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-indigo-50"
      >
        {/* Form Section */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-12">
            <div className="bg-indigo-600 p-2.5 rounded-2xl w-fit mb-6 shadow-lg shadow-indigo-100">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">
              {isLogin ? "Welcome back!" : "Join the future."}
            </h2>
            <p className="text-slate-500 font-medium">
              {isLogin ? "Enter your credentials to continue your journey." : "Create your account to start learning today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-sm font-black text-slate-700 ml-1">USERNAME</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. quizmaster99"
                      className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">EMAIL ADDRESS</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">PASSWORD</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 font-semibold">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 ml-2 font-black hover:underline underline-offset-4"
              >
                {isLogin ? "Join now" : "Sign in instead"}
              </button>
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="hidden lg:block bg-indigo-600 p-16 relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-700/50 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-50 px-4 py-2 rounded-full font-black text-xs mb-8 tracking-wide border border-indigo-400/50">
                <Sparkles className="w-4 h-4" />
                THE NEXT GEN OF QUIZZES
              </div>
              <h3 className="text-5xl font-black text-white leading-tight mb-8">
                Ready to level up your knowledge?
              </h3>
              <p className="text-indigo-100 font-medium text-lg leading-relaxed opacity-90 max-w-sm">
                Unlock multi-level challenges, earn badges, and track your performance with beautiful charts.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 p-2 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-black">AI Explanations Included</p>
              </div>
              <p className="text-indigo-100 text-sm font-medium opacity-80 leading-relaxed">
                Every question comes with a detailed AI-generated explanation to help you understand the core concepts.
              </p>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-20 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50 -mr-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500 rounded-full blur-3xl opacity-50 -ml-32"></div>
        </div>
      </motion.div>
    </div>
  );
};
