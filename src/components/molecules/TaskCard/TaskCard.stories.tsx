import type { Meta, StoryObj } from '@storybook/react'
import { TaskCard, TaskCardCompact } from './TaskCard'

const meta: Meta<typeof TaskCard> = {
  title: 'Molecules/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: ['low', 'medium', 'high', 'critical'],
    },
    status: {
      control: 'select',
      options: ['backlog', 'in-progress', 'ai-processing', 'review', 'completed', 'blocked'],
    },
    variant: {
      control: 'select',
      options: ['default', 'selected', 'dragging'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TaskCard>

export const Default: Story = {
  args: {
    taskId: 'NOVA-123',
    title: 'Optimize Neural Engine Pathing',
    description: 'Refactor the spatial mapping module to reduce latency during inference cycles.',
    priority: 'high',
    tags: ['optimization', 'core'],
    assignees: [
      { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
    ],
    commentCount: 3,
    dueDate: 'Oct 24',
  },
}

export const AIProcessing: Story = {
  args: {
    taskId: 'NOVA-124',
    title: 'Generate API Documentation',
    description: 'Auto-generate OpenAPI specs from codebase annotations.',
    priority: 'medium',
    isAITask: true,
    progress: 67,
    assignees: [
      { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday', isAI: true },
    ],
    tags: ['documentation', 'auto-generated'],
  },
}

export const Blocked: Story = {
  args: {
    taskId: 'NOVA-125',
    title: 'Deploy Production Model v2.4',
    description: 'Waiting for security review approval.',
    priority: 'critical',
    status: 'blocked',
    assignees: [
      { id: '1', name: 'Nova', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova' },
      { id: '2', name: 'Shuri', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri' },
    ],
    tags: ['deployment', 'blocked'],
    commentCount: 8,
  },
}

export const Selected: Story = {
  args: {
    taskId: 'NOVA-126',
    title: 'Implement Dark Mode Toggle',
    priority: 'low',
    variant: 'selected',
    assignees: [
      { id: '1', name: 'Loki', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=loki' },
    ],
  },
}

export const Unassigned: Story = {
  args: {
    taskId: 'NOVA-127',
    title: 'Research competitor features',
    description: 'Analyze top 5 competing AI agent platforms.',
    priority: 'low',
    tags: ['research'],
  },
}

export const WithAttachments: Story = {
  args: {
    taskId: 'NOVA-128',
    title: 'Design System Documentation',
    description: 'Create comprehensive docs for nova-ui components.',
    priority: 'medium',
    assignees: [
      { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
    ],
    commentCount: 5,
    attachmentCount: 3,
    dueDate: 'Nov 1',
  },
}

export const KanbanColumn: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-text-primary">In Progress</h3>
        <span className="text-xs text-text-muted">3 tasks</span>
      </div>
      <TaskCard
        taskId="NOVA-101"
        title="Implement WebSocket handlers"
        priority="high"
        tags={['backend']}
        assignees={[
          { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
        ]}
        commentCount={2}
      />
      <TaskCard
        taskId="NOVA-102"
        title="Auto-generate test cases"
        isAITask
        progress={45}
        assignees={[
          { id: '1', name: 'Nova', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova' },
        ]}
      />
      <TaskCard
        taskId="NOVA-103"
        title="Update deployment configs"
        priority="medium"
        tags={['devops']}
        assignees={[
          { id: '1', name: 'Shuri', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri' },
          { id: '2', name: 'Loki', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=loki' },
        ]}
        dueDate="Today"
      />
    </div>
  ),
}

export const CompactList: Story = {
  render: () => (
    <div className="space-y-2">
      <TaskCardCompact
        taskId="NOVA-201"
        title="Fix memory leak in worker threads"
        status="in-progress"
        priority="high"
        assignees={[
          { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
        ]}
      />
      <TaskCardCompact
        taskId="NOVA-202"
        title="Add rate limiting to API"
        status="review"
        priority="medium"
        assignees={[
          { id: '1', name: 'Nova', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova' },
        ]}
      />
      <TaskCardCompact
        taskId="NOVA-203"
        title="Database migration blocked"
        status="blocked"
        priority="critical"
      />
    </div>
  ),
}
