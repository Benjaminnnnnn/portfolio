import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";

const Contact = () => {
  const formRef: React.RefObject<HTMLFormElement> =
    useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: { target: any }) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_v70evdf",
        "template_joqjz2a",
        {
          from_name: form.name,
          to_name: "Benjamin",
          from_email: form.email,
          to_email: "zhuangzheyi12@gmail.com",
          message: form.message,
        },
        "9r5TmQB7Pt3WQ3uLq",
      );

      setLoading(false);
      alert("Thank you! I will get back to you as soon as possible.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl bg-black-100 p-8"
      >
        <p className={`${styles.sectionSubText}`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText}`}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Name</span>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="rounded-none border-none bg-tertiary py-4 px-6 font-medium text-white outline-none placeholder:text-secondary"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Email</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="rounded-none border-none bg-tertiary py-4 px-6 font-medium text-white outline-none placeholder:text-secondary"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Do you have anything to say?"
              className="rounded-lg border-none bg-tertiary py-4 px-6 font-medium text-white outline-none placeholder:text-secondary"
            />
          </label>

          {/* <button
            type="submit"
            className="bg-highlight transition-all duration-300 hover:bg-active py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button> */}
          <button
            type="submit"
            className="w-fit cursor-pointer rounded
             bg-blue-pink-gradient bg-no-repeat px-4 py-1.5 text-center text-[18px]
             text-white shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas></EarthCanvas>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
