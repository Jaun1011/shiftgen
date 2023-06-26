
export const min_worker_balance = workers => {
    let worker_min = workers[0];
    let i = 0;
    while (i < workers.length) {
        worker_min = workers[i].balance < worker_min.balance ? workers[i] : worker_min;
        i++;
    }

    return worker_min;
};

export const min_worker_balance_blocked = (workers, times, worker_shifts) => {
    const nonBlockedWorkers = workers.filter(worker => !blocked(worker.id, times, worker_shifts));
    return min_worker_balance(nonBlockedWorkers);
}




export const sum_balance = (workers, shifts, worker_shifts) =>
    workers.forEach(w => {
        w.balance += worker_shifts
            .filter(ws => ws.workerId === w.id)
            .map(ws => ws.shiftId)
            .map(si => shifts.find(s => s.id === si).weight)
            .reduce((a, b) => a + b, 0);
    });

export const blocked = (wid, times, worker_shifts) => worker_shifts
    .filter(ws => ws.workerId === wid && ws.times === times)
    .length > 0;


export const distribute = (workers, shifts, worker_shifts, times) => {

    workers.forEach(w => w.balance = 0);


    for (let time = 0; time < times; time++) {
        shifts
            .filter(s => !s.disabled)
            .forEach(shift => {
                const worker = min_worker_balance_blocked(workers, time, worker_shifts);
                if (worker === undefined) throw "not enough workers";

                worker_shifts.push({workerId: worker.id, shiftId: shift.id, times: time})
                worker.balance += shift.weight;
            });
        }
    return worker_shifts;

}




