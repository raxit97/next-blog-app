import { useEffect, useState } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

const ContactForm = () => {

    const [contactFormData, setContactFormData] = useState({
        name: "", email: "", message: ""
    });
    const [requestStatus, setRequestStatus] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setErrorMessage(null);
            }, 3000);
            return () => {
                clearTimeout(timer);
            }
        }
    })

    const onInputChange = (e) => {
        setContactFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const sendMessageHandler = async (e) => {
        try {
            e.preventDefault();
            setRequestStatus("pending");
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(contactFormData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const body = await res.json();
            if (!res.ok) {
                throw new Error(body.message || "Something went wrong!!");
            }
            setRequestStatus("success");
            setContactFormData({
                name: "", email: "", message: ""
            });
        } catch (error) {
            setErrorMessage(error.message);
            setRequestStatus("error");
        }
    };

    let notificationData;
    if (requestStatus === "pending") {
        notificationData = {
            status: requestStatus,
            title: "Sending message...",
            message: "Your message is on its way!!"
        };
    } else if (requestStatus === "success") {
        notificationData = {
            status: requestStatus,
            title: "Success!",
            message: "Message sent successfully!!"
        };
    } else if (requestStatus === "error") {
        notificationData = {
            status: requestStatus,
            title: "Error!",
            message: errorMessage 
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form onSubmit={sendMessageHandler} className={classes.form}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your email</label>
                        <input value={contactFormData.email} onChange={onInputChange}
                            name="email" type="email" id="email" required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your name</label>
                        <input value={contactFormData.name} onChange={onInputChange}
                            name="name" type="text" id="name" required />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your message</label>
                    <textarea value={contactFormData.message} onChange={onInputChange}
                        name="message" id="message" rows='5' required></textarea>
                </div>
                <div className={classes.actions}>
                    <button type="submit">Send Message</button>
                </div>
            </form>
            {notificationData && <Notification {...notificationData} />}
        </section>
    );
}

export default ContactForm;