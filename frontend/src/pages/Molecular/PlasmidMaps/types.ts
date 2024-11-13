export interface Plasmid {
  id: string;
  name: string;
  vector: string;
  size: number;
  resistance: string[];
  features: string[];
  sequence: string;
  created_at: string;
  created_by: string;
  description: string;
  copy_number: string;
  notes?: string;
} 