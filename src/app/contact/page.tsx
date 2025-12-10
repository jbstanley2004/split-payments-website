"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="min-h-screen bg-white text-black font-lora selection:bg-black/10 selection:text-black">
            <div className="relative z-10">
                <DynamicIslandNav />

                {/* HERO SECTION */}
                <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-10 lg:px-16 pt-32 pb-16 bg-white">
                    <div className="max-w-4xl w-full text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 font-poppins leading-tight">
                                Let's connect.
                            </h1>
                            <p className="text-xl md:text-2xl text-black/70 font-lora max-w-2xl mx-auto">
                                Have questions about our payment processing or funding solutions? We're here to help.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section className="px-6 md:px-10 lg:px-16 py-16 bg-[#F6F5F4]">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200"
                            >
                                <h2 className="text-3xl font-bold text-black mb-6 font-poppins">Send us a message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-black mb-2 font-poppins">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-black mb-2 font-poppins">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                            placeholder="you@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-sm font-semibold text-black mb-2 font-poppins">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2 font-poppins">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-black mb-2 font-poppins">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all resize-none"
                                            placeholder="Tell us how we can help..."
                                        />
                                    </div>

                                    <PrimaryButton type="submit" className="w-full">
                                        Send message
                                    </PrimaryButton>
                                </form>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-black mb-6 font-poppins">Get in touch</h2>
                                    <p className="text-lg text-black/70 leading-relaxed">
                                        Whether you're looking to streamline your payment processing or unlock working capital, our team is ready to help you find the right solution.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200">
                                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-black mb-1 font-poppins">Email us</h3>
                                            <a href="mailto:hello@split-llc.com" className="text-[#FF4306] hover:underline">
                                                hello@split-llc.com
                                            </a>
                                            <p className="text-sm text-black/60 mt-1">We typically respond within 24 hours</p>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200">
                                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-black mb-1 font-poppins">Office address</h3>
                                            <p className="text-black/70">
                                                5540 Centerview Dr, Ste 503507<br />
                                                Raleigh, NC 27606
                                            </p>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200">
                                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-black mb-1 font-poppins">Business hours</h3>
                                            <p className="text-black/70">
                                                Monday - Friday<br />
                                                9:00 AM - 6:00 PM EST
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                                    <h3 className="font-semibold text-black mb-4 font-poppins">Quick links</h3>
                                    <div className="space-y-3">
                                        <a href="/portal/signup" className="block text-[#FF4306] hover:underline">
                                            Get qualified →
                                        </a>
                                        <a href="/payments" className="block text-[#FF4306] hover:underline">
                                            Payment solutions →
                                        </a>
                                        <a href="/funding" className="block text-[#FF4306] hover:underline">
                                            Funding options →
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className="px-6 md:px-10 lg:px-16 py-16 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-black mb-12 text-center font-poppins">
                            Frequently asked questions
                        </h2>
                        <div className="space-y-6">
                            {[
                                {
                                    question: "How quickly can I get approved for payment processing?",
                                    answer: "Most applications are approved within 24-48 hours. Once approved, your merchant account can be activated within 2-3 business days."
                                },
                                {
                                    question: "What are the requirements for Split Funding?",
                                    answer: "To qualify for funding, you need to be processing at least $8,000 in monthly credit card sales. Approval is based on your processing history, not credit scores."
                                },
                                {
                                    question: "How does repayment work for funding?",
                                    answer: "Repayment is automatic through a fixed percentage of your daily card sales. On slow days, you pay less. On busy days, you pay more. There are no fixed monthly payments or interest charges."
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-200"
                                >
                                    <h3 className="text-lg font-semibold text-black mb-2 font-poppins">
                                        {faq.question}
                                    </h3>
                                    <p className="text-black/70 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
