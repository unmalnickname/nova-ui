import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/utils/cn'
import { SearchInput } from '@/components/atoms/Input'
import {
  LayoutDashboard,
  Settings,
  Bot,
  Plus,
  Calendar,
  Rocket,
  Search,
  Command,
} from 'lucide-react'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string[]
  group?: string
  onSelect?: () => void
}

export interface CommandPaletteProps {
  /** Is palette open */
  open?: boolean
  /** On open change */
  onOpenChange?: (open: boolean) => void
  /** Command items */
  items?: CommandItem[]
  /** Placeholder text */
  placeholder?: string
  /** On item select */
  onSelect?: (item: CommandItem) => void
}

const defaultItems: CommandItem[] = [
  {
    id: 'dashboard',
    label: 'Go to Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    shortcut: ['G', 'D'],
    group: 'General',
  },
  {
    id: 'settings',
    label: 'Open Settings',
    icon: <Settings className="h-4 w-4" />,
    shortcut: ['S', ','],
    group: 'General',
  },
  {
    id: 'summon-friday',
    label: 'Summon Friday',
    icon: <Bot className="h-4 w-4" />,
    shortcut: ['S', 'F'],
    group: 'Agents',
  },
  {
    id: 'create-agent',
    label: 'Create New Agent',
    icon: <Plus className="h-4 w-4" />,
    shortcut: ['C', 'N'],
    group: 'Agents',
  },
  {
    id: 'standup',
    label: 'Start Daily Standup',
    icon: <Calendar className="h-4 w-4" />,
    shortcut: ['S', 'D'],
    group: 'Operations',
  },
  {
    id: 'deploy',
    label: 'Deploy to Production',
    icon: <Rocket className="h-4 w-4" />,
    shortcut: ['D', 'P'],
    group: 'Operations',
  },
]

const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onOpenChange,
  items = defaultItems,
  placeholder = 'Type a command or search...',
  onSelect,
}) => {
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    if (!query) return items
    const lowerQuery = query.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.group?.toLowerCase().includes(lowerQuery)
    )
  }, [items, query])

  // Group items
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    filteredItems.forEach((item) => {
      const group = item.group || 'Commands'
      if (!groups[group]) groups[group] = []
      groups[group].push(item)
    })
    return groups
  }, [filteredItems])

  // Reset selection when query changes
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex])
        }
        break
      case 'Escape':
        onOpenChange?.(false)
        break
    }
  }

  const handleSelect = (item: CommandItem) => {
    item.onSelect?.()
    onSelect?.(item)
    onOpenChange?.(false)
  }

  let itemIndex = -1

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content
          className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-nova-bg-secondary rounded-lg border border-border-subtle shadow-2xl z-50 overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
            <Search className="h-5 w-5 text-text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-text-muted bg-nova-input rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-text-muted">
                No results found
              </div>
            ) : (
              Object.entries(groupedItems).map(([group, groupItems]) => (
                <div key={group} className="mb-2">
                  <div className="px-2 py-1 text-xs font-semibold text-text-muted uppercase tracking-wide">
                    {group}
                  </div>
                  {groupItems.map((item) => {
                    itemIndex++
                    const isSelected = itemIndex === selectedIndex
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded transition-colors',
                          isSelected
                            ? 'bg-accent-primary text-white'
                            : 'text-text-primary hover:bg-nova-hover'
                        )}
                      >
                        <span className={cn(isSelected ? 'text-white' : 'text-text-muted')}>
                          {item.icon}
                        </span>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.shortcut && (
                          <div className="flex items-center gap-1">
                            {item.shortcut.map((key, i) => (
                              <kbd
                                key={i}
                                className={cn(
                                  'px-1.5 py-0.5 text-xs rounded',
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-nova-input text-text-muted'
                                )}
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border-subtle text-xs text-text-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-nova-input rounded">↑↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-nova-input rounded">Enter</kbd> to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-accent-success rounded-full" />
              Tactical Link Active
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { CommandPalette }
