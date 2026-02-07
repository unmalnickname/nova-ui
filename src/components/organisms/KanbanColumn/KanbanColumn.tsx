import * as React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cn } from '@/utils/cn'
import { TaskCard, type TaskCardAssignee } from '@/components/molecules/TaskCard'
import { Button } from '@/components/atoms/Button'
import { Plus, MoreHorizontal } from 'lucide-react'

export interface KanbanTask {
  id: string
  taskId?: string
  title: string
  description?: string
  status?: 'backlog' | 'in-progress' | 'ai-processing' | 'review' | 'completed' | 'blocked'
  priority?: 'low' | 'medium' | 'high' | 'critical'
  assignees?: TaskCardAssignee[]
  tags?: string[]
  commentCount?: number
  attachmentCount?: number
  dueDate?: string
  progress?: number
  isAITask?: boolean
}

export interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column title */
  title: string
  /** Column color accent */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'cyan'
  /** Tasks in this column */
  tasks: KanbanTask[]
  /** Max tasks to show before "show more" */
  maxVisible?: number
  /** Show add task button */
  showAddTask?: boolean
  /** On task click */
  onTaskClick?: (taskId: string) => void
  /** On add task click */
  onAddTask?: () => void
  /** On column menu click */
  onMenuClick?: () => void
}

const columnColors = {
  default: 'border-t-text-muted',
  primary: 'border-t-accent-primary',
  success: 'border-t-accent-success',
  warning: 'border-t-accent-warning',
  danger: 'border-t-accent-danger',
  cyan: 'border-t-accent-cyan',
}

const KanbanColumn = React.forwardRef<HTMLDivElement, KanbanColumnProps>(
  (
    {
      className,
      title,
      color = 'default',
      tasks,
      maxVisible,
      showAddTask = true,
      onTaskClick,
      onAddTask,
      onMenuClick,
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(false)
    const visibleTasks = maxVisible && !expanded ? tasks.slice(0, maxVisible) : tasks
    const hiddenCount = maxVisible ? tasks.length - maxVisible : 0

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col w-72 min-w-72 bg-nova-bg-secondary rounded-lg border-t-4',
          columnColors[color],
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">{title}</h3>
            <span className="text-xs text-text-muted bg-nova-input px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {showAddTask && (
              <button
                onClick={onAddTask}
                className="p-1 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onMenuClick}
              className="p-1 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tasks */}
        <ScrollArea.Root className="flex-1 overflow-hidden">
          <ScrollArea.Viewport className="h-full max-h-[calc(100vh-200px)]">
            <div className="p-2 space-y-2">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  taskId={task.taskId}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  priority={task.priority}
                  assignees={task.assignees}
                  tags={task.tags}
                  commentCount={task.commentCount}
                  attachmentCount={task.attachmentCount}
                  dueDate={task.dueDate}
                  progress={task.progress}
                  isAITask={task.isAITask}
                  onClick={() => onTaskClick?.(task.id)}
                />
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-8 text-text-muted text-sm">
                  No tasks
                </div>
              )}

              {hiddenCount > 0 && !expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="w-full py-2 text-sm text-accent-primary hover:underline"
                >
                  Show {hiddenCount} more
                </button>
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-150 ease-out hover:bg-nova-hover data-[orientation=vertical]:w-2"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-nova-input rounded-full relative" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        {/* Add task button */}
        {showAddTask && (
          <div className="p-2 border-t border-border-subtle">
            <Button
              variant="ghost"
              className="w-full justify-start text-text-muted"
              onClick={onAddTask}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add task
            </Button>
          </div>
        )}
      </div>
    )
  }
)
KanbanColumn.displayName = 'KanbanColumn'

// Full Kanban board
export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex gap-4 p-4 overflow-x-auto', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
KanbanBoard.displayName = 'KanbanBoard'

export { KanbanColumn, KanbanBoard }
