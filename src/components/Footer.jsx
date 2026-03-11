// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-white/10 bg-gear5-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-display font-bold gradient-text"
          >
            Ritik Gusain
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm flex items-center gap-2"
          >
            Crafted with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Gear 5 Mode
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm"
          >
            © {currentYear} All rights reserved.
          </motion.div>
        </div>

        <div className="mt-8 h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      </div>
    </footer>
  )
}

