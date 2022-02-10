import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks  } from "agora-rtc-react";

import AgoraRTC, {
    IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack, IRemoteAudioTrack
} from 'agora-rtc-sdk-ng';

// import { IAgoraRTCRemoteUser} from 'agora-rtc-sdk-ng'

const appId = "14d4edd9107f4e0ca7a54ebde7f3dd70"

const token = "00614d4edd9107f4e0ca7a54ebde7f3dd70IAAxbki8qkyCbA7OrjZU2/GIYmw6DZXjF8Vrf/UB2PPLl2TNKL8AAAAAIgAxc9bWHzUGYgQAAQAdNQZiAgAdNQZiAwAdNQZiBAAdNQZi"

export const config = { mode: "rtc", codec: "vp8" , appId:appId , token:token}

export const useClient = createClient(config);

export const remoteClient = AgoraRTC.createClient(IAgoraRTCRemoteUser)

export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()

// export const remoteUser = IAgoraRTCClient()
// export const remoteAudioTrack = RemoteAudioTrackStats;
// export const remoteVideoTrack = RemoteVideoTrackStats;
// export const iagoraRemoteUser = IAgoraRTCRemoteUser;

export const channelName = "main"