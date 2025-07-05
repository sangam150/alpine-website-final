import { NextRequest, NextResponse } from 'next/server';
import { getAllContentBlocks, createContentBlock, updateContentBlock, deleteContentBlock } from '@/lib/content-management';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    if (page) {
      // Return content for specific page
      const blocks = await getAllContentBlocks();
      const pageBlocks = blocks.filter(block => block.page === page && block.isActive);
      return NextResponse.json(pageBlocks);
    }
    
    // Return all content blocks
    const blocks = await getAllContentBlocks();
    return NextResponse.json(blocks);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, value, page, section, order, isActive, metadata } = body;
    
    if (!type || !value || !page || !section) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const blockId = await createContentBlock({
      type,
      value,
      page,
      section,
      order: order || 0,
      isActive: isActive !== false,
      metadata
    });
    
    return NextResponse.json({ id: blockId, success: true });
  } catch (error) {
    console.error('Error creating content block:', error);
    return NextResponse.json({ error: 'Failed to create content block' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing content block ID' }, { status: 400 });
    }
    
    await updateContentBlock(id, updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content block:', error);
    return NextResponse.json({ error: 'Failed to update content block' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing content block ID' }, { status: 400 });
    }
    
    await deleteContentBlock(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content block:', error);
    return NextResponse.json({ error: 'Failed to delete content block' }, { status: 500 });
  }
} 