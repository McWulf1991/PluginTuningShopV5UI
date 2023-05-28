import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { TuningShopView } from './src/view';

const PLUGIN_NAME = 'Tuning Menu';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    TuningShopView.init();
    alt.log(`~lg~CORE ==> ${PLUGIN_NAME} was Loaded`);
});