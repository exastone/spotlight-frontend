import React, { useContext, useEffect, useState } from 'react';
import { SpotifyWebAPIContext } from './WebAPI';
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const getUserProfile = async (sdk: SpotifyApi | null, setUser: React.Dispatch<React.SetStateAction<any>>) => {
    if (sdk) {
        try {
            const user = await sdk.currentUser.profile();
            setUser(user);
        } catch (error) {
            console.error("Error getting user profile:", error);
        }
    }
};

const getDevices = async (sdk: SpotifyApi | null, setDevices: React.Dispatch<React.SetStateAction<{ id: string | null; name: string; is_active: boolean }[]>>) => {
    if (sdk) {
        try {
            const response = await sdk.player.getAvailableDevices();
            const deviceList = response.devices.map(device => ({
                id: device.id,
                name: device.name,
                is_active: device.is_active
            }));
            console.log(deviceList);

            setDevices(deviceList);
        } catch (error) {
            console.error("Error getting devices:", error);
        }
    }
};

const WebAPIController: React.FC = () => {
    const sdk = useContext(SpotifyWebAPIContext);
    const [user, setUser] = useState<any>(null);
    const [devices, setDevices] = useState<{
        id: string | null,
        name: string,
        is_active: boolean
    }[]>([]);


    useEffect(() => {
        getUserProfile(sdk, setUser);
        getDevices(sdk, setDevices);

    }, [sdk]);

    return (
        <div>
            <h2>WebAPIController</h2>
            {user ? (
                <div>
                    <h3>{user.display_name}</h3>
                    <p>{user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <ul>
                {devices.map((device, index) => (
                    <li key={index}>
                        {device.name} | ({device.id}) active: {device.is_active}
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default WebAPIController;
