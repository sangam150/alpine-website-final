'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  MapPin,
  BookOpen
} from 'lucide-react';

interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  description: string;
  universities: number;
  averageTuition: string;
  visaProcessingTime: string;
  languageRequirements: string[];
  popularCourses: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const mockCountries: Country[] = [
  {
    id: '1',
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    description: 'World-class education with beautiful landscapes and excellent quality of life.',
    universities: 43,
    averageTuition: 'AUD 20,000-35,000',
    visaProcessingTime: '4-8 weeks',
    languageRequirements: ['IELTS 6.0-7.0', 'PTE 50-65'],
    popularCourses: ['Computer Science', 'Business Administration', 'Engineering'],
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    description: 'High-quality education with opportunities for permanent residency.',
    universities: 97,
    averageTuition: 'CAD 15,000-30,000',
    visaProcessingTime: '6-12 weeks',
    languageRequirements: ['IELTS 6.0-7.0', 'CELPIP 6-7'],
    popularCourses: ['Computer Science', 'Healthcare', 'Business'],
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'United Kingdom',
    code: 'UK',
    flag: '🇬🇧',
    description: 'Historic universities with world-renowned academic excellence.',
    universities: 130,
    averageTuition: 'GBP 15,000-35,000',
    visaProcessingTime: '3-6 weeks',
    languageRequirements: ['IELTS 6.0-7.5', 'PTE 50-70'],
    popularCourses: ['Business', 'Law', 'Medicine'],
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    description: 'Affordable education with strong focus on research and innovation.',
    universities: 400,
    averageTuition: 'EUR 0-1,500',
    visaProcessingTime: '8-12 weeks',
    languageRequirements: ['IELTS 6.0-7.0', 'TestDaF 4-5'],
    popularCourses: ['Engineering', 'Computer Science', 'Medicine'],
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
];

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>(mockCountries);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(mockCountries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter countries based on search and status
  useEffect(() => {
    let filtered = countries;
    
    if (searchTerm) {
      filtered = filtered.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(country => country.status === statusFilter);
    }
    
    setFilteredCountries(filtered);
  }, [countries, searchTerm, statusFilter]);

  const handleAddCountry = (countryData: Omit<Country, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCountry: Country = {
      ...countryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCountries([...countries, newCountry]);
    setIsAddDialogOpen(false);
  };

  const handleEditCountry = (countryData: Omit<Country, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedCountry) return;
    
    setCountries(countries.map(country => 
      country.id === selectedCountry.id 
        ? { 
            ...countryData, 
            id: selectedCountry.id,
            createdAt: selectedCountry.createdAt,
            updatedAt: new Date().toISOString() 
          }
        : country
    ));
    setIsEditDialogOpen(false);
    setSelectedCountry(null);
  };

  const handleDeleteCountry = (id: string) => {
    if (confirm('Are you sure you want to delete this country?')) {
      setCountries(countries.filter(country => country.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Countries Management</h1>
          <p className="text-gray-600 mt-2">Manage study destinations and their information</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Country
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countries.length}</div>
            <p className="text-xs text-muted-foreground">Active destinations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Countries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countries.filter(c => c.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently accepting students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Universities</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countries.reduce((sum, c) => sum + c.universities, 0)}</div>
            <p className="text-xs text-muted-foreground">Partner institutions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6-8 weeks</div>
            <p className="text-xs text-muted-foreground">Visa processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('inactive')}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Countries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <Card key={country.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <CardTitle className="text-lg">{country.name}</CardTitle>
                    <CardDescription>{country.code}</CardDescription>
                  </div>
                </div>
                <Badge variant={country.status === 'active' ? 'default' : 'secondary'}>
                  {country.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{country.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <span>{country.universities} universities</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span>{country.averageTuition}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{country.visaProcessingTime}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsViewDialogOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteCountry(country.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Country Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Country</DialogTitle>
            <DialogDescription>
              Add a new study destination with all relevant information.
            </DialogDescription>
          </DialogHeader>
          <CountryForm
            onSubmit={handleAddCountry}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Country Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogDescription>
              Update the country information.
            </DialogDescription>
          </DialogHeader>
          {selectedCountry && (
            <CountryForm
              country={selectedCountry}
              onSubmit={handleEditCountry}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedCountry(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Country Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Country Details</DialogTitle>
            <DialogDescription>
              View detailed information about the country.
            </DialogDescription>
          </DialogHeader>
          {selectedCountry && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCountry.name}</h3>
                  <p className="text-gray-600">{selectedCountry.code}</p>
                </div>
                <Badge variant={selectedCountry.status === 'active' ? 'default' : 'secondary'}>
                  {selectedCountry.status}
                </Badge>
              </div>
              
              <p className="text-gray-700">{selectedCountry.description}</p>
              
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="courses">Popular Courses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{selectedCountry.universities} universities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{selectedCountry.averageTuition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{selectedCountry.visaProcessingTime}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-4">
                  <h4 className="font-semibold">Language Requirements</h4>
                  <div className="space-y-2">
                    {selectedCountry.languageRequirements.map((req, index) => (
                      <Badge key={index} variant="outline">{req}</Badge>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-4">
                  <h4 className="font-semibold">Popular Courses</h4>
                  <div className="space-y-2">
                    {selectedCountry.popularCourses.map((course, index) => (
                      <Badge key={index} variant="secondary">{course}</Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Country Form Component
interface CountryFormProps {
  country?: Country;
  onSubmit: (data: Omit<Country, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

function CountryForm({ country, onSubmit, onCancel }: CountryFormProps) {
  const [formData, setFormData] = useState({
    name: country?.name || '',
    code: country?.code || '',
    flag: country?.flag || '',
    description: country?.description || '',
    universities: country?.universities || 0,
    averageTuition: country?.averageTuition || '',
    visaProcessingTime: country?.visaProcessingTime || '',
    languageRequirements: country?.languageRequirements || [],
    popularCourses: country?.popularCourses || [],
    status: country?.status || 'active' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Country Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Country Code</label>
          <Input
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Flag Emoji</label>
        <Input
          value={formData.flag}
          onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
          placeholder="🇦🇺"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded-md"
          rows={3}
          required
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Universities</label>
          <Input
            type="number"
            value={formData.universities}
            onChange={(e) => setFormData({ ...formData, universities: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Average Tuition</label>
          <Input
            value={formData.averageTuition}
            onChange={(e) => setFormData({ ...formData, averageTuition: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Visa Processing Time</label>
          <Input
            value={formData.visaProcessingTime}
            onChange={(e) => setFormData({ ...formData, visaProcessingTime: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
          className="w-full p-2 border rounded-md"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      <div className="flex gap-2">
        <Button type="submit">
          {country ? 'Update Country' : 'Add Country'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
} 