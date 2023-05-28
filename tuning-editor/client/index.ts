import * as alt from 'alt-client';
import * as native from 'natives';
import * as AthenaClient from '@AthenaClient/api';
import * as ShopExports from './shops';
import { Tuningmenu_Events } from '../shared/events';
import { iTuningshopSync } from '../shared/interfaces';
import { CinematicCam } from './cinematic';
import { KEY_BINDS_TUNER } from '../shared/const';
import { TUNINGMENU_LOCALE } from '../shared/locales';
import { name } from '@AthenaServer/player/get';

let currentShop: string;
let syncData: iTuningshopSync;

async function init() {
    AthenaClient.systems.hotkeys.add({
        key: KEY_BINDS_TUNER.INTERACT,
        description: 'Tune your vehicle',
        modifier: 'shift',
        identifier: 'open-tuner-for-vehicle',
        keyDown: emitOpen,
        
    })
}
async function emitOpen() {
    alt.emitServer(Tuningmenu_Events.CLIENT);
}

async function emitClose() {
    alt.emitServer(Tuningmenu_Events.CLOSE);
}

async function buyPerformance(id: number, value: number, syncData: iTuningshopSync) {
    const key = 13;
    if (alt.isKeyDown(key)){
        alt.emitServer(Tuningmenu_Events.PURCHASE, id, value)
        alt.toggleGameControls(true);
        AthenaClient.webview.setOverlaysVisible(true);
        await AthenaClient.rmlui.menu.close();
        createMenu(syncData);
        CinematicCam.destroy()
    }
}

async function buyStance(name: string, value: number, syncData: iTuningshopSync) {
    const key = 13;
    if (alt.isKeyDown(key)){
        alt.emitServer(Tuningmenu_Events.PURCHASE_STANCE, name, value)
        alt.toggleGameControls(true);
        AthenaClient.webview.setOverlaysVisible(true);
        await AthenaClient.rmlui.menu.close();
        createMenu(syncData);
        CinematicCam.destroy()
    }
}

async function buyOptics(id: number, value: number, syncData: iTuningshopSync) {
    const key = 13;
    if (alt.isKeyDown(key)){
        alt.emitServer(Tuningmenu_Events.PURCHASE_OPTICS, id, value)
        alt.toggleGameControls(true);
        AthenaClient.webview.setOverlaysVisible(true);
        await AthenaClient.rmlui.menu.close();
        createMenu(syncData);
        CinematicCam.destroy()
    }
}

async function buyInterior(id: number, value: number, syncData: iTuningshopSync) {
    const key = 13;
    if (alt.isKeyDown(key)){
        alt.emitServer(Tuningmenu_Events.PURCHASE_INTERIOR, id, value)
        alt.toggleGameControls(true);
        AthenaClient.webview.setOverlaysVisible(true);
        await AthenaClient.rmlui.menu.close();
        createMenu(syncData);
        CinematicCam.destroy()
    }
}

async function buyWheels(id: number, value: number, syncData: iTuningshopSync) {
    const key = 13;
    if (alt.isKeyDown(key)){
        alt.emitServer(Tuningmenu_Events.PURCHASE_WHEELS, id, value)
        alt.toggleGameControls(true);
        AthenaClient.webview.setOverlaysVisible(true);
        await AthenaClient.rmlui.menu.close();
        createMenu(syncData);
        CinematicCam.destroy()
    }
}

async function buyPlate(value: number, syncData: iTuningshopSync) {
    const key = 13;
    if (alt.isKeyDown(key)){
        alt.emitServer(Tuningmenu_Events.PURCHASE_PLATE, value)
        alt.toggleGameControls(true);
        AthenaClient.webview.setOverlaysVisible(true);
        await AthenaClient.rmlui.menu.close();
        createMenu(syncData);
        CinematicCam.destroy()
    }
}

async function buyWindowtint(value: number, syncData: iTuningshopSync) {
    const key = 13;
    if (alt.isKeyDown(key)){
        alt.emitServer(Tuningmenu_Events.PURCHASE_WINDOWTINT, value)
        alt.toggleGameControls(true);
        AthenaClient.webview.setOverlaysVisible(true);
        await AthenaClient.rmlui.menu.close();
        createMenu(syncData);
        CinematicCam.destroy()
    }
}

