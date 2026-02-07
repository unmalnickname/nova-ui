import * as React from 'react'
import { cn } from '@/utils/cn'
import { Avatar } from '@/components/atoms/Avatar'
import { SearchInput } from '@/components/atoms/Input'
import { ChannelItem, ChannelCategory, VoiceParticipant } from '@/components/molecules/ChannelItem'
import { AgentBadge } from '@/components/molecules/AgentBadge'
import { Settings, Headphones, Mic, Bell } from 'lucide-react'

export interface Channel {
  id: string
  name: string
  type: 'text' | 'voice'
  unreadCount?: number
  locked?: boolean
  participants?: { id: string; name: string; avatarSrc?: string; speaking?: boolean }[]
}

export interface ChannelGroup {
  name: string
  channels: Channel[]
}

export interface Agent {
  id: string
  name: string
  role?: string
  avatarSrc?: string
  status: 'online' | 'offline' | 'busy' | 'idle' | 'processing'
}

export interface SidebarUser {
  name: string
  tag?: string
  avatarSrc?: string
  status?: 'online' | 'offline' | 'busy' | 'idle'
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Workspace/server name */
  workspaceName?: string
  /** Workspace icon */
  workspaceIcon?: React.ReactNode
  /** Channel groups */
  channelGroups?: ChannelGroup[]
  /** Active agents */
  agents?: Agent[]
  /** Currently active channel ID */
  activeChannelId?: string
  /** Currently in voice channel ID */
  inVoiceChannelId?: string
  /** Current user info */
  user?: SidebarUser
  /** Show search */
  showSearch?: boolean
  /** On channel click */
  onChannelClick?: (channelId: string) => void
  /** On agent click */
  onAgentClick?: (agentId: string) => void
  /** On settings click */
  onSettingsClick?: () => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      workspaceName = 'Nova Command',
      workspaceIcon,
      channelGroups = [],
      agents = [],
      activeChannelId,
      inVoiceChannelId,
      user,
      showSearch = true,
      onChannelClick,
      onAgentClick,
      onSettingsClick,
      ...props
    },
    ref
  ) => {
    const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>(
      channelGroups.reduce((acc, g) => ({ ...acc, [g.name]: true }), {})
    )
    const [searchQuery, setSearchQuery] = React.useState('')

    const toggleGroup = (name: string) => {
      setExpandedGroups((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    const filteredGroups = channelGroups.map((group) => ({
      ...group,
      channels: group.channels.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col h-full w-60 bg-nova-bg-secondary border-r border-border-subtle',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle">
          {workspaceIcon || (
            <div className="w-8 h-8 rounded bg-accent-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          )}
          <span className="font-semibold text-text-primary truncate">{workspaceName}</span>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="px-3 py-2">
            <SearchInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              className="h-8 text-xs"
            />
          </div>
        )}

        {/* Channels */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {filteredGroups.map((group) => (
            <ChannelCategory
              key={group.name}
              name={group.name}
              expanded={expandedGroups[group.name]}
              onToggle={() => toggleGroup(group.name)}
            >
              {group.channels.map((channel) => (
                <React.Fragment key={channel.id}>
                  <ChannelItem
                    name={channel.name}
                    type={channel.type}
                    unreadCount={channel.unreadCount}
                    locked={channel.locked}
                    inVoice={channel.id === inVoiceChannelId}
                    variant={channel.id === activeChannelId ? 'active' : 'default'}
                    onClick={() => onChannelClick?.(channel.id)}
                  />
                  {channel.type === 'voice' && channel.participants?.map((p) => (
                    <VoiceParticipant
                      key={p.id}
                      name={p.name}
                      avatarSrc={p.avatarSrc}
                      speaking={p.speaking}
                    />
                  ))}
                </React.Fragment>
              ))}
            </ChannelCategory>
          ))}

          {/* Active Agents */}
          {agents.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <div className="px-1 py-1 text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                Active Agents
              </div>
              {agents.map((agent) => (
                <AgentBadge
                  key={agent.id}
                  name={agent.name}
                  role={agent.role}
                  avatarSrc={agent.avatarSrc}
                  status={agent.status}
                  variant="interactive"
                  avatarSize="sm"
                  className="w-full mb-1"
                  onClick={() => onAgentClick?.(agent.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* User panel */}
        {user && (
          <div className="flex items-center gap-2 px-2 py-2 border-t border-border-subtle bg-nova-bg/50">
            <Avatar
              src={user.avatarSrc}
              alt={user.name}
              fallback={user.name.slice(0, 2)}
              status={user.status}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate">{user.name}</div>
              {user.tag && (
                <div className="text-xs text-text-muted truncate">{user.tag}</div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors">
                <Mic className="h-4 w-4" />
              </button>
              <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors">
                <Headphones className="h-4 w-4" />
              </button>
              <button
                onClick={onSettingsClick}
                className="p-1.5 text-text-muted hover:text-text-primary hover:bg-nova-hover rounded transition-colors"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export { Sidebar }
