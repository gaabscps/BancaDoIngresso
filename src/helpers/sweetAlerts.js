import SweetAlert from "sweetalert2";

const handleSweetAlert = (type, title, text, timer, html) => {
  if (type === "success") {
    SweetAlert.fire({
      title: title,
      ...(text ? { text } : { html }),
      icon: "success",
    });
  }
  if (type === "danger") {
    SweetAlert.fire({
      title: title,
      ...(text ? { text } : { html }),
      icon: "error",
    });
  }
  if (type === "info") {
    SweetAlert.fire({
      title: title,
      ...(text ? { text } : { html }),
      icon: "info",
    });
  }
  if (type === "warn") {
    SweetAlert.fire({
      title: title,
      ...(text ? { text } : { html }),
      icon: "warning",
    });
  }
};

export default handleSweetAlert;
