



const projectWorker = (controller, worker) =>   {

    const shiftElement = document.createElement("div");

    shiftElement.innerHTML = `
        <div>${worker.id}</div>        
        <div>${worker.name}</div>        
        <button>remove</button>
    `;

    const removeElement = shiftElement.getElementsByTagName("button")[0];

    removeElement.onclick = _ => {
        controller.delShift(worker);
        shiftElement.remove()
    };

    return shiftElement;
}


const projectNewWorker = controller => {
    const input = document.createElement("div");

    input.innerHTML = `
        <input>
        <button>add worker</button>
    `;

    const [name, addButton] = input.children;
    addButton.onclick = _ => controller.addWorker(name.value);

    return input;
}





const projectDistribution = controller => {

    const tag = tag => (text = "") => {
        const elmt = document.createElement(tag)
        elmt.innerText = text;
        return elmt;
    };

    const th = tag ("th");
    const tr = tag ("tr");
    const td = tag ("td");

    const rootElement = document.createElement("div");



    controller.onChangeDistribution(items => {
        console.log(items);
        while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild);


        const tableElement = document.createElement("table");
        tableElement.appendChild(th("#"));


        for (let i = 0; i < controller.getTime(); i++) {
            tableElement.appendChild(th(i));
        }

        controller.getWorkers().forEach(worker => {

            const row = tr();
            row.appendChild(td(worker.id));

            for (let i = 0; i < controller.getTime(); i++) {

                const dist = document.createElement("td");
                dist.setAttribute("class", worker.id + "-" + i);
                row.appendChild(dist);
            }
            tableElement.appendChild(row);

        });


        items.forEach(n => {

            tableElement.getElementsByClassName(n.workerId + "-" + n.times)[0].innerText = n.shiftId;
        })



        rootElement.appendChild(tableElement);

    })

    return rootElement;
}

export const projectDistributions = controller => {

    const root = document.createElement("div");


    const workers = document.createElement("div");
    controller.onAddWorker(worker => workers.appendChild(projectWorker(controller, worker)));

    const dist = projectDistribution(controller);
    const newworker = projectNewWorker(controller);

    root.appendChild(workers);
    root.appendChild(newworker);
    root.appendChild(dist);




    return root;
}
