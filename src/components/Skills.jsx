// src/components/Skills.jsx
import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'Blockchain',
    color: 'from-orange-400 to-red-500',
    skills: ['Solidity', 'Hardhat', 'Foundry', 'Remix IDE', 'MetaMask', 'Web3.js', 'Ethers.js', 'EVM', 'ERC-20/721/1155'],
  },
  {
    title: 'AI & Data',
    color: 'from-blue-400 to-cyan-500',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'LLM APIs', 'Prompt Engineering', 'RAG Pipelines'],
  },
  {
    title: 'Languages',
    color: 'from-purple-400 to-pink-500',
    skills: ['Python', 'JavaScript ES6+', 'Solidity', 'C++', 'Java'],
  },
  {
    title: 'Frontend',
    color: 'from-green-400 to-emerald-500',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Node.js', 'REST APIs', 'React'],
  },
  {
    title: 'Tools',
    color: 'from-yellow-400 to-orange-500',
    skills: ['Git', 'GitHub', 'VS Code', 'Linux CLI', 'Agile', 'Figma'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="section-padding relative bg-gear5-navy/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit spanning blockchain development, artificial intelligence, 
            and modern web technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* LeetCode Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 glass rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Competitive Programming</h3>
              <p className="text-gray-400 mb-6">
                Consistent problem-solving practice with focus on data structures and algorithms. 
                100 Days Badge 2025 with max streak of 64 days.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">323</div>
                  <div className="text-sm text-gray-400">Problems</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">39</div>
                  <div className="text-sm text-gray-400">Hard</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">64</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Easy', count: 148, total: 323, color: 'bg-green-500' },
                { label: 'Medium', count: 136, total: 323, color: 'bg-yellow-500' },
                { label: 'Hard', count: 39, total: 323, color: 'bg-red-500' },
              ].map((difficulty) => (
                <div key={difficulty.label} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-gray-400">{difficulty.label}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(difficulty.count / difficulty.total) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 }}
                      className={`h-full ${difficulty.color} rounded-full`}
                    />
                  </div>
                  <span className="w-12 text-sm text-right text-gray-300">{difficulty.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}