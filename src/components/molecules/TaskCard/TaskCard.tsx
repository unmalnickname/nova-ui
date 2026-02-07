import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Avatar, AvatarGroup } from '@/components/atoms/Avatar'
import { Badge, PriorityBadge, StatusBadge } from '@/components/atoms/Badge'
import { MessageSquare, Paperclip, Calendar, Bot } from 'lucide-react'

const taskCardVariants = cva(
  'rounded-lg border p-3 transition-all duration-200 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-nova-card border-border-subtle hover:border-border-hover',
        selected: 'bg-nova-card border-accent-primary shadow-glow',
        dragging: 'bg-nova-card border-accent-primary shadow-glow-lg opacity-90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TaskCardAssignee {
  id: string
  name: string
  avatarSrc?: string
  isAI?: boolean
}

export interface TaskCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof taskCardVariants> {
  /** Task ID (e.g., NOVA-123) */
  taskId?: string
  /** Task title */
  title: string
  /** Task description (optional preview) */
  description?: string
  /** Task status */
  status?: 'backlog' | 'in-progress' | 'ai-processing' | 'review' | 'completed' | 'blocked'
  /** Priority level */
  priority?: 'low' | 'medium' | 'high' | 'critical'
  /** Assignees */
  assignees?: TaskCardAssignee[]
  /** Tags/labels */
  tags?: string[]
  /** Comment count */
  commentCount?: number
  /** Attachment count */
  attachmentCount?: number
  /** Due date */
  dueDate?: string
  /** Progress percentage (0-100) for AI tasks */
  progress?: number
  /** Is this an AI task */
  isAITask?: boolean
}

const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      className,
      variant,
      taskId,
      title,
      description,
      status,
      priority,
      assignees,
      tags,
      commentCount,
      attachmentCount,
      dueDate,
      progress,
      isAITask,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(taskCardVariants({ variant, className }))}
        {...props}
      >
        {/* Header: ID and badges */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {taskId && (
            <span className="text-xs text-text-muted font-mono">{taskId}</span>
          )}
          {isAITask && (
            <Badge variant="info" size="sm" icon={<Bot className="h-3 w-3" />}>
              AI
            </Badge>
          )}
          {priority && <PriorityBadge priority={priority} size="sm" />}
        </div>

        {/* Title */}
        <h4 className="font-medium text-text-primary mb-1 line-clamp-2">{title}</h4>

        {/* Description preview */}
        {description && (
          <p className="text-xs text-text-muted mb-2 line-clamp-2">{description}</p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Progress bar for AI tasks */}
        {progress !== undefined && (
          <div className="mb-2">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-nova-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-cyan transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer: assignees, metadata */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border-subtle">
          {/* Assignees */}
          <div className="flex items-center">
            {assignees && assignees.length > 0 ? (
              <AvatarGroup max={3} size="xs">
                {assignees.map((assignee) => (
                  <Avatar
                    key={assignee.id}
                    src={assignee.avatarSrc}
                    alt={assignee.name}
                    fallback={assignee.name.slice(0, 2)}
                  />
                ))}
              </AvatarGroup>
            ) : (
              <span className="text-xs text-text-subtle">Unassigned</span>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-text-muted">
            {dueDate && (
              <span className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                {dueDate}
              </span>
            )}
            {commentCount !== undefined && commentCount > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <MessageSquare className="h-3 w-3" />
                {commentCount}
              </span>
            )}
            {attachmentCount !== undefined && attachmentCount > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Paperclip className="h-3 w-3" />
                {attachmentCount}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
)
TaskCard.displayName = 'TaskCard'

// Compact task card for lists
export interface TaskCardCompactProps
  extends Omit<TaskCardProps, 'description' | 'tags' | 'progress'> {}

const TaskCardCompact = React.forwardRef<HTMLDivElement, TaskCardCompactProps>(
  (
    {
      className,
      variant,
      taskId,
      title,
      status,
      priority,
      assignees,
      isAITask,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-2 rounded border border-border-subtle bg-nova-card hover:border-border-hover transition-colors cursor-pointer',
          className
        )}
        {...props}
      >
        {status && <StatusBadge status={status} size="sm" />}
        <span className="flex-1 text-sm text-text-primary truncate">{title}</span>
        {priority && <PriorityBadge priority={priority} size="sm" />}
        {assignees && assignees.length > 0 && (
          <AvatarGroup max={2} size="xs">
            {assignees.map((a) => (
              <Avatar key={a.id} src={a.avatarSrc} alt={a.name} fallback={a.name.slice(0, 2)} />
            ))}
          </AvatarGroup>
        )}
      </div>
    )
  }
)
TaskCardCompact.displayName = 'TaskCardCompact'

export { TaskCard, TaskCardCompact, taskCardVariants }
