import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { sha256Random } from '@AthenaServer/utility/hash';
import { PolygonShape } from '@AthenaServer/extensions/extColshape';
import IVehicleTuning from '@AthenaShared/interfaces/vehicleTuning';
import { SYSTEM_EVENTS } from '@AthenaShared/enums/system';
import { ITuningShop, iTuningshopSync } from '../../shared/interfaces';
import { TUNING_SHOPS } from './shops';
import { Tuningmenu_Events } from '../../shared/events';
import { TUNINGMENU_LOCALE } from '../../shared/locales';
import { VehicleState } from '@AthenaShared/interfaces/vehicleState';
import { getStance, getWheels } from '@AthenaServer/vehicle/tuning';
import { CurrencyTypes } from '@AthenaShared/enums/currency';
import { RGBA } from 'alt-server';

const shops: Array<ITuningShop> = [];
const inShop = {};

class InternalFunctions {
    static async updateTuning(player: alt.Player, vehicle: alt.Vehicle) {

        const veh = await Athena.getters.vehicle.byID(player.vehicle.id);
        const veh2 = await Athena.document.vehicle.get(veh);
        
        if (!veh2.tuning) return;
        if (!veh2.state) return;

        for (let i = 0; i < veh2.tuning.mods.length; i++) {
            const vehmods = veh2.tuning.mods[i]; 
            player.vehicle.setMod(vehmods.id, vehmods.value)
        }

        for (let i = 0; i < veh2.tuning.wheels.length; i++) {
            const vehmods = veh2.tuning.wheels[i]; 
            alt.log('--- WHEELS | ID --- '+vehmods.id)
            alt.log('--- WHEELS | VALUE --- '+vehmods.value)
            player.vehicle.setWheels(vehmods.id, vehmods.value)
        }

        for (let i = 0; i < veh2.tuning.stance.length; i++) {
            const vehmods = veh2.tuning.stance[i];

            alt.log('--- WHEELMOD | NAME --- '+vehmods.id)
            alt.log('--- WHEELMOD | VALUE --- '+vehmods.value)

            if(vehmods.id=0){
                vehicle.setStreamSyncedMeta('wheelModCamber', vehmods.value)
            };
            if(vehmods.id=1){
                vehicle.setStreamSyncedMeta('wheelModHeight', vehmods.value)
            };
            if(vehmods.id=2){
                vehicle.setStreamSyncedMeta('wheelModRimRadius', vehmods.value)
            };
            if(vehmods.id=3){
                vehicle.setStreamSyncedMeta('wheelModTrackWidth', vehmods.value)
            };
            if(vehmods.id=4){
                vehicle.setStreamSyncedMeta('wheelModTyreRadius', vehmods.value)
            };
            if(vehmods.id=5){
                vehicle.setStreamSyncedMeta('wheelModTyreWidth', vehmods.value)
            };
            alt.emitClient(player, Tuningmenu_Events.UPDATE, vehmods.id , vehmods.value)
        }

        player.vehicle.windowTint = veh2.state.windowTint;
        player.vehicle.numberPlateIndex = veh2.state.numberPlateIndex;
    }

    static previewTuning(
        player: alt.Player,
        id: number,
        value: number,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (value && id) {
            player.vehicle.setMod(id, value)
            // TuningShopView.purchase(player, id, value)
        } else if (value && !id) {
            return;
        } else if (!value && !id) {
            return;
        } else if (!value && id) {
            return;
        }
    }

    static previewTuningPlate(
        player: alt.Player,
        value: number,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (value) {
            player.vehicle.numberPlateIndex === value;
            // TuningShopView.purchasePlate(player, value)
        } else {
            return;
        }
    }

    static previewTuningWindowtint(
        player: alt.Player,
        value: number,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (value) {
            player.vehicle.windowTint === value;
            // TuningShopView.purchaseWindowtint(player, value)
        } else {
            return;
        }
    }

