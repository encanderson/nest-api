import { LocalDateTime } from '@js-joda/core';

export const createdAt = () => {
  return LocalDateTime.now().toString();
};
