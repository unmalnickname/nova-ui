import type { Meta, StoryObj } from '@storybook/react'
import { MetricCard, MetricInline, MetricProgress } from './MetricCard'
import { Activity, Cpu, DollarSign, Users, Zap, Clock } from 'lucide-react'

const meta: Meta<typeof MetricCard> = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glow', 'transparent'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
}

export default meta
type Story = StoryObj<typeof MetricCard>

export const Default: Story = {
  args: {
    label: 'Total Actions',
    value: '1,284',
    subtitle: '24h',
    trend: 'up',
    trendValue: '+12.4%',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Active Agents',
    value: 12,
    icon: <Users className="h-4 w-4" />,
    subtitle: 'Stable',
  },
}

export const TrendDown: Story = {
  args: {
    label: 'Response Time',
    value: '45',
    unit: 'ms',
    trend: 'down',
    trendValue: '-8%',
    trendPositive: false, // down is good for response time
    icon: <Clock className="h-4 w-4" />,
  },
}

export const GlowVariant: Story = {
  args: {
    label: 'System Health',
    value: '99.9',
    unit: '%',
    variant: 'glow',
    trend: 'up',
    trendValue: '+0.2%',
    icon: <Activity className="h-4 w-4 text-accent-success" />,
  },
}

export const CostMetric: Story = {
  args: {
    label: 'Token Burn',
    value: '$127.50',
    trend: 'up',
    trendValue: '+$12.30',
    trendPositive: false, // higher cost is bad
    icon: <DollarSign className="h-4 w-4" />,
    subtitle: 'Today',
  },
}

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Total Actions"
        value="1,284"
        trend="up"
        trendValue="+12.4%"
        subtitle="24h"
      />
      <MetricCard
        label="Active Agents"
        value={12}
        icon={<Users className="h-4 w-4" />}
        subtitle="Stable"
      />
      <MetricCard
        label="Token Usage"
        value="847K"
        trend="up"
        trendValue="+5.2%"
        trendPositive={false}
        icon={<Zap className="h-4 w-4" />}
      />
      <MetricCard
        label="Avg Response"
        value="23"
        unit="ms"
        trend="down"
        trendValue="-15%"
        trendPositive={false}
        icon={<Clock className="h-4 w-4" />}
      />
    </div>
  ),
}

export const FleetMetrics: Story = {
  render: () => (
    <div className="bg-nova-card rounded-lg p-4 w-64 border border-border-subtle">
      <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">
        Fleet Metrics
      </h3>
      <MetricCard
        label="Total Actions (24h)"
        value="1,284"
        trend="up"
        trendValue="+12.4%"
        variant="transparent"
        size="sm"
        className="border-0 p-0 mb-4"
      />
      <div className="border-t border-border-subtle pt-4">
        <MetricInline label="Active Agents" value={12} />
        <div className="text-xs text-text-muted mt-1">— Stable</div>
      </div>
    </div>
  ),
}

export const InlineMetrics: Story = {
  render: () => (
    <div className="bg-nova-card rounded-lg p-4 w-72 border border-border-subtle space-y-3">
      <h3 className="text-sm font-semibold text-text-primary mb-2">Live Metrics</h3>
      <MetricInline label="Tokens" value="125,847" color="info" />
      <MetricInline label="Time" value="2m 34s" />
      <MetricInline label="Model" value="claude-3-opus" />
      <MetricInline label="Cost" value="$0.47" color="warning" />
    </div>
  ),
}

export const ProgressMetrics: Story = {
  render: () => (
    <div className="bg-nova-card rounded-lg p-4 w-72 border border-border-subtle space-y-4">
      <h3 className="text-sm font-semibold text-text-primary">Resource Usage</h3>
      <MetricProgress label="CPU" value={67} color="primary" />
      <MetricProgress label="Memory" value={4.2} max={8} color="success" />
      <MetricProgress label="Storage" value={45} max={96} color="cyan" />
      <MetricProgress label="API Rate" value={892} max={1000} color="warning" />
    </div>
  ),
}

export const AgentStreamMetrics: Story = {
  render: () => (
    <div className="bg-nova-bg-secondary rounded-lg p-4 w-80 border border-border-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Agent Stream</h3>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-accent-success rounded-full animate-pulse" />
          <span className="text-xs text-accent-success">Live</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-nova-card rounded border border-border-subtle">
          <div className="text-2xl font-bold text-accent-cyan">125,847</div>
          <div className="text-xs text-text-muted">Tokens</div>
        </div>
        <div className="text-center p-3 bg-nova-card rounded border border-border-subtle">
          <div className="text-2xl font-bold text-text-primary">2:34</div>
          <div className="text-xs text-text-muted">Elapsed</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <MetricInline label="Model" value="claude-3-opus" />
        <MetricInline label="Est. Cost" value="$0.47" color="warning" />
      </div>
    </div>
  ),
}
