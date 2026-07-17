import React, { useState } from 'react';
import { Layers, QrCode, Save, FileText, ChevronDown, ChevronRight, Camera, X } from 'lucide-react';

export default function Assets() {
  const [checkerName, setCheckerName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['1 - BẢN THỂ NỒI HƠI']));
  const [itemStatuses, setItemStatuses] = useState<Record<string, 'Hoạt động' | 'Bất thường'>>({});
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});
  const [itemPhotos, setItemPhotos] = useState<Record<string, string>>({});

  const handleStatusChange = (itemKey: string, status: 'Hoạt động' | 'Bất thường') => {
    setItemStatuses(prev => ({ ...prev, [itemKey]: status }));
  };

  const handleNoteChange = (itemKey: string, note: string) => {
    setItemNotes(prev => ({ ...prev, [itemKey]: note }));
  };

  const handlePhotoChange = (itemKey: string, file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setItemPhotos(prev => ({ ...prev, [itemKey]: url }));
    } else {
      setItemPhotos(prev => {
        const next = { ...prev };
        delete next[itemKey];
        return next;
      });
    }
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const handleSaveChecker = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">DANH MỤC THIẾT BỊ</h2>
            <p className="text-sm text-gray-500">Quản lý tài sản (Asset Management) toàn diện.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap justify-end print:hidden">
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Người kiểm tra:</label>
            <input 
              type="text" 
              value={checkerName}
              onChange={(e) => setCheckerName(e.target.value)}
              placeholder="Nhập tên..."
              className="text-sm border-none bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 w-32 md:w-40 font-medium text-slate-800 transition-colors"
            />
            <button 
              onClick={handleSaveChecker}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-1.5 rounded transition-colors"
              title="Lưu người kiểm tra"
            >
              <Save className="w-4 h-4" />
            </button>
            {isSaved && <span className="text-xs font-bold text-green-600">Đã lưu!</span>}
          </div>
          <div className="group relative">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <QrCode className="w-4 h-4" />
              Quét mã QR
            </button>
            <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 text-white rounded-lg shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="font-bold text-sm mb-1 text-indigo-400">Kiểm Tra Nhanh</div>
              <div className="text-xs text-slate-300">Quét mã trên thân lò để truy xuất lịch sử bảo trì.</div>
              <div className="absolute -top-1.5 right-6 w-3 h-3 bg-slate-800 rotate-45"></div>
            </div>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <FileText className="w-4 h-4" />
            Xuất PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-bold">Tên Thiết Bị</th>
                <th className="p-4 font-bold">Trạng Thái</th>
                <th className="p-4 font-bold text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  name: "1 - BẢN THỂ NỒI HƠI",
                  subItems: [
                    "Van an toàn.",
                    "Tác động ngoài lực.",
                    "Ống thủy tối.",
                    "Mặt bích của cụm điện cực.",
                    "Cụm van xả đáy kính thủy.",
                    "Cửa balong trên.",
                    "Cửa balong dưới.",
                    "Van xả khí (xả air).",
                    "Van xả nhanh,",
                    "Van xả chậm của balong.",
                    "Van xả đáy ống góp.",
                    "Van xả đáy ống góp dưới.",
                    "Van xả váng.",
                    "Van xả đáy ống góp ngang trên.",
                    "Van xả đáy ống góp ngang dưới.",
                    "Tường lò xung quanh, đầu lò.",
                    "Cửa vệ sinh buồng hơi.",
                    "Các khoang đóng mở cấp gió."
                  ]
                },
                { 
                  name: "2 - HỆ THỐNG ĐẨY GHI LÒ",
                  subItems: [
                    "Motor",
                    "Hộp truyền động",
                    "Tay biên",
                    "Hệ thống truyền động ghi lò",
                    "Dây curoa",
                    "Bu lông",
                    "Tình trạng ghi lò, bề mặt ghi.",
                    "Tình trạng bôi trơn tay biên, hộp số"
                  ]
                },
                { 
                  name: "3 - HỆ THỐNG CẤP LIỆU ĐẦU LÒ",
                  subItems: [
                    "Motor",
                    "Vít cấp liệu( pen)",
                    "Xích",
                    "Nhông, then",
                    "Bu lông",
                    "Gối đỡ"
                  ]
                },
                { 
                  name: "4 - HỆ THỐNG BĂNG TẢI LIỆU",
                  subItems: [
                    "Motor",
                    "Băng tải",
                    "Xích",
                    "Gối đỡ",
                    "Nhông, then"
                  ]
                },
                { 
                  name: "5 - HỆ THỐNG LẤY TRO GẦM LÒ",
                  subItems: [
                    "Motor",
                    "Vít lấy tro",
                    "Xích",
                    "Gối đỡ",
                    "Nhông, then"
                  ]
                },
                { 
                  name: "6 - BƠM CẤP NƯỚC",
                  subItems: [
                    "Bơm số 1",
                    "Bơm số 2",
                    "Van đầu vào bơm",
                    "Van đầu ra bơm",
                    "Gía đỡ, bu lông",
                    "Đường ống cấp nước",
                    "Van thăm nước"
                  ]
                },
                { 
                  name: "7 - BỘ HÂM NƯỚC",
                  subItems: [
                    "Van an toàn.",
                    "Nhiệt kế nước",
                    "Van đầu vào.",
                    "Van đầu ra.",
                    "Van bypass.",
                    "Van xả về bồn nước.",
                    "Van xả khí (xả air).",
                    "Tình trạng thông thoáng do bụi",
                    "Tình trạng lọt không khí"
                  ]
                },
                { 
                  name: "8 - BỘ SẤY KHÔNG KHÍ",
                  subItems: [
                    "Tình trạng thông thoáng do bụi",
                    "Tình trạng lọt không khí"
                  ]
                },
                { 
                  name: "9 - BỒN NƯỚC TRUNG GIAN",
                  subItems: [
                    "Kính thủy sáng",
                    "Bồn nước",
                    "Van phụ trợ",
                    "Tủ điều khiển",
                    "Bộ tự động cấp nước",
                    "Cọc dò mực nước"
                  ]
                },
                { 
                  name: "10 - BỘ XỬ LÝ NƯỚC",
                  subItems: [
                    "Auto van",
                    "Hoạt động hoàn nguyên hạt cation",
                    "Bơm nước cấp",
                    "Bơm hóa chất",
                    "Muối hoàn nguyên"
                  ]
                },
                { 
                  name: "11 - QUẠT HÚT",
                  subItems: [
                    "Motor",
                    "Cánh quạt",
                    "Bạc đạn ổ đỡ",
                    "Nhớt làm mát",
                    "Dây curoa",
                    "Hệ thống bơm nước làm mát",
                    "Hệ thống giá đỡ và bu lông"
                  ]
                },
                { 
                  name: "12 - QUẠT ĐẨY",
                  subItems: [
                    "Motor",
                    "Cánh quạt",
                    "Bạc đạn ổ đỡ",
                    "Nhớt làm mát",
                    "Dây curoa",
                    "Hệ thống bơm nước làm mát",
                    "Hệ thống giá đỡ và bu lông"
                  ]
                },
                { 
                  name: "13 - HỆ THỐNG CYCLONE",
                  subItems: [
                    "Hệ thống lấy tro",
                    "Thùng (phễu lấy tro)",
                    "Tình trạng đóng bánh do tro trấu"
                  ]
                },
                { 
                  name: "14 - HỆ THỐNG LỌC BỤI TÚI",
                  subItems: [
                    "Van rũ bụi",
                    "Chu trình xả khí",
                    "Áp suất khí nén",
                    "Pít tông đóng mở",
                    "Hệ thống đường ống khí nén",
                    "Vít thu hồi tro",
                    "Airlock xả tro",
                    "Lọc nước và lọc dầu cho đường khí"
                  ]
                },
                { 
                  name: "15 - MÁY NÉN KHÍ",
                  subItems: [
                    "Áp suất cài đặt",
                    "Nhớt",
                    "Dây curoa",
                    "Hệ thống van",
                    "Lọc khí đầu vào máy nén",
                    "Kẹp dòng động cơ"
                  ]
                },
                { 
                  name: "16 - ỐNG KHÓI",
                  subItems: [
                    "Gỉ sét",
                    "Cáp chằng",
                    "Dây tiếp địa"
                  ]
                },
                { 
                  name: "17 - BÌNH GÓP HƠI",
                  subItems: [
                    "Van hơi đầu vào bình góp",
                    "Van hơi đầu ra",
                    "Van an toàn.",
                    "Van xả khí (xả air).",
                    "Hệ thống van cóc ngưng"
                  ]
                },
                { 
                  name: "18 - HỆ THỐNG ĐƯỜNG ỐNG HƠI VÀ NƯỚC HỒI",
                  subItems: [
                    "Các mặt bích, cút, dây mềm",
                    "Van giảm áp",
                    "Van một chiều",
                    "Hệ thống van cóc ngưng",
                    "Hệ thống giá đỡ, đường ống"
                  ]
                },
                { 
                  name: "19 - BƠM NƯỚC HỒI",
                  subItems: [
                    "Bơm số 1",
                    "Bơm số 2",
                    "Van đầu vào",
                    "Các van xả air bơm",
                    "Áp suất khi bơm 1",
                    "Áp suất khi bơm 2"
                  ]
                },
                { 
                  name: "20 - BÌNH TÍCH",
                  subItems: [
                    "Van cấp vào bình tích",
                    "Van an toàn.",
                    "Hệ thống van xả tràn",
                    "Kính thủy sáng",
                    "Hệ thống van xả đáy",
                    "Hệ thống van xả kính thủy sáng",
                    "Hệ thống van cấp nước",
                    "Van cấp hơi đi",
                    "Gối đỡ các con lăn trượt"
                  ]
                },
                { 
                  name: "21 - HỆ THỐNG PHỤ TRỢ",
                  subItems: [
                    "Hệ thống đèn chiếu sáng",
                    "Hệ thống bơm cứu hỏa",
                    "Hệ thống điều hòa cho phòng điều khiển"
                  ]
                },
                { 
                  name: "22 - HỆ THỐNG ĐIỆN - ĐIỀU KHIỂN",
                  subItems: [
                    "Tủ điều khiển",
                    "Vệ sinh",
                    "Các đèn báo",
                    "Các nút bấm chạy dừng",
                    "Chiết áp",
                    "Các bộ hiển thị",
                    "Tình trạng hoạt động",
                    "Chạy thử kiểm tra hệ thống cảnh báo- bảo vệ",
                    "Cảnh báo quá áp hơi",
                    "Cảnh báo mức nước lò cao",
                    "Cảnh báo mức nước lò thấp",
                    "Bảo vệ cạn nước nghiêm trọng",
                    "Bảo vệ quá áp hơi",
                    "Các hệ thống rơ le bảo vệ động cơ khác",
                    "Cảnh báo cạn nước bồn nước cấp",
                    "Bảo vệ cạn nước bơm nước hồi",
                    "Bảo vệ cạn nước bơm hố ga",
                    "Đo đạc, kiểm tra"
                  ]
                },
                { name: "23 - MÁY PHÁT ĐIỆN" }
              ].map((category: { name: string, subItems?: string[] }, index) => {
                const parts = category.name.split(" - ");
                const equipName = parts.length > 1 ? parts[1] : category.name;
                const isExpanded = expandedCategories.has(category.name);
                
                return (
                  <React.Fragment key={index}>
                    <tr 
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors group bg-white cursor-pointer"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Layers className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-slate-800">{equipName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Hoạt động
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium" onClick={(e) => e.stopPropagation()}>Chi tiết</button>
                      </td>
                    </tr>
                    {isExpanded && (!category.subItems || category.subItems.length === 0) && (
                      <tr className="border-b border-slate-50 bg-slate-50/50">
                        <td colSpan={3} className="p-4 text-center text-sm text-slate-500 italic">
                          Chưa có thiết bị con nào được thêm.
                        </td>
                      </tr>
                    )}
                    {category.subItems && isExpanded && category.subItems.map((subItem, subIndex) => {
                      const itemKey = `${index}-${subIndex}`;
                      const status = itemStatuses[itemKey] || 'Hoạt động';
                      return (
                      <React.Fragment key={itemKey}>
                      <tr className="border-b border-slate-50 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <td className="p-4 pl-16">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                            <span className="text-sm text-slate-700">{subItem}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <select 
                            value={status}
                            onChange={(e) => handleStatusChange(itemKey, e.target.value as any)}
                            className={`text-xs font-medium px-2 py-1 rounded border outline-none cursor-pointer ${
                              status === 'Hoạt động' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Bất thường">Bất thường</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-slate-400 hover:text-indigo-600 text-sm font-medium">Chi tiết</button>
                        </td>
                      </tr>
                      {status === 'Bất thường' && (
                        <tr className="border-b border-slate-50 bg-red-50/10">
                          <td colSpan={3} className="p-4 pl-16">
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                                <input 
                                  type="text"
                                  placeholder={`Ghi chú sự cố cho ${subItem}...`}
                                  value={itemNotes[itemKey] || ''}
                                  onChange={(e) => handleNoteChange(itemKey, e.target.value)}
                                  className="flex-1 text-sm border border-red-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg px-3 py-2 w-full md:w-auto"
                                />
                                <label className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full md:w-auto whitespace-nowrap cursor-pointer">
                                  <Camera className="w-4 h-4" />
                                  Chụp ảnh báo cáo
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handlePhotoChange(itemKey, e.target.files?.[0] || null)}
                                  />
                                </label>
                              </div>
                              {itemPhotos[itemKey] && (
                                <div className="relative inline-block w-32 h-32 rounded-lg overflow-hidden border border-red-200 shadow-sm mt-2">
                                  <img src={itemPhotos[itemKey]} alt="Report" className="w-full h-full object-cover" />
                                  <button 
                                    onClick={() => handlePhotoChange(itemKey, null)}
                                    className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-600 rounded-full p-1 transition-colors"
                                    title="Xóa ảnh"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                      </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
