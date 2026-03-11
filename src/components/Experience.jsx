// src/components/Experience.jsx
import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'
import { Briefcase, Users, Award, BookOpen } from 'lucide-react'

const experiences = [
  {
    title: 'Trusted Middleman — Escrow Agent',
    company: 'Dedicated Discord Trading Server',
    period: '2023 – Present',
    type: 'Remote',
    description: 'Facilitated 100+ P2P trades with zero-dispute, zero-loss record. Securing assets and verifying dual-side delivery, directly mirroring DeFi smart-contract escrow mechanics.',
    achievements: [
      '100+ successful trades with 100% safety record',
      'Real-time fraud detection and prevention',
      'Pre-trade due diligence and reputation verification',
    ],
    icon: Briefcase,
    color: 'from-green-400 to-emerald-600',
  },
  {
    title: 'Community Moderator',
    company: 'Web3 & Gaming Servers (5,000+ Members)',
    period: '2023 – Present',
    type: 'Remote',
    description: 'Moderated 5 servers; served as live Web3 knowledge resource answering user questions on wallets, DeFi protocols, and NFTs in real-time.',
    achievements: [
      'Managed 5,000+ combined community members',
      'Real-time Web3 education and support',
      'Policy coordination and event management',
    ],
    icon: Users,
    color: 'from-blue-400 to-cyan-600',
  },
]

const certifications = [
  {
    title: 'Blockchain Basics',
    provider: 'Cyfrin Updraft',
    details: 'EVM · Smart Contracts · DeFi · Wallets · NFTs · Consensus',
    status: 'Verified',
    description: 'Industry-recognized Web3 certification used by engineers at Chainlink, OpenZeppelin, and Alchemy.',
    icon: Award,
  },
  {
    title: 'Generative AI Mastermind',
    provider: 'Outskill',
    details: 'LLM Architecture · Prompt Engineering · AI API Integration',
    date: 'May 2025',
    description: 'Intensive workshop on LLM fundamentals and AI-augmented software development.',
    icon: BookOpen,
  },
  {
    title: 'Front-End Development',
    provider: 'DUCAT Institute Delhi',
    details: 'HTML5 · CSS3 · JavaScript ES6+ · Responsive Design',
    date: 'Jul – Aug 2025',
    description: '6-week hands-on intensive with real DevTools and cross-browser workflows.',
    icon: BookOpen,
  },
]

function TimelineItem({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-pink-500 md:left-1/2 md:-translate-x-px" />

      {/* Timeline Dot */}
      <div className={`absolute left-0 top-0 w-4 h-4 rounded-full bg-gradient-to-r ${experience.color} md:left-1/2 md:-translate-x-2 -translate-x-2`} />

      <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8 md:text-right'}`}>
        <div className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 border border-transparent">
          <div className={`flex items-center gap-3 mb-3 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-lg bg-gradient-to-r ${experience.color}`}>
              <experience.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-cyan-400 font-medium">{experience.period}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{experience.company} · {experience.type}</p>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{experience.description}</p>

          <ul className={`space-y-2 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
            {experience.achievements.map((achievement, i) => (
              <li key={i} className={`flex items-center gap-2 text-sm text-gray-400 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="section-padding relative bg-gear5-navy/20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Experience & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-world blockchain experience combined with industry-recognized certifications.
          </p>
        </motion.div>

        {/* Work Experience Timeline */}
        <div className="space-y-12 mb-20">
          {experiences.map((experience, index) => (
            <TimelineItem key={experience.title} experience={experience} index={index} />
          ))}
        </div>

        {/* Certifications Grid */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-2xl font-bold text-center mb-8 text-white"
        >
          Certifications
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <cert.icon className="w-5 h-5 text-white" />
                </div>
                {cert.status && (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                    {cert.status}
                  </span>
                )}
              </div>

              <h4 className="text-lg font-bold text-white mb-1">{cert.title}</h4>
              <p className="text-cyan-400 text-sm mb-2">{cert.provider}</p>
              <p className="text-gray-500 text-xs mb-3">{cert.details}</p>
              {cert.date && <p className="text-gray-500 text-xs mb-3">{cert.date}</p>}
              <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 glass rounded-3xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-cyan-400">IITM Janakpuri, Delhi</p>
                  <p className="text-gray-400 text-sm">2023 – 2026 · CGPA: 8.49/10</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Coursework: Data Structures & Algorithms · DBMS · Operating Systems · Computer Networks · Web Technologies
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Senior Secondary — Science Stream (CBSE)</h4>
                  <p className="text-cyan-400">Spring Meadows Public School, Delhi</p>
                  <p className="text-gray-400 text-sm">12th: 60% · 10th (2021): 72%</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center gear5-pulse">
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text">8.49</div>
                    <div className="text-sm text-gray-400">CGPA</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm gear5-float">
                  2026
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}