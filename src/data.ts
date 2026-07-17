import { Equipment, Troubleshooting, ChecklistCategory } from './types';

export const equipmentList: Equipment[] = [
  {
    id: 'e1',
    category: 'Thân lò hơi',
    items: ['Buồng đốt', 'Ống vách chất lỏng', 'Trống hơi (bao hơi)', 'Ống lửa / ống nước']
  },
  {
    id: 'e2',
    category: 'Hệ thống đốt nhiên liệu',
    items: ['Đầu đốt (Gas/Dầu)', 'Ghi xích (Than/Biomass)', 'Hệ thống cấp nhiên liệu']
  },
  {
    id: 'e3',
    category: 'Hệ thống gió - khói',
    items: ['Quạt cấp gió tươi (F.D Fan)', 'Quạt hút khói (I.D Fan)', 'Bộ sấy không khí', 'Ống khói']
  },
  {
    id: 'e4',
    category: 'Hệ thống nước cấp',
    items: ['Bơm nước cao áp', 'Bộ hâm nước (Economizer)', 'Bình khử khí', 'Hệ thống xử lý nước (Làm mềm/RO)']
  },
  {
    id: 'e5',
    category: 'Hệ thống an toàn & đo lường',
    items: ['Van an toàn', 'Kính thủy hiển thị mức nước', 'Cảm biến áp suất', 'Cảm biến nhiệt độ']
  }
];

export const troubleshootingGuide: Troubleshooting[] = [
  {
    issue: 'Cạn nước nghiêm trọng',
    cause: 'Bơm hỏng, van cấp nước kẹt, hỏng cảm biến mức nước.',
    action: 'Tuyệt đối không cấp nước vào ngay (gây nổ lò). Lập tức ngắt nhiên liệu, tắt đầu đốt, đóng van hơi chính và để lò nguội tự nhiên.'
  },
  {
    issue: 'Áp suất tăng quá mức',
    cause: 'Van an toàn bị kẹt, hệ thống tự động ngắt đầu đốt bị hỏng.',
    action: 'Giảm tải/ngắt đầu đốt thủ công. Kiểm tra van an toàn.'
  },
  {
    issue: 'Khói đen dày đặc',
    cause: 'Thiếu gió, nhiên liệu đốt không hết, béc phun dầu bị bẩn.',
    action: 'Kiểm tra lại quạt cấp gió, vệ sinh béc phun hoặc điều chỉnh lại tỷ lệ gió/nhiên liệu.'
  },
  {
    issue: 'Nhiệt độ khói thải quá cao',
    cause: 'Lò bị bám cáu cặn dày hoặc bám mụi than nhiều, làm giảm khả năng trao đổi nhiệt.',
    action: 'Lên lịch dừng lò để vệ sinh mặt trong (cáu nước) và mặt ngoài (mụi than) của ống.'
  }
];

export const maintenanceSchedules = {
  monthly: [
    'Kiểm tra và vệ sinh bộ lọc nhiên liệu, lọc nước.',
    'Kiểm tra độ rơ, bôi trơn vòng bi của quạt hút, quạt thổi và bơm nước.',
    'Kiểm tra hoạt động của các van an toàn (thử nghiệm giật tay).',
    'Kiểm tra hệ thống điện điều khiển và các đầu nối cảm biến.'
  ],
  yearly: [
    'Vệ sinh cáu cặn: Tẩy rửa cáu cặn bên trong ống vách, trống hơi bằng hóa chất chuyên dụng.',
    'Vệ sinh đường khói: Quét dọn mụi than ở các ống lửa/ống nước phía đường khói để tăng hiệu suất truyền nhiệt.',
    'Kiểm định an toàn: Phối hợp với cơ quan chức năng kiểm định lại van an toàn, áp kế và thử áp lực thủy lực (nếu cần).',
    'Thay thế vật liệu tiêu hao: Thay thế các gioăng phớt bị lão hóa, gạch chịu lửa bị nứt vỡ trong buồng đốt.'
  ]
};

export const dailyChecklist: ChecklistCategory[] = [
  {
    title: 'Kiểm tra chung',
    items: [
      { id: 'dc1', text: 'Mức nước trong bình trống hơi (không cạn/quá đầy)' },
      { id: 'dc2', text: 'Chất lượng nước (độ pH, TDS)' },
      { id: 'dc3', text: 'Áp suất làm việc hiện tại, nhiệt độ khói thải' },
      { id: 'dc4', text: 'Đầu đốt/buồng đốt (ngọn lửa, mụi than)' },
      { id: 'dc5', text: 'Thực hiện xả đáy (Blowdown) định kỳ' },
      { id: 'dc6', text: 'Kiểm tra rò rỉ (van, mặt bích, đường ống)' }
    ]
  },
  {
    title: 'Dạng 1: Lò Ống Nước (Biomass công suất lớn)',
    items: [
      { id: 'wt1', text: 'Kiểm tra vách ướt (Vách màng nước) xem có bám xỉ không' },
      { id: 'wt2', text: 'Hệ thống thổi tro (Soot blower) vận hành tốt' },
      { id: 'wt3', text: 'Kiểm tra rò rỉ bộ hâm nước (Economizer)' }
    ]
  },
  {
    title: 'Dạng 2: Lò Ống Lửa (Tầng sôi / Ghi xích nhỏ)',
    items: [
      { id: 'ft1', text: 'Kiểm tra hộp khói trước/sau không rò rỉ khói, tro' },
      { id: 'ft2', text: 'Kiểm tra xả đáy định kỳ cặn lắng' }
    ]
  },
  {
    title: 'Cụm thiết bị đặc thù Biomass',
    items: [
      { id: 'bm1', text: 'Hệ thống cấp liệu (kẹt liệu, độ căng xích, van quay)' },
      { id: 'bm2', text: 'Ghi lò (thanh ghi, bôi trơn, tốc độ ghi)' },
      { id: 'bm3', text: 'Hệ thống cào xỉ (kẹt vít tải, mực nước bể dập xỉ)' },
      { id: 'bm4', text: 'Bộ lọc bụi (chênh áp lọc túi, van giũ bụi)' }
    ]
  }
];

