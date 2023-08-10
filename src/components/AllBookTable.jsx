import { Table, Pagination, Badge } from "flowbite-react";
import React, { useState } from "react";
import DetailButton from "./DetailButton";

function AllBookTable({ books, currentPage, setCurrentPage }) {
  const [perPage] = useState(10);

  const totalPages = Math.ceil(books.length / perPage);

  return (
    <div>
      <div className="mx-5 my-5">
        <Table hoverable={true} className="table-fixed">
          <Table.Head>
            <Table.HeadCell colSpan={2}>Judul</Table.HeadCell>
            <Table.HeadCell>Pengarang</Table.HeadCell>
            <Table.HeadCell>Penerbit</Table.HeadCell>
            <Table.HeadCell>Tahun Terbit</Table.HeadCell>
            <Table.HeadCell>Kode Rak</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell className="text-center">Action</Table.HeadCell>
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

                  <Table.Cell>{book.kode_rak}</Table.Cell>
                  <Table.Cell>
                    {book.tersedia === 1 ? (
                      <div className="w-fit">
                        <Badge
                          color={"success"}
                          size={"sm"}
                          className="text-center"
                        >
                          Tersedia
                        </Badge>
                      </div>
                    ) : (
                      <Badge
                        color={"failure"}
                        size={"sm"}
                        className="text-center"
                      >
                        Tidak Tersedia
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell className="grid grid-cols-1 gap-1">
                    <DetailButton book={book}></DetailButton>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>

        <div className="flex justify-center my-5">
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page); // Update the currentPage state
            }}
            showIcons
            totalPages={totalPages}
          >
            {(page) => (
              <Pagination.Button
                key={page}
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
  );
}

export default AllBookTable;
