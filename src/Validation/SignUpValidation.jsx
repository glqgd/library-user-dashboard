function Validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const password_pattern = /^.{8,}$/;

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }
  if (values.email === "") {
    error.email = "Name should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  } else {
    error.email = "";
  }
  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password didn't correct";
  } else {
    error.password = "";
  }
  if (values.instansi === "") {
    error.instansi = "instansi should not be empty";
  } else {
    error.instansi = "";
  }
  if (values.tgl_lahir === "") {
    error.tgl_lahir = "tgl_lahir should not be empty";
  } else {
    error.tgl_lahir = "";
  }
  if (values.tempat_lahir === "") {
    error.tempat_lahir = "tempat_lahir should not be empty";
  } else {
    error.tempat_lahir = "";
  }
  return error;
}
export default Validation;
