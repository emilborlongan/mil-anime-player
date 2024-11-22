import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
    }

    try {
        // Fetch the `.m3u8` file
        const response = await axios.get(url, { responseType: 'text' }); // Get the file as plain text
        let content = response.data;

        // Rewrite relative paths in the `.m3u8` file to absolute URLs
        const baseUrl = new URL(url).origin;
        content = content.replace(/^(?!http|#)(.*)$/gm, (line: any) => `${baseUrl}/${line}`);

        console.log({content})

        return new NextResponse(content, {
            headers: {
                'Content-Type': 'application/vnd.apple.mpegurl',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error: any) {
        console.error('Error fetching proxied URL:', error);

        const status = error.response?.status || 500;
        const message = error.response?.data || 'Failed to fetch the requested URL';

        return NextResponse.json({ error: message }, { status });
    }
}