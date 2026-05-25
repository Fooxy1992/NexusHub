'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Briefcase,
  Layers,
  Sparkles,
  X,
  ChevronRight,
  Info,
  Trash2,
  Check,
  Zap,
  Activity,
  HeartPulse,
  Settings,
  Phone,
  User,
  Shield,
  PieChart,
  BarChart3,
  Filter,
  Smile,
  LogOut,
  Sliders,
  CalendarCheck2,
  CalendarDays,
  Smartphone,
  Laptop,
  ArrowLeft,
  Settings2,
  PlusCircle,
  DollarSign,
  FileText,
  AlertTriangle,
  Paperclip,
  Upload,
  FolderOpen,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import StaffModule from './StaffModule';

// Interfaces for structured clinical data
interface Patient {
  id: string;
  name: string;
  gender: 'Feminino' | 'Masculino' | 'Outro';
  age: number;
  birthDate: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  nif: string;
  emergencyContact: string;
  allergies: string;
  meds: string;
  notes: string;
  specialty: string;
  doctor: string;
  status: 'Ativo' | 'Em Alta' | 'Triagem' | 'Inadimplente';
  tags: string[];
  leadOrigin: string;
  avatar?: string;
  lastConsultation: string;
  evolutions?: Array<{
    id: string;
    date: string;
    note: string;
    doctor: string;
    privateNote?: string;
    attachments?: string[];
  }>;
  payments?: Array<{
    id: string;
    amount: number;
    date: string;
    description: string;
    status: 'Pago' | 'Pendente';
  }>;
  documents?: Array<{
    id: string;
    name: string;
    date: string;
    size: string;
    category: string;
  }>;
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  specialty: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
  doctor: string;
}

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'João Silva',
    gender: 'Masculino',
    age: 8,
    birthDate: '2018-03-12',
    email: 'silva.joao@gmail.com',
    phone: '+351 912 345 678',
    whatsapp: '+351 912 345 678',
    address: 'Rua das Flores, nº 14, 2º Esq, Porto',
    nif: '254879102',
    emergencyContact: '+351 912 345 600 (Mãe)',
    allergies: 'Nenhuma alergia conhecida.',
    meds: 'Nenhum medicamento ativo.',
    specialty: 'Terapia da Fala',
    lastConsultation: '2026-05-20',
    status: 'Ativo',
    notes: 'Dificuldade na pronúncia de fonemas sibilantes. Apresenta boa evolução em contexto lúdico.',
    doctor: 'Dr. Carlos Neto',
    tags: ['Pediatria', 'Escolar', 'Fonologia'],
    leadOrigin: 'Instagram',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Joao',
    evolutions: [
      {
        id: 'evo-1',
        date: '2026-05-20',
        note: 'Sessão foca na fonação e posicionamento linguopalatal. O utente participou com entusiasmo através de jogos de sopro e cartões visuais. Progresso notável no fonema /s/ em posição inicial.',
        doctor: 'Dr. Carlos Neto',
        privateNote: 'Recomenda-se reforço terapêutico em casa de 10 minutos diários.'
      },
      {
        id: 'evo-2',
        date: '2026-05-13',
        note: 'Avaliação das alterações de articulação verbal. Registada omissão sistemática do fonema /r/ vibrante múltiplo. Boa cooperação e contacto visual.',
        doctor: 'Dr. Carlos Neto'
      }
    ],
    payments: [
      { id: 'pay-1', amount: 40, date: '2026-05-20', description: 'Sessão de Terapia da Fala #4', status: 'Pago' },
      { id: 'pay-2', amount: 40, date: '2026-05-13', description: 'Sessão de Terapia da Fala #3', status: 'Pago' },
      { id: 'pay-3', amount: 40, date: '2026-05-06', description: 'Sessão de Terapia da Fala #2', status: 'Pago' }
    ],
    documents: [
      { id: 'doc-1', name: 'Relatorio_Avaliacao_Fala_Joao.pdf', date: '2026-05-06', size: '256 KB', category: 'Relatório' }
    ]
  },
  {
    id: 'pat-2',
    name: 'Beatriz Santos',
    gender: 'Feminino',
    age: 12,
    birthDate: '2014-06-25',
    email: 'beatriz.santos@sapo.pt',
    phone: '+351 922 456 789',
    whatsapp: '+351 922 456 789',
    address: 'Av. Boavista, Bloco B, 4º Dto, Porto',
    nif: '298741302',
    emergencyContact: '+351 922 456 700 (Pai)',
    allergies: 'Alimentar: Amendoim e frutos secos.',
    meds: 'Loratadina em caso de crise e SOS.',
    specialty: 'Terapia Ocupacional',
    lastConsultation: '2026-05-22',
    status: 'Ativo',
    notes: 'Foco no desenvolvimento motor fino, coordenação bilateral e planeamento motor avançado.',
    doctor: 'Dra. Sofia Rocha',
    tags: ['Coordenação', 'Motor Fino', 'Escolar'],
    leadOrigin: 'Recomendação',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Beatriz',
    evolutions: [
      {
        id: 'evo-3',
        date: '2026-05-22',
        note: 'Sessão de treino motor com foco na preensão em pinça e caligrafia manuscrita. Realizou exercícios de manipulação de massas clínicas de resistências progressivas e corte com tesoura. Excelente estabilização do punho.',
        doctor: 'Dra. Sofia Rocha',
        privateNote: 'Pedir à mãe para enviar os cadernos da escola para avaliar o tamanho da letra.'
      }
    ],
    payments: [
      { id: 'pay-4', amount: 50, date: '2026-05-22', description: 'Sessão Terapia Ocupacional #12', status: 'Pago' }
    ],
    documents: [
      { id: 'doc-2', name: 'Plano_Intervencao_Ocupacional_B.pdf', date: '2026-05-22', size: '180 KB', category: 'Contrato' }
    ]
  },
  {
    id: 'pat-3',
    name: 'Manuel Costa',
    gender: 'Masculino',
    age: 45,
    birthDate: '1981-11-04',
    email: 'mcosta@empresa.com',
    phone: '+351 932 567 890',
    whatsapp: '+351 932 567 890',
    address: 'Rua de Cedofeita, 192, Porto',
    nif: '102987345',
    emergencyContact: '+351 932 567 800 (Esposa)',
    allergies: 'Lactose / Intolerância severa.',
    meds: 'Atorvastatina 10mg ao deitar.',
    specialty: 'Nutrição',
    lastConsultation: '2026-05-18',
    status: 'Triagem',
    notes: 'Plano nutricional estruturado para reeducação alimentar e melhoria do perfil lipídico.',
    doctor: 'Dra. Mariana Soares',
    tags: ['Adulto', 'Colesterol', 'Reeducação'],
    leadOrigin: 'Website',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Manuel',
    evolutions: [
      {
        id: 'evo-4',
        date: '2026-05-18',
        note: 'Primeira consulta de avaliação metabólica e nutricional. Peso: 87.5kg, Altura: 1.76m, IMC: 28.2. Definidos objetivos de redução de massa gorda visando a melhoria do colesterol total e HDL.',
        doctor: 'Dra. Mariana Soares'
      }
    ],
    payments: [
      { id: 'pay-5', amount: 60, date: '2026-05-18', description: 'Consulta de Nutrição Geral', status: 'Pago' }
    ],
    documents: [
      { id: 'doc-3', name: 'Analises_Clinicas_Anuais_M.pdf', date: '2026-05-18', size: '1.2 MB', category: 'Exame' }
    ]
  },
  {
    id: 'pat-4',
    name: 'Maria Rodrigues',
    gender: 'Feminino',
    age: 6,
    birthDate: '2020-01-30',
    email: 'catarina.rodrigues@hotmail.com',
    phone: '+351 915 678 123',
    whatsapp: '+351 915 678 123',
    address: 'Avenida da República, Vila Nova de Gaia',
    nif: '287410982',
    emergencyContact: '+351 915 678 000 (Mãe)',
    allergies: 'Antibióticos da classe da Penicilina.',
    meds: 'Nenhum de toma diária.',
    specialty: 'Terapia da Fala',
    lastConsultation: '2026-05-15',
    status: 'Em Alta',
    notes: 'Alta crítica concedida após atingir todos os objetivos de articulação verbal e dicção.',
    doctor: 'Dr. Carlos Neto',
    tags: ['Alta', 'Articulação', 'Fluência'],
    leadOrigin: 'Médico Assistente',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maria',
    evolutions: [
      {
        id: 'evo-5',
        date: '2026-05-15',
        note: 'Sessão final de alta clínica. Todos os fonemas alvo foram integrados na fala espontânea de forma fluida. Sem desvios articulatórios remanescentes.',
        doctor: 'Dr. Carlos Neto'
      }
    ],
    payments: [
      { id: 'pay-6', amount: 40, date: '2026-05-15', description: 'Consulta Final de Alta', status: 'Pago' }
    ],
    documents: [
      { id: 'doc-4', name: 'Relatorio_Alta_Clinica_Maria.pdf', date: '2026-05-15', size: '204 KB', category: 'Relatório' }
    ]
  },
  {
    id: 'pat-5',
    name: 'Carolina Oliveira',
    gender: 'Feminino',
    age: 29,
    birthDate: '1997-08-15',
    email: 'carol.oliveira@outlook.com',
    phone: '+351 964 123 321',
    whatsapp: '+351 964 123 321',
    address: 'Rua do Almada, nº 54, Porto',
    nif: '230981724',
    emergencyContact: '+351 964 123 300 (Irmão)',
    allergies: 'Nenhuma alergia conhecida.',
    meds: 'Nenhum medicamento ativo.',
    specialty: 'Terapia Ocupacional',
    lastConsultation: '2026-05-24',
    status: 'Ativo',
    notes: 'Reintegração funcional do membro superior esquerdo pós-entorse. Treino de pinça fina em progresso.',
    doctor: 'Dra. Sofia Rocha',
    tags: ['Adulto', 'Membro Superior', 'Pós-Lesão'],
    leadOrigin: 'Website',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Carol',
    evolutions: [
      {
        id: 'evo-6',
        date: '2026-05-24',
        note: 'Sessão de reabilitação. Exercícios de mobilidade passiva e ativa assistida na articulação radiocarpiana esquerda. Registada amplitude de flexo-extensão de 85% comparada a membro contralateral.',
        doctor: 'Dra. Sofia Rocha'
      }
    ],
    payments: [
      { id: 'pay-7', amount: 50, date: '2026-05-24', description: 'Sessão TO Reabilitação #2', status: 'Pago' }
    ],
    documents: [
      { id: 'doc-5', name: 'Relatorio_Fisiatrico_Ecografia_C.pdf', date: '2026-05-10', size: '540 KB', category: 'Exame' }
    ]
  },
  {
    id: 'pat-6',
    name: 'Afonso Pereira',
    gender: 'Masculino',
    age: 10,
    birthDate: '2016-09-05',
    email: 'afonso.p@gmail.com',
    phone: '+351 933 111 222',
    whatsapp: '+351 933 111 222',
    address: 'Rua Formosa, nº 221, Porto',
    nif: '264789301',
    emergencyContact: '+351 933 111 000 (Mãe)',
    allergies: 'Glúten, doença celíaca diagnósticada.',
    meds: 'Nenhum de toma contínua.',
    specialty: 'Nutrição',
    lastConsultation: '2026-05-19',
    status: 'Inadimplente',
    notes: 'Alergias alimentares sob controlo. Reintrodução progressiva de lácteos e sementes.',
    doctor: 'Dra. Mariana Soares',
    tags: ['Pediatria', 'Celiaco', 'Alergias'],
    leadOrigin: 'Instagram',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Afonso',
    evolutions: [
      {
        id: 'evo-7',
        date: '2026-05-19',
        note: 'Sessão focou no plano dietético 100% isento de glúten e contaminações cruzadas. Discutidas soluções para lanches escolares.',
        doctor: 'Dra. Mariana Soares'
      }
    ],
    payments: [
      { id: 'pay-8', amount: 60, date: '2026-05-19', description: 'Consulta Nutrição Infantil', status: 'Pendente' }
    ],
    documents: [
      { id: 'doc-6', name: 'Laudo_Laboratorial_Doenca_Celiaca.pdf', date: '2026-05-15', size: '1.4 MB', category: 'Exame' }
    ]
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    patientId: 'pat-1',
    patientName: 'João Silva',
    date: '2026-05-25',
    time: '09:00',
    specialty: 'Terapia da Fala',
    status: 'Confirmado',
    doctor: 'Dr. Carlos Neto'
  },
  {
    id: 'app-2',
    patientId: 'pat-2',
    patientName: 'Beatriz Santos',
    date: '2026-05-25',
    time: '11:30',
    specialty: 'Terapia Ocupacional',
    status: 'Confirmado',
    doctor: 'Dra. Sofia Rocha'
  },
  {
    id: 'app-3',
    patientId: 'pat-3',
    patientName: 'Manuel Costa',
    date: '2026-05-25',
    time: '15:00',
    specialty: 'Nutrição',
    status: 'Pendente',
    doctor: 'Dra. Mariana Soares'
  },
  {
    id: 'app-4',
    patientId: 'pat-5',
    patientName: 'Carolina Oliveira',
    date: '2026-05-26',
    time: '10:00',
    specialty: 'Terapia Ocupacional',
    status: 'Confirmado',
    doctor: 'Dra. Sofia Rocha'
  },
  {
    id: 'app-5',
    patientId: 'pat-6',
    patientName: 'Afonso Pereira',
    date: '2026-05-26',
    time: '14:30',
    specialty: 'Nutrição',
    status: 'Confirmado',
    doctor: 'Dra. Mariana Soares'
  },
  {
    id: 'app-6',
    patientId: 'pat-1',
    patientName: 'João Silva',
    date: '2026-05-28',
    time: '11:00',
    specialty: 'Terapia da Fala',
    status: 'Confirmado',
    doctor: 'Dr. Carlos Neto'
  },
  {
    id: 'app-7',
    patientId: 'pat-2',
    patientName: 'Beatriz Santos',
    date: '2026-05-29',
    time: '16:00',
    specialty: 'Terapia Ocupacional',
    status: 'Pendente',
    doctor: 'Dra. Sofia Rocha'
  }
];

interface ClinicService {
  id: string;
  name: string;
  specialty: 'Terapia da Fala' | 'Terapia Ocupacional' | 'Nutrição';
  price: number;
  duration: number; // in minutes
  description: string;
}

interface FinancialTransaction {
  id: string;
  type: 'Receita' | 'Despesa';
  category: 'Consulta' | 'Material Clínico' | 'Renda' | 'Salários' | 'Utilitários' | 'Outros';
  amount: number;
  date: string; // YYYY-MM-DD
  description: string;
  status: 'Pago' | 'Pendente';
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  subspecialty: string;
  professionalId: string; // CRM, CRP, CRN, etc.
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  bio: string;
  experience: string;
  languages: string;
  status: 'Ativo' | 'Inativo' | 'Ausente';
  tags: string[];
  schedule: Array<{
    dayOfWeek: number; // 0-6 (0 is Sunday)
    startTime: string;
    endTime: string;
  }>;
  consultationDuration: number;
  consultationPrice: number;
  color: string;
  documents: Array<{
    id: string;
    name: string;
    date: string;
    size: string;
  }>;
  avatar: string;
}

const INITIAL_SPECIALISTS: Specialist[] = [
  {
    id: 'spec-1',
    name: 'Dr. Carlos Neto',
    specialty: 'Terapia da Fala',
    subspecialty: 'Alfabetização e Linguagem',
    professionalId: 'CRFA-12345',
    email: 'carlos.neto@clinica.com',
    phone: '+351 912 345 678',
    whatsapp: '+351 912 345 678',
    address: 'Clínica Principal',
    bio: 'Especialista em desenvolvimento infantil com mais de 10 anos de experiência em fonoaudiologia escolar.',
    experience: '12 anos',
    languages: 'Português, Inglês',
    status: 'Ativo',
    tags: ['Pediatria', 'Fala', 'Linguagem'],
    schedule: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '18:00' },
    ],
    consultationDuration: 45,
    consultationPrice: 40,
    color: 'bg-indigo-500',
    documents: [],
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=CarlosNeto'
  },
  {
    id: 'spec-2',
    name: 'Dra. Sofia Rocha',
    specialty: 'Terapia Ocupacional',
    subspecialty: 'Integração Sensorial',
    professionalId: 'CREFITO-98765',
    email: 'sofia.rocha@clinica.com',
    phone: '+351 923 456 789',
    whatsapp: '+351 923 456 789',
    address: 'Clínica Principal',
    bio: 'Focada em intervenção precoce e análise de desenvolvimento motor.',
    experience: '8 anos',
    languages: 'Português',
    status: 'Ativo',
    tags: ['Integração Sensorial', 'Pediatria'],
    schedule: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '19:00' },
      { dayOfWeek: 2, startTime: '10:00', endTime: '19:00' },
      { dayOfWeek: 3, startTime: '10:00', endTime: '19:00' },
      { dayOfWeek: 4, startTime: '10:00', endTime: '19:00' },
      { dayOfWeek: 5, startTime: '10:00', endTime: '15:00' },
    ],
    consultationDuration: 50,
    consultationPrice: 50,
    color: 'bg-emerald-500',
    documents: [],
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SofiaRocha'
  },
  {
    id: 'spec-3',
    name: 'Dra. Mariana Soares',
    specialty: 'Nutrição',
    subspecialty: 'Nutrição Materno-Infantil',
    professionalId: 'CRN-55443',
    email: 'mariana.soares@clinica.com',
    phone: '+351 934 567 890',
    whatsapp: '+351 934 567 890',
    address: 'Atendimento Online / Presencial',
    bio: 'Nutricionista apaixonada por alimentação saudável na infância e adolescência.',
    experience: '5 anos',
    languages: 'Português, Espanhol',
    status: 'Ativo',
    tags: ['Infantil', 'Esportiva'],
    schedule: [
      { dayOfWeek: 2, startTime: '08:00', endTime: '12:00' },
      { dayOfWeek: 4, startTime: '14:00', endTime: '18:00' },
      { dayOfWeek: 6, startTime: '09:00', endTime: '13:00' },
    ],
    consultationDuration: 60,
    consultationPrice: 60,
    color: 'bg-rose-500',
    documents: [],
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MarianaSoares'
  }
];

const INITIAL_SERVICES: ClinicService[] = [
  {
    id: 'srv-1',
    name: 'Avaliação Inicial Linguagem',
    specialty: 'Terapia da Fala',
    price: 65,
    duration: 60,
    description: 'Diagnóstico detalhado de perturbações da comunicação, fala e linguagem oral/escrita.'
  },
  {
    id: 'srv-2',
    name: 'Terapia da Fala Regular (45m)',
    specialty: 'Terapia da Fala',
    price: 40,
    duration: 45,
    description: 'Sessão regular de intervenção direta focada em articulação verbal, voz ou processamento auditivo.'
  },
  {
    id: 'srv-3',
    name: 'Sessão Integração Sensorial (50m)',
    specialty: 'Terapia Ocupacional',
    price: 50,
    duration: 50,
    description: 'Treino de processamento sensorial e coordenação motora fina em ginásio clínico adaptado.'
  },
  {
    id: 'srv-4',
    name: 'Avaliação Ocupacional Pediatria',
    specialty: 'Terapia Ocupacional',
    price: 70,
    duration: 60,
    description: 'Relatório clínico detalhado e análise de autonomia das atividades de vida diária.'
  },
  {
    id: 'srv-5',
    name: 'Consulta de Reeducação Alimentar',
    specialty: 'Nutrição',
    price: 60,
    duration: 60,
    description: 'Avaliação nutricional antropométrica por bioimpedância com estruturação dietética completa.'
  },
  {
    id: 'srv-6',
    name: 'Seguimento Nutricional Online',
    specialty: 'Nutrição',
    price: 35,
    duration: 30,
    description: 'Sessão de reavaliação remota para verificação de diário alimentar e pequenos ajustes no plano.'
  }
];

