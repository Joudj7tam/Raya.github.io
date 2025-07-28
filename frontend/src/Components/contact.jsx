import React, { useState } from "react";
import "../CSS/contact.css";

function Contact() {
    // Form input states
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");
    const [subject, setSubject] = useState("");
    const [help, setHelp] = useState("");

    // Validation error messages
    const [errors, setErrors] = useState({});

    // Alert message and type ("success" or "error") and visibility flag
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    // Regex patterns for validation
    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^[0-9]{9}$/;
    const namePattern = /^[A-Za-z\u0600-\u06FF\s]+$/; // Arabic and English letters + spaces

    // Clear error alert if it is currently shown
    const clearErrorAlert = () => {
        if (alertType === "error") {
            setShowAlert(false);
            setAlertMessage("");
            setAlertType("");
        }
    };

    // Validate form inputs and return true if valid
    const validate = () => {
        const newErrors = {};

        if (!fname.trim()) {
            newErrors.fname = "الاسم الأول مطلوب";
        } else if (!namePattern.test(fname)) {
            newErrors.fname = "الاسم يجب أن يحتوي على أحرف فقط (عربي أو إنجليزي)";
        }

        if (!lname.trim()) {
            newErrors.lname = "الاسم الأخير مطلوب";
        } else if (!namePattern.test(lname)) {
            newErrors.lname = "الاسم يجب أن يحتوي على أحرف فقط (عربي أو إنجليزي)";
        }

        if (!email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
        else if (!emailPattern.test(email)) newErrors.email = "صيغة البريد الإلكتروني غير صحيحة";

        if (!phone.trim()) newErrors.phone = "رقم الجوال مطلوب";
        else if (!phonePattern.test(phone)) newErrors.phone = "صيغة رقم الجوال غير صحيحة";

        if (!help.trim()) newErrors.help = "يرجى كتابة رسالتك(20 حرف على الأقل)";
        else if (help.length < 20) newErrors.help = "الرسالة قصيرة جدًا";

        // Update errors state
        setErrors(newErrors);

        // Return whether the form is valid
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs before submitting
        if (!validate()) return;

        try {
            // Send form data to backend API
            const response = await fetch('http://localhost:4000/api/contact/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fname, lname, email, phone, category, subject, help })
            });

            const data = await response.json();

            if (data.success) {
                // Show success alert and reset form
                setAlertType("success");
                setAlertMessage("تم استلام ردك بنجاح");
                setShowAlert(true);

                setFname("");
                setLname("");
                setEmail("");
                setPhone("");
                setCategory("");
                setSubject("");
                setHelp("");
                setErrors({});

                // Hide alert after 3 seconds
                setTimeout(() => {
                    setShowAlert(false);
                    setAlertMessage("");
                    setAlertType("");
                }, 3000);
            } else {
                // Show error alert from server response
                setAlertType("error");
                setAlertMessage(`حدث خطأ: ${data.message}`);
                setShowAlert(true);
            }
        } catch (err) {
            // Show network/fetch error alert
            setAlertType("error");
            setAlertMessage("تعذر إرسال النموذج. حاول مرة أخرى لاحقًا.");
            setShowAlert(true);
        }
    };

    // Alert component to display messages
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

                    {/* First and Last Name Inputs */}
                    <div className="row">
                        <div className="input-group">
                            <label>الاسم الأول<span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="ادخل الاسم الأول"
                                required
                                value={fname}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFname(val);
                                    clearErrorAlert();
                                    if (val.trim()) {
                                        setErrors(prev => ({ ...prev, fname: undefined }));
                                    }
                                }}
                            />
                            {errors.fname && <small className="error">{errors.fname}</small>}
                        </div>

                        <div className="input-group">
                            <label>الاسم الأخير<span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="ادخل الاسم الأخير"
                                required
                                value={lname}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setLname(val);
                                    clearErrorAlert();
                                    if (val.trim()) {
                                        setErrors(prev => ({ ...prev, lname: undefined }));
                                    }
                                }}
                            />
                            {errors.lname && <small className="error">{errors.lname}</small>}
                        </div>
                    </div>

                    {/* Email and Phone Inputs */}
                    <div className="row">
                        <div className="input-group">
                            <label>البريد الإلكتروني<span className="required">*</span></label>
                            <input
                                type="email"
                                placeholder="ادخل البريد الإلكتروني"
                                required
                                maxLength="60"
                                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                                value={email}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setEmail(val);
                                    clearErrorAlert();
                                    if (emailPattern.test(val)) {
                                        setErrors(prev => ({ ...prev, email: undefined }));
                                    }
                                }}
                            />
                            {errors.email && <small className="error">{errors.email}</small>}
                        </div>

                        <div className="input-group">
                            <label>رقم الجوال<span className="required">*</span></label>
                            <div className="phone-input">
                                <select defaultValue="+966">
                                    <option value="+966">+966</option>
                                </select>
                                <input
                                    type="tel"
                                    placeholder="00 000 0000"
                                    required
                                    minLength="9"
                                    maxLength="9"
                                    pattern="[0-9]{9}"
                                    value={phone}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setPhone(val);
                                        clearErrorAlert();
                                        if (phonePattern.test(val)) {
                                            setErrors(prev => ({ ...prev, phone: undefined }));
                                        }
                                    }}
                                />
                            </div>
                            {errors.phone && <small className="error">{errors.phone}</small>}
                        </div>
                    </div>

                    {/* Category and Subject Inputs */}
                    <div className="row">
                        <div className="input-group">
                            <label>الفئة</label>
                            <select value={category} onChange={(e) => {
                                setCategory(e.target.value);
                                clearErrorAlert();
                            }}>
                                <option value="">اختر</option>
                                <option value="اقتراحات">اقتراحات</option>
                                <option value="استفسارات">استفسارات</option>
                                <option value="بلاغات">بلاغات</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>عنوان الموضوع</label>
                            <input
                                type="text"
                                placeholder="اكتب موضوعك"
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                    clearErrorAlert();
                                }}
                            />
                        </div>
                    </div>

                    {/* Help / Message Textarea */}
                    <div className="input-group full-width">
                        <label>كيف يمكننا المساعدة؟</label>
                        <textarea
                            placeholder="نحن هنا لخدمتك"
                            required
                            minLength="20"
                            value={help}
                            onChange={(e) => {
                                const val = e.target.value;
                                setHelp(val);
                                clearErrorAlert();
                                if (val.length >= 20) {
                                    setErrors(prev => ({ ...prev, help: undefined }));
                                }
                            }}
                        ></textarea>
                        {errors.help && <small className="error">{errors.help}</small>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">إرسال</button>
                </form>

                {/* Alert message component */}
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
