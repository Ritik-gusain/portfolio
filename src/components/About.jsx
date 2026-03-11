// src/components/About.jsx
import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'
import { Shield, Cpu, Code, Zap } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Smart Contract Security',
    description: 'Cyfrin Updraft certified with expertise in EVM security patterns and vulnerability detection.',
  },
  {
    icon: Cpu,
    title: 'AI Engineering',
    description: 'Building intelligent systems with LLM integration, RAG pipelines, and prompt engineering.',
  },
  {
    icon: Code,
    title: 'Blockchain Development',
    description: 'Solidity, Hardhat, Foundry expert with 100+ real-world P2P escrow transactions experience.',
  },
  {
    icon: Zap,
    title: 'Algorithmic Excellence',
    description: '323 LeetCode problems solved including 39 Hard, demonstrating strong problem-solving skills.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Final-year BCA student at IITM Janakpuri (CGPA 8.49/10) with a passion for 
                decentralized technologies and artificial intelligence. My journey in blockchain 
                started with real-world P2P trading, where I facilitated 100+ zero-dispute transactions 
                as a trusted escrow agent.
              </p>
              <p>
                This hands-on experience directly translates to my smart contract development 
                approach—building secure, efficient, and battle-tested code. Combined with my 
                AI expertise from the Generative AI Mastermind program, I bring a unique 
                perspective to Web3 development.
              </p>
              <p>
                When I'm not coding, you'll find me solving algorithmic challenges (64-day 
                max streak on LeetCode!) or exploring the latest in DeFi protocols.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400">8.49</div>
                <div className="text-sm text-gray-400">CGPA</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-pink-400">2026</div>
                <div className="text-sm text-gray-400">Graduation</div>
              </div>
            </div>
          </motion.div>

          {/* Right Features Grid */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 group hover:border-cyan-500/50 transition-all duration-300 border border-transparent"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 group-hover:from-cyan-500/30 group-hover:to-pink-500/30 transition-all">
                    <feature.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}