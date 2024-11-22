import VideoPlayer from '../components/Videoplayer';
import { ANIME, StreamingServers } from '@consumet/extensions';

interface WatchPageProps {
    params: {
        episodeId: string;
    };
}

const WatchPage: React.FC<WatchPageProps> = async () => {
   // const { episodeId } = await params; { params }

    // <providerName> is the name of the provider you want to use. list of the proivders is below.
    const animeProvider = new ANIME.Gogoanime();
    const results = await animeProvider.search("dandadan");
    console.log({results})
    const firstAnime = results.results[0];
    const animeINfo = await animeProvider.fetchAnimeInfo(firstAnime.id);
    const episodes = animeINfo.episodes ?? [1];
    console.log(episodes[0]);
    const firstEpisode = episodes[0]
    const animeINfoEpisodes = await animeProvider.fetchEpisodeSources(firstEpisode.id, StreamingServers.StreamWish)

    

    const videoUrlSource = animeINfoEpisodes.sources[2].url

    

    console.log(videoUrlSource)
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Watch Emil test</h1>
            <VideoPlayer videoUrl={videoUrlSource} />
        </div>
    );
};

export default WatchPage;