    static previewTuningStance(
        player: alt.Player,
        name: string,
        value: number,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if(!value) return;

        if(name === TUNINGMENU_LOCALE.WHEELCAMBER) {
            player.vehicle.setStreamSyncedMeta("wheelModCamber", value)
        } else if(name === TUNINGMENU_LOCALE.WHEELHEIGHT) {
            player.vehicle.setStreamSyncedMeta('wheelModHeight', value)
        } else if(name === TUNINGMENU_LOCALE.WHEELRIMRADIUS) {
            player.vehicle.setStreamSyncedMeta('wheelModRimRadius', value)
        } else if(name === TUNINGMENU_LOCALE.WHEELTRACKWIDTH) {
            player.vehicle.setStreamSyncedMeta('wheelModTrackWidth', value)
        } else if(name === TUNINGMENU_LOCALE.WHEELTYRERADIUS) {
            player.vehicle.setStreamSyncedMeta('wheelModTyreRadius', value)
        } else if(name === TUNINGMENU_LOCALE.WHEELTYREWIDTH) {
            player.vehicle.setStreamSyncedMeta('wheelModTyreWidth', value)
        }

        // TuningShopView.purchaseStance(player, name, value)
    }

    static previewTuningOptics(
        player: alt.Player,
        id: number,
        value: number,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (value && id) {
            player.vehicle.setMod(id, value)
            // TuningShopView.purchaseOptics(player, id, value)
        } else if (!value) {
            return;
        } 
    }

    static previewTuningInterior(
        player: alt.Player,
        id: number,
        value: number,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (value && id) {
            player.vehicle.setMod(id, value)
            // TuningShopView.purchaseInterior(player, id, value)
        } else if (!value) {
            return;
        }
    }

    static previewTuningWheels(
        player: alt.Player,
        id: number,
        value: number,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (value && id) {
            player.vehicle.setWheels(id, value)
            // TuningShopView.purchaseWheels(player, id, value)
        } else if (!value && !id) {
            return;
        }
    }
}

export class TuningShopView {
    static init() {
        for (let i = 0; i < TUNING_SHOPS.length; i++) {
            TuningShopView.register(TUNING_SHOPS[i]);
        }

        alt.onClient(Tuningmenu_Events.PREVIEW_TUNING, InternalFunctions.previewTuning);
        alt.onClient(Tuningmenu_Events.PREVIEW_TUNING_PLATE, InternalFunctions.previewTuningPlate);
        alt.onClient(Tuningmenu_Events.PREVIEW_TUNING_WINDOWTINT, InternalFunctions.previewTuningWindowtint);
        alt.onClient(Tuningmenu_Events.PREVIEW_TUNING_STANCE, InternalFunctions.previewTuningStance);
        alt.onClient(Tuningmenu_Events.PREVIEW_TUNING_OPTICS, InternalFunctions.previewTuningOptics);
        alt.onClient(Tuningmenu_Events.PREVIEW_TUNING_INTERIOR, InternalFunctions.previewTuningInterior);
        alt.onClient(Tuningmenu_Events.PREVIEW_TUNING_WHEELS, InternalFunctions.previewTuningWheels);
        alt.onClient(Tuningmenu_Events.CLIENT, TuningShopView.open)
        alt.onClient(Tuningmenu_Events.UPDATE, InternalFunctions.updateTuning)
        alt.onClient(Tuningmenu_Events.CLOSE, TuningShopView.close);
        alt.onClient(Tuningmenu_Events.PAY, TuningShopView.payTuning);
        
    }

    static close(player: alt.Player) {
        if (!player.vehicle) {
            return;
        }

        InternalFunctions.updateTuning(player, player.vehicle);
        delete inShop[player.id];
    }

