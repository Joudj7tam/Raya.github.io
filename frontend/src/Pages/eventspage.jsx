import React from 'react'
import Navbar from '../Components/navbar.jsx'
import SearchBox from '../Components/Searchbox.jsx'
import EventCard from '../Components/eventcard.jsx'
import '../CSS/eventspage.css'


const Events = () => {

    return (
        <div id="events" className='page'>
            <Navbar/>
            <SearchBox />
            <div className='body-event'>
                <div className="events-container">
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                    <EventCard
                        title="غزوة بدر"
                        era="عهد النبي محمد ﷺ"
                    />
                </div>

            </div>
        </div>
    );
}

export default Events;