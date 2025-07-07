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

const details = () => {
    return (
        <div className='body'>
            <div className='page-content-container'>
                <DetailsBox dir="rtl" lang="ar"
                    icon={sword_icon}
                    title="نوع الغزوة"
                    text="هجومية"
                />
                <DetailsBox dir="rtl" lang="ar"
                    icon={calender_icon}
                    title="التاريخ"
                    text="2هـ 17 رمضان "
                />
                <DetailsBox dir="rtl" lang="ar"
                    icon={muslim_icon}
                    title="قائد السلمين"
                    text="النبي محمد ﷺ"
                />
                <DetailsBox dir="rtl" lang="ar"
                    icon={army_icon}
                    title="عدد المسلمين"
                    text="نحو 313"
                />
                <DetailsBox dir="rtl" lang="ar"
                    icon={enemy_icon}
                    title="قائد المشركين"
                    text="أبو جهل بن هشام"
                />
                <DetailsBox dir="rtl" lang="ar"
                    icon={army_icon}
                    title="عدد المشركين"
                    text="من 900 إلى 1000"
                />


            </div>

            <DetailsBox dir="rtl" lang="ar"
                icon={question_icon}
                title="أسبابها"
                text=" بدأت المعركة بمحاولة المسلمين القضاء على الخطر المحدق المتمثل باعتراضَ عيرٍ لقريشٍ متوجهةٍ من الشام إلى مكة يقودها أبو سفيان بن حرب، ولكن أبا سفيان تمكن من الفرار بالقافلة، وأرسل رسولاً إلى قريش في مكة يطلب عونهم ونجدتهم. "
            />
            <DetailsBox dir="rtl" lang="ar"
                icon={mountain_icon}
                title="آثارها"
                text=" بداية مرحلة جديدة في تاريخ الإسلام, زيادة العداوة بين المسلمين و قريش, أصبح للمسلمين مصدرٌ جديدٌ للدخل وهو غنائم المعارك، وبذلك تحسّن حالُ المسلمين الماديّ والاقتصاديّ والمعنويّ."
            />

             <DetailsBox className="result" dir="rtl" lang="ar"
                icon={flag_icon}
                title="النتيجة"
                text="انتصار المسلمين"
            />
            
        </div>
    );
}

export default details;
