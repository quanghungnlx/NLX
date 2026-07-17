import React, { useState } from 'react';
import AlarmDashboard from './components/AlarmDashboard';
import Checklists from './components/Checklists';
import Maintenance from './components/Maintenance';
import Troubleshooting from './components/Troubleshooting';
import Assets from './components/Assets';
import { Activity, CheckSquare, Wrench, AlertTriangle, Layers, Save, Factory } from 'lucide-react';

type Tab = 'alarm' | 'checklists' | 'maintenance' | 'troubleshooting' | 'assets';
type BoilerId = 'biomax1' | 'biomax2' | 'biomax3';

function BoilerContent({ activeTab }: { activeTab: Tab }) {
  return (
    <>
      <div className={activeTab === 'alarm' ? 'block' : 'hidden'}><AlarmDashboard /></div>
      <div className={activeTab === 'checklists' ? 'block' : 'hidden'}><Checklists /></div>
      <div className={activeTab === 'maintenance' ? 'block' : 'hidden'}><Maintenance /></div>
      <div className={activeTab === 'troubleshooting' ? 'block' : 'hidden'}><Troubleshooting /></div>
      <div className={activeTab === 'assets' ? 'block' : 'hidden'}><Assets /></div>
    </>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('alarm');
  const [activeBoiler, setActiveBoiler] = useState<BoilerId>('biomax1');
  const [factoryNames, setFactoryNames] = useState<Record<BoilerId, string>>({
    biomax1: '',
    biomax2: '',
    biomax3: ''
  });
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveFactoryName = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const tabs = [
    { id: 'alarm', label: 'Cảnh Báo', icon: Activity },
    { id: 'checklists', label: 'Checklist', icon: CheckSquare },
    { id: 'maintenance', label: 'Bảo Trì', icon: Wrench },
    { id: 'troubleshooting', label: 'Sự Cố', icon: AlertTriangle },
    { id: 'assets', label: 'Thiết Bị', icon: Layers },
  ] as const;

  const boilers = [
    { id: 'biomax1', label: 'Lò hơi BIOMAX 1' },
    { id: 'biomax2', label: 'Lò hơi BIOMAX 2' },
    { id: 'biomax3', label: 'Lò hơi BIOMAX 3' },
  ];

  return (
    <div className="flex h-screen print:h-auto overflow-hidden print:overflow-visible font-sans bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 print:hidden">
        <div className="p-6 bg-slate-950 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-xl">
            B
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-sm tracking-wide">BIOMAX</span>
            <span className="text-[10px] text-slate-400">BOILER SYSTEM v4.2</span>
          </div>
        </div>
        
        <div className="p-4 border-b border-slate-800">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block">Quản lý hệ thống</label>
          <div className="space-y-2">
            {boilers.map((boiler) => (
              <button
                key={boiler.id}
                onClick={() => setActiveBoiler(boiler.id as BoilerId)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors ${
                  activeBoiler === boiler.id 
                    ? 'bg-orange-500 text-white font-medium shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{boiler.label}</span>
                {activeBoiler === boiler.id && <span className="w-2 h-2 rounded-full bg-white"></span>}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex-1 mt-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block px-6">Phân hệ</label>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center px-6 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'border-l-4 border-orange-500 bg-slate-800 text-white' 
                    : 'border-l-4 border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-6 text-xs text-slate-500 border-t border-slate-800">
          <span className="block text-white mb-1">
            {boilers.find(b => b.id === activeBoiler)?.label}
          </span>
          Nhà máy: {factoryNames[activeBoiler] || 'Chưa cập nhật'}<br />
          Người trực: Admin
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden print:overflow-visible">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm print:hidden">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-100 text-slate-600">
                <Factory className="w-4 h-4" />
              </div>
              <h1 className="text-sm font-bold text-slate-600 uppercase tracking-tight">
                Nhà máy:
              </h1>
              <input 
                type="text" 
                value={factoryNames[activeBoiler]}
                onChange={(e) => setFactoryNames({...factoryNames, [activeBoiler]: e.target.value})}
                placeholder="Nhập tên nhà máy..."
                className="text-base font-bold text-orange-600 border-b-2 border-slate-200 bg-transparent focus:border-orange-500 focus:outline-none w-64 placeholder:text-slate-300 placeholder:font-normal"
              />
              <button 
                onClick={handleSaveFactoryName}
                className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-1.5 rounded transition-colors"
                title="Lưu tên nhà máy"
              >
                <Save className="w-5 h-5" />
              </button>
              {isSaved && <span className="text-xs font-bold text-green-600">Đã lưu!</span>}
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-slate-600 mr-2">Trạng thái:</span>
              <span className="status-pill bg-green-100 text-green-700 border border-green-200">
                ĐANG VẬN HÀNH
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
              📷 Chụp Ảnh Báo Cáo
            </button>
            <div className="group relative">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded flex items-center gap-3 text-left transition-colors">
                <div className="text-xl">📱</div>
                <div>
                  <div className="text-sm font-bold leading-tight uppercase tracking-wide">QUÉT MÃ QR</div>
                  <div className="text-[10px] font-medium opacity-90 leading-tight">Kiểm Tra Nhanh</div>
                </div>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 text-white rounded-lg shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="font-bold text-sm mb-1 text-orange-400">Kiểm Tra Nhanh</div>
                <div className="text-xs text-slate-300">Quét mã trên thân lò để truy xuất lịch sử bảo trì.</div>
                {/* Arrow */}
                <div className="absolute -top-1.5 right-6 w-3 h-3 bg-slate-800 rotate-45"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 flex-1 overflow-y-auto print:overflow-visible print:p-0">
          <div className={activeBoiler === 'biomax1' ? 'block' : 'hidden'}>
            <BoilerContent activeTab={activeTab} />
          </div>
          <div className={activeBoiler === 'biomax2' ? 'block' : 'hidden'}>
            <BoilerContent activeTab={activeTab} />
          </div>
          <div className={activeBoiler === 'biomax3' ? 'block' : 'hidden'}>
            <BoilerContent activeTab={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
}
