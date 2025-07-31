import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const Housekeeping = () => {
  const mockTasks = [
    { id: 1, room: "301", type: "Checkout Cleaning", priority: "high", assignedTo: "Maria Garcia", status: "in-progress" },
    { id: 2, room: "205", type: "Maintenance Request", priority: "medium", assignedTo: "John Wilson", status: "pending" },
    { id: 3, room: "412", type: "Deep Clean", priority: "low", assignedTo: "Sarah Lee", status: "completed" },
    { id: 4, room: "156", type: "Inspection", priority: "high", assignedTo: "Mike Chen", status: "pending" }
  ]

  const priorityColors = {
    high: "variant-destructive",
    medium: "variant-warning", 
    low: "variant-secondary"
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800"
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent mb-2">
          Housekeeping Management
        </h1>
        <p className="text-gray-600">Assign and track cleaning tasks and room maintenance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                <ApperIcon name="AlertCircle" className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-navy-700">5</p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Urgent Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <ApperIcon name="Clock" className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-navy-700">12</p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-navy-700">28</p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <ApperIcon name="Users" className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-navy-700">6</p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Staff Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Task Management</CardTitle>
              <Button variant="accent" size="sm" className="gap-2">
                <ApperIcon name="Plus" className="h-4 w-4" />
                New Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTasks.map((task) => (
                  <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-navy-100 flex items-center justify-center">
                          <span className="font-bold text-navy-700">{task.room}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{task.type}</h4>
                          <p className="text-sm text-gray-600">Assigned to {task.assignedTo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                          {task.priority} priority
                        </Badge>
                        <Badge className={statusColors[task.status]}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ApperIcon name="Clock" className="h-4 w-4" />
                          <span>Due: 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ApperIcon name="MapPin" className="h-4 w-4" />
                          <span>Floor 3</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ApperIcon name="Eye" className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ApperIcon name="Edit3" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="Users" className="h-5 w-5" />
                Staff Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">MG</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-900">Maria Garcia</p>
                    <p className="text-sm text-green-700">3 tasks active</p>
                  </div>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">JW</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">John Wilson</p>
                    <p className="text-sm text-blue-700">2 tasks active</p>
                  </div>
                </div>
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">SL</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Sarah Lee</p>
                    <p className="text-sm text-gray-600">On break</p>
                  </div>
                </div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="BarChart3" className="h-5 w-5" />
                Performance Today
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rooms Cleaned</span>
                <span className="font-semibold">28/32</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average Time</span>
                <span className="font-semibold">24 min</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quality Score</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Housekeeping