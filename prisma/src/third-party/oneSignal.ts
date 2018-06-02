import * as OneSignal from 'onesignal-node';

const ONE_SIGNAL_URL = "https://onesignal.com/api/v1/notifications"
const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
const ONE_SIGNAL_REST_KEY = process.env.ONE_SIGNAL_REST_KEY;

const Client = new OneSignal.Client({
	app: { appAuthKey: ONE_SIGNAL_REST_KEY, appId: ONE_SIGNAL_APP_ID  }
});

export function sendNotificationToOne(oneSignalUserId, title, content) {
  var notification = new OneSignal.Notification({
    contents: {
      en: content,
    }
  });
  notification.setParameter('headings', { "en": title });
  notification.setTargetDevices([oneSignalUserId]);

  return Client.sendNotification(notification);
}