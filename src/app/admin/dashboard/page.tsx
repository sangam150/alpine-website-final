import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  BookOpen,
  MessageSquare,
  Activity,
  Target
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Alpine Education Management System',
  description: 'Admin dashboard for Alpine Education management system. Track students, applications, revenue, and performance metrics. Real-time analytics and reporting.',
  keywords: 'admin dashboard, Alpine Education management, student tracking, application management, revenue analytics, performance metrics, study abroad admin',
  openGraph: {
    title: 'Admin Dashboard - Alpine Education Management System',
    description: 'Admin dashboard for Alpine Education management system. Track students, applications, revenue, and performance metrics.',
    url: 'https://alpinevisa.com.np/admin/dashboard',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Admin Dashboard - Alpine Education Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard - Alpine Education Management System',
    description: 'Admin dashboard for Alpine Education management system. Track students, applications, revenue, and performance metrics.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/admin/dashboard',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const stats = [
  {
    title: 'Total Students',
    value: '1,247',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Active Applications',
    value: '89',
    change: '+5%',
    trend: 'up',
    icon: FileText,
    color: 'green'
  },
  {
    title: 'Revenue (This Month)',
    value: 'Rs. 2.4M',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    color: 'purple'
  },
  {
    title: 'Success Rate',
    value: '94%',
    change: '+2%',
    trend: 'up',
    icon: Target,
    color: 'orange'
  }
];

const recentActivities = [
  {
    type: 'application',
    message: 'New application received from Sarah Johnson for Australia',
    time: '2 minutes ago',
    status: 'pending'
  },
  {
    type: 'payment',
    message: 'Payment received from Michael Chen - Rs. 45,000',
    time: '15 minutes ago',
    status: 'completed'
  },
  {
    type: 'visa',
    message: 'Visa approved for Priya Sharma - Canada Student Visa',
    time: '1 hour ago',
    status: 'approved'
  },
  {
    type: 'enquiry',
    message: 'New enquiry from Rajesh Kumar about UK universities',
    time: '2 hours ago',
    status: 'new'
  },
  {
    type: 'test',
    message: 'IELTS test scheduled for David Wilson on March 25',
    time: '3 hours ago',
    status: 'scheduled'
  }
];

const topCountries = [
  { country: 'Australia', applications: 45, successRate: '96%' },
  { country: 'Canada', applications: 38, successRate: '94%' },
  { country: 'UK', applications: 32, successRate: '92%' },
  { country: 'USA', applications: 28, successRate: '89%' },
  { country: 'Germany', applications: 15, successRate: '87%' }
];

const upcomingEvents = [
  {
    title: 'IELTS Mock Test',
    date: 'March 20, 2024',
    time: '9:00 AM',
    participants: 25,
    type: 'test'
  },
  {
    title: 'University Fair - Australia',
    date: 'March 25, 2024',
    time: '2:00 PM',
    participants: 50,
    type: 'event'
  },
  {
    title: 'Visa Interview Prep',
    date: 'March 28, 2024',
    time: '10:00 AM',
    participants: 12,
    type: 'workshop'
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with Alpine Education.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600'
            };
            
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const statusColors = {
                      pending: 'bg-yellow-100 text-yellow-800',
                      completed: 'bg-green-100 text-green-800',
                      approved: 'bg-blue-100 text-blue-800',
                      new: 'bg-purple-100 text-purple-800',
                      scheduled: 'bg-orange-100 text-orange-800'
                    };
                    
                    return (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{activity.time}</span>
                            <Badge className={`text-xs ${statusColors[activity.status as keyof typeof statusColors]}`}>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Top Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{country.country}</p>
                        <p className="text-sm text-gray-600">{country.applications} applications</p>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {country.successRate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 rounded-lg border hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                          <p className="text-xs text-gray-500">{event.participants} participants</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="w-full" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  New Application
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Event
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 