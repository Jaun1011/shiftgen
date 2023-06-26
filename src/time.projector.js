export const projectTime = controller => {

    const timeElements = document.createElement("div");

    timeElements.innerHTML = `
        <h2>times</h2>
        <input value="${controller.getTime()}" type="number">
    `;

    const timeInput = timeElements.children[1];
    timeInput.onchange = _ => controller.setTime(timeInput.value);

    return timeElements;
}


