import { useState } from 'react';

export default function FilterControls({ 
  onFilterChange, 
  filterOptions = {
    storeOptions: [],
    supplierOptions: [],
    sellThruRanges: [
      { label: 'All', min: 0, max: 500 },
      { label: '0-25%', min: 0, max: 25 },
      { label: '25-50%', min: 25, max: 50 },
      { label: '50-75%', min: 50, max: 75 },
      { label: '75-100%', min: 75, max: 100 }
    ],
    salesRanges: [
      { label: 'All', min: 0, max: 1000000 },
      { label: '$0-$5,000', min: 0, max: 5000 },
      { label: '$5,000-$10,000', min: 5000, max: 10000 },
      { label: '$10,000+', min: 10000, max: 1000000 }
    ]
  }
}) {
  const [filters, setFilters] = useState({
    store: 'all',
    supplier: 'all',
    sellThruRange: 'All',
    salesRange: 'All',
    sortBy: 'salesDesc'
  });

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Data</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="storeFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Store
          </label>
          <select
            id="storeFilter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={filters.store}
            onChange={(e) => handleFilterChange('store', e.target.value)}
          >
            <option value="all">All Stores</option>
            {filterOptions.storeOptions.map((store, index) => (
              <option key={index} value={store}>{store}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="supplierFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Supplier
          </label>
          <select
            id="supplierFilter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={filters.supplier}
            onChange={(e) => handleFilterChange('supplier', e.target.value)}
          >
            <option value="all">All Suppliers</option>
            {filterOptions.supplierOptions.map((supplier, index) => (
              <option key={index} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="sellThruFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Sell-Through Rate
          </label>
          <select
            id="sellThruFilter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={filters.sellThruRange}
            onChange={(e) => handleFilterChange('sellThruRange', e.target.value)}
          >
            {filterOptions.sellThruRanges.map((range, index) => (
              <option key={index} value={range.label}>{range.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="salesFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Sales Value
          </label>
          <select
            id="salesFilter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={filters.salesRange}
            onChange={(e) => handleFilterChange('salesRange', e.target.value)}
          >
            {filterOptions.salesRanges.map((range, index) => (
              <option key={index} value={range.label}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          id="sortBy"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="salesDesc">Sales (High to Low)</option>
          <option value="salesAsc">Sales (Low to High)</option>
          <option value="sellThruDesc">Sell-Through Rate (High to Low)</option>
          <option value="sellThruAsc">Sell-Through Rate (Low to High)</option>
          <option value="profitDesc">Profit (High to Low)</option>
          <option value="profitAsc">Profit (Low to High)</option>
        </select>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
          onClick={() => {
            const defaultFilters = {
              store: 'all',
              supplier: 'all',
              sellThruRange: 'All',
              salesRange: 'All',
              sortBy: 'salesDesc'
            };
            setFilters(defaultFilters);
            onFilterChange(defaultFilters);
          }}
        >
          Reset Filters
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => onFilterChange(filters)}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
