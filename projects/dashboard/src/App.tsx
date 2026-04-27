import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart, Bar } from 'recharts'

const portfolioData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 61000 },
  { month: 'May', value: 58000 },
  { month: 'Jun', value: 72000 },
]

const allocationData = [
  { name: 'Stocks', value: 45, color: '#10b981' },
  { name: 'Bonds', value: 25, color: '#3b82f6' },
  { name: 'Crypto', value: 15, color: '#8b5cf6' },
  { name: 'Cash', value: 15, color: '#f59e0b' },
]

const performanceData = [
  { name: 'Portfolio', return: 12.5 },
  { name: 'S&P 500', return: 8.3 },
  { name: 'NASDAQ', return: 15.2 },
  { name: 'BTC', return: 22.1 },
]

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 185.92, change: 2.34 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, price: 142.65, change: -1.12 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 30, price: 248.50, change: 5.67 },
  { symbol: 'MSFT', name: 'Microsoft', shares: 20, price: 378.91, change: 1.89 },
]

export default function App() {
  const [selectedTime, setSelectedTime] = useState('6M')

  const totalValue = holdings.reduce((sum, h) => sum + h.shares * h.price, 0)
  const dayChange = holdings.reduce((sum, h) => sum + h.shares * h.price * (h.change / 100), 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">WealthTrack</h1>
              <p className="text-xs text-slate-500">Portfolio Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['1D', '1W', '1M', '3M', '6M', '1Y'].map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedTime === time 
                    ? 'bg-emerald-100 text-emerald-700 font-medium' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Total Value</span>
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">${totalValue.toLocaleString()}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Day Change</span>
              {dayChange >= 0 ? <ArrowUpRight className="w-5 h-5 text-emerald-500" /> : <ArrowDownRight className="w-5 h-5 text-red-500" />}
            </div>
            <p className={`text-2xl font-bold ${dayChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {dayChange >= 0 ? '+' : ''}{dayChange.toFixed(2)}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Total Return</span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">+18.42%</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-5 rounded-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Holdings</span>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{holdings.length}</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200"
          >
            <h2 className="text-lg font-semibold mb-4">Portfolio Value</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200"
          >
            <h2 className="text-lg font-semibold mb-4">Asset Allocation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {allocationData.map(item => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Holdings Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Holdings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Shares</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Change</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {holdings.map((stock, i) => (
                  <motion.tr 
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">{stock.symbol}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{stock.name}</td>
                    <td className="px-6 py-4 text-right text-sm">{stock.shares}</td>
                    <td className="px-6 py-4 text-right text-sm">${stock.price}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center gap-1 text-sm ${stock.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stock.change}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">${(stock.shares * stock.price).toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
