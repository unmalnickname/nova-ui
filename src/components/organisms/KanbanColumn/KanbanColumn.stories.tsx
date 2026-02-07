import type { Meta, StoryObj } from '@storybook/react'
import { KanbanColumn, KanbanBoard } from './KanbanColumn'

const meta: Meta<typeof KanbanColumn> = {
  title: 'Organisms/KanbanColumn',
  component: KanbanColumn,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof KanbanColumn>

const backlogTasks = [
  {
    id: '1',
    taskId: 'NOVA-101',
    title: 'Research competitor features',
    description: 'Analyze top 5 AI platforms',
    priority: 'low' as const,
    tags: ['research'],
  },
  {
    id: '2',
    taskId: 'NOVA-102',
    title: 'Design new dashboard layout',
    priority: 'medium' as const,
    assignees: [
      { id: '1', name: 'Loki', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=loki' },
    ],
  },
]

const inProgressTasks = [
  {
    id: '3',
    taskId: 'NOVA-103',
    title: 'Implement WebSocket handlers',
    description: 'Real-time message handling',
    priority: 'high' as const,
    tags: ['backend', 'core'],
    assignees: [
      { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
    ],
    commentCount: 5,
  },
  {
    id: '4',
    taskId: 'NOVA-104',
    title: 'Auto-generate test cases',
    isAITask: true,
    progress: 67,
    assignees: [
      { id: '1', name: 'Nova', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova' },
    ],
  },
  {
    id: '5',
    taskId: 'NOVA-105',
    title: 'Update deployment configs',
    priority: 'medium' as const,
    tags: ['devops'],
    dueDate: 'Today',
    assignees: [
      { id: '1', name: 'Shuri', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri' },
    ],
  },
]

const reviewTasks = [
  {
    id: '6',
    taskId: 'NOVA-106',
    title: 'API documentation review',
    priority: 'medium' as const,
    assignees: [
      { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
      { id: '2', name: 'Nova', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova' },
    ],
    commentCount: 12,
  },
]

const completedTasks = [
  {
    id: '7',
    taskId: 'NOVA-100',
    title: 'Set up CI/CD pipeline',
    status: 'completed' as const,
    assignees: [
      { id: '1', name: 'Shuri', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri' },
    ],
  },
]

export const Default: Story = {
  args: {
    title: 'In Progress',
    color: 'primary',
    tasks: inProgressTasks,
  },
}

export const Backlog: Story = {
  args: {
    title: 'Backlog',
    color: 'default',
    tasks: backlogTasks,
  },
}

export const AIProcessing: Story = {
  args: {
    title: 'AI Processing',
    color: 'cyan',
    tasks: [
      {
        id: '1',
        taskId: 'NOVA-201',
        title: 'Generate API docs',
        isAITask: true,
        progress: 45,
        assignees: [
          { id: '1', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
        ],
      },
      {
        id: '2',
        taskId: 'NOVA-202',
        title: 'Code review analysis',
        isAITask: true,
        progress: 82,
        assignees: [
          { id: '1', name: 'Nova', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova' },
        ],
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    title: 'Done',
    color: 'success',
    tasks: [],
  },
}

export const FullBoard: Story = {
  render: () => (
    <KanbanBoard>
      <KanbanColumn title="Backlog" color="default" tasks={backlogTasks} />
      <KanbanColumn title="In Progress" color="primary" tasks={inProgressTasks} />
      <KanbanColumn title="Review" color="warning" tasks={reviewTasks} />
      <KanbanColumn title="Done" color="success" tasks={completedTasks} />
    </KanbanBoard>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const WithMaxVisible: Story = {
  args: {
    title: 'All Tasks',
    tasks: [...backlogTasks, ...inProgressTasks, ...reviewTasks],
    maxVisible: 3,
  },
}
