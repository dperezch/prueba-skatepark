console.log("conectado al script");

/* Simular jquery */
let $ = (element) => document.querySelector(element);

const registro = $("#formulario-registro");

registro.addEventListener("submit", async (e) => {
  e.preventDefault();
  const {
    email,
    nombre,
    password,
    password2,
    experiencia,
    especialidad,
    foto,
  } = e.target;

  /* Validar que los campos no esten vacios */
  if (
    email.value.trim() === "" ||
    nombre.value.trim() === "" ||
    password.value.trim() === "" ||
    password2.value.trim() === "" ||
    experiencia.value.trim() === "" ||
    especialidad.value.trim() === "" ||
    foto.files[0] === undefined
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }

  /* Validar que el email sea valido */
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEx.test(String(email.value).toLowerCase())) {
    alert("El email no es válido");
    return;
  }

  /* Validar que la contraseña tenga al menos 6 caracteres */
  if (password.value.length < 6) {
    alert("La contraseña debe tener al menos 6 carácteres");
    return;
  }

  /* Validar que las contraseñas coincidan */
  if (password.value !== password2.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  /* Enviar los datos al servidor */
  const formData = new FormData();
  formData.append("email", email.value.trim());
  formData.append("nombre", nombre.value.trim());
  formData.append("password", password.value.trim());
  formData.append("experiencia", experiencia.value.trim());
  formData.append("especialidad", especialidad.value.trim());
  formData.append("foto", foto.files[0]);

  try {
    const response = await fetch("/registro", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Registro exitoso");
  } catch (error) {
    alert("No se pudo realizar el registro");
    console.log(error);
  }

  /* Limpiar los input */
  email.value = "";
  nombre.value = "";
  password.value = "";
  password2.value = "";
  experiencia.value = "";
  especialidad.value = "";
  foto.value = "";
});

const login = $("#formulario-login");
login.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { email, password } = e.target;
  console.log(email, password);

  /* try {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value.trim(),
      }),
    });
  } catch (error) {
    console.log(error);
  } */
});
