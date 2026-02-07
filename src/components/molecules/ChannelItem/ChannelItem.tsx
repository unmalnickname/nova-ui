import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { CountBadge } from '@/components/atoms/Badge'
import { Hash, Volume2, Lock, ChevronDown, ChevronRight } from 'lucide-react'

const channelItemVariants = cva(
  'flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-all duration-150',
  {
    variants: {
      variant: {
        default: 'text-text-muted hover:text-text-primary hover:bg-nova-hover',
        active: 'text-text-primary bg-nova-hover',
        muted: 'text-text-subtle hover:text-text-muted hover:bg-nova-hover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ChannelItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof channelItemVariants> {
  /** Channel name */
  name: string
  /** Channel type */
  type?: 'text' | 'voice'
  /** Unread message count */
  unreadCount?: number
  /** Is channel locked/private */
  locked?: boolean
  /** Is user currently in this voice channel */
  inVoice?: boolean
}

const ChannelItem = React.forwardRef<HTMLDivElement, ChannelItemProps>(
  (
    {
      className,
      variant,
      name,
      type = 'text',
      unreadCount,
      locked,
      inVoice,
      ...props
    },
    ref
  ) => {
    const Icon = type === 'voice' ? Volume2 : Hash
    const hasUnread = unreadCount && unreadCount > 0

    return (
      <div
        ref={ref}
        className={cn(
          channelItemVariants({ variant, className }),
          hasUnread && 'text-text-primary font-medium'
        )}
        {...props}
      >
        <Icon className={cn('h-4 w-4 shrink-0', inVoice && 'text-accent-success')} />
        <span className="truncate flex-1">{name}</span>
        {locked && <Lock className="h-3 w-3 text-text-subtle" />}
        {hasUnread && <CountBadge count={unreadCount} />}
        {inVoice && (
          <span className="text-xs text-accent-success">Connected</span>
        )}
      </div>
    )
  }
)
ChannelItem.displayName = 'ChannelItem'

// Channel category header
export interface ChannelCategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category name */
  name: string
  /** Is expanded */
  expanded?: boolean
  /** Toggle callback */
  onToggle?: () => void
}

const ChannelCategory = React.forwardRef<HTMLDivElement, ChannelCategoryProps>(
  ({ className, name, expanded = true, onToggle, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mb-1', className)} {...props}>
        <button
          onClick={onToggle}
          className="flex items-center gap-1 px-1 py-1 w-full text-xs font-semibold text-text-muted uppercase tracking-wide hover:text-text-secondary transition-colors"
        >
          {expanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
          {name}
        </button>
        {expanded && <div className="mt-0.5">{children}</div>}
      </div>
    )
  }
)
ChannelCategory.displayName = 'ChannelCategory'

// Voice channel participant
export interface VoiceParticipantProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  avatarSrc?: string
  speaking?: boolean
  muted?: boolean
  deafened?: boolean
}

const VoiceParticipant = React.forwardRef<HTMLDivElement, VoiceParticipantProps>(
  ({ className, name, avatarSrc, speaking, muted, deafened, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 px-2 py-1 ml-6 text-sm text-text-muted',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'w-6 h-6 rounded-full bg-nova-bg-secondary flex items-center justify-center text-xs',
            speaking && 'ring-2 ring-accent-success'
          )}
        >
          {avatarSrc ? (
            <img src={avatarSrc} alt={name} className="w-full h-full rounded-full" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <span className="truncate flex-1">{name}</span>
        {muted && (
          <svg className="h-3 w-3 text-accent-danger" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
            <path d="M19 11a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 10-2 0 7 7 0 006 6.92V21h-3a1 1 0 100 2h8a1 1 0 100-2h-3v-3.08A7 7 0 0019 11z" />
            <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </div>
    )
  }
)
VoiceParticipant.displayName = 'VoiceParticipant'

export { ChannelItem, ChannelCategory, VoiceParticipant, channelItemVariants }
