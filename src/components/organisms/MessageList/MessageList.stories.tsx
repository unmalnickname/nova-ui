import type { Meta, StoryObj } from '@storybook/react'
import { MessageList } from './MessageList'

const meta: Meta<typeof MessageList> = {
  title: 'Organisms/MessageList',
  component: MessageList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-full max-w-3xl mx-auto">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MessageList>

const sampleMessages = [
  {
    id: '1',
    author: 'Nova System',
    content: 'Neural pathways active across 12 distributed nodes. All specialized agents are standing by.',
    timestamp: '10:00 AM',
    isSystem: true,
  },
  {
    id: '2',
    author: 'Nova',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova',
    content: 'System initialized. All agents reporting ready status. What tasks should we prioritize today?',
    timestamp: '10:01 AM',
    isAI: true,
    authorStatus: 'online' as const,
  },
  {
    id: '3',
    author: 'Commander',
    avatarSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cmd',
    content: 'Status check on regional data synthesis. Who is available?',
    timestamp: '10:05 AM',
    authorStatus: 'online' as const,
  },
  {
    id: '4',
    author: 'Friday',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday',
    content: 'Analysis of the last dataset is complete. I\'ve indexed 4.2 million entries with a 99.8% confidence interval. Ready for next task.',
    timestamp: '10:06 AM',
    isAI: true,
    agentBadge: 'Core',
    authorStatus: 'online' as const,
    reactions: [
      { emoji: '👍', count: 2, reacted: true },
      { emoji: '🔥', count: 1 },
    ],
  },
  {
    id: '5',
    author: 'You',
    content: 'Excellent. Friday, begin the regional synthesis. Prioritize the US-East cluster.',
    timestamp: '10:07 AM',
    isSelf: true,
  },
  {
    id: '6',
    author: 'Friday',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday',
    content: 'Acknowledged. Initiating synthesis protocol for US-East. Estimated completion: 15 minutes.',
    timestamp: '10:08 AM',
    isAI: true,
    agentBadge: 'Core',
    authorStatus: 'processing' as const,
    replyCount: 3,
  },
]

export const Default: Story = {
  args: {
    messages: sampleMessages,
    channelName: 'general-ops',
  },
}

export const WithTypingIndicator: Story = {
  args: {
    messages: sampleMessages,
    channelName: 'general-ops',
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    messages: [],
    channelName: 'new-channel',
    emptyMessage: 'This is the beginning of #new-channel. Start the conversation!',
  },
}

export const WithoutInput: Story = {
  args: {
    messages: sampleMessages.slice(0, 4),
    channelName: 'read-only',
    showInput: false,
  },
}

export const LongConversation: Story = {
  args: {
    messages: [
      ...sampleMessages,
      {
        id: '7',
        author: 'Shuri',
        avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri',
        content: 'I\'ve detected some anomalies in the Q3 projections. Should I run a deeper analysis?',
        timestamp: '10:15 AM',
        isAI: true,
        authorStatus: 'idle' as const,
      },
      {
        id: '8',
        author: 'You',
        content: 'Yes, please do. Also loop in Loki for the content review.',
        timestamp: '10:16 AM',
        isSelf: true,
      },
      {
        id: '9',
        author: 'Loki',
        avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=loki',
        content: 'On it. I\'ll have the first draft ready within the hour.',
        timestamp: '10:17 AM',
        isAI: true,
        authorStatus: 'online' as const,
        reactions: [{ emoji: '✅', count: 1 }],
      },
    ],
    channelName: 'general-ops',
  },
}
