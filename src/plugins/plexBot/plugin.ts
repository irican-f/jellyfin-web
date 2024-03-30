import { Plugin, PluginType } from '../../types/plugin';

class PlexBotPlugin implements Plugin {
    name: string;
    id: string;
    type: string;
    priority: number;

    constructor() {
        this.name = 'PlexBot Plugin';
        this.id = 'plexbot';
        this.type = PluginType.Feature;
        this.priority = 1;
        this.init();
    }

    init() {
        console.log('PlexBot plugin initialization...');
    }
}

export default PlexBotPlugin;
