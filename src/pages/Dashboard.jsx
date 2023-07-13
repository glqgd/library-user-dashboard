import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SectionHeading from "../components/SectionHeading";
import BookDataTable from "../components/BookDataTable";
import axios from "axios";
import AllBookTable from "../components/AllBookTable";
import { Table, Pagination } from "flowbite-react";
import DetailButton from "../components/DetailButton";

function Dashboard() {
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const [books, setBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const totalPages = Math.ceil(books.length / perPage);

  // Mengambil daftar buku dari backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://server.libraryselfservice.site/books`
      );
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
    <div className="mx-5 my-5 h-fit">
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
        <div>
          <div className="mx-5 my-5">
            <Table hoverable={true} className="table-fixed">
              <Table.Head>
                <Table.HeadCell colSpan={2}>Judul</Table.HeadCell>
                <Table.HeadCell>Pengarang</Table.HeadCell>
                <Table.HeadCell>Penerbit</Table.HeadCell>
                <Table.HeadCell>Tahun Terbit</Table.HeadCell>
                <Table.HeadCell>Kode Barcode</Table.HeadCell>
                <Table.HeadCell>Kode Rak</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {books
                  .slice((currentPage - 1) * perPage, currentPage * perPage)
                  .map((book, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell
                        className="font-medium text-gray-900 dark:text-white"
                        colSpan={2}
                      >
                        {book.judul}
                      </Table.Cell>
                      <Table.Cell>{book.pengarang}</Table.Cell>
                      <Table.Cell>{book.penerbit}</Table.Cell>
                      <Table.Cell>{book.tahun_terbit}</Table.Cell>
                      <Table.Cell>
                        {book.kode_barcode}
                        {/* <Barcode value={book.kode_barcode} /> */}
                      </Table.Cell>
                      <Table.Cell>{book.kode_rak}</Table.Cell>
                      <Table.Cell>
                        {console.log(book.tersedia)}
                        {book.tersedia === 1 ? "tersedia" : "tidak tersedia"}
                      </Table.Cell>
                      <Table.Cell className="grid grid-cols-1 gap-1">
                        <DetailButton book={book}>Remove</DetailButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>

            <div className="flex justify-center my-5">
              <Pagination
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
                showIcons
                totalPages={totalPages}
              >
                {(page) => (
                  <Pagination.Button
                    active={page === currentPage}
                    style={{
                      backgroundColor: page === currentPage ? "blue" : "white",
                      color: page === currentPage ? "white" : "blue",
                      fontWeight: page === currentPage ? "bold" : "normal",
                      border: page === currentPage ? "none" : "1px solid blue",
                    }}
                  >
                    {page}
                  </Pagination.Button>
                )}
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
