import React, { useState } from 'react';
import { dailyChecklist } from '../data';
import { ChecklistCategory, ChecklistItem } from '../types';
import { CheckSquare, Square, ClipboardCheck, Save } from 'lucide-react';

export default function Checklists() {
  const [categories, setCategories] = useState<ChecklistCategory[]>(dailyChecklist);
  const [checkerName, setCheckerName] = useState<string>('Nguyễn Văn A');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveChecker = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const toggleCheck = (categoryId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.title === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.id === itemId) {
              const isChecking = !item.checked;
              return {
                ...item,
                checked: isChecking,
                checker: isChecking ? (checkerName.trim() || 'Chưa rõ') : undefined,
                checkedAt: isChecking ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : undefined
              };
            }
            return item;
          })
        };
      }
      return cat;
    }));
  };

  const updateNote = (categoryId: string, itemId: string, note: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.title === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, note } : item
          )
        };
      }
      return cat;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Quy Trình Kiểm Tra Hàng Ngày</h2>
            <p className="text-sm text-gray-500">Thực hiện đầu ca và cuối ca vận hành.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Người kiểm tra:</label>
          <input 
            type="text" 
            value={checkerName}
            onChange={(e) => setCheckerName(e.target.value)}
            placeholder="Nhập tên..."
            className="text-sm border-none bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 w-40 font-medium text-slate-800 transition-colors"
          />
          <button 
            onClick={handleSaveChecker}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1.5 rounded transition-colors"
            title="Lưu người kiểm tra"
          >
            <Save className="w-4 h-4" />
          </button>
          {isSaved && <span className="text-xs font-bold text-green-600">Đã lưu!</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, idx) => (
          <div key={idx} className="card overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-sm text-slate-800 uppercase">{category.title}</h2>
              <span className="text-[11px] text-slate-500">
                {category.items.filter(i => i.checked).length}/{category.items.length}
              </span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {category.items.map(item => (
                <div key={item.id} className="py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors flex flex-col gap-2">
                  <button
                    onClick={() => toggleCheck(category.title, item.id)}
                    className="w-full text-left flex items-start gap-3 focus:outline-none"
                  >
                    <div className={`mt-0.5 shrink-0 ${item.checked ? 'text-green-600' : 'text-slate-300'}`}>
                      {item.checked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className={`text-sm ${item.checked ? 'text-slate-400 line-through' : 'font-medium text-slate-800'}`}>
                        {item.text}
                      </span>
                      {item.checked && (
                        <div className="text-[10px] text-right ml-2 shrink-0">
                          <span className="block font-bold text-slate-700">{item.checker}</span>
                          <span className="block text-slate-400">{item.checkedAt}</span>
                        </div>
                      )}
                    </div>
                  </button>
                  <div className="pl-8 flex items-center">
                    <input
                      type="text"
                      placeholder="Ghi chú thêm..."
                      value={item.note || ''}
                      onChange={(e) => updateNote(category.title, item.id, e.target.value)}
                      className="text-[11px] bg-white border border-slate-200 rounded px-2 py-1 w-full text-slate-600 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
