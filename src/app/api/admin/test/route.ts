import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (this would be implemented with proper auth)
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Mock admin check - in real implementation, verify JWT token
    const isAdmin = authHeader.includes('admin');
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: 'Admin API is working',
      timestamp: new Date().toISOString(),
      status: 'success'
    });

  } catch (error) {
    console.error('Admin test API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 