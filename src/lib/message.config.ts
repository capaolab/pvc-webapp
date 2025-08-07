import { notifications } from '@mantine/notifications';

type IMessage = {
  title: string;
  message: string;
  color?: string;
};

export function defaultNotification({
  title,
  message,
  color = 'red',
}: IMessage) {
  notifications.show({
    title,
    message,
    color,
    withCloseButton: true,
    position: 'top-right',
    autoClose: 5000,
  });
}
