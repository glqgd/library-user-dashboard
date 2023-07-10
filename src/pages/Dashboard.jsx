import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SectionHeading from "../components/SectionHeading";
import BookDataTable from "../components/BookDataTable";
import axios from "axios";
import AllBookTable from "../components/AllBookTable";

function Dashboard() {
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const [books, setBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);

  // Mengambil daftar buku dari backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/books`);
      setBooks(response.data);
      setBooksData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Mencari buku berdasarkan query pencarian
  const searchBooks = (searchQuery) => {
    setBooks(searchQuery);
  };

  useEffect(() => {
    // Memanggil fungsi fetchBooks saat komponen dimount
    fetchBooks();
  }, []);

  return (
    <div className="mx-5 my-5">
      {/* Judul halaman */}
      <SectionHeading title={"Dashboard Page"}></SectionHeading>

      {/* Menampilkan nama pengguna */}
      <h2 className="text-2xl">Selamat Datang, {userData.nama}</h2>

      <div className=" mx-10 mt-10 mb-5 ">
        <h2 className="text-2xl font-bold">List Buku</h2>
      </div>

      <hr
        style={{
          border: "0.5px solid #e2dddd",
        }}
      />

      <div>
        <div className="mx-5">
          {/* Komponen SearchBar untuk mencari buku */}
          <SearchBar data={booksData} onSearch={searchBooks} />
        </div>

        {/* Tabel untuk menampilkan daftar buku */}
        <AllBookTable books={books} />
      </div>
    </div>
  );
}

export default Dashboard;
