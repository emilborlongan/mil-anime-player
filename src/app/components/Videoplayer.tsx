'use client';

import dynamic from 'next/dynamic';
//import useSWR from 'swr';
import React, { useEffect, useState, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';

type VideoPlayerProps = {
    videoUrl: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(videoUrl)}`;
    //const proxyUrl = `/api/proxy?url=${videoUrl}`;

    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Use SWR to prefetch metadata or validate the video URL
    /* const { data, error } = useSWR(proxyUrl, fetcher);

    if (error) return <p>Error loading video metadata</p>;
    if (!data) return <p>Loading video...</p>; */

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            if (Hls.isSupported()) {
                const hls = new Hls();

                hls.loadSource(proxyUrl);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    new Plyr(video, { autoplay: false });
                });

                // Cleanup HLS instance
                return () => {
                    hls.destroy();
                };
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Native HLS support (e.g., Safari)
                video.src = proxyUrl;
                new Plyr(video, { autoplay: false });
            } else {
                console.error('HLS is not supported in this browser.');
            }
        }
    }, [videoUrl]);    

    return (
        <div>
            <video
                ref={videoRef}
                controls
                style={{ width: '100%' }}
                playsInline
            />
        </div>
    );

   /*  const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (Hls.isSupported() && videoRef.current) {
            const hls = new Hls();
            hls.loadSource(proxyUrl); // Use your proxy URL here
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS.js Error:', data);
            });
        }
    }, [proxyUrl]);

    return <video ref={videoRef} controls style={{ width: '100%' }}></video>; */
};

export default VideoPlayer;
