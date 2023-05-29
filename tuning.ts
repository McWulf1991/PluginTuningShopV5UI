import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import VehicleTuning from '@AthenaShared/interfaces/vehicleTuning';
import { VehicleState } from '@AthenaShared/interfaces/vehicleState';
import VehicleExtra from '@AthenaShared/interfaces/vehicleExtra';
import IVehicleMod from '@AthenaShared/interfaces/vehicleMod';
import IVehicleModStance from '@AthenaShared/interfaces/vehicleModStance';
import IVehicleModWheels from '@AthenaShared/interfaces/vehicleModWheels';

/**
 * Applies specified properties to a vehicle in bulk.
 * These match the alt:V API, and can be pulled from a database.
 *
 *
 * @param {alt.Vehicle} vehicle An alt:V Vehicle Entity
 * @param {VehicleState} data
 */
export function applyState(vehicle: alt.Vehicle, state: Partial<VehicleState> | VehicleState) {
    if (Overrides.applyState) {
        return Overrides.applyState(vehicle, state);
    }

    Object.keys(state).forEach((key) => {
        vehicle[key] = state[key];
    });
}

/**
 * Get all mods of the specified vehicle.
 *
 *
 * @param {alt.Vehicle} vehicle An alt:V Vehicle Entity
 * @return {Array<VehicleExtra>}
 */
export function getExtras(vehicle: alt.Vehicle): Array<VehicleExtra> {
    if (Overrides.getExtras) {
        return Overrides.getExtras(vehicle);
    }

    let extraData: Array<VehicleExtra> = [];

    for (let id = 0; id < 15; ++id) {
        let state: boolean = !vehicle.getExtra(id);
        extraData.push({ id, state });
    }

    return extraData;
}

/**
 * Applies specified properties to a vehicle in bulk.
 * These match the alt:V API, and can be pulled from a database.
 *
 *
 * @param {alt.Vehicle} vehicle An alt:V Vehicle Entity
 * @param {Array<VehicleExtra>} extras
 */
export function setExtra(vehicle: alt.Vehicle, extras: Array<VehicleExtra>) {
    if (Overrides.setExtra) {
        return Overrides.setExtra(vehicle, extras);
    }

    for (let extra of extras) {
        vehicle.setExtra(extra.id, extra.state);
    }
}

/**
 * Apply tuning to the specified vehicle.
 *
 *
 * @param {alt.Vehicle} vehicle An alt:V Vehicle Entity
 * @param {VehicleTuning | Partial<VehicleTuning>} tuning
 */
export function applyTuning(vehicle: alt.Vehicle, tuning: VehicleTuning | Partial<VehicleTuning>) {
    if (Overrides.applyTuning) {
        return Overrides.applyTuning(vehicle, tuning);
    }

    if (typeof tuning === 'undefined') {
        return;
    }

    if (tuning.modkit) {
        vehicle.modKit = tuning.modkit;
    }

    if (tuning.mods) {
        for (let mod of tuning.mods) {
            vehicle.setMod(mod.id, mod.value);
        }
    }

    if (tuning.stance) {
        for (let stanced of tuning.stance) {
            if(stanced.id=0){
                vehicle.setStreamSyncedMeta('wheelModCamber', stanced.value)
            };
            if(stanced.id=1){
                vehicle.setStreamSyncedMeta('wheelModHeight', stanced.value)
            };
            if(stanced.id=2){
                vehicle.setStreamSyncedMeta('wheelModRimRadius', stanced.value)
            };
            if(stanced.id=3){
                vehicle.setStreamSyncedMeta('wheelModTrackWidth', stanced.value)
            };
            if(stanced.id=4){
                vehicle.setStreamSyncedMeta('wheelModTyreRadius', stanced.value)
            };
            if(stanced.id=5){
                vehicle.setStreamSyncedMeta('wheelModTyreWidth', stanced.value)
            };
        }
    }
    
    if (tuning.wheels) {
        for (let wheel of tuning.wheels) {
            vehicle.setWheels(wheel.id, wheel.value);
        }
    }
}

