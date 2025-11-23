"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { motion } from "framer-motion";

export default function PrivacyPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <main className="min-h-screen bg-white text-black font-lora selection:bg-black/10 selection:text-black">
            <div className="relative z-10">
                <DynamicIslandNav />

                {/* HERO SECTION */}
                <section className="relative min-h-[40vh] flex items-center justify-center px-6 md:px-10 lg:px-16 pt-32 pb-16 bg-white">
                    <div className="max-w-4xl w-full text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 font-poppins">
                                Privacy Policy
                            </h1>
                            <p className="text-lg text-black/60 font-lora">
                                Last Updated: November 22, 2025
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* CONTENT SECTION */}
                <section className="px-6 md:px-10 lg:px-16 py-16 bg-[#F6F5F4]">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Introduction</h2>
                                <p className="text-black/80 leading-relaxed">
                                    Split LLC ("Split," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our payment processing and merchant funding services, including our website and mobile applications (collectively, the "Services").
                                </p>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    By accessing or using our Services, you agree to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Information We Collect</h2>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Personal Information</h3>
                                <p className="text-black/80 leading-relaxed">
                                    We may collect personally identifiable information that you voluntarily provide to us when you:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Register for an account</li>
                                    <li>Apply for merchant funding</li>
                                    <li>Process payment transactions</li>
                                    <li>Contact our customer support</li>
                                    <li>Subscribe to our marketing communications</li>
                                </ul>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    This information may include: name, business name, email address, phone number, business address, tax identification number, bank account information, credit card processing history, and financial statements.
                                </p>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Transaction Data</h3>
                                <p className="text-black/80 leading-relaxed">
                                    When you use our payment processing services, we collect information about your transactions, including transaction amounts, dates, merchant information, and payment methods used.
                                </p>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Automatically Collected Information</h3>
                                <p className="text-black/80 leading-relaxed">
                                    We automatically collect certain information when you visit, use, or navigate our Services, including:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Device information (IP address, browser type, operating system)</li>
                                    <li>Usage data (pages visited, time spent, features used)</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">How We Use Your Information</h2>
                                <p className="text-black/80 leading-relaxed">
                                    We use the information we collect for the following purposes:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li><strong>To Provide Services:</strong> Processing payments, evaluating funding applications, and managing your account</li>
                                    <li><strong>To Improve Services:</strong> Analyzing usage patterns and enhancing user experience</li>
                                    <li><strong>To Communicate:</strong> Sending service updates, transaction confirmations, and marketing materials (with your consent)</li>
                                    <li><strong>To Ensure Security:</strong> Detecting and preventing fraud, unauthorized access, and other illegal activities</li>
                                    <li><strong>To Comply with Legal Obligations:</strong> Meeting regulatory requirements, including anti-money laundering (AML) and know-your-customer (KYC) regulations</li>
                                </ul>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Information Sharing and Disclosure</h2>
                                <p className="text-black/80 leading-relaxed">
                                    We may share your information with:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (payment processors, data analytics, customer support)</li>
                                    <li><strong>Financial Institutions:</strong> Banks and payment networks necessary to process transactions and provide funding</li>
                                    <li><strong>Business Partners:</strong> Partners who help us deliver our services, subject to confidentiality agreements</li>
                                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
                                    <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                                </ul>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    We do not sell your personal information to third parties for their marketing purposes.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Data Security</h2>
                                <p className="text-black/80 leading-relaxed">
                                    We implement industry-standard security measures to protect your information, including:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Encryption of sensitive data in transit and at rest</li>
                                    <li>Regular security audits and vulnerability assessments</li>
                                    <li>Access controls and authentication measures</li>
                                    <li>Compliance with PCI DSS standards for payment card data</li>
                                </ul>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Your Privacy Rights</h2>
                                <p className="text-black/80 leading-relaxed">
                                    Depending on your location, you may have the following rights:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                                    <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations</li>
                                    <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                                </ul>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    To exercise these rights, please contact us at <a href="mailto:hello@ccsplit.org" className="text-[#FF4306] underline">hello@ccsplit.org</a>.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Data Retention</h2>
                                <p className="text-black/80 leading-relaxed">
                                    We retain your information for as long as necessary to provide our Services and comply with legal obligations. Transaction data and financial records are typically retained for at least seven years to meet regulatory requirements.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Third-Party Links</h2>
                                <p className="text-black/80 leading-relaxed">
                                    Our Services may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies before providing any information.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Children's Privacy</h2>
                                <p className="text-black/80 leading-relaxed">
                                    Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Changes to This Privacy Policy</h2>
                                <p className="text-black/80 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our Services after such changes constitutes acceptance of the updated Privacy Policy.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Contact Us</h2>
                                <p className="text-black/80 leading-relaxed">
                                    If you have any questions or concerns about this Privacy Policy, please contact us:
                                </p>
                                <div className="mt-4 bg-white p-6 rounded-2xl border border-gray-200">
                                    <p className="text-black font-semibold">Split LLC</p>
                                    <p className="text-black/80">5540 Centerview Dr, Ste 503507</p>
                                    <p className="text-black/80">Raleigh, NC 27606</p>
                                    <p className="text-black/80 mt-2">Email: <a href="mailto:hello@ccsplit.org" className="text-[#FF4306] underline">hello@ccsplit.org</a></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
