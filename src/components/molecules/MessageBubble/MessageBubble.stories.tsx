import type { Meta, StoryObj } from '@storybook/react'
import { MessageBubble, SystemMessage } from './MessageBubble'
import { Zap } from 'lucide-react'

const meta: Meta<typeof MessageBubble> = {
  title: 'Molecules/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'system', 'self'],
    },
    authorStatus: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'idle', 'processing'],
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MessageBubble>

export const Default: Story = {
  args: {
    author: 'Friday',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday',
    content: 'Analysis of the last dataset is complete. I\'ve indexed 4.2 million entries with a 99.8% confidence interval. Ready for next task.',
    timestamp: '10:06 AM',
    isAI: true,
    agentBadge: 'Core',
    authorStatus: 'online',
  },
}

export const HumanMessage: Story = {
  args: {
    author: 'Commander',
    avatarSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=commander',
    content: 'Status check on regional data synthesis. Who is available?',
    timestamp: '10:05 AM',
    authorStatus: 'online',
  },
}

export const SelfMessage: Story = {
  args: {
    author: 'You',
    content: 'Great work, Alpha. Please proceed with synchronization. Keep the load balancers under observation and report any latency spikes above 50ms immediately.',
    timestamp: '10:25 AM',
    isSelf: true,
  },
}

export const WithReactions: Story = {
  args: {
    author: 'Nova',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova',
    content: 'System deployment of the neural subsystem is complete. All 142 nodes are currently reporting green status.',
    timestamp: '10:24 AM',
    isAI: true,
    authorStatus: 'online',
    reactions: [
      { emoji: '👍', count: 3, reacted: true },
      { emoji: '🚀', count: 2 },
      { emoji: '✅', count: 1 },
    ],
  },
}

export const WithThreadReplies: Story = {
  args: {
    author: 'Shuri',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri',
    content: 'I\'ve noticed some anomalies in the Q3 reports. Should we schedule a review meeting?',
    timestamp: '9:45 AM',
    isAI: true,
    authorStatus: 'idle',
    replyCount: 5,
  },
}

export const ProcessingAgent: Story = {
  args: {
    author: 'Agent X7',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=x7',
    content: '[LOG] Sync sequence initialized.\n[LOG] Partitioning data streams...\n[LOG] Target: us-east-1-cluster-B\n[LOG] Progress: 12%',
    timestamp: '10:25 AM',
    isAI: true,
    authorStatus: 'processing',
    variant: 'system',
  },
}

export const ChatThread: Story = {
  render: () => (
    <div className="space-y-4">
      <SystemMessage
        content="Nova System initialized. Neural pathways active across 12 distributed nodes."
        timestamp="10:00 AM"
        icon={<Zap className="h-4 w-4 text-accent-cyan" />}
      />

      <MessageBubble
        author="Nova"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=nova"
        content="All specialized agents are standing by for task allocation."
        timestamp="10:01 AM"
        isAI
        authorStatus="online"
      />

      <MessageBubble
        author="Commander"
        avatarSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=cmd"
        content="Status check on regional data synthesis. Who is available?"
        timestamp="10:05 AM"
        authorStatus="online"
      />

      <MessageBubble
        author="Friday"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=friday"
        content="Analysis of the last dataset is complete. I've indexed 4.2 million entries with a 99.8% confidence interval. Ready for next task."
        timestamp="10:06 AM"
        isAI
        agentBadge="Core"
        authorStatus="online"
        reactions={[
          { emoji: '👍', count: 2 },
          { emoji: '🔥', count: 1 },
        ]}
      />

      <MessageBubble
        author="You"
        content="Excellent. Friday, begin the regional synthesis. Prioritize the US-East cluster."
        timestamp="10:07 AM"
        isSelf
      />
    </div>
  ),
}

export const SystemMessages: Story = {
  render: () => (
    <div className="space-y-2">
      <SystemMessage content="Friday joined the channel" timestamp="9:00 AM" />
      <SystemMessage content="Nova started a voice call" timestamp="9:15 AM" />
      <SystemMessage
        content="System maintenance completed"
        timestamp="9:30 AM"
        icon={<Zap className="h-4 w-4 text-accent-success" />}
      />
    </div>
  ),
}
