import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar.jsx';
import SearchBox from '../Components/searchbox.jsx';
import EventCard from '../Components/eventcard.jsx';
import '../CSS/eventspage.css';
import Chatbot from "../Components/chatbot";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedResult, setSelectedResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const fetchEvents = async () => {
    setLoading(true);
    setShowResults(false);

    try {
      const params = new URLSearchParams();
      if (searchValue) params.append('search', searchValue);
      if (selectedEra) params.append('era', selectedEra);
      if (selectedType) params.append('type', selectedType);
      if (selectedResult) params.append('result', selectedResult);
      params.append('sortOrder', sortOrder);
      params.append('page', page);
      params.append('limit', limit);

      const response = await fetch(`http://localhost:4000/api/gazwa/all?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
        const total = data.total || data.data.length;
        setTotalResults(total);
        setTotalPages(Math.ceil(total / limit));
      } else {
        setEvents([]);
        setTotalPages(1);
        console.error("Error loading events:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setEvents([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
      setShowResults(true);
    }
  };

  // Debounce user input to avoid excessive fetches
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchInput !== searchValue) {
        setSearchValue(searchInput);
        setPage(1); // Reset page when search changes
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [searchInput]);

  // Re-fetch events when filters or pagination change
  useEffect(() => {
    fetchEvents();
  }, [page, searchValue, selectedEra, selectedType, selectedResult, sortOrder]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const resetAndFetch = (setter, value) => {
    setPage(1);
    setter(value);
  };

  const handleReset = () => {
    const isFiltered =
      searchInput ||
      searchValue ||
      selectedEra ||
      selectedType ||
      selectedResult ||
      sortOrder !== 'asc';

    if (!isFiltered) return;

    setSearchInput('');
    setSearchValue('');
    setSelectedEra('');
    setSelectedType('');
    setSelectedResult('');
    setSortOrder('asc');
    setPage(1);
  };

  return (
    <div id="events" className='page'>
      <Navbar />
      <SearchBox
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedEra={selectedEra}
        setSelectedEra={(val) => resetAndFetch(setSelectedEra, val)}
        selectedType={selectedType}
        setSelectedType={(val) => resetAndFetch(setSelectedType, val)}
        selectedResult={selectedResult}
        setSelectedResult={(val) => resetAndFetch(setSelectedResult, val)}
        sortOrder={sortOrder}
        setSortOrder={(val) => resetAndFetch(setSortOrder, val)}
        handleReset={handleReset}
      />

      <div className='body-event'>
        <div className="results-count">
          عدد النتائج: {totalResults}
        </div>

        <div className="events-container">
          {loading ? (
            <div className="loader"></div>
          ) : showResults && events.length === 0 ? (
            <div className="no-results">لا توجد نتائج</div>
          ) : (
            events.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.name}
                era={`عهد ${event.era}`}
              />
            ))
          )}
        </div>

        <div className="pagination-controls">
          <button onClick={() => setPage(1)} disabled={page === 1}>⏮ الأولى</button>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>السابق</button>
          <span>صفحة {page} من {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>التالي</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>الأخيرة ⏭</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
