import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "14d4edd9107f4e0ca7a54ebde7f3dd70"

const token = "00614d4edd9107f4e0ca7a54ebde7f3dd70IADqXTkO5Mfdu37m4Cg7mUkQrXM+SxNi5kAM91aqhMLZjWTNKL8AAAAAEADbqsx0CI/7YQEAAQAIj/th"

export const config = { mode: "rtc", codec: "vp8" , appId:appId , token:token}

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()
export const channelName = "main"