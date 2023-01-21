import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Send me your message" />
      </Head>
      <ContactForm />
    </>
  );
};
