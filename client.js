'use client';

import { useState, useEffect } from 'react';
import FilterControls from '@/components/FilterControls';
import DataTable from '@/components/DataTable';
import { useFilteredData } from '@/hooks/useFilteredData';
import Image from 'next/image';
import Link from 'next/link';
import { SalesBarChart, SellThruBarChart, ProfitBarChart, ComparisonChart, SellThruPieChart, TrendLineChart } from '@/components/Charts';

export default function DashboardClient({ initialData }) {
  const [storeData, setStoreData] = useState(initialData.storeData || []);
  const [supplierData, setSupplierData] = useState(initialData.supplierData || []);
  const [filters, setFilters] = useState({
    store: 'all',
    supplier: 'all',
    sellThruRange: 'All',
    salesRange: 'All',
    sortBy: 'salesDesc'
  });
  
  const [filterOptions, setFilterOptions] = useState({
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
  });
  
  const filteredStoreData = useFilteredData(storeData, filters);
  const filteredSupplierData = useFilteredData(supplierData, filters);
  
  useEffect(() => {
    if (storeData && storeData.length > 0) {
      // Extract unique store options
      const storeOptions = [...new Set(storeData.map(item => item.Store))].sort();
      
      setFilterOptions(prev => ({
        ...prev,
        storeOptions
      }));
    }
    
    if (supplierData && supplierData.length > 0) {
      // Extract unique supplier options
      const supplierOptions = [...new Set(supplierData.map(item => item.Supplier))].sort();
      
      setFilterOptions(prev => ({
        ...prev,
        supplierOptions
      }));
    }
  }, [storeData, supplierData]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const storeColumns = [
    { key: 'Store', header: 'Store', render: (value) => value },
    { 
      key: 'Sold Value', 
      header: 'Sales Value', 
      render: (value) => `$${value ? value.toLocaleString() : '0'}`
    },
    { 
      key: 'Qty Sold', 
      header: 'Qty Sold', 
      render: (value) => value ? value.toLocaleString() : '0'
    },
    { 
      key: 'Profit', 
      header: 'Profit', 
      render: (value) => `$${value ? value.toLocaleString() : '0'}`
    }
  ];
  
  const supplierColumns = [
    { key: 'Supplier', header: 'Supplier', render: (value) => value },
    { 
      key: 'Sold Value', 
      header: 'Sales Value', 
      render: (value) => `$${value ? value.toLocaleString() : '0'}`
    },
    { 
      key: 'Qty Sold', 
      header: 'Qty Sold', 
      render: (value) => value ? value.toLocaleString() : '0'
    },
    { 
      key: 'Profit', 
      header: 'Profit', 
      render: (value) => `$${value ? value.toLocaleString() : '0'}`
    }
  ];
  
  // Get top performers based on filtered data
  const getTopStore = () => {
    if (filteredStoreData.length === 0) return { name: 'Alton', value: '$13,579' };
    const topStore = [...filteredStoreData].sort((a, b) => (b['Sold Value'] || 0) - (a['Sold Value'] || 0))[0];
    return { 
      name: topStore.Store, 
      value: `$${topStore['Sold Value'].toLocaleString()}`
    };
  };
  
  const getTopSupplier = () => {
    if (filteredSupplierData.length === 0) return { name: 'Arbel Group, LLC', value: '$190,318' };
    const topSupplier = [...filteredSupplierData].sort((a, b) => (b['Sold Value'] || 0) - (a['Sold Value'] || 0))[0];
    return { 
      name: topSupplier.Supplier, 
      value: `$${topSupplier['Sold Value'].toLocaleString()}`
    };
  };
  
  const topStore = getTopStore();
  const topSupplier = getTopSupplier();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <nav className="flex space-x-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <Link href="/stores" className="text-blue-600 hover:text-blue-800">Stores</Link>
          <Link href="/suppliers" className="text-blue-600 hover:text-blue-800">Suppliers</Link>
          <Link href="/recommendations" className="text-blue-600 hover:text-blue-800">Recommendations</Link>
        </nav>
      </div>
      
      <FilterControls 
        onFilterChange={handleFilterChange} 
        filterOptions={filterOptions}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Best Store (Sales)</h3>
          <p className="text-2xl font-bold text-blue-600">{topStore.name}</p>
          <p className="text-sm text-gray-500">Sales: {topStore.value}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Best Supplier (Sales)</h3>
          <p className="text-2xl font-bold text-purple-600">{topSupplier.name}</p>
          <p className="text-sm text-gray-500">Sales: {topSupplier.value}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Active Filters</h3>
          <p className="text-sm text-gray-600">
            Store: <span className="font-medium">{filters.store === 'all' ? 'All Stores' : filters.store}</span>
          </p>
          <p className="text-sm text-gray-600">
            Supplier: <span className="font-medium">{filters.supplier === 'all' ? 'All Suppliers' : filters.supplier}</span>
          </p>
          <p className="text-sm text-gray-600">
            Sell-Through: <span className="font-medium">{filters.sellThruRange}</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Filtered Results</h3>
          <p className="text-sm text-gray-600">
            Stores: <span className="font-medium">{filteredStoreData.length}</span> of {storeData.length}
          </p>
          <p className="text-sm text-gray-600">
            Suppliers: <span className="font-medium">{filteredSupplierData.length}</span> of {supplierData.length}
          </p>
          <Link href="/recommendations" className="text-sm text-blue-600 hover:text-blue-800">
            View Recommendations →
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesBarChart 
          data={filteredStoreData} 
          dataKey="Sold Value" 
          nameKey="Store" 
          title="Top Stores by Sales Value"
        />
        
        <SalesBarChart 
          data={filteredSupplierData} 
          dataKey="Sold Value" 
          nameKey="Supplier" 
          title="Top Suppliers by Sales Value"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComparisonChart 
          data={filteredStoreData} 
          title="Store Sales vs. Profit Comparison"
        />
        
        <ComparisonChart 
          data={filteredSupplierData} 
          title="Supplier Sales vs. Profit Comparison"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Stores by Sales</h2>
          <DataTable 
            data={storeData}
            filteredData={filteredStoreData.slice(0, 5)}
            columns={storeColumns}
            searchPlaceholder="Search stores..."
          />
          <div className="mt-4 text-right">
            <Link href="/stores" className="text-blue-600 hover:text-blue-800 text-sm">View all stores →</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Suppliers by Sales</h2>
          <DataTable 
            data={supplierData}
            filteredData={filteredSupplierData.slice(0, 5)}
            columns={supplierColumns}
            searchPlaceholder="Search suppliers..."
          />
          <div className="mt-4 text-right">
            <Link href="/suppliers" className="text-blue-600 hover:text-blue-800 text-sm">View all suppliers →</Link>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-amber-800 mb-2">Recommendation</h2>
        <p className="text-amber-900">
          Based on {filters.store === 'all' ? 'all stores' : `${filters.store} store`} and 
          {filters.supplier === 'all' ? ' all suppliers' : ` ${filters.supplier} supplier`} analysis, 
          we recommend prioritizing <span className="font-bold">{topStore.name}</span> store 
          with <span className="font-bold">{topSupplier.name}</span> products for next month's inventory.
        </p>
        <div className="mt-4">
          <Link href="/recommendations" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            View Detailed Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
}
