import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { roomService } from "@/services/api/roomService";
import ApperIcon from "@/components/ApperIcon";
import Rooms from "@/components/pages/Rooms";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
const Housekeeping = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      roomNumber: "301", 
      taskType: "cleaning", 
      priority: "high", 
      assignedTo: "Maria Garcia", 
      status: "to-clean",
      estimatedTime: "45 min",
      createdAt: new Date().toISOString(),
      dueTime: "2:00 PM"
    },
    { 
      id: 2, 
      roomNumber: "205", 
      taskType: "maintenance", 
      priority: "medium", 
      assignedTo: "John Wilson", 
      status: "in-progress",
      estimatedTime: "90 min",
      createdAt: new Date().toISOString(),
      dueTime: "3:30 PM"
    },
    { 
      id: 3, 
      roomNumber: "412", 
      taskType: "inspection", 
      priority: "low", 
      assignedTo: "Sarah Lee", 
      status: "completed",
      estimatedTime: "30 min",
      createdAt: new Date().toISOString(),
      dueTime: "1:15 PM"
    },
    { 
      id: 4, 
      roomNumber: "156", 
      taskType: "cleaning", 
      priority: "high", 
      assignedTo: "Mike Chen", 
      status: "to-clean",
      estimatedTime: "60 min",
      createdAt: new Date().toISOString(),
      dueTime: "4:00 PM"
    }
  ])
  
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [draggedTask, setDraggedTask] = useState(null)
  const [rooms, setRooms] = useState([])
  const [newTask, setNewTask] = useState({
    roomNumber: "",
    taskType: "cleaning",
    assignedTo: "",
    estimatedTime: "45",
    priority: "medium"
  })

  const housekeepers = [
    "Maria Garcia",
    "John Wilson", 
    "Sarah Lee",
    "Mike Chen",
    "Ana Rodriguez",
    "David Kim"
  ]

  const taskTypeLabels = {
    cleaning: "Cleaning",
    maintenance: "Maintenance", 
    inspection: "Inspection"
  }

  const priorityColors = {
    high: "destructive",
    medium: "default", 
    low: "outline"
  }

  const columnTitles = {
    "to-clean": "To Clean",
    "in-progress": "In Progress",
    "completed": "Completed"
  }

  useEffect(() => {
    loadRooms()
  }, [])

