import { NursePosition, CityData, HospitalData } from './types';
import fs from 'fs';
import path from 'path';

let cachedData: NursePosition[] | null = null;

export function getAllNurseData(): NursePosition[] {
  if (cachedData) return cachedData;

  const csvPath = path.join(process.cwd(), 'public', 'nurse_salary_database.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContent.trim().split('\n');

  cachedData = lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      state: values[0],
      city: values[1],
      hospital: values[2],
      position: values[3],
      salary: parseInt(values[4]),
      contract_length: parseInt(values[5]),
      red_flags: values[6],
      latitude: parseFloat(values[7]),
      longitude: parseFloat(values[8]),
    };
  });

  return cachedData;
}

export function getCityData(state: string, city: string): CityData | null {
  const allData = getAllNurseData();
  const cityPositions = allData.filter(
    p => p.state.toLowerCase() === state.toLowerCase() &&
         p.city.toLowerCase() === city.toLowerCase()
  );

  if (cityPositions.length === 0) return null;

  const salaries = cityPositions.map(p => p.salary);
  const avgSalary = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);

  return {
    state: cityPositions[0].state,
    city: cityPositions[0].city,
    positions: cityPositions,
    avgSalary,
    minSalary: Math.min(...salaries),
    maxSalary: Math.max(...salaries),
    totalPositions: cityPositions.length,
  };
}

export function getHospitalData(hospitalName: string): HospitalData | null {
  const allData = getAllNurseData();
  // Normalize by removing all non-alphanumeric characters for flexible matching
  const normalizeForMatch = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const searchNormalized = normalizeForMatch(hospitalName);

  const hospitalPositions = allData.filter(
    p => normalizeForMatch(p.hospital) === searchNormalized
  );

  if (hospitalPositions.length === 0) return null;

  const salaries = hospitalPositions.map(p => p.salary);
  const avgSalary = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
  const redFlags = [...new Set(hospitalPositions.map(p => p.red_flags).filter(f => f !== 'None'))];

  return {
    hospital: hospitalPositions[0].hospital,
    city: hospitalPositions[0].city,
    state: hospitalPositions[0].state,
    positions: hospitalPositions,
    avgSalary,
    redFlags,
    totalPositions: hospitalPositions.length,
  };
}

export function getAllStates(): string[] {
  const allData = getAllNurseData();
  return [...new Set(allData.map(p => p.state))].sort();
}

export function getCitiesByState(state: string): string[] {
  const allData = getAllNurseData();
  return [...new Set(
    allData.filter(p => p.state.toLowerCase() === state.toLowerCase()).map(p => p.city)
  )].sort();
}

export function getAllHospitals(): string[] {
  const allData = getAllNurseData();
  return [...new Set(allData.map(p => p.hospital))].sort();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function unslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