/**
 * Get all mods of the specified vehicle.
 *
 *
 * @param {alt.Vehicle} vehicle An alt:V Vehicle Entity
 * @returns {VehicleTuning}
 */
export function getTuning(vehicle: alt.Vehicle): VehicleTuning {
    if (Overrides.getTuning) {
        return Overrides.getTuning(vehicle);
    }

    let tuningData: VehicleTuning = { modkit: vehicle.modKit, mods: [], stance: [], wheels: [] };

    for (let id = 0; id < 70; ++id) {
        let value = vehicle.getMod(id);
        tuningData.mods.push({ id, value });
    }

    for (let id = 0; id < 13; ++id) {
        let value = vehicle.getMod(id);
        tuningData.wheels.push({id, value});
    }

    for (let id = 0; id < 5; ++id) {
        if(id=0){
            let value = vehicle.getStreamSyncedMeta('wheelModCamber') as number
            tuningData.stance.push({id, value});
        };
        if(id=1){
            let value = vehicle.getStreamSyncedMeta('wheelModHeight') as number
            tuningData.stance.push({id, value});
        };
        if(id=2){
            let value = vehicle.getStreamSyncedMeta('wheelModRimRadius') as number
            tuningData.stance.push({id, value});
        };
        if(id=3){
            let value = vehicle.getStreamSyncedMeta('wheelModTrackWidth') as number
            tuningData.stance.push({id, value});
        };
        if(id=4){
            let value = vehicle.getStreamSyncedMeta('wheelModTyreRadius') as number
            tuningData.stance.push({id, value});
        };
        if(id=5){
            let value = vehicle.getStreamSyncedMeta('wheelModTyreWidth') as number
            tuningData.stance.push({id, value});
        };
    }

    return tuningData;
}

/**
 * Apply mods to a vehicle.
 *
 * Automatically saves data if vehicle is non-temporary.
 *
 * @export
 * @param {alt.Vehicle} vehicle
 * @param {number} modkit
 * @param {Array<IVehicleMod>} mods
 * @return {*}
 */
export async function applyMods(vehicle: alt.Vehicle, modkit: number, mods: Array<IVehicleMod>, stance: Array<IVehicleModStance>, wheels: Array<IVehicleModWheels>) {
    if (Overrides.applyMods) {
        return Overrides.applyMods(vehicle, modkit, mods, stance, wheels);
    }

    const currentMods = getMods(vehicle);
    for (let mod of mods) {
        const existingIndex = currentMods.findIndex((x) => x.id === mod.id);
        if (existingIndex >= 0) {
            currentMods[existingIndex].value = mod.value;
        }

        try {
            vehicle.setMod(mod.id, mod.value);
        } catch (err) {}
    }

    const currentWheels = getWheels(vehicle);
    for (let wheel of wheels) {
        const existingIndex = currentWheels.findIndex((x) => x.id === wheel.id);
        if (existingIndex >= 0) {
            currentWheels[existingIndex].value = wheel.value;
        }

        try {
            vehicle.setWheels(wheel.id, wheel.value);
        } catch (err) {}
    }

    const currentStance = getStance(vehicle);
    for (let stanced of stance) {
        const existingIndex = currentWheels.findIndex((x) => x.id === stanced.id);
        if (existingIndex >= 0) {
            currentWheels[existingIndex].value = stanced.value;
        }

        try {
            if(stanced.id=0){
                vehicle.setStreamSyncedMeta('wheelModCamber', stanced.value)
            };
            if(stanced.id=1){
                vehicle.setStreamSyncedMeta('wheelModHeight', stanced.value)
            };
            if(stanced.id=2){
                vehicle.setStreamSyncedMeta('wheelModRimRadius', stanced.value)
            };
            if(stanced.id=3){
                vehicle.setStreamSyncedMeta('wheelModTrackWidth', stanced.value)
            };
            if(stanced.id=4){
                vehicle.setStreamSyncedMeta('wheelModTyreRadius', stanced.value)
            };
            if(stanced.id=5){
                vehicle.setStreamSyncedMeta('wheelModTyreWidth', stanced.value)
            };
        } catch (err) {}
    }

    const data = Athena.document.vehicle.get(vehicle);
    if (typeof data === 'undefined') {
        return;
    }

    const tuning: VehicleTuning = {
        modkit,
        mods: currentMods,
        stance: currentStance,
        wheels: currentWheels,
    };

    await Athena.document.vehicle.set(vehicle, 'tuning', tuning);
}

