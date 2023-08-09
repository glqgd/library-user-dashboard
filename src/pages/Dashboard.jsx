import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SectionHeading from "../components/SectionHeading";
import axios from "axios";
import AllBookTable from "../components/AllBookTable";

function Dashboard() {
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const [books, setBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // New state for filtered data
  const [currentPage, setCurrentPage] = useState(1);

  // Mengambil daftar buku dari backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://server.libraryselfservice.site/books`
      );

      const sortedBooks = response.data.sort((a, b) => b.no_buku - a.no_buku);
      setBooks(sortedBooks);
      setBooksData(sortedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Mencari buku berdasarkan query pencarian
  const searchBooks = (searchQuery) => {
    setFilteredBooks(searchQuery); // Update the filteredBooks state with the search results
    setCurrentPage(1); // Reset the currentPage when performing a search
  };

  useEffect(() => {
    // Memanggil fungsi fetchBooks saat komponen dimount
    fetchBooks();
    if (!localStorage.getItem("firstRender")) {
      localStorage.setItem("firstRender", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="mx-5 my-5">
      {/* Judul halaman */}
      <SectionHeading title={"Dashboard"}></SectionHeading>

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
        <div>
          <AllBookTable
            books={filteredBooks.length > 0 ? filteredBooks : books}
            currentPage={currentPage} // Pass the currentPage state to AllBookTable
            setCurrentPage={setCurrentPage} // Pass the setCurrentPage function to AllBookTable
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
