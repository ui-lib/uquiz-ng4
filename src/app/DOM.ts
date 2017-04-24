declare interface eventParam {
    name: string,
    handler: any
};

export default class DOM {

    static clone(el: HTMLElement, events: [eventParam]): Node {
        let target = el.cloneNode();
        events.forEach((ev) => target.addEventListener(ev.name, ev.handler));
        return target;
    }

    static insertAfter(newEl: HTMLElement, target: HTMLElement): void {
        const {parentNode} = target;

        if (parentNode.lastChild == target) {
            parentNode.appendChild(newEl);
        } else {
            parentNode.insertBefore(newEl, target.nextSibling);
        }
    }

}