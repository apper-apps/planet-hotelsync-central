import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-navy-200 border-t-navy-600 animate-spin"></div>
        <ApperIcon name="Hotel" className="absolute inset-0 m-auto h-6 w-6 text-navy-600" />
      </div>
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  )
}

export default Loading