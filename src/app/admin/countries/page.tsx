'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Globe, DollarSign, Users } from 'lucide-react';
import { fetchAll, addItem, updateItem, deleteItem } from '@/lib/firestore-admin';

interface Country {
  id: string;
  name: string;
  flag: string;
  tuition: {
    min: number;
    max: number;
    currency: string;
  };
  visa: {
    successRate: number;
    processingTime: string;
    requirements: string[];
  };
  universities: number;
  description: string;
  filters: string[];
}

export default function CountriesManagement() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch countries from Firestore
  useEffect(() => {
    setLoading(true);
    fetchAll('countries').then((data) => {
      setCountries(data as Country[]);
      setLoading(false);
    });
  }, []);

  const handleSave = async (country: Country) => {
    setLoading(true);
    if (editingCountry) {
      await updateItem('countries', country.id, country);
    } else {
      await addItem('countries', country);
    }
    const data = await fetchAll('countries');
    setCountries(data as Country[]);
    setEditingCountry(null);
    setIsDialogOpen(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteItem('countries', id);
    const data = await fetchAll('countries');
    setCountries(data as Country[]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Countries Management</h1>
          <p className="text-gray-600">Manage country information, visa details, and tuition fees</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Country
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCountry ? 'Edit Country' : 'Add New Country'}</DialogTitle>
              <DialogDescription>
                Enter the details for the country
              </DialogDescription>
            </DialogHeader>
            <CountryForm
              country={editingCountry}
              onSave={handleSave}
              onCancel={() => {
                setEditingCountry(null);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading countries...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card key={country.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{country.flag}</span>
                      <CardTitle>{country.name}</CardTitle>
                    </div>
                    <CardDescription>{country.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCountry(country);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(country.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Tuition</p>
                      <p className="text-xs text-gray-600">
                        {country.tuition.min.toLocaleString()} - {country.tuition.max.toLocaleString()} {country.tuition.currency}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Universities</p>
                      <p className="text-xs text-gray-600">{country.universities}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Visa Success Rate</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${country.visa.successRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{country.visa.successRate}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Filters</p>
                  <div className="flex flex-wrap gap-1">
                    {country.filters.map((filter) => (
                      <span
                        key={filter}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function CountryForm({ country, onSave, onCancel }: {
  country: Country | null;
  onSave: (country: Country) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Country>(country || {
    id: '',
    name: '',
    flag: '',
    tuition: { min: 0, max: 0, currency: 'USD' },
    visa: { successRate: 0, processingTime: '', requirements: [] },
    universities: 0,
    description: '',
    filters: []
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Country Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Australia"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Flag Emoji</label>
          <Input
            value={formData.flag}
            onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
            placeholder="🇦🇺"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Country description..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Min Tuition</label>
          <Input
            type="number"
            value={formData.tuition.min}
            onChange={(e) => setFormData({
              ...formData,
              tuition: { ...formData.tuition, min: parseInt(e.target.value) }
            })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Max Tuition</label>
          <Input
            type="number"
            value={formData.tuition.max}
            onChange={(e) => setFormData({
              ...formData,
              tuition: { ...formData.tuition, max: parseInt(e.target.value) }
            })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Currency</label>
          <Select
            value={formData.tuition.currency}
            onValueChange={(value) => setFormData({
              ...formData,
              tuition: { ...formData.tuition, currency: value }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="NZD">NZD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Visa Success Rate (%)</label>
          <Input
            type="number"
            value={formData.visa.successRate}
            onChange={(e) => setFormData({
              ...formData,
              visa: { ...formData.visa, successRate: parseInt(e.target.value) }
            })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Universities</label>
          <Input
            type="number"
            value={formData.universities}
            onChange={(e) => setFormData({ ...formData, universities: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)}>
          Save
        </Button>
      </div>
    </div>
  );
} 