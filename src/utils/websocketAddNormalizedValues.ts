import {
  AutodartsWsMessage,
  AutodartsWsMessage_CamState,
  AutodartsWsMessage_State,
} from '@/interfaces/AutodartsWsRawMessage'

export const websocketAddNormalizedValues = (
  raw: Partial<AutodartsWsMessage>,
): AutodartsWsMessage => {
  if (raw.type == 'state') {
    return {
      type: raw.type,
      data: {
        ...raw.data!,
        status_slug: stateStatusToSlug[raw.data!.status!] || null,
      },
    }
  }

  return <AutodartsWsMessage>raw
}

export const stateStatusToSlug: {
  [key: string]: AutodartsWsMessage_State['data']['status_slug']
} = {
  Starting: 'starting',
  Stopping: 'stopping',
  Stopped: 'stopped',
  Throw: 'throw',
  Takeout: 'takeout',
  'Takeout in progress': 'takeout_progress',
}
