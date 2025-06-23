import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    user: "John Doe",
    action: "Generated an image",
    time: "2 minutes ago",
    initials: "JD",
  },
  {
    user: "Jane Smith",
    action: "Started a chat conversation",
    time: "5 minutes ago",
    initials: "JS",
  },
  {
    user: "Mike Johnson",
    action: "Transcribed audio file",
    time: "10 minutes ago",
    initials: "MJ",
  },
  {
    user: "Sarah Wilson",
    action: "Upgraded to Pro plan",
    time: "15 minutes ago",
    initials: "SW",
  },
  {
    user: "Tom Brown",
    action: "Generated an image",
    time: "20 minutes ago",
    initials: "TB",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
