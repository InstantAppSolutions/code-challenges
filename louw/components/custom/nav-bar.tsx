import Image from 'next/image'
import { ThemeButton } from './buttons/theme-button'

export default function NavBar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Image
              src="/todo.svg"
              alt="Todo Logo"
              width={48}
              height={48}
              priority
            />
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <ThemeButton />
          </div>
        </nav>
      </header>

      {children}
    </div>
  )
}
