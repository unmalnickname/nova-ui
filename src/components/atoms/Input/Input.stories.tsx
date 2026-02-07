import type { Meta, StoryObj } from '@storybook/react'
import { Input, SearchInput, Textarea } from './Input'
import { Mail, Lock, Eye, EyeOff, Send, Hash } from 'lucide-react'
import { useState } from 'react'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter message...',
    variant: 'default',
  },
}

export const Outline: Story = {
  args: {
    placeholder: 'Enter message...',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'ghost',
  },
}

export const WithStartIcon: Story = {
  args: {
    placeholder: 'Email address',
    startIcon: <Mail className="h-4 w-4" />,
  },
}

export const WithEndIcon: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
    endIcon: <Eye className="h-4 w-4 cursor-pointer hover:text-text-primary transition-colors" />,
  },
}

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Channel name',
    startIcon: <Hash className="h-4 w-4" />,
    endIcon: <Send className="h-4 w-4 cursor-pointer hover:text-accent-primary transition-colors" />,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input" />
      <Input inputSize="lg" placeholder="Large input" />
      <Input inputSize="xl" placeholder="Extra large input" />
    </div>
  ),
}

export const SearchInputDefault: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-80">
        <SearchInput
          placeholder="Search logs or agents..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
      </div>
    )
  },
}

export const TextareaDefault: Story = {
  render: () => (
    <div className="w-96">
      <Textarea placeholder="Enter agent directive..." rows={4} />
    </div>
  ),
}

export const ChatInput: Story = {
  render: () => (
    <div className="w-full max-w-2xl bg-nova-bg-secondary p-4 rounded-lg">
      <div className="relative">
        <Input
          placeholder="Message #general-ops"
          className="pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button className="p-1.5 text-text-muted hover:text-text-primary transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="p-1.5 text-text-muted hover:text-accent-primary transition-colors">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="text-xs text-text-muted mt-2">Use @ to mention an agent • Use / for commands</p>
    </div>
  ),
}
