export const renderArtists = artists => {
    return artists
        .map(artist => {
            return `<router-link :to="{name: 'artist', params: {id: ${artist.id}}">${artist.name}</router-link>`;
        })
        .join(", ");
};
