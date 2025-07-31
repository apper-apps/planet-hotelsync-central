import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Guests = () => {
  const mockGuests = [
    { id: 1, name: "John Smith", room: "301", checkIn: "2024-01-15", vip: true },
    { id: 2, name: "Sarah Johnson", room: "205", checkIn: "2024-01-14", vip: false },
    { id: 3, name: "Michael Chen", room: "412", checkIn: "2024-01-16", vip: false },
    { id: 4, name: "Emma Davis", room: "156", checkIn: "2024-01-13", vip: true }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent mb-2">
          Guest Directory
        </h1>
        <p className="text-gray-600">Manage guest information and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <SearchBar
          placeholder="Search guests by name, room, or phone..."
          className="w-full lg:w-96"
        />
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <ApperIcon name="Filter" className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="accent" className="gap-2">
            <ApperIcon name="UserPlus" className="h-4 w-4" />
            Add Guest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Current Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Guest Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Room</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Check-in</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGuests.map((guest) => (
                      <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{guest.name}</span>
                            {guest.vip && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <ApperIcon name="Star" className="h-3 w-3 mr-1" />
                                VIP
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-navy-600">{guest.room}</td>
                        <td className="py-3 px-4 text-gray-600">{guest.checkIn}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                            Checked In
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <ApperIcon name="Eye" className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ApperIcon name="MessageSquare" className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Users" className="h-5 w-5" />
                Guest Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Guests</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VIP Guests</span>
                <span className="font-semibold text-amber-600">4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Returning Guests</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Special Requests</span>
                <span className="font-semibold text-orange-600">3</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Bell" className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg">
                <ApperIcon name="LogIn" className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">John Smith checked in</p>
                  <p className="text-blue-700">Room 301 • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 bg-green-50 rounded-lg">
                <ApperIcon name="MessageSquare" className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900">Special request completed</p>
                  <p className="text-green-700">Extra towels • Room 205</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 bg-amber-50 rounded-lg">
                <ApperIcon name="Star" className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-900">VIP service activated</p>
                  <p className="text-amber-700">Emma Davis • Room 156</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Guests