import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PhoneCall, Mail } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon";
import { Badge } from "@/components/ui/badge";

export interface CustomerCommunicationPreviewProps {
  communications: { id: string; channel: string; direction: string; content: string; date: string; unread?: boolean }[];
  onViewAll?: () => void;
  className?: string;
}

export function CustomerCommunicationPreview({
  communications,
  onViewAll,
  className
}: CustomerCommunicationPreviewProps) {
  if (!communications || communications.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Icon icon={MessageSquare}  />
            Recent Communications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-6 text-center text-sm text-muted-foreground">
          No recent communications
        </CardContent>
      </Card>
    );
  }

  const unreadCount = communications.filter(c => c.unread).length;

  return (
    <Card className={className}>
      <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon icon={MessageSquare}  />
          Recent Comms
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-1 h-5 rounded-sm px-1.5 text-[10px] tabular-nums">
              {unreadCount} New
            </Badge>
          )}
        </CardTitle>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-xs text-primary hover:underline font-medium"
          >
            View All
          </button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {communications.slice(0, 3).map((comm) => (
            <li 
              key={comm.id}
              className={`flex flex-col gap-1 p-4 ${comm.unread ? 'bg-primary/5' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {comm.channel === 'sms' && <span className="flex items-center gap-1 text-blue-600"><Icon icon={MessageSquare}  /> SMS</span>}
                  {comm.channel === 'email' && <span className="flex items-center gap-1 text-emerald-600"><Icon icon={Mail}  /> Email</span>}
                  {comm.channel === 'call' && <span className="flex items-center gap-1 text-amber-600"><Icon icon={PhoneCall}  /> Call</span>}
                  {comm.direction === 'inbound' ? '↓ IN' : '↑ OUT'}
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {new Date(comm.date).toLocaleDateString()} {new Date(comm.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className={`text-sm mt-1 line-clamp-2 ${comm.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {comm.content}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
