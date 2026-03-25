'use client';

import { useState, useMemo } from 'react';
import { NursePosition } from '@/lib/types';

interface DataTableProps {
  data: NursePosition[];
  title?: string;
}

type SortField = 'salary' | 'hospital' | 'city' | 'position';
type SortDirection = 'asc' | 'desc';

// SortIcon component moved outside render
function SortIcon({ field, sortField, sortDirection }: { field: SortField; sortField: SortField; sortDirection: SortDirection }) {
  if (sortField !== field) return <span className="text-gray-400">⇅</span>;
  return <span className="text-blue-600">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
}

export default function DataTable({ data, title }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('salary');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    const filtered = data.filter(position => {
      const search = searchTerm.toLowerCase();
      return (
        position.hospital.toLowerCase().includes(search) ||
        position.city.toLowerCase().includes(search) ||
        position.state.toLowerCase().includes(search) ||
        position.position.toLowerCase().includes(search)
      );
    });

    filtered.sort((a, b) => {
      let aVal: string | number = a[sortField];
      let bVal: string | number = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchTerm, sortField, sortDirection]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by hospital, city, state, or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50 border-b-2 border-blue-200">
            <tr>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSort('hospital')}
              >
                <div className="flex items-center gap-2">
                  Hospital <SortIcon field="hospital" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSort('city')}
              >
                <div className="flex items-center gap-2">
                  Location <SortIcon field="city" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSort('position')}
              >
                <div className="flex items-center gap-2">
                  Position <SortIcon field="position" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSort('salary')}
              >
                <div className="flex items-center gap-2">
                  Annual Salary <SortIcon field="salary" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Contract
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSorted.map((position, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{position.hospital}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {position.city}, {position.state}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{position.position}</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">
                  ${position.salary.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{position.contract_length} weeks</td>
                <td className="px-4 py-3 text-sm">
                  {position.red_flags === 'None' ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Clean
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ⚠ Red Flag
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No positions found matching your search.
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredAndSorted.length} of {data.length} positions
      </div>
    </div>
  );
}
