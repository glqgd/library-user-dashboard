import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  number: {
    margin: 12,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    margin: 12,
    fontSize: 10,
    textAlign: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

function BuktiPeminjamanPDF(props) {
  const idTransaksi = props.idTransaksi;
  const waktuPeminjaman = props.waktuPeminjaman;
  const deadlinePengembalian = props.deadlinePengembalian;
  console.log(idTransaksi);

  const page = { text: idTransaksi };
  return (
    <Document>
      <Page style={styles.body} size={"A7"} orientation="landscape">
        <Text style={styles.header} fixed>
          Bukti Peminjaman Buku
        </Text>
        <Text style={styles.number} fixed>
          {page.text}
        </Text>
        <Text style={styles.text} fixed>
          {waktuPeminjaman} sampai {deadlinePengembalian}
        </Text>
      </Page>
    </Document>
  );
}

export default BuktiPeminjamanPDF;