    static register(shop: ITuningShop): string {
        let player: alt.Player;

        if (!shop.uid) {
            shop.uid = sha256Random(JSON.stringify(shop));
        }

        const index = shops.findIndex((x) => x.uid === shop.uid);
        if (index >= 0) {
            console.error(new Error(`Shop with ${shop.uid} is a duplicate.`));
            return null;
        }

        Athena.controllers.blip.append({
            uid: `tuning-shop-${shop.uid}`,
            color: 46,
            pos: shop.vertices[0],
            scale: 0.6,
            shortRange: true,
            text: TUNINGMENU_LOCALE.TUNINGMENU_LABEL,
            sprite: 100
        })

        const polygon = new PolygonShape(
            shop.vertices[0].z - 2.5,
            shop.vertices[0].z + 2.5,
            shop.vertices,
            true,
            false,
        );

        for (let i = 0; i < TUNING_SHOPS.length; i++) {
            const position = new alt.Vector3(TUNING_SHOPS[i].x, TUNING_SHOPS[i].y, TUNING_SHOPS[i].z);
            const uid = TUNING_SHOPS[i].uid
            Athena.controllers.interaction.append({
                uid: `tuning-shop-${uid}`,
                position: position,
                description: 'Tuning Shop Press shift + F4',
                debug: false,
                
            });
        }

        InternalFunctions.updateTuning;

        polygon.addEnterCallback(TuningShopView.enter);
        polygon.addLeaveCallback(TuningShopView.leave);
        return shop.uid;
    }

    static async enter(polygon: PolygonShape, player: alt.Player) {
        if (!(player instanceof alt.Player)) {
            return;
        }

        if (!player.vehicle) {
            Athena.player.emit.notification(player, TUNINGMENU_LOCALE.MUST_BE_IN_A_VEHICLE);
            return;
        }

        if (Athena.vehicle.tempVehicles.has(player.vehicle)) {
            Athena.player.emit.notification(player, TUNINGMENU_LOCALE.CANNOT_BE_MODIFIED);
            return;
        }

        if (player.vehicle.driver.id !== player.id) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }

        inShop[player.id] = true;

        Athena.player.emit.sound2D(player, 'shop_enter', 0.5);

