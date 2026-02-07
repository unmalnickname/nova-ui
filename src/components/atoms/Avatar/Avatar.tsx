import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const statusVariants = cva(
  'absolute bottom-0 right-0 rounded-full border-2 border-nova-bg',
  {
    variants: {
      status: {
        online: 'bg-accent-success',
        offline: 'bg-text-muted',
        busy: 'bg-accent-danger',
        idle: 'bg-accent-warning',
        processing: 'bg-accent-cyan animate-pulse',
      },
      size: {
        xs: 'h-2 w-2',
        sm: 'h-2.5 w-2.5',
        md: 'h-3 w-3',
        lg: 'h-3.5 w-3.5',
        xl: 'h-4 w-4',
        '2xl': 'h-5 w-5',
      },
    },
    defaultVariants: {
      status: 'offline',
      size: 'md',
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string
  /** Alt text for image */
  alt?: string
  /** Fallback text (initials) when image fails */
  fallback?: string
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy' | 'idle' | 'processing'
  /** Show speaking indicator animation */
  speaking?: boolean
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, status, speaking, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        avatarVariants({ size, className }),
        speaking && 'ring-2 ring-accent-success animate-speaking'
      )}
      {...props}
    >
      <AvatarPrimitive.Image
        className="aspect-square h-full w-full object-cover"
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        className="flex h-full w-full items-center justify-center bg-nova-bg-secondary text-text-secondary font-medium"
        delayMs={600}
      >
        {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
    {status && (
      <span className={cn(statusVariants({ status, size }))} />
    )}
  </div>
))
Avatar.displayName = 'Avatar'

export interface AvatarGroupProps {
  children: React.ReactNode
  /** Maximum avatars to show before +N */
  max?: number
  /** Size of avatars */
  size?: VariantProps<typeof avatarVariants>['size']
  className?: string
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, size = 'md', className }, ref) => {
    const childArray = React.Children.toArray(children)
    const excess = childArray.length - max

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)}>
        {childArray.slice(0, max).map((child, i) => (
          <div key={i} className="ring-2 ring-nova-bg rounded-full">
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        {excess > 0 && (
          <div
            className={cn(
              avatarVariants({ size }),
              'flex items-center justify-center bg-nova-bg-secondary text-text-secondary text-xs font-medium ring-2 ring-nova-bg'
            )}
          >
            +{excess}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup, avatarVariants }
