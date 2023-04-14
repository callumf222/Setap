import EventBoardJS from './EventBoardJS.js';

export default class KanbanJS {
  constructor(root) {
      this.root = root;

      KanbanJS.eventBoards().forEach(eventBoard => {
          const eventBoardView = new EventBoardJS(eventBoard.id, eventBoard.title);

          this.root.appendChild(eventBoardView.elements.root);
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