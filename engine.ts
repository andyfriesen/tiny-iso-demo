
import { Map, TILES } from "map";
import { RootActor, Engine, Player } from "tilemovement";
import { Input } from "input";

export let map = new Map(document.getElementById('map') as HTMLDivElement, TILES);

export let input = new Input();

var r = new RootActor();
var e = new Engine(r);

var p = new Player(input, r);

let origin = map.getScreenOrigin();

export function start() {
    r.children.push(p);
    r.div.style.left = origin[0] + 'px';
    r.div.style.top = origin[1] + 'px';
    r.update();

    setInterval(() => e.tick(), 1 / 30.0);
}
