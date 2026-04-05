import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const CONFIG_PATH = path.join(process.cwd(), 'src/config/pricing.json');

export async function GET() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    await fs.writeFile(CONFIG_PATH, JSON.stringify(newData, null, 2));
    return NextResponse.json({ message: 'Config updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write config' }, { status: 500 });
  }
}
