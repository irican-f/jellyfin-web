export enum PluginType {
    MediaPlayer = 'mediaplayer',
    PreplayIntercept = 'preplayintercept',
    Screensaver = 'screensaver',
    SyncPlay = 'syncplay',
    Feature = 'feature'
}

export interface Plugin {
    name: string
    id: string
    type: PluginType | string
    priority?: number
}
