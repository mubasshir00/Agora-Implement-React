import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks ,createScreenVideoTrack } from "agora-rtc-react";
import { createChannel, RtmMessage } from 'agora-rtm-react'

import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  ScreenVideoTrackInitConfig,
} from 'agora-rtc-sdk-ng';


// import { IAgoraRTCRemoteUser} from 'agora-rtc-sdk-ng'

const appId = "d830e79c7c344e31924cc6b372a8e5f5"

const token = "00614d4edd9107f4e0ca7a54ebde7f3dd70IAD/vRuvjihterO9Lg0k427Lp4kfZ9Kpob9DMfxZBHH0e2TNKL8AAAAAIgB0jUCUfNEVYgQAAQB80RViAgB80RViAwB80RViBAB80RVi"

export const config = { mode: "rtc", codec: "vp8" , appId:appId }

export const useClient = createClient(config);
export const useChannel = createChannel('main');

export const remoteClient = AgoraRTC.createClient(IAgoraRTCRemoteUser)

export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()

export const useScreenVideoTrack = createScreenVideoTrack();

// export const remoteUser = IAgoraRTCClient()
// export const remoteAudioTrack = RemoteAudioTrackStats;
// export const remoteVideoTrack = RemoteVideoTrackStats;
// export const iagoraRemoteUser = IAgoraRTCRemoteUser;
// let channel = client.createChannel("demoChannel")



export const channelName = "main"