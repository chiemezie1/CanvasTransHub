import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarProps {
  categories: readonly string[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  isOpen: boolean
  onToggle: () => void
  setIsLoading: (isLoading: boolean) => void
}

export default function Sidebar({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  isOpen, 
  onToggle,
  setIsLoading
}: SidebarProps) {
  const handleCategoryClick = (category: string | null) => {
    setIsLoading(true)
    setSelectedCategory(category)
  }

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-background dark:bg-background-dark shadow-xl transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out overflow-y-auto`}
        style={{ top: '2rem' }}
      >
        <nav className="mt-10">
          <ul>
            <li>
              <button
                onClick={() => handleCategoryClick(null)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-gray-200 dark:text-foreground-dark dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category} className="mt-1">
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:bg-gray-200 dark:text-foreground-dark dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        onClick={onToggle}
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-r-md transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-64' : 'translate-x-0'
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </>
  )
}