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

  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const fetchEvents = async () => {
    setLoading(true);
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
        // number of pages
        const total = data.total || data.data.length;
        setTotalPages(Math.ceil(total / limit));
      } else {
        console.error("Error loading events:", data.message);
        setEvents([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setEvents([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchValue(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  useEffect(() => {
    fetchEvents();
  }, [searchValue, selectedEra, selectedType, selectedResult, sortOrder, page]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedEra, selectedType, selectedResult, sortOrder]);

  const handleReset = () => {
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
        setSelectedEra={setSelectedEra}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedResult={selectedResult}
        setSelectedResult={setSelectedResult}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleReset={handleReset}
      />

      <div className='body-event'>
        <div className="events-container">
          {loading ? (
            <div className="loader"></div>
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.name}
                era={`عهد ${event.era}`}
              />
            ))
          ) : (
            <div className="no-results">لا توجد نتائج</div>
          )}
        </div>


        <div className="pagination-controls">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            ⏮ الأولى
          </button>

          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            السابق
          </button>

          <span>صفحة {page} من {totalPages}</span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            التالي
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            الأخيرة ⏭
          </button>
        </div>

      </div>

      <Chatbot />
    </div>
  );
};

export default Events;
