import {TestSuite} from "../lib/testsuite.js";
import {blocked, distribute, min_worker_balance, min_worker_balance_blocked, sum_balance} from "./distributor.js";

const ts = TestSuite("distributor");
ts.add("min_worker_balance min value", assert => {
    const res = min_worker_balance([
        {id: 1, name: "", count: 0, balance: 0},
        {id: 2, name: "", count: 0, balance: 0},
        {id: 3, name: "", count: 0, balance: -1},
        {id: 4, name: "", count: 0, balance: 0},
    ]);
    assert.is(3, res.id);
});

ts.add("min_worker_balance min value", assert => {
    const res = min_worker_balance([
        {id: 1, name: "", balance: 0},
        {id: 2, name: "", balance: 0},
        {id: 3, name: "", balance: -1},
        {id: 4, name: "", balance: 0},
    ]);
    assert.is(3, res.id);
});

ts.add("min_worker_balance_blocked", assert => {
    const workers = [
        {id: 1, name: "", balance: -1},
        {id: 2, name: "", balance: 0},
    ];

    const worker_shifts = [
        {workerId: 1, shiftId: 1, times: 1}
    ];

    const w = min_worker_balance_blocked(workers, 1, worker_shifts);

    assert.is(2, w.id);
});


ts.add("sum_balance", assert => {
    const workers = [
        {id: 1, name: "", balance: 0},
        {id: 2, name: "", balance: 0},
    ];

    const shifts = [
        {id: 1, weight: 1}
    ];

    const worker_shifts = [
        {workerId: 1, shiftId: 1, times: 1}
    ];
    sum_balance(workers, shifts, worker_shifts);

    assert.is(1, workers[0].balance);
    assert.is(0, workers[1].balance);
});

ts.add("sum_balance multi", assert => {
    const workers = [
        {id: 1, name: "", balance: 0},
        {id: 2, name: "", balance: 0},
    ];

    const shifts = [
        {id: 1, weight: 1},
        {id: 2, weight: -1}
    ];

    const worker_shifts = [
        {workerId: 1, shiftId: 1, times: 1},
        {workerId: 1, shiftId: 2, times: 1},
        {workerId: 2, shiftId: 1, times: 1},
    ];

    sum_balance(workers, shifts, worker_shifts);
    assert.is(0, workers[0].balance);
    assert.is(1, workers[1].balance);
});


ts.add("blocked", assert => {

    const worker_shifts = [
        {workerId: 1, shiftId: 1, times: 1},
        {workerId: 2, shiftId: 1, times: 1},
    ];

    assert.isTrue(blocked(1, 1, worker_shifts));
    assert.isFalse(blocked(1, 2, worker_shifts));
});


ts.add("distribute", assert => {

    const workers = [
        {id: 1, name: "", balance: 0},
        {id: 2, name: "", balance: 0},
    ];

    const shifts = [
        {id: 1, weight: 1},
        {id: 2, weight: 2}
    ];

    const result = distribute(workers, shifts, [], 3);
    assert.are([
            {"workerId": 1, "shiftId": 1, "times": 0},
            {"workerId": 2, "shiftId": 2, "times": 0},
            {"workerId": 1, "shiftId": 1, "times": 1},
            {"workerId": 2, "shiftId": 2, "times": 1},
            {"workerId": 1, "shiftId": 1, "times": 2},
            {"workerId": 2, "shiftId": 2, "times": 2}
        ],
        result
    );
});


ts.add("distribute not enough workers", assert => {

    const workers = [
        {id: 1, name: "", balance: 0},
        {id: 2, name: "", balance: 0},
    ];

    const shifts = [
        {id: 1, weight: 1},
        {id: 2, weight: -1, disabled: true}
    ];

    const worker_shifts = [
        {workerId: 1, shiftId: 1, times: 1},
        {workerId: 1, shiftId: 2, times: 1},
        {workerId: 2, shiftId: 1, times: 1},
    ];

    assert.throws("not enough workers", _ => distribute(workers, shifts, worker_shifts, 3));
});

ts.run()
