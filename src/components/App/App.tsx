import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteForm from "../NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import { Loader } from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes(debouncedQuery, page),
    placeholderData: keepPreviousData,
    enabled: !!debouncedQuery,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const totalPages = data?.total_pages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            toggleModal();
          }}
        >
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <NoteForm onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
}
