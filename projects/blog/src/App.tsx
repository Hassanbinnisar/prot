import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Tag, ArrowRight, Search, Menu } from 'lucide-react'

const posts = [
  { id: 1, title: 'Getting Started with React', excerpt: 'Learn the fundamentals of React and build your first component.', author: 'Hassan', date: 'Jan 15, 2024', readTime: '5 min', category: 'React', color: 'from-blue-500 to-cyan-500' },
  { id: 2, title: 'Mastering TypeScript', excerpt: 'TypeScript tips and tricks for better code quality.', author: 'Hassan', date: 'Jan 12, 2024', readTime: '8 min', category: 'TypeScript', color: 'from-blue-600 to-indigo-600' },
  { id: 3, title: 'CSS Grid Layout Guide', excerpt: 'Complete guide to CSS Grid for modern layouts.', author: 'Hassan', date: 'Jan 10, 2024', readTime: '6 min', category: 'CSS', color: 'from-purple-500 to-pink-500' },
  { id: 4, title: 'Node.js Best Practices', excerpt: 'Production-ready patterns for Node.js applications.', author: 'Hassan', date: 'Jan 8, 2024', readTime: '10 min', category: 'Node.js', color: 'from-green-500 to-emerald-500' },
  { id: 5, title: 'Database Design Patterns', excerpt: 'Designing scalable databases for modern applications.', author: 'Hassan', date: 'Jan 5, 2024', readTime: '7 min', category: 'Database', color: 'from-orange-500 to-red-500' },
  { id: 6, title: 'API Security Essentials', excerpt: 'Securing your APIs with JWT and best practices.', author: 'Hassan', date: 'Jan 3, 2024', readTime: '9 min', category: 'Security', color: 'from-red-500 to-rose-500' },
]

const categories = ['All', 'React', 'TypeScript', 'CSS', 'Node.js', 'Database', 'Security']

export default function App() {
