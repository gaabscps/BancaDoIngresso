import SweetAlert from 'sweetalert2';

const handleSweetAlert = (
  type: string,
  title: string,
  text: string | null,
  html?: string,
): void => {
  if (type === 'success') {
    SweetAlert.fire({
      title,
      ...(text ? { text } : { html }),
      icon: 'success',
    });
  }
  if (type === 'danger') {
    SweetAlert.fire({
      title,
      ...(text ? { text } : { html }),
      icon: 'error',
    });
  }
  if (type === 'info') {
    SweetAlert.fire({
      title,
      ...(text ? { text } : { html }),
      icon: 'info',
    });
  }
  if (type === 'warn') {
    SweetAlert.fire({
      title,
      ...(text ? { text } : { html }),
      icon: 'warning',
    });
  }
};

export default handleSweetAlert;
