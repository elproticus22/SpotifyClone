const DEEZER_API_BASE = 'https://api.deezer.com';

export const deezerService = {
    // Get featured charts
    getFeaturedCharts: () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `${DEEZER_API_BASE}/chart/0/albums?output=jsonp&callback=handleFeaturedCharts`;
            window.handleFeaturedCharts = (data) => {
                resolve(data.data);
                document.body.removeChild(script);
                delete window.handleFeaturedCharts;
            };
            document.body.appendChild(script);
        });
    },

    // Get today's hits
    getTodaysHits: () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `${DEEZER_API_BASE}/chart/0/tracks?output=jsonp&callback=handleTodaysHits`;
            window.handleTodaysHits = (data) => {
                resolve(data.data);
                document.body.removeChild(script);
                delete window.handleTodaysHits;
            };
            document.body.appendChild(script);
        });
    },

    // Get album details
    getAlbumDetails: (albumId) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `${DEEZER_API_BASE}/album/${albumId}?output=jsonp&callback=handleAlbumDetails`;
            window.handleAlbumDetails = (data) => {
                resolve(data);
                document.body.removeChild(script);
                delete window.handleAlbumDetails;
            };
            document.body.appendChild(script);
        });
    },

    // Get album tracks
    getAlbumTracks: (albumId) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `${DEEZER_API_BASE}/album/${albumId}/tracks?output=jsonp&callback=handleAlbumTracks`;
            window.handleAlbumTracks = (data) => {
                resolve(data.data);
                document.body.removeChild(script);
                delete window.handleAlbumTracks;
            };
            document.body.appendChild(script);
        });
    },

    // Get track preview
    getTrackPreview: (trackId) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `${DEEZER_API_BASE}/track/${trackId}?output=jsonp&callback=handleTrackPreview`;
            window.handleTrackPreview = (data) => {
                resolve(data.preview);
                document.body.removeChild(script);
                delete window.handleTrackPreview;
            };
            document.body.appendChild(script);
        });
    },

    // Search for tracks and artists
    search: (query) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `${DEEZER_API_BASE}/search?q=${encodeURIComponent(query)}&output=jsonp&callback=handleSearch`;
            window.handleSearch = (data) => {
                resolve({
                    tracks: data.data.filter(item => item.type === 'track'),
                    artists: data.data.filter(item => item.type === 'artist')
                });
                document.body.removeChild(script);
                delete window.handleSearch;
            };
            document.body.appendChild(script);
        });
    }
}; 