        alt.emitClient(player, Tuningmenu_Events.OPEN);
    }

    static leave(polygon: PolygonShape, player: alt.Player) {
        if (!(player instanceof alt.Player)) {
            return;
        }

        inShop[player.id] = false;
        delete inShop[player.id];
        alt.emitClient(player, SYSTEM_EVENTS.INTERACTION_TEXT_REMOVE, polygon.uid);
        alt.emitClient(player, SYSTEM_EVENTS.INTERACTION_TEMPORARY, null);
    }

    static async open(player: alt.Player) {
        const vehicleData = Athena.document.vehicle.get(player.vehicle);
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (Athena.vehicle.tempVehicles.has(player.vehicle)) {
            return;
        }

        const playerData = Athena.document.character.get(player);
        if (vehicleData.owner !== playerData._id) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        const info = await Athena.vehicle.tuning.getMods(player.vehicle);
        const stance = await getStance(player.vehicle);
        const wheels = await getWheels(player.vehicle);
        const plate = await player.vehicle.numberPlateIndex;
        const windowtint = await player.vehicle.windowTint;
        const maxspoiler = await player.vehicle.getModsCount(0)
        const maxfbumper = await player.vehicle.getModsCount(1)
        const maxrbumper = await player.vehicle.getModsCount(2)
        const maxsskirt = await player.vehicle.getModsCount(3)
        const maxexhaust = await player.vehicle.getModsCount(4)
        const maxframe = await player.vehicle.getModsCount(5)
        const maxgrille = await player.vehicle.getModsCount(6)
        const maxhood = await player.vehicle.getModsCount(7)
        const maxlwing = await player.vehicle.getModsCount(8)
        const maxrwing = await player.vehicle.getModsCount(9)
        const maxroof = await player.vehicle.getModsCount(10)
        const maxengine = await player.vehicle.getModsCount(11)
        const maxbrakes = await player.vehicle.getModsCount(12)
        const maxtrans = await player.vehicle.getModsCount(13)
        const maxhorns = await player.vehicle.getModsCount(14)
        const maxsuspension = await player.vehicle.getModsCount(15)
        const maxarmor = await player.vehicle.getModsCount(16)
        const maxturbo = await player.vehicle.getModsCount(18)
        const maxxenon = await player.vehicle.getModsCount(22)
        const maxplateh = await player.vehicle.getModsCount(25)
        const maxplatev = await player.vehicle.getModsCount(26)
        const maxtrimdesign = await player.vehicle.getModsCount(27)
        const maxornaments = await player.vehicle.getModsCount(28)
        const maxdialdesign = await player.vehicle.getModsCount(30)
        const maxdoorint = await player.vehicle.getModsCount(31)
        const maxseats = await player.vehicle.getModsCount(32)
        const maxsteeringw = await player.vehicle.getModsCount(33)
        const maxshiftlever = await player.vehicle.getModsCount(34)
        const maxplaques = await player.vehicle.getModsCount(35)
        const maxhydraulics = await player.vehicle.getModsCount(38)
        const maxengineb = await player.vehicle.getModsCount(39)
        const maxairfilter = await player.vehicle.getModsCount(40)
        const maxstrutbar = await player.vehicle.getModsCount(41)
        const maxarchcover = await player.vehicle.getModsCount(42)
        const maxantenna = await player.vehicle.getModsCount(43)
        const maxexteriorp = await player.vehicle.getModsCount(44)
        const maxtank = await player.vehicle.getModsCount(45)
        const maxdoor = await player.vehicle.getModsCount(46)
        const maxwroh = await player.vehicle.getModsCount(47)
        const maxstickers = await player.vehicle.getModsCount(48)
        const maxplate = await player.vehicle.numberPlateIndex
        const maxwindowtint = await player.vehicle.windowTint
        const wheelmodify = await player.vehicle.getModsCount(23)
        
        for (let i = 0; i < info.length; i++) {
            const rPoint = info[i];
            const syncData: iTuningshopSync = {
                spoiler: info[0].value,
                fbumper: info[1].value,
                rbumper: info[2].value,
                sskirt: info[3].value,
                exhaust: info[4].value,
                frame: info[5].value,
                grille: info[6].value,
                hood: info[7].value,
                lwing: info[8].value,
                rwing: info[9].value,
                roof: info[10].value,
                engine: info[11].value,
                brakes: info[12].value,
                trans: info[13].value,
                horns: info[14].value,
                suspension: info[15].value,
                armor: info[16].value,
                turbo: info[18].value,
                xenon: info[22].value,
                plateh: info[25].value,
                platev: info[26].value,
                trimdesign: info[27].value,
                ornaments: info[28].value,
                dialdesign: info[30].value,
                doorint: info[31].value,
                seats: info[32].value,
                steeringw: info[33].value,
                shiftlever: info[34].value,
                plaques: info[35].value,
                hydraulics: info[38].value,
                engineb: info[39].value,
                airfilter: info[40].value,
                strutbar: info[41].value,
                archcover: info[42].value,
                antenna: info[43].value,
                exteriorp: info[44].value,
                tank: info[45].value,
                door: info[46].value,
                wroh: info[47].value,
                stickers: info[48].value,
                plate: plate,
                windowtint: windowtint,
                wheelcamber: stance[0].value,
                wheelheight: stance[1].value,
                wheeltrackwidth: stance[2].value,
                wheelrimradius: stance[3].value,
                wheeltyrewidth: stance[4].value,
                wheeltyreradius: stance[5].value,
                wheeltype: wheels[wheelmodify].id,
                wheelid: wheels[wheelmodify].value,
                maxspoiler: maxspoiler,
                maxfbumper: maxfbumper,
                maxrbumper: maxrbumper,
                maxsskirt: maxsskirt,
                maxexhaust: maxexhaust,
                maxframe: maxframe,
                maxgrille: maxgrille,
                maxhood: maxhood,
                maxlwing: maxlwing,
                maxrwing: maxrwing,
                maxroof: maxroof,
                maxengine: maxengine,
                maxbrakes: maxbrakes,
                maxtrans: maxtrans,
                maxhorns: maxhorns,
                maxsuspension: maxsuspension,
                maxarmor: maxarmor,
                maxturbo: maxturbo,
                maxxenon: maxxenon,
                maxplateh: maxplateh,
                maxplatev: maxplatev,
                maxtrimdesign: maxtrimdesign,
                maxornaments: maxornaments,
                maxdialdesign: maxdialdesign,
                maxdoorint: maxdoorint,
                maxseats: maxseats,
                maxsteeringw: maxsteeringw,
                maxshiftlever: maxshiftlever,
                maxplaques: maxplaques,
                maxhydraulics: maxhydraulics,
                maxengineb: maxengineb,
                maxairfilter: maxairfilter,
                maxstrutbar: maxstrutbar,
                maxarchcover: maxarchcover,
                maxantenna: maxantenna,
                maxexteriorp: maxexteriorp,
                maxtank: maxtank,
                maxdoor: maxdoor,
                maxwroh: maxwroh,
                maxstickers: maxstickers,
                maxplate: maxplate,
                maxwindowtint: maxwindowtint,
                }
            alt.emitClient(player, Tuningmenu_Events.SERVER, syncData);
            };
    }

    static purchase(
        player: alt.Player,
        id: number ,
        value: number ,
    ) {
        const veh = Athena.document.vehicle.get(player.vehicle);
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        if (Athena.vehicle.tempVehicles.has(player.vehicle)) {
            return;
        }

        const playerData = Athena.document.character.get(player);
        if (veh.owner !== playerData._id) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }

        if (value !== undefined && value !== null) {
            player.vehicle.setMod(id, value);
        }
        
        const tuningData: IVehicleTuning = Athena.vehicle.tuning.getTuning(player.vehicle);
        Athena.document.vehicle.set(player.vehicle, 'tuning', tuningData);
        // InternalFunctions.updateTuning(player, player.vehicle);
        player.vehicle.frozen === false;

    }

    static purchasePlate(
        player: alt.Player,
        value: number ,
    ) {
        const veh = Athena.document.vehicle.get(player.vehicle);
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        if (Athena.vehicle.tempVehicles.has(player.vehicle)) {
            return;
        }

        const playerData = Athena.document.character.get(player);
        if (veh.owner !== playerData._id) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }

        if (value !== undefined && value !== null) {
            player.vehicle.numberPlateIndex === value;
        }
        const numberPlateState: Partial<VehicleState> = { numberPlateIndex: value };

        const stateData: VehicleState = Athena.vehicle.tuning.applyState(player.vehicle, numberPlateState);
        Athena.document.vehicle.set(player.vehicle, 'state', stateData);
        // InternalFunctions.updateTuning(player, player.vehicle);
        player.vehicle.frozen === false;
    }

    static purchaseWindowtint(
        player: alt.Player,
        value: number ,
    ) {
        const veh = Athena.document.vehicle.get(player.vehicle);
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        if (Athena.vehicle.tempVehicles.has(player.vehicle)) {
            return;
        }

        const playerData = Athena.document.character.get(player);
        if (veh.owner !== playerData._id) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }

        if (value !== undefined && value !== null) {
            player.vehicle.windowTint === value;
        }
        const windowTintState: Partial<VehicleState> = { windowTint: value };

        const stateData: VehicleState = Athena.vehicle.tuning.applyState(player.vehicle, windowTintState);
        Athena.document.vehicle.set(player.vehicle, 'state', stateData);
        // InternalFunctions.updateTuning(player, player.vehicle);
        player.vehicle.frozen === false;
    }

    static purchaseStance(
        player: alt.Player,
        name: string,
        value: number,
    ) {
        const veh = Athena.document.vehicle.get(player.vehicle);
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        if (Athena.vehicle.tempVehicles.has(player.vehicle)) {
            return;
        }

        const playerData = Athena.document.character.get(player);
        if (veh.owner !== playerData._id) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }
        alt.log('--- WHEELMOD | NAME --- '+name)
        alt.log('--- WHEELMOD | VALUE --- '+value)
        
        if(name === TUNINGMENU_LOCALE.WHEELCAMBER) {
            if (value !== undefined && value !== null) {
                player.vehicle.setStreamSyncedMeta('wheelModCamber', value)
            }
        }
        if(name === TUNINGMENU_LOCALE.WHEELHEIGHT) {  
            if (value !== undefined && value !== null) {
                player.vehicle.setStreamSyncedMeta('wheelModHeight', value)
            }
        }
        if(name === TUNINGMENU_LOCALE.WHEELTRACKWIDTH) {
            if (value !== undefined && value !==null) {
                player.vehicle.setStreamSyncedMeta('wheelModTrackWidth', value)
            }
        }
        if(name === TUNINGMENU_LOCALE.WHEELRIMRADIUS) {
            if (value !== undefined && value !== null) {
                player.vehicle.setStreamSyncedMeta('wheelModRimRadius', value)
            }
        }
        if(name === TUNINGMENU_LOCALE.WHEELTYRERADIUS) {
            if (value !== undefined && value !== null){
                player.vehicle.setStreamSyncedMeta('wheelModTyreRadius', value)
            }
        }
        if(name === TUNINGMENU_LOCALE.WHEELTYREWIDTH) {
            if (value !== undefined && value !== null) {
                player.vehicle.setStreamSyncedMeta('wheelModTyreWidth', value)
            }
        }
        const tuningData: IVehicleTuning = Athena.vehicle.tuning.getTuning(player.vehicle);
        Athena.document.vehicle.set(player.vehicle, 'tuning', tuningData);
        // InternalFunctions.updateTuning(player, player.vehicle);
        player.vehicle.frozen === false;

    }

    static purchaseWheels(
        player: alt.Player,
        wheeltype: number ,
        wheelid: number ,
    ) {
        const veh = Athena.document.vehicle.get(player.vehicle);
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        if (Athena.vehicle.tempVehicles.has(player.vehicle)) {
            return;
        }

        const playerData = Athena.document.character.get(player);
        if (veh.owner !== playerData._id) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }

        if (wheeltype !== undefined && wheeltype !== null && wheelid !== undefined && wheelid !== null) {
            player.vehicle.setWheels(wheeltype, wheelid);
        }
        
        const tuningData: IVehicleTuning = Athena.vehicle.tuning.getTuning(player.vehicle);
        Athena.document.vehicle.set(player.vehicle, 'tuning', tuningData);
        // InternalFunctions.updateTuning(player, player.vehicle);
        player.vehicle.frozen === false;
    }

    static async payTuning(player: alt.Player, id: number, value: number, valuepl: number, valuewi: number, ids: string, values: number, wheel: string, idw: number, valuew: number){
        const priceTuning: number[] = [ 2000, 3000, 2500, 1500, 1000, 1800, 1200, 2200, 2000, 2000, 1000, 5000, 3000, 3500, 500, 2000, 3000, 2500, 1000, 1500, 800, 800, 500, 800, 1000, 500, 1000, 2000, 1200, 800, 800, 1000, 1500, 1500, 1200, 800, 1000, 1200, 500, 1000, 1200, 1500, 1500, 2000]

        function generateRandomNumber(min: number, max: number): number {
            const randomNumber = Math.random() * (max - min) + min;
            return Math.floor(randomNumber);
        }

        const min = 100;
        const max = 5000;
        const randomNum = generateRandomNumber(min, max);
        const pwid = 14
        const sid = 14
        const wid = 15

        alt.log('DATA: ')
        alt.log('---Player--- '+player.id)
        alt.log('---TuningID--- '+id)
        alt.log('---TuningValue--- '+value)
        alt.log('---PlateValue--- '+valuepl)
        alt.log('---WindowTintValue--- '+valuewi)
        alt.log('---StanceID--- '+ids)
        alt.log('---StanceValue--- '+values)
        alt.log('---WheelCollection--- '+wheel)
        alt.log('---WheelID--- '+idw)
        alt.log('---WheelValue--- '+valuew)
        

        if(id){
            const finalPrice = priceTuning[id] + randomNum;
            Athena.player.currency.sub(player, CurrencyTypes.BANK, finalPrice);
            player.vehicle.frozen === true;
            await Athena.player.emit.createProgressBar(player, {
                color: new RGBA(200, 200, 10, 255),
                distance: 5,
                milliseconds: 10000,
                text: TUNINGMENU_LOCALE.TUNING_PROGRESS,
                position:new alt.Vector3(player.pos.x, player.pos.y, player.pos.z)
            });
            Athena.player.emit.message(player, 'Du hast für das Tuning '+ finalPrice +'$ bezahlt. Gute Fahrt!')
            TuningShopView.purchase(player, id, value)
            return;
        }

        if(valuepl){
            const finalPrice = priceTuning[pwid] + randomNum;
            Athena.player.currency.sub(player, CurrencyTypes.BANK, finalPrice);
            player.vehicle.frozen === true;
            await Athena.player.emit.createProgressBar(player, {
                color: new RGBA(200, 200, 10, 255),
                distance: 5,
                milliseconds: 10000,
                text: TUNINGMENU_LOCALE.TUNING_PROGRESS,
                position:new alt.Vector3(player.pos.x, player.pos.y, player.pos.z)
            });
            Athena.player.emit.message(player, 'Du hast für das Tuning '+ finalPrice +'$ bezahlt. Gute Fahrt!')
            TuningShopView.purchasePlate(player, valuepl)
            return;
        }

        if(valuewi){
            const finalPrice = priceTuning[pwid] + randomNum;
            Athena.player.currency.sub(player, CurrencyTypes.BANK, finalPrice);
            player.vehicle.frozen === true;
            await Athena.player.emit.createProgressBar(player, {
                color: new RGBA(200, 200, 10, 255),
                distance: 5,
                milliseconds: 10000,
                text: TUNINGMENU_LOCALE.TUNING_PROGRESS,
                position:new alt.Vector3(player.pos.x, player.pos.y, player.pos.z)
            });
            Athena.player.emit.message(player, 'Du hast für das Tuning '+ finalPrice +'$ bezahlt. Gute Fahrt!')
            TuningShopView.purchaseWindowtint(player, valuewi)
            return;
        }

        if(ids){
            const finalPrice = priceTuning[sid] + randomNum;
            Athena.player.currency.sub(player, CurrencyTypes.BANK, finalPrice);
            player.vehicle.frozen === true;
            await Athena.player.emit.createProgressBar(player, {
                color: new RGBA(200, 200, 10, 255),
                distance: 5,
                milliseconds: 10000,
                text: TUNINGMENU_LOCALE.STANCE_PROGRESS,
                position:new alt.Vector3(player.pos.x, player.pos.y, player.pos.z)
            });
            Athena.player.emit.message(player, 'Du hast für das Tuning '+ finalPrice +'$ bezahlt. Gute Fahrt!')
            TuningShopView.purchaseStance(player, ids, values)
            return;
        }

        if(wheel) {
            const finalPrice = priceTuning[wid] + randomNum;
            Athena.player.currency.sub(player, CurrencyTypes.BANK, finalPrice);
            player.vehicle.frozen === true;
            await Athena.player.emit.createProgressBar(player, {
                color: new RGBA(200, 200, 10, 255),
                distance: 5,
                milliseconds: 10000,
                text: TUNINGMENU_LOCALE.WHEELS_PROGRESS,
                position:new alt.Vector3(player.pos.x, player.pos.y, player.pos.z)
            });
            Athena.player.emit.message(player, 'Du hast für das Tuning '+ finalPrice +'$ bezahlt. Gute Fahrt!')
            TuningShopView.purchaseWheels(player, idw, valuew)
            return;
        }
    }
}
