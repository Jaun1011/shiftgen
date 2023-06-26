import {dom} from "../lib/dom.js";



const projectWorker = (controller, rootElement) => {
    controller.onAddWorker(worker => {
        const shiftElements = Array.from(dom(`
            <div>${worker.id}</div>
            <input               value="${worker.name}"   >
            <div></div>
            <button>-</button>
        `));

        const removeButton = shiftElements[3];
        shiftElements.forEach(s  => rootElement.append(s));

        removeButton.onclick = _ => {
            controller.delWorker(worker);
            shiftElements.forEach(e => e.remove());
        };
    })
}


export const projectWorkers = controller => {

    const workers    = document.createElement("div");
    workers.setAttribute("class", "shifts");

    projectWorker(controller, workers);


    const  [id, shiftName,e , addButton]  = dom(`
        <strong>#</strong>
        <input value="worker">
        <div></div>
        <button>+</button>   
    `);


    addButton.onclick = _ => controller.addWorker(shiftName.value);
    [id, shiftName, e, addButton] .forEach(i => workers.append(i))


    const root = document.createElement("div");
    root.innerHTML = `<h2>Worker</h2>`;

    root.append(workers);

    return root;
}
