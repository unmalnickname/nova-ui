import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Sidebar>

const sampleChannelGroups = [
  {
    name: 'Operations',
    channels: [
      { id: 'global-status', name: 'global-status', type: 'text' as const },
      { id: 'deployment-logs', name: 'deployment-logs', type: 'text' as const, unreadCount: 12 },
      { id: 'incident-response', name: 'incident-response', type: 'text' as const },
    ],
  },
  {
    name: 'Research',
    channels: [
      { id: 'model-training', name: 'model-training', type: 'text' as const },
      { id: 'data-analysis', name: 'data-analysis', type: 'text' as const },
      { id: 'paper-review', name: 'paper-review', type: 'text' as const, locked: true },
    ],
  },
  {
    name: 'Voice Channels',
    channels: [
      {
        id: 'mission-briefing',
        name: 'Mission Briefing',
        type: 'voice' as const,
        participants: [
          { id: '1', name: 'Nova', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova', speaking: true },
          { id: '2', name: 'Friday', avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday' },
        ],
      },
      { id: 'dev-sync', name: 'Dev Sync', type: 'voice' as const },
    ],
  },
]

const sampleAgents = [
  {
    id: '1',
    name: 'Friday',
    role: 'Core',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday',
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'HAL 9000',
    role: 'Logic',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=hal',
    status: 'processing' as const,
  },
  {
    id: '3',
    name: 'Fritz',
    role: 'Math',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=fritz',
    status: 'idle' as const,
  },
]

const sampleUser = {
  name: 'Nexus_Lead',
  tag: '#8824',
  avatarSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nexus',
  status: 'online' as const,
}

export const Default: Story = {
  args: {
    workspaceName: 'Nova Command',
    channelGroups: sampleChannelGroups,
    agents: sampleAgents,
    user: sampleUser,
    activeChannelId: 'global-status',
  },
}

export const WithActiveVoice: Story = {
  args: {
    workspaceName: 'Nova Command',
    channelGroups: sampleChannelGroups,
    agents: sampleAgents,
    user: sampleUser,
    activeChannelId: 'global-status',
    inVoiceChannelId: 'mission-briefing',
  },
}

export const WithUnreadMessages: Story = {
  args: {
    workspaceName: 'Nova Command',
    channelGroups: [
      {
        name: 'Operations',
        channels: [
          { id: 'global-status', name: 'global-status', type: 'text' as const, unreadCount: 5 },
          { id: 'deployment-logs', name: 'deployment-logs', type: 'text' as const, unreadCount: 23 },
          { id: 'alerts', name: 'alerts', type: 'text' as const, unreadCount: 2 },
        ],
      },
    ],
    user: sampleUser,
  },
}

export const MinimalWithoutAgents: Story = {
  args: {
    workspaceName: 'Project Alpha',
    channelGroups: [
      {
        name: 'General',
        channels: [
          { id: 'general', name: 'general', type: 'text' as const },
          { id: 'random', name: 'random', type: 'text' as const },
        ],
      },
    ],
    user: sampleUser,
    showSearch: false,
  },
}
