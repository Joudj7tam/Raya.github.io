import React from "react";
import "../CSS/contact.css";

function Contact() {
    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <h2 className="contact-title">تواصل معنا</h2>
                <form className="contact-form">
                    <div className="row">
                        <div className="input-group">
                            <label>الاسم الأول<span className="required">*</span></label>
                            <input type="text" placeholder="ادخل الاسم الأول" required />
                        </div>
                        <div className="input-group">
                            <label>الاسم الأخير<span className="required">*</span></label>
                            <input type="text" placeholder="ادخل الاسم الأخير" required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>البريد الإلكتروني<span className="required">*</span></label>
                            <input type="email" placeholder="ادخل البريد الإلكتروني" required />
                        </div>
                        <div className="input-group">
                            <label>رقم الجوال<span className="required">*</span></label>
                            <div className="phone-input">
                                <select defaultValue="+966">
                                    <option value="+966">+966</option>
                                </select>
                                <input type="tel" placeholder="00 000 0000" required />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>الفئة</label>
                            <select>
                                <option value="">اختر</option>
                                <option value="اقتراحات">اقتراحات</option>
                                <option value="استفسارات">استفسارات</option>
                                <option value="بلاغات">بلاغات</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>عنوان الموضوع</label>
                            <input type="text" placeholder="اكتب موضوعك" />
                        </div>
                    </div>

                    <div className="input-group full-width">
                        <label>كيف يمكننا المساعدة؟</label>
                        <textarea placeholder="نحن هنا لخدمتك"></textarea>
                    </div>

                    <button type="submit" className="submit-button">إرسال</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