/**
 * Return all mods that are currently applied to a vehicle.
 *
 * @export
 * @param {alt.Vehicle} vehicle
 * @return {Array<IVehicleMod>}
 */
export function getMods(vehicle: alt.Vehicle): Array<IVehicleMod> {
    const mods: Array<IVehicleMod> = [];

    for (let i = 0; i < 67; i++) {
        try {
            const value = vehicle.getMod(i);
            mods.push({ id: i, value });
        } catch (err) {}
    }

    return mods;
}

export function getWheels(vehicle: alt.Vehicle): Array<IVehicleModWheels> {
    const mods: Array<IVehicleModWheels> = [];

    for (let i = 0; i < 13; i++) {
        try {
            const value = vehicle.getMod(i);
            mods.push({ id: i, value });
        } catch (err) {}
    }

    return mods;
}

export function getStance(vehicle: alt.Vehicle): Array<IVehicleModStance> {
    const stance: Array<IVehicleModStance> = [];

    for (let i = 0; i < 6; i++) {
        try {
            for (let id = 0; id < 5; ++id) {
                if(id=0){
                    let value = vehicle.getStreamSyncedMeta('wheelModCamber') as number
                    stance.push({id, value});
                };
                if(id=1){
                    let value = vehicle.getStreamSyncedMeta('wheelModHeight') as number
                    stance.push({id, value});
                };
                if(id=2){
                    let value = vehicle.getStreamSyncedMeta('wheelModRimRadius') as number
                    stance.push({id, value});
                };
                if(id=3){
                    let value = vehicle.getStreamSyncedMeta('wheelModTrackWidth') as number
                    stance.push({id, value});
                };
                if(id=4){
                    let value = vehicle.getStreamSyncedMeta('wheelModTyreRadius') as number
                    stance.push({id, value});
                };
                if(id=5){
                    let value = vehicle.getStreamSyncedMeta('wheelModTyreWidth') as number
                    stance.push({id, value});
                };
            }
        } catch (err) {}
    }

    return stance;
}

interface VehicleTuningFuncs {
    applyState: typeof applyState;
    setExtra: typeof setExtra;
    getExtras: typeof getExtras;
    applyTuning: typeof applyTuning;
    getTuning: typeof getTuning;
    applyMods: typeof applyMods;
    getMods: typeof getMods;
    getStance: typeof getStance;
    getWheels: typeof getWheels;
}

const Overrides: Partial<VehicleTuningFuncs> = {};

export function override(functionName: 'applyState', callback: typeof applyState);
export function override(functionName: 'setExtra', callback: typeof setExtra);
export function override(functionName: 'getExtras', callback: typeof getExtras);
export function override(functionName: 'applyTuning', callback: typeof applyTuning);
export function override(functionName: 'getTuning', callback: typeof getTuning);
export function override(functionName: 'applyMods', callback: typeof applyMods);
export function override(functionName: 'getMods', callback: typeof getMods);
export function override(functionName: 'getStance', callback: typeof getStance);
export function override(functionName: 'getWheels', callback: typeof getWheels);
/**
 * Used to override vehicle tuning functionality
 *
 *
 * @param {keyof VehicleTuningFuncs} functionName
 * @param {*} callback
 */
export function override(functionName: keyof VehicleTuningFuncs, callback: any): void {
    Overrides[functionName] = callback;
}
