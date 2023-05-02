import EventBoardJS from './EventBoardJS.js';

export default class KanbanJS {
  constructor(root) {
      this.root = root;

      KanbanJS.eventBoards().forEach(eventBoard => {
          const eventBoardView = new EventBoardJS(eventBoard.id, eventBoard.title);

          this.root.appendChild(eventBoardView.elements.root);
      });

      //THIS CREATES A NEW ITEM IN ALL COLUMNS

      const addItemButton = this.root.querySelector(".eventBoardAddItem");
      addItemButton.addEventListener("click", () => {
          const eventBoardItem = document.createElement("div");
          eventBoardItem.classList.add("eventBoard__Item-input");
          const itemContent = document.createTextNode("New item");
          eventBoardItem.appendChild(itemContent);
          const allEventBoards = this.root.querySelectorAll(".eventBoard__Items");

          allEventBoards.forEach(eventBoard => {
              eventBoard.appendChild(eventBoardItem.cloneNode(true));
          });
      });


  }

  static
  eventBoards()
  {
      return [
          {
              id: 1,
              title: 'Pinned / Important',
          },
          {
              id: 2,
              title: 'All Events',
          },
          {
              id: 3,
              title: 'Deleted',
          }
      ];

  }
}