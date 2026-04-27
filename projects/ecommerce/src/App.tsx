import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Menu, X, Star, Plus, Minus, Trash2 } from 'lucide-react'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧', category: 'Electronics', rating: 4.5, stock: 15 },
  { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', category: 'Electronics', rating: 4.8, stock: 8 },
  { id: 3, name: 'Laptop Stand', price: 49.99, image: '💻', category: 'Accessories', rating: 4.3, stock: 23 },
  { id: 4, name: 'USB-C Hub', price: 59.99, image: '🔌', category: 'Accessories', rating: 4.6, stock: 12 },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️', category: 'Electronics', rating: 4.7, stock: 5 },
  { id: 6, name: 'Webcam 4K', price: 89.99, image: '📷', category: 'Electronics', rating: 4.4, stock: 18 },
]

const categories = ['All', 'Electronics', 'Accessories']

export default function App() {
  const [cart, setCart] = useState<{id: number, qty: number}[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => 
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id)
      if (existing) {
        return prev.map(item => item.id === id ? {...item, qty: item.qty + 1} : item)
      }
      return [...prev, {id, qty: 1}]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta)
        return newQty === 0 ? null : {...item, qty: newQty}
      }
      return item
    }).filter(Boolean) as {id: number, qty: number}[])
  }

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id)
    return sum + (product?.price || 0) * item.qty
  }, 0)

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
              S
            </div>
            <span className="text-xl font-bold text-slate-800">ShopHub</span>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button 
            onClick={() => setShowCart(true)}
            className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Summer Sale 🎉
          </motion.h1>
          <p className="text-lg text-blue-100">Up to 50% off on all electronics</p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-slate-600">{product.rating}</span>
                  <span className="text-xs text-slate-400 ml-2">({product.stock} in stock)</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">${product.price}</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-bold">Shopping Cart ({cartCount})</h2>
                <button onClick={() => setShowCart(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4 flex-1 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {cart.length === 0 ? (
                  <p className="text-center text-slate-400 py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => {
                      const product = products.find(p => p.id === item.id)
                      if (!product) return null
                      return (
                        <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl">
                          <div className="text-3xl">{product.image}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-blue-600 font-bold">${product.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.id, -1)} className="p-1 rounded-full hover:bg-slate-200">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="p-1 rounded-full hover:bg-slate-200">
                              <Plus className="w-4 h-4" />
                            </button>
                            <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded-full ml-2">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow">
                    Checkout with Stripe
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
