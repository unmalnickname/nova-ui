import * as React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cn } from '@/utils/cn'
import { MessageBubble, SystemMessage, type MessageReaction } from '@/components/molecules/MessageBubble'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Send, Smile, Paperclip, AtSign } from 'lucide-react'

export interface Message {
  id: string
  author: string
  avatarSrc?: string
  content: string
  timestamp: string
  isAI?: boolean
  agentBadge?: string
  authorStatus?: 'online' | 'offline' | 'busy' | 'idle' | 'processing'
  reactions?: MessageReaction[]
  replyCount?: number
  isSelf?: boolean
  isSystem?: boolean
}

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Messages to display */
  messages: Message[]
  /** Channel name for input placeholder */
  channelName?: string
  /** Show input bar */
  showInput?: boolean
  /** Auto-scroll to bottom on new messages */
  autoScroll?: boolean
  /** On send message */
  onSendMessage?: (content: string) => void
  /** On reply to message */
  onReply?: (messageId: string) => void
  /** On react to message */
  onReact?: (messageId: string) => void
  /** Loading state */
  loading?: boolean
  /** Empty state message */
  emptyMessage?: string
}

const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  (
    {
      className,
      messages,
      channelName = 'channel',
      showInput = true,
      autoScroll = true,
      onSendMessage,
      onReply,
      onReact,
      loading,
      emptyMessage = 'No messages yet. Start the conversation!',
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState('')
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const bottomRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom
    React.useEffect(() => {
      if (autoScroll && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [messages, autoScroll])

    const handleSend = () => {
      if (inputValue.trim() && onSendMessage) {
        onSendMessage(inputValue.trim())
        setInputValue('')
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col h-full bg-nova-bg', className)}
        {...props}
      >
        {/* Messages area */}
        <ScrollArea.Root className="flex-1 overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full" ref={scrollRef}>
            <div className="p-4 space-y-4">
              {messages.length === 0 && !loading && (
                <div className="flex items-center justify-center h-32 text-text-muted">
                  {emptyMessage}
                </div>
              )}

              {messages.map((message) =>
                message.isSystem ? (
                  <SystemMessage
                    key={message.id}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                ) : (
                  <MessageBubble
                    key={message.id}
                    author={message.author}
                    avatarSrc={message.avatarSrc}
                    content={message.content}
                    timestamp={message.timestamp}
                    isAI={message.isAI}
                    agentBadge={message.agentBadge}
                    authorStatus={message.authorStatus}
                    reactions={message.reactions}
                    replyCount={message.replyCount}
                    isSelf={message.isSelf}
                    onReply={() => onReply?.(message.id)}
                    onReact={() => onReact?.(message.id)}
                  />
                )
              )}

              {loading && (
                <div className="flex items-center gap-2 text-text-muted">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm">Agent is typing...</span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-150 ease-out hover:bg-nova-bg-secondary data-[orientation=vertical]:w-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-nova-input rounded-full relative" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        {/* Input bar */}
        {showInput && (
          <div className="p-4 border-t border-border-subtle">
            <div className="flex items-center gap-2 bg-nova-input rounded-lg px-3 py-2">
              <button className="p-1 text-text-muted hover:text-text-primary transition-colors">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${channelName}`}
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <button className="p-1 text-text-muted hover:text-text-primary transition-colors">
                <AtSign className="h-5 w-5" />
              </button>
              <button className="p-1 text-text-muted hover:text-text-primary transition-colors">
                <Smile className="h-5 w-5" />
              </button>
              <Button
                size="icon-sm"
                variant={inputValue.trim() ? 'primary' : 'ghost'}
                onClick={handleSend}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Use <span className="text-text-secondary">@</span> to mention an agent • Use{' '}
              <span className="text-text-secondary">/</span> for commands
            </p>
          </div>
        )}
      </div>
    )
  }
)
MessageList.displayName = 'MessageList'

export { MessageList }
