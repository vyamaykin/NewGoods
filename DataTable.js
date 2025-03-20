import { useState, useEffect } from 'react';

export default function DataTable({ data, columns, filteredData, searchPlaceholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayData, setDisplayData] = useState(data || []);
  
  useEffect(() => {
    if (filteredData) {
      setDisplayData(filteredData);
    } else {
      setDisplayData(data || []);
    }
  }, [data, filteredData]);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayData(filteredData || data || []);
      return;
    }
    
    const filtered = (filteredData || data || []).filter(item => {
      return columns.some(column => {
        const value = item[column.key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    
    setDisplayData(filtered);
  }, [searchTerm, data, filteredData, columns]);
  
  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayData.length > 0 ? (
              displayData.map((item, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Showing {displayData.length} of {data ? data.length : 0} entries
      </div>
    </div>
  );
}
