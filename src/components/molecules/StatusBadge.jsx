import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"

const StatusBadge = ({ status, showIcon = true, className }) => {
  const statusConfig = {
    occupied: {
      variant: "occupied",
      icon: "User",
      label: "Occupied"
    },
    vacant: {
      variant: "vacant",
      icon: "CheckCircle",
      label: "Vacant"
    },
    cleaning: {
      variant: "cleaning",
      icon: "Sparkles",
      label: "Cleaning"
    },
    maintenance: {
      variant: "maintenance",
      icon: "Wrench",
      label: "Maintenance"
    }
  }

  const config = statusConfig[status] || statusConfig.vacant

  return (
    <Badge variant={config.variant} className={className}>
      {showIcon && <ApperIcon name={config.icon} className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  )
}

export default StatusBadge