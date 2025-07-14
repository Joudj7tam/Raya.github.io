import React, { useState } from "react";
import "../CSS/contact.css";

function Contact() {
    const[fname,setFname] = useState()
    const[lname,setLname] = useState()
    const[email,setEmail] = useState()
    const[phone,setPhone] = useState()
    const[category,setCategory] = useState()
    const[subject,setSubject] = useState()
    const[help,setHelp] = useState()

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:4000/api/contact/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fname, lname, email, phone, category, subject, help })
});

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
};

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <h2 className="contact-title">تواصل معنا</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-group">
                            <label>الاسم الأول<span className="required">*</span></label>
                            <input type="text" placeholder="ادخل الاسم الأول" required onChange={(e) => setFname(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            <label>الاسم الأخير<span className="required">*</span></label>
                            <input type="text" placeholder="ادخل الاسم الأخير" required onChange={(e) => setLname(e.target.value)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>البريد الإلكتروني<span className="required">*</span></label>
                            <input type="email" placeholder="ادخل البريد الإلكتروني" required onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            <label>رقم الجوال<span className="required">*</span></label>
                            <div className="phone-input">
                                <select defaultValue="+966">
                                    <option value="+966">+966</option>
                                </select>
                                <input type="tel" placeholder="00 000 0000" required onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>الفئة</label>
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">اختر</option>
                                <option value="اقتراحات">اقتراحات</option>
                                <option value="استفسارات">استفسارات</option>
                                <option value="بلاغات">بلاغات</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>عنوان الموضوع</label>
                            <input type="text" placeholder="اكتب موضوعك" onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                    </div>

                    <div className="input-group full-width">
                        <label>كيف يمكننا المساعدة؟</label>
                        <textarea placeholder="نحن هنا لخدمتك" onChange={(e) => setHelp(e.target.value)}></textarea>
                    </div>

                    <button type="submit" className="submit-button">إرسال</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;