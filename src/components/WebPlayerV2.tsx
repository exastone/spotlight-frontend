// import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import PlaybackToggleButton from "./PlaybackToggleButton";

interface WebPlayerV2Props {
  token: string;
}


const WebPlayerV2: React.FC<WebPlayerV2Props> = (props) => {
  const [player, setPlayer] = useState<any>(undefined);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new (window as any).Spotify.Player({
        name: "Spotlight - Dev App",
        getOAuthToken: (cb: (token: string) => void) => { cb(props.token); },
      });

      setPlayer(player);

      // Add event listeners
      player.addListener("ready", ({ device_id }: { device_id: any }) => {
        console.log("Ready with Device ID", device_id);
        // console.log("Player", player);
        setIsConnected(true);
      });

      player.addListener("not_ready", ({ device_id }: { device_id: any }) => {
        console.log("Device ID has gone offline", device_id);
        setIsConnected(false);
      });

      player.addListener('initialization_error', ({ message }: { message: Error }) => {
        console.error(message);
        setIsConnected(false);
      });

      player.addListener('authentication_error', ({ message }: { message: Error }) => {
        console.error(message);
        setIsConnected(false);
      });

      player.addListener('account_error', ({ message }: { message: Error }) => {
        console.error(message);
        setIsConnected(false);
      });

      player.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules');
      });

      player.addListener('player_state_changed', ({
        position,
        duration,
        track_window: {
          current_track
        }, }:
        {
          position: number;
          duration: number;
          track_window: {
            current_track: any;
          };
        }) => {
        console.log('Currently Playing', current_track);
        console.log('Position in Song', position);
        console.log('Duration of Song', duration);
      });



      // Connect to the player
      player.connect().then((success: boolean) => {
        if (success) {
          console.log("The Web Playback SDK successfully connected to Spotify!");
        }
      });
    };

  }, []);

  return (
    <div>
      <h1>Spotify Web Playback SDK Quick Start</h1>
      {isConnected && <PlaybackToggleButton player={player} />}
      {/* Add any other JSX elements for your player UI */}
    </div>
  );
};

export default WebPlayerV2