import {WorkerController} from "./src/worker.controller.js";
import {projectShifts} from "./src/shift.projector.js";
import {projectDistributions} from "./src/distribution.projector.js";



const workerController = WorkerController();

const shiftsElement = projectShifts(workerController);
const distElements  = projectDistributions(workerController);



const root = document.getElementById("shiftApp");
root.appendChild(shiftsElement);
root.appendChild(distElements);
