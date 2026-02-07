import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'idle', 'processing', undefined],
    },
    speaking: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/bottts/svg?seed=friday',
    alt: 'Friday',
    size: 'md',
  },
}

export const WithStatus: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova',
    alt: 'Nova',
    status: 'online',
    size: 'lg',
  },
}

export const Processing: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/bottts/svg?seed=shuri',
    alt: 'Shuri',
    status: 'processing',
    size: 'lg',
  },
}

export const Speaking: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/bottts/svg?seed=loki',
    alt: 'Loki',
    status: 'online',
    speaking: true,
    size: 'xl',
  },
}

export const Fallback: Story = {
  args: {
    alt: 'Agent X7',
    fallback: 'X7',
    size: 'lg',
    status: 'online',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" src="https://api.dicebear.com/7.x/bottts/svg?seed=1" alt="xs" />
      <Avatar size="sm" src="https://api.dicebear.com/7.x/bottts/svg?seed=2" alt="sm" />
      <Avatar size="md" src="https://api.dicebear.com/7.x/bottts/svg?seed=3" alt="md" />
      <Avatar size="lg" src="https://api.dicebear.com/7.x/bottts/svg?seed=4" alt="lg" />
      <Avatar size="xl" src="https://api.dicebear.com/7.x/bottts/svg?seed=5" alt="xl" />
      <Avatar size="2xl" src="https://api.dicebear.com/7.x/bottts/svg?seed=6" alt="2xl" />
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        size="lg"
        src="https://api.dicebear.com/7.x/bottts/svg?seed=online"
        alt="Online"
        status="online"
      />
      <Avatar
        size="lg"
        src="https://api.dicebear.com/7.x/bottts/svg?seed=offline"
        alt="Offline"
        status="offline"
      />
      <Avatar
        size="lg"
        src="https://api.dicebear.com/7.x/bottts/svg?seed=busy"
        alt="Busy"
        status="busy"
      />
      <Avatar
        size="lg"
        src="https://api.dicebear.com/7.x/bottts/svg?seed=idle"
        alt="Idle"
        status="idle"
      />
      <Avatar
        size="lg"
        src="https://api.dicebear.com/7.x/bottts/svg?seed=processing"
        alt="Processing"
        status="processing"
      />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4} size="md">
      <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=a1" alt="Agent 1" />
      <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=a2" alt="Agent 2" />
      <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=a3" alt="Agent 3" />
      <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=a4" alt="Agent 4" />
      <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=a5" alt="Agent 5" />
      <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=a6" alt="Agent 6" />
    </AvatarGroup>
  ),
}
