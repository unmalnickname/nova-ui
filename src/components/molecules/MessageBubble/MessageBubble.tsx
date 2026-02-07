import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Avatar } from '@/components/atoms/Avatar'
import { Badge } from '@/components/atoms/Badge'
import { Bot, Reply, MoreHorizontal, Smile } from 'lucide-react'

const messageBubbleVariants = cva(
  'group relative',
  {
    variants: {
      variant: {
        default: '',
        system: '',
        self: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const bubbleContentVariants = cva(
  'rounded-lg px-3 py-2 max-w-prose',
  {
    variants: {
      variant: {
        default: 'bg-nova-card text-text-primary',
        system: 'bg-nova-bg-secondary text-text-secondary border border-border-subtle',
        self: 'bg-accent-primary text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface MessageReaction {
  emoji: string
  count: number
  reacted?: boolean
}

export interface MessageBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageBubbleVariants> {
  /** Author name */
  author: string
  /** Author avatar URL */
  avatarSrc?: string
  /** Message content */
  content: string
  /** Timestamp */
  timestamp?: string
  /** Is author an AI agent */
  isAI?: boolean
  /** AI agent badge label */
  agentBadge?: string
  /** Status of author (for avatar) */
  authorStatus?: 'online' | 'offline' | 'busy' | 'idle' | 'processing'
  /** Reactions on message */
  reactions?: MessageReaction[]
  /** Thread reply count */
  replyCount?: number
  /** Is message from current user */
  isSelf?: boolean
  /** Show hover actions */
  showActions?: boolean
  /** On reply click */
  onReply?: () => void
  /** On reaction click */
  onReact?: () => void
}

const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    {
      className,
      variant: variantProp,
      author,
      avatarSrc,
      content,
      timestamp,
      isAI,
      agentBadge,
      authorStatus,
      reactions,
      replyCount,
      isSelf,
      showActions = true,
      onReply,
      onReact,
      ...props
    },
    ref
  ) => {
    const variant = isSelf ? 'self' : variantProp

    return (
      <div
        ref={ref}
        className={cn(
          messageBubbleVariants({ variant, className }),
          isSelf && 'flex flex-row-reverse'
        )}
        {...props}
      >
        <div className={cn('flex gap-3', isSelf && 'flex-row-reverse')}>
          {/* Avatar */}
          <Avatar
            src={avatarSrc}
            alt={author}
            fallback={author.slice(0, 2)}
            status={authorStatus}
            size="sm"
            className="shrink-0 mt-0.5"
          />

          {/* Content */}
          <div className={cn('flex flex-col', isSelf && 'items-end')}>
            {/* Header */}
            <div className={cn('flex items-center gap-2 mb-1', isSelf && 'flex-row-reverse')}>
              <span className="font-medium text-sm text-text-primary">{author}</span>
              {isAI && (
                <Badge variant="primary" size="sm" icon={<Bot className="h-3 w-3" />}>
                  {agentBadge || 'AI Agent'}
                </Badge>
              )}
              {timestamp && (
                <span className="text-xs text-text-muted">{timestamp}</span>
              )}
            </div>

            {/* Message content */}
            <div className={cn(bubbleContentVariants({ variant }))}>
              <p className="text-sm whitespace-pre-wrap">{content}</p>
            </div>

            {/* Reactions */}
            {reactions && reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {reactions.map((reaction, i) => (
                  <button
                    key={i}
                    className={cn(
                      'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors',
                      reaction.reacted
                        ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                        : 'bg-nova-bg-secondary text-text-secondary hover:bg-nova-hover'
                    )}
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Thread replies */}
            {replyCount !== undefined && replyCount > 0 && (
              <button
                onClick={onReply}
                className="flex items-center gap-1 mt-1 text-xs text-accent-primary hover:underline"
              >
                <Reply className="h-3 w-3" />
                {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>
        </div>

        {/* Hover actions */}
        {showActions && (
          <div className={cn(
            'absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity',
            'flex items-center gap-0.5 bg-nova-bg-secondary rounded border border-border-subtle p-0.5',
            isSelf ? 'left-0 -translate-x-full mr-2' : 'right-0 translate-x-full ml-2'
          )}>
            <button
              onClick={onReact}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors"
              title="Add reaction"
            >
              <Smile className="h-4 w-4" />
            </button>
            <button
              onClick={onReply}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors"
              title="Reply in thread"
            >
              <Reply className="h-4 w-4" />
            </button>
            <button
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors"
              title="More options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    )
  }
)
MessageBubble.displayName = 'MessageBubble'

// System message (announcements, joins, etc.)
export interface SystemMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
  timestamp?: string
  icon?: React.ReactNode
}

const SystemMessage = React.forwardRef<HTMLDivElement, SystemMessageProps>(
  ({ className, content, timestamp, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-2 py-2', className)}
        {...props}
      >
        {icon}
        <span className="text-xs text-text-muted">{content}</span>
        {timestamp && (
          <span className="text-xs text-text-subtle">• {timestamp}</span>
        )}
      </div>
    )
  }
)
SystemMessage.displayName = 'SystemMessage'

export { MessageBubble, SystemMessage, messageBubbleVariants, bubbleContentVariants }
