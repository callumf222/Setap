export default class EventBoardJS {
    constructor(id, title) {
        this.elements = {};
        this.elements.root = EventBoardJS.createRoot();
        this.elements.title = this.elements.root.querySelector('.eventBoard__Title');
        this.elements.items = this.elements.root.querySelector('.eventBoard__Items');
        this.elements.dButton = this.elements.root.querySelector('.eventBoard__DButton');
        this.elements.pButton = this.elements.root.querySelector('.eventBoard__PButton');

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;


    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="eventBoard">
                <div class="eventBoard__Title"></div>
                <div class="eventBoard__Items"></div>
                <button class="eventBoard__DButton" type="button">D</button>
                <button class="eventBoard__PButton" type="button">P</button>
            </div>
        `).children[0];

    }
}