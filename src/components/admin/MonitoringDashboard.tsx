'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Globe,
  Database,
  Server,
  Wifi,
  Shield,
  Zap
} from 'lucide-react'

interface SystemMetrics {
  uptime: number
  responseTime: number
  errorRate: number
  activeUsers: number
  totalRequests: number
  memoryUsage: number
  cpuUsage: number
}

interface UserMetrics {
  totalUsers: number
  newUsers: number
  activeUsers: number
  returningUsers: number
  conversionRate: number
  averageSessionDuration: number
}

interface PerformanceMetrics {
  pageLoadTime: number
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
  }
  cacheHitRate: number
  cdnPerformance: number
}

interface SecurityMetrics {
  failedLogins: number
  suspiciousActivities: number
  blockedRequests: number
  sslStatus: 'active' | 'expired' | 'warning'
}

export default function MonitoringDashboard() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    uptime: 99.9,
    responseTime: 150,
    errorRate: 0.1,
    activeUsers: 45,
    totalRequests: 1250,
    memoryUsage: 65,
    cpuUsage: 45,
  })

  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    totalUsers: 1250,
    newUsers: 23,
    activeUsers: 156,
    returningUsers: 89,
    conversionRate: 3.2,
    averageSessionDuration: 4.5,
  })

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 1.2,
    coreWebVitals: {
      lcp: 2.1,
      fid: 0.15,
      cls: 0.08,
    },
    cacheHitRate: 92,
    cdnPerformance: 98,
  })

  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    failedLogins: 5,
    suspiciousActivities: 2,
    blockedRequests: 12,
    sslStatus: 'active',
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 50) + 30,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        memoryUsage: Math.floor(Math.random() * 20) + 55,
        cpuUsage: Math.floor(Math.random() * 30) + 35,
      }))
    }, 5000)

    setIsLoading(false)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600'
    if (value <= thresholds.warning) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time monitoring of system performance, user activity, and security
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* System Uptime */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.uptime}%</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
                <Progress value={systemMetrics.uptime} className="mt-2" />
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Currently online
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12% from last hour</span>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getStatusColor(systemMetrics.responseTime, { good: 200, warning: 500 })}`}>
                  {systemMetrics.responseTime}ms
                </div>
                <p className="text-xs text-muted-foreground">
                  Average API response
                </p>
              </CardContent>
            </Card>

            {/* Error Rate */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getStatusColor(systemMetrics.errorRate, { good: 1, warning: 5 })}`}>
                  {systemMetrics.errorRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          {/* System Resources */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Current resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CPU Usage</span>
                    <span>{systemMetrics.cpuUsage}%</span>
                  </div>
                  <Progress value={systemMetrics.cpuUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Memory Usage</span>
                    <span>{systemMetrics.memoryUsage}%</span>
                  </div>
                  <Progress value={systemMetrics.memoryUsage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>System notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      System backup completed successfully
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      Database maintenance scheduled for tonight
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Core Web Vitals */}
            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
                <CardDescription>Page performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>LCP</span>
                    <span className={getStatusColor(performanceMetrics.coreWebVitals.lcp, { good: 2.5, warning: 4 })}>
                      {performanceMetrics.coreWebVitals.lcp}s
                    </span>
                  </div>
                  <Progress value={(performanceMetrics.coreWebVitals.lcp / 4) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>FID</span>
                    <span className={getStatusColor(performanceMetrics.coreWebVitals.fid * 1000, { good: 100, warning: 300 })}>
                      {performanceMetrics.coreWebVitals.fid}s
                    </span>
                  </div>
                  <Progress value={(performanceMetrics.coreWebVitals.fid / 0.3) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CLS</span>
                    <span className={getStatusColor(performanceMetrics.coreWebVitals.cls * 1000, { good: 100, warning: 250 })}>
                      {performanceMetrics.coreWebVitals.cls}
                    </span>
                  </div>
                  <Progress value={(performanceMetrics.coreWebVitals.cls / 0.25) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Cache Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Cache Performance</CardTitle>
                <CardDescription>CDN and cache metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Cache Hit Rate</span>
                    <span>{performanceMetrics.cacheHitRate}%</span>
                  </div>
                  <Progress value={performanceMetrics.cacheHitRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CDN Performance</span>
                    <span>{performanceMetrics.cdnPerformance}%</span>
                  </div>
                  <Progress value={performanceMetrics.cdnPerformance} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Page Load Times */}
            <Card>
              <CardHeader>
                <CardTitle>Page Load Times</CardTitle>
                <CardDescription>Average page load performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {performanceMetrics.pageLoadTime}s
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Average across all pages
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* User Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>User engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Users</span>
                  <span className="font-bold">{userMetrics.totalUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>New Users (24h)</span>
                  <span className="font-bold text-green-600">+{userMetrics.newUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Users</span>
                  <span className="font-bold">{userMetrics.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Returning Users</span>
                  <span className="font-bold">{userMetrics.returningUsers}</span>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
                <CardDescription>User conversion performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversion Rate</span>
                    <span>{userMetrics.conversionRate}%</span>
                  </div>
                  <Progress value={userMetrics.conversionRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Avg Session Duration</span>
                    <span>{userMetrics.averageSessionDuration}m</span>
                  </div>
                  <Progress value={(userMetrics.averageSessionDuration / 10) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* User Activity */}
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Real-time user engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {systemMetrics.activeUsers}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Currently active users
                </p>
                <div className="flex items-center mt-4">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    From 12 countries
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Security Metrics */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{securityMetrics.failedLogins}</div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suspicious Activities</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{securityMetrics.suspiciousActivities}</div>
                <p className="text-xs text-muted-foreground">
                  Detected threats
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blocked Requests</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{securityMetrics.blockedRequests}</div>
                <p className="text-xs text-muted-foreground">
                  Firewall blocks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SSL Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  {getStatusBadge(securityMetrics.sslStatus)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Certificate valid
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Security Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>Recent security events and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    All security systems are operational
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    2 suspicious login attempts detected from unknown IP
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    SSL certificate renewed successfully
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 