async function camber(value: number) {
    alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
        if (key !== "wheelModCamber") return;
        if (!(entity instanceof alt.Vehicle)) return;
        modWheels(entity, value);
    });
    
    function modWheels(vehicle, data) {
        for (let i = 0; i <= vehicle.wheelsCount; i++) {
            vehicle.setWheelCamber(i, data);
        }

        vehicle.setWheelCamber(0, value);
        vehicle.setWheelCamber(1, value);
        vehicle.setWheelCamber(2, value);
        vehicle.setWheelCamber(3, value);
    }
}

async function height(value: number) {
    alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
        if (key !== "wheelModHeight") return;
        if (!(entity instanceof alt.Vehicle)) return;
        modWheels(entity, value);
    });
    
    function modWheels(vehicle, data) {
        for (let i = 0; i <= vehicle.wheelsCount; i++) {
            vehicle.setWheelHeight(i, data);
        }

        vehicle.setWheelHeight(0, value);
        vehicle.setWheelHeight(1, value);
        vehicle.setWheelHeight(2, value);
        vehicle.setWheelHeight(3, value);
    }
}

async function rimradius(value: number) {
    alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
        if (key !== "wheelModRimRadius") return;
        if (!(entity instanceof alt.Vehicle)) return;
        modWheels(entity, value);
    });
    
    function modWheels(vehicle, data) {
        for (let i = 0; i <= vehicle.wheelsCount; i++) {
            vehicle.setWheelRimRadius(i, data);
        }

        vehicle.setWheelRimRadius(0, value);
        vehicle.setWheelRimRadius(1, value);
        vehicle.setWheelRimRadius(2, value);
        vehicle.setWheelRimRadius(3, value);
    }
}

async function trackwidth(value: number) {
    alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
        if (key !== "wheelModTrackWidth") return;
        if (!(entity instanceof alt.Vehicle)) return;
        modWheels(entity, value);
    });
    
    function modWheels(vehicle, data) {
        for (let i = 0; i <= vehicle.wheelsCount; i++) {
            vehicle.setWheelTrackWidth(i, data);
        }

        vehicle.setWheelTrackWidth(0, value);
        vehicle.setWheelTrackWidth(1, value);
        vehicle.setWheelTrackWidth(2, value);
        vehicle.setWheelTrackWidth(3, value);
    }
}

async function tyreradius(value: number) {
    alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
        if (key !== "wheelModTyreRadius") return;
        if (!(entity instanceof alt.Vehicle)) return;
        modWheels(entity, value);
    });
    
    function modWheels(vehicle, data) {
        for (let i = 0; i <= vehicle.wheelsCount; i++) {
            vehicle.setWheelTyreRadius(i, data);
        }

        vehicle.setWheelTyreRadius(0, value);
        vehicle.setWheelTyreRadius(1, value);
        vehicle.setWheelTyreRadius(2, value);
        vehicle.setWheelTyreRadius(3, value);
    }
}

async function tyrewidth(value: number) {
    alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
        if (key !== "wheelModTyreWidth") return;
        if (!(entity instanceof alt.Vehicle)) return;
        modWheels(entity, value);
    });
    
    function modWheels(vehicle, data) {
        for (let i = 0; i <= vehicle.wheelsCount; i++) {
            vehicle.setWheelTyreWidth(i, data);
        }

        vehicle.setWheelTyreWidth(0, value);
        vehicle.setWheelTyreWidth(1, value);
        vehicle.setWheelTyreWidth(2, value);
        vehicle.setWheelTyreWidth(3, value);
    }
}

