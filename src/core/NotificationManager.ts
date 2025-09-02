import { createApp } from 'vue';
import NotificationContainer from '../components/NotificationContainer.vue';

class NotificationManager {
  private static instance: NotificationManager;
  private mounted = false;

  private constructor() {}

  public static getInstance() {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }

    return NotificationManager.instance;
  }

  mount() {
    if (this.mounted) return;
    
    const container = document.createElement('div');
    document.body.appendChild(container);
    createApp(NotificationContainer).mount(container);
    this.mounted = true;
  }
}

export const notificationManager = NotificationManager.getInstance();
