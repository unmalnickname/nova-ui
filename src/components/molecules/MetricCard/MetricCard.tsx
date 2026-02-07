import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const metricCardVariants = cva(
  'rounded-lg border p-4 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-nova-card border-border-subtle',
        glow: 'bg-nova-card border-accent-primary/30 shadow-glow',
        transparent: 'bg-transparent border-border-subtle',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  /** Metric label/title */
  label: string
  /** Main value */
  value: string | number
  /** Unit (e.g., "ms", "%", "tokens") */
  unit?: string
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral'
  /** Trend value (e.g., "+12%") */
  trendValue?: string
  /** Is trend positive (up=good) or negative (up=bad) */
  trendPositive?: boolean
  /** Optional icon */
  icon?: React.ReactNode
  /** Optional subtitle */
  subtitle?: string
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      className,
      variant,
      size,
      label,
      value,
      unit,
      trend,
      trendValue,
      trendPositive = true,
      icon,
      subtitle,
      ...props
    },
    ref
  ) => {
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
    const trendColor =
      trend === 'neutral'
        ? 'text-text-muted'
        : (trend === 'up') === trendPositive
        ? 'text-accent-success'
        : 'text-accent-danger'

    return (
      <div
        ref={ref}
        className={cn(metricCardVariants({ variant, size, className }))}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-muted uppercase tracking-wide">{label}</span>
          {icon && <span className="text-text-muted">{icon}</span>}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-text-primary">{value}</span>
          {unit && <span className="text-sm text-text-muted">{unit}</span>}
        </div>

        {/* Trend and subtitle */}
        <div className="flex items-center justify-between mt-2">
          {trend && trendValue && (
            <div className={cn('flex items-center gap-1 text-xs', trendColor)}>
              <TrendIcon className="h-3 w-3" />
              <span>{trendValue}</span>
            </div>
          )}
          {subtitle && (
            <span className="text-xs text-text-muted">{subtitle}</span>
          )}
        </div>
      </div>
    )
  }
)
MetricCard.displayName = 'MetricCard'

// Compact inline metric
export interface MetricInlineProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  unit?: string
  color?: 'default' | 'success' | 'danger' | 'warning' | 'info'
}

const metricColors = {
  default: 'text-text-primary',
  success: 'text-accent-success',
  danger: 'text-accent-danger',
  warning: 'text-accent-warning',
  info: 'text-accent-cyan',
}

const MetricInline = React.forwardRef<HTMLDivElement, MetricInlineProps>(
  ({ className, label, value, unit, color = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
        {...props}
      >
        <span className="text-sm text-text-muted">{label}</span>
        <span className={cn('font-medium', metricColors[color])}>
          {value}
          {unit && <span className="text-text-muted ml-1">{unit}</span>}
        </span>
      </div>
    )
  }
)
MetricInline.displayName = 'MetricInline'

// Progress metric with bar
export interface MetricProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: number
  max?: number
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'cyan'
  showValue?: boolean
}

const progressColors = {
  primary: 'bg-accent-primary',
  success: 'bg-accent-success',
  danger: 'bg-accent-danger',
  warning: 'bg-accent-warning',
  cyan: 'bg-accent-cyan',
}

const MetricProgress = React.forwardRef<HTMLDivElement, MetricProgressProps>(
  ({ className, label, value, max = 100, color = 'primary', showValue = true, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100)

    return (
      <div ref={ref} className={cn('', className)} {...props}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-text-muted">{label}</span>
          {showValue && (
            <span className="text-xs font-medium text-text-primary">
              {value}/{max}
            </span>
          )}
        </div>
        <div className="h-1.5 bg-nova-bg rounded-full overflow-hidden">
          <div
            className={cn('h-full transition-all duration-500', progressColors[color])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
MetricProgress.displayName = 'MetricProgress'

export { MetricCard, MetricInline, MetricProgress, metricCardVariants }
