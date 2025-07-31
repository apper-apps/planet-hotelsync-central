import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const MetricCard = ({ title, value, icon, change, changeType = "positive", gradient = "blue" }) => {
  const gradients = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600", 
    amber: "from-amber-500 to-amber-600",
    red: "from-red-500 to-red-600"
  }

  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600"
  }

  return (
    <Card className="relative overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradient]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold font-display bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent number-transition">
              {value}
            </p>
            {change && (
              <div className="flex items-center gap-1">
                <ApperIcon 
                  name={changeType === "positive" ? "TrendingUp" : "TrendingDown"} 
                  className={`w-4 h-4 ${changeColors[changeType]}`} 
                />
                <span className={`text-sm font-medium ${changeColors[changeType]}`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${gradients[gradient]} flex items-center justify-center shadow-lg`}>
            <ApperIcon name={icon} className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MetricCard