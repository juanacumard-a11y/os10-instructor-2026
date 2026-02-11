
import React, { useState, useEffect } from 'react';
import { AppMode, Message, Difficulty, QuizAttempt } from './types';
import { STUDY_MODULES } from './constants';
import StudyPortal from './components/StudyPortal';
import QuizView from './components/QuizView';
import VisualStudy from './components/VisualStudy';
import ResultsView from './components/ResultsView';
import { getChatWithNavigation } from './geminiService';

interface UserAccount {
  username: string;
  password?: string;
  status: 'pending' | 'approved' | 'blocked';
  isAdmin: boolean;
}

const App: React.FC = () => {
  // --- AUTH & DATA ---
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('os10_users_db');
    if (saved) return JSON.parse(saved);
    return [{ username: 'admin', password: '2026', status: 'approved', isAdmin: true }];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('os10_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    if (!currentUser) return [];
    const saved = localStorage.getItem(`os10_history_${currentUser.username}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [authView, setAuthView] = useState<'login' | 'register' | 'admin_panel'>('login');
  const [form, setForm] = useState({ user: '', pass: '' });
  const [newAdminPass, setNewAdminPass] = useState('');
  const [authMsg, setAuthMsg] = useState<{ text: string, type: 'error' | 'success' | 'info' } | null>(null);

  // --- APP STATE ---
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState<string>("Examen Integral OS10 (Ley 21.659 y Res. 2183)");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [quizScore, setQuizScore] = useState<{ score: number, total: number } | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<Message[]>([
    { role: 'model', text: 'Bienvenido al sistema de control 2026. ¿En qué módulo de seguridad te gustaría profundizar hoy?', timestamp: new Date() }
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('os10_users_db', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('os10_current_user', JSON.stringify(currentUser));
      const saved = localStorage.getItem(`os10_history_${currentUser.username}`);
      setQuizHistory(saved ? JSON.parse(saved) : []);
    } else {
      localStorage.removeItem('os10_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`os10_history_${currentUser.username}`, JSON.stringify(quizHistory));
    }
  }, [quizHistory, currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // --- AUTH LOGIC ---
  const handleLogin = () => {
    const user = users.find(u => u.username === form.user && u.password === form.pass);
    if (!user) {
      setAuthMsg({ text: 'Credenciales inválidas', type: 'error' });
      return;
    }
    if (user.status === 'pending') {
      setAuthMsg({ text: 'Tu acceso está pendiente de aprobación por el instructor.', type: 'info' });
      return;
    }
    if (user.status === 'blocked') {
      setAuthMsg({ text: 'Tu cuenta ha sido suspendida.', type: 'error' });
      return;
    }
    setCurrentUser(user);
    setAuthMsg(null);
    setAuthView('login');
  };

  const handleRegister = () => {
    if (form.user.length < 3 || form.pass.length < 4) {
      setAuthMsg({ text: 'Usuario (min 3) y Clave (min 4) requeridos.', type: 'error' });
      return;
    }
    if (users.find(u => u.username === form.user)) {
      setAuthMsg({ text: 'El nombre de usuario ya existe.', type: 'error' });
      return;
    }
    const newUser: UserAccount = { username: form.user, password: form.pass, status: 'pending', isAdmin: false };
    setUsers([...users, newUser]);
    setAuthMsg({ text: 'Registro exitoso. Espera la aprobación de tu instructor.', type: 'success' });
    setAuthView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthView('login');
    setMode(AppMode.DASHBOARD);
    setQuizScore(null);
    setForm({ user: '', pass: '' });
  };

  const saveAttempt = (score: number, total: number, details: { question: string, category: string, isCorrect: boolean }[]) => {
    const newAttempt: QuizAttempt = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      topic: quizTopic,
      score,
      total,
      details
    };
    setQuizHistory(prev => [...prev, newAttempt]);
    setQuizScore({ score, total });
  };

  // --- ASSISTANT LOGIC ---
  const handleAssistantSend = async () => {
    if (!assistantInput.trim() || isAssistantLoading) return;
    const userText = assistantInput;
    setAssistantInput('');
    setAssistantMessages(prev => [...prev, { role: 'user', text: userText, timestamp: new Date() }]);
    setIsAssistantLoading(true);
    try {
      const history = assistantMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const botText = await getChatWithNavigation(history, userText, (targetMode) => {
        setMode(targetMode);
        setQuizScore(null);
        setIsAssistantOpen(false);
      });
      setAssistantMessages(prev => [...prev, { role: 'model', text: botText || 'Error.', timestamp: new Date() }]);
    } catch (e) {
      setAssistantMessages(prev => [...prev, { role: 'model', text: 'Error.', timestamp: new Date() }]);
    } finally {
      setIsAssistantLoading(false);
    }
  };

  const startQuiz = (topic?: string, selectedDifficulty?: Difficulty) => {
    setQuizTopic(topic || "Examen Integral OS10 (Ley 21.659 y Res. 2183)");
    if (selectedDifficulty) setDifficulty(selectedDifficulty);
    setQuizScore(null);
    setMode(AppMode.EXAM);
    setIsSidebarOpen(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-white font-sans overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600 rounded-full blur-[120px]"></div>
        </div>
        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl p-10 rounded-[40px] border border-white/10 shadow-2xl relative z-10">
          <div className="w-20 h-20 bg-red-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl border-4 border-white/10 mb-8">
            <i className={`fas ${authView === 'login' ? 'fa-user-shield' : 'fa-user-plus'} text-3xl`}></i>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">{authView === 'login' ? 'Acceso de Personal' : 'Registro de Alumno'}</h2>
          </div>
          {authMsg && (
            <div className={`p-4 rounded-2xl mb-6 text-[10px] font-black uppercase tracking-widest text-center ${
              authMsg.type === 'error' ? 'bg-red-600/20 text-red-500' : 'bg-green-600/20 text-green-500'
            }`}>
              {authMsg.text}
            </div>
          )}
          <div className="space-y-4">
            <input type="text" placeholder="Usuario" value={form.user} onChange={(e) => setForm({...form, user: e.target.value})} className="w-full bg-gray-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none" />
            <input type="password" placeholder="Contraseña" value={form.pass} onChange={(e) => setForm({...form, pass: e.target.value})} className="w-full bg-gray-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none" />
            <button onClick={authView === 'login' ? handleLogin : handleRegister} className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em]">
              {authView === 'login' ? 'Entrar al Sistema' : 'Crear mi Cuenta'}
            </button>
            <button onClick={() => setAuthView(authView === 'login' ? 'register' : 'login')} className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 mt-4">
              {authView === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Entra'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-[200] w-72 bg-[#0f172a] text-white shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg"><i className="fas fa-shield-alt text-2xl"></i></div>
            <div className="flex flex-col"><h1 className="font-black text-xl tracking-tighter leading-none uppercase">OS10 2026</h1><span className="text-[9px] uppercase text-red-500 font-black tracking-widest">Instructor Maestro</span></div>
          </div>
          
          <nav className="flex-1 space-y-2">
            {[
              { id: AppMode.DASHBOARD, label: 'Panel Principal', icon: 'fa-home' },
              { id: AppMode.STUDY, label: 'Centro de Estudio', icon: 'fa-book-open' },
              { id: AppMode.VISUAL, label: 'Simulador Visual', icon: 'fa-eye' },
              { id: AppMode.RESULTS, label: 'Mis Resultados', icon: 'fa-chart-pie' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setMode(item.id); setQuizScore(null); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${mode === item.id ? 'bg-red-600 text-white shadow-xl translate-x-2' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
              >
                <i className={`fas ${item.icon} text-sm`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
            <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-xs uppercase">{currentUser.username.charAt(0)}</div>
              <span className="text-[10px] font-black uppercase tracking-tighter italic truncate">{currentUser.username}</span>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all">
              <i className="fas fa-power-off text-sm"></i>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-72'}`}>
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[100] px-6 py-4 flex justify-between items-center">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            <i className="fas fa-bars"></i>
          </button>
          <div className="hidden lg:block">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Estado de Operación: <span className="text-green-500">Sincronizado OS10</span></h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => startQuiz()} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] shadow-lg transition-all transform active:scale-95">Simulacro Rápido</button>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {mode === AppMode.DASHBOARD && (
            <div className="space-y-12 animate-fadeIn">
              <section className="bg-[#0f172a] text-white p-10 md:p-16 rounded-[50px] shadow-2xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-block bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-8 uppercase tracking-[0.2em]">Instructor Virtual 2026</span>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter italic leading-[0.85]">Domina la<br/>Seguridad Privada</h2>
                  <p className="text-gray-400 text-lg font-bold uppercase tracking-tight italic mb-10">Tu carrera como Guardia de Seguridad comienza aquí. Basado estrictamente en la Ley 21.659.</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setMode(AppMode.STUDY)} className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-gray-100 transition-all">Ver Temarios</button>
                    <button onClick={() => startQuiz()} className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-red-700 transition-all flex items-center gap-3">Iniciar Examen <i className="fas fa-play text-[8px]"></i></button>
                  </div>
                </div>
                <i className="fas fa-shield-halved absolute -right-10 -bottom-10 text-[300px] text-white/5 rotate-12"></i>
              </section>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STUDY_MODULES.slice(0, 4).map((mod) => (
                  <div key={mod.id} onClick={() => setMode(AppMode.STUDY)} className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-gray-100 group cursor-pointer">
                    <div className="w-14 h-14 bg-gray-50 text-red-600 rounded-[20px] flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all"><i className={`fas ${mod.icon} text-xl`}></i></div>
                    <h3 className="font-black text-gray-900 uppercase text-xs mb-2 italic">{mod.title}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed">{mod.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === AppMode.STUDY && <StudyPortal difficulty={difficulty} setDifficulty={setDifficulty} onStartQuiz={startQuiz} />}
          {mode === AppMode.VISUAL && <VisualStudy />}
          {mode === AppMode.RESULTS && <ResultsView attempts={quizHistory} />}
          
          {mode === AppMode.EXAM && (
            <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn">
              {quizScore ? (
                <div className="bg-white p-16 rounded-[60px] shadow-2xl text-center border border-gray-100 max-w-xl mx-auto">
                  <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-8 text-5xl text-white ${quizScore.score >= quizScore.total * 0.7 ? 'bg-green-500 shadow-green-200' : 'bg-red-600 shadow-red-200'} shadow-2xl`}><i className={`fas ${quizScore.score >= quizScore.total * 0.7 ? 'fa-check' : 'fa-times'}`}></i></div>
                  <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter italic">{quizScore.score >= quizScore.total * 0.7 ? '¡APROBADO!' : 'REPROBADO'}</h3>
                  <p className="text-gray-400 mb-12 text-sm font-black uppercase tracking-widest">Resultado Final: {quizScore.score} / {quizScore.total}</p>
                  <div className="flex gap-4">
                    <button onClick={() => startQuiz(quizTopic)} className="flex-1 bg-red-600 text-white py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl">Reintentar</button>
                    <button onClick={() => setMode(AppMode.RESULTS)} className="flex-1 bg-gray-900 text-white py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl">Ver Analítica</button>
                  </div>
                </div>
              ) : (
                <QuizView topic={quizTopic} difficulty={difficulty} onComplete={saveAttempt} />
              )}
            </div>
          )}
        </div>
      </main>

      {/* FLOAT BOT */}
      <div className="fixed bottom-8 right-8 z-[150]">
        {!isAssistantOpen ? (
          <button onClick={() => setIsAssistantOpen(true)} className="w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-white"><i className="fas fa-robot text-xl"></i></button>
        ) : (
          <div className="w-[350px] bg-white rounded-[40px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fadeIn h-[500px]">
             <div className="p-6 bg-[#0f172a] text-white flex justify-between items-center"><span className="text-[10px] font-black uppercase tracking-[0.2em]">IA de Seguridad 2026</span><button onClick={() => setIsAssistantOpen(false)}><i className="fas fa-times"></i></button></div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 no-scrollbar">
              {assistantMessages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-4 rounded-3xl text-[11px] font-bold italic shadow-sm ${m.role === 'user' ? 'bg-red-600 text-white' : 'bg-white border text-gray-700'}`}>{m.text}</div></div>))}
              {isAssistantLoading && <div className="p-4 bg-white border rounded-3xl animate-pulse text-[10px] font-black text-gray-400">Analizando Leyes...</div>}
            </div>
            <div className="p-6 bg-white border-t flex gap-3"><input value={assistantInput} onChange={e => setAssistantInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAssistantSend()} placeholder="Consultar leyes..." className="flex-1 p-4 bg-gray-100 rounded-2xl text-[11px] font-bold focus:outline-none" /><button onClick={handleAssistantSend} className="w-12 h-12 bg-red-600 text-white rounded-2xl shadow-lg flex items-center justify-center"><i className="fas fa-paper-plane text-xs"></i></button></div>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
