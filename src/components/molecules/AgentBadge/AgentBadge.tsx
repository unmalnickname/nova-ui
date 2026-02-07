import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Avatar } from '@/components/atoms/Avatar'
import { Badge } from '@/components/atoms/Badge'

const agentBadgeVariants = cva(
  'inline-flex items-center gap-2 rounded-lg transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        card: 'bg-nova-card p-2 border border-border-subtle',
        interactive: 'bg-transparent hover:bg-nova-hover p-2 cursor-pointer',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface AgentBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof agentBadgeVariants> {
  /** Agent name */
  name: string
  /** Agent role or description */
  role?: string
  /** Avatar image URL */
  avatarSrc?: string
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy' | 'idle' | 'processing'
  /** Role badge label */
  roleBadge?: string
  /** Show speaking animation */
  speaking?: boolean
  /** Avatar size */
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg'
}

const AgentBadge = React.forwardRef<HTMLDivElement, AgentBadgeProps>(
  (
    {
      className,
      variant,
      size,
      name,
      role,
      avatarSrc,
      status,
      roleBadge,
      speaking,
      avatarSize = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(agentBadgeVariants({ variant, size, className }))}
        {...props}
      >
        <Avatar
          src={avatarSrc}
          alt={name}
          fallback={name.slice(0, 2).toUpperCase()}
          status={status}
          speaking={speaking}
          size={avatarSize}
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-primary truncate">{name}</span>
            {roleBadge && (
              <Badge variant="primary" size="sm">
                {roleBadge}
              </Badge>
            )}
          </div>
          {role && (
            <span className="text-text-muted text-xs truncate">{role}</span>
          )}
        </div>
      </div>
    )
  }
)
AgentBadge.displayName = 'AgentBadge'

// Compact version for lists
export interface AgentBadgeCompactProps
  extends Omit<AgentBadgeProps, 'variant' | 'role' | 'roleBadge'> {}

const AgentBadgeCompact = React.forwardRef<HTMLDivElement, AgentBadgeCompactProps>(
  ({ className, name, avatarSrc, status, speaking, avatarSize = 'sm', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-2', className)}
        {...props}
      >
        <Avatar
          src={avatarSrc}
          alt={name}
          fallback={name.slice(0, 2).toUpperCase()}
          status={status}
          speaking={speaking}
          size={avatarSize}
        />
        <span className="font-medium text-text-primary text-sm truncate">{name}</span>
      </div>
    )
  }
)
AgentBadgeCompact.displayName = 'AgentBadgeCompact'

export { AgentBadge, AgentBadgeCompact, agentBadgeVariants }
