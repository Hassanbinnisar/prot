import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, Bookmark, Bell } from 'lucide-react'

interface Post {
  id: number
  author: string
  handle: string
  avatar: string
  content: string
  likes: number
  comments: number
  liked: boolean
  time: string
}

const initialPosts: Post[] = [
  { id: 1, author: 'Sarah Chen', handle: '@sarahchen', avatar: 'SC', content: 'Just shipped a new feature! Working with React and Node.js has been an amazing journey.', likes: 234, comments: 45, liked: false, time: '2h' },
  { id: 2, author: 'Alex Rivera', handle: '@arivera', avatar: 'AR', content: 'Beautiful sunset from my workspace today. Sometimes the best code comes from the best views.', likes: 567, comments: 89, liked: true, time: '4h' },
  { id: 3, author: 'Jordan Park', handle: '@jpark', avatar: 'JP', content: 'Tips for junior devs: 1. Build projects 2. Read docs 3. Ask questions 4. Never stop learning', likes: 1234, comments: 156, liked: false, time: '6h' },
]

export default function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState('')

  const toggleLike = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
  }

  const addPost = () => {
    if (!newPost.trim()) return
    const post: Post = {
      id: Date.now(),
      author: 'You',
      handle: '@you',
      avatar: 'ME',
      content: newPost,
      likes: 0,
      comments: 0,
      liked: false,
      time: 'now',
    }
    setPosts([post, ...posts])
    setNewPost('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">SocialAPI</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
              ME
            </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 p-4 mb-6"
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
              ME
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                placeholder="What's happening?"
                className="w-full resize-none border-none focus:outline-none text-slate-700 min-h-[80px]"
              />
              <div className="flex justify-between items-center pt-2 border-t">
                <button
                  onClick={addPost}
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium disabled:opacity-50 hover:bg-orange-600 transition-colors"
                >
                  Post
                </button>
              </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-red-300 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {post.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{post.author}</h3>
                  <p className="text-sm text-slate-500">{post.handle} · {post.time}</p>
                </div>

              <p className="text-slate-700 mb-3 leading-relaxed">{post.content}</p>

              <div className="flex items-center justify-between pt-3 border-t">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-red-500' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="text-slate-500 hover:text-orange-500 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  )
}
