export interface NursePosition {
  state: string;
  city: string;
  hospital: string;
  position: string;
  salary: number;
  contract_length: number;
  red_flags: string;
  latitude: number;
  longitude: number;
}

export interface CityData {
  state: string;
  city: string;
  positions: NursePosition[];
  avgSalary: number;
  minSalary: number;
  maxSalary: number;
  totalPositions: number;
}

export interface HospitalData {
  hospital: string;
  city: string;
  state: string;
  positions: NursePosition[];
  avgSalary: number;
  redFlags: string[];
  totalPositions: number;
}
