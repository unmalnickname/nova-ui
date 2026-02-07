import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Rocket, Plus, Trash2, Check } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success', 'outline', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Launch Mission',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Configure',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Cancel',
    variant: 'ghost',
  },
}

export const Danger: Story = {
  args: {
    children: 'Force Stop',
    variant: 'danger',
  },
}

export const Success: Story = {
  args: {
    children: 'Mark as Done',
    variant: 'success',
  },
}

export const Outline: Story = {
  args: {
    children: 'View Details',
    variant: 'outline',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Rocket className="h-4 w-4" />
        Deploy Agent
      </>
    ),
    variant: 'primary',
  },
}

export const IconOnly: Story = {
  args: {
    children: <Plus className="h-4 w-4" />,
    variant: 'primary',
    size: 'icon',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
    variant: 'primary',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}
