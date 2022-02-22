import { createChannel, createClient, RtmMessage } from 'agora-rtm-react'
import AgoraRTM from 'agora-rtm-sdk'

const appID =  '14d4edd9107f4e0ca7a54ebde7f3dd70'
export const useClientRTM = createClient(appID);

// export const channelName = "main"

export const useChannelRTM = createChannel('main')

export const useClientRTMInstance = AgoraRTM.createInstance(appID)
export const useChannelRTMInstance = useClientRTMInstance.createChannel('main')


const token = "00614d4edd9107f4e0ca7a54ebde7f3dd70IAD/vRuvjihterO9Lg0k427Lp4kfZ9Kpob9DMfxZBHH0e2TNKL8AAAAAIgB0jUCUfNEVYgQAAQB80RViAgB80RViAwB80RViBAB80RVi"