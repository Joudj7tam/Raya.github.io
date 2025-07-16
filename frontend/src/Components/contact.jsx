import React, { useState } from "react";
import "../CSS/contact.css";

function Contact() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");
    const [subject, setSubject] = useState("");
    const [help, setHelp] = useState("");

    const [errors, setErrors] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); // "success" or "error"
    const [showAlert, setShowAlert] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!fname.trim()) newErrors.fname = "الاسم الأول مطلوب";
        if (!lname.trim()) newErrors.lname = "الاسم الأخير مطلوب";

        const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,6}$/;
        if (!email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
        else if (!emailPattern.test(email)) newErrors.email = "صيغة البريد الإلكتروني غير صحيحة";

        const phonePattern = /^[0-9]{9}$/;
        if (!phone.trim()) newErrors.phone = "رقم الجوال مطلوب";
        else if (!phonePattern.test(phone)) newErrors.phone = "صيغة رقم الجوال غير صحيحة";

        if (!help.trim()) newErrors.help = "يرجى كتابة رسالتك(20 حرف على الأقل)";
        else if (help.length < 20) newErrors.help = "الرسالة قصيرة جدًا";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:4000/api/contact/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fname, lname, email, phone, category, subject, help })
            });

            const data = await response.json();

            if (data.success) {
                setAlertType("success");
                setAlertMessage("تم استلام ردك بنجاح");
                setShowAlert(true);
                setFname(""); setLname(""); setEmail(""); setPhone(""); setCategory(""); setSubject(""); setHelp("");
            } else {
                setAlertType("error");
                setAlertMessage(`حدث خطأ: ${data.message}`);
                setShowAlert(true);
            }
        } catch (err) {
            setAlertType("error");
            setAlertMessage("تعذر إرسال النموذج. حاول مرة أخرى لاحقًا.");
            setShowAlert(true);
        }
    };

    function Alert({ type, message, onClose }) {
        return (
            <div className={`custom-alert ${type}`}>
                <span>{message}</span>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
        );
    }

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <h2 className="contact-title">تواصل معنا</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-group">
                            <label>الاسم الأول<span className="required">*</span></label>
                            <input type="text" placeholder="ادخل الاسم الأول" required
                                value={fname}
                                onChange={(e) => setFname(e.target.value)} />
                            {errors.fname && <small className="error">{errors.fname}</small>}
                        </div>
                        <div className="input-group">
                            <label>الاسم الأخير<span className="required">*</span></label>
                            <input type="text" placeholder="ادخل الاسم الأخير" required
                                value={lname}
                                onChange={(e) => setLname(e.target.value)} />
                            {errors.lname && <small className="error">{errors.lname}</small>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>البريد الإلكتروني<span className="required">*</span></label>
                            <input type="email" placeholder="ادخل البريد الإلكتروني" required maxLength="60"
                                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <small className="error">{errors.email}</small>}
                        </div>
                        <div className="input-group">
                            <label>رقم الجوال<span className="required">*</span></label>
                            <div className="phone-input">
                                <select defaultValue="+966">
                                    <option value="+966">+966</option>
                                </select>
                                <input type="tel" placeholder="00 000 0000" required minLength="9" maxLength="9"
                                    pattern="[0-9]{9}"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            {errors.phone && <small className="error">{errors.phone}</small>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>الفئة</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">اختر</option>
                                <option value="اقتراحات">اقتراحات</option>
                                <option value="استفسارات">استفسارات</option>
                                <option value="بلاغات">بلاغات</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>عنوان الموضوع</label>
                            <input type="text" placeholder="اكتب موضوعك"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group full-width">
                        <label>كيف يمكننا المساعدة؟</label>
                        <textarea placeholder="نحن هنا لخدمتك" required minLength="20"
                            value={help}
                            onChange={(e) => setHelp(e.target.value)}></textarea>
                        {errors.help && <small className="error">{errors.help}</small>}
                    </div>

                    <button type="submit" className="submit-button">إرسال</button>
                </form>

                {showAlert && (
                    <Alert
                        type={alertType}
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
                )}
            </div>
        </section>
    );
}

export default Contact;
