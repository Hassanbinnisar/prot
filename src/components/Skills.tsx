import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Atom, 
  Server, 
  Database, 
  FileCode2, 
  Palette, 
  Braces,
  Layers,
  GitBranch,
  Terminal
} from 'lucide-react';

const skills = [
  { name: 'React', icon: Atom, level: 95, color: 'from-blue-400 to-cyan-400' },
  { name: 'Node.js', icon: Server, level: 90, color: 'from-green-400 to-emerald-400' },
  { name: 'Express', icon: Layers, level: 88, color: 'from-slate-400 to-gray-400' },
  { name: 'MongoDB', icon: Database, level: 85, color: 'from-green-500 to-emerald-500' },
  { name: 'HTML5', icon: FileCode2, level: 98, color: 'from-orange-400 to-red-400' },
  { name: 'CSS3', icon: Palette, level: 95, color: 'from-blue-500 to-indigo-500' },
  { name: 'JavaScript', icon: Braces, level: 95, color: 'from-yellow-400 to-amber-400' },
  { name: 'TypeScript', icon: Terminal, level: 88, color: 'from-blue-600 to-blue-400' },
  { name: 'Git', icon: GitBranch, level: 90, color: 'from-orange-500 to-red-500' },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 dark:from-slate-900/50 via-transparent to-slate-50/50 dark:to-slate-900/50" />
      
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
            className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4"
          >
            Skills & Technologies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Technologies I{' '}
            <span className="text-gradient">work with</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            My tech stack is built on modern, reliable technologies that help me 
            deliver high-quality applications efficiently.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-transparent transition-all shadow-sm hover:shadow-xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.08, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

