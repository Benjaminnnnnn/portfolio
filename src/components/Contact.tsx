import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";

const Contact = () => {
  const { t } = useTranslation();
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
          to_email: "benjaminzhuangjobs@outlook.com",
          message: form.message,
        },
        "9r5TmQB7Pt3WQ3uLq",
      );

      setLoading(false);
      alert(t("contact.alerts.success"));
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(t("contact.alerts.error"));
    }
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl border border-border/70 bg-tertiary/80 p-8 shadow-card backdrop-blur"
      >
        <p className={`${styles.sectionSubText}`}>{t("contact.eyebrow")}</p>
        <h2 className={`${styles.sectionHeadText}`} id="contact-heading">
          {t("contact.title")}
        </h2>
        {/* <p className="mt-4 text-[16px] leading-[28px] text-secondary">
          Share a challenge, an idea, or a roadmap. I respond quickly to new
          opportunities involving React, TypeScript, performance audits, or full
          product builds.
        </p> */}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              {t("contact.form.nameLabel")}
            </span>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("contact.form.namePlaceholder")}
              className="rounded-xl border border-border/70 bg-elevated/80 py-4 px-5 font-medium text-ink outline-none transition-shadow placeholder:text-secondary focus:border-accent focus:shadow-card"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              {t("contact.form.emailLabel")}
            </span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("contact.form.emailPlaceholder")}
              className="rounded-xl border border-border/70 bg-elevated/80 py-4 px-5 font-medium text-ink outline-none transition-shadow placeholder:text-secondary focus:border-accent focus:shadow-card"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              {t("contact.form.messageLabel")}
            </span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.form.messagePlaceholder")}
              className="rounded-xl border border-border/70 bg-elevated/80 py-4 px-5 font-medium text-ink outline-none transition-shadow placeholder:text-secondary focus:border-accent focus:shadow-card"
            />
          </label>

          <button
            type="submit"
            className="w-fit cursor-pointer rounded-full border border-transparent
             bg-blue-pink-gradient bg-no-repeat px-6 py-2 text-center text-[16px]
             font-semibold text-white shadow-md shadow-primary transition-transform duration-200 hover:-translate-y-0.5"
          >
            {loading ? t("contact.status.sending") : t("contact.status.send")}
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
