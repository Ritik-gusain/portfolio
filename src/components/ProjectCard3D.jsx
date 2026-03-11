// src/components/ProjectCard3D.jsx
import { useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useRelativeMousePosition } from '../hooks/useMousePosition'

export default function ProjectCard3D({ project, index }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouse = useRelativeMousePosition(cardRef)
  
  const rotateX = mouse.isInside ? (mouse.y / (mouse.rect?.height || 1) - 0.5) * -20 : 0
  const rotateY = mouse.isInside ? (mouse.x / (mouse.rect?.width || 1) - 0.5) * 20 : 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-colors duration-300 relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Project Header */}
        <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] opacity-30" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.2 : 1 }}
              transition={{ duration: 0.6 }}
            >
              <project.icon className="w-20 h-20 text-white/80 drop-shadow-lg" />
            </motion.div>
          </div>
          
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              project.status === 'Completed' ? 'bg-green-500/30 text-green-300 border border-green-500/30' :
              project.status === 'In Progress' ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/30' :
              'bg-gray-500/30 text-gray-300 border border-gray-500/30'
            }`}>
              {project.status}
            </span>
          </div>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 relative" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md text-xs bg-white/5 text-gray-300 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-300 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-2 rounded-lg hover:bg-cyan-500/10"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>
          </div>
        </div>

        <motion.div 
          className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl -z-10`}
          animate={{ opacity: isHovered ? 0.3 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ filter: 'blur(20px)' }}
        />
      </motion.div>
    </motion.div>
  )
}