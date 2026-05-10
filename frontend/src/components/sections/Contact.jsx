import { useState } from "react";
import axios from "axios";
import { ArrowUpRight, Send } from "lucide-react";
import { toast } from "sonner";
import Reveal from "@/components/Reveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", subject: "", message: "" };

const Field = ({ label, name, value, onChange, type = "text", testId, required, multiline }) => {
  const Tag = multiline ? "textarea" : "input";
  return (
    <label className="block group">
      <span className="text-overline block mb-3">{label}</span>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={multiline ? 5 : undefined}
        data-testid={testId}
        className="w-full bg-transparent border-0 border-b border-white/15 focus:border-white px-0 py-3 md:py-4 text-white text-base md:text-lg font-light placeholder-neutral-600 focus:outline-none transition-colors resize-none"
      />
    </label>
  );
};

const Contact = () => {
  const [data, setData] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/contact`, {
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim() || null,
        message: data.message.trim(),
      });
      if (res.data?.email_sent) {
        toast.success("Message sent. I'll be in touch shortly.");
      } else {
        toast.success("Message received. I'll respond by email soon.");
      }
      setData(initial);
    } catch (err) {
      const detail = err?.response?.data?.detail || "Something went wrong. Try again.";
      toast.error(typeof detail === "string" ? detail : "Could not send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-32 md:py-48 bg-[#050505] overflow-hidden"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <Reveal className="flex items-center gap-3 mb-12 md:mb-16">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]" />
          <span className="text-overline">[ 04 ] Contact</span>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-5xl sm:text-7xl md:text-[10rem] leading-[0.9] tracking-tight text-white">
            Let's build <br />
            something{" "}
            <span className="italic font-light text-neutral-400">
              together.
            </span>
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-28 grid grid-cols-12 gap-6 md:gap-12">
          {/* Left: details */}
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-light max-w-[360px]">
                I'm currently open to new full-time roles and select freelance
                engagements — frontend, full-stack and immersive web work.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 space-y-6">
                <div>
                  <div className="text-overline mb-2">Email</div>
                  <a
                    data-testid="contact-email-link"
                    href="mailto:zaeeemafzal@gmail.com"
                    className="font-display text-xl md:text-2xl text-white hover:text-[var(--accent)] transition-colors break-all"
                  >
                    zaeeemafzal@gmail.com
                  </a>
                </div>
                <div>
                  <div className="text-overline mb-2">Social</div>
                  <div className="flex flex-col gap-2">
                    <a
                      data-testid="contact-linkedin"
                      href="https://www.linkedin.com/in/zaeeem-afzal-333061270"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 font-display text-lg md:text-xl text-white hover:text-[var(--accent)] transition-colors"
                    >
                      LinkedIn
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                    <a
                      data-testid="contact-github"
                      href="https://github.com/zaeemafzal-hub"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 font-display text-lg md:text-xl text-white hover:text-[var(--accent)] transition-colors"
                    >
                      GitHub
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                    <a
                      data-testid="contact-github"
                      href="https://github.com/zaeemafzal-hub"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 font-display text-lg md:text-xl text-white hover:text-[var(--accent)] transition-colors"
                    >
                      +92   3019074249
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-overline mb-2">Location</div>
                  <div className="font-display text-lg md:text-xl text-white">
                    Lahore, Pakistan
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal
            delay={0.1}
            className="col-span-12 md:col-span-7 md:col-start-6"
          >
            <form
              onSubmit={onSubmit}
              data-testid="contact-form"
              className="space-y-8 md:space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <Field
                  label="Your name"
                  name="name"
                  value={data.name}
                  onChange={onChange}
                  testId="contact-input-name"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={onChange}
                  type="email"
                  testId="contact-input-email"
                  required
                />
              </div>

              <Field
                label="Subject"
                name="subject"
                value={data.subject}
                onChange={onChange}
                testId="contact-input-subject"
              />

              <Field
                label="Tell me about your project"
                name="message"
                value={data.message}
                onChange={onChange}
                testId="contact-input-message"
                required
                multiline
              />

              <div className="pt-2 flex items-center justify-between">
                <p className="text-neutral-500 text-xs uppercase tracking-[0.22em]">
                  I respond within 1–2 days
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit-button"
                  className="btn-magnetic group inline-flex items-center gap-3 border border-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-white transition-colors"
                >
                  {submitting ? "Sending…" : "Send message"}
                  <Send
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
