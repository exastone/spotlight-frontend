import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import * as React from 'react';

interface WebAPIProps {
    token: AccessToken;
    children: React.ReactNode;
}

// Create a context
const SpotifyWebAPIContext = React.createContext<SpotifyApi | null>(null);

const WebAPI: React.FC<WebAPIProps> = ({ token, children }) => {
    const sdk = SpotifyApi.withAccessToken(
        import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        token
    );

    console.log("[WebAPI component]")
    console.log(sdk)

    return (
        <SpotifyWebAPIContext.Provider value={sdk}>
            {children}
        </SpotifyWebAPIContext.Provider>
    );
};

export default WebAPI;
export { SpotifyWebAPIContext };