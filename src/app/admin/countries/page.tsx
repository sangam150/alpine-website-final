"use client";
import { useEffect, useState } from "react";
import { CountryPage } from "@/types/cms";
import { getAllCountries, addCountry, updateCountry, deleteCountry } from "@/lib/content-management";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CountriesPage() {
  const [countries, setCountries] = useState<CountryPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<CountryPage | null>(null);
  const [form, setForm] = useState<Partial<CountryPage>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  async function fetchCountries() {
    setLoading(true);
    try {
      const data = await getAllCountries();
      setCountries(data);
    } catch (e) {
      setError("Failed to load countries");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(country?: CountryPage) {
    setEditing(country || null);
    setForm(country ? { ...country } : {});
  }

  function cancelEdit() {
    setEditing(null);
    setForm({});
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing && editing.id) {
        await updateCountry(editing.id, form);
      } else {
        await addCountry(form as any);
      }
      await fetchCountries();
      cancelEdit();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this country?")) return;
    await deleteCountry(id);
    await fetchCountries();
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Country Pages Editor</h1>
      <p className="text-gray-600 mb-6">Edit content for each study destination here.</p>
      <Button onClick={() => startEdit()} className="mb-4">Add Country</Button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          {countries.map((country) => (
            <div key={country.id} className="border p-4 rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{country.name}</div>
                <div className="text-gray-500 text-sm">{country.slug}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(country)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(country.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {(editing || form) && (
        <div className="mt-8 border rounded p-6 bg-white shadow">
          <h2 className="text-lg font-bold mb-4">{editing ? "Edit Country" : "Add Country"}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <Input value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block font-medium mb-1">Slug</label>
              <Input value={form.slug || ""} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required />
            </div>
            <div>
              <label className="block font-medium mb-1">Flag (emoji or URL)</label>
              <Input value={form.flag || ""} onChange={e => setForm(f => ({ ...f, flag: e.target.value }))} />
            </div>
            <div>
              <label className="block font-medium mb-1">Description</label>
              <Textarea value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            {/* Add more fields for stats, universities, visa info, FAQs, SEO meta, images, etc. as needed */}
            <div className="flex gap-2 mt-4">
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
              <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
