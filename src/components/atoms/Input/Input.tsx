import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Search, X } from 'lucide-react'

const inputVariants = cva(
  'flex w-full rounded bg-nova-input text-text-primary placeholder:text-text-muted transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-transparent focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20',
        outline:
          'border border-border-subtle focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20',
        ghost: 'bg-transparent focus:bg-nova-input',
      },
      inputSize: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-sm',
        xl: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to show at the start */
  startIcon?: React.ReactNode
  /** Icon to show at the end */
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, startIcon, endIcon, ...props }, ref) => {
    if (startIcon || endIcon) {
      return (
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, className }),
              startIcon && 'pl-10',
              endIcon && 'pr-10'
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {endIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

// Search input with built-in search icon and clear button
export interface SearchInputProps extends Omit<InputProps, 'startIcon' | 'endIcon' | 'type'> {
  /** Called when clear button is clicked */
  onClear?: () => void
  /** Show clear button when has value */
  showClear?: boolean
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, showClear = true, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== ''

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          <Search className="h-4 w-4" />
        </div>
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            inputVariants({ variant: 'default', inputSize: 'md' }),
            'pl-10 pr-10',
            className
          )}
          {...props}
        />
        {showClear && hasValue && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'

// Textarea component
const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded bg-nova-input text-text-primary placeholder:text-text-muted transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default:
          'border border-transparent focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20',
        outline:
          'border border-border-subtle focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant }), 'p-3', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, SearchInput, Textarea, inputVariants, textareaVariants }
