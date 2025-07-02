import React from 'react'
import Navbar from '../Components/navbar.jsx'
import SearchBox from '../Components/Searchbox.jsx'
import '../CSS/eventspage.css'

const Events = () => {

    //  تستبدل لاحقًا بالبيانات الحقيقية
    const dummyEvents = Array(9).fill({
        title: "غزوة بدر",
        era: "ﷺ عهد النبي محمد",
    });
    
    return (
        <div>
            <Navbar />
            <SearchBox />
            <div className="events-container">
                {dummyEvents.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        era={event.era}
                    />
                ))}
            </div>
        </div>
    );
}

export default Events;