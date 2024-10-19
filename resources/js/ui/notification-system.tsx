import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { ScrollArea } from "@/ui/scroll-area";
import { Badge } from "@/ui/badge";
import { Notification } from "@/types";
import axios from "axios";

export interface NotificationSystemProps {
    notifications: Notification[];
}
export default function NotificationSystem({
    notifications,
}: NotificationSystemProps) {
    const unreadCount = notifications.filter((n) => !n.read_at).length;

    const markAsRead = async (notification: Notification) => {
        try {
            const response = await axios.patch(
                route("notifications.read", notification.id)
            );
            if (response.status === 204) {
                window.location.href = notification.data.data.feature_link;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 px-2 py-1 text-xs"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                    {notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            onSelect={() => markAsRead(notification)}
                            className="cursor-pointer"
                        >
                            <div className="flex flex-col space-y-1">
                                <p
                                    className={`font-medium ${
                                        notification.read_at
                                            ? "text-muted-foreground"
                                            : ""
                                    }`}
                                >
                                    {notification.data.title}
                                </p>
                                <p
                                    className="text-sm text-muted-foreground line-clamp-2"
                                    style={{
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >
                                    {notification.data.message}
                                </p>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
