import React, { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import axios from "axios";
import TransactionDataTable from "../components/TransactionDataTable";
import BookDataTable from "../components/BookDataTable";

function RiwayatDenda() {
  const storedData = localStorage.getItem("userData");
  const userData = JSON.parse(storedData);
  const [transaction, setTransaction] = useState([]); // State untuk menyimpan data transaksi

  // const [books, setBooks] = useState([]); // State untuk menyimpan data buku
  // const [booksData, setBooksData] = useState([]); // State untuk menyimpan data buku dengan rincian lengkap

  // Fungsi untuk mengambil data buku dari server menggunakan API
  // const fetchBooks = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://server.libraryselfservice.site/transaction"
  //     );
  //     const transactions = response.data;

  //     const filteredData = transactions.filter((item) => {
  //       const tenggatKembaliDate = new Date(item.tenggat_kembali);
  //       const today = new Date();
  //       return tenggatKembaliDate <= today && item.status === "Dipinjam";
  //     });

  //     const transaksiDendaResponse = await axios.get(
  //       "https://server.libraryselfservice.site/buku-dipinjam"
  //     );
  //     const transaksiDenda = transaksiDendaResponse.data.filter((item) => {
  //       return item.hilang === 1;
  //     });

  //     const combinedData = [
  //       ...new Set([
  //         ...filteredData.map((transaction) => transaction.id_transaksi),
  //         ...transaksiDenda.map((transaksi) => transaksi.id_transaksi),
  //       ]),
  //     ];

  //     const combinedDataResponse = [];

  //     for (const transactionID of combinedData) {
  //       const fetchResponse = await axios.get(
  //         `https://server.libraryselfservice.site/fetch-transaction/${transactionID}`
  //       );
  //       const fetchedData = fetchResponse.data;

  //       combinedDataResponse.push(fetchedData);
  //     }

  //     const userIds = combinedDataResponse.map(
  //       (transaction) => transaction.id_user
  //     );
  //     const usersResponse = await axios.get(
  //       `https://server.libraryselfservice.site/users?userIds=${userIds.join(
  //         ","
  //       )}`
  //     );
  //     const usersMap = usersResponse.data.reduce((map, user) => {
  //       map[user.id] = user.nama;
  //       return map;
  //     }, {});

  //     const transactionData = combinedDataResponse.map((transaction) => ({
  //       ...transaction,
  //       peminjam: usersMap[transaction.id_user],
  //     }));

  //     const separatedKodeBarcodeArray = [
  //       ...new Set(
  //         transactionData
  //           .map((transaction) => transaction.kode_barcode)
  //           .flatMap((kodeBarcode) => kodeBarcode.split(","))
  //       ),
  //     ];

  //     const dataBuku = [];

  //     for (const buku of separatedKodeBarcodeArray) {
  //       const bukuResponse = await axios.get(
  //         `https://server.libraryselfservice.site/data-buku/${buku}`
  //       );
  //       const bukuData = bukuResponse.data;

  //       dataBuku.push(bukuData);
  //     }

  //     const userIdBook = dataBuku.map((buku) => parseInt(buku[0].peminjam));
  //     const usersRes = await axios.get(
  //       `https://server.libraryselfservice.site/users?userIds=${userIdBook.join(
  //         ","
  //       )}`
  //     );
  //     const usersMaps = usersRes.data.reduce((map, user) => {
  //       map[user.id] = { id: user.id, nama: user.nama }; // Include both id and nama
  //       return map;
  //     }, {});

  //     const BukuData = dataBuku.map((buku) => ({
  //       ...buku,
  //       peminjam: usersMaps[buku[0].peminjam],
  //     }));

  //     console.log(BukuData);
  //     setBooks(BukuData);
  //     setBooksData(BukuData);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  // };

  // Fungsi untuk mengambil data transaksi dari server menggunakan API
  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        "https://server.libraryselfservice.site/transaction"
      );
      const transactions = response.data;

      const filteredData = transactions.filter((item) => {
        const tenggatKembaliDate = new Date(item.tenggat_kembali);
        const today = new Date();
        return tenggatKembaliDate <= today && item.status === "Dipinjam";
      });

      const transaksiDendaResponse = await axios.get(
        "https://server.libraryselfservice.site/buku-dipinjam"
      );
      const transaksiDenda = transaksiDendaResponse.data.filter((item) => {
        return item.hilang === 1;
      });

      const combinedData = [
        ...new Set([
          ...filteredData.map((transaction) => transaction.id_transaksi),
          ...transaksiDenda.map((transaksi) => transaksi.id_transaksi),
        ]),
      ];

      const combinedDataResponse = [];

      for (const transactionID of combinedData) {
        const fetchResponse = await axios.get(
          `https://server.libraryselfservice.site/fetch-transaction/${transactionID}`
        );
        const fetchedData = fetchResponse.data;
        combinedDataResponse.push(fetchedData);
      }

      const userIds = combinedDataResponse.map(
        (transaction) => transaction.id_user
      );
      const usersResponse = await axios.get(
        `https://server.libraryselfservice.site/users?userIds=${userIds.join(
          ","
        )}`
      );
      const usersMap = usersResponse.data.reduce((map, user) => {
        map[user.id] = {
          nama: user.nama,
          email: user.email, // Include the email field
        };
        return map;
      }, {});

      const transactionData = combinedDataResponse.map((transaction) => ({
        ...transaction,
        peminjam: usersMap[transaction.id_user],
      }));

      const separatedKodeBarcodeArray = [
        ...new Set(
          transactionData
            .map((transaction) => transaction.kode_barcode)
            .flatMap((kodeBarcode) => kodeBarcode.split(","))
        ),
      ];

      const dataBuku = [];

      for (const buku of separatedKodeBarcodeArray) {
        const bukuResponse = await axios.get(
          `https://server.libraryselfservice.site/data-buku/${buku}`
        );
        const bukuData = bukuResponse.data;

        dataBuku.push(bukuData);
      }

      const filteredTransactionData = transactionData.filter((item) => {
        return item.status === "Dipinjam";
      });
      setTransaction(filteredTransactionData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchTransaction();
    // fetchBooks();
    // console.log(books);
  }, []);

  return (
    <div className="mx-5 my-5">
      <SectionHeading title={"Riwayat Denda"}></SectionHeading>
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
        <TransactionDataTable transactions={transaction} tipeData={"denda"} />
      </div>

      {/* <div className=" mx-10 mt-10 mb-5 ">
        <h2 className="text-2xl font-bold">List Buku</h2>
      </div>
      <hr
        style={{
          border: "0.5px solid #e2dddd",
        }}
      /> */}
      {/* <div>
        <BookDataTable books={booksData} />
      </div> */}
    </div>
  );
}

export default RiwayatDenda;
