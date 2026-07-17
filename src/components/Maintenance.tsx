import React from 'react';
import { maintenanceSchedules } from '../data';
import { CalendarClock, Wrench, Settings, ActivitySquare } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
          <CalendarClock className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Lịch Bảo Trì Định Kỳ</h2>
          <p className="text-sm text-gray-500">Hướng dẫn và nhắc nhở bảo trì theo thời gian.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Wrench className="w-32 h-32" />
          </div>
          <h3 className="font-bold text-sm text-slate-800 mb-4 border-b pb-2 flex items-center gap-2 uppercase tracking-widest">
            Bảo trì hàng tháng
          </h3>
          <ul className="space-y-4">
            {maintenanceSchedules.monthly.map((task, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 text-sm border-b border-slate-100 pb-3 last:border-0">
                <div className="w-6 h-6 shrink-0 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-mono text-xs font-bold">
                  {idx + 1}
                </div>
                <span className="leading-relaxed font-medium">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6 relative overflow-hidden flex flex-col bg-slate-800 text-white border-slate-700">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Settings className="w-32 h-32 text-white" />
          </div>
          <h3 className="font-bold text-xs text-slate-400 mb-4 border-b border-slate-700 pb-2 flex items-center gap-2 uppercase tracking-widest">
            Bảo trì hàng 6 tháng - 1 năm (Đại tu)
          </h3>
          <ul className="space-y-4">
            {maintenanceSchedules.yearly.map((task, idx) => (
              <li key={idx} className="flex gap-3 text-slate-300 text-sm border-b border-slate-700 pb-3 last:border-0">
                <div className="w-6 h-6 shrink-0 rounded bg-slate-700 text-orange-400 flex items-center justify-center font-mono text-xs font-bold">
                  {idx + 1}
                </div>
                <span className="leading-relaxed font-medium">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
