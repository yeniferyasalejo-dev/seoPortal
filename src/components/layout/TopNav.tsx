"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopNavProps {
  userName: string;
  projectName?: string;
}

export function TopNav({ userName, projectName }: TopNavProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-2">
        {projectName && (
          <span className="text-sm text-muted-foreground">
            Proyecto: <span className="text-foreground font-medium">{projectName}</span>
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{userName}</span>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