const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'tx-1',
    type: 'Despesa',
    category: 'Renda',
    amount: 850,
    date: '2026-05-01',
    description: 'Renda mensal do consultório clínico principal',
    status: 'Pago'
  },
  {
    id: 'tx-2',
    type: 'Despesa',
    category: 'Salários',
    amount: 1450,
    date: '2026-05-25',
    description: 'Honorários de terapeutas colaboradores e administrativos',
    status: 'Pago'
  },
  {
    id: 'tx-3',
    type: 'Despesa',
    category: 'Material Clínico',
    amount: 110,
    date: '2026-05-10',
    description: 'Compra de testes padronizados e brinquedos didáticos',
    status: 'Pago'
  },
  {
    id: 'tx-4',
    type: 'Despesa',
    category: 'Utilitários',
    amount: 95,
    date: '2026-05-12',
    description: 'Fatura de serviços de comunicação, internet e águas/luz',
    status: 'Pago'
  },
  {
    id: 'tx-5',
    type: 'Receita',
    category: 'Outros',
    amount: 250,
    date: '2026-05-15',
    description: 'Inscrições para Workshop Avançado de Autismo e Fala',
    status: 'Pago'
  }
];

const sanitizePatient = (p: any): Patient => {
  const spec = p.specialty || 'Terapia da Fala';
  const doc = p.doctor || (spec === 'Nutrição' ? 'Dra. Mariana Soares' : spec === 'Terapia Ocupacional' ? 'Dra. Sofia Rocha' : 'Dr. Carlos Neto');
  return {
    id: p.id,
    name: p.name || 'Sem nome',
    gender: p.gender || 'Feminino',
    age: p.age || 10,
    birthDate: p.birthDate || '2016-01-01',
    email: p.email || `${(p.name || p.id).toLowerCase().replace(/\s+/g, '')}@gmail.com`,
    phone: p.phone || p.contact || '+351 900 000 000',
    whatsapp: p.whatsapp || p.contact || '+351 900 000 000',
    address: p.address || 'Rua Central, Porto',
    nif: p.nif || '999999999',
    emergencyContact: p.emergencyContact || '+351 900 000 000 (Responsável)',
    allergies: p.allergies || 'Nenhuma relevante',
    meds: p.meds || 'Nenhum',
    notes: p.notes || '',
    specialty: spec,
    doctor: doc,
    status: p.status || 'Ativo',
    tags: p.tags || [spec || 'Geral'],
    leadOrigin: p.leadOrigin || 'Directo',
    avatar: p.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${p.name || p.id}`,
    lastConsultation: p.lastConsultation || '2026-05-15',
    evolutions: p.evolutions || [
      {
        id: 'evo-1',
        date: '2026-05-15',
        note: `Sessão diagnóstica realizada com ${p.name || 'utente'}. Apresentou cooperação geral no cumprimento dos exercícios sugeridos.`,
        doctor: doc
      }
    ],
    payments: p.payments || [
      {
        id: 'pay-1',
        amount: spec === 'Nutrição' ? 60 : spec === 'Terapia Ocupacional' ? 50 : 40,
        date: '2026-05-15',
        description: 'Sessão Individual',
        status: 'Pago'
      }
    ],
    documents: p.documents || [
      {
        id: 'doc-1',
        name: 'Ficha_Inicio_Clinica.pdf',
        date: '2026-05-15',
        size: '110 KB',
        category: 'Relatório'
      }
    ]
  };
};

export default function AdminPage() {
  // Device Viewer Mode State: Desktop Admin Portal or Mobile App Simulator
  const [deviceMode, setDeviceMode] = React.useState<'desktop' | 'mobile'>('desktop');

  // Active Tab for Desktop View
  const [desktopTab, setDesktopTab] = React.useState<'dashboard' | 'patients' | 'calendar' | 'analytics' | 'settings' | 'services' | 'financial' | 'staff'>('dashboard');

  // Active Tab for Mobile View Simulator
  const [mobileTab, setMobileTab] = React.useState<'m-home' | 'm-patients' | 'm-calendar' | 'm-analytics' | 'm-staff'>('m-home');

  // App Theme State
  const [appTheme, setAppTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('nexus_app_theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  const toggleAppTheme = (theme: 'light' | 'dark') => {
    setAppTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_app_theme', theme);
    }
  };

  // Application-wide synchronized state: Patients
  const [patients, setPatients] = React.useState<Patient[]>(() => {
    if (typeof window !== 'undefined') {
      const storedPats = localStorage.getItem('nexus_patients');
      if (storedPats) {
        try {
          const parsed = JSON.parse(storedPats);
          return parsed.map((p: any) => sanitizePatient(p));
        } catch {
          return INITIAL_PATIENTS.map(p => sanitizePatient(p));
        }
      } else {
        const withSanitize = INITIAL_PATIENTS.map(p => sanitizePatient(p));
        localStorage.setItem('nexus_patients', JSON.stringify(withSanitize));
        return withSanitize;
      }
    }
    return INITIAL_PATIENTS.map(p => sanitizePatient(p));
  });

  const [appointments, setAppointments] = React.useState<Appointment[]>(() => {
    if (typeof window !== 'undefined') {
      const storedApps = localStorage.getItem('nexus_appointments');
      if (storedApps) {
        try {
          return JSON.parse(storedApps);
        } catch {
          return INITIAL_APPOINTMENTS;
        }
      } else {
        localStorage.setItem('nexus_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [notifications, setNotifications] = React.useState<string[]>(() => {
    const defaultNotes = [
      'Consulta de Beatriz Santos foi confirmada automaticamente.',
      'Novo utente Manuel Costa adicionado via pré-triagem.',
      'Integração com Google Calendar sincronizada com sucesso.'
    ];
    if (typeof window !== 'undefined') {
      const storedNotes = localStorage.getItem('nexus_notifications');
      if (storedNotes) {
        try {
          return JSON.parse(storedNotes);
        } catch {
          return defaultNotes;
        }
      } else {
        localStorage.setItem('nexus_notifications', JSON.stringify(defaultNotes));
      }
    }
    return defaultNotes;
  });
  
  // Settings customizable metrics
  const [clinicName, setClinicName] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedClinic = localStorage.getItem('nexus_clinic_name');
      if (storedClinic) return storedClinic;
    }
    return 'Nexus Care Central';
  });

  const [doctorName, setDoctorName] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedDoctor = localStorage.getItem('nexus_doctor_name');
      if (storedDoctor) return storedDoctor;
    }
    return 'Dra. Ana Mendes';
  });

  const [calendarSyncActive, setCalendarSyncActive] = React.useState<boolean>(true);

  const [outcomesTarget, setOutcomesTarget] = React.useState<number>(() => {
    if (typeof window !== 'undefined') {
      const storedOutcomes = localStorage.getItem('nexus_outcomes_target');
      if (storedOutcomes) return Number(storedOutcomes) || 95;
    }
    return 95;
  });

  const [isDataLoaded] = React.useState<boolean>(true);

  // Sync state functions
  const savePatients = (pList: Patient[]) => {
    setPatients(pList);
    localStorage.setItem('nexus_patients', JSON.stringify(pList));
  };

  const saveAppointments = (aList: Appointment[]) => {
    setAppointments(aList);
    localStorage.setItem('nexus_appointments', JSON.stringify(aList));
  };

  const saveNotifications = (nList: string[]) => {
    setNotifications(nList);
    localStorage.setItem('nexus_notifications', JSON.stringify(nList));
  };

  const saveClinicSettings = (name: string, doctor: string, target: number) => {
    setClinicName(name);
    setDoctorName(doctor);
    setOutcomesTarget(target);
    localStorage.setItem('nexus_clinic_name', name);
    localStorage.setItem('nexus_doctor_name', doctor);
    localStorage.setItem('nexus_outcomes_target', target.toString());
  };

  // Synchronized state: Specialties
  const [specialties, setSpecialties] = React.useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nexus_specialties');
      if (stored) {
        try { return JSON.parse(stored); } catch { return ['Terapia da Fala', 'Terapia Ocupacional', 'Nutrição']; }
      } else {
        const defaultSpecs = ['Terapia da Fala', 'Terapia Ocupacional', 'Nutrição'];
        localStorage.setItem('nexus_specialties', JSON.stringify(defaultSpecs));
        return defaultSpecs;
      }
    }
    return ['Terapia da Fala', 'Terapia Ocupacional', 'Nutrição'];
  });

  const saveSpecialties = (list: string[]) => {
    setSpecialties(list);
    localStorage.setItem('nexus_specialties', JSON.stringify(list));
  };

  // Synchronized state: Specialists
  const [specialists, setSpecialists] = React.useState<Specialist[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nexus_specialists_data');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return INITIAL_SPECIALISTS;
        }
      } else {
        localStorage.setItem('nexus_specialties_data', JSON.stringify(INITIAL_SPECIALISTS));
        return INITIAL_SPECIALISTS;
      }
    }
    return INITIAL_SPECIALISTS;
  });

  const saveSpecialists = (list: Specialist[]) => {
    setSpecialists(list);
    localStorage.setItem('nexus_specialties_data', JSON.stringify(list));
  };

  // Synchronized state: Services
  const [services, setServices] = React.useState<ClinicService[]>(() => {
    if (typeof window !== 'undefined') {
      const storedServices = localStorage.getItem('nexus_services');
      if (storedServices) {
        try { return JSON.parse(storedServices); } catch { return INITIAL_SERVICES; }
      } else {
        localStorage.setItem('nexus_services', JSON.stringify(INITIAL_SERVICES));
      }
    }
    return INITIAL_SERVICES;
  });

  const saveServices = (sList: ClinicService[]) => {
    setServices(sList);
    localStorage.setItem('nexus_services', JSON.stringify(sList));
  };

  // Synchronized state: Transactions (Finance)
  const [transactions, setTransactions] = React.useState<FinancialTransaction[]>(() => {
    if (typeof window !== 'undefined') {
      const storedTx = localStorage.getItem('nexus_transactions');
      if (storedTx) {
        try { return JSON.parse(storedTx); } catch { return INITIAL_TRANSACTIONS; }
      } else {
        localStorage.setItem('nexus_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const saveTransactions = (tList: FinancialTransaction[]) => {
    setTransactions(tList);
    localStorage.setItem('nexus_transactions', JSON.stringify(tList));
  };

  // Form states for Services management
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = React.useState<boolean>(false);
  const [editingServiceId, setEditingServiceId] = React.useState<string | null>(null);
  const [serviceName, setServiceName] = React.useState<string>('');
  const [serviceSpecialty, setServiceSpecialty] = React.useState<'Terapia da Fala' | 'Terapia Ocupacional' | 'Nutrição'>('Terapia da Fala');
  const [servicePrice, setServicePrice] = React.useState<number>(50);
  const [serviceDuration, setServiceDuration] = React.useState<number>(45);
  const [serviceDescription, setServiceDescription] = React.useState<string>('');

  // Form states for Transaction management
  const [isNewTxModalOpen, setIsNewTxModalOpen] = React.useState<boolean>(false);
  const [editingTxId, setEditingTxId] = React.useState<string | null>(null);
  const [txType, setTxType] = React.useState<'Receita' | 'Despesa'>('Receita');
  const [txCategory, setTxCategory] = React.useState<'Consulta' | 'Material Clínico' | 'Renda' | 'Salários' | 'Utilitários' | 'Outros'>('Consulta');
  const [txAmount, setTxAmount] = React.useState<number>(45);
  const [txDate, setTxDate] = React.useState<string>('2026-05-25');
  const [txDescription, setTxDescription] = React.useState<string>('');
  const [txStatus, setTxStatus] = React.useState<'Pago' | 'Pendente'>('Pago');

  // Filter and search variables for Patients Management
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [specialtyFilter, setSpecialtyFilter] = React.useState<string>('Todos');
  const [calendarSpecialtyFilter, setCalendarSpecialtyFilter] = React.useState<string>('Todos');
  const [financeTypeFilter, setFinanceTypeFilter] = React.useState<'Todos' | 'Receita' | 'Despesa'>('Todos');
  const [financeStatusFilter, setFinanceStatusFilter] = React.useState<'Todos' | 'Pago' | 'Pendente'>('Todos');

  // Interactive dashboard states
  const [dashboardSearchQuery, setDashboardSearchQuery] = React.useState<string>('');
  const [dashboardStatusFilter, setDashboardStatusFilter] = React.useState<'Todos' | 'Ativo' | 'Em Alta' | 'Triagem' | 'Inadimplente'>('Todos');
  const [isDashboardLoading, setIsDashboardLoading] = React.useState<boolean>(false);

  // CRM Individual Patient Drawer States
  const [isCRMDrawerOpen, setIsCRMDrawerOpen] = React.useState<boolean>(false);
  const [activeCRMTab, setActiveCRMTab] = React.useState<'overview' | 'timeline' | 'ehr' | 'consultations' | 'financial' | 'documents'>('overview');
  
  // EHR Note Creator State
  const [ehrNoteText, setEhrNoteText] = React.useState<string>('');
  const [ehrPrivateText, setEhrPrivateText] = React.useState<string>('');
  const [ehrSelectedTemplate, setEhrSelectedTemplate] = React.useState<'Livre' | 'SOAP'>('Livre');

  // Finance adding payment state
  const [financialPaymentAmount, setFinancialPaymentAmount] = React.useState<number>(40);
  const [financialPaymentDesc, setFinancialPaymentDesc] = React.useState<string>('Mensalidade de Terapia');
  
  // Document uploading simulator
  const [documentSimCategory, setDocumentSimCategory] = React.useState<string>('Relatório');
  const [isDraggingDoc, setIsDraggingDoc] = React.useState<boolean>(false);

  // Selection states for Modals & Drawers
  const [selectedPatientId, setSelectedPatientId] = React.useState<string | null>(null);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = React.useState<boolean>(false);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = React.useState<boolean>(false);
  const [activeDateCalendar, setActiveDateCalendar] = React.useState<string>('2026-05-25');

  // New Patient Form fields with premium clinical expansions
  const [newPatName, setNewPatName] = React.useState<string>('');
  const [newPatGender, setNewPatGender] = React.useState<'Feminino' | 'Masculino' | 'Outro'>('Feminino');
  const [newPatBirthDate, setNewPatBirthDate] = React.useState<string>('2014-01-01');
  const [newPatEmail, setNewPatEmail] = React.useState<string>('');
  const [newPatPhone, setNewPatPhone] = React.useState<string>('');
  const [newPatWhatsapp, setNewPatWhatsapp] = React.useState<string>('');
  const [newPatAddress, setNewPatAddress] = React.useState<string>('');
  const [newPatNif, setNewPatNif] = React.useState<string>('');
  const [newPatEmergency, setNewPatEmergency] = React.useState<string>('');
  const [newPatAllergies, setNewPatAllergies] = React.useState<string>('');
  const [newPatMeds, setNewPatMeds] = React.useState<string>('');
  const [newPatSpecialty, setNewPatSpecialty] = React.useState<'Terapia da Fala' | 'Terapia Ocupacional' | 'Nutrição'>('Terapia da Fala');
  const [newPatDoctor, setNewPatDoctor] = React.useState<string>('Dr. Carlos Neto');
  const [newPatStatus, setNewPatStatus] = React.useState<'Ativo' | 'Em Alta' | 'Triagem' | 'Inadimplente'>('Ativo');
  const [newPatTags, setNewPatTags] = React.useState<string>('Pediatria');
  const [newPatLeadOrigin, setNewPatLeadOrigin] = React.useState<string>('Instagram');
  const [newPatAvatar, setNewPatAvatar] = React.useState<string>('https://api.dicebear.com/7.x/adventurer/svg?seed=Aura');
  const [newPatNotes, setNewPatNotes] = React.useState<string>('');

  // Form Validation and Mask states
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});
  const [isSavingVisualFeedback, setIsSavingVisualFeedback] = React.useState<boolean>(false);

  // New Appointment Form fields
  const [newAppPatientId, setNewAppPatientId] = React.useState<string>('pat-1');
  const [newAppDate, setNewAppDate] = React.useState<string>('2026-05-25');
  const [newAppTime, setNewAppTime] = React.useState<string>('10:00');
  const [newAppSpecialty, setNewAppSpecialty] = React.useState<'Terapia da Fala' | 'Terapia Ocupacional' | 'Nutrição'>('Terapia da Fala');
  const [newAppDoctor, setNewAppDoctor] = React.useState<string>('Dr. Carlos Neto');

  // Chart interactivity states
  const [highlightedSpecialty, setHighlightedSpecialty] = React.useState<string | null>(null);

  // Mobile Simulator state variables
  const [mobileFabOpen, setMobileFabOpen] = React.useState<boolean>(false);
  const [mobileSheetType, setMobileSheetType] = React.useState<'patient' | 'appointment' | null>(null);

  // Computed Values
  const totalPatientsCount = patients.length;
  const activePatientsCount = patients.filter(p => p.status === 'Ativo').length;
  const onTriagemCount = patients.filter(p => p.status === 'Triagem').length;
  const totalAppointmentsCount = appointments.length;
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pendente').length;
  const confirmedAppointmentsCount = appointments.filter(a => a.status === 'Confirmado').length;

  const todayDateStr = '2026-05-25';
  const todayAppointments = appointments.filter(a => a.date === todayDateStr);

  // Derived financial metrics
  const getAppointmentPrice = (specialty: string) => {
    if (specialty === 'Terapia da Fala') return 40;
    if (specialty === 'Terapia Ocupacional') return 50;
    if (specialty === 'Nutrição') return 60;
    return 45;
  };

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
  };

  const appointmentsRevenue = appointments
    .filter(a => a.status === 'Confirmado')
    .reduce((sum, a) => sum + getAppointmentPrice(a.specialty), 0);

  const manualRevenues = transactions
    .filter(t => t.type === 'Receita' && t.status === 'Pago')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRevenue = appointmentsRevenue + manualRevenues;

  const totalPaidExpenses = transactions
    .filter(t => t.type === 'Despesa' && t.status === 'Pago')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalPaidExpenses;
  const marginRatio = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  // Helper action: Add custom log
  const pushNotification = (msg: string) => {
    const nextList = [msg, ...notifications.slice(0, 5)];
    saveNotifications(nextList);
  };

  // Create Patient Handler with Validation, Automatic Age Calculation, and Masks
  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // 1. Validation Logic
    if (!newPatName.trim() || newPatName.trim().length < 3) {
      errors.name = 'O nome completo deve conter pelo menos 3 caracteres.';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newPatEmail && !emailRegex.test(newPatEmail)) {
      errors.email = 'Insira um endereço de email válido (ex: nome@dominio.com).';
    }

    if (newPatNif && (!/^\d{9}$/.test(newPatNif))) {
      errors.nif = 'O NIF/CPF português deve conter exatamente 9 dígitos numéricos.';
    }

    if (!newPatPhone.trim()) {
      errors.phone = 'Telemóvel de contacto é obrigatório para comunicações e alertas.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      pushNotification('Falha no registo de utente devido a erros de validação.');
      return;
    }

    // Clear errors if any
    setValidationErrors({});

    // 2. Automate Age Calculation
    const bYear = new Date(newPatBirthDate).getFullYear();
    const currentYear = 2026;
    const computedAge = Math.max(0, currentYear - bYear);

    // 3. Construct Complete Clinical Record
    const newPatId = 'pat-' + Date.now();
    const tagsArray = newPatTags.split(',').map(t => t.trim()).filter(Boolean);
    if (tagsArray.length === 0) tagsArray.push(newPatSpecialty);

    const addedPatient: Patient = {
      id: newPatId,
      name: newPatName,
      gender: newPatGender,
      age: computedAge,
      birthDate: newPatBirthDate,
      email: newPatEmail || `${newPatName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone: newPatPhone,
      whatsapp: newPatWhatsapp || newPatPhone,
      address: newPatAddress || 'Não especificado',
      nif: newPatNif || '999999999',
      emergencyContact: newPatEmergency || 'Não especificado',
      allergies: newPatAllergies || 'Nenhuma alergia relatada.',
      meds: newPatMeds || 'Sem medicação reportada.',
      notes: newPatNotes || 'Ficha clínica inicial em progresso.',
      specialty: newPatSpecialty,
      doctor: newPatDoctor || (newPatSpecialty === 'Nutrição' ? 'Dra. Mariana Soares' : newPatSpecialty === 'Terapia Ocupacional' ? 'Dra. Sofia Rocha' : 'Dr. Carlos Neto'),
      status: newPatStatus,
      tags: tagsArray,
      leadOrigin: newPatLeadOrigin,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newPatName.replace(/\s+/g, '')}`,
      lastConsultation: 'Sem consultas anteriores',
      evolutions: [
        {
          id: 'evo-' + Date.now(),
          date: '2026-05-25',
          note: `Ficha clínica criada no Hub. Triagem inicial enquadrada em ${newPatSpecialty}. Aguarda agendamento primário.`,
          doctor: newPatDoctor
        }
      ],
      payments: [],
      documents: []
    };

    // 4. Save and give visual autosave feedback
    setIsSavingVisualFeedback(true);
    setTimeout(() => {
      const nextList = [addedPatient, ...patients];
      savePatients(nextList);
      pushNotification(`Admissão de ${newPatName} concluída com sucesso.`);
      
      // Clear fields
      setNewPatName('');
      setNewPatEmail('');
      setNewPatPhone('');
      setNewPatWhatsapp('');
      setNewPatAddress('');
      setNewPatNif('');
      setNewPatEmergency('');
      setNewPatAllergies('');
      setNewPatMeds('');
      setNewPatNotes('');
      setNewPatTags('Pediatria');
      
      setIsSavingVisualFeedback(false);
      setIsNewPatientModalOpen(false);
    }, 600);
  };

  // Create Appointment Handler
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // Resolve patient ID safely to prevent out-of-sync or missing default patient ID bugs
    const targetPatId = patients.some(p => p.id === newAppPatientId)
      ? newAppPatientId
      : (patients.length > 0 ? patients[0].id : '');
    const matchedPat = patients.find(p => p.id === targetPatId);
    if (!matchedPat) return;

    const addedApp: Appointment = {
      id: 'app-' + Date.now(),
      patientId: matchedPat.id,
      patientName: matchedPat.name,
      date: newAppDate,
      time: newAppTime,
      specialty: newAppSpecialty,
      status: 'Confirmado',
      doctor: newAppDoctor
    };

    const nextApps = [...appointments, addedApp].sort((a, b) => 
      (a.date + a.time).localeCompare(b.date + b.time)
    );
    saveAppointments(nextApps);

    pushNotification(`Consulta de ${matchedPat.name} marcada para ${newAppDate} às ${newAppTime}.`);
    
    // Refresh patient list last-consultation date
    const updatedPatients = patients.map(p => {
      if (p.id === matchedPat.id) {
        return { ...p, lastConsultation: newAppDate };
      }
      return p;
    });
    savePatients(updatedPatients);

    setIsNewAppointmentModalOpen(false);
    setMobileSheetType(null);
    setMobileFabOpen(false);
  };

  // Quick Action Toggles
  const toggleAppointmentStatus = (id: string) => {
    const updated = appointments.map(a => {
      if (a.id === id) {
        const nextStatus: 'Confirmado' | 'Pendente' | 'Cancelado' = 
          a.status === 'Pendente' ? 'Confirmado' : a.status === 'Confirmado' ? 'Cancelado' : 'Pendente';
        pushNotification(`Consulta de ${a.patientName} alterada para estado: ${nextStatus}.`);
        return { ...a, status: nextStatus };
      }
      return a;
    });
    saveAppointments(updated);
  };

  const deleteAppointment = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const app = appointments.find(a => a.id === id);
    if (app) {
      const updated = appointments.filter(a => a.id !== id);
      saveAppointments(updated);
      pushNotification(`Consulta de ${app.patientName} foi removida da agenda.`);
    }
  };

  // Service Actions
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) return;

    if (editingServiceId) {
      const updated = services.map(s => {
        if (s.id === editingServiceId) {
          return {
            ...s,
            name: serviceName,
            specialty: serviceSpecialty,
            price: Number(servicePrice),
            duration: Number(serviceDuration),
            description: serviceDescription
          };
        }
        return s;
      });
      saveServices(updated);
      pushNotification(`Serviço "${serviceName}" atualizado com sucesso.`);
    } else {
      const newService: ClinicService = {
        id: `srv-${Date.now()}`,
        name: serviceName,
        specialty: serviceSpecialty,
        price: Number(servicePrice),
        duration: Number(serviceDuration),
        description: serviceDescription
      };
      saveServices([...services, newService]);
      pushNotification(`Novo serviço "${serviceName}" criado com sucesso.`);
    }

    setServiceName('');
    setServiceSpecialty('Terapia da Fala');
    setServicePrice(50);
    setServiceDuration(45);
    setServiceDescription('');
    setEditingServiceId(null);
    setIsNewServiceModalOpen(false);
  };

  const [newSpecialtyName, setNewSpecialtyName] = React.useState('');
  const [serviceToDelete, setServiceToDelete] = React.useState<string | null>(null);
  const [specialtyToDelete, setSpecialtyToDelete] = React.useState<string | null>(null);
  const [transactionToDelete, setTransactionToDelete] = React.useState<string | null>(null);

  const handleAddSpecialty = () => {
    if (!newSpecialtyName.trim()) return;
    if (specialties.includes(newSpecialtyName.trim())) {
      pushNotification('Esta especialidade já existe.');
      return;
    }
    const updated = [...specialties, newSpecialtyName.trim()];
    saveSpecialties(updated);
    setNewSpecialtyName('');
    pushNotification(`Especialidade "${newSpecialtyName.trim()}" adicionada.`);
  };

  const handleConfirmDeleteSpecialty = (spec: string) => {
    const updated = specialties.filter(s => s !== spec);
    saveSpecialties(updated);
    setSpecialtyToDelete(null);
    pushNotification(`Especialidade "${spec}" removida.`);
  };

  const handleEditService = (srv: ClinicService) => {
    setEditingServiceId(srv.id);
    setServiceName(srv.name);
    setServiceSpecialty(srv.specialty);
    setServicePrice(srv.price);
    setServiceDuration(srv.duration);
    setServiceDescription(srv.description);
    setIsNewServiceModalOpen(true);
  };

  const handleDeleteService = (id: string) => {
    const srv = services.find(s => s.id === id);
    if (srv) {
      const updated = services.filter(s => s.id !== id);
      saveServices(updated);
      setServiceToDelete(null);
      pushNotification(`Serviço "${srv.name}" foi removido do catálogo.`);
    }
  };

  // Financial Transaction Actions
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDescription.trim()) return;

    if (editingTxId) {
      const updated = transactions.map(t => {
        if (t.id === editingTxId) {
          return {
            ...t,
            type: txType,
            category: txCategory,
            amount: Number(txAmount),
            date: txDate,
            description: txDescription,
            status: txStatus
          };
        }
        return t;
      });
      saveTransactions(updated);
      pushNotification(`Lançamento "${txDescription}" atualizado.`);
    } else {
      const newTx: FinancialTransaction = {
        id: `tx-${Date.now()}`,
        type: txType,
        category: txCategory,
        amount: Number(txAmount),
        date: txDate,
        description: txDescription,
        status: txStatus
      };
      saveTransactions([...transactions, newTx]);
      pushNotification(`Lançamento financeiro "${txDescription}" registado.`);
    }

    setTxType('Receita');
    setTxCategory('Consulta');
    setTxAmount(45);
    setTxDate('2026-05-25');
    setTxDescription('');
    setTxStatus('Pago');
    setEditingTxId(null);
    setIsNewTxModalOpen(false);
  };

  const handleEditTransaction = (tx: FinancialTransaction) => {
    setEditingTxId(tx.id);
    setTxType(tx.type);
    setTxCategory(tx.category);
    setTxAmount(tx.amount);
    setTxDate(tx.date);
    setTxDescription(tx.description);
    setTxStatus(tx.status);
    setIsNewTxModalOpen(true);
  };

  const handleConfirmDeleteTransaction = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (tx) {
      const updated = transactions.filter(t => t.id !== id);
      saveTransactions(updated);
      setTransactionToDelete(null);
      pushNotification(`Lançamento "${tx.description}" removido com sucesso.`);
    }
  };

  const toggleTransactionStatus = (id: string) => {
    const updated = transactions.map(t => {
      if (t.id === id) {
        const nextStatus: 'Pago' | 'Pendente' = t.status === 'Pago' ? 'Pendente' : 'Pago';
        pushNotification(`Transação "${t.description}" alterada para: ${nextStatus === 'Pago' ? 'Paga' : 'Pendente'}.`);
        return { ...t, status: nextStatus };
      }
      return t;
    });
    saveTransactions(updated);
  };

  // Search filter applied logic
  const filteredPatientsList = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.phone || '').includes(searchQuery) ||
                          (p.whatsapp || '').includes(searchQuery);
    const matchesSpecialty = specialtyFilter === 'Todos' || p.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  // Demographics calculation for charts
  const specialtyCounts = {
    'Terapia da Fala': patients.filter(p => p.specialty === 'Terapia da Fala').length,
    'Terapia Ocupacional': patients.filter(p => p.specialty === 'Terapia Ocupacional').length,
    'Nutrição': patients.filter(p => p.specialty === 'Nutrição').length,
  };
  const totalPatients = patients.length || 1;

  const pctFala = Math.round((specialtyCounts['Terapia da Fala'] / totalPatients) * 100);
  const pctOcup = Math.round((specialtyCounts['Terapia Ocupacional'] / totalPatients) * 100);
  const pctNutri = Math.round((specialtyCounts['Nutrição'] / totalPatients) * 100);

  // Calendar render variables
  const calendarDaysArray = Array.from({ length: 31 }, (_, i) => i + 1);
  const initialOffsetDays = Array.from({ length: 4 }, (_, i) => i); // Offset for Friday start in May 2026

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center font-sans">
        <HeartPulse className="w-12 h-12 text-[#00acc1] animate-pulse mb-3" />
        <p className="text-sm font-semibold text-slate-705">A carregar registos clínicos do Nexus Care...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between ${appTheme === 'dark' ? 'app-dark-mode' : 'bg-slate-50 text-slate-800'}`} id="nexuscare-admin-root">
      <style>{`
        .app-dark-mode, .app-dark-mode .bg-slate-50, .app-dark-mode .bg-white {
          background-color: #0f172a !important;
          color: #f1f5f9 !important;
          border-color: #1e293b !important;
        }
        .app-dark-mode .text-slate-900, .app-dark-mode .text-slate-800, .app-dark-mode .text-slate-700, .app-dark-mode .text-slate-600 {
          color: #f8fafc !important;
        }
        .app-dark-mode .text-slate-500, .app-dark-mode .text-slate-400 {
          color: #94a3b8 !important;
        }
        .app-dark-mode .border-slate-150, .app-dark-mode .border-slate-200, .app-dark-mode .border-slate-100 {
          border-color: #1e293b !important;
        }
        .app-dark-mode input, .app-dark-mode select, .app-dark-mode textarea {
          background-color: #1e293b !important;
          color: #f8fafc !important;
          border-color: #334155 !important;
        }
        .app-dark-mode .bg-slate-100, .app-dark-mode .bg-slate-200 {
          background-color: #1e293b !important;
        }
      `}</style>
      {/* GLOBAL TELEMETRY BAR & NAVIGATION */}
      <section className="bg-slate-900 text-slate-200 py-3.5 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between border-b border-cyan-950 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/" id="btn-back-home" className="p-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-[#00acc1]/10 transition-all flex items-center gap-1.5 text-xs font-bold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ver Website Clínico</span>
          </Link>
          <div className="hidden sm:inline bg-slate-800 h-6 w-px"></div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#00acc1] flex items-center justify-center text-white font-bold text-xs shadow-inner shadow-cyan-300">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <h1 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                Portal Clínico Privado <span className="text-[9px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-900/60 uppercase font-black tracking-widest animate-pulse">ADMIN</span>
              </h1>
              <p className="text-[10px] text-slate-400">Administração de Utentes e Consultas</p>
            </div>
          </div>
        </div>

        {/* DEVICE MODE TOGGLER */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 mt-3.5 sm:mt-0 shadow-inner">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#00acc1] text-white shadow-sm'
                : 'text-slate-450 hover:text-white'
            }`}
            id="toggle-desktop-view"
          >
            <Laptop className="w-3 h-3" />
            <span>💻 Painel Administrador</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              deviceMode === 'mobile'
                ? 'bg-[#00acc1] text-white shadow-sm'
                : 'text-slate-450 hover:text-white'
            }`}
            id="toggle-mobile-view"
          >
            <Smartphone className="w-3 h-3" />
            <span>📱 Telemóvel do Médico</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3.5 text-xs">
          <span className="flex items-center gap-1 text-cyan-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            Ecosistema Sincronizado
          </span>
          <p className="text-slate-400 font-mono text-[10px] bg-slate-950 px-2 py-1 rounded border border-slate-850">
            25 Mai 2026 Admin Panel
          </p>
        </div>
      </section>

      {/* RENDER CONTENT AREA */}
      <main className="flex-1 w-full px-4 md:px-8 py-6" id="admin-main-stage">
        <AnimatePresence mode="wait">
          
          {/* ==================== DISPLAY MODE A: DESKTOP ADMIN HUB ==================== */}
          {deviceMode === 'desktop' && (
            <motion.div
              key="desktop-hub"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[720px] flex flex-col md:flex-row"
            >
              
              {/* SIDEBAR NAVIGATION */}
              <aside className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
                <div className="space-y-6">
                  
                  {/* Branding */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-white font-extrabold text-lg">
                      N
                    </div>
                    <div>
                      <h2 className="font-extrabold text-slate-900 tracking-tight text-sm uppercase">Nexus Hub</h2>
                      <span className="text-[10px] font-bold text-[#00acc1] flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00acc1]"></span>
                        Atendimento Sincronizado
                      </span>
                    </div>
                  </div>

                  {/* Doctor Profile Card */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#00acc1] font-bold text-xs uppercase">
                      AM
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{doctorName}</p>
                      <p className="text-[9px] text-slate-550 font-medium">Coordenadora Clínica</p>
                    </div>
                  </div>

                  {/* Navigation Tabs Links */}
                  <nav className="space-y-6">
                    {/* VISÃO GERAL */}
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-2">Visão Geral</p>
                      
                      <button
                        onClick={() => setDesktopTab('dashboard')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'dashboard'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-dashboard"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Painel de Operações</span>
                      </button>
                    </div>

                    {/* OPERAÇÃO CLÍNICA */}
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-2">Operação Clínica</p>
                      <button
                        onClick={() => setDesktopTab('calendar')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'calendar'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-calendar"
                      >
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Agenda Interactiva</span>
                        </div>
                        {pendingAppointmentsCount > 0 && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block"></span>
                        )}
                      </button>
                      <button
                        onClick={() => setDesktopTab('patients')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'patients'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-patients"
                      >
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4" />
                          <span>Fichas de Utente</span>
                        </div>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                          {patients.length}
                        </span>
                      </button>
                    </div>

                    {/* RECURSOS */}
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-2">Recursos</p>
                      <button
                        onClick={() => setDesktopTab('staff')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'staff'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-staff"
                      >
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4" />
                          <span>Especialistas</span>
                        </div>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                          {specialists.length}
                        </span>
                      </button>
                      <button
                        onClick={() => setDesktopTab('services')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'services'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-services"
                      >
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-4 h-4" />
                          <span>Gestão de Serviços</span>
                        </div>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                          {services.length}
                        </span>
                      </button>
                    </div>

                    {/* MONITORIZAÇÃO */}
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider px-3 mb-2">Monitorização</p>
                      <button
                        onClick={() => setDesktopTab('financial')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'financial'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-financial"
                      >
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-4 h-4" />
                          <span>Gestão Financeira</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setDesktopTab('analytics')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'analytics'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-analytics"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Análise Demográfica</span>
                      </button>
                    </div>

                    {/* CONFIGURAÇÕES */}
                    <div className="space-y-1">
                      <button
                        onClick={() => setDesktopTab('settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          desktopTab === 'settings'
                            ? 'bg-cyan-50 text-[#00acc1]'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        id="tab-settings"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </button>
                    </div>
                  </nav>
                </div>

                {/* Operations log */}
                <div className="space-y-3.5 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Actividade Recente</span>
                    <Activity className="w-3.5 h-3.5 text-[#00acc1]" />
                  </div>
                  <div className="space-y-1.5">
                    {notifications.slice(0, 3).map((note, index) => (
                      <p key={index} className="text-[9px] text-slate-550 leading-normal bg-white p-2 rounded-lg border border-slate-150">
                        • {note}
                      </p>
                    ))}
                    {notifications.length === 0 && (
                      <p className="text-[9px] text-slate-400 italic">Sem acções registadas hoje.</p>
                    )}
                  </div>
                </div>
              </aside>

              {/* DESKTOP WORKSPACE */}
              <div className="flex-1 bg-white flex flex-col overflow-y-auto">
                <div className="p-6 md:p-8 flex-1">
                  <AnimatePresence mode="wait">
                    {/* TAB 1: CONSOLE DASHBOARD */}
                    {desktopTab === 'dashboard' && (
                      <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                      
                      {/* Header Title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <h2 className="text-xl font-extrabold text-slate-900">Consola Central de Operações</h2>
                          <p className="text-slate-500 text-xs mt-0.5">Visão global e estado de triagens para as consultas de Terapia e Nutrição.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsNewPatientModalOpen(true)}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                            id="btn-quick-new-patient"
                          >
                            <User className="w-3.5 h-3.5" />
                            <span>Admitir Utente</span>
                          </button>
                          <button
                            onClick={() => {
                              setNewAppDate(activeDateCalendar);
                              setIsNewAppointmentModalOpen(true);
                            }}
                            className="bg-[#00acc1] text-white hover:bg-[#0097a7] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-100"
                            id="btn-quick-new-appointment"
                          >
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>Agendar Sessão</span>
                          </button>
                        </div>
                      </div>

                      {/* Summary Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-sans text-left">
                        {/* 1. Total Utentes */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between min-h-[100px]">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tight">Total Geral Utentes</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-2xl font-extrabold text-slate-900 font-mono">{patients.length}</span>
                            <div className="w-8 h-8 rounded-lg bg-slate-200/50 flex items-center justify-center text-slate-600">
                              <Users className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* 2. Utentes Ativos */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between min-h-[100px]">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tight">Utentes Ativos</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-2xl font-extrabold text-emerald-600 font-mono">
                              {patients.filter(p => p.status === 'Ativo').length}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                              <Check className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* 3. Novos Utentes (Triagem) */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between min-h-[100px]">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tight">Novas Triagens</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-2xl font-extrabold text-amber-600 font-mono">
                              {patients.filter(p => p.status === 'Triagem').length}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 animate-pulse">
                              <PlusCircle className="w-4 h-4 text-amber-500" />
                            </div>
                          </div>
                        </div>

                        {/* 4. Consultas Agendadas */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between min-h-[100px]">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tight">Consultas Ativas</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-2xl font-extrabold text-[#00acc1] font-mono">
                              {appointments.filter(a => a.status === 'Confirmado' || a.status === 'Pendente').length}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-[#00acc1]">
                              <CalendarIcon className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* 5. Consultas Canceladas */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between min-h-[100px]">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tight">Sessões Canceladas</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-2xl font-extrabold text-slate-400 font-mono">
                              {appointments.filter(a => a.status === 'Cancelado').length}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-slate-200/50 flex items-center justify-center text-slate-400">
                              <X className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        </div>

                        {/* 6. Utentes Inadimplentes */}
                        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-150 flex flex-col justify-between min-h-[100px]">
                          <p className="text-[10px] font-extrabold text-rose-800 uppercase tracking-tight">Inadimplentes</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-2xl font-extrabold text-rose-700 font-mono">
                              {patients.filter(p => p.status === 'Inadimplente').length}
                            </span>
                            <span className="text-[9px] bg-rose-100 text-rose-850 px-1 rounded-sm font-bold border border-rose-200">
                              Aviso
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Daily appointments grid and triage view */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Daily Consultations Column */}
                        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                          <div className="p-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/50">
                            <div>
                              <h3 className="font-extrabold text-xs text-slate-900 uppercase">Sessões Clínicas Planeadas Para Hoje</h3>
                              <p className="text-[11px] text-slate-400 mt-0.5">Alternativa de estado interactivo rápido.</p>
                            </div>
                            <span className="text-[10px] bg-cyan-100/50 text-[#00acc1] px-2.5 py-0.5 rounded-lg border border-cyan-100 font-bold uppercase">
                              {todayAppointments.length} Sessões
                            </span>
                          </div>

                          <div className="divide-y divide-slate-100">
                            {todayAppointments.length === 0 ? (
                              <div className="p-8 text-center text-slate-400 text-xs">
                                Nenhuma consulta agendada para o dia corrente.
                              </div>
                            ) : (
                              todayAppointments.map((app) => (
                                <div key={app.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/30 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-150 flex flex-col items-center justify-center">
                                      <Clock className="w-3 h-3 text-[#00acc1]" />
                                      <span className="text-[10px] font-mono font-bold text-slate-700 leading-none mt-1">{app.time}</span>
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-bold text-slate-900 hover:underline cursor-pointer" onClick={() => {
                                        setSelectedPatientId(app.patientId);
                                        setDesktopTab('patients');
                                      }}>
                                        {app.patientName}
                                      </h4>
                                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                                        Especialidade: <span className="font-bold text-slate-650">{app.specialty}</span>
                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                        Médico: <span className="font-medium text-slate-600">{app.doctor}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 self-end sm:self-center">
                                    <button
                                      onClick={() => toggleAppointmentStatus(app.id)}
                                      className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all border ${
                                        app.status === 'Confirmado'
                                          ? 'bg-emerald-50 text-emerald-700 border-emerald-250'
                                          : app.status === 'Pendente'
                                            ? 'bg-amber-50 text-amber-700 border-amber-250'
                                            : 'bg-rose-50 text-rose-700 border-rose-250'
                                      }`}
                                      id={`btn-status-${app.id}`}
                                    >
                                      {app.status}
                                    </button>
                                    <button
                                      onClick={() => deleteAppointment(app.id)}
                                      className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-50 transition-colors"
                                      id={`btn-del-app-${app.id}`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Triage & System Info Column */}
                        <div className="lg:col-span-4 space-y-4">
                          <div className="p-5 bg-slate-900 text-white rounded-2xl relative overflow-hidden">
                            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Estado das Triagens
                            </h4>
                            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                              Tem atualmente <strong className="text-white font-bold">{onTriagemCount} utente(s) em processo de triagem inicial</strong>. Estes utentes foram criados através do Website Público ou por re-avaliação clínica.
                            </p>
                            <button
                              onClick={() => {
                                setDesktopTab('patients');
                                setSpecialtyFilter('Todos');
                              }}
                              className="text-[10px] font-bold text-cyan-400 mt-3 flex items-center gap-1 hover:underline"
                              id="btn-go-to-triage"
                            >
                              <span>Analisar na base de utentes</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="bg-white p-4 border border-slate-200 rounded-2xl space-y-3">
                            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Médica de Turno Coordenadora</h4>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-cyan-100/50 text-[#00acc1] flex items-center justify-center font-bold text-xs uppercase border border-cyan-150">
                                AM
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800">{doctorName}</p>
                                <p className="text-[10px] text-slate-400 font-medium">Médica Especialista Directora</p>
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-xl leading-normal border border-slate-100">
                              Responsável pelo acompanhamento geral das sessões do dia 25 de Maio.
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* CLINICAL ANALYTICS CHARTS GRID */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left font-sans mt-6">
                        
                        {/* Chart 1: Growth of Patients */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3">
                          <div>
                            <span className="text-[10px] uppercase font-extrabold text-slate-400">Evolução Mensal</span>
                            <h4 className="text-xs font-extrabold text-slate-800">Crescimento de Utentes</h4>
                          </div>
                          
                          <div className="h-28 w-full flex items-end">
                            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                              <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" />
                              <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                              <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" />
                              
                              <path 
                                d="M 0 35 L 20 28 L 40 22 L 60 15 L 80 10 L 100 5 L 100 40 L 0 40 Z" 
                                fill="rgba(6, 182, 212, 0.08)"
                              />
                              <path 
                                d="M 0 35 L 20 28 L 40 22 L 60 15 L 80 10 L 100 5" 
                                fill="none" 
                                stroke="#00acc1" 
                                strokeWidth="1.5"
                                strokeLinecap="round" 
                              />
                              <circle cx="20" cy="28" r="1.5" fill="#00acc1" stroke="#fff" strokeWidth="0.5" />
                              <circle cx="40" cy="22" r="1.5" fill="#00acc1" stroke="#fff" strokeWidth="0.5" />
                              <circle cx="60" cy="15" r="1.5" fill="#00acc1" stroke="#fff" strokeWidth="0.5" />
                              <circle cx="80" cy="10" r="1.5" fill="#00acc1" stroke="#fff" strokeWidth="0.5" />
                              <circle cx="100" cy="5" r="1.5" fill="#00acc1" stroke="#fff" strokeWidth="0.5" />
                            </svg>
                          </div>
                          <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                            <span>Dez</span>
                            <span>Fev</span>
                            <span>Abr</span>
                            <span>Mai (Atual)</span>
                          </div>
                        </div>

                        {/* Chart 2: Consultations by Specialty */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3">
                          <div>
                            <span className="text-[10px] uppercase font-extrabold text-slate-400">Distribuição Especialidade</span>
                            <h4 className="text-xs font-extrabold text-slate-800">Consultas por Período</h4>
                          </div>

                          <div className="space-y-2 mt-2">
                            {[
                              { label: 'Terapia Fala', count: appointments.filter(a => a.specialty === 'Terapia da Fala').length, color: 'bg-indigo-500', pct: 'w-[75%]' },
                              { label: 'Terapia Ocup.', count: appointments.filter(a => a.specialty === 'Terapia Ocupacional').length, color: 'bg-amber-500', pct: 'w-[45%]' },
                              { label: 'Nutrição', count: appointments.filter(a => a.specialty === 'Nutrição').length, color: 'bg-emerald-500', pct: 'w-[30%]' }
                            ].map((spec, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex items-center justify-between text-[9px] font-bold text-slate-600">
                                  <span>{spec.label}</span>
                                  <span className="font-mono">{spec.count} sessões</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div className={`${spec.color} h-full ${spec.pct} rounded-full`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Chart 3: Gross Billing Income */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3">
                          <div>
                            <span className="text-[10px] uppercase font-extrabold text-slate-400">Fluxo Entrada</span>
                            <h4 className="text-xs font-extrabold text-slate-800">Faturamento Mensal</h4>
                          </div>
                          
                          <div className="h-28 w-full flex items-end justify-between gap-2 pt-2">
                            {[
                              { m: 'Mar', val: 'h-[40%]', color: 'bg-slate-300' },
                              { m: 'Abr', val: 'h-[65%]', color: 'bg-slate-300' },
                              { m: 'Mai', val: 'h-[95%]', color: 'bg-[#00acc1]' }
                            ].map((bar, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                                <div className={`w-full ${bar.val} ${bar.color} rounded-t-lg transition-all hover:opacity-80`} />
                                <span className="text-[9px] text-slate-400 font-bold">{bar.m}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Chart 4: Attendance Comparecimento Rate */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3">
                          <div>
                            <span className="text-[10px] uppercase font-extrabold text-slate-400">Assiduidade Geral</span>
                            <h4 className="text-xs font-extrabold text-slate-800">Comparecimento de Utentes</h4>
                          </div>

                          <div className="flex items-center gap-4 py-1">
                            <div className="relative w-16 h-16 shrink-0">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00acc1" strokeWidth="3.2" strokeDasharray="85 15" strokeDashoffset="0" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.2" strokeDasharray="10 90" strokeDashoffset="-85" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3.2" strokeDasharray="5 95" strokeDashoffset="-95" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-extrabold text-slate-800">85%</span>
                              </div>
                            </div>
                            
                            <div className="text-[9px] font-bold text-slate-550 space-y-1">
                              <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00acc1] inline-block" />
                                <span>Compareceu (85%)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                                <span>Desmarcou (10%)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                                <span>Faltou (5%)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </motion.div>
                  )}

                  {/* TAB 2: UTENTES BASE */}
                  {desktopTab === 'patients' && (
                    <motion.div
                      key="patients"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <h2 className="text-xl font-extrabold text-slate-900">Base Estruturada de Utentes</h2>
                          <p className="text-slate-500 text-xs mt-0.5">Gestão das fichas clínicas individuais, relatórios de evolução e triagem.</p>
                        </div>
                        <button
                          onClick={() => setIsNewPatientModalOpen(true)}
                          className="bg-[#00acc1] text-white hover:bg-[#0097a7] px-4 py-2 rounded-xl text-auto font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-100 text-xs self-start"
                          id="btn-add-patient-pats-tab"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Admitir Novo Utente</span>
                        </button>
                      </div>

                      {/* Filters */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-250">
                        <div className="relative w-full sm:w-64">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            placeholder="Procurar utentes ou notas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border border-slate-200 py-1.5 pl-8 pr-3 rounded-xl text-xs w-full outline-none focus:ring-1 focus:ring-[#00acc1] font-medium"
                          />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto self-end sm:self-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Área:</span>
                          {['Todos', ...specialties].map((spec) => (
                            <button
                              key={spec}
                              onClick={() => setSpecialtyFilter(spec)}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 border ${
                                specialtyFilter === spec
                                  ? 'bg-slate-900 text-white border-slate-950 shadow-xs'
                                  : 'bg-white text-slate-600 border-slate-205 hover:bg-slate-100'
                              }`}
                            >
                              {spec}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Patients List Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPatientsList.map((pat) => {
                          const hasSelected = selectedPatientId === pat.id && isCRMDrawerOpen;
                          
                          // Resolve next appointment dynamically
                          const patientApps = appointments
                            .filter(a => a.patientId === pat.id && a.status === 'Confirmado')
                            .sort((a, b) => a.date.localeCompare(b.date));
                          const nextAppt = patientApps.length > 0 
                            ? `${patientApps[0].date} às ${patientApps[0].time}` 
                            : 'Nenhum agendamento';

                          return (
                            <motion.div
                              whileHover={{ y: -2, scale: 1.01 }}
                              key={pat.id}
                              onClick={() => {
                                setSelectedPatientId(pat.id);
                                setActiveCRMTab('overview');
                                setIsCRMDrawerOpen(true);
                              }}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between h-52 relative overflow-hidden group hover:shadow-lg ${
                                hasSelected 
                                  ? 'border-[#00acc1] bg-cyan-50/10 ring-2 ring-cyan-100' 
                                  : 'border-slate-200 bg-white hover:border-[#00acc1]'
                              }`}
                            >
                              <div>
                                <div className="flex justify-between items-start gap-3">
                                  <div className="flex items-center gap-2.5">
                                    {pat.avatar ? (
                                      <img 
                                        src={pat.avatar} 
                                        alt={pat.name} 
                                        className="w-10 h-10 rounded-full bg-slate-100 border border-slate-150 shrink-0"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-150 flex items-center justify-center font-bold text-slate-700 uppercase shrink-0">
                                        {pat.name.slice(0, 2)}
                                      </div>
                                    )}
                                    <div className="min-w-0">
                                      <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#00acc1] transition-colors truncate">
                                        {pat.name}
                                      </h4>
                                      <p className="text-[10px] text-slate-400">
                                        NIF: <span className="font-mono">{pat.nif}</span> · {pat.age} anos
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase shrink-0 border ${
                                    pat.status === 'Ativo'
                                      ? 'bg-emerald-55 bg-emerald-50 text-emerald-700 border-emerald-150'
                                      : pat.status === 'Triagem'
                                        ? 'bg-amber-50 text-amber-900 border-amber-150'
                                        : pat.status === 'Inadimplente'
                                          ? 'bg-rose-50 text-rose-700 border-rose-150 animate-pulse'
                                          : 'bg-slate-100 text-slate-600 border-slate-205'
                                  }`}>
                                    {pat.status}
                                  </span>
                                </div>

                                {/* Custom tags list */}
                                <div className="flex flex-wrap gap-1 mt-3">
                                  <span className="text-[9px] bg-cyan-50 border border-cyan-100 px-1.5 py-0.5 rounded-md text-cyan-700 font-bold">
                                    {pat.specialty}
                                  </span>
                                  {pat.tags?.slice(0, 2).map((tag, idx) => (
                                    <span key={idx} className="text-[9px] bg-slate-50 border px-1.5 py-0.5 rounded-md text-slate-600 font-medium">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="border-t border-slate-100 pt-3 mt-3 text-[10px] space-y-1.5 font-medium text-slate-650">
                                <p className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-400">Próxima Consulta:</span>
                                  <span className="font-bold text-slate-800 text-right shrink-0">{nextAppt}</span>
                                </p>
                                <p className="flex justify-between items-center">
                                  <span className="text-slate-400">Profissional Resp:</span>
                                  <span className="font-bold text-slate-700">{pat.doctor}</span>
                                </p>
                              </div>

                              {/* Hover interaction visual indicator */}
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-50 text-[#00acc1] w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-cyan-100">
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </motion.div>
                          );
                        })}
                        {filteredPatientsList.length === 0 && (
                          <div className="col-span-full p-12 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            Nenhum registo de utente coincide com os filtros aplicados neste momento.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: AGENDA / CALENDAR */}
                  {desktopTab === 'calendar' && (
                    <motion.div
                      key="calendar"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-100 pb-4 text-left">
                        <div>
                          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-[#00acc1]" />
                            <span>Agenda e Sincronizador de Grelha</span>
                          </h2>
                          <p className="text-slate-500 text-xs mt-0.5">Gestão de horários mensais de terapeutas e agendamento rápido de pré-consultas clínicas.</p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Reseed action in case of empty states */}
                          <button
                            onClick={() => {
                              if (confirm('Tem a certeza de que deseja restaurar as 7 consultas de teste iniciais na agenda?')) {
                                localStorage.setItem('nexus_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
                                setAppointments(INITIAL_APPOINTMENTS);
                              }
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-auto font-bold flex items-center gap-1.5 transition-all text-xs"
                            title="Restaurar consultas apagadas"
                            id="btn-reseed-calendar"
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>Repor Agenda Padrão</span>
                          </button>

                          <button
                            onClick={() => {
                              setNewAppDate(activeDateCalendar);
                              setIsNewAppointmentModalOpen(true);
                            }}
                            className="bg-[#00acc1] text-white hover:bg-[#0097a7] px-4 py-2 rounded-xl text-auto font-bold flex items-center gap-1.5 transition-all shadow-md text-xs"
                            id="btn-add-app-calendar-tab"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Marcar Nova Consulta</span>
                          </button>
                        </div>
                      </div>

                      {/* Therapeutic specialty quick filters for Calendar view */}
                      <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-150 justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {['Todos', ...specialties].map((spec) => {
                            const count = spec === 'Todos' 
                              ? appointments.length 
                              : appointments.filter(a => a.specialty === spec).length;
                            return (
                              <button
                                key={`cal-filter-${spec}`}
                                onClick={() => setCalendarSpecialtyFilter(spec)}
                                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                                  calendarSpecialtyFilter === spec
                                    ? 'bg-[#00acc1] text-white shadow-sm'
                                    : 'bg-white hover:bg-slate-100/80 text-slate-600 border border-slate-200'
                                }`}
                              >
                                <span>{spec === 'Todos' ? 'Todas as Áreas' : spec}</span>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                                  calendarSpecialtyFilter === spec 
                                    ? 'bg-white/25 text-white' 
                                    : 'bg-slate-100 text-slate-500'
                                }`}>
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="text-[10px] text-slate-400 font-bold px-2 uppercase tracking-wide">
                          Maio 2026
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 text-left">
                        
                        {/* Interactive Scheduler Calendar Grid */}
                        <div className="lg:col-span-7 xl:col-span-8 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00acc1] animate-pulse"></span>
                              <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Grelha Mensal</h3>
                            </div>
                            <div className="text-[10px] font-bold text-[#00acc1] bg-cyan-50 px-2.5 py-0.5 rounded-lg border border-cyan-100">
                              31 Dias letivos · {appointments.filter(a => a.status === 'Confirmado').length} Confirmados
                            </div>
                          </div>

                          {/* Weekdays names - corrected typos to standard Portuguese */}
                          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100">
                            <span>Seg</span>
                            <span>Ter</span>
                            <span>Qua</span>
                            <span>Qui</span>
                            <span>Sex</span>
                            <span>Sáb</span>
                            <span>Dom</span>
                          </div>

                          <div className="grid grid-cols-7 gap-1.5 mt-2 font-mono">
                            {initialOffsetDays.map(o => (
                              <div key={`offset-${o}`} className="aspect-square bg-slate-50/50 border border-dashed border-slate-150 rounded-xl"></div>
                            ))}

                            {calendarDaysArray.map(dayStr => {
                              const paddedDay = dayStr < 10 ? `0${dayStr}` : `${dayStr}`;
                              const testDate = `2026-05-${paddedDay}`;
                              
                              // Filter by the selected specialty tab
                              const dayApps = appointments.filter(a => {
                                const matchesDate = a.date === testDate;
                                const matchesSpec = calendarSpecialtyFilter === 'Todos' || a.specialty === calendarSpecialtyFilter;
                                return matchesDate && matchesSpec;
                              });

                              const isToday = testDate === todayDateStr;
                              const isTargetDay = testDate === activeDateCalendar;

                              return (
                                <button
                                  key={`day-${dayStr}`}
                                  onClick={() => setActiveDateCalendar(testDate)}
                                  className={`min-h-[75px] sm:min-h-[85px] lg:min-h-[100px] xl:min-h-[105px] h-auto rounded-xl border flex flex-col justify-between p-1.5 transition-all relative text-left select-none ${
                                    isToday
                                      ? 'bg-slate-900 text-white border-slate-950 font-black scale-95 shadow-md z-10'
                                      : isTargetDay
                                        ? 'bg-cyan-50/70 border-[#00acc1] text-slate-950 font-extrabold border-2 shadow-inner-sm'
                                        : 'bg-white border-slate-200/60 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                                  }`}
                                >
                                  <div className="flex justify-between items-center w-full">
                                    <span className="text-[10px] sm:text-xs font-bold">{dayStr}</span>
                                    {isToday && (
                                      <span className="text-[7px] font-black uppercase tracking-wider bg-[#00acc1] text-white px-1 rounded-sm animate-pulse">Hoje</span>
                                    )}
                                  </div>
                                  
                                  {dayApps.length > 0 ? (
                                    <div className="flex flex-col gap-1 w-full mt-2">
                                      {dayApps.slice(0, 2).map(a => {
                                        const badgeColors = isToday 
                                          ? (a.specialty === 'Terapia da Fala'
                                              ? 'bg-cyan-400/20 text-cyan-205 border border-cyan-400/30'
                                              : a.specialty === 'Terapia Ocupacional'
                                                ? 'bg-amber-400/20 text-amber-205 border border-amber-400/30'
                                                : 'bg-violet-400/20 text-violet-205 border border-violet-400/30')
                                          : (a.specialty === 'Terapia da Fala'
                                              ? 'bg-cyan-50/80 text-[#00acc1] border border-cyan-100 hover:bg-cyan-100/30'
                                              : a.specialty === 'Terapia Ocupacional'
                                                ? 'bg-amber-50/80 text-amber-700 border border-amber-100 hover:bg-amber-100/30'
                                                : 'bg-violet-50/80 text-violet-700 border border-violet-100 hover:bg-violet-100/30');

                                        return (
                                          <div
                                            key={a.id}
                                            className={`text-[8.5px] lg:text-[9.5px] px-1 py-0.5 rounded-lg truncate flex items-center gap-1 font-semibold border ${badgeColors}`}
                                            title={`${a.patientName} às ${a.time} (${a.specialty})`}
                                          >
                                            <span className="font-bold font-mono opacity-90">{a.time}</span>
                                            <span className="truncate hidden sm:inline">{a.patientName.split(' ')[0]}</span>
                                            <span className="truncate inline sm:hidden">{a.patientName.slice(0, 2)}</span>
                                          </div>
                                        );
                                      })}
                                      {dayApps.length > 2 && (
                                        <div className={`text-[8.5px] font-bold text-right pr-0.5 ${isToday ? 'text-cyan-200' : 'text-slate-400'}`}>
                                          +{dayApps.length - 2} mais
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-[8px] text-slate-300/60 mt-auto text-right w-full font-light leading-none">Livre</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider justify-center sm:justify-start">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00acc1]"></span> Fala</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Ocupacional</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-400"></span> Nutrição</span>
                          </div>
                        </div>

                        {/* Schedule List & Timeline for the Active Day selected */}
                        <div className="lg:col-span-5 xl:col-span-4 bg-slate-50 p-5 rounded-3xl border border-slate-200 relative flex flex-col justify-between min-h-[440px]">
                          <div>
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                              <div>
                                <h4 className="text-[10.5px] font-black text-slate-800 uppercase tracking-widest">
                                  Diário Clínico
                                </h4>
                                <p className="text-[9px] text-[#00acc1] font-bold mt-0.5 leading-none">
                                  {activeDateCalendar.split('-').reverse().join('/')} (Maio 2026)
                                </p>
                              </div>
                              <span className="text-[9.5px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-600">
                                {appointments.filter(a => a.date === activeDateCalendar).length} Consultas
                              </span>
                            </div>

                            {/* Main Active Appointments matching filters */}
                            {(() => {
                              const dayAppsFiltered = appointments.filter(a => {
                                const matchesDate = a.date === activeDateCalendar;
                                const matchesSpec = calendarSpecialtyFilter === 'Todos' || a.specialty === calendarSpecialtyFilter;
                                return matchesDate && matchesSpec;
                              });

                              if (dayAppsFiltered.length === 0) {
                                return (
                                  <div className="p-5 text-center bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs italic space-y-3">
                                    <p>Nenhuma sessão agendada para este dia com base no filtro selecionado.</p>
                                    
                                    {appointments.length === 0 && (
                                      <button
                                        onClick={() => {
                                          localStorage.setItem('nexus_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
                                          setAppointments(INITIAL_APPOINTMENTS);
                                        }}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 text-white rounded-xl text-[10px] font-bold hover:bg-amber-600 transition-colors uppercase"
                                      >
                                        <Zap className="w-3 h-3" />
                                        <span>Restaurar Consultas Demo</span>
                                      </button>
                                    )}
                                  </div>
                                );
                              }

                              return (
                                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                                  {dayAppsFiltered.sort((a,b) => a.time.localeCompare(b.time)).map(a => {
                                    const themeColor = a.specialty === 'Terapia da Fala' 
                                      ? 'border-[#00acc1] bg-cyan-50/20' 
                                      : a.specialty === 'Terapia Ocupacional' 
                                        ? 'border-amber-400 bg-amber-50/20' 
                                        : 'border-violet-400 bg-violet-50/20';
                                    
                                    return (
                                      <div 
                                        key={a.id} 
                                        className={`p-3 bg-white border-l-[3.5px] rounded-2xl text-left space-y-2 relative group transition-all shadow-xs hover:shadow-xs border-y border-r border-slate-200 ${themeColor}`}
                                      >
                                        <div className="flex justify-between items-center">
                                          <span className="text-[10px] font-mono font-extrabold text-slate-700 bg-slate-100/80 border border-slate-200/50 px-2 py-0.5 rounded-lg flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-slate-400" />
                                            {a.time}
                                          </span>
                                          <div className="flex items-center gap-1.5">
                                            <button
                                              onClick={() => toggleAppointmentStatus(a.id)}
                                              className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border transition-all ${
                                                a.status === 'Confirmado'
                                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                                  : a.status === 'Pendente'
                                                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                                                    : 'bg-rose-50 border-rose-200 text-rose-800'
                                              }`}
                                              title="Clique para alternar estado"
                                            >
                                              {a.status}
                                            </button>
                                          </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-start gap-1">
                                          <div>
                                            <h5 className="text-[12px] font-black text-slate-900 leading-tight">{a.patientName}</h5>
                                            <p className="text-[9.5px] text-slate-450 mt-0.5 flex items-center gap-1 font-semibold">
                                              <span>{a.specialty}</span>
                                              <span className="text-slate-300">·</span>
                                              <span className="text-slate-500">Dr. {a.doctor.replace('Dr. ', '').replace('Dra. ', '')}</span>
                                            </p>
                                          </div>
                                          <button
                                            onClick={(e) => deleteAppointment(a.id, e)}
                                            className="text-slate-300 hover:text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-slate-100"
                                            title="Desmarcar consulta"
                                          >
                                            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })()}
                          </div>

                          {/* Suggested Empty Time slots for quicker bookings */}
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block text-left mb-2">
                              Horários Sugeridos Livres
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {['09:00', '11:00', '14:30', '16:00', '17:30'].map((timeSlot) => {
                                const isFilled = appointments.some(a => a.date === activeDateCalendar && a.time === timeSlot);
                                return (
                                  <button
                                    key={`slot-${timeSlot}`}
                                    disabled={isFilled}
                                    onClick={() => {
                                      setNewAppDate(activeDateCalendar);
                                      setNewAppTime(timeSlot);
                                      setIsNewAppointmentModalOpen(true);
                                    }}
                                    className={`p-1.5 rounded-xl text-center transition-all flex flex-col items-center justify-center font-mono border ${
                                      isFilled
                                        ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed text-[10px]'
                                        : 'bg-white hover:bg-[#00acc1]/5 hover:border-[#00acc1] border-slate-200 text-slate-700 hover:text-[#00acc1] text-[10px] cursor-pointer'
                                    }`}
                                  >
                                    <span className="font-extrabold">{timeSlot}</span>
                                    <span className="text-[7px] uppercase font-sans font-bold leading-none tracking-wider mt-0.5">
                                      {isFilled ? 'Ocupado' : '+ Livre'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                      </div>

                    </motion.div>
                  )}

                  {/* TAB 4: DEMOGRAPHIC ANALYTICS */}
                  {desktopTab === 'analytics' && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h2 className="text-xl font-extrabold text-slate-900">Análise e Indicadores Clínicos</h2>
                        <p className="text-slate-500 text-xs mt-0.5">Visualização interactiva das percentagens de ocupação clínica e metas terapêuticas.</p>
                      </div>

                      {/* Interactive visualizer using charts instructions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Demographic visual charts */}
                        <div className="bg-white p-5 border border-slate-200 rounded-2xl relative">
                          <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-4 text-left">Distribuição Clientes por Área</h4>
                          
                          <div className="flex justify-center items-center h-48 relative">
                            {/* Visual wheel representing doughnut chart */}
                            <div className="w-36 h-36 rounded-full border-8 border-slate-100 relative flex items-center justify-center">
                              {/* Subdivisions indicators highlights */}
                              <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase">Total</span>
                                <span className="text-xl font-black text-slate-900">{patients.length}</span>
                                <span className="text-[8px] text-slate-400">Utentes</span>
                              </div>
                            </div>
                          </div>

                          {/* Legend clickable interactivity for Highlight status */}
                          <div className="grid grid-cols-3 gap-2 pt-3 text-center border-t border-slate-100">
                            <button
                              onClick={() => setHighlightedSpecialty(highlightedSpecialty === 'Terapia da Fala' ? null : 'Terapia da Fala')}
                              className={`p-2 rounded-xl border transition-all ${
                                highlightedSpecialty === 'Terapia da Fala' ? 'border-[#00acc1] bg-cyan-50/20' : 'border-slate-100 hover:bg-slate-50'
                              }`}
                            >
                              <p className="text-[9px] text-[#00acc1] font-bold">Fala</p>
                              <p className="text-sm font-extrabold text-slate-900">{pctFala}%</p>
                              <p className="text-[9px] text-slate-400">{specialtyCounts['Terapia da Fala']} utentes</p>
                            </button>

                            <button
                              onClick={() => setHighlightedSpecialty(highlightedSpecialty === 'Terapia Ocupacional' ? null : 'Terapia Ocupacional')}
                              className={`p-2 rounded-xl border transition-all ${
                                highlightedSpecialty === 'Terapia Ocupacional' ? 'border-amber-400 bg-amber-50/20' : 'border-slate-100 hover:bg-slate-50'
                              }`}
                            >
                              <p className="text-[9px] text-amber-500 font-bold">Ocupacional</p>
                              <p className="text-sm font-extrabold text-slate-900">{pctOcup}%</p>
                              <p className="text-[9px] text-slate-400">{specialtyCounts['Terapia Ocupacional']} utentes</p>
                            </button>

                            <button
                              onClick={() => setHighlightedSpecialty(highlightedSpecialty === 'Nutrição' ? null : 'Nutrição')}
                              className={`p-2 rounded-xl border transition-all ${
                                highlightedSpecialty === 'Nutrição' ? 'border-violet-400 bg-violet-50/20' : 'border-slate-100 hover:bg-slate-50'
                              }`}
                            >
                              <p className="text-[9px] text-violet-500 font-bold font-mono">Nutrição</p>
                              <p className="text-sm font-extrabold text-slate-900">{pctNutri}%</p>
                              <p className="text-[9px] text-slate-400">{specialtyCounts['Nutrição']} utentes</p>
                            </button>
                          </div>
                        </div>

                        {/* Operational details and diagnostic alerts */}
                        <div className="bg-white p-5 border border-slate-205 rounded-2xl flex flex-col justify-between">
                          <div className="space-y-4 text-left">
                            <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider border-b border-slate-100 pb-2">Informativo Geral de Demografia</h4>
                            
                            <div className="space-y-2 font-medium text-xs text-slate-705">
                              <p className="flex justify-between">
                                <span className="text-slate-450">Idade Média Observada</span>
                                <span className="font-extrabold text-slate-800">
                                  {patients.length > 0 ? Math.round(patients.reduce((acc, p) => acc + p.age, 0) / patients.length) : 0} anos
                                </span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-slate-450">Relação Feminino / Masculino</span>
                                <span className="font-extrabold text-slate-800">
                                  {patients.filter(p => p.gender === 'Feminino').length}F / {patients.filter(p => p.gender === 'Masculino').length}M
                                </span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-slate-450">Consultas Feitas</span>
                                <span className="font-extrabold text-[#00acc1]">{appointments.filter(a => a.status === 'Confirmado').length} Confirmadas</span>
                              </p>
                            </div>

                            <div className="bg-cyan-50/50 p-3 rounded-xl border border-cyan-150 text-[10px] leading-relaxed text-slate-550">
                              <p className="font-bold text-[#00acc1]">📍 Informações do Alvo ({outcomesTarget}%)</p>
                              <p className="mt-0.5">Atualmente a atingir níveis recomendados nas orientações clínicas terapêuticas para a escala pediátrica de Terapia Ocupacional.</p>
                            </div>
                          </div>

                          <div className="space-y-1 mt-4">
                            <p className="text-[9px] font-bold text-slate-400 text-right">Escala Operacional de Metas</p>
                            <div className="h-2 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                              <div className="h-full bg-[#00acc1]" style={{ width: `${outcomesTarget}%` }}></div>
                              <div className="h-full bg-slate-200" style={{ width: `${100 - outcomesTarget}%` }}></div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </motion.div>
                  )}

                  {/* TAB 4A: GESTÃO DE SERVIÇOS */}
                  {desktopTab === 'services' && (
                    <motion.div
                      key="services"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5 text-left">
                        <div>
                          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Catálogo de Serviços da Clínica</h2>
                          <p className="text-slate-500 text-xs mt-0.5">Configure os serviços prestados, especialidades, preçários e tempos médios de consulta terapêutica.</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingServiceId(null);
                            setServiceName('');
                            setServiceSpecialty('Terapia da Fala');
                            setServicePrice(50);
                            setServiceDuration(45);
                            setServiceDescription('');
                            setIsNewServiceModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#00acc1] text-white hover:bg-[#0097a7] rounded-xl text-xs font-bold transition-all shadow-sm shadow-cyan-100 align-self-start sm:align-self-auto"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Serviço</span>
                        </button>
                      </div>

                      {/* Specialties Management */}
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 mb-8">
                        <div className="flex flex-col mb-4 text-left">
                          <h3 className="text-sm font-extrabold text-slate-800">Especialidades Clínicas</h3>
                          <p className="text-[10px] text-slate-500 mt-0.5">Gerir as especialidades que a clínica oferece.</p>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-4">
                          <div className="flex flex-wrap gap-2 flex-grow">
                            {specialties.map(spec => (
                              <div key={spec} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                                <span className="text-[11px] font-bold text-slate-700">{spec}</span>
                                {specialtyToDelete === spec ? (
                                  <div className="flex items-center gap-1 bg-rose-50 px-1 py-0.5 rounded border border-rose-150 relative -mr-1">
                                    <button onClick={() => handleConfirmDeleteSpecialty(spec)} className="text-rose-600 hover:text-rose-800"><Check className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => setSpecialtyToDelete(null)} className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
                                  </div>
                                ) : (
                                  <button onClick={() => setSpecialtyToDelete(spec)} className="text-slate-300 hover:text-rose-500 transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <input
                              type="text"
                              value={newSpecialtyName}
                              onChange={(e) => setNewSpecialtyName(e.target.value)}
                              placeholder="Nova especialidade..."
                              className="text-xs p-2 border border-slate-200 rounded-lg w-48 bg-white"
                              onKeyDown={(e) => e.key === 'Enter' && handleAddSpecialty()}
                            />
                            <button
                              onClick={handleAddSpecialty}
                              disabled={!newSpecialtyName.trim()}
                              className="p-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="flex items-center gap-2 text-left">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-600 mr-2 font-sans text-slate-500">Filtrar Especialidade:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {['Todos', ...specialties].map((spec) => (
                            <button
                              key={spec}
                              onClick={() => setSpecialtyFilter(spec)}
                              className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                                specialtyFilter === spec
                                  ? 'bg-slate-800 text-white border-slate-800'
                                  : 'bg-white text-slate-650 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {spec}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Catalog Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-left">
                        {services
                          .filter(s => specialtyFilter === 'Todos' || s.specialty === specialtyFilter)
                          .map((srv) => {
                            const specColors =
                              srv.specialty === 'Terapia da Fala'
                                ? 'bg-indigo-50 text-indigo-600 border-indigo-150'
                                : srv.specialty === 'Terapia Ocupacional'
                                ? 'bg-amber-50 text-amber-700 border-amber-150'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-150';

                            return (
                              <div
                                key={srv.id}
                                className="bg-white rounded-2xl border border-slate-201 p-4 hover:shadow-sm transition-all relative flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${specColors}`}>
                                      {srv.specialty}
                                    </span>
                                    <span className="font-mono text-xs font-extrabold text-slate-850 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                                      {formatMoney(srv.price)}€
                                    </span>
                                  </div>

                                  <h3 className="text-xs font-extrabold text-slate-900 leading-snug">{srv.name}</h3>
                                  <p className="text-slate-500 text-[10px] mt-1 text-slate-550 leading-relaxed min-h-[45px]">{srv.description || 'Sem descrição específica registada.'}</p>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                  <span className="text-slate-400 text-[9px] font-bold flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    {srv.duration} min
                                  </span>

                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => handleEditService(srv)}
                                      className="p-1 px-2.5 bg-slate-50 hover:bg-slate-100 text-[#00acc1] rounded-lg text-[10px] font-bold border border-slate-150 transition-all font-sans"
                                      title="Editar Serviço"
                                    >
                                      Editar
                                    </button>
                                    {serviceToDelete === srv.id ? (
                                      <div className="flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-lg border border-rose-150">
                                        <span className="text-[10px] text-rose-600 font-bold">A apagar?</span>
                                        <button onClick={() => handleDeleteService(srv.id)} className="text-rose-600 hover:text-rose-800 p-0.5"><Check className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => setServiceToDelete(null)} className="text-slate-400 hover:text-slate-600 p-0.5"><X className="w-3.5 h-3.5" /></button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setServiceToDelete(srv.id)}
                                        className="p-1 hover:bg-rose-50 text-rose-500 rounded-lg border border-transparent hover:border-rose-150 transition-all"
                                        title="Remover Serviço"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                        {services.filter(s => specialtyFilter === 'Todos' || s.specialty === specialtyFilter).length === 0 && (
                          <div className="col-span-full bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                            <Briefcase className="w-8 h-8 text-slate-350 mx-auto mb-2" />
                            <p className="text-xs font-bold text-slate-600">Nenhum serviço correspondente encontrado.</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Adicione novos serviços ou altere o filtro de especialidades.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4B: GESTÃO FINANCEIRA */}
                  {desktopTab === 'financial' && (
                    <motion.div
                      key="financial"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5 text-left">
                        <div>
                          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Gestão Financeira da Clínica</h2>
                          <p className="text-slate-500 text-xs mt-0.5">Monitore receitas geradas pelas consultas, despesas em caixa, saldos reais e lucros líquidos.</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingTxId(null);
                            setTxType('Receita');
                            setTxCategory('Consulta');
                            setTxAmount(50);
                            setTxDate('2026-05-25');
                            setTxDescription('');
                            setTxStatus('Pago');
                            setIsNewTxModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#00acc1] text-white hover:bg-[#0097a7] rounded-xl text-xs font-bold transition-all shadow-sm shadow-cyan-100 align-self-start sm:align-self-auto"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Novo Lançamento</span>
                        </button>
                      </div>

                      {/* Metrics Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left font-sans">
                        {/* Box 1: Saldo Líquido */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-2xl text-white shadow-sm relative overflow-hidden text-left border border-slate-700">
                          <div className="absolute right-2 bottom-1 opacity-10">
                            <Wallet className="w-20 h-20" />
                          </div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-300">Saldo Líquido em Caixa</p>
                          <h3 className="text-2xl font-extrabold mt-1 font-mono">{netProfit >= 0 ? '+' : ''}{formatMoney(netProfit)}€</h3>
                          <p className="text-[9px] text-emerald-400 mt-1.5 flex items-center gap-1 font-bold">
                            <Check className="w-3 h-3 text-emerald-400" />
                            Fluxo operacional positivo
                          </p>
                        </div>

                        {/* Box 2: Total Receitas */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Receitas Totais</p>
                          <h3 className="text-2xl font-extrabold mt-1 font-mono text-emerald-600">+{formatMoney(totalRevenue)}€</h3>
                          <div className="mt-1 flex flex-col gap-0.5 text-[9px] text-slate-500 leading-none">
                            <span className="font-extrabold text-slate-705">{formatMoney(appointmentsRevenue)}€ automáticos de consultas</span>
                            <span>{formatMoney(manualRevenues)}€ lançados manualmente</span>
                          </div>
                        </div>

                        {/* Box 3: Total Despesas */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Despesas Liquidadas</p>
                          <h3 className="text-2xl font-extrabold mt-1 font-mono text-rose-600">-{formatMoney(totalPaidExpenses)}€</h3>
                          <p className="text-[9px] text-slate-405 mt-2">Vencimentos, rendas e materiais pagos.</p>
                        </div>

                        {/* Box 4: Rentabilidade de Margem */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-bold">Margem de Lucro Bruto</p>
                          <h3 className="text-2xl font-extrabold mt-1 font-mono text-[#00acc1]">{marginRatio}%</h3>
                          {/* Mini Progress Bar */}
                          <div className="w-full bg-slate-105 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-[#00acc1] h-full" style={{ width: `${marginRatio}%` }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                        {/* Ledgers & List */}
                        <div className="lg:col-span-2 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-150">
                            <span className="text-xs font-extrabold text-slate-700 font-sans">Filtros de Lançamento</span>
                            
                            <div className="flex flex-wrap items-center gap-1.5">
                              {/* Filter buttons */}
                              <select
                                value={financeTypeFilter}
                                onChange={(e: any) => setFinanceTypeFilter(e.target.value)}
                                className="px-2 py-1 text-[11px] bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-700"
                              >
                                <option value="Todos">Todos Fluxos</option>
                                <option value="Receita">Receitas (+)</option>
                                <option value="Despesa">Despesas (-)</option>
                              </select>

                              <select
                                value={financeStatusFilter}
                                onChange={(e: any) => setFinanceStatusFilter(e.target.value)}
                                className="px-2 py-1 text-[11px] bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-700"
                              >
                                <option value="Todos">Todos Estados</option>
                                <option value="Pago">Liquidado (Pago)</option>
                                <option value="Pendente">Por Liquidar (Pendente)</option>
                              </select>
                            </div>
                          </div>

                          {/* List view */}
                          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-left">
                            <div className="overflow-x-auto">
                              <table className="w-full text-[10px] leading-relaxed text-slate-650 min-w-[500px]">
                                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-150">
                                  <tr>
                                    <th className="py-2 px-3 text-left">Data</th>
                                    <th className="py-2 px-3 text-left">Tipo / Categoria</th>
                                    <th className="py-2 px-3 text-left">Descrição</th>
                                    <th className="py-2 px-3 text-right">Valor</th>
                                    <th className="py-2 px-3 text-center">Estado</th>
                                    <th className="py-2 px-3 text-center2">Ações</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-semibold text-slate-750 font-sans">
                                  {transactions
                                    .filter(t => financeTypeFilter === 'Todos' || t.type === financeTypeFilter)
                                    .filter(t => financeStatusFilter === 'Todos' || t.status === financeStatusFilter)
                                    .map(tx => {
                                      const isRev = tx.type === 'Receita';
                                      return (
                                        <tr key={tx.id} className="hover:bg-slate-50/50 transition-all">
                                          <td className="py-2.5 px-3 text-slate-450 font-mono whitespace-nowrap">{tx.date}</td>
                                          <td className="py-2.5 px-3">
                                            <div className="flex flex-col leading-none">
                                              <span className={`text-[9px] font-extrabold uppercase tracking-tight truncate ${isRev ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {tx.type}
                                              </span>
                                              <span className="text-[9px] text-slate-400 mt-0.5">{tx.category}</span>
                                            </div>
                                          </td>
                                          <td className="py-2.5 px-3 font-bold text-slate-800 truncate max-w-[140px]" title={tx.description}>{tx.description}</td>
                                          <td className="py-2.5 px-3 text-right font-mono font-extrabold text-slate-900">
                                            {isRev ? '+' : '-'}{formatMoney(tx.amount)}€
                                          </td>
                                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                            <button
                                              onClick={() => toggleTransactionStatus(tx.id)}
                                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold border transition-all ${
                                                tx.status === 'Pago'
                                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-150 hover:bg-emerald-100/50'
                                                  : 'bg-amber-50 text-amber-700 border-amber-150 hover:bg-amber-100/50'
                                              }`}
                                            >
                                              {tx.status}
                                            </button>
                                          </td>
                                          <td className="py-2.5 px-3">
                                            <div className="flex items-center justify-center gap-1.5">
                                              <button
                                                onClick={() => handleEditTransaction(tx)}
                                                className="text-[#00acc1] hover:underline text-[10px]"
                                              >
                                                Editar
                                              </button>
                                              {transactionToDelete === tx.id ? (
                                                <div className="flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-150">
                                                  <span className="text-[9px] text-rose-600 font-bold">Apagar?</span>
                                                  <button onClick={() => handleConfirmDeleteTransaction(tx.id)} className="text-rose-600 hover:text-rose-800 p-0.5"><Check className="w-3.5 h-3.5" /></button>
                                                  <button onClick={() => setTransactionToDelete(null)} className="text-slate-400 hover:text-slate-600 p-0.5"><X className="w-3.5 h-3.5" /></button>
                                                </div>
                                              ) : (
                                                <button
                                                  onClick={() => setTransactionToDelete(tx.id)}
                                                  className="text-rose-500 hover:text-rose-650 p-0.5"
                                                >
                                                  <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                              )}
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}

                                  {transactions.filter(t => financeTypeFilter === 'Todos' || t.type === financeTypeFilter)
                                                .filter(t => financeStatusFilter === 'Todos' || t.status === financeStatusFilter).length === 0 && (
                                    <tr>
                                      <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                                        Nenhum lançamento financeiro correspondente.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Financial Analysis block */}
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                            <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-2.5">Custos de Operação</h4>
                            <div className="space-y-3 font-semibold text-xs">
                              {/* Renda */}
                              <div>
                                <div className="flex items-center justify-between text-slate-600 text-[10px]">
                                  <span>Renda & Logística</span>
                                  <span className="font-mono">{formatMoney(transactions.filter(t => t.category === 'Renda').reduce((sum, t) => sum + t.amount, 0))}€</span>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded-lg mt-1 overflow-hidden">
                                  <div className="h-full bg-rose-500" style={{ width: '40%' }}></div>
                                </div>
                              </div>
                              {/* Vencimentos */}
                              <div>
                                <div className="flex items-center justify-between text-slate-600 text-[10px]">
                                  <span>Vencimentos & Clínicos</span>
                                  <span className="font-mono">{formatMoney(transactions.filter(t => t.category === 'Salários').reduce((sum, t) => sum + t.amount, 0))}€</span>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded-lg mt-1 overflow-hidden">
                                  <div className="h-full bg-indigo-500" style={{ width: '55%' }}></div>
                                </div>
                              </div>
                              {/* Material Clínico */}
                              <div>
                                <div className="flex items-center justify-between text-slate-600 text-[10px]">
                                  <span>Material Clínico</span>
                                  <span className="font-mono">{formatMoney(transactions.filter(t => t.category === 'Material Clínico').reduce((sum, t) => sum + t.amount, 0))}€</span>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded-lg mt-1 overflow-hidden">
                                  <div className="h-full bg-amber-550 bg-amber-500" style={{ width: '15%' }}></div>
                                </div>
                              </div>
                            </div>

                            <p className="text-[9px] text-slate-400 leading-normal mt-3.5 pt-2.5 border-t border-slate-100">
                              ℹ️ Os custos de operação são calculados a partir dos lançamentos sob classificação de Despesas Liquidada.
                            </p>
                          </div>

                          <div className="bg-cyan-50/50 p-4 border border-cyan-150 rounded-2xl text-[10px] leading-relaxed text-[#00838f]">
                            <p className="font-extrabold flex items-center gap-1 uppercase tracking-tight">
                              <Info className="w-3.5 h-3.5" />
                              Receitas Automáticas
                            </p>
                            <p className="mt-1 text-slate-600 leading-normal">
                              O fluxo integra as taxas base das especialidades das sessões <strong>Confirmadas</strong> na agenda. Para outros lançamentos, utilize o botão superior de Lançamento.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4C: Especialistas */}
                  {desktopTab === 'staff' && (
                    <motion.div
                      key="staff"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                    >
                      <StaffModule 
                        specialists={specialists} 
                        updateSpecialists={saveSpecialists} 
                        pushNotification={pushNotification} 
                      />
                    </motion.div>
                  )}

                  {/* TAB 5: CONFIGURAÇÕES */}
                  {desktopTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h2 className="text-xl font-extrabold text-slate-900">Configuração Geral do Hub</h2>
                        <p className="text-slate-500 text-xs mt-0.5">Ajuste os parâmetros básicos da sincronização do consultório.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl text-left">
                        
                        {/* Identity profile */}
                        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
                          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1">
                            <User className="w-4 h-4 text-[#00acc1]" />
                            <span>Identidade Corporativa</span>
                          </h3>

                          <div className="space-y-3 font-semibold text-xs">
                            <div className="space-y-1.5">
                              <label className="text-slate-650">Nome do Consultório / Unidade</label>
                              <input
                                type="text"
                                value={clinicName}
                                onChange={(e) => saveClinicSettings(e.target.value, doctorName, outcomesTarget)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-[#00acc1]"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-slate-650">Médica Coordenadora de Turno</label>
                              <input
                                type="text"
                                value={doctorName}
                                onChange={(e) => saveClinicSettings(clinicName, e.target.value, outcomesTarget)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-[#00acc1]"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-slate-650">Meta Geral de Outcomes Territoriais (%)</label>
                              <input
                                type="number"
                                min="50"
                                max="100"
                                value={outcomesTarget}
                                onChange={(e) => saveClinicSettings(clinicName, doctorName, Number(e.target.value) || 95)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-[#00acc1]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Calendar sync settings */}
                        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
                          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1">
                            <Shield className="w-4 h-4 text-[#00acc1]" />
                            <span>Segurança e Sincronização</span>
                          </h3>

                          <div className="space-y-4">
                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-150">
                              <div>
                                <p className="text-xs font-bold text-slate-800">Sincronização Ativa de Google Calendar</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Reflete marcações de forma segura e imediata.</p>
                              </div>
                              <button
                                onClick={() => {
                                  setCalendarSyncActive(!calendarSyncActive);
                                  pushNotification(`Sincronização Workspace Google ${!calendarSyncActive ? 'Ativada' : 'Desativada'}`);
                                }}
                                className={`w-11 h-6 rounded-full p-0.5 transition-all ${
                                  calendarSyncActive ? 'bg-[#00acc1]' : 'bg-slate-300'
                                }`}
                              >
                                <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                                  calendarSyncActive ? 'translate-x-5' : 'translate-x-0'
                                }`}></div>
                              </button>
                            </div>

                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-150">
                              <div>
                                <p className="text-xs font-bold text-slate-800">Modo de Ecrã (Light/Dark)</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Altera as cores do Painel para ambiente escuro.</p>
                              </div>
                              <button
                                onClick={() => toggleAppTheme(appTheme === 'light' ? 'dark' : 'light')}
                                className={`w-11 h-6 rounded-full p-0.5 transition-all ${
                                  appTheme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300'
                                }`}
                              >
                                <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                                  appTheme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                                }`}></div>
                              </button>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-2xl text-white space-y-3">
                              <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Reiniciar Simulação</p>
                              <p className="text-[9px] text-slate-400 leading-normal">Se deseja limpar quaisquer marcadores locais de teste criados no Website Público ou na Consola e voltar aos dados iniciais padrão:</p>
                              <button
                                onClick={() => {
                                  if (confirm('Tem a certeza que deseja repor os dados de demonstração clínica originais?')) {
                                    localStorage.removeItem('nexus_patients');
                                    localStorage.removeItem('nexus_appointments');
                                    localStorage.removeItem('nexus_notifications');
                                    localStorage.removeItem('nexus_clinic_name');
                                    localStorage.removeItem('nexus_doctor_name');
                                    localStorage.removeItem('nexus_outcomes_target');
                                    window.location.reload();
                                  }
                                }}
                                className="w-full py-2 bg-red-900 hover:bg-red-800 text-white rounded-xl text-auto text-[10px] font-black tracking-widest uppercase transition-colors"
                              >
                                Limpar & Repor Padrão
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>

                    </motion.div>
                  )}
                    {/* m-staff view */}
                    {mobileTab === 'm-staff' && (
                      <motion.div
                        key="m-staff"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-left">Corpo Clínico</h4>
                        
                        <div className="space-y-3">
                          {specialists.map(spec => (
                            <div key={spec.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                              <img src={spec.avatar} alt={spec.name} className="w-10 h-10 rounded-full object-cover" />
                              <div className="text-left flex-1">
                                <p className="text-xs font-bold text-slate-800">{spec.name}</p>
                                <p className="text-[9px] text-slate-500">{spec.specialty}</p>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${spec.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </motion.div>
          )}

          {/* ==================== DISPLAY MODE B: PORTABLE CELLPHONE SIMULATION ==================== */}
          {deviceMode === 'mobile' && (
            <motion.div
              key="mobile-stage"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="flex justify-center items-center py-6 bg-slate-100 rounded-3xl border border-slate-205"
            >
              
              {/* SMARTPHONE CASING */}
              <div className="w-[350px] h-[720px] bg-slate-950 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-40 flex items-center justify-center gap-1.5">
                  <div className="w-10 h-0.5 bg-slate-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-900 rounded-full border border-slate-800"></div>
                </div>

                {/* DEVICE VIEWPORT */}
                <div className="flex-1 bg-white rounded-[32px] overflow-hidden flex flex-col justify-between relative text-slate-800 font-sans border border-slate-900 shadow-inner">
                  
                  {/* Status Bar */}
                  <div className="h-9 bg-slate-900 text-white flex items-end justify-between px-6 pb-2 shrink-0 z-30 select-none">
                    <span className="text-[10px] font-bold font-mono">10:16</span>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold">
                      <span className="text-cyan-400 tracking-wide uppercase">NEXUS CONNECT</span>
                      <span className="w-2.5 h-1.5 bg-[#00acc1] rounded-sm"></span>
                    </div>
                  </div>

                  {/* App compact header */}
                  <header className="bg-slate-900 text-white py-3.5 px-4 flex items-center justify-between shrink-0">
                    <h3 className="font-extrabold text-xs tracking-tight uppercase flex items-center gap-1">
                      <HeartPulse className="w-3.5 h-3.5 text-[#00acc1]" />
                      <span>{clinicName.split(' ')[0]} Go</span>
                    </h3>
                    <p className="text-[9px] font-extrabold text-[#00acc1] uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-900">Dr. Mendes</p>
                  </header>

                  {/* Mobile body route */}
                  <div className="flex-1 overflow-y-auto p-4 bg-slate-50 pb-16 space-y-4 scroll-smooth">
                    
                    {/* m-home view */}
                    {mobileTab === 'm-home' && (
                      <motion.div
                        key="m-home"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-4 bg-gradient-to-br from-slate-900 to-cyan-950 text-white rounded-2xl text-left space-y-1 shadow">
                          <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">Visão Rápida Hoje</span>
                          <h4 className="text-xl font-extrabold leading-none pt-1">{todayAppointments.length} Consultas</h4>
                          <p className="text-[10px] text-slate-400">Total de {patients.length} utentes na base clínica</p>
                        </div>

                        <div className="space-y-2.5 text-left">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Coordenadas Hoje</h4>
                          
                          {todayAppointments.map(app => (
                            <div key={app.id} className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs flex justify-between items-center gap-2">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] font-mono font-bold bg-[#00acc1]/10 text-[#00acc1] px-1.5 py-0.5 rounded">
                                    {app.time}
                                  </span>
                                  <span className="text-[8px] text-slate-400 font-extrabold uppercase">{app.specialty.split(' ')[0]}</span>
                                </div>
                                <h5 className="text-xs font-bold text-slate-900 mt-1">{app.patientName}</h5>
                              </div>
                              <button
                                onClick={() => toggleAppointmentStatus(app.id)}
                                className={`px-2 py-0.5 border rounded-full text-[9px] font-bold ${
                                  app.status === 'Confirmado'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-amber-50 text-amber-705 border-amber-200 text-amber-700'
                                }`}
                              >
                                {app.status}
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* m-patients view */}
                    {mobileTab === 'm-patients' && (
                      <motion.div
                        key="m-patients"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-left">Utentes Registados ({patients.length})</h4>
                        
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                          <input
                            type="text"
                            placeholder="Procurar utente..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-xs py-1 pl-7 pr-2.5 bg-white border border-slate-205 rounded-lg outline-none font-medium"
                          />
                        </div>

                        <div className="space-y-2 text-left">
                          {filteredPatientsList.map(p => (
                            <div key={p.id} className="p-3 bg-white border border-slate-150 rounded-xl space-y-2.5 shadow-5xs">
                              <div className="flex justify-between items-start gap-1">
                                <div>
                                  <h5 className="text-xs font-bold text-slate-950">{p.name}</h5>
                                  <p className="text-[9px] text-slate-400 mt-0.5">{p.age} anos · {p.specialty}</p>
                                </div>
                                <span className={`text-[8px] px-1.5 rounded uppercase font-black tracking-wide border ${
                                  p.status === 'Ativo' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                                }`}>
                                  {p.status}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 italic bg-slate-50 border border-slate-100 p-2 rounded-lg truncate">
                                &quot;{p.notes}&quot;
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* m-calendar view */}
                    {mobileTab === 'm-calendar' && (
                      <motion.div
                        key="m-calendar"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-left">Grelha de Horários Sincronizados</h4>
                          {appointments.length === 0 && (
                            <button
                              onClick={() => {
                                localStorage.setItem('nexus_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
                                setAppointments(INITIAL_APPOINTMENTS);
                              }}
                              className="text-[9px] bg-amber-500 text-white px-2 py-0.5 rounded-md font-bold hover:bg-amber-600 transition-colors"
                            >
                              Repor Consultas
                            </button>
                          )}
                        </div>

                        {appointments.length === 0 ? (
                          <div className="p-5 text-center bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs italic space-y-2">
                            <p>Não há consultas em agenda.</p>
                            <button
                              onClick={() => {
                                localStorage.setItem('nexus_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
                                setAppointments(INITIAL_APPOINTMENTS);
                              }}
                              className="px-3 py-1 bg-[#00acc1] text-white rounded-lg text-[9px] font-bold uppercase transition-colors"
                            >
                              Carregar Demo
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2 text-left">
                            {[...appointments]
                              .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                              .map(app => (
                                <div key={app.id} className="p-3 bg-white border border-slate-150 rounded-xl flex justify-between items-center gap-2">
                                  <div>
                                    <h5 className="text-xs font-bold text-slate-950">{app.patientName}</h5>
                                    <p className="text-[9px] text-slate-400 font-medium">
                                      {app.date.split('-').reverse().slice(0, 2).join('/')} às {app.time} ({app.specialty.split(' ')[0]})
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => toggleAppointmentStatus(app.id)}
                                    className={`px-2 py-0.5 border rounded-full text-[9px] font-bold ${
                                      app.status === 'Confirmado' 
                                        ? 'bg-emerald-50 border-emerald-250 text-emerald-800' 
                                        : 'bg-amber-50 border-amber-250 text-amber-800'
                                    }`}
                                  >
                                    {app.status}
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* m-analytics view */}
                    {mobileTab === 'm-analytics' && (
                      <motion.div
                        key="m-analytics"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-left">Métricas do Consultório</h4>
                        <div className="grid grid-cols-2 gap-3.5 text-left">
                          <div className="p-3 bg-white border border-slate-150 rounded-xl">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Eficiência</span>
                            <p className="text-base font-extrabold text-cyan-505 text-[#00acc1] mt-0.5">{outcomesTarget}%</p>
                          </div>
                          <div className="p-3 bg-white border border-slate-150 rounded-xl">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Satisfação</span>
                            <p className="text-base font-extrabold text-emerald-600 mt-0.5">94.8%</p>
                          </div>
                        </div>

                        <div className="p-3.5 bg-white border border-slate-150 rounded-xl text-left space-y-2">
                          <p className="text-[10px] font-bold text-slate-600">Representação Ocupação</p>
                          <div className="h-1.5 w-full bg-slate-100 rounded-lg overflow-hidden">
                            <div className="h-full bg-amber-450 bg-amber-400" style={{ width: '82%' }}></div>
                          </div>
                          <p className="text-[8px] text-slate-400 text-right">82% de ocupação semanal das salas</p>
                        </div>
                      </motion.div>
                    )}

                  </div>

                  {/* Mobile Fab Button */}
                  <div className="absolute right-4 bottom-14 z-40">
                    <button
                      onClick={() => setMobileFabOpen(!mobileFabOpen)}
                      className="w-11 h-11 rounded-full bg-[#00acc1] text-white hover:bg-[#0097a7] flex items-center justify-center shadow-lg shadow-cyan-300 transition-all font-black"
                    >
                      {mobileFabOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                    </button>

                    {mobileFabOpen && (
                      <div className="absolute right-0 bottom-13.5 bg-white border border-slate-200 rounded-xl p-1.5 w-36 shadow-xl space-y-0.5 text-left">
                        <button
                          onClick={() => {
                            setMobileSheetType('patient');
                            setMobileFabOpen(false);
                          }}
                          className="w-full text-left font-bold text-[10px] p-2 hover:bg-slate-50 text-slate-800 roundedLg"
                        >
                          + Novo Utente
                        </button>
                        <button
                          onClick={() => {
                            setMobileSheetType('appointment');
                            setMobileFabOpen(false);
                          }}
                          className="w-full text-left font-bold text-[10px] p-2 hover:bg-slate-50 text-slate-800 roundedLg"
                        >
                          + Nova Consulta
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Compact Mobile Menu Overlay */}
                  {mobileSheetType && (
                    <div className="absolute inset-x-0 bottom-0 top-[120px] bg-white border-t border-slate-205 rounded-t-3xl z-40 p-4 shadow-xl flex flex-col overflow-y-auto text-left">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[10px] font-black text-slate-850 uppercase tracking-widest">
                          {mobileSheetType === 'patient' ? 'Admitir Utente' : 'Marcar Consulta'}
                        </h4>
                        <button onClick={() => setMobileSheetType(null)} className="p-1 hover:bg-slate-50 rounded-full text-slate-405">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {mobileSheetType === 'patient' ? (
                        <form onSubmit={handleAddPatient} className="space-y-3 text-xs font-semibold">
                          <div className="space-y-1">
                            <label className="text-slate-600 block text-[9px] uppercase">Nome Completo</label>
                            <input
                              type="text"
                              required
                              placeholder="Nome do utente"
                              value={newPatName}
                              onChange={(e) => setNewPatName(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-600 block text-[9px] uppercase">Contacto</label>
                            <input
                              type="text"
                              required
                              placeholder="Contacto telefónico"
                              value={newPatPhone}
                              onChange={(e) => {
                                setNewPatPhone(e.target.value);
                                if (!newPatWhatsapp) setNewPatWhatsapp(e.target.value);
                              }}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-600 block text-[9px] uppercase">Terapia</label>
                            <select
                              value={newPatSpecialty}
                              onChange={(e: any) => setNewPatSpecialty(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            >
                              {specialties.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                              ))}
                            </select>
                          </div>
                          <button type="submit" className="w-full py-2 bg-[#00acc1] text-white rounded-lg font-bold text-xs">
                            Confirmar Admissão Móvel
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleAddAppointment} className="space-y-3 text-xs font-semibold">
                          <div className="space-y-1">
                            <label className="text-slate-600 block text-[9px] uppercase">Utente</label>
                            <select
                              value={patients.some(p => p.id === newAppPatientId) ? newAppPatientId : (patients.length > 0 ? patients[0].id : '')}
                              onChange={(e) => setNewAppPatientId(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            >
                              {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-600 block text-[9px] uppercase">Hora (HH:MM)</label>
                            <input
                              type="time"
                              required
                              value={newAppTime}
                              onChange={(e) => setNewAppTime(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-600 block text-[9px] uppercase">Especialista</label>
                            <input
                              type="text"
                              required
                              value={newAppDoctor}
                              onChange={(e) => setNewAppDoctor(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                          <button type="submit" className="w-full py-2 bg-[#00acc1] text-white rounded-lg font-bold text-xs">
                            Marcar Consulta na Agenda
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Navigation Tab bar simulation */}
                  <nav className="h-13.5 bg-slate-900 border-t border-slate-800 flex items-center justify-around z-30 shrink-0">
                    <button
                      onClick={() => setMobileTab('m-home')}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-extrabold transition-all ${
                        mobileTab === 'm-home' ? 'text-[#00acc1]' : 'text-slate-400'
                      }`}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Hoje</span>
                    </button>

                    <button
                      onClick={() => setMobileTab('m-patients')}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-extrabold transition-all ${
                        mobileTab === 'm-patients' ? 'text-[#00acc1]' : 'text-slate-400'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Utentes</span>
                    </button>

                    <button
                      onClick={() => setMobileTab('m-calendar')}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-extrabold transition-all ${
                        mobileTab === 'm-calendar' ? 'text-[#00acc1]' : 'text-slate-400'
                      }`}
                    >
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>Agenda</span>
                    </button>

                    <button
                      onClick={() => setMobileTab('m-analytics')}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-extrabold transition-all ${
                        mobileTab === 'm-analytics' ? 'text-[#00acc1]' : 'text-slate-400'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Kpis</span>
                    </button>

                    <button
                      onClick={() => setMobileTab('m-staff')}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-extrabold transition-all ${
                        mobileTab === 'm-staff' ? 'text-[#00acc1]' : 'text-slate-400'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Equipa</span>
                    </button>
                  </nav>

                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* REUSABLE GLOBAL DEKTOP VIEW PORTAL DIALOG MODALS */}
      <AnimatePresence>

        {/* POPUP 0: INDIVIDUAL CLINICAL PORTAL CRM DRAWER */}
        {isCRMDrawerOpen && (() => {
          const selectedPat = patients.find(p => p.id === selectedPatientId);
          if (!selectedPat) return null;

          // Merge timeline elements: developments, payments, files, and appointments chronologically
          const timelineEvents = [
            ...(selectedPat.evolutions || []).map(evo => ({
              id: evo.id,
              type: 'evolution',
              date: evo.date,
              title: 'Evolução Clínica Registada',
              desc: evo.note,
              badge: evo.doctor,
              color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
              icon: Activity
            })),
            ...(selectedPat.payments || []).map(pay => ({
              id: pay.id,
              type: 'payment',
              date: pay.date,
              title: `Pagamento Recebido - ${pay.description}`,
              desc: `Valor liquidado de ${formatMoney(pay.amount)}€ via transferência/numerário.`,
              badge: pay.status,
              color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
              icon: DollarSign
            })),
            ...(selectedPat.documents || []).map(doc => ({
              id: doc.id,
              type: 'document',
              date: doc.date,
              title: `Ficheiro Anexado - ${doc.name}`,
              desc: `Documento clínico carregado na categoria ${doc.category} (${doc.size}).`,
              badge: doc.category,
              color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
              icon: Paperclip
            })),
            ...appointments.filter(a => a.patientId === selectedPat.id).map(appt => ({
              id: appt.id,
              type: 'appointment',
              date: appt.date,
              title: `Sessão Clínico de ${appt.specialty}`,
              desc: `Consulta agendada para as ${appt.time} com o especialista designado.`,
              badge: appt.status,
              color: appt.status === 'Confirmado' ? 'text-teal-600 bg-teal-50 border-teal-105' : 'text-amber-600 bg-amber-50 border-amber-105',
              icon: CalendarIcon
            }))
          ].sort((a, b) => b.date.localeCompare(a.date));

          return (
            <div className="fixed inset-0 z-50 overflow-hidden text-left" id="crm-portal-drawer">
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCRMDrawerOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
              />

              <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                  className="w-screen max-w-3xl bg-slate-50 flex flex-col shadow-2xl relative"
                >
                  {/* Top Bar / Mini Header */}
                  <div className="bg-white border-b border-slate-150 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={selectedPat.avatar} 
                          alt={selectedPat.name} 
                          className="w-12 h-12 rounded-full border border-slate-150 shadow-inner bg-slate-100"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-slate-900">{selectedPat.name}</h3>
                          <span className="text-[10px] bg-slate-100 border px-1.5 py-0.5 rounded-md text-slate-500 font-mono">
                            {selectedPat.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {selectedPat.gender} · {selectedPat.age} anos ({selectedPat.birthDate}) · NIF: <span className="font-mono">{selectedPat.nif}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (confirm(`Pretende dar Alta clínica ao utente ${selectedPat.name}?`)) {
                            const updatedPats = patients.map(p => p.id === selectedPat.id ? { ...p, status: 'Em Alta' as const } : p);
                            savePatients(updatedPats);
                            pushNotification(`Alta clínica concedida ao utente ${selectedPat.name}.`);
                          }
                        }}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-150 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all"
                      >
                        Conceder Alta
                      </button>
                      <button
                        onClick={() => setIsCRMDrawerOpen(false)}
                        className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full border border-slate-150 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* EHR Horizontal Menu Ribbons */}
                  <div className="bg-white border-b border-slate-150 px-6 flex gap-1 shrink-0 overflow-x-auto scrollbar-none">
                    {[
                      { id: 'overview', label: 'Cadastro Geral', icon: User },
                      { id: 'timeline', label: 'Evoluções & Histórico', icon: Activity },
                      { id: 'ehr', label: 'Prontuário SOAP', icon: HeartPulse },
                      { id: 'consultations', label: 'Sessões & Consultas', icon: CalendarIcon },
                      { id: 'financial', label: 'Fluxo Financeiro', icon: DollarSign },
                      { id: 'documents', label: 'Anexos Clínicos', icon: Paperclip }
                    ].map(tab => {
                      const isActive = activeCRMTab === tab.id;
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveCRMTab(tab.id as any)}
                          className={`flex items-center gap-2 px-4 py-3 text-[11px] font-extrabold transition-all border-b-2 shrink-0 ${
                            isActive 
                              ? 'border-[#00acc1] text-[#00acc1]' 
                              : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Drawer Scrollable Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* SUB-PANEL 1: GENERAL REGISTRATION DATA */}
                    {activeCRMTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-4">
                          <h4 className="text-xs font-extrabold text-[#00acc1] uppercase tracking-wider flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Metadados de Contacto e Identificação</span>
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
                            <div className="space-y-1">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">Endereço Postal</p>
                              <p className="text-slate-800">{selectedPat.address}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">Ficha Email</p>
                              <p className="text-slate-800 font-mono select-all">{selectedPat.email}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">Chamadas Telemóvel</p>
                              <p className="text-[#00acc1] font-mono select-all">{selectedPat.phone}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">WhatsApp Clínico</p>
                              <p className="text-emerald-600 font-mono select-all">{selectedPat.whatsapp}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">Contacto de Urgência</p>
                              <p className="text-rose-700 font-mono">{selectedPat.emergencyContact}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-slate-400 text-[10px] font-bold uppercase">Origem/Canal Comercial</p>
                              <p className="bg-slate-100 border px-1.5 py-0.5 rounded-md inline-block text-slate-600">
                                {selectedPat.leadOrigin || 'Directo'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Clinical Warnings: Allergies & Meds */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-rose-50 border border-rose-150 rounded-2xl p-5 space-y-2">
                            <h4 className="text-xs font-extrabold text-rose-800 uppercase tracking-tight flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                              <span>Alergias / Restrições Clínicas</span>
                            </h4>
                            <p className="text-xs text-rose-850 font-semibold leading-relaxed">
                              {selectedPat.allergies || 'Nenhuma restrição alimentar, medicamentosa ou cognitiva informada.'}
                            </p>
                          </div>

                          <div className="bg-amber-50 border border-amber-150 rounded-2xl p-5 space-y-2">
                            <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-tight flex items-center gap-2">
                              <Info className="w-4 h-4 text-amber-600" />
                              <span>Terapêutica / Medicamentos Ativos</span>
                            </h4>
                            <p className="text-xs text-amber-850 font-semibold leading-relaxed">
                              {selectedPat.meds || 'Nenhum fármaco de uso contínuo cadastrado.'}
                            </p>
                          </div>
                        </div>

                        {/* Internal Observation Notes */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-3">
                          <h4 className="text-xs font-bold text-slate-800 uppercase">Observações Clínicas Adicionais</h4>
                          <p className="text-xs text-slate-550 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
                            &quot;{selectedPat.notes || 'Sem observações secundárias no prontuário.'}&quot;
                          </p>
                        </div>
                      </div>
                    )}

                    {/* SUB-PANEL 2: TIMELINE BLOCK */}
                    {activeCRMTab === 'timeline' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-5 border border-slate-150">
                          <h4 className="text-xs font-extrabold text-slate-800 uppercase mb-4">Evolução Integrada de Eventos</h4>
                          
                          <div className="relative border-l border-slate-200 pl-6 ml-2 space-y-6 text-xs text-left">
                            {timelineEvents.map((evt, idx) => {
                              const ItemIcon = evt.icon;
                              return (
                                <div key={evt.id || idx} className="relative">
                                  {/* Dot */}
                                  <span className={`absolute -left-[31px] top-1 w-5 h-5 rounded-full flex items-center justify-center border ${evt.color}`}>
                                    <ItemIcon className="w-2.5 h-2.5" />
                                  </span>
                                  
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-extrabold text-slate-900">{evt.title}</span>
                                      <span className="text-[10px] text-slate-400 font-bold">{evt.date}</span>
                                    </div>
                                    <p className="text-slate-500 font-medium leading-relaxed">{evt.desc}</p>
                                    <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-sm font-bold border text-slate-600 inline-block uppercase">
                                      {evt.badge}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB-PANEL 3: EHR NOTES (SOAP DEVELOPMENTS) */}
                    {activeCRMTab === 'ehr' && (
                      <div className="space-y-4 text-left">
                        {/* Note Adder Box */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-extrabold text-slate-800 uppercase">Redigir Relatório de Evolução Clinica</h4>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEhrSelectedTemplate('Livre');
                                  setEhrNoteText('');
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                                  ehrSelectedTemplate === 'Livre' ? 'bg-[#00acc1] text-white border-cyan-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                                }`}
                              >
                                Texto Livre
                              </button>
                              <button
                                onClick={() => {
                                  setEhrSelectedTemplate('SOAP');
                                  setEhrNoteText(
                                    `S: Utente refere progresso nos exercícios de articulação em casa.\nO: Cooperante. Completou 85% das repetições solicitadas com feedback corretivo verbal.\nA: Melhoria consistente no controlo fonatório em dígrafos específicos.\nP: Reforçar atividades fonológicas. Próxima sessão focará na automatização silábica.`
                                  );
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                                  ehrSelectedTemplate === 'SOAP' ? 'bg-[#00acc1] text-white border-cyan-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                                }`}
                              >
                                Modelo SOAP Metódico
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3 text-xs font-semibold text-slate-700">
                            <div className="space-y-1.5">
                              <label className="text-slate-550">Evolução Pública (Impressa no Prontuário)</label>
                              <textarea
                                value={ehrNoteText}
                                onChange={(e) => setEhrNoteText(e.target.value)}
                                rows={5}
                                placeholder="Descreva pormenorizadamente a evolução terapêutica do utente..."
                                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800 focus:ring-1 focus:ring-cyan-500"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-slate-550 flex items-center gap-1 text-slate-400">
                                <Shield className="w-3.5 h-3.5" />
                                <span>Notas Privadas (Visíveis apenas para coordenadores)</span>
                              </label>
                              <input
                                type="text"
                                value={ehrPrivateText}
                                onChange={(e) => setEhrPrivateText(e.target.value)}
                                placeholder="Observações de retaguarda, notas de pais/responsáveis..."
                                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                              />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                onClick={() => {
                                  if (!ehrNoteText.trim()) return;
                                  const newEvo = {
                                    id: 'evo-' + Date.now(),
                                    date: '2026-05-25',
                                    note: ehrNoteText,
                                    doctor: selectedPat.doctor
                                  };
                                  const updatedPats = patients.map(p => p.id === selectedPat.id ? { ...p, evolutions: [newEvo, ...(p.evolutions || [])] } : p);
                                  savePatients(updatedPats);
                                  setEhrNoteText('');
                                  setEhrPrivateText('');
                                  pushNotification(`Evolução clínica de ${selectedPat.name} gravada.`);
                                }}
                                className="bg-[#00acc1] hover:bg-[#0097a7] text-white px-4 py-2 rounded-xl text-xs font-bold"
                              >
                                Gravar Evolução
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Listed EHR timeline */}
                        <div className="space-y-3 text-xs">
                          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1">Evoluções Médicas Verificadas</h4>
                          {(selectedPat.evolutions || []).map((evo) => (
                            <div key={evo.id} className="bg-white p-4 border rounded-xl space-y-2 border-slate-150 text-left">
                              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                                <span className="flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{evo.doctor}</span>
                                </span>
                                <span>{evo.date}</span>
                              </div>
                              <p className="font-semibold text-slate-750 text-slate-700 whitespace-pre-wrap leading-relaxed">{evo.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SUB-PANEL 4: CONSULTATIONS APPOINTMENTS SCHEDULER */}
                    {activeCRMTab === 'consultations' && (
                      <div className="space-y-6 text-left text-xs">
                        {/* List dynamic appointments booked */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-3">
                          <h4 className="font-extrabold text-slate-800 uppercase text-xs">Acompanhamento e Consultas Ativas</h4>
                          
                          <div className="space-y-2">
                            {appointments.filter(a => a.patientId === selectedPat.id).map(a => (
                              <div key={a.id} className="bg-slate-50 border p-3.5 rounded-xl border-slate-150 flex items-center justify-between font-semibold">
                                <div className="space-y-0.5">
                                  <p className="text-slate-800 text-xs">Consulta de {a.specialty}</p>
                                  <p className="text-[10px] font-mono text-slate-400">{a.date} às {a.time} min</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                                  a.status === 'Confirmado' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' : 'bg-amber-50 text-amber-700 border border-amber-150'
                                }`}>
                                  {a.status}
                                </span>
                              </div>
                            ))}
                            {appointments.filter(a => a.patientId === selectedPat.id).length === 0 && (
                              <p className="text-slate-400 italic text-center text-[11px] py-4">Sem consultas futuras agendadas.</p>
                            )}
                          </div>
                        </div>

                        {/* Quick schedule tool */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-4">
                          <h4 className="font-extrabold text-[#00acc1] uppercase text-xs flex items-center gap-1.5">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Prescrever & Marcar Nova Sessão Avançada</span>
                          </h4>

                          <div className="grid grid-cols-2 gap-3 text-slate-705 font-bold">
                            <div className="space-y-1.5">
                              <label>Especialidade</label>
                              <select
                                id="crm-sched-specialty"
                                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none"
                                value={newAppSpecialty}
                                onChange={(e: any) => setNewAppSpecialty(e.target.value)}
                              >
                                {specialties.map(spec => (
                                  <option key={spec} value={spec}>{spec}</option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label>Hora Prevista</label>
                              <input
                                type="text"
                                placeholder="10:00"
                                value={newAppTime}
                                onChange={(e) => setNewAppTime(e.target.value)}
                                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none"
                              />
                            </div>

                            <div className="space-y-1.5 col-span-2">
                              <label>Data de Realização</label>
                              <input
                                type="date"
                                value={newAppDate}
                                onChange={(e) => setNewAppDate(e.target.value)}
                                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end pt-1">
                            <button
                                onClick={() => {
                                  const newApp: Appointment = {
                                    id: 'app-' + Date.now(),
                                    patientId: selectedPat.id,
                                    patientName: selectedPat.name,
                                    date: newAppDate,
                                    time: newAppTime,
                                    specialty: newAppSpecialty as 'Terapia da Fala' | 'Terapia Ocupacional' | 'Nutrição',
                                    status: 'Confirmado',
                                    doctor: selectedPat.doctor || doctorName
                                  };
                                  const updatedApps = [newApp, ...appointments];
                                saveAppointments(updatedApps);
                                pushNotification(`Sessão agendada na agenda central para ${selectedPat.name}.`);
                              }}
                              className="bg-slate-900 border hover:bg-slate-800 text-white text-xs px-4 py-2 rounded-xl font-bold"
                            >
                              Marcar Sessão
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB-PANEL 5: FINANCIAL PATIENT LEDGER & COBRANÇA */}
                    {activeCRMTab === 'financial' && (
                      <div className="space-y-6 text-left text-xs">
                        <div className="bg-white p-5 border border-slate-150 rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold text-slate-400 uppercase">Estado Geral de Conta</p>
                            <p className={`text-lg font-extrabold mt-0.5 ${selectedPat.status === 'Inadimplente' ? 'text-red-650' : 'text-emerald-700'}`}>
                              {selectedPat.status === 'Inadimplente' ? 'Inadimplência Identificada' : 'Conta Regularizada'}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => {
                              const toggleStatus = selectedPat.status === 'Inadimplente' ? 'Ativo' as const : 'Inadimplente' as const;
                              const updated = patients.map(p => p.id === selectedPat.id ? { ...p, status: toggleStatus } : p);
                              savePatients(updated);
                              pushNotification(`Utente ${selectedPat.name} marcado como ${toggleStatus}`);
                            }}
                            className="bg-slate-100 border text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-bold font-mono"
                          >
                            Inverter Estado Inadimplência
                          </button>
                        </div>

                        {/* Fast Payment Generator */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-4">
                          <h4 className="font-extrabold text-slate-800 uppercase">Registar Recibo de Venda / Mensalidade</h4>
                          
                          <div className="grid grid-cols-2 gap-3 text-slate-705 font-bold">
                            <div className="space-y-1.5">
                              <label>Euros Cobrados (€)</label>
                              <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={financialPaymentAmount}
                                onChange={(e) => setFinancialPaymentAmount(Number(e.target.value) || 0)}
                                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-205 rounded-xl outline-none"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label>Descrever Faturação</label>
                              <input
                                type="text"
                                value={financialPaymentDesc}
                                onChange={(e) => setFinancialPaymentDesc(e.target.value)}
                                className="w-full text-xs p-2.5 bg-slate-50 border border-[#e2e8f0] rounded-xl outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => {
                                const newPay = {
                                  id: 'pay-' + Date.now(),
                                  amount: financialPaymentAmount,
                                  date: '2026-05-25',
                                  description: financialPaymentDesc,
                                  status: 'Pago' as const
                                };
                                const updatedPats = patients.map(p => p.id === selectedPat.id ? { ...p, payments: [newPay, ...(p.payments || [])], status: 'Ativo' as const } : p);
                                savePatients(updatedPats);
                                
                                // Register transaction in ledger too
                                const newLedgerTx = {
                                  id: 'tx-' + Date.now(),
                                  type: 'Receita' as const,
                                  category: 'Consulta' as const,
                                  amount: financialPaymentAmount,
                                  date: '2026-05-25',
                                  description: `${financialPaymentDesc} - ${selectedPat.name}`,
                                  status: 'Pago' as const
                                };
                                const nextTxList = [newLedgerTx, ...transactions];
                                saveTransactions(nextTxList);

                                pushNotification(`Liquidação de ${formatMoney(financialPaymentAmount)}€ inserido no livro financeiro.`);
                              }}
                              className="bg-[#00acc1] border hover:bg-[#0097a7] text-white text-xs px-4 py-2 rounded-xl font-bold"
                            >
                              Adicionar Cobrança
                            </button>
                          </div>
                        </div>

                        {/* Listing previous invoices */}
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Histórico de Cobranças Realizadas</h4>
                          {(selectedPat.payments || []).map(p => (
                            <div key={p.id} className="bg-white border p-3 rounded-xl border-slate-150 flex items-center justify-between font-semibold">
                              <div className="space-y-0.5">
                                <p className="text-slate-800 text-xs">{p.description}</p>
                                <p className="text-[10px] font-mono text-slate-400">{p.date}</p>
                              </div>
                              <span className="font-extrabold text-[#00acc1] font-mono">+{formatMoney(p.amount)}€</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SUB-PANEL 6: DOCUMENTS DRAG AND DROP ZONE */}
                    {activeCRMTab === 'documents' && (
                      <div className="space-y-6 text-left text-xs">
                        
                        {/* Drag and drop simulator box */}
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDraggingDoc(true);
                          }}
                          onDragLeave={() => setIsDraggingDoc(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDraggingDoc(false);
                            // Synthesize file upload register
                            const randomId = 'doc-' + Date.now();
                            const docNamesPool = ['Contrato_Prestacao_Nexus.pdf', 'Relatorio_Triagem_Inicial.pdf', 'Ficha_Evolutiva_Junho.pdf', 'Anamnese_Fonoaudiologica.pdf'];
                            const selectedName = docNamesPool[Math.floor(Math.random() * docNamesPool.length)];
                            
                            const newDoc = {
                              id: randomId,
                              name: selectedName,
                              date: '2026-05-25',
                              size: '145 KB',
                              category: documentSimCategory
                            };
                            
                            const updatedPats = patients.map(p => p.id === selectedPat.id ? { ...p, documents: [newDoc, ...(p.documents || [])] } : p);
                            savePatients(updatedPats);
                            pushNotification(`Ficheiro ${selectedName} recebido por drop e integrado.`);
                          }}
                          onClick={() => {
                            const randomId = 'doc-' + Date.now();
                            const newDoc = {
                              id: randomId,
                              name: 'Relatorio_Anamnese_Carregamento.pdf',
                              date: '2026-05-25',
                              size: '320 KB',
                              category: documentSimCategory
                            };
                            const updatedPats = patients.map(p => p.id === selectedPat.id ? { ...p, documents: [newDoc, ...(p.documents || [])] } : p);
                            savePatients(updatedPats);
                            pushNotification(`Ficheiro clínico estruturado anexado.`);
                          }}
                          className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                            isDraggingDoc 
                              ? 'border-[#00acc1] bg-cyan-50/20' 
                              : 'border-slate-300 hover:border-[#00acc1] bg-white'
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Upload className="w-8 h-8 text-[#00acc1] animate-bounce" />
                            <div>
                              <p className="font-extrabold text-slate-800">Arraste e Solte Ficheiros ou Clique para carregar</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Compatível com PDF, PNG, JPG (Limitação máxima do lóbulo: 15MB)</p>
                            </div>

                            <div className="flex items-center gap-1.5 mt-2" onClick={e => e.stopPropagation()}>
                              <span className="text-[10px] text-slate-400">Classificar como:</span>
                              <select
                                value={documentSimCategory}
                                onChange={(e) => setDocumentSimCategory(e.target.value)}
                                className="bg-slate-50 border px-2 py-1 rounded text-[10px] font-bold outline-none"
                              >
                                <option value="Relatório">Relatório</option>
                                <option value="Exame">Exame</option>
                                <option value="Anamnese">Anamnese</option>
                                <option value="Contrato">Contrato</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* List other documents with previews Lightbox */}
                        <div className="space-y-2">
                          <h4 className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">Arquivos Digitais de Saúde</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(selectedPat.documents || []).map(doc => (
                              <div
                                key={doc.id}
                                onClick={() => {
                                  alert(`Visualizador Digital Integrado:\n\nFicheiro: ${doc.name}\nCategoria: ${doc.category}\nData de Emissão: ${doc.date}\nTamanho do PDF: ${doc.size}\nSituação: Assinado Digitalmente pela Coordenadora.`);
                                }}
                                className="bg-white p-3 rounded-xl border border-slate-150 flex items-center gap-3 cursor-pointer hover:border-cyan-500 hover:shadow-xs transition-all text-left"
                              >
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-slate-800 truncate text-xs">{doc.name}</p>
                                  <p className="text-[10px] text-slate-400 font-medium">
                                    {doc.category} · {doc.size}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {(selectedPat.documents || []).length === 0 && (
                              <p className="text-slate-400 italic font-normal py-4 text-center col-span-2 text-[11px]">Nenhum ficheiro anexado a este prontuário eletrónico.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </motion.div>
              </div>
            </div>
          );
        })()}

        {/* POPUP 1: NEW CLIENT ENROLLMENT DIALOG (DESKTOP PANEL) */}
        {isNewPatientModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 relative text-left"
              id="new-patient-modal"
            >
              <button
                onClick={() => setIsNewPatientModalOpen(false)}
                className="absolute right-4 top-4 hover:bg-slate-100 p-1 rounded-full text-slate-400"
                id="btn-close-patient-modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">Admissão Clínica de Utente</h3>
                  <p className="text-xs text-slate-500 mt-1">Crie a ficha clínica primária do utente para enquadramento nas especialidades clínicas do Nexus Care.</p>
                </div>

                <form onSubmit={handleAddPatient} className="space-y-4 font-semibold text-xs text-slate-800 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
                  
                  {/* Avatar generator feedback */}
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <img 
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${(newPatName || 'Aura').replace(/\s+/g, '')}`}
                      alt="Avatar provisório"
                      className="w-12 h-12 rounded-full border border-slate-200 bg-white"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-slate-800 font-bold mb-0.5">Identidade Visual do Utente</p>
                      <p className="text-[10px] text-slate-400">Avatar gerado automaticamente a partir do nome clínico fornecido.</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-705">Nome Completo do Utente *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: David Vasconcelos"
                      value={newPatName}
                      onChange={(e) => setNewPatName(e.target.value)}
                      className={`w-full text-xs p-2.5 bg-slate-50 border rounded-xl outline-none ${
                        validationErrors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:ring-1 focus:ring-[#00acc1]'
                      }`}
                    />
                    {validationErrors.name && (
                      <p className="text-[10px] text-red-600 font-bold">{validationErrors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Gênero</label>
                      <select
                        value={newPatGender}
                        onChange={(e: any) => setNewPatGender(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                      >
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Data de Nascimento</label>
                      <input
                        type="date"
                        required
                        value={newPatBirthDate}
                        onChange={(e) => setNewPatBirthDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Ficha de Email</label>
                      <input
                        type="email"
                        placeholder="nome@exemplo.com"
                        value={newPatEmail}
                        onChange={(e) => setNewPatEmail(e.target.value)}
                        className={`w-full text-xs p-2.5 bg-slate-50 border rounded-xl outline-none ${
                          validationErrors.email ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-[10px] text-red-600 font-bold">{validationErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-705">NIF / CPF Utente</label>
                      <input
                        type="text"
                        maxLength={9}
                        placeholder="NIF de 9 dígitos numéricos"
                        value={newPatNif}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setNewPatNif(val);
                        }}
                        className={`w-full text-xs p-2.5 bg-slate-50 border rounded-xl outline-none ${
                          validationErrors.nif ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {validationErrors.nif && (
                        <p className="text-[10px] text-red-600 font-bold">{validationErrors.nif}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Telemóvel Contacto *</label>
                      <input
                        type="text"
                        required
                        placeholder="+351 900 000 000"
                        value={newPatPhone}
                        onChange={(e) => {
                          setNewPatPhone(e.target.value);
                          if (!newPatWhatsapp) setNewPatWhatsapp(e.target.value); // Sync WhatsApp automatically as backup preview!
                        }}
                        className={`w-full text-xs p-2.5 bg-slate-50 border rounded-xl outline-none ${
                          validationErrors.phone ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {validationErrors.phone && (
                        <p className="text-[10px] text-red-600 font-bold">{validationErrors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-705">WhatsApp Clínico</label>
                      <input
                        type="text"
                        placeholder="+351 900 000 000"
                        value={newPatWhatsapp}
                        onChange={(e) => setNewPatWhatsapp(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-705">Endereço Residencial Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: Rua Central, nº 14, Porto"
                      value={newPatAddress}
                      onChange={(e) => setNewPatAddress(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Contacto Urgência (Familiar/Responsável)</label>
                      <input
                        type="text"
                        placeholder="Nome e número de emergência"
                        value={newPatEmergency}
                        onChange={(e) => setNewPatEmergency(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-705">Origem Comercial (Lead)</label>
                      <select
                        value={newPatLeadOrigin}
                        onChange={(e) => setNewPatLeadOrigin(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Recomendação">Recomendação</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Directo / Passagem">Directo / Passagem</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Alergias / Restrições Clínicas</label>
                      <input
                        type="text"
                        placeholder="Ex: Alergia a amendoim, asma..."
                        value={newPatAllergies}
                        onChange={(e) => setNewPatAllergies(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-705">Medicamentos Ativos</label>
                      <input
                        type="text"
                        placeholder="Preencha em caso de terapêutica existente"
                        value={newPatMeds}
                        onChange={(e) => setNewPatMeds(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Especialidade Clínica</label>
                      <select
                        value={newPatSpecialty}
                        onChange={(e: any) => {
                          const spec = e.target.value;
                          setNewPatSpecialty(spec);
                          // Suggest a responsible doctor dynamically on specialty change!
                          setNewPatDoctor(
                            spec === 'Nutrição' ? 'Dra. Mariana Soares' : spec === 'Terapia Ocupacional' ? 'Dra. Sofia Rocha' : 'Dr. Carlos Neto'
                          );
                        }}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                      >
                        {specialties.map(spec => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-705">Estatuto Inicial</label>
                      <select
                        value={newPatStatus}
                        onChange={(e: any) => setNewPatStatus(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Triagem">Triagem</option>
                        <option value="Em Alta">Em Alta</option>
                        <option value="Inadimplente">Inadimplente</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Profissional Clínico Responsável</label>
                      <select
                        value={newPatDoctor}
                        onChange={(e) => setNewPatDoctor(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                      >
                        <option value="Dr. Carlos Neto">Dr. Carlos Neto (Terapia da Fala)</option>
                        <option value="Dra. Sofia Rocha">Dra. Sofia Rocha (Terapia Ocupacional)</option>
                        <option value="Dra. Mariana Soares">Dra. Mariana Soares (Nutrição)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-705">Tags Marcadoras (Separadas por vírgula)</label>
                      <input
                        type="text"
                        placeholder="Ex: Pediatria, Autismo, Adulto"
                        value={newPatTags}
                        onChange={(e) => setNewPatTags(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-705">Histórico Inicial / Anamnese de Triagem</label>
                    <textarea
                      placeholder="Descreva as queixas relatadas pelos pais ou encaminhamentos diagnósticos..."
                      value={newPatNotes}
                      onChange={(e) => setNewPatNotes(e.target.value)}
                      className="w-full h-20 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingVisualFeedback}
                    className="w-full py-3 bg-[#00acc1] text-white hover:bg-[#0097a7] rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-cyan-100 disabled:opacity-55"
                  >
                    {isSavingVisualFeedback ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>A registar prontuário clínico...</span>
                      </>
                    ) : (
                      <span>Gravar Ficha Integral de Utente</span>
                    )}
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}

        {/* POPUP 2: NEW SESSION APPOINTMENT DIALOG (DESKTOP PANEL) */}
        {isNewAppointmentModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 relative text-left"
              id="new-appointment-modal"
            >
              <button
                onClick={() => setIsNewAppointmentModalOpen(false)}
                className="absolute right-4 top-4 hover:bg-slate-100 p-1 rounded-full text-slate-400"
                id="btn-close-app-modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">Agendar Sessão de Consulta</h3>
                  <p className="text-xs text-slate-405 mt-1">Marcar sessões regulares ou consultas de acompanhamento urgente.</p>
                </div>

                <form onSubmit={handleAddAppointment} className="space-y-3 font-semibold text-xs text-slate-850">
                  <div className="space-y-1.5">
                    <label className="text-slate-700">Selecione o Utente Registado</label>
                    <select
                      value={patients.some(p => p.id === newAppPatientId) ? newAppPatientId : (patients.length > 0 ? patients[0].id : '')}
                      onChange={(e) => setNewAppPatientId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                    >
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.specialty.split(' ')[0]})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700">Terapia Atribuída</label>
                    <select
                      value={newAppSpecialty}
                      onChange={(e: any) => setNewAppSpecialty(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                    >
                      {specialties.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Dia da Consulta</label>
                      <input
                        type="date"
                        required
                        value={newAppDate}
                        onChange={(e) => setNewAppDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Hora (HH:MM)</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: 11:30"
                        value={newAppTime}
                        onChange={(e) => setNewAppTime(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-705">Médico / Especialista Clínico</label>
                    <input
                      type="text"
                      required
                      value={newAppDoctor}
                      onChange={(e) => setNewAppDoctor(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#00acc1] text-white hover:bg-[#0097a7] rounded-xl font-bold text-xs"
                  >
                    Confirmar e Publicar Consulta
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}

        {/* POPUP 3: SERVICE CREATE/EDIT DIALOG */}
        {isNewServiceModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 relative text-left"
              id="new-service-modal"
            >
              <button
                onClick={() => {
                  setIsNewServiceModalOpen(false);
                  setEditingServiceId(null);
                  setServiceName('');
                  setServiceSpecialty('Terapia da Fala');
                  setServicePrice(50);
                  setServiceDuration(45);
                  setServiceDescription('');
                }}
                className="absolute right-4 top-4 hover:bg-slate-100 p-1 rounded-full text-slate-400"
                id="btn-close-srv-modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                    {editingServiceId ? 'Editar Serviço Clínico' : 'Registar Novo Serviço'}
                  </h3>
                  <p className="text-xs text-slate-405 mt-1">
                    Defina taxas de preços individuais e durações médias de sessão.
                  </p>
                </div>

                <form onSubmit={handleSaveService} className="space-y-3 font-semibold text-xs text-slate-850 font-sans">
                  <div className="space-y-1.5">
                    <label className="text-slate-700 font-bold">Nome do Serviço</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Consulta de Disfagia Avançada"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-705 font-bold">Especialidade Pertencente</label>
                    <select
                      value={serviceSpecialty}
                      onChange={(e: any) => setServiceSpecialty(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                    >
                      {specialties.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-750 font-bold font-sans">Valor (€)</label>
                      <input
                        type="number"
                        required
                        min="0.01"
                        step="0.01"
                        max="500"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(Number(e.target.value) || 0)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-750 font-bold font-sans">Duração (minutos)</label>
                      <input
                        type="number"
                        required
                        min="5"
                        max="240"
                        value={serviceDuration}
                        onChange={(e) => setServiceDuration(Number(e.target.value) || 0)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-755 font-bold">Descrição / Foco Clínico</label>
                    <textarea
                      placeholder="Indicação clínica geral deste serviço..."
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      className="w-full h-16 p-2.5 bg-slate-50 border border-slate-250 rounded-xl outline-none text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#00acc1] text-white hover:bg-[#0097a7] rounded-xl font-bold text-xs shadow-sm"
                  >
                    {editingServiceId ? 'Guardar Alterações' : 'Criar Novo Serviço'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* POPUP 4: TRANSACTION CREATE/EDIT DIALOG */}
        {isNewTxModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 relative text-left"
              id="new-tx-modal"
            >
              <button
                onClick={() => {
                  setIsNewTxModalOpen(false);
                  setEditingTxId(null);
                  setTxType('Receita');
                  setTxCategory('Consulta');
                  setTxAmount(45);
                  setTxDate('2026-05-25');
                  setTxDescription('');
                  setTxStatus('Pago');
                }}
                className="absolute right-4 top-4 hover:bg-slate-100 p-1 rounded-full text-slate-400"
                id="btn-close-tx-modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                    {editingTxId ? 'Editar Lançamento' : 'Registar Lançamento'}
                  </h3>
                  <p className="text-xs text-slate-405 mt-1">
                    Lance despesas de manutenção, rendas, vencimentos ou receitas avulsas.
                  </p>
                </div>

                <form onSubmit={handleSaveTransaction} className="space-y-3 font-semibold text-xs text-slate-850">
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setTxType('Receita')}
                      className={`py-1.5 rounded-lg text-center text-[10px] font-bold transition-all ${
                        txType === 'Receita'
                          ? 'bg-white text-emerald-600 shadow-xs'
                          : 'text-slate-500 hover:text-slate-850'
                      }`}
                    >
                      Receita (+)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTxType('Despesa')}
                      className={`py-1.5 rounded-lg text-center text-[10px] font-bold transition-all ${
                        txType === 'Despesa'
                          ? 'bg-white text-rose-600 shadow-xs'
                          : 'text-slate-500 hover:text-slate-850'
                      }`}
                    >
                      Despesa (-)
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700">Categoria</label>
                    <select
                      value={txCategory}
                      onChange={(e: any) => setTxCategory(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                    >
                      <option value="Consulta">Consulta / Sessão</option>
                      <option value="Material Clínico text-xs">Material Clínico</option>
                      <option value="Renda">Renda de Instalações</option>
                      <option value="Salários">Salários / Honorários</option>
                      <option value="Utilitários">Serviços / Telecomunicações</option>
                      <option value="Outros">Outros Fluxos</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Montante (€)</label>
                      <input
                        type="number"
                        required
                        min="0.01"
                        step="0.01"
                        max="10000"
                        value={txAmount}
                        onChange={(e) => setTxAmount(Number(e.target.value) || 0)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-705">Data de Liquidação</label>
                      <input
                        type="date"
                        required
                        value={txDate}
                        onChange={(e) => setTxDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-705">Estado de Pagamento</label>
                    <select
                      value={txStatus}
                      onChange={(e: any) => setTxStatus(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-bold text-slate-850"
                    >
                      <option value="Pago">Liquidado (Pago)</option>
                      <option value="Pendente">Por Liquidar (Pendente)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-705">Descrição da Transação</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Aquisição de testes e recursos digitais"
                      value={txDescription}
                      onChange={(e) => setTxDescription(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#00acc1] text-white hover:bg-[#0097a7] rounded-xl font-bold text-xs shadow-sm shadow-cyan-100"
                  >
                    {editingTxId ? 'Guardar Lançamento' : 'Efetuar Lançamento Clínico'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

      {/* FOOTER METRICS SYSTEM */}
      <footer className="py-4 border-t border-slate-200 bg-white">
        <div className="w-full px-4 md:px-8 text-center space-y-1">
          <p className="text-xs text-slate-550 font-bold uppercase tracking-widest text-[#00acc1] justify-center items-center flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00acc1]"></span> NEXUS CARE & NEXUS CAP SYSTEM-ECOSYSTEM
          </p>
          <p className="text-[10px] text-slate-400">© 2026 Nexus Care. Todos os direitos reservados. Portal clínico restrito a profissionais certificados.</p>
        </div>
      </footer>

    </div>
  );
}
