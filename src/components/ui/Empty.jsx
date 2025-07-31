import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing to display right now.", 
  icon = "Database",
  action,
  actionLabel = "Refresh"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {action && (
        <Button onClick={action} variant="primary">
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty