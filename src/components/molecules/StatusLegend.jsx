import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import StatusBadge from "@/components/molecules/StatusBadge"

const StatusLegend = () => {
  const statuses = [
    { status: "occupied", description: "Guest currently in room" },
    { status: "vacant", description: "Room is clean and ready" },
    { status: "cleaning", description: "Housekeeping in progress" },
    { status: "maintenance", description: "Repairs or maintenance needed" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Room Status Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {statuses.map(({ status, description }) => (
          <div key={status} className="flex items-center justify-between">
            <StatusBadge status={status} />
            <span className="text-sm text-gray-600 ml-3 flex-1">{description}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default StatusLegend