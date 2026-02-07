import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChannelItem, ChannelCategory, VoiceParticipant } from './ChannelItem'

const meta: Meta<typeof ChannelItem> = {
  title: 'Molecules/ChannelItem',
  component: ChannelItem,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'voice'],
    },
    variant: {
      control: 'select',
      options: ['default', 'active', 'muted'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ChannelItem>

export const TextChannel: Story = {
  args: {
    name: 'general-ops',
    type: 'text',
  },
}

export const TextChannelActive: Story = {
  args: {
    name: 'general-ops',
    type: 'text',
    variant: 'active',
  },
}

export const TextChannelWithUnread: Story = {
  args: {
    name: 'deployment-logs',
    type: 'text',
    unreadCount: 12,
  },
}

export const LockedChannel: Story = {
  args: {
    name: 'paper-review',
    type: 'text',
    locked: true,
  },
}

export const VoiceChannel: Story = {
  args: {
    name: 'Mission Briefing',
    type: 'voice',
  },
}

export const VoiceChannelConnected: Story = {
  args: {
    name: 'Mission Briefing',
    type: 'voice',
    inVoice: true,
    variant: 'active',
  },
}

export const FullSidebar: Story = {
  render: () => {
    const [activeChannel, setActiveChannel] = useState('global-status')
    const [opsExpanded, setOpsExpanded] = useState(true)
    const [researchExpanded, setResearchExpanded] = useState(true)
    const [supportExpanded, setSupportExpanded] = useState(false)

    return (
      <div className="w-60 bg-nova-bg-secondary p-2 rounded-lg">
        <ChannelCategory
          name="Operations"
          expanded={opsExpanded}
          onToggle={() => setOpsExpanded(!opsExpanded)}
        >
          <ChannelItem
            name="global-status"
            variant={activeChannel === 'global-status' ? 'active' : 'default'}
            onClick={() => setActiveChannel('global-status')}
          />
          <ChannelItem
            name="deployment-logs"
            unreadCount={12}
            variant={activeChannel === 'deployment-logs' ? 'active' : 'default'}
            onClick={() => setActiveChannel('deployment-logs')}
          />
          <ChannelItem
            name="incident-response"
            variant={activeChannel === 'incident-response' ? 'active' : 'default'}
            onClick={() => setActiveChannel('incident-response')}
          />
        </ChannelCategory>

        <ChannelCategory
          name="Research"
          expanded={researchExpanded}
          onToggle={() => setResearchExpanded(!researchExpanded)}
        >
          <ChannelItem
            name="model-training"
            variant={activeChannel === 'model-training' ? 'active' : 'default'}
            onClick={() => setActiveChannel('model-training')}
          />
          <ChannelItem
            name="data-analysis"
            variant={activeChannel === 'data-analysis' ? 'active' : 'default'}
            onClick={() => setActiveChannel('data-analysis')}
          />
          <ChannelItem
            name="paper-review"
            locked
            variant={activeChannel === 'paper-review' ? 'active' : 'default'}
            onClick={() => setActiveChannel('paper-review')}
          />
        </ChannelCategory>

        <ChannelCategory
          name="Support"
          expanded={supportExpanded}
          onToggle={() => setSupportExpanded(!supportExpanded)}
        >
          <ChannelItem name="help-desk" />
          <ChannelItem name="bug-reports" unreadCount={3} />
        </ChannelCategory>

        <div className="mt-4 pt-4 border-t border-border-subtle">
          <ChannelCategory name="Voice Channels" expanded>
            <ChannelItem name="Mission Briefing" type="voice" />
            <VoiceParticipant name="Nova" speaking />
            <VoiceParticipant name="Friday" />
            <ChannelItem name="Dev Sync" type="voice" />
          </ChannelCategory>
        </div>
      </div>
    )
  },
}

export const VoiceWithParticipants: Story = {
  render: () => (
    <div className="w-60 bg-nova-bg-secondary p-2 rounded-lg">
      <ChannelItem name="Mission Briefing" type="voice" inVoice variant="active" />
      <VoiceParticipant
        name="Nova"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=nova"
        speaking
      />
      <VoiceParticipant
        name="Friday"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=friday"
      />
      <VoiceParticipant
        name="Shuri"
        avatarSrc="https://api.dicebear.com/7.x/bottts/svg?seed=shuri"
        muted
      />
    </div>
  ),
}
