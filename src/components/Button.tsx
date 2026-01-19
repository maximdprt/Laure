import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'soft' | 'glow'
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden group'

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-energy-blue via-energy-violet to-energy-gold text-white hover:shadow-glow-violet focus:ring-energy-violet shadow-lg hover:shadow-xl',
    secondary:
      'bg-gradient-to-r from-energy-green to-energy-blue text-white hover:shadow-glow-green focus:ring-energy-green shadow-lg hover:shadow-xl',
    outline:
      'border-2 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-light-blue hover:to-light-violet hover:border-transparent focus:ring-energy-blue bg-white hover:shadow-lg',
    soft:
      'bg-gradient-to-r from-light-violet to-light-blue text-gray-800 hover:from-light-blue hover:to-light-green focus:ring-energy-violet shadow-md hover:shadow-lg',
    glow:
      'bg-gradient-to-r from-energy-blue via-energy-violet to-energy-gold text-white shadow-glow-violet hover:shadow-glow-soft focus:ring-energy-violet relative',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  // Effet de brillance pour les boutons glow et primary
  const ShineEffect = variant === 'glow' || variant === 'primary' ? (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6 }}
    />
  ) : null

  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {ShineEffect}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {ShineEffect}
        <span className="relative z-10">{children}</span>
      </motion.a>
    )
  }

  return buttonContent
}