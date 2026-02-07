import type { Meta, StoryObj } from '@storybook/react'
import { Badge, StatusBadge, PriorityBadge, CountBadge } from './Badge'
import { Zap, Bot, AlertTriangle } from 'lucide-react'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'danger', 'warning', 'info', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
}

export const Primary: Story = {
  args: {
    children: 'AI Agent',
    variant: 'primary',
  },
}

export const Success: Story = {
  args: {
    children: 'Online',
    variant: 'success',
  },
}

export const Danger: Story = {
  args: {
    children: 'Blocked',
    variant: 'danger',
  },
}

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
}

export const Info: Story = {
  args: {
    children: 'Processing',
    variant: 'info',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Core',
    variant: 'primary',
    icon: <Bot className="h-3 w-3" />,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="backlog" />
      <StatusBadge status="in-progress" />
      <StatusBadge status="ai-processing" />
      <StatusBadge status="review" />
      <StatusBadge status="completed" />
      <StatusBadge status="blocked" />
    </div>
  ),
}

export const PriorityBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PriorityBadge priority="low" />
      <PriorityBadge priority="medium" />
      <PriorityBadge priority="high" />
      <PriorityBadge priority="critical" />
    </div>
  ),
}

export const CountBadges: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CountBadge count={3} />
      <CountBadge count={12} />
      <CountBadge count={99} />
      <CountBadge count={150} max={99} />
    </div>
  ),
}

export const TaskCardExample: Story = {
  render: () => (
    <div className="bg-nova-card p-4 rounded-lg border border-border-subtle w-72">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="primary" size="sm" icon={<Bot className="h-3 w-3" />}>
          AI Task
        </Badge>
        <PriorityBadge priority="high" size="sm" />
      </div>
      <h3 className="text-text-primary font-medium mb-1">Optimize Neural Engine</h3>
      <p className="text-text-muted text-sm mb-3">Refactor spatial mapping module</p>
      <div className="flex items-center justify-between">
        <StatusBadge status="ai-processing" size="sm" />
        <span className="text-xs text-text-muted">48% complete</span>
      </div>
    </div>
  ),
}
