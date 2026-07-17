import React, { useState } from 'react';
import { AlarmStatus } from '../types';
import { AlertTriangle, AlertCircle, CheckCircle, Bell } from 'lucide-react';

export default function AlarmDashboard() {
  const [tSmoke, setTSmoke] = useState<number>(150);
  const [pChamber, setPChamber] = useState<number>(-20);
  const [tds, setTds] = useState<number>(3000);

  const getTSmokeStatus = (val: number): AlarmStatus => {
    if (val < 170) return { level: 'green', message: 'Hoạt động tốt' };
    if (val <= 220) return { level: 'yellow', message: 'Cảnh báo hiệu suất giảm. Nhắc nhở lên lịch thổi bụi ống lửa/ống nước' };
    return { level: 'red', message: 'Nguy cơ tổn hao nhiệt lượng nghiêm trọng. Kiểm tra ngay hệ thống thổi tro hoặc dừng lò vệ sinh' };
  };

  const getPChamberStatus = (val: number): AlarmStatus => {
    if (val >= -50 && val <= -10) return { level: 'green', message: 'Buồng đốt hút âm tốt' };
    return { level: 'red', message: 'Cảnh báo áp suất buồng đốt chuyển dương. Kiểm tra ngay Quạt hút khói (ID Fan) hoặc bộ lọc bụi túi vải/cyclone bị nghẹt' };
  };

  const getTdsStatus = (val: number): AlarmStatus => {
    if (val <= 3500) return { level: 'green', message: 'Hoạt động tốt' };
    if (val <= 4500) return { level: 'yellow', message: 'Yêu cầu thực hiện xả đáy (Blowdown) liên tục trong 15 giây' };
    return { level: 'red', message: 'Chất lượng nước vượt ngưỡng nguy hiểm. Nguy cơ đóng cặn nhanh. Gọi đội xử lý hóa chất nước cấp' };
  };

  const renderStatusCard = (title: string, val: number, unit: string, status: AlarmStatus) => {
    const isRed = status.level === 'red';
    const isYellow = status.level === 'yellow';
    
    let borderColor = 'border-l-4 border-green-500';
    let statusText = 'Bình Thường';
    let statusColor = 'text-green-600';
    
    if (isRed) {
      borderColor = 'border-l-4 border-red-500';
      statusText = 'Nguy Hiểm';
      statusColor = 'text-red-600';
    } else if (isYellow) {
      borderColor = 'border-l-4 border-yellow-500';
      statusText = 'Cảnh Báo';
      statusColor = 'text-yellow-600';
    }

    return (
      <div className={`card p-4 ${borderColor} flex flex-col gap-3 transition-colors duration-300`}>
        <div className="metric-label">{title}</div>
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold text-slate-800">
            {val} <span className="text-sm font-normal">{unit}</span>
          </span>
          <span className={`${statusColor} text-sm font-bold uppercase`}>{statusText}</span>
        </div>
        <p className={`text-[10px] font-medium mt-1 ${isRed ? 'text-red-700' : isYellow ? 'text-yellow-700' : 'text-emerald-700'}`}>
          {isRed || isYellow ? '⚠️' : '✅'} {status.message}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">TỔNG HỢP CẢNH BÁO</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Simulators */}
        <div className="md:col-span-1 space-y-6 card p-6">
          <h3 className="font-bold text-sm text-slate-800 border-b pb-2">NHẬP LIỆU CẢM BIẾN</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nhiệt độ khói thải (°C)</label>
              <input 
                type="range" min="100" max="300" 
                value={tSmoke} onChange={(e) => setTSmoke(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="text-right text-xs text-gray-500">{tSmoke}°C</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Áp suất buồng đốt (Pa)</label>
              <input 
                type="range" min="-100" max="10" 
                value={pChamber} onChange={(e) => setPChamber(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="text-right text-xs text-gray-500">{pChamber} Pa</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chỉ số TDS (mg/L)</label>
              <input 
                type="range" min="2000" max="6000" step="100"
                value={tds} onChange={(e) => setTds(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="text-right text-xs text-gray-500">{tds} mg/L</div>
            </div>
          </div>
        </div>

        {/* Dashboards */}
        <div className="md:col-span-2 space-y-4">
          {renderStatusCard('Nhiệt độ khói thải (T_smoke)', tSmoke, '°C', getTSmokeStatus(tSmoke))}
          {renderStatusCard('Áp suất buồng đốt (P_chamber)', pChamber, 'Pa', getPChamberStatus(pChamber))}
          {renderStatusCard('Chất lượng nước cấp (TDS)', tds, 'mg/L', getTdsStatus(tds))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 border-t-4 border-orange-500">
          <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            Thiết Bị Lỗi / Cần Bảo Trì
          </h3>
          <ul className="space-y-3">
             <li className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <span className="font-medium text-slate-700">Quạt ID Fan</span>
               </div>
               <span className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded font-bold uppercase">Rung động cao</span>
             </li>
             <li className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                 <span className="font-medium text-slate-700">Bơm nước cấp 1</span>
               </div>
               <span className="text-[10px] bg-yellow-50 text-yellow-600 border border-yellow-200 px-2 py-1 rounded font-bold uppercase">Tới hạn bảo trì</span>
             </li>
             <li className="flex justify-between items-center text-sm pb-1">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                 <span className="font-medium text-slate-700">Van xả đáy tự động</span>
               </div>
               <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded font-bold uppercase">Kẹt cơ khí</span>
             </li>
          </ul>
        </div>

        <div className="card p-6 border-t-4 border-blue-500">
          <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            Nhật Ký Hoạt Động Ca Trực
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="text-[10px] font-mono font-bold text-slate-400 mt-0.5 bg-slate-100 px-1.5 py-0.5 rounded">08:15</div>
              <div>
                <p className="text-sm font-medium text-slate-700">Xả đáy định kỳ</p>
                <p className="text-xs text-slate-500 mt-0.5">Hoàn thành bởi: Nguyễn Văn A</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-[10px] font-mono font-bold text-slate-400 mt-0.5 bg-slate-100 px-1.5 py-0.5 rounded">07:30</div>
              <div>
                <p className="text-sm font-medium text-slate-700">Ghi nhận thông số TDS</p>
                <p className="text-xs text-slate-500 mt-0.5">TDS: 3200 mg/L - Trạng thái bình thường</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-[10px] font-mono font-bold text-slate-400 mt-0.5 bg-slate-100 px-1.5 py-0.5 rounded">06:00</div>
              <div>
                <p className="text-sm font-medium text-slate-700">Bắt đầu ca trực</p>
                <p className="text-xs text-slate-500 mt-0.5">Nhận ca: Kíp 1 - Hệ thống vận hành bình thường</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
