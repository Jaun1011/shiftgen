import {dom} from "../lib/dom.js";


export const projectShifts = controller => {

    const root = document.createElement("div");
    root.innerHTML = `<h2>Shifts</h2>`;

    const shifts    = document.createElement("div");
    shifts.setAttribute("class", "shifts")

    controller.onAddShift(shift => {
        const shiftElements = Array.from(dom(`
            <div>${shift.id}</div>
            <input               value="${shift.name}"   >
            <input type="number" value="${shift.weight}" >
            <button>-</button>
        `));
        const removebutton = shiftElements[3];

        shiftElements.forEach(s  => shifts.append(s));

        removebutton.onclick = _ => {
            controller.delShift(shift);
            shiftElements.forEach(e => e.remove());
        };
    })

    const  [id, shiftName, shiftWeight, addButton]  = dom(`
        <strong>#</strong>
        <input value="shift">
        <input value="1" type="number">
        <button>+</button>   
    `);





    addButton.onclick = _ => controller.addShift(shiftName.value, shiftWeight.value);
    [id, shiftName, shiftWeight, addButton] .forEach(i => shifts.append(i))

    root.append(shifts);
    return root;
}
