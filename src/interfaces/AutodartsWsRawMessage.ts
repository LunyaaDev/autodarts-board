export type AutodartsWsMessage =
  | AutodartsWsMessage_CamStats
  | AutodartsWsMessage_Stats
  | AutodartsWsMessage_CamState
  | AutodartsWsMessage_MotionState
  | AutodartsWsMessage_State

export interface AutodartsWsMessage_CamStats {
  type: 'cam_stats'
  data: {
    id: number
    fps: number
    resolution: {
      width: number
      height: number
      framerates: null | any
    }
  }
}

export interface AutodartsWsMessage_Stats {
  type: 'stats'
  data: {
    fps: number
    resolution: {
      width: number
      height: number
    }
  }
}

export interface AutodartsWsMessage_CamState {
  type: 'cam_state'
  data: {
    isOpened: boolean
    isRunning: boolean
  }
}

export interface AutodartsWsMessage_MotionState {
  data: {
    handFramesReached: boolean
    takeoutCompletedReached: boolean
    isWaiting: boolean
    isStable: boolean
    updating: boolean
    dartIsInFrame: boolean
    handIsInFrame: boolean
    anyDartRemoved: boolean
    allDartsRemoved: boolean
  }
  type: 'motion_state'
}

export interface AutodartsWsMessage_State {
  type: 'state'
  data: {
    connected: boolean
    running: boolean
    status: string
    status_slug:
      | 'starting'
      | 'stopping'
      | 'stopped'
      | 'throw'
      | 'takeout'
      | 'takeout_progress'
      | null
    event: string
    numThrows: number
    throws?: {
      segment: {
        name: 'Bull' | `${'S' | 'D' | 'T' | 'M'}${number}`
        number: number
        bed: 'SingleInner' | 'SingleOuter' | 'Double' | 'Triple' | 'Outside'
        multiplier: number
      }
      coords: {
        x: number
        y: number
      }
    }[]
  }
}
