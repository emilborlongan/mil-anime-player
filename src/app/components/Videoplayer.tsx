import React, { useEffect, useState } from 'react';
import Plyr from 'plyr';  // Assuming you're using Plyr for video player

type VideoPlayerProps = {
    episodeId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ episodeId }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    // Fetch the video stream URL from the proxy route
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`/api/proxy?animeId=${episodeId}`);
                const data = await response.json();

                if (data.sources && data.sources.length > 0) {
                    // Assuming `data.sources[0].url` holds the HLS URL
                    setVideoUrl(data.sources[0].url);
                } else {
                    console.error('No video sources available');
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideo();
    }, [episodeId]);

    return (
        <div>
            {videoUrl ? (
                <video
                    controls
                    autoPlay
                    ref={(el) => {
                        if (el) {
                            new Plyr(el, {
                                autoplay: true
                            });
                        }
                    }}
                >
                    <source src={videoUrl} type="application/x-mpegURL" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VideoPlayer;
