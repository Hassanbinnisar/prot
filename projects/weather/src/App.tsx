import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Gauge, MapPin, Search } from 'lucide-react'

const cities = [
  { name: 'New York', temp: 22, condition: 'sunny', humidity: 45, wind: 12, visibility: 10, pressure: 1013 },
  { name: 'London', temp: 16, condition: 'rainy', humidity: 78, wind: 18, visibility: 8, pressure: 1008 },
  { name: 'Tokyo', temp: 26, condition: 'cloudy', humidity: 60, wind: 8, visibility: 12, pressure: 1015 },
  { name: 'Dubai', temp: 38, condition: 'sunny', humidity: 30, wind: 15, visibility: 10, pressure: 1010 },
  { name: 'Sydney', temp: 19, condition: 'cloudy', humidity: 55, wind: 22, visibility: 11, pressure: 1018 },
]

const forecast = [
  { day: 'Mon', temp: 22, icon: 'sun' },
  { day: 'Tue', temp: 24, icon: 'cloud' },
  { day: 'Wed', temp: 20, icon: 'rain' },
  { day: 'Thu', temp: 23, icon: 'sun' },
  { day: 'Fri', temp: 25, icon: 'sun' },
  { day: 'Sat', temp: 21, icon: 'cloud' },
  { day: 'Sun', temp: 19, icon: 'rain' },
]

const WeatherIcon = ({ condition, className = 'w-12 h-12' }: { condition: string, className?: string }) => {
  switch (condition) {
    case 'sunny': return <Sun className={`${className} text-yellow-500`} />
    case 'rainy': return <CloudRain className={`${className} text-blue-500`} />
    default: return <Cloud className={`${className} text-slate-400`} />
  }
}

export default function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [search, setSearch] = useState('')

  const filteredCities = cities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">WeatherNow</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 focus:outline-none"
            />
          </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{selectedCity.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-7xl font-bold">{selectedCity.temp}°</div>
              <div className="text-xl capitalize">{selectedCity.condition}</div>
            <WeatherIcon condition={selectedCity.condition} className="w-24 h-24" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Droplets, label: 'Humidity', value: `${selectedCity.humidity}%` },
            { icon: Wind, label: 'Wind', value: `${selectedCity.wind} km/h` },
            { icon: Eye, label: 'Visibility', value: `${selectedCity.visibility} km` },
            { icon: Gauge, label: 'Pressure', value: `${selectedCity.pressure} hPa` },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white"
            >
              <item.icon className="w-6 h-6 mb-2" />
              <div className="text-sm opacity-70">{item.label}</div>
              <div className="text-xl font-bold">{item.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
          <h2 className="text-white font-semibold mb-4">7-Day Forecast</h2>
          <div className="flex justify-between overflow-x-auto gap-4 pb-2">
            {forecast.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white min-w-[60px]"
              >
                <div className="text-sm mb-2">{day.day}</div>
                <WeatherIcon condition={day.icon} className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold">{day.temp}°</div>
              </motion.div>
            ))}
          </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {filteredCities.map(city => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCity.name === city.name
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
    </div>
  )
}
