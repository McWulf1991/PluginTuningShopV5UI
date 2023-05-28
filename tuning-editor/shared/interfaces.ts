import { Vector3 } from 'alt-shared';


export interface iTuningshopSync {
    spoiler: number ;   
    fbumper: number ;   
    rbumper: number ;   
    sskirt: number ;    
    exhaust: number ;   
    frame: number ;     
    grille: number ;    
    hood: number ;      
    lwing: number ;     
    rwing: number ;     
    roof: number ;       
    engine: number ;     
    brakes: number ;     
    trans: number ;      
    horns: number ;      
    suspension: number ; 
    armor: number ;      
    turbo: number ;      
    xenon: number ;        
    plateh: number ;     
    platev: number ;     
    trimdesign: number ; 
    ornaments: number ;  
    dialdesign: number ; 
    doorint: number ;    
    seats: number ;      
    steeringw: number ;  
    shiftlever: number ; 
    plaques: number ;    
    hydraulics: number ; 
    engineb: number ;    
    airfilter: number ;  
    strutbar: number ;   
    archcover: number ;  
    antenna: number ;    
    exteriorp: number ;  
    tank: number ;       
    door: number ;       
    wroh: number ;       
    stickers: number ;   
    plate: number ;      
    windowtint: number ; 
    wheelcamber: number ;
    wheelheight: number ;
    wheelrimradius: number ;
    wheeltrackwidth: number ;
    wheeltyreradius: number ;
    wheeltyrewidth: number ;
    wheelid: number ;
    wheeltype: number ;
    maxspoiler: number;
    maxfbumper: number;
    maxrbumper: number;
    maxsskirt: number;
    maxexhaust: number;
    maxframe: number;
    maxgrille: number;
    maxhood: number;
    maxlwing: number;
    maxrwing: number;
    maxroof: number;
    maxengine: number;
    maxbrakes: number;
    maxtrans: number;
    maxhorns: number;
    maxsuspension: number;
    maxarmor: number;
    maxturbo: number;
    maxxenon: number;
    maxplateh: number;
    maxplatev: number;
    maxtrimdesign: number;
    maxornaments: number;
    maxdialdesign: number;
    maxdoorint: number;
    maxseats: number;
    maxsteeringw: number;
    maxshiftlever: number;
    maxplaques: number;
    maxhydraulics: number;
    maxengineb: number;
    maxairfilter: number;
    maxstrutbar: number;
    maxarchcover: number;
    maxantenna: number;
    maxexteriorp: number;
    maxtank: number;
    maxdoor: number;
    maxwroh: number;
    maxstickers: number;
    maxplate: number;
    maxwindowtint: number;
}

export interface ITuningShop {
    x: number,
    y: number,
    z: number,
    uid: string;
    cost: number;
    vertices: Array<Vector3>;
}
