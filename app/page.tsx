'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HeartPulse,
  Activity,
  ChevronRight,
  Calendar as CalendarIcon,
  Users,
  Clock,
  ArrowRight,
  Smile,
  Check,
  Plus,
  Phone,
  MapPin,
  Mail,
  FileText,
  Star,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  Stethoscope,
  SmilePlus,
  Users2
} from 'lucide-react';
import Link from 'next/link';

// Core clinical diagnostic symptom categories
const SYMPTOM_EXPLORER_DATA = [
  {
    id: 'fala',
    btnLabel: 'Terapia da Fala 🗣️',
    title: 'Quando procurar um Terapeuta da Fala para a criança?',
    symptoms: [
      'Dificuldade em pronunciar certos sons ou fonemas (troca de s/z, r/l).',
      'Atraso significativo no início da fala (falar pouco ou quase nada aos 2 anos).',
      'Bloqueios na conversação ou repetição repetitiva de sílabas (sintomas de gaguez).',
      'Dificuldade em compreender ordens básicas ou responder a perguntas simples.',
      'Rouquidão prolongada ou cansaço muscular facial ao falar.'
    ],
    recommendation: 'A nossa equipa recomenda uma consulta de avaliação de audição e articulação mecânica para mapear a capacidade fonológica.'
  },
  {
    id: 'ocupacional',
    btnLabel: 'Terapia Ocupacional ✏️',
    title: 'Quando procurar um Terapeuta Ocupacional?',
    symptoms: [
      'Dificuldade com a motricidade fina (segurar o lápis, cortar com tesoura, apertar botões).',
      'Descoordenação motora ampla (tropeçar frequentemente, dificuldade em saltar ou apanhar objetos).',
      'Hipersensibilidade a texturas, barulhos altos, luzes ou contacto físico direto.',
      'Dificuldade em focar a atenção em tarefas da escola ou persistir num jogo simples.',
      'Dificuldade na autonomia diária (higiene pessoal, vestir, calçar sapatos).'
    ],
    recommendation: 'Recomendamos a triagem de Perfil Sensorial Clínico e integração visuo-motora para definir caminhos de estimulação adaptativa.'
  },
  {
    id: 'nutricao',
    btnLabel: 'Nutrição Clínica 🍎',
    title: 'Sinais indicadores para acompanhamento Nutricional',
    symptoms: [
      'Seletividade alimentar extrema (rejeição sistemática de grupos culinários, cores ou legumes).',
      'Intolerâncias alimentares recorrentes com impacto gastrointestinal visível.',
      'Deficit de energia, sonolência diária inexplicável ou flutuações rápidas de peso.',
      'Necessidade de reeducação no ambiente familiar para promover hábitos de vida saudáveis.',
      'Acompanhamento metabólico de dietas restritivas ou alergias diagnosticadas.'
    ],
    recommendation: 'Indicamos um levantamento detalhado de diário alimentar de 3 dias, complementado com bioimpedância segmentar leve.'
  }
];

const INITIAL_PATIENTS = [
  { id: 'pat-1', name: 'João Silva', gender: 'Masculino', age: 8, specialty: 'Terapia da Fala', lastConsultation: '2026-05-20', contact: '+351 912 345 678', status: 'Ativo', notes: 'Dificuldade na pronúncia...' },
  { id: 'pat-2', name: 'Beatriz Santos', gender: 'Feminino', age: 12, specialty: 'Terapia Ocupacional', lastConsultation: '2026-05-22', contact: '+351 922 456 789', status: 'Ativo', notes: 'Foco no desenvolvimento motor fino...' }
];

const INITIAL_APPOINTMENTS = [
  { id: 'app-1', patientId: 'pat-1', patientName: 'João Silva', date: '2026-05-25', time: '09:00', specialty: 'Terapia da Fala', status: 'Confirmado', doctor: 'Dr. Carlos Neto' }
];

