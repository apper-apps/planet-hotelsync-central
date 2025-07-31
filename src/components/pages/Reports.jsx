import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Reports = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent mb-2">
          Analytics & Reports
        </h1>
        <p className="text-gray-600">Performance insights and operational analytics</p>
      </div>

      <div className="flex gap-4">
        <Button variant="primary" className="gap-2">
          <ApperIcon name="Calendar" className="h-4 w-4" />
          This Month
        </Button>
        <Button variant="outline" className="gap-2">
          <ApperIcon name="Download" className="h-4 w-4" />
          Export Data
        </Button>
        <Button variant="outline" className="gap-2">
          <ApperIcon name="Filter" className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="TrendingUp" className="h-5 w-5" />
              Occupancy Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="BarChart3" className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-gray-600">Occupancy chart visualization</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="DollarSign" className="h-5 w-5" />
              Revenue Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="PieChart" className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-gray-600">Revenue breakdown by room type</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Users" className="h-5 w-5" />
              Guest Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Star" className="h-8 w-8 text-amber-600" />
              </div>
              <p className="text-gray-600">Guest feedback and ratings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Percent" className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Average Occupancy Rate</p>
                    <p className="text-sm text-blue-700">Last 30 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">84.2%</p>
                  <p className="text-sm text-green-600">+2.5% from last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ApperIcon name="DollarSign" className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Revenue Per Room</p>
                    <p className="text-sm text-green-700">Average daily rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-900">$245</p>
                  <p className="text-sm text-green-600">+$12 from last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Star" className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">Guest Satisfaction</p>
                    <p className="text-sm text-amber-700">Average rating</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-900">4.7/5</p>
                  <p className="text-sm text-green-600">+0.2 from last month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Peak Season Preparation</h4>
                <p className="text-sm text-blue-800">Summer bookings are 23% higher than last year. Consider adjusting rates and staffing.</p>
              </div>

              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h4 className="font-medium text-green-900 mb-2">Housekeeping Efficiency</h4>
                <p className="text-sm text-green-800">Room turnaround time improved by 15% with new cleaning protocols.</p>
              </div>

              <div className="p-4 border-l-4 border-amber-500 bg-amber-50">
                <h4 className="font-medium text-amber-900 mb-2">Guest Feedback Trend</h4>
                <p className="text-sm text-amber-800">Most common compliment: "Exceptional service". Most common complaint: "Noisy hallways".</p>
              </div>

              <div className="p-4 border-l-4 border-red-500 bg-red-50">
                <h4 className="font-medium text-red-900 mb-2">Maintenance Alert</h4>
                <p className="text-sm text-red-800">Elevator in Building A requires scheduled maintenance next week.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Reports