
const dom = innerString => {
    const holder = document.createElement("DIV");
    holder.innerHTML = innerString;
    return holder.children;
};

const projectTime = controller => {

    const timeElements = document.createElement("div");

    timeElements.innerHTML = `
        <label for="time-input">times</label>
        <input id="time-input" value="${controller.getTime()}" type="number">
    `;

    const timeInput = timeElements.children[1];
    timeInput.onchange = _ => controller.setTime(timeInput.value);

    return timeElements;
}

const projectShift = (controller, shift) =>   {

    const shiftElement = document.createElement("div");
    shiftElement.setAttribute("class", "");

    shiftElement.innerHTML = `
        <div>${shift.id}</div>     
        <div>${shift.name}</div>
        <input value="${shift.weight}" type="number"> 
        <button>remove</button>
    `;

    const removeElement = shiftElement.getElementsByTagName("button")[0];

    removeElement.onclick = _ => {
        controller.delShift(shift);
        shiftElement.remove()
    };

    return shiftElement;
}


const projectNewShift = controller => {
    const input = document.createElement("div");
    input.innerHTML = `
        <input>
        <input type="number" value="1">
        <button>add shift</button>
    `;

    const [shiftName, shiftWeight, addButton] = input.children;
    addButton.onclick = _ => controller.addShift(shiftName.value, shiftWeight.value);

    return input;
}






export const projectShifts = controller => {
    const timeSetup = projectTime(controller);
    const shifts    = document.createElement("div");
    controller.onAddShift( shift => shifts.appendChild( projectShift(controller, shift) ) );

    const newShift = projectNewShift(controller);
    const root     = document.createElement("div");

    root.appendChild(timeSetup);
    root.appendChild(shifts);
    root.appendChild(newShift);

    return root;
}
