import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar.jsx'
import SearchBox from '../Components/Searchbox.jsx'
import EventCard from '../Components/eventcard.jsx'
import '../CSS/eventspage.css'


const Events = () => {
    const [events, setEvents] = useState([]);
    const [searchValue, setSearchValue] = useState('');      // القيمة المفلترة الفعلية
    const [searchInput, setSearchInput] = useState('');      // القيمة المؤقتة من المستخدم
    const [sortOrder, setSortOrder] = useState('asc');       // for sorting
    const [selectedEra, setSelectedEra] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedResult, setSelectedResult] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/gazwa/all');
                const data = await response.json();
                if (data.success) {
                    setEvents(data.data); // نضع الغزوات في الستيت
                } else {
                    console.error("Error loading events:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchEvents();
    }, []);

    // فلترة الأحداث حسب الاسم إذا تم إدخال قيمة ويرتبهم حسب الترتيب اللي اختاره
    const filteredEvents = events
        .filter(event =>
            event.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter(event =>
            selectedEra ? event.era === selectedEra : true
        )
        .filter(event =>
            selectedType ? event.type === selectedType : true
        )
        .filter(event =>
            selectedResult ? event.result === selectedResult : true
        )
        .sort((a, b) => {
            const yearA = a.year || 0;
            const yearB = b.year || 0;
            return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
        });

    //search only when click Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchValue(searchInput); // فقط عند الضغط على Enter يتم البحث
        }
    };

    const handleReset = () => {
        setSearchInput('');
        setSearchValue('');
        setSelectedEra('');
        setSelectedType('');
        setSelectedResult('');
    };

    return (
        <div id="events" className='page'>
            <Navbar />
            <SearchBox
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleKeyDown={handleKeyDown}
                handleReset={handleReset}
                selectedEra={selectedEra}
                setSelectedEra={setSelectedEra}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
            />

            <div className='body-event'>
                <div className="events-container">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
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

            </div>
        </div>
    );
}

export default Events;