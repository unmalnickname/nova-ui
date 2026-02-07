# @novalabs/nova-ui

> Cyber-enterprise design system for AI fleet management

A React component library built for Nova Command and other NovaLabs applications. Features a dark theme optimized for AI agent interfaces.

## Features

- Dark theme with neon accents (Discord-inspired)
- Fully typed with TypeScript
- Storybook documentation
- Tailwind CSS styling
- Radix UI primitives for accessibility
- Framer Motion animations
- Works with Web, Tauri (Desktop), and React Native Web

## Installation

```bash
# npm
npm install @novalabs/nova-ui

# bun
bun add @novalabs/nova-ui
```

## Usage

```tsx
import { Button, Avatar, Badge } from '@novalabs/nova-ui'
import '@novalabs/nova-ui/styles.css'

function App() {
  return (
    <div>
      <Avatar
        src="/agent.png"
        alt="Friday"
        status="online"
      />
      <Badge variant="success">Active</Badge>
      <Button variant="primary">Deploy Agent</Button>
    </div>
  )
}
```

## Components

### Atoms
- `Button` - Primary actions with variants (primary, secondary, ghost, danger, success)
- `Avatar` - User/agent avatars with status indicators
- `Badge` - Status, priority, and count badges
- `Input` - Text inputs with icons
- `SearchInput` - Search with clear button
- `Textarea` - Multiline text input

### Molecules (Coming Soon)
- `AgentBadge` - Avatar + name + status
- `TaskCard` - Kanban task card
- `ChannelItem` - Sidebar channel item
- `MessageBubble` - Chat message
- `ReactionBar` - Emoji reactions

### Organisms (Coming Soon)
- `Sidebar` - Navigation sidebar
- `MessageList` - Chat messages
- `KanbanColumn` - Task column
- `CommandPalette` - Cmd+K overlay
- `ThreadPanel` - Thread slide-out

## Development

```bash
# Install dependencies
bun install

# Run Storybook
bun run dev

# Build library
bun run build

# Build Storybook
bun run build:storybook
```

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `nova-bg` | `#0f0f0f` | Primary background |
| `nova-bg-secondary` | `#18191c` | Sidebar, cards |
| `accent-primary` | `#5865F2` | Primary actions |
| `accent-success` | `#23a55a` | Online, success |
| `accent-danger` | `#f23f42` | Errors, blocked |
| `accent-cyan` | `#00e5ff` | Data, telemetry |

## License

MIT - NovaLabs
