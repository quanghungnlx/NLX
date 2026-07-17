export type AlarmLevel = 'green' | 'yellow' | 'red';

export interface AlarmStatus {
  level: AlarmLevel;
  message: string;
}

export interface Equipment {
  id: string;
  category: string;
  items: string[];
}

export interface Troubleshooting {
  issue: string;
  cause: string;
  action: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked?: boolean;
  checker?: string;
  checkedAt?: string;
  note?: string;
}

export interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

export interface AssetChecklistItem {
  name: string;
  action: string;
  frequency: string;
}

export interface AssetChecklistGroup {
  name: string;
  items: AssetChecklistItem[];
}

export interface AssetChecklistCategory {
  category: string;
  groups: AssetChecklistGroup[];
}
