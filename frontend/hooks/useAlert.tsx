// hooks/useAlert.ts
import { useState } from 'react'

type AlertType = 'success' | 'error' | 'info'

export const useAlert = () => {
  const [alert, setAlertProperties] = useState({
    show: false,
    text: '',
    type: '' as AlertType,
  });

  const showAlert = (text: string, type: AlertType) => {
    setAlertProperties({ show: true, text, type });
  };

  const hideAlert = () => {
    setAlertProperties(prev => ({ ...prev, show: false }));
  };

  return {
    alert,
    showAlert,
    hideAlert,
  };
};
