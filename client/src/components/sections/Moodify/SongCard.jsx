import React from 'react';

function SongCard(props) {
    var trackInfo = props.trackInfo;
    var artists = trackInfo.artists.map(x => x.name).join(", ");
    return (
        <div className="song-card">
            <svg className="carousel-svg" id="eq5OFUdS0ym1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 350" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                <ellipse rx="30.34" ry="30.341809" transform="translate(9.534188 8.38012)" fill="#3c9" />
                <ellipse rx="7.8" ry="7.802179" transform="translate(31.398086 59.816711)" fill="#ff9f80" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(3.177339 0 0 3.177339 67.091628 38.721929)" fill="#ff9f80" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(2.355603 0 0 2.355603 160.3052 77.286999)" fill="#ff9f80" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(2.082794 0 0 2.082794 210.713925 42.657831)" fill="#ff9f80" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(2.082973 0 0 2.082973 75.62768 67.61889)" fill="#3c9" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(1.885215 0 0 1.885215 152.626572 69.161833)" fill="#3c9" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(.983769 0 0 0.983769 198.262006 239.363615)" fill="#3c9" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(1.885215 0 0 1.885215 53.902763 193.378836)" fill="#3c9" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(1.368692 0 0 1.368692 131.178031 0)" fill="#3c9" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(3.821968 0 0 3.821968 201.130591 178.670051)" fill="#ff9f80" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(2.355603 0 0 2.355603 27.844623 132.423507)" fill="#ff9f80" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(1.412057 0 0 1.412057 171.319242 18.378836)" fill="#ff9f80" />
                <ellipse rx="7.8" ry="7.802179" transform="matrix(.497375 0 0 0.497375 194.468132 111.59045)" fill="#3c9" />
            </svg>
            <img
                src={trackInfo.album.images[0].url}
                alt=""
                className="album-cover"
            />
            <div className="song-title">{trackInfo.name}</div>
            <div className="artist">{artists}</div>
            <a target="_blank" href={trackInfo.external_urls.spotify}>
                <button style={{
                    backgroundColor: "#1DB954", // Spotify green
                    color: "white",
                    padding: "0.75rem 2rem",
                    fontSize: "1.2rem",
                    border: "none",
                    borderRadius: "8px",
                    marginTop: "1rem",
                    cursor: "pointer"
                }}> Play </button>
            </a>

        </div>
    )
}

export default SongCard;