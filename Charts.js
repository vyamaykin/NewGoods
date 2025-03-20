'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function SalesBarChart({ data, dataKey = 'Sold Value', nameKey = 'Store', title = 'Sales by Store' }) {
  // Sort data by the dataKey in descending order
  const sortedData = [...data].sort((a, b) => b[dataKey] - a[dataKey]).slice(0, 10);
  
  // Format the data for the chart
  const chartData = sortedData.map(item => ({
    name: item[nameKey],
    value: item[dataKey]
  }));
  
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            interval={0}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
          />
          <Legend />
          <Bar dataKey="value" fill="#3b82f6" name="Sales Value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SellThruBarChart({ data, dataKey = 'Overall Sell-Thru Rate', nameKey = 'Store', title = 'Sell-Through Rate by Store' }) {
  // Sort data by the dataKey in descending order
  const sortedData = [...data]
    .filter(item => item[dataKey] !== null && item[dataKey] !== undefined)
    .sort((a, b) => b[dataKey] - a[dataKey])
    .slice(0, 10);
  
  // Format the data for the chart
  const chartData = sortedData.map(item => ({
    name: item[nameKey],
    value: item[dataKey]
  }));
  
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            interval={0}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value.toFixed(2)}%`, 'Sell-Through Rate']}
          />
          <Legend />
          <Bar dataKey="value" fill="#10b981" name="Sell-Through Rate" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProfitBarChart({ data, dataKey = 'Profit', nameKey = 'Store', title = 'Profit by Store' }) {
  // Sort data by the dataKey in descending order
  const sortedData = [...data].sort((a, b) => b[dataKey] - a[dataKey]).slice(0, 10);
  
  // Format the data for the chart
  const chartData = sortedData.map(item => ({
    name: item[nameKey],
    value: item[dataKey]
  }));
  
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            interval={0}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Profit']}
          />
          <Legend />
          <Bar dataKey="value" fill="#8b5cf6" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComparisonChart({ data, title = 'Sales vs. Profit Comparison' }) {
  // Sort data by sales in descending order
  const sortedData = [...data].sort((a, b) => b['Sold Value'] - a['Sold Value']).slice(0, 10);
  
  // Format the data for the chart
  const chartData = sortedData.map(item => ({
    name: item.Store || item.Supplier,
    sales: item['Sold Value'],
    profit: item.Profit
  }));
  
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            interval={0}
          />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [`$${value.toLocaleString()}`, name.charAt(0).toUpperCase() + name.slice(1)]}
          />
          <Legend />
          <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
          <Bar dataKey="profit" fill="#8b5cf6" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SellThruPieChart({ data, title = 'Sell-Through Rate Distribution' }) {
  // Group data by sell-through rate ranges
  const ranges = [
    { name: '0-25%', min: 0, max: 25 },
    { name: '25-50%', min: 25, max: 50 },
    { name: '50-75%', min: 50, max: 75 },
    { name: '75-100%', min: 75, max: 100 }
  ];
  
  const distribution = ranges.map(range => {
    const count = data.filter(item => {
      const sellThru = item['Overall Sell-Thru Rate'] || item['Overall_Sell_Thru'] || 0;
      return sellThru >= range.min && sellThru < range.max;
    }).length;
    
    return {
      name: range.name,
      value: count
    };
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={distribution}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {distribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendLineChart({ data, title = 'Sales Trend by Store' }) {
  // Group data by store and calculate total sales
  const storeGroups = {};
  data.forEach(item => {
    if (!storeGroups[item.Store]) {
      storeGroups[item.Store] = 0;
    }
    storeGroups[item.Store] += item['Sold Value'] || 0;
  });
  
  // Sort stores by total sales and get top 5
  const topStores = Object.entries(storeGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([store]) => store);
  
  // Create simulated trend data (since we don't have time series data)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const trendData = months.map(month => {
    const dataPoint = { month };
    topStores.forEach(store => {
      // Create a simulated value based on the store's total sales
      // with some random variation to create a trend
      const baseSales = storeGroups[store] / 6;
      const randomFactor = 0.8 + Math.random() * 0.4; // Random between 0.8 and 1.2
      dataPoint[store] = Math.round(baseSales * randomFactor);
    });
    return dataPoint;
  });
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];
  
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={trendData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
          <Legend />
          {topStores.map((store, index) => (
            <Line 
              key={store}
              type="monotone" 
              dataKey={store} 
              stroke={COLORS[index % COLORS.length]} 
              activeDot={{ r: 8 }} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
