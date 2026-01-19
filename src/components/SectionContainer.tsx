import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
  bgColor?: string
}

export default function SectionContainer({
  children,
  className = '',
  bgColor = 'bg-white',
}: SectionContainerProps) {
  return (
    <section className={`${bgColor} py-20 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}