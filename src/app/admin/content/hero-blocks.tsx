"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPageContent, createContentBlock, updateContentBlock, deleteContentBlock, ContentBlock } from "@/lib/content-management";
import { Plus, Trash2, Save, ArrowUp, ArrowDown } from "lucide-react";

const HERO_PAGE = "home";
const HERO_SECTION = "hero";

const BLOCK_TYPES = [
  { value: "heading", label: "Heading" },
  { value: "paragraph", label: "Paragraph" },
  { value: "cta", label: "CTA Button" },
  { value: "list", label: "Badge/Stat" },
];

export default function HeroBlocksAdmin() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ContentBlock | null>(null);
  const [form, setForm] = useState<Partial<ContentBlock>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlocks();
  }, []);

  async function fetchBlocks() {
    setLoading(true);
    const all = await getPageContent(HERO_PAGE);
    setBlocks(
      all.filter(b => b.section === HERO_SECTION).sort((a, b) => a.order - b.order)
    );
    setLoading(false);
  }

  function startEdit(block?: ContentBlock) {
    setEditing(block || null);
    setForm(
      block
        ? { ...block }
        : { type: "heading" as ContentBlock["type"], value: "", order: blocks.length + 1, isActive: true, section: HERO_SECTION, page: HERO_PAGE }
    );
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
        await updateContentBlock(editing.id, form);
      } else {
        await createContentBlock({
          ...form,
          page: HERO_PAGE,
          section: HERO_SECTION,
          isActive: true,
          order: form.order || blocks.length + 1,
        } as any);
      }
      await fetchBlocks();
      cancelEdit();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this block?")) return;
    await deleteContentBlock(id);
    await fetchBlocks();
  }

  async function moveBlock(idx: number, dir: -1 | 1) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    const reordered = [...blocks];
    [reordered[idx], reordered[newIdx]] = [reordered[newIdx], reordered[idx]];
    // Update order in Firestore
    await Promise.all(
      reordered.map((b, i) => updateContentBlock(b.id, { order: i + 1 }))
    );
    await fetchBlocks();
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Blocks</CardTitle>
          <Button onClick={() => startEdit()} className="mt-2" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Block
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-4">
              {blocks.map((block, idx) => (
                <div key={block.id} className="flex items-center gap-4 border p-3 rounded-md bg-gray-50">
                  <div className="flex-1">
                    <div className="font-semibold">{BLOCK_TYPES.find(t => t.value === block.type)?.label || block.type}</div>
                    <div className="text-gray-700 text-sm truncate max-w-xs">{block.value}</div>
                    <div className="text-xs text-gray-400">Order: {block.order}</div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => moveBlock(idx, -1)} disabled={idx === 0} title="Move Up"><ArrowUp /></Button>
                  <Button size="icon" variant="ghost" onClick={() => moveBlock(idx, 1)} disabled={idx === blocks.length - 1} title="Move Down"><ArrowDown /></Button>
                  <Button size="icon" variant="outline" onClick={() => startEdit(block)} title="Edit"><Save /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(block.id)} title="Delete"><Trash2 /></Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Form */}
      {(editing || form.type) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{editing ? "Edit Block" : "Add Block"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select
                  value={form.type as string}
                  onValueChange={v => setForm(f => ({ ...f, type: v as ContentBlock["type"] }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BLOCK_TYPES.map(t => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  value={form.value || ""}
                  onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label>Order</Label>
                <Input
                  type="number"
                  value={form.order || blocks.length + 1}
                  onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                  min={1}
                  max={blocks.length + 1}
                />
              </div>
              <div>
                <Label>Active</Label>
                <Select
                  value={form.isActive ? "true" : "false"}
                  onValueChange={v => setForm(f => ({ ...f, isActive: v === "true" }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Metadata for CTA */}
              {form.type === "cta" && (
                <div className="space-y-2">
                  <Label>Button Link (href)</Label>
                  <Input
                    value={form.metadata && typeof (form.metadata as any)["href"] === "string" ? (form.metadata as any)["href"] : ""}
                    onChange={e => setForm(f => ({ ...f, metadata: { ...(f.metadata as any), href: e.target.value } }))}
                  />
                  <Label>Open in new tab?</Label>
                  <Select
                    value={form.metadata && (form.metadata as any)["external"] ? "true" : "false"}
                    onValueChange={v => setForm(f => ({ ...f, metadata: { ...(f.metadata as any), external: v === "true" } }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 