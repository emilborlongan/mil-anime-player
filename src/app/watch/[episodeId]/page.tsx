import VideoPlayer from '../../components/Videoplayer';

interface WatchPageProps {
    params: {
        episodeId: string;
    };
}

const WatchPage: React.FC<WatchPageProps> = ({ params }) => {
    const { episodeId } = params;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Watch test - Episode {episodeId}</h1>
            <VideoPlayer episodeId={episodeId} />
        </div>
    );
};

export default WatchPage;
