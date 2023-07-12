// Mengimpor modul dan komponen yang diperlukan
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Label, TextInput, Button, Modal } from "flowbite-react";
import { IoPersonCircle } from "react-icons/io5";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import Validation from "../Validation/SignUpValidation";

function DashboardUserSignUp() {
  // Menggunakan useState untuk menginisialisasi state
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    instansi: "",
    tempat_lahir: "",
    tgl_lahir: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleInput = (event) => {
    // Mengupdate nilai state berdasarkan input pengguna
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const closeModal = () => {
    // Menutup modal
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      instansi: values.instansi.trim(),
      tempat_lahir: values.tempat_lahir.trim(),
      tgl_lahir: values.tgl_lahir.trim(),
    });
    setErrors(err);
    if (
      err.name === "" &&
      err.email === "" &&
      err.password === "" &&
      err.instansi === "" &&
      err.tempat_lahir === "" &&
      err.tgl_lahir === ""
    ) {
      // Mengirim permintaan POST ke server menggunakan Axios
      axios
        .post("https://server.libraryselfservice.site/signup", values)
        .then((res) => {
          // Jika pendaftaran berhasil, menampilkan modal dengan pesan sukses
          setShowModal(true);
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.error;
            // Jika terjadi kesalahan, menampilkan pesan kesalahan pada state errors
            setErrors({ ...err, email: errorMessage });
            setShowModal(true);
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <div className="flex h-full sm:h-screen w-full bg-blue-800 py-8 sm:py-0">
      {/* Tampilan pendaftaran pengguna */}
      <div className="m-auto w-full flex justify-center">
        <div className="w-full flex justify-center">
          {/* Modal untuk menampilkan pesan sukses */}
          <Modal show={showModal} size="md" popup={true} onClose={closeModal}>
            {/* Konten modal */}
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                {/* Tampilan ikon sukses atau pesan kesalahan */}
                <MdOutlineCheckCircleOutline className="mx-auto mb-4 h-14 w-14 text-green-500" />
                {errors.email ? (
                  // Jika ada kesalahan validasi, menampilkan pesan kesalahan
                  <h3 className="mb-5 text-lg font-normal text-red-600">
                    {errors.email}
                  </h3>
                ) : (
                  // Jika pendaftaran berhasil, menampilkan pesan sukses
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Sign Up Success
                  </h3>
                )}
                <div className="flex justify-center gap-4">
                  {/* Tombol OK untuk menutup modal */}
                  <Button
                    id="closeModal"
                    color="blue"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/dashboard-login");
                    }}
                  >
                    Ok
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {/* Formulir pendaftaran */}
          <Card className="w-5/6 sm:w-3/6 px-2 sm:px-5 py-3">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Pendaftaran Anggota Perpustakaan
            </h1>
            {/* Tampilan ikon pengguna */}
            <div className="text-center flex justify-center flex-col items-center">
              <IoPersonCircle
                size="8rem"
                className="text-blue-900"
              ></IoPersonCircle>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Input nama */}
              <div className="sm:flex">
                <div className="w-1/4">
                  <Label htmlFor="name" value="Nama" />
                </div>
                <TextInput
                  type="name"
                  id="name"
                  placeholder="Masukkan nama"
                  name="name"
                  onChange={handleInput}
                  className="sm:w-3/4"
                />
                {errors.name && (
                  // Menampilkan pesan kesalahan untuk input nama
                  <span className="text-red-600"> {errors.name}</span>
                )}
              </div>
              {/* Input tempat dan tanggal lahir */}
              <div className="sm:flex">
                <div className="sm:w-1/4">
                  <Label htmlFor="tempat_lahir" value="Tempat Tanggal Lahir" />
                </div>
                <div className="sm:flex sm:w-3/4 gap-4">
                  <TextInput
                    type="text"
                    id="tempat_lahir"
                    placeholder="Masukkan Tempat Lahir"
                    name="tempat_lahir"
                    onChange={handleInput}
                    className="sm:w-1/2 my-2"
                  />
                  {errors.tempat_lahir && (
                    // Menampilkan pesan kesalahan untuk input tempat lahir
                    <span className="text-red-600"> {errors.tempat_lahir}</span>
                  )}
                  <TextInput
                    type="date"
                    id="tgl_lahir"
                    name="tgl_lahir"
                    onChange={handleInput}
                    className="sm:w-1/2"
                  />
                  {errors.tgl_lahir && (
                    // Menampilkan pesan kesalahan untuk input tanggal lahir
                    <span className="text-red-600"> {errors.tgl_lahir}</span>
                  )}
                </div>
              </div>
              {/* Input instansi */}
              <div className="sm:flex">
                <div className="sm:w-1/4">
                  <Label htmlFor="instansi" value="Instansi" />
                </div>
                <TextInput
                  type="text"
                  id="instansi"
                  placeholder="Masukkan Asal Instansi"
                  name="instansi"
                  onChange={handleInput}
                  className="sm:w-3/4"
                />
                {errors.instansi && (
                  // Menampilkan pesan kesalahan untuk input instansi
                  <span className="text-red-600"> {errors.instansi}</span>
                )}
              </div>
              {/* Input email */}
              <div className="sm:flex">
                <div className="sm:w-1/4">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  type="email"
                  id="email"
                  placeholder="Masukkan Email"
                  name="email"
                  onChange={handleInput}
                  className="sm:w-3/4"
                />
                {errors.email && (
                  // Menampilkan pesan kesalahan untuk input email
                  <span className="text-red-600"> {errors.email}</span>
                )}
              </div>
              {/* Input password */}
              <div className="sm:flex">
                <div className="sm:w-1/4">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                  className="sm:w-3/4"
                />
                {errors.password && (
                  // Menampilkan pesan kesalahan untuk input password
                  <span className="text-red-600"> {errors.password}</span>
                )}
              </div>
              {/* Tombol submit untuk mengirim formulir */}
              <Button type="submit">Konfirmasi Pendaftaran</Button>
              <div className="text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Jika anda sudah memiliki akun silakan
                </span>
                {/* Tautan untuk menuju halaman login */}
                <Link to="/dashboard-login">
                  <span className="text-sm font-bold"> Masuk</span>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardUserSignUp;
