import React, { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import axios from "axios";
import TransactionDataTable from "../components/TransactionDataTable";

function RiwayatPengembalian() {
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const [transaction, setTransaction] = useState([]); // State untuk menyimpan data transaksi

  // Fungsi untuk mengambil data transaksi dari server menggunakan API
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://server.libraryselfservice.site/transaction`
      );
      const sortedBooks = response.data.sort(
        (a, b) => b.id_transaksi - a.id_transaksi
      );

      setTransaction(sortedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="mx-5 my-5">
      <SectionHeading title={"Riwayat Pengembalian"}></SectionHeading>
      <h2 className="text-2xl">Selamat Datang, {userData.nama}</h2>
      <div className=" mx-10 mt-10 mb-5 ">
        <h2 className="text-2xl font-bold">List Transaksi</h2>
      </div>
      <hr
        style={{
          border: "0.5px solid #e2dddd",
        }}
      />
      <div>
        <TransactionDataTable
          transactions={transaction}
          tipeData={"pengembalian"}
        />
      </div>
    </div>
  );
}

export default RiwayatPengembalian;