const loadRooms = async () => {
    try {
      const roomsData = await roomService.getAll()
      setRooms(roomsData)
    } catch (error) {
      console.error("Failed to load rooms:", error)
      toast.error("Failed to load rooms")
    }
  }

  // Drag and Drop Handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = async (e, newStatus) => {
    e.preventDefault()
    
    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null)
      return
    }

    const updatedTasks = tasks.map(task => 
      task.id === draggedTask.id 
        ? { ...task, status: newStatus }
        : task
    )
    
    setTasks(updatedTasks)
    setDraggedTask(null)
    
    // Update room status when task is completed
    if (newStatus === 'completed' && draggedTask.taskType === 'cleaning') {
      try {
        await roomService.updateRoomStatusFromTask(draggedTask.roomNumber, 'vacant')
        toast.success(`Room ${draggedTask.roomNumber} status updated to vacant`)
        
        // Dispatch event for real-time updates
        window.dispatchEvent(new window.CustomEvent('housekeepingTaskCompleted', {
          detail: { roomNumber: draggedTask.roomNumber, taskType: draggedTask.taskType }
        }))
      } catch (error) {
        console.error("Failed to update room status:", error)
        toast.error("Failed to update room status")
      }
    }
    
    toast.success(`Task moved to ${newStatus.replace('-', ' ')}`)
  }

  const handleCreateTask = () => {
    if (!newTask.roomNumber || !newTask.assignedTo) {
      toast.error("Please fill in all required fields")
      return
    }
    
    const task = {
      id: Date.now(),
      roomNumber: newTask.roomNumber,
      taskType: newTask.taskType,
      priority: newTask.priority,
      assignedTo: newTask.assignedTo,
      status: "to-clean",
      estimatedTime: `${newTask.estimatedTime} min`,
      createdAt: new Date().toISOString(),
      dueTime: new Date(Date.now() + parseInt(newTask.estimatedTime) * 60000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
    
    setTasks([...tasks, task])
    setNewTask({
      roomNumber: "",
      taskType: "cleaning",
      assignedTo: "",
      estimatedTime: "45",
      priority: "medium"
    })
    setShowCreateModal(false)
    toast.success("Task created successfully")
  }

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    toast.success("Task deleted successfully")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent mb-2">
          Housekeeping Management
        </h1>
        <p className="text-gray-600">Assign and track cleaning tasks and room maintenance</p>
      </div>

{/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                <ApperIcon name="AlertCircle" className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-navy-700">
                  {tasks.filter(t => t.status !== 'completed').length}
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Pending Tasks</p>
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
                <p className="text-2xl font-bold font-display text-navy-700">
                  {tasks.filter(t => t.status === 'in-progress').length}
                </p>
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
                <p className="text-2xl font-bold font-display text-navy-700">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <ApperIcon name="Timer" className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-navy-700">
                  {Math.round(tasks.reduce((acc, task) => acc + parseInt(task.estimatedTime), 0) / tasks.length)}m
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
{/* Kanban Board */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Task Management</CardTitle>
          <Button 
            variant="accent" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            Create Task
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {["to-clean", "in-progress", "completed"].map((status) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{columnTitles[status]}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tasks.filter(task => task.status === status).length}
                  </Badge>
                </div>
                
                <div 
                  className="min-h-[400px] p-3 rounded-lg border-2 border-dashed border-gray-200 space-y-3"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  {tasks
                    .filter(task => task.status === status)
                    .map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onDragStart={handleDragStart}
                        onTaskDelete={handleTaskDelete}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Task</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  value={newTask.roomNumber}
                  onChange={(e) => setNewTask({...newTask, roomNumber: e.target.value})}
                  placeholder="Enter room number"
                />
              </div>
              
              <div>
                <Label htmlFor="taskType">Task Type</Label>
                <select
                  id="taskType"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTask.taskType}
                  onChange={(e) => setNewTask({...newTask, taskType: e.target.value})}
                >
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inspection">Inspection</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <select
                  id="assignedTo"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                >
                  <option value="">Select housekeeper</option>
                  {housekeepers.map(housekeeper => (
                    <option key={housekeeper} value={housekeeper}>{housekeeper}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={newTask.estimatedTime}
                  onChange={(e) => setNewTask({...newTask, estimatedTime: e.target.value})}
                  placeholder="45"
                />
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleCreateTask}
                >
                  Create Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
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

// Task Card Component
const TaskCard = ({ task, onDragStart, onTaskDelete }) => {
  const getTaskTypeIcon = (type) => {
    switch(type) {
      case 'cleaning': return 'Sparkles'
      case 'maintenance': return 'Wrench'
      case 'inspection': return 'Search'
      default: return 'FileText'
    }
  }

  const priorityColors = {
    high: "destructive",
    medium: "default", 
    low: "outline"
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-move transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-navy-100 flex items-center justify-center">
            <span className="font-bold text-navy-700 text-sm">{task.roomNumber}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ApperIcon name={getTaskTypeIcon(task.taskType)} className="h-4 w-4 text-gray-600" />
              <h4 className="font-semibold text-gray-900 text-sm">
                {task.taskType.charAt(0).toUpperCase() + task.taskType.slice(1)}
              </h4>
            </div>
            <p className="text-xs text-gray-600">{task.assignedTo}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Badge variant={priorityColors[task.priority]} className="text-xs">
            {task.priority}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onTaskDelete(task.id)
            }}
            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
          >
            <ApperIcon name="X" className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <ApperIcon name="Clock" className="h-3 w-3" />
            <span>{task.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="h-3 w-3" />
            <span>{task.dueTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Housekeeping