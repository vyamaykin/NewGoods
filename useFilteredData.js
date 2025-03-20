import { useState, useEffect } from 'react';

export function useFilteredData(data, filters) {
  const [filteredData, setFilteredData] = useState(data || []);
  
  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }
    
    let result = [...data];
    
    // Filter by store
    if (filters.store && filters.store !== 'all') {
      result = result.filter(item => item.Store === filters.store);
    }
    
    // Filter by supplier
    if (filters.supplier && filters.supplier !== 'all') {
      result = result.filter(item => item.Supplier === filters.supplier);
    }
    
    // Filter by sell-through range
    if (filters.sellThruRange && filters.sellThruRange !== 'All') {
      const range = filters.sellThruRange.split('-');
      if (range.length === 2) {
        const min = parseFloat(range[0]);
        const max = parseFloat(range[1].replace('%', ''));
        result = result.filter(item => {
          const sellThru = item['Overall Sell-Thru Rate'] || item['Overall_Sell_Thru'] || 0;
          return sellThru >= min && sellThru <= max;
        });
      }
    }
    
    // Filter by sales range
    if (filters.salesRange && filters.salesRange !== 'All') {
      const range = filters.salesRange.replace('$', '').replace(',', '').split('-');
      if (range.length === 2) {
        const min = parseFloat(range[0]);
        const max = parseFloat(range[1].replace('+', ''));
        result = result.filter(item => {
          const sales = item['Sold Value'] || 0;
          return sales >= min && sales <= max;
        });
      } else if (filters.salesRange.includes('+')) {
        const min = parseFloat(filters.salesRange.replace('$', '').replace(',', '').replace('+', ''));
        result = result.filter(item => {
          const sales = item['Sold Value'] || 0;
          return sales >= min;
        });
      }
    }
    
    // Sort data
    if (filters.sortBy) {
      result.sort((a, b) => {
        switch (filters.sortBy) {
          case 'salesDesc':
            return (b['Sold Value'] || 0) - (a['Sold Value'] || 0);
          case 'salesAsc':
            return (a['Sold Value'] || 0) - (b['Sold Value'] || 0);
          case 'sellThruDesc':
            const bSellThru = b['Overall Sell-Thru Rate'] || b['Overall_Sell_Thru'] || 0;
            const aSellThru = a['Overall Sell-Thru Rate'] || a['Overall_Sell_Thru'] || 0;
            return bSellThru - aSellThru;
          case 'sellThruAsc':
            const aSellThruAsc = a['Overall Sell-Thru Rate'] || a['Overall_Sell_Thru'] || 0;
            const bSellThruAsc = b['Overall Sell-Thru Rate'] || b['Overall_Sell_Thru'] || 0;
            return aSellThruAsc - bSellThruAsc;
          case 'profitDesc':
            return (b['Profit'] || 0) - (a['Profit'] || 0);
          case 'profitAsc':
            return (a['Profit'] || 0) - (b['Profit'] || 0);
          default:
            return 0;
        }
      });
    }
    
    setFilteredData(result);
  }, [data, filters]);
  
  return filteredData;
}
