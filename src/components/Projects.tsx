import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '',
    githubUrl: 'https://github.com',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, drag-and-drop interface, and team collaboration features.',
    tags: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
    liveUrl: 'https://prot-xi.vercel.app',
    githubUrl: 'https://github.com/Hassanbinnisar/portfolio',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Portfolio Dashboard',
    description: 'Interactive analytics dashboard for tracking portfolio performance with data visualization and real-time market data.',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'Tailwind'],
    liveUrl: 'https://prot-xi.vercel.app',
    githubUrl: 'https://github.com',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Social Media API',
    description: 'RESTful API for a social media platform with authentication, posts, comments, likes, and real-time notifications.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    liveUrl: 'https://prot-xi.vercel.app',
    githubUrl: 'https://github.com',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Weather Application',
    description: 'Beautiful weather app with location-based forecasts, interactive maps, and detailed weather analytics.',
    tags: ['React', 'OpenWeather API', 'Mapbox', 'PWA'],
    liveUrl: 'https://prot-xi.vercel.app',
    githubUrl: 'https://github.com',
    color: 'from-sky-500 to-blue-500',
  },
  {
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown support, SEO optimization, and a custom CMS for content management.',
    tags: ['Next.js', 'MDX', 'Prisma', 'Vercel'],
    liveUrl: 'https://prot-xi.vercel.app',
    githubUrl: 'https://github.com',
    color: 'from-violet-500 to-purple-500',
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/30 dark:via-slate-900/30 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-sm font-medium mb-4"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Featured{' '}
            <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            A selection of my recent work showcasing my skills in full-stack development 
            and modern web technologies.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`} />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      aria-label="View Code"
                    >
                      <Code2 className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

