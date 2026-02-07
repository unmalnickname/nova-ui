import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-nova-bg-secondary text-text-secondary border border-border-subtle',
        primary: 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30',
        success: 'bg-accent-success/20 text-accent-success border border-accent-success/30',
        danger: 'bg-accent-danger/20 text-accent-danger border border-accent-danger/30',
        warning: 'bg-accent-warning/20 text-accent-warning border border-accent-warning/30',
        info: 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30',
        ghost: 'bg-transparent text-text-secondary',
      },
      size: {
        sm: 'px-2 py-0.5 text-2xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon to show before text */
  icon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), icon && 'gap-1', className)}
        {...props}
      >
        {icon}
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'

// Status badge specifically for task/agent status
const statusConfig = {
  backlog: { variant: 'default' as const, label: 'Backlog' },
  'in-progress': { variant: 'primary' as const, label: 'In Progress' },
  'ai-processing': { variant: 'info' as const, label: 'AI Processing' },
  completed: { variant: 'success' as const, label: 'Completed' },
  blocked: { variant: 'danger' as const, label: 'Blocked' },
  review: { variant: 'warning' as const, label: 'In Review' },
}

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: keyof typeof statusConfig
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const config = statusConfig[status]
    return (
      <Badge ref={ref} variant={config.variant} className={className} {...props}>
        {config.label}
      </Badge>
    )
  }
)
StatusBadge.displayName = 'StatusBadge'

// Priority badge
const priorityConfig = {
  low: { variant: 'ghost' as const, label: 'Low', color: 'text-text-muted' },
  medium: { variant: 'warning' as const, label: 'Medium', color: '' },
  high: { variant: 'danger' as const, label: 'High', color: '' },
  critical: { variant: 'danger' as const, label: 'Critical', color: '' },
}

export interface PriorityBadgeProps extends Omit<BadgeProps, 'variant'> {
  priority: keyof typeof priorityConfig
}

const PriorityBadge = React.forwardRef<HTMLSpanElement, PriorityBadgeProps>(
  ({ priority, className, ...props }, ref) => {
    const config = priorityConfig[priority]
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        className={cn(config.color, className)}
        {...props}
      >
        {config.label}
      </Badge>
    )
  }
)
PriorityBadge.displayName = 'PriorityBadge'

// Count badge (for notifications, unread, etc.)
export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  /** Max count to show before showing max+ */
  max?: number
}

const CountBadge = React.forwardRef<HTMLSpanElement, CountBadgeProps>(
  ({ count, max = 99, className, ...props }, ref) => {
    const displayCount = count > max ? `${max}+` : count
    return (
      <Badge
        ref={ref}
        variant="primary"
        size="sm"
        className={cn('min-w-[1.25rem] justify-center', className)}
        {...props}
      >
        {displayCount}
      </Badge>
    )
  }
)
CountBadge.displayName = 'CountBadge'

export { Badge, StatusBadge, PriorityBadge, CountBadge, badgeVariants }
