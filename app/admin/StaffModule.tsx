import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Plus, Briefcase, Calendar as CalendarIcon, FileText, Settings,
  CheckCircle, Users, Activity, Trash2, Edit2, Phone, Mail, MapPin, X, Upload, Check, Zap, ChevronRight
} from 'lucide-react';
import { Specialist } from './page';

interface StaffModuleProps {
  specialists: Specialist[];
  updateSpecialists: (list: Specialist[]) => void;
  pushNotification?: (msg: string) => void;
}

export default function StaffModule({ specialists, updateSpecialists, pushNotification }: StaffModuleProps) {
  const [view, setView] = React.useState<'list' | 'detail' | 'form'>('list');
  const [selectedSpecialist, setSelectedSpecialist] = React.useState<Specialist | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Dashboard Metrics
  const activeSpecialists = specialists.filter(s => s.status === 'Ativo').length;
  
  // Form State
  const [formData, setFormData] = React.useState<Partial<Specialist>>({});

  const handleEdit = (s: Specialist) => {
    setFormData(s);
    setView('form');
  };

  const handleCreate = () => {
    setFormData({
      id: 'spec-' + Date.now(),
      name: '',
      specialty: 'Terapia da Fala',
      subspecialty: '',
      professionalId: '',
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
      bio: '',
      experience: '',
      languages: '',
      status: 'Ativo',
      tags: [],
      schedule: [],
      consultationDuration: 45,
      consultationPrice: 50,
      color: 'bg-indigo-500',
      documents: [],
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Novo'
    });
    setView('form');
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      if (pushNotification) pushNotification('Preencha os campos obrigatórios.');
      return;
    }
    
    const existingIndex = specialists.findIndex(s => s.id === formData.id);
    const updatedList = [...specialists];
    
    if (existingIndex >= 0) {
      updatedList[existingIndex] = formData as Specialist;
      if (pushNotification) pushNotification('Especialista atualizado com sucesso.');
    } else {
      updatedList.push(formData as Specialist);
      if (pushNotification) pushNotification('Novo especialista cadastrado.');
    }
    
    updateSpecialists(updatedList);
    setView('list');
  };

  const filteredSpecialists = specialists.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Especialistas e Corpo Clínico</h2>
          <p className="text-slate-500 text-xs mt-0.5">Faça a gestão completa dos profissionais da sua clínica.</p>
        </div>
        
        {view === 'list' && (
          <button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 bg-[#00acc1] hover:bg-[#009baf] text-white px-4 py-2.5 rounded-xl font-bold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs">Novo Especialista</span>
          </button>
        )}
        
        {view !== 'list' && (
          <button
            onClick={() => setView('list')}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold shadow-sm transition-all"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-xs">Voltar</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{specialists.length}</h3>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Total Profissionais</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{activeSpecialists}</h3>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Ativos</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">12</h3>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Horários Livres Hoje</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">85%</h3>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Taxa Ocupação</p>
                  </div>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="bg-white pb-6 rounded-2xl shadow-sm border border-slate-150 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 text-left">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar especialista por nome ou área..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 outline-none focus:border-cyan-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      <th className="px-4 py-3">Profissional</th>
                      <th className="px-4 py-3">Especialidade / Reg</th>
                      <th className="px-4 py-3">Contactos</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSpecialists.length > 0 ? (
                      filteredSpecialists.map(spec => (
                        <tr key={spec.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 flex items-center gap-3">
                            <img src={spec.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-100 object-cover border border-slate-200" />
                            <div>
                              <p className="text-xs font-bold text-slate-800">{spec.name}</p>
                              <div className="flex gap-1 mt-1">
                                {spec.tags.slice(0, 2).map((tag, i) => (
                                  <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-xs font-semibold text-slate-700">{spec.specialty}</p>
                            <p className="text-[10px] text-slate-500">{spec.professionalId}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-xs text-slate-600 flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {spec.email}</p>
                            <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3 text-slate-400" /> {spec.phone}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md ${spec.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${spec.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                              {spec.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => { setSelectedSpecialist(spec); setView('detail'); }}
                              className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg mr-2 transition-colors"
                            >
                              Ver Perfil
                            </button>
                            <button
                              onClick={() => handleEdit(spec)}
                              className="text-slate-400 hover:text-[#00acc1] p-1.5 bg-slate-50 hover:bg-cyan-50 rounded-lg transition-colors border border-transparent hover:border-cyan-100"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-xs">
                          Nenhum especialista encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-150 p-6 xl:p-8"
          >
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
              <div className="relative">
                <img src={formData.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Novo'} alt="Avatar Preview" className="w-16 h-16 rounded-full border-2 border-slate-200 object-cover" />
                <button className="absolute bottom-0 right-0 p-1 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 text-slate-600">
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-900">{formData.name ? 'Editar Perfil' : 'Novo Especialista'}</h3>
                <p className="text-xs text-slate-500">Preencha as informações profissionais e de contacto.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Identificação</h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Especialidade / Título</label>
                    <input
                      type="text"
                      value={formData.specialty || ''}
                      onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cédula Profissional</label>
                    <input
                      type="text"
                      value={formData.professionalId || ''}
                      onChange={e => setFormData({ ...formData, professionalId: e.target.value })}
                      placeholder="Ex: CRFA-123"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Duração Padrão (min)</label>
                    <input
                      type="number"
                      value={formData.consultationDuration || 45}
                      onChange={e => setFormData({ ...formData, consultationDuration: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Valor Sessão Base (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.consultationPrice || 50}
                      onChange={e => setFormData({ ...formData, consultationPrice: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Contactos & Status</h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Profissional *</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telemóvel</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status || 'Ativo'}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Ausente">Ausente (Férias/Licença)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resumo Curto / Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs focus:border-cyan-400 focus:bg-white resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setView('list')}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold text-white bg-[#00acc1] hover:bg-[#009baf] rounded-lg transition-colors shadow-sm"
              >
                Guardar Especialista
              </button>
            </div>
          </motion.div>
        )}

        {view === 'detail' && selectedSpecialist && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-150 p-6 text-center">
                <img src={selectedSpecialist.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-slate-50 object-cover mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">{selectedSpecialist.name}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-1">{selectedSpecialist.specialty}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedSpecialist.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {selectedSpecialist.status}
                </span>

                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>Cédula: <strong className="text-slate-800">{selectedSpecialist.professionalId}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{selectedSpecialist.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{selectedSpecialist.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>{selectedSpecialist.experience} • {selectedSpecialist.languages}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-150 p-6">
                <h4 className="text-sm font-bold text-slate-900 mb-4 text-left">Resumo Profissional</h4>
                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  {selectedSpecialist.bio || 'Biografia não preenchida.'}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-2 text-left">
                  {selectedSpecialist.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-150 overflow-hidden text-left">
                <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-indigo-500" />
                  <h4 className="text-sm font-bold text-slate-900">Agenda Base Semanal</h4>
                </div>
                <div className="p-4 bg-slate-50">
                  {selectedSpecialist.schedule.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedSpecialist.schedule.map((s, idx) => {
                        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                        return (
                          <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{days[s.dayOfWeek]}</span>
                            <span className="text-sm font-extrabold text-slate-800">{s.startTime} - {s.endTime}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Nenhum horário fixo configurado.</p>
                  )}
                </div>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
