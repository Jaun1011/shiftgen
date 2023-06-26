


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
    root.innerHTML += "<h2>Distribution</h2>";

    const dist = projectDistribution(controller);

    root.appendChild(dist);


    return root;
}
