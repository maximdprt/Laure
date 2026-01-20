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
      'bg-coral-DEFAULT text-white shadow-lg hover:bg-coral-light hover:shadow-xl focus:ring-coral-DEFAULT',
    secondary:
      'bg-coral-light text-white shadow-md hover:bg-coral-DEFAULT hover:shadow-lg focus:ring-coral-DEFAULT',
    outline:
      'border-2 border-coral-DEFAULT text-coral-DEFAULT bg-white hover:bg-coral-pale/60 hover:text-coral-DEFAULT focus:ring-coral-DEFAULT',
    soft:
      'bg-coral-pale text-coral-DEFAULT shadow-md hover:bg-coral-light hover:text-white focus:ring-coral-DEFAULT',
    glow:
      'bg-coral-DEFAULT text-white shadow-glow-soft hover:bg-coral-light focus:ring-coral-DEFAULT relative',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  // Effet de brillance désactivé pour garder les boutons bien pleins et lisibles
  const ShineEffect = null

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