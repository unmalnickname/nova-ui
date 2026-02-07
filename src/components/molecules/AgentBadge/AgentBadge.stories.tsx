import type { Meta, StoryObj } from '@storybook/react'
import { AgentBadge, AgentBadgeCompact } from './AgentBadge'

const meta: Meta<typeof AgentBadge> = {
  title: 'Molecules/AgentBadge',
  component: AgentBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'idle', 'processing'],
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'interactive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof AgentBadge>

export const Default: Story = {
  args: {
    name: 'Friday',
    role: 'Strategic Analysis AI',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday',
    status: 'online',
  },
}

export const WithRoleBadge: Story = {
  args: {
    name: 'Friday',
    role: 'Strategic Analysis AI',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday',
    status: 'online',
    roleBadge: 'Core',
  },
}

export const Processing: Story = {
  args: {
    name: 'Shuri',
    role: 'Product Manager AI',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri',
    status: 'processing',
    roleBadge: 'AI Agent',
  },
}

export const Speaking: Story = {
  args: {
    name: 'Nova',
    role: 'Lead Coordinator',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova',
    status: 'online',
    speaking: true,
  },
}

export const CardVariant: Story = {
  args: {
    name: 'Loki',
    role: 'Content Creator AI',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=loki',
    status: 'idle',
    variant: 'card',
  },
}

export const Interactive: Story = {
  args: {
    name: 'Agent X7',
    role: 'Security Monitor',
    avatarSrc: 'https://api.dicebear.com/7.x/bottts/svg?seed=x7',
    status: 'online',
    variant: 'interactive',
    roleBadge: 'Guard',
  },
}

export const Compact: Story = {
  render: () => (
    <AgentBadgeCompact
      name="Friday"
      avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=friday"
      status="online"
    />
  ),
}

export const AgentList: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <AgentBadge
        name="Nova"
        role="Lead Coordinator"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=nova"
        status="online"
        variant="interactive"
      />
      <AgentBadge
        name="Friday"
        role="Strategic Analysis"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=friday"
        status="processing"
        variant="interactive"
        roleBadge="Core"
      />
      <AgentBadge
        name="Shuri"
        role="Product Manager"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=shuri"
        status="idle"
        variant="interactive"
      />
      <AgentBadge
        name="Loki"
        role="Content Creator"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=loki"
        status="offline"
        variant="interactive"
      />
    </div>
  ),
}

export const MentionDropdown: Story = {
  render: () => (
    <div className="bg-nova-bg-secondary rounded-lg p-2 w-72 border border-border-subtle">
      <div className="text-xs text-text-muted px-2 py-1 mb-1">SELECT AGENT</div>
      {[
        { name: 'Friday', role: 'Strategic Analysis AI', seed: 'friday', status: 'online' as const },
        { name: 'Fritz', role: 'Hardware Integration', seed: 'fritz', status: 'offline' as const },
        { name: 'Frida Kahlo AI', role: 'Creative Synthesis', seed: 'frida', status: 'idle' as const },
      ].map((agent) => (
        <AgentBadge
          key={agent.name}
          name={agent.name}
          role={agent.role}
          avatarSrc={`https://api.dicebear.com/7.x/bottts/svg?seed=${agent.seed}`}
          status={agent.status}
          variant="interactive"
          className="w-full"
        />
      ))}
    </div>
  ),
}
