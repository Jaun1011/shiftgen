import {WorkerController} from "./src/worker.controller.js";
import {projectDistributions} from "./src/distribution.projector.js";
import {projectShifts} from "./src/shift.projector.js";
import {projectTime} from "./src/time.projector.js";
import {projectWorkers} from "./src/worker.projector.js";


const workerController = WorkerController();

const root = document.getElementById("shiftApp");

root.appendChild( projectWorkers(workerController));
root.appendChild( projectShifts(workerController));
root.appendChild( projectTime(workerController) );

root.appendChild( projectDistributions(workerController) );
