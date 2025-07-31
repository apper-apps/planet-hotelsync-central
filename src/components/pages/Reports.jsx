import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import MetricCard from "@/components/molecules/MetricCard"
import { reportsService } from "@/services/api/reportsService"
import { toast } from 'react-toastify'
import Chart from 'react-apexcharts'
const Reports = () => {
  const [metrics, setMetrics] = useState(null)
  const [revenueHistory, setRevenueHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadReportsData()
  }, [])

  const loadReportsData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [metricsData, revenueData] = await Promise.all([
        reportsService.getMetrics(),
        reportsService.getRevenueHistory()
      ])
      
      setMetrics(metricsData)
      setRevenueHistory(revenueData)
      toast.success('Reports data loaded successfully')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load reports data')
    } finally {
      setLoading(false)
    }
  }

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#3B82F6']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      },
      colors: ['#3B82F6']
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4
    },
    xaxis: {
      categories: revenueHistory.map(item => item.formattedDate),
      labels: {
        style: { colors: '#6B7280', fontSize: '12px' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280', fontSize: '12px' },
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    tooltip: {
      theme: 'light',
      x: { show: true },
      y: {
        formatter: (value) => `$${value.toLocaleString()}`
      },
      style: { fontSize: '12px' }
    },
    colors: ['#3B82F6']
  }

  const chartSeries = [{
    name: 'Daily Revenue',
    data: revenueHistory.map(item => item.revenue)
  }]

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Loading reports data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadReportsData} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
        <Button 
          onClick={loadReportsData}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Today's Revenue"
          value={`$${metrics?.todayRevenue?.toLocaleString() || '0'}`}
          icon="DollarSign"
          gradient="blue"
          change={12.5}
          changeType="positive"
        />
        <MetricCard
          title="Occupancy Rate"
          value={`${metrics?.occupancyRate || 0}%`}
          icon="Users"
          gradient="green"
          change={-2.1}
          changeType="negative"
          subtitle={`${metrics?.occupiedRooms || 0}/${metrics?.totalRooms || 0} rooms`}
        />
        <MetricCard
          title="Average Daily Rate"
          value={`$${metrics?.adr?.toFixed(2) || '0.00'}`}
          icon="TrendingUp"
          gradient="amber"
          change={5.8}
          changeType="positive"
          subtitle="ADR per occupied room"
        />
        <MetricCard
          title="RevPAR"
          value={`$${metrics?.revpar?.toFixed(2) || '0.00'}`}
          icon="BarChart3"
          gradient="red"
          change={8.3}
          changeType="positive"
          subtitle="Revenue per available room"
        />
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daily Revenue Trend</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Revenue performance over the past 30 days</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Revenue</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={320}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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