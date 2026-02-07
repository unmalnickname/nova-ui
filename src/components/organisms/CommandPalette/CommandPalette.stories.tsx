import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CommandPalette } from './CommandPalette'
import { Button } from '@/components/atoms/Button'
import {
  LayoutDashboard,
  Settings,
  Bot,
  Plus,
  Calendar,
  Rocket,
  FileText,
  Users,
  Bell,
  Shield,
} from 'lucide-react'

const meta: Meta<typeof CommandPalette> = {
  title: 'Organisms/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CommandPalette>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Command Palette (Cmd+K)
        </Button>
        <CommandPalette open={open} onOpenChange={setOpen} />
      </div>
    )
  },
}

export const WithCustomItems: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const customItems = [
      {
        id: 'docs',
        label: 'Open Documentation',
        icon: <FileText className="h-4 w-4" />,
        shortcut: ['G', 'D'],
        group: 'Navigation',
      },
      {
        id: 'team',
        label: 'View Team',
        icon: <Users className="h-4 w-4" />,
        shortcut: ['G', 'T'],
        group: 'Navigation',
      },
      {
        id: 'notifications',
        label: 'Notification Settings',
        icon: <Bell className="h-4 w-4" />,
        group: 'Settings',
      },
      {
        id: 'security',
        label: 'Security Settings',
        icon: <Shield className="h-4 w-4" />,
        group: 'Settings',
      },
      {
        id: 'new-agent',
        label: 'Create Agent',
        icon: <Bot className="h-4 w-4" />,
        shortcut: ['N', 'A'],
        group: 'Actions',
      },
      {
        id: 'deploy',
        label: 'Deploy to Production',
        icon: <Rocket className="h-4 w-4" />,
        shortcut: ['D', 'P'],
        group: 'Actions',
      },
    ]
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={customItems}
          placeholder="What would you like to do?"
        />
      </div>
    )
  },
}

export const WithCallback: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [lastAction, setLastAction] = useState<string | null>(null)

    return (
      <div>
        <div className="mb-4">
          <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
        </div>
        {lastAction && (
          <div className="p-4 bg-nova-card rounded border border-border-subtle">
            <span className="text-text-muted">Last action: </span>
            <span className="text-accent-primary">{lastAction}</span>
          </div>
        )}
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          onSelect={(item) => setLastAction(item.label)}
        />
      </div>
    )
  },
}

export const KeyboardShortcutDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    // Listen for Cmd+K
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault()
          setOpen(true)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
      <div className="text-center py-8">
        <p className="text-text-muted mb-4">
          Press <kbd className="px-2 py-1 bg-nova-input rounded text-text-primary">⌘K</kbd> to open
        </p>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Or click here
        </Button>
        <CommandPalette open={open} onOpenChange={setOpen} />
      </div>
    )
  },
}
