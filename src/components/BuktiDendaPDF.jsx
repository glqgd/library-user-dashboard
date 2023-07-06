import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 12,
    fontSize: 10,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    color: "grey",
  },
  tableContainer: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
    alignItems: "center",
    height: 24,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableCell: {
    flex: 3,
    textAlign: "center",
    fontSize: 10,
    marginHorizontal: 5,
  },
  noColumn: {
    flex: 1,
  },
});

function BuktiDendaPDF(props) {
  const waktuPeminjaman = props.waktuPeminjaman;
  const waktuPengembalian = props.waktuPengembalian;
  const jumlahHariTerlambat = props.jumlahHariTerlambat;
  const denda = props.denda;
  const bukuHilang = props.bukuHilang;

  return (
    <Document>
      <Page style={styles.body} size={"A4"} orientation="landscape">
        <Text style={styles.title} fixed>
          Detail Denda
        </Text>
        <Text style={styles.subTitle} fixed>
          Waktu Peminjaman
        </Text>
        <Text style={styles.text} fixed>
          {waktuPeminjaman} sampai {waktuPengembalian}
        </Text>
        <Text style={styles.subTitle} fixed>
          Akumulasi Denda
        </Text>
        <Text style={styles.text} fixed>
          {`${jumlahHariTerlambat} hari x 10.0000 = ${denda}`}
        </Text>
        <Text style={styles.subTitle} fixed>
          Keterangan Buku yang Hilang
        </Text>
        <View style={styles.tableContainer}>
          <View style={styles.section}>
            <View style={styles.table}>
              {/* Table header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={[styles.tableCell, styles.noColumn]}>
                  <Text>No.</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Pengarang</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Judul</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Penerbit</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Tahun Terbit</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Kode Buku</Text>
                </View>
              </View>

              {/* Table rows */}
              {bukuHilang.map((buku, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.noColumn]}>
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{buku.pengarang}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{buku.judul}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{buku.penerbit}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{buku.tahun_terbit}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{buku.kode_barcode}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default BuktiDendaPDF;