export default function LandingPage() {
  // Symptom checker interactive category selected
  const [selectedExplorer, setSelectedExplorer] = React.useState<string>('fala');

  // Interactive self-booking form states
  const [clientName, setClientName] = React.useState<string>('');
  const [clientGender, setClientGender] = React.useState<'Feminino' | 'Masculino' | 'Outro'>('Feminino');
  const [clientAge, setClientAge] = React.useState<string>('');
  const [clientContact, setClientContact] = React.useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = React.useState<'Terapia da Fala' | 'Terapia Ocupacional' | 'Nutrição'>('Terapia da Fala');
  const [preferredDate, setPreferredDate] = React.useState<string>('2026-05-27');
  const [preferredTime, setPreferredTime] = React.useState<string>('10:00');
  const [complaintSummary, setComplaintSummary] = React.useState<string>('');

  // Booking success overlay state
  const [isBookingSuccess, setIsBookingSuccess] = React.useState<boolean>(false);

  // FAQ Expandable state
  const [expandedFaqIndex, setExpandedFaqIndex] = React.useState<number | null>(null);

  // Live client-side statistics
  const [totalAppointments, setTotalAppointments] = React.useState<number>(7);
  const [totalPatients, setTotalPatients] = React.useState<number>(6);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const pats = localStorage.getItem('nexus_patients');
      const apps = localStorage.getItem('nexus_appointments');
      
      let parsedPatsLength = 6;
      let parsedAppsLength = 7;

      if (pats) {
        try {
          parsedPatsLength = JSON.parse(pats).length;
        } catch {
          parsedPatsLength = 6;
        }
      }
      if (apps) {
        try {
          parsedAppsLength = JSON.parse(apps).length;
        } catch {
          parsedAppsLength = 7;
        }
      }

      const timer = setTimeout(() => {
        setTotalPatients(parsedPatsLength);
        setTotalAppointments(parsedAppsLength);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  // Public submission logic saved into local storage so it reflects inside the admin dashboard
  const handlePublicBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientContact.trim()) return;

    const storedPats = localStorage.getItem('nexus_patients');
    const currentPats = storedPats ? JSON.parse(storedPats) : INITIAL_PATIENTS;

    const storedApps = localStorage.getItem('nexus_appointments');
    const currentApps = storedApps ? JSON.parse(storedApps) : INITIAL_APPOINTMENTS;

    const newPatId = 'pat-' + Date.now();
    const newPatient = {
      id: newPatId,
      name: clientName,
      gender: clientGender,
      age: Number(clientAge) || 8,
      specialty: selectedSpecialty,
      lastConsultation: preferredDate,
      contact: clientContact,
      status: 'Triagem',
      notes: `Ficha pré-registada via Website de Booking Público. Sintomas: ${complaintSummary || 'Não especificados'}.`
    };

    const newAppointment = {
      id: 'app-' + Date.now(),
      patientId: newPatId,
      patientName: clientName,
      date: preferredDate,
      time: preferredTime,
      specialty: selectedSpecialty,
      status: 'Pendente',
      doctor: selectedSpecialty === 'Terapia da Fala' ? 'Dr. Carlos Neto' : selectedSpecialty === 'Terapia Ocupacional' ? 'Dra. Sofia Rocha' : 'Dra. Mariana Soares'
    };

    const updatedPats = [newPatient, ...currentPats];
    const updatedApps = [...currentApps, newAppointment];

    localStorage.setItem('nexus_patients', JSON.stringify(updatedPats));
    localStorage.setItem('nexus_appointments', JSON.stringify(updatedApps));

    // Send notification to admin panel
    const storedNotes = localStorage.getItem('nexus_notifications');
    const currentNotes = storedNotes ? JSON.parse(storedNotes) : [];
    const updatedNotes = [`Nova proposta de triagem submetida por ${clientName} (${selectedSpecialty}).`, ...currentNotes];
    localStorage.setItem('nexus_notifications', JSON.stringify(updatedNotes));

    setIsBookingSuccess(true);
    setTotalPatients(updatedPats.length);
    setTotalAppointments(updatedApps.length);

    // Clear form inputs
    setClientName('');
    setClientAge('');
    setClientContact('');
    setComplaintSummary('');
  };

  const FAQS = [
    {
      q: 'Como funciona a marcação através do formulário de triagem?',
      a: 'Ao submeter os seus sintomas e preferências, os nossos coordenadores clínicos analisam instantaneamente o caso no painel privado de administração. Atribuímos-lhe um terapeuta adequado e validamos o dia e hora sugeridos. Recebe confirmação por WhatsApp ou chamada nas seguintes 2 horas úteis.'
    },
    {
      q: 'Onde está localizado o vosso consultório clínico físico?',
      a: 'A nossa clínica central situa-se em instalações modernas integradas, dispondo de salas equipadas para pediatria lúdica e desenvolvimento de autonomia funcional física e alimentar.'
    },
    {
      q: 'Quais as vantagens de um ecossistema clínico sincronizado?',
      a: 'Os terapeutas têm acesso a uma aplicação móvel interna que sincroniza as fichas e relatórios em tempo real. Isto anula relatórios perdidos e permite decisões coordenadas entre Médicos Assistentes, Terapeutas da Fala, Terapeutas Ocupacionais e Nutricionistas.'
    },
    {
      q: 'Os serviços clínicos do Nexus Care são elegíveis para acordos ou seguros?',
      a: 'Sim, emitimos faturas-recibo de saúde com enquadramento de despesas dedutíveis em IRS, compatíveis com a maioria dos subsistemas de saúde e seguros nacionais.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between" id="nexuscare-public-root">
      
      {/* PUBLIC HEADER NAVIGATION BAR */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-sm">
              <HeartPulse className="w-4 h-4 text-[#00acc1]" />
            </div>
            <div>
              <span className="font-extrabold text-[#00acc1] text-xs uppercase tracking-widest block leading-3">Nexus Care</span>
              <span className="text-[9px] text-slate-400 font-bold block">Clínica de Desenvolvimento</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <a href="#specialties" className="text-slate-500 hover:text-slate-950 transition-colors">Especialidades</a>
            <a href="#symptom-explorer" className="text-slate-500 hover:text-slate-950 transition-colors">Sintomas</a>
            <a href="#team" className="text-slate-500 hover:text-slate-950 transition-colors">Equipa</a>
            <a href="#booking-form" className="text-slate-500 hover:text-slate-950 transition-colors">Agendamento</a>
            <a href="#faq" className="text-slate-500 hover:text-slate-950 transition-colors">Perguntas Frequentes</a>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* DEV NAVIGATION TO SIMULATORS - Extremely clean, highlights high fidelity */}
            <Link
              href="/admin"
              className="bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 px-3.5 py-2 rounded-xl text-[11px] font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              id="link-go-to-admin"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00acc1]"></span>
              </span>
              <span>Portal Clínico / Admin 💻</span>
            </Link>
          </div>

        </div>
      </header>

      {/* RENDER PUBLIC STAGE */}
      <main className="flex-1">

        {/* HERO SECTION - SLEEK & EMBELLISHED WITH SPACE GROTESK DESIGN VIBES */}
        <section className="relative py-16 md:py-24 px-4 overflow-hidden border-b border-slate-100 bg-linear-to-b from-[#00acc1]/5 to-transparent">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-1.5 bg-cyan-50 border border-[#00acc1]/20 rounded-full px-3 py-1 font-bold text-[10px] text-[#00acc1] tracking-wider uppercase animate-fade-in">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Agendamento de Consultas de Triagem Aberto</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight select-none">
              Onde a excelência clínica e o afeto guiam o <span className="text-[#00acc1]">desenvolvimento humano</span>.
            </h1>

            <p className="text-slate-550 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
              Oferecemos intervenção multidisciplinar integrada em <strong className="text-slate-800">Terapia da Fala, Terapia Ocupacional e Nutrição</strong> com suporte a relatórios digitais sincronizados em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <a
                href="#booking-form"
                className="w-full sm:w-auto bg-[#00acc1] text-white hover:bg-[#0097a7] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-150"
                id="btn-hero-book"
              >
                <span>Sugerir Consulta de Triagem 📅</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#specialties"
                className="w-full sm:w-auto bg-slate-905 bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                id="btn-hero-explore"
              >
                <span>Conhecer Especialidades</span>
              </a>
            </div>

            {/* Quick stats board linked dynamic to state */}
            <div className="pt-8 md:pt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-slate-100/80 mt-12">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-black text-slate-950 font-mono tracking-tight">{totalPatients}</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">Utentes Ativos</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <p className="text-xl md:text-2xl font-black text-slate-955 font-mono tracking-tight">{totalAppointments}</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">Consultas na Agenda</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-black text-[#00acc1] font-mono tracking-tight">100%</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">Presencial & Online</p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 1: DETAILED SPEC SPECIALTIES */}
        <section id="specialties" className="py-16 bg-slate-50/50 border-b border-slate-100 px-4 scroll-mt-10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Especialidades Clínicas Integradas</h2>
              <p className="text-slate-500 text-xs">Os nossos terapeutas coordenam relatórios e planos de ação para alcançar o potencial de cada utente.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* SPECIALTY CARD Fala */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#00acc1]/50 transition-all text-left space-y-4 shadow-5xs card-s" id="sp-spec-fala">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#00acc1] border border-cyan-100">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900">Terapia da Fala</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Atuação especializada na prevenção, avaliação e tratamento de perturbações da comunicação humana, incluindo linguagem oral, articulação fonológica, mastigação e disfagia.
                  </p>
                </div>
                <p className="text-[9px] text-[#00acc1] uppercase font-bold flex items-center gap-1 pt-2">
                  <span>Equipa de 2 Terapeutas integrados</span>
                </p>
              </div>

              {/* SPECIALTY CARD Ocupacional */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-400/50 transition-all text-left space-y-4 shadow-5xs card-s" id="sp-spec-ocup">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                  <SmilePlus className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900">Terapia Ocupacional</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Avaliação das competências funcionais das atividades diárias. Foco na integração sensorial, motricidade fina, processamento percetivo e estimulação lúdica infantil.
                  </p>
                </div>
                <p className="text-[9px] text-amber-600 uppercase font-bold flex items-center gap-1 pt-2">
                  <span>Mobiliário e equipamento especializado</span>
                </p>
              </div>

              {/* SPECIALTY CARD Nutrição */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-violet-400/50 transition-all text-left space-y-4 shadow-5xs card-s" id="sp-spec-nutri">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500 border border-violet-100">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900">Nutrição Clínica</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Orientação alimentar individualizada e familiar para lidar com alergias, desvios metabólicos ou seletividade alimentar infantil através de técnicas pedagógicas não-invasivas.
                  </p>
                </div>
                <p className="text-[9px] text-violet-600 uppercase font-bold flex items-center gap-1 pt-2">
                  <span>Adequado a crianças e adultos</span>
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 2: INTERACTIVE SYMPTOM EXPLORER CHECKS */}
        <section id="symptom-explorer" className="py-16 px-4 border-b border-slate-100 scroll-mt-10">
          <div className="max-w-4xl mx-auto space-y-10">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[9px] uppercase tracking-widest text-[#00acc1] font-bold">Auto-triagem Informativa</span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Mapeador de Desafios Comuns</h2>
              <p className="text-slate-500 text-xs">Identifique em que especialidade se enquadram as características observadas no dia a dia.</p>
            </div>

            {/* Selector list buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              {SYMPTOM_EXPLORER_DATA.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedExplorer(item.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
                    selectedExplorer === item.id
                      ? 'bg-slate-900 text-white border-slate-950 shadow-sm'
                      : 'bg-white text-slate-650 border-slate-120 hover:bg-slate-100'
                  }`}
                  id={`btn-explorer-${item.id}`}
                >
                  {item.btnLabel}
                </button>
              ))}
            </div>

            {/* Display active category item checker */}
            <AnimatePresence mode="wait">
              {SYMPTOM_EXPLORER_DATA.filter(it => it.id === selectedExplorer).map((active) => (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="bg-[#00acc1]/5 border border-[#00acc1]/20 rounded-3xl p-6 md:p-8 text-left space-y-5 shadow-inner"
                  id={`panel-explorer-${active.id}`}
                >
                  <h4 className="font-extrabold text-[#00acc1] text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-[#00acc1]/10 pb-3">
                    <Activity className="w-4 h-4 text-[#00acc1]" />
                    <span>{active.title}</span>
                  </h4>

                  <div className="space-y-3">
                    {active.symptoms.map((sym, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 leading-normal">
                        <Check className="w-3.5 h-3.5 text-[#00acc1] mt-0.5 shrink-0" />
                        <p>{sym}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#00acc1]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#00acc1]/10">
                    <p className="text-[11px] text-slate-500 italic max-w-lg leading-relaxed font-medium">
                      ⚠️ <strong>Nota Preventiva:</strong> {active.recommendation}
                    </p>
                    <a
                      href="#booking-form"
                      onClick={() => setSelectedSpecialty(active.id === 'fala' ? 'Terapia da Fala' : active.id === 'ocupacional' ? 'Terapia Ocupacional' : 'Nutrição')}
                      className="bg-[#00acc1] text-white hover:bg-[#0097a7] font-bold text-[10px] uppercase tracking-wider py-2 px-4 rounded-xl shrink-0 text-center"
                    >
                      Preencher Formulário de Marcação
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        </section>

        {/* SECTION 3: STAFF CLINICAL PORTRAIT SHOWCASE */}
        <section id="team" className="py-16 bg-slate-50/50 border-b border-slate-100 px-4 scroll-mt-10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Corpo Clínico Permanente</h2>
              <p className="text-slate-500 text-xs">Especialistas certificados no acompanhamento integrado familiar com foco em outcomes funcionais.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Doctor 1 Profile */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-5xs text-left text-xs font-medium">
                <div className="h-44 bg-gradient-to-br from-[#00acc1]/20 to-slate-200 flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-white flex items-center justify-center text-slate-800 text-2xl font-extrabold shadow shadow-slate-350">
                    AM
                  </div>
                  <span className="absolute bottom-3 right-3 bg-[#00acc1] text-white text-[9px] uppercase font-black px-2 py-0.5 rounded-lg border border-cyan-400">Diretora de Turno</span>
                </div>
                <div className="p-5 space-y-3.5">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Dra. Ana Mendes</h4>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Terapia da Fala & Desenvolvimento Coordenado</p>
                  </div>
                  <p className="text-slate-550 leading-relaxed italic">
                    &quot;A linguagem é a ponte para toda a autonomia adaptativa social. O nosso foco é guiar crianças a conquistarem a sua voz.&quot;
                  </p>
                </div>
              </div>

              {/* Doctor 2 Profile */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-5xs text-left text-xs font-medium">
                <div className="h-44 bg-gradient-to-br from-amber-100 to-slate-200 flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-white flex items-center justify-center text-slate-800 text-2xl font-extrabold shadow shadow-slate-350">
                    SR
                  </div>
                </div>
                <div className="p-5 space-y-3.5">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Dra. Sofia Rocha</h4>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Terapia Ocupacional Pediátrica & Reintegração</p>
                  </div>
                  <p className="text-slate-550 leading-relaxed italic">
                    &quot;Através do brincar terapêutico, ajudamos a descodificar estímulos e a edificar a coordenação indispensável para a sala de aula.&quot;
                  </p>
                </div>
              </div>

              {/* Doctor 3 Profile */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-5xs text-left text-xs font-medium">
                <div className="h-44 bg-gradient-to-br from-violet-100 to-slate-200 flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-white flex items-center justify-center text-slate-800 text-2xl font-extrabold shadow shadow-slate-350">
                    MS
                  </div>
                </div>
                <div className="p-5 space-y-3.5">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Dra. Mariana Soares</h4>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Nutrição Clínica & Seletividade Alimentar</p>
                  </div>
                  <p className="text-slate-550 leading-relaxed italic">
                    &quot;Promovemos um relacionamento natural e sereno com a nutrição, estruturando o ambiente familiar livre de ansiedades culinárias.&quot;
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 4: INTEGRATED PRE-TRIAGE SELF BOOKING FORM SENSITIVE TO ARCHITECTURE */}
        <section id="booking-form" className="py-16 px-4 border-b border-slate-100 scroll-mt-10">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-250 p-6 md:p-8 shadow-xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00acc1]/5 rounded-bl-full z-0 pointer-events-none"></div>

            <div className="text-left space-y-2 mb-6 relative z-10 border-b border-slate-100 pb-4">
              <h3 className="text-sm font-extrabold text-[#00acc1] uppercase tracking-widest flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-[#00acc1]" /> Registo de Consulta Pública
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Preencha esta pré-admissão rápida de sintomas. O sistema persistirá e sincronizará os seus dados diretamente com a Consola Privada onde a equipa analisará e confirmará a sua vaga.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isBookingSuccess ? (
                <motion.form
                  key="public-form-active"
                  onSubmit={handlePublicBooking}
                  className="space-y-4 text-xs font-semibold text-slate-800 text-left relative z-10"
                  id="booking-form-element"
                >
                  <div className="space-y-1.5">
                    <label className="text-slate-700 font-bold">Nome Completo do Candidato / Utente</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Miguel Santos"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none focus:ring-1 focus:ring-[#00acc1] font-medium"
                      id="input-booking-name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Gênero</label>
                      <select
                        value={clientGender}
                        onChange={(e: any) => setClientGender(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none text-xs"
                        id="select-booking-gender"
                      >
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Idade (Em anos)</label>
                      <input
                        type="number"
                        min="1"
                        max="110"
                        required
                        placeholder="Ex: 8"
                        value={clientAge}
                        onChange={(e) => setClientAge(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none text-xs font-medium"
                        id="input-booking-age"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Telemóvel ou Email de Contacto</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: +351 915 500 200"
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none text-xs font-medium"
                        id="input-booking-contact"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold">Especialidade Desejada</label>
                      <select
                        value={selectedSpecialty}
                        onChange={(e: any) => setSelectedSpecialty(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none text-xs"
                        id="select-booking-specialty"
                      >
                        <option value="Terapia da Fala">Terapia da Fala 🗣️</option>
                        <option value="Terapia Ocupacional">Terapia Ocupacional ✏️</option>
                        <option value="Nutrição">Nutrição Clínica 🍎</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-750 font-bold">Data Preferencial</label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none font-mono text-xs text-slate-800"
                        id="input-booking-date"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-755 font-bold">Hora Sugerida</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: 10:30"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none font-mono text-xs font-medium"
                        id="input-booking-time"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 font-bold">Descrição Sumária dos Sintomas / Motivo</label>
                    <textarea
                      placeholder="Indique as queixas gerais ou encaminhamento do pediatra para agilizar a triagem preventiva..."
                      value={complaintSummary}
                      onChange={(e) => setComplaintSummary(e.target.value)}
                      className="w-full h-24 p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none text-xs resize-none font-medium text-slate-700"
                      id="input-booking-complaint"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#00acc1] text-white hover:bg-[#0097a7] rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all"
                    id="btn-submit-booking"
                  >
                    Submeter Pedido de Triagem e Salvar
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="public-form-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-6 py-6 text-center text-xs font-medium"
                  id="booking-success-receipt"
                >
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <Check className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-extrabold text-slate-900">Pedimento de Admissão Salvo Estavelmente!</h4>
                    <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                      Sincronização concluída com êxito. O registo de <strong>triagem pendente</strong> foi criado na base de dados de demonstração segura do Nexus Care.
                    </p>
                  </div>

                  {/* High fidelity simulation receipt */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-sm mx-auto space-y-2 font-mono">
                    <p className="text-[#00acc1] font-bold text-[10px] uppercase border-b border-dashed border-slate-200 pb-1 flex justify-between">
                      <span>RECIBO DE SIMULAÇÃO</span>
                      <span>{selectedSpecialty.split(' ')[0]}</span>
                    </p>
                    <p className="text-slate-700"><strong>Data:</strong> {preferredDate}</p>
                    <p className="text-slate-700"><strong>Hora sugerida:</strong> {preferredTime}</p>
                    <p className="text-slate-700"><strong>Estado da Sessão:</strong> PENDENTE DE COORDENAÇÃO</p>
                    <div className="text-[10px] text-slate-500 pt-1.5 border-t border-dashed border-slate-200 leading-normal">
                      ℹ️ Pode constatar o aparecimento imediato desta linha de triagem e consulta marcando o modo 💻 <strong>Painel Administrador</strong> no Portal Clínico.
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Link
                      href="/admin"
                      className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-bold font-mono transition-all flex items-center gap-1"
                    >
                      <span>Ir Para o Painel / Admin ➡️</span>
                    </Link>
                    <button
                      onClick={() => setIsBookingSuccess(false)}
                      className="bg-white border border-slate-250 px-4 py-2 rounded-xl text-slate-650 hover:bg-slate-50 transition-all font-bold"
                    >
                      Novo Agendamento
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* SECTION 5: ACCORDION FAQs */}
        <section id="faq" className="py-16 bg-slate-50/50 border-b border-slate-100 px-4 scroll-mt-10">
          <div className="max-w-3xl mx-auto space-y-8">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Esclarecimento de Dúvidas</h2>
              <p className="text-slate-500 text-xs">Informação clara sobre o ecossistema Nexus Care e o processo de admissão.</p>
            </div>

            <div className="space-y-2 text-left text-xs font-semibold">
              {FAQS.map((faq, index) => {
                const isExpanded = expandedFaqIndex === index;
                return (
                  <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-5xs">
                    <button
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                      className="w-full p-4 flex items-center justify-between text-left font-extrabold text-slate-900 hover:text-[#00acc1]"
                      id={`btn-faq-${index}`}
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#00acc1] font-bold text-sm shrink-0 ml-3">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="p-4 pt-1 text-slate-550 leading-relaxed font-medium bg-slate-50 border-t border-slate-100">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* COMPLIANT SYSTEM CORPORATE FOOTER */}
      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 text-center md:text-left">
            <div>
              <p className="text-xs text-slate-900 font-extrabold uppercase tracking-widest text-[#00acc1] flex justify-center md:justify-start items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00acc1]"></span> NEXUS CARE & SPECIALTY HEALTH PORTAL
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Integração funcional estável compatível com diretrizes europeias de triagem clínica.</p>
            </div>
            
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span className="hover:text-slate-800 cursor-pointer">Termos</span>
              <span className="hover:text-slate-800 cursor-pointer">Privacidade</span>
              <span className="hover:text-slate-800 cursor-pointer">RGPD Saúde</span>
              <Link href="/admin" className="text-[#00acc1] hover:underline">Área Médica</Link>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400">
            © 2026 Nexus Care. Todos os direitos reservados. Design refinado sob identidade visual Sleek Interface.
          </div>
        </div>
      </footer>

    </div>
  );
}
