// src/components/Projects.jsx
import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'
import { Github, Shield, FileCode, Database, Bot } from 'lucide-react'
import ProjectCard3D from './ProjectCard3D'

const projects = [
  {
    title: 'Escrow Smart Contract',
    description: 'Trustless Solidity contract with multi-party release conditions and dispute resolution logic. Translating 100+ real-world P2P trades into blockchain code with gas-optimized state machine.',
    tags: ['Solidity', 'Hardhat', 'ERC-20', 'Access Control', 'Sepolia'],
    icon: Shield,
    color: 'from-orange-500 to-red-600',
    status: 'In Progress',
    github: '#',
    demo: '#',
  },
  {
    title: 'Indentron',
    description: 'Dependency-free JavaScript code formatter using recursive string parsing. Runs in both browser and Node.js environments with modern ES6+ patterns and structured Git workflow.',
    tags: ['JavaScript', 'ES6+', 'Node.js', 'Parser', 'CLI'],
    icon: FileCode,
    color: 'from-yellow-400 to-orange-500',
    status: 'Completed',
    github: 'https://github.com/Ritik-gusain/indentron',
    demo: '#',
  },
  {
    title: 'AI Trading Assistant',
    description: 'LLM-powered trading assistant with RAG pipeline for market analysis. Integrates with DeFi protocols for real-time insights and automated trading strategies.',
    tags: ['Python', 'LLM APIs', 'RAG', 'Web3', 'DeFi'],
    icon: Bot,
    color: 'from-blue-400 to-cyan-500',
    status: 'In Progress',
    github: '#',
    demo: '#',
  },
  {
    title: 'NFT Marketplace',
    description: 'Full-stack NFT marketplace with minting, trading, and auction features. Built with ERC-721/1155 standards and IPFS storage for decentralized metadata.',
    tags: ['Solidity', 'React', 'IPFS', 'Ethers.js', 'Hardhat'],
    icon: Database,
    color: 'from-purple-500 to-pink-600',
    status: 'Planning',
    github: '#',
    demo: '#',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my work in blockchain development, AI engineering, and web applications.
            Each project represents real-world problem solving.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard3D key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Ritik-gusain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full text-white hover:bg-white/5 transition-all group"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}