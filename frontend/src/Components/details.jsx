import React from 'react';
import DetailsBox from './detailbox.jsx';
import sword_icon from '../assets/swords.png';
import army_icon from '../assets/army.png';
import calender_icon from '../assets/calendar.png';
import enemy_icon from '../assets/enemy.png';
import flag_icon from '../assets/flag.png';
import muslim_icon from '../assets/muslim.png';
import question_icon from '../assets/question.png';
import mountain_icon from '../assets/mountain.png';
import '../CSS/details.css';

const details = ({ gazwa }) => {
    return (
        <div className='body'>
            <div className='page-content-container'>
                {/* Event type */}
                <DetailsBox dir="rtl" lang="ar" icon={sword_icon} title="نوع الحدث" text={gazwa.type} />

                {/* Year of event */}
                <DetailsBox dir="rtl" lang="ar" icon={calender_icon} title="التاريخ" text={`${gazwa.year} هـ`} />

                {/* Leader of Muslims */}
                <DetailsBox dir="rtl" lang="ar" icon={muslim_icon} title="قائد السلمين" text={gazwa.leader_of_muslims} />

                {/* Number of Muslims */}
                <DetailsBox dir="rtl" lang="ar" icon={army_icon} title="عدد المسلمين" text={gazwa.number_of_muslims} />

                {/* Enemy leader */}
                <DetailsBox dir="rtl" lang="ar" icon={enemy_icon} title="قائد الأعداء" text={gazwa.leader_of_enemy} />

                {/* Number of enemies */}
                <DetailsBox dir="rtl" lang="ar" icon={army_icon} title="عدد الأعداء" text={gazwa.number_of_enemy} />
            </div>

            {/* Causes of the event */}
            <DetailsBox dir="rtl" lang="ar" icon={question_icon} title="أسبابها" text={gazwa.cause} />

            {/* Effects of the event */}
            <DetailsBox dir="rtl" lang="ar" icon={mountain_icon} title="آثارها" text={gazwa.effect} />

            {/* Result of the event */}
            <DetailsBox className="result" dir="rtl" lang="ar" icon={flag_icon} title="النتيجة" text={gazwa.result} />
        </div>
    );
}

export default details;
