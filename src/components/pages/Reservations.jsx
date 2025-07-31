import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import CalendarReservation from "@/components/organisms/CalendarReservation"

const Reservations = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent mb-2">
          Reservations
        </h1>
        <p className="text-gray-600">Manage bookings, check-ins, and reservation calendar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
<CalendarReservation />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Clock" className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
<CardContent className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <ApperIcon name="Info" className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Quick Stats</span>
                </div>
                <p className="text-sm text-gray-700">View reservation details and today's activities in the calendar above</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="TrendingUp" className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Reservations</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">This Week</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Next Week</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Waitlist</span>
                <span className="font-semibold text-amber-600">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Reservations