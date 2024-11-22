// app/api/proxy/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    console.log('foo');

    const { searchParams } = new URL(req.url);
    const episodeId = searchParams.get('episodeId');

    console.log('bar');

    if (!episodeId) {
        return NextResponse.json(
            { error: 'Missing animeId or episode parameter' },
            { status: 400 }
        );
    }

    console.log('bear');

    const apiUrl = `https://consumet-api-blond-iota.vercel.app/anime/zoro/watch/${episodeId}?server=vidcloudv`;

    try {
        // Fetch data from the Consumet API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Return the data with CORS headers
        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch (error) {
        console.error('Error fetching API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data from Consumet API' },
            { status: 500 }
        );
    }
}
