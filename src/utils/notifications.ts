import { showNotification, hideNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
import React from 'react';

export const notifySuccess = (message: string, title?: string, id?: string) => {
  showNotification({
    id: id || `success-${Date.now()}`,
    title,
    message,
    color: 'green',
    icon: React.createElement(IconCheck, { size: 18 }),
    autoClose: 4000,
  });
};

export const notifyError = (message: string, title?: string, id?: string) => {
  showNotification({
    id: id || `error-${Date.now()}`,
    title: title || 'Error',
    message,
    color: 'red',
    icon: React.createElement(IconX, { size: 18 }),
    autoClose: 5000,
  });
};

export const notifyInfo = (message: string, title?: string, id?: string) => {
  showNotification({
    id: id || `info-${Date.now()}`,
    title: title || 'Information',
    message,
    color: 'blue',
    icon: React.createElement(IconInfoCircle, { size: 18 }),
    autoClose: 4000,
  });
};

export const notifyWarning = (message: string, title?: string, id?: string) => {
  showNotification({
    id: id || `warning-${Date.now()}`,
    title: title || 'Warning',
    message,
    color: 'yellow',
    icon: React.createElement(IconAlertTriangle, { size: 18 }),
    autoClose: 5000,
  });
};

export const notifyLoading = (message: string, id: string) => {
  showNotification({
    id,
    title: 'Loading',
    message,
    loading: true,
    autoClose: false,
    withCloseButton: false,
  });
};

export const updateNotifySuccess = (id: string, message: string, title?: string) => {
  updateNotification({
    id,
    title: title || 'Success',
    message,
    color: 'green',
    icon: React.createElement(IconCheck, { size: 18 }),
    autoClose: 2000,
  });
};

export const updateNotifyError = (id: string, message: string, title?: string) => {
  updateNotification({
    id,
    title: title || 'Error',
    message,
    color: 'red',
    icon: React.createElement(IconX, { size: 18 }),
    autoClose: 2000,
  });
}; 