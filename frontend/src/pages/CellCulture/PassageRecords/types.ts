export interface PassageRecord {
  id: string;
  cell_line_id: string;
  cell_line_name: string;
  passage_number: number;
  date: string;
  split_ratio: string;
  confluence: number;
  viability: number;
  cell_count: number;
  morphology: 'Normal' | 'Abnormal' | 'Mixed';
  growth_status: 'Good' | 'Fair' | 'Poor';
  media_type: string;
  media_lot: string;
  performed_by: string;
  notes: string;
  images?: string[];
  next_passage_due?: string;
  alerts?: string[];
} 