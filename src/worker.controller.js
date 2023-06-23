import {Observable, ObservableList} from "../lib/observable.js";
import {distribute} from "./distributor.js";


export const WorkerController = (times = 1) => {


    const shifts$ = ObservableList([]);
    const workers$ = ObservableList([]);

    const times$ = Observable(times);

    const distribution$ = Observable([]);

    let shiftId = 0

    const addShift = (name, weight) => {
        shifts$.add({id: shiftId, name, weight});
        shiftId++;
    }

    let workerId = 0
    const addWorker = name => {
        workers$.add({id: workerId, name, balance: 0});
        workerId++;
    }


    const dist = _ => {
        try{
            distribution$.setValue(distribute(workers$.list, shifts$.list, [],times$.getValue()));
        }catch (er){
            console.log(er);
        }
    }

    shifts$.onAdd(dist);
    shifts$.onDel(dist);

    times$.onChange(dist);


    workers$.onAdd(dist);
    workers$.onDel(dist);


    return {
        setTime: times$.setValue,
        onChangedTime: times$.onChange,
        getTime: times$.getValue,

        addShift,
        delShift:   shifts$.del,
        onAddShift: shifts$.onAdd,
        onDelShift: shifts$.onDel,

        addWorker,
        delWorker:    workers$.del,
        onAddWorker:  workers$.onAdd,
        onDelWorker:  workers$.onDel,
        workerLength: workers$.count,
        getWorkers:   _ => workers$.list,


        onChangeDistribution: distribution$.onChange,


    }
}
