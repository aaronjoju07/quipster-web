// timeUtils.ts
import { formatDistanceToNow } from 'date-fns';

export const formatTimeAgo = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};
