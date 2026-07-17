import React from 'react';
import { troubleshootingGuide } from '../data';
import { ShieldAlert, Info, AlertTriangle } from 'lucide-react';

export default function Troubleshooting() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hướng Dẫn Xử Lý Sự Cố Nhanh</h2>
          <p className="text-sm text-gray-500">Tra cứu nhanh khi gặp lỗi bất thường.</p>
        </div>
      </div>

      <div className="space-y-4">
        {troubleshootingGuide.map((item, idx) => (
          <div key={idx} className="card p-4 bg-red-50 border-red-100 flex flex-col hover:shadow-md transition-shadow">
            <h2 className="font-bold text-sm text-red-800 mb-3 flex items-center gap-2">
              🚨 {item.issue}
            </h2>
            <div className="flex-1 space-y-4">
              <div className="bg-white p-3 rounded border border-red-200 shadow-sm">
                <div className="text-[11px] font-bold text-red-600 uppercase mb-1">Hành động xử lý khẩn cấp</div>
                <div className="text-xs leading-relaxed bg-slate-900 text-white p-3 rounded font-medium mt-2">
                  {item.action.split('. ').map((act, i) => (
                    <div key={i}>- {act}</div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border border-slate-200 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                <div className="text-[11px] font-bold text-slate-800 uppercase mb-1">Nguyên nhân có thể</div>
                <div className="text-xs text-slate-600">{item.cause}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