async function option(syncData: iTuningshopSync, shop: string) {
    if(!syncData) return;
    if(shop === "Motor") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.ENGINE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Performance[1],
                    description: TUNINGMENU_LOCALE.ENGINE_DESC,
                    value: 0,
                    min: 0,
                    max: 4,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 11;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyPerformance(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
    } else if(shop === "Bremsen") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.BRAKES,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Performance[1],
                    description: TUNINGMENU_LOCALE.BRAKES_DESC,
                    value: 0,
                    min: 0,
                    max: 3,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 12;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyPerformance(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Getriebe") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TRANS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Performance[2],
                    description: TUNINGMENU_LOCALE.TRANS_DESC,
                    value: 0,
                    min: 0,
                    max: 4,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 13;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyPerformance(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Federung") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.SUSPENSION,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Performance[3],
                    description: TUNINGMENU_LOCALE.SUSPENSION_DESC,
                    value: 0,
                    min: 0,
                    max: 4,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 15;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyPerformance(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Panzerung") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.ARMOR,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Performance[4],
                    description: TUNINGMENU_LOCALE.ARMOR_DESC,
                    value: 0,
                    min: 0,
                    max: 5,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 16;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyPerformance(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Turbo") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TURBO,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Performance[5],
                    description: TUNINGMENU_LOCALE.TURBO_DESC,
                    value: 0,
                    min: 0,
                    max: 1,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 18;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyPerformance(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Xenon-Licht") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.XENON,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Performance[6],
                    description: TUNINGMENU_LOCALE.XENON_DESC,
                    value: 0,
                    min: 0,
                    max: 1,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 22;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyPerformance(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
    } else if(shop === "Radsturz") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WHEELCAMBER,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Stance[0][0],
                    description: TUNINGMENU_LOCALE.WHEELCAMBER_DESC,
                    value: 0,
                    min: -0.75,
                    max: 0.75,
                    increment: 0.01,
                    async callback(name: string, value: number) {
                        camber(value)
                        name === TUNINGMENU_LOCALE.WHEELCAMBER
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_STANCE, name, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(name: string, value: number) {
                        buyStance(name, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Radhöhe") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WHEELHEIGHT,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Stance[1][1],
                    description: TUNINGMENU_LOCALE.WHEELHEIGHT_DESC,
                    value: 0,
                    min: -0.75,
                    max: 0.75,
                    increment: 0.01,
                    async callback(name: string, value: number) {
                        height(value)
                        name === TUNINGMENU_LOCALE.WHEELHEIGHT;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_STANCE, name, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(name: string, value: number) {
                        buyStance(name, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Felgenradius") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WHEELRIMRADIUS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Stance[2][2],
                    description: TUNINGMENU_LOCALE.WHEELRIMRADIUS_DESC,
                    value: 0,
                    min: -0.75,
                    max: 0.75,
                    increment: 0.01,
                    async callback(name: string, value: number) {
                        rimradius(value)
                        name === TUNINGMENU_LOCALE.WHEELRIMRADIUS
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_STANCE, name, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(name: string, value: number) {
                        buyStance(name, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Spurbreite") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WHEELTRACKWIDTH,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Stance[3][3],
                    description: TUNINGMENU_LOCALE.WHEELTRACKWIDTH_DESC,
                    value: 0,
                    min: -0.75,
                    max: 0.75,
                    increment: 1,
                    async callback(name: string, value: number) {
                        trackwidth(value)
                        name === TUNINGMENU_LOCALE.WHEELTRACKWIDTH
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_STANCE, name, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(name: string, value: number) {
                        buyStance(name, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Reifendurchmesser") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WHEELTYRERADIUS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Stance[4][4],
                    description: TUNINGMENU_LOCALE.WHEELTYRERADIUS_DESC,
                    value: 0,
                    min: -0.75,
                    max: 0.75,
                    increment: 0.01,
                    async callback(name: string, value: number) {
                        tyreradius(value)
                        name === TUNINGMENU_LOCALE.WHEELTYRERADIUS
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_STANCE, name, value)
                        buyStance(name, value, syncData);
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(name: string, value: number) {
                        buyStance(name, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Reifenbreite") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WHEELTYREWIDTH,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Stance[5][5],
                    description: TUNINGMENU_LOCALE.WHEELTYREWIDTH_DESC,
                    value: 0,
                    min: -0.75,
                    max: 0.75,
                    increment: 0.01,
                    async callback(name: string, value: number) {
                        tyrewidth(value)
                        name === TUNINGMENU_LOCALE.WHEELTYREWIDTH
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_STANCE, name, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(name: string, value: number) {
                        buyStance(name, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
// OPTICS
    } else if(shop === "Spoiler") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.SPOILER,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[0],
                    description: TUNINGMENU_LOCALE.SPOILER_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxspoiler,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 0;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Frontstoßstange") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.FBUMPER,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[1],
                    description: TUNINGMENU_LOCALE.FBUMPER_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxfbumper,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 1;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Heckstoßstange") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.RBUMPER,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[2],
                    description: TUNINGMENU_LOCALE.RBUMPER_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxrbumper,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 2;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Seitenschweller") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.SSKIRT,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[3],
                    description: TUNINGMENU_LOCALE.SSKIRT_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxsskirt,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 3;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Auspuff") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.EXHAUST,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[4],
                    description: TUNINGMENU_LOCALE.EXHAUST_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxexhaust,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 4;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Rahmen") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.FRAME,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[5],
                    description: TUNINGMENU_LOCALE.FRAME_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxframe,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 5;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Kühlergrill") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.GRILLE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[6],
                    description: TUNINGMENU_LOCALE.GRILLE_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxgrille,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 6;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Motorhaube") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.HOOD,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[7],
                    description: TUNINGMENU_LOCALE.HOOD_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxhood,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 7;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Linker Flügel") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.LWING,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[8],
                    description: TUNINGMENU_LOCALE.LWING_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxlwing,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 8;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Rechter Flügel") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.RWING,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[9],
                    description: TUNINGMENU_LOCALE.RWING_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxrwing,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 9;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Dach") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.ROOF,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[10],
                    description: TUNINGMENU_LOCALE.ROOF_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxroof,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 10;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Hupen") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.HORNS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[11],
                    description: TUNINGMENU_LOCALE.HORNS_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxhorns,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 14;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Kennzeichenhalter (horizontal)") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.PLATEH,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[12],
                    description: TUNINGMENU_LOCALE.PLATEH_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxplateh,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 25;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Kennzeichenhalter (vertikal)") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.PLATEV,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[13],
                    description: TUNINGMENU_LOCALE.PLATEV_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxplatev,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 26;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Hydraulik") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.HYDRAULICS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[14],
                    description: TUNINGMENU_LOCALE.HYDRAULICS_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxhydraulics,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 38;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Streben") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.STRUTBAR,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[15],
                    description: TUNINGMENU_LOCALE.STRUTBAR_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxstrutbar,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 41;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Antenne") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.ANTENNA,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[16],
                    description: TUNINGMENU_LOCALE.ANTENNA_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxantenna,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 43;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Außenspiegel") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.EXTERIORP,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[17],
                    description: TUNINGMENU_LOCALE.EXTERIORP_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxexteriorp,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 44;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Aufkleber") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.STICKERS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[18],
                    description: TUNINGMENU_LOCALE.STICKERS_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxstickers,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 48;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyOptics(id, value, syncData);
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Kennzeichen") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.PLATE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[19],
                    description: TUNINGMENU_LOCALE.PLATE_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxplate,
                    increment: 1,
                    async callback(value: number) {
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_PLATE, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(value: number) {
                        buyPlate(value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Fenstertönung") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WINDOWTINT,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Optics[20],
                    description: TUNINGMENU_LOCALE.WINDOWTINT_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxwindowtint,
                    increment: 1,
                    async callback(value: number) {
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WINDOWTINT, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(value: number) {
                        buyWindowtint(value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
// INTERIOR
    } else if(shop === "Verkleidungsdesign") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TRIMDESIGN,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[0],
                    description: TUNINGMENU_LOCALE.TRIMDESIGN_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxtrimdesign,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 27;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Ornamente") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.ORNAMENTS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[1],
                    description: TUNINGMENU_LOCALE.ORNAMENTS_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxornaments,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 28;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Wahlscheiben-Design") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.DIALDESIGN,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[2],
                    description: TUNINGMENU_LOCALE.DIALDESIGN_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxdialdesign,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 30;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Innentür") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.DOORINT,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[3],
                    description: TUNINGMENU_LOCALE.DOORINT_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxdoorint,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 31;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Sitze") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.SEATS,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[4],
                    description: TUNINGMENU_LOCALE.SEATS_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxseats,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 32;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Lenkrad") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.STEERINGW,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[5],
                    description: TUNINGMENU_LOCALE.STEERINGW_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxsteeringw,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 33;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Schalthebel") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.SHIFTLEVER,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[6],
                    description: TUNINGMENU_LOCALE.SHIFTLEVER_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxshiftlever,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 34;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Plaketten") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.PLAQUES,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[7],
                    description: TUNINGMENU_LOCALE.PLAQUES_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxplaques,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 35;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Motorabdeckung") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.ENGINEB,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[8],
                    description: TUNINGMENU_LOCALE.ENGINEB_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxengineb,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 39;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Luftfilter") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.AIRFILTER,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[9],
                    description: TUNINGMENU_LOCALE.AIRFILTER_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxairfilter,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 40;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Radkastenverkleidung") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.ARCHCOVER,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[10],
                    description: TUNINGMENU_LOCALE.ARCHCOVER_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxarchcover,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 42;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Tank") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TANK,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[11],
                    description: TUNINGMENU_LOCALE.TANK_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxtank,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 45;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Tür") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.DOOR,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[12],
                    description: TUNINGMENU_LOCALE.DOOR_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxdoor,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 46;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Radhausverkleidung") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.WROH,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.Interior[13],
                    description: TUNINGMENU_LOCALE.WROH_DESC,
                    value: 0,
                    min: 0,
                    max: syncData.maxwroh,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 47;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyInterior(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
// WHEELS
    } else if(shop === "Sport") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[0],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[0].Sport,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 0;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Tuner") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[1],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[1].Tuner,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 1;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Lowrider") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[2],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[2].Lowrider,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 2;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Luxus") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[3],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[3].Luxus,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 3;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Offroad") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[4],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[4].Offroad,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 4;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Cat5") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[5],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[5].Cat5,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 5;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Motorrad") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[6],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[6].Motorrad,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 6;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "High - End") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[7],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[7].HighEnd,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 7;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Bennys Tuner") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[8],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[8].Bennys,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 8;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Bennys Original") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[9],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[9].BennysOriginal,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 9;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Formel1") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[10],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[10].Formel1,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 10;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Custom") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[11],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[11].Custom,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 11;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    } else if(shop === "Stance Andreas") {
        AthenaClient.rmlui.menu.create({
            header: {
                title: TUNINGMENU_LOCALE.TYPE,
                color: new alt.RGBA(0, 128, 0, 255),
            },
            options: [
                {
                    type: 'Range',
                    title: ShopExports.wheelListName[12],
                    description: TUNINGMENU_LOCALE.TYPE_DESC,
                    value: 0,
                    min: 0,
                    max: ShopExports.wheelListCounts[12].StanceAndreas,
                    increment: 1,
                    async callback(id: number, value: number) {
                        id = 12;
                        alt.emitServer(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, id, value)
                    }
                },
                {
                    type: 'Invoke',
                    title: 'Buy',
                    description: 'Buy the selected option',
                    async callback(id: number, value: number) {
                        buyWheels(id, value, syncData)
                    },
                },
                {
                    type: 'Range',
                    title: 'Camera',
                    description: 'Ändert die Kameraeinstellungen',
                    value:90,
                    min:50,
                    max:150,
                    increment:1,
                    onlyUpdateOnEnter: true,
                    async callback(newValue: number) {
                        const points = generateCameraPoints();
                        for (let i = 0; i < points.length; i++) {
                            CinematicCam.addNode({
                                pos: points[i],
                                fov: newValue,
                                easeTime: 1000,
                                positionToTrack: alt.Player.local.vehicle.pos,
                            });
                        }
                        CinematicCam.next(false);
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Back',
                    description: 'Previous menu.',
                    async callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        await AthenaClient.rmlui.menu.close();
                        createMenu(syncData);
                        CinematicCam.destroy()
                    },
                },
                {
                    type: 'Invoke',
                    title: 'Close',
                    description: 'Close the menu.',
                    callback() {
                        alt.toggleGameControls(true);
                        AthenaClient.webview.setOverlaysVisible(true);
                        AthenaClient.rmlui.menu.close();
                        CinematicCam.destroy()
                    },
                },
            ],
            callbackOnClose() {
                emitClose;
            },
        })
        
    }
}

async function createMenu(_syncData: iTuningshopSync) {

    syncData = _syncData;

    if(!syncData) return;
    AthenaClient.webview.setOverlaysVisible(false);
    alt.toggleGameControls(false);

    const points = generateCameraPoints();
    CinematicCam.destroy();
    for (let i = 0; i < points.length; i++) {
        CinematicCam.addNode({
            pos: points[i],
            fov: 90,
            easeTime: 1000,
            positionToTrack: alt.Player.local.vehicle.pos,
        });
    }

    CinematicCam.next(false);

    AthenaClient.rmlui.menu.create({
        header: {
            title: TUNINGMENU_LOCALE.TUNINGMENU_LABEL,
            color: new alt.RGBA(255, 0, 0, 255),
        },
        options: [
            {
                type: 'Selection',
                title: TUNINGMENU_LOCALE.PERFORMANCE,
                description: TUNINGMENU_LOCALE.PERFORMANCE_DESC,
                options: ShopExports.Performance,
                value: 0,
                onlyUpdateOnEnter: true,
                async callback(newValue: string) {
                    currentShop = newValue;
                    await AthenaClient.rmlui.menu.close();
                    option(syncData, currentShop)
                },
            },
            {
                type: 'Selection',
                title: TUNINGMENU_LOCALE.STANCE,
                description: TUNINGMENU_LOCALE.STANCE_DESC,
                options: ShopExports.StanceCleaned,
                value: 0,
                onlyUpdateOnEnter: true,
                async callback(newValue: string) {
                    currentShop = newValue;
                    await AthenaClient.rmlui.menu.close();
                    option(syncData, currentShop)
                },
            },
            {
                type: 'Selection',
                title: TUNINGMENU_LOCALE.OPTIC,
                description: TUNINGMENU_LOCALE.OPTIC_DESC,
                options: ShopExports.Optics,
                value: 0,
                onlyUpdateOnEnter: true,
                async callback(newValue: string) {
                    currentShop = newValue;
                    await AthenaClient.rmlui.menu.close();
                    option(syncData, currentShop)
                },
            },
            {
                type: 'Selection',
                title: TUNINGMENU_LOCALE.INTERIEUR,
                description: TUNINGMENU_LOCALE.INTERIEUR_DESC,
                options: ShopExports.Interior,
                value: 0,
                onlyUpdateOnEnter: true,
                async callback(newValue: string) {
                    currentShop = newValue;
                    await AthenaClient.rmlui.menu.close();
                    option(syncData, currentShop)
                },
            },
            {
                type: 'Selection',
                title: TUNINGMENU_LOCALE.WHEELS,
                description: TUNINGMENU_LOCALE.WHEELS_DESC,
                options: ShopExports.wheelListName,
                value: 0,
                onlyUpdateOnEnter: true,
                async callback(newValue: string) {
                    currentShop = newValue;
                    await AthenaClient.rmlui.menu.close();
                    option(syncData, currentShop)
                },
            },
            {
                type: 'Range',
                title: 'Camera',
                description: 'Ändert die Kameraeinstellungen',
                value:90,
                min:50,
                max:150,
                increment:1,
                onlyUpdateOnEnter: true,
                async callback(newValue: number) {
                    for (let i = 0; i < points.length; i++) {
                        CinematicCam.addNode({
                            pos: points[i],
                            fov: newValue,
                            easeTime: 1000,
                            positionToTrack: alt.Player.local.vehicle.pos,
                        });
                    }
                    CinematicCam.next(false)
                },
            },
            {
                type: 'Invoke',
                title: 'Close',
                description: 'Close the menu.',
                callback() {
                    alt.toggleGameControls(true);
                    AthenaClient.webview.setOverlaysVisible(true);
                    AthenaClient.rmlui.menu.close();
                    CinematicCam.destroy()
                },
            },
        ],
        callbackOnClose() {
            emitClose;
        },
    });
}

function generateCameraPoints(): Array<alt.IVector3> {
    const cameraPoints = [];
    const zPos = alt.Player.local.pos.z;

    const [_, min, max] = native.getModelDimensions(alt.Player.local.vehicle.model);
    const offsetCalculations = [];
    const additional = 0.5;

    // Top Left
    offsetCalculations.push({
        x: min.x - additional,
        y: max.y + additional,
        z: zPos,
    });

    // Top Middle
    offsetCalculations.push({
        x: 0,
        y: max.y + additional,
        z: zPos,
    });

    // Top Right
    offsetCalculations.push({
        x: max.x + additional,
        y: max.y + additional,
        z: zPos,
    });

    // Middle Right
    offsetCalculations.push({
        x: max.x + additional,
        y: 0,
        z: zPos,
    });

    // Back Right
    offsetCalculations.push({
        x: max.x + additional,
        y: min.y - additional,
        z: zPos,
    });

    // Middle Center
    offsetCalculations.push({
        x: 0,
        y: min.y - additional,
        z: zPos,
    });

    // Bottom Left
    offsetCalculations.push({
        x: min.x - additional,
        y: min.y - additional,
        z: zPos,
    });

    // Middle Left
    offsetCalculations.push({
        x: min.x - additional,
        y: 0,
        z: zPos,
    });

    for (let i = 0; i < offsetCalculations.length; i++) {
        const calc = native.getOffsetFromEntityInWorldCoords(
            alt.Player.local.vehicle.scriptID,
            offsetCalculations[i].x,
            offsetCalculations[i].y,
            1,
        );

        cameraPoints.push(calc);
    }

    return cameraPoints;
}

alt.onServer(Tuningmenu_Events.OPEN, init);
alt.onServer(Tuningmenu_Events.SERVER, createMenu);
