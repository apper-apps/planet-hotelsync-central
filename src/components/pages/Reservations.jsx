import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

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
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Calendar" className="h-5 w-5" />
                Booking Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Calendar" className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar View Coming Soon</h3>
                <p className="text-gray-600">Interactive booking calendar with drag-and-drop functionality</p>
              </div>
            </CardContent>
          </Card>
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
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <ApperIcon name="LogIn" className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Check-ins (5)</span>
                </div>
                <p className="text-sm text-green-700">Expected between 3:00 PM - 8:00 PM</p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <ApperIcon name="LogOut" className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-900">Check-outs (3)</span>
                </div>
                <p className="text-sm text-amber-700">Scheduled by 11:00 AM</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <ApperIcon name="Star" className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">VIP Arrivals (1)</span>
                </div>
                <p className="text-sm text-blue-700">Presidential Suite - 6:00 PM</p>
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