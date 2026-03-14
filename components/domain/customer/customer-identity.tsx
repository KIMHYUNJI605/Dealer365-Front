import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon";

export type CustomerIdentityProps = {
  customerId: string;
  fullName: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
};

export function CustomerIdentity({
  fullName,
  phone,
  email,
  avatarUrl,
  size = "md"
}: CustomerIdentityProps) {
  const initials = fullName
    .split(" ")
    .map(n => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sizeStyles = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base"
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar className={sizeStyles[size]}>
        <AvatarImage src={avatarUrl} alt={fullName} />
        <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col min-w-0">
        <span className="font-semibold text-foreground truncate">{fullName}</span>
        {(phone || email) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground truncate">
            {phone && (
              <span className="flex items-center gap-1">
                <Icon icon={Phone}  />
                {phone}
              </span>
            )}
            {phone && email && <span className="text-border px-0.5">•</span>}
            {email && (
              <span className="flex items-center gap-1 truncate">
                <Icon icon={Mail} className="shrink-0" />
                <span className="truncate">{email}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
