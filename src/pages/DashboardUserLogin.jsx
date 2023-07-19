import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Label, TextInput, Button, Modal } from "flowbite-react";
import { IoPersonCircle } from "react-icons/io5";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import Validation from "../Validation/LoginValidation";

function DashboardUserLogin() {
  // State untuk menyimpan nilai-nilai input
  const [values, setValues] = useState({ email: "", password: "", nama: "" });

  // Menggunakan hook useNavigate untuk navigasi halaman
  const navigate = useNavigate();

  // State untuk menyimpan error validasi
  const [errors, setErrors] = useState({});

  // State untuk menyimpan error dari server
  const [backendError, setBackendError] = useState([]);

  // State untuk menampilkan atau menyembunyikan modal
  const [showModal, setShowModal] = useState(false);

  // State untuk konfigurasi modal
  const [modalProp, setmodalProp] = useState({});
  useEffect(() => {
    localStorage.removeItem("idTransaksi");
  }, []);
  // Fungsi untuk meng-handle perubahan nilai input
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fungsi untuk meng-handle submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Melakukan validasi input
    const err = Validation(values);
    setErrors(err);

    // Jika tidak ada error validasi, mengirim permintaan ke server
    if (err.email === "" && err.password === "") {
      axios
        .post("https://server.libraryselfservice.site/login", values)
        .then((res) => {
          if (res.data.errors) {
            // Jika ada error dari server, menyimpannya dalam state
            setBackendError(res.data.errors);
          } else if (res.data.message) {
            // Jika terdapat pesan dari server (misalnya email atau password salah), menampilkan modal
            setShowModal(true);
            const closeModal = document.getElementById("closeModal");
            setmodalProp({
              message: "Email atau Password Salah",
              icon: "mx-auto mb-4 h-14 w-14 text-red-600",
            });
            closeModal.addEventListener("click", function () {
              navigate("/");
            });
          } else {
            if (res.data.length > 0) {
              // Jika login berhasil, menyimpan data pengguna ke localStorage dan menampilkan modal
              let username = res.data[0].nama;
              let userData = {
                id: res.data[0].id,
                nama: res.data[0].nama,
                tempat_lahir: res.data[0].tempat_lahir,
                tgl_lahir: res.data[0].tgl_lahir,
                instansi: res.data[0].instansi,
                email: res.data[0].email,
              };
              localStorage.setItem("userData", JSON.stringify(userData));
              setShowModal(true);
              const closeModal = document.getElementById("closeModal");
              setmodalProp({
                message: "Login Success",
                icon: "mx-auto mb-4 h-14 w-14 text-green-500",
              });
              closeModal.addEventListener("click", function () {
                navigate("/dashboard/book", { state: { username } });
              });
            } else {
              // Jika data pengguna tidak ditemukan, menampilkan modal
              setShowModal(true);
              const closeModal = document.getElementById("closeModal");
              setmodalProp({
                message: "Email atau Password Salah",
                icon: "mx-auto mb-4 h-14 w-14 text-red-600",
              });
              closeModal.addEventListener("click", function () {
                navigate("/");
              });
            }
          }
        })
        .catch((err) => {
          // Jika terjadi kesalahan saat melakukan permintaan ke server, menampilkan modal
          console.log(err);
          setShowModal(true);
          const closeModal = document.getElementById("closeModal");
          setmodalProp({
            message: "Email atau Password Salah",
            icon: "mx-auto mb-4 h-14 w-14 text-red-600",
          });
          closeModal.addEventListener("click", function () {
            navigate("/");
          });
        });
    }
  };

  return (
    <div className="flex h-screen w-full bg-blue-800">
      <div className="m-auto w-full flex justify-center">
        <div className="w-full flex justify-center">
          <Modal show={showModal} size="md" popup={true} onClose={closeModal}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <MdOutlineCheckCircleOutline className={modalProp.icon} />
                {errors.email ? (
                  <h3 className="mb-5 text-lg font-normal text-red-600">
                    {errors.email}
                  </h3>
                ) : (
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {modalProp.message}
                  </h3>
                )}
                <div className="flex justify-center gap-4">
                  <Button
                    id="closeModal"
                    color="blue"
                    onClick={() => setShowModal(false)}
                  >
                    Ok
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Card className="w-3/6 px-5 py-3">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Layanan Mandiri Perpustakaan
            </h1>
            <div className="text-center flex justify-center flex-col items-center">
              <IoPersonCircle
                size="8rem"
                className="text-blue-900"
              ></IoPersonCircle>
            </div>

            {backendError ? (
              backendError.map((e) => <p className="text-red-600">{e.msg}</p>)
            ) : (
              <span></span>
            )}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex">
                <div className="w-1/4">
                  <Label htmlFor="email" value="Email" />
                </div>
                <div className="w-3/4">
                  <TextInput
                    type="email"
                    id="email"
                    placeholder="Masukkan Email"
                    name="email"
                    onChange={handleInput}
                    className="w-full"
                  />
                  {errors.email && (
                    <span className="text-red-600 text-xs">
                      {" "}
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/4">
                  <Label htmlFor="password" value="Password" />
                </div>
                <div className="w-3/4">
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Masukkan Password"
                    name="password"
                    onChange={handleInput}
                    className="w-full"
                  />
                  {errors.password && (
                    <span className="text-red-600 text-xs">
                      {" "}
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
              <Button type="submit">Masuk</Button>
              <div className="text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Jika anda tidak memiliki akun silakan
                </span>
                <Link to="/dashboard-signup">
                  <span className="text-sm font-bold"> Daftar</span>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardUserLogin;
