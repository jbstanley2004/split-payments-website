"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { motion } from "framer-motion";

export default function TermsPage() {
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
                                Terms and Conditions
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
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Agreement to Terms</h2>
                                <p className="text-black/80 leading-relaxed">
                                    These Terms and Conditions ("Terms") constitute a legally binding agreement between you and Split LLC ("Split," "we," "us," or "our") concerning your access to and use of our payment processing and merchant funding services, including our website and mobile applications (collectively, the "Services").
                                </p>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our Services.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Eligibility</h2>
                                <p className="text-black/80 leading-relaxed">
                                    To use our Services, you must:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Be at least 18 years of age</li>
                                    <li>Have the legal authority to enter into this agreement on behalf of your business</li>
                                    <li>Operate a legitimate business with valid tax identification</li>
                                    <li>Comply with all applicable laws and regulations</li>
                                    <li>Not be listed on any government prohibited or restricted party lists</li>
                                </ul>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Payment Processing Services</h2>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Merchant Account</h3>
                                <p className="text-black/80 leading-relaxed">
                                    By using our payment processing services, you authorize us to:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Process credit card, debit card, and ACH transactions on your behalf</li>
                                    <li>Hold funds in accordance with our settlement schedule</li>
                                    <li>Withhold reserves as necessary to manage risk</li>
                                    <li>Deduct our fees from your transaction proceeds</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Prohibited Activities</h3>
                                <p className="text-black/80 leading-relaxed">
                                    You agree not to use our Services for:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Illegal activities or prohibited business types</li>
                                    <li>Processing transactions that you know or suspect to be fraudulent</li>
                                    <li>Money laundering or terrorist financing</li>
                                    <li>Processing transactions without proper customer authorization</li>
                                    <li>Circumventing card network rules or our policies</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Chargebacks and Disputes</h3>
                                <p className="text-black/80 leading-relaxed">
                                    You are responsible for all chargebacks, reversals, and disputes related to your transactions. We may debit your account for chargeback amounts, fees, and associated costs. You agree to maintain sufficient funds in your account to cover potential chargebacks.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Merchant Funding Services</h2>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Funding Offers</h3>
                                <p className="text-black/80 leading-relaxed">
                                    Split Funding is a merchant cash advance product, not a loan. Funding offers are based on your card processing history and are subject to our underwriting criteria. We reserve the right to:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Approve, deny, or modify funding applications at our discretion</li>
                                    <li>Adjust funding amounts based on processing volume changes</li>
                                    <li>Require additional documentation or information</li>
                                    <li>Withdraw funding offers prior to disbursement</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Repayment Terms</h3>
                                <p className="text-black/80 leading-relaxed">
                                    Repayment is made through automatic daily deductions from your card processing receipts at a fixed percentage rate specified in your funding agreement. Key terms include:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Repayment continues until the purchased amount is fully reconciled</li>
                                    <li>No prepayment penalties or interest charges</li>
                                    <li>Repayment speed varies based on your daily sales volume</li>
                                    <li>Minimum processing requirements may apply</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-black mb-3 mt-6 font-poppins">Renewal and Additional Funding</h3>
                                <p className="text-black/80 leading-relaxed">
                                    Upon reaching 50% repayment of your current funding, you may become eligible for additional funding. Renewal offers are subject to your processing performance and our underwriting criteria.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Fees and Charges</h2>
                                <p className="text-black/80 leading-relaxed">
                                    You agree to pay all fees associated with our Services as outlined in your merchant agreement and pricing schedule. Fees may include:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Transaction processing fees (per-transaction and percentage-based)</li>
                                    <li>Monthly account fees</li>
                                    <li>Chargeback fees</li>
                                    <li>PCI compliance fees</li>
                                    <li>Equipment rental or purchase fees</li>
                                    <li>Funding origination fees</li>
                                </ul>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    We reserve the right to modify our fees with 30 days' written notice. Continued use of our Services after such notice constitutes acceptance of the new fees.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Data Security and Compliance</h2>
                                <p className="text-black/80 leading-relaxed">
                                    You agree to:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Maintain PCI DSS compliance for all cardholder data</li>
                                    <li>Implement reasonable security measures to protect customer information</li>
                                    <li>Notify us immediately of any data breaches or security incidents</li>
                                    <li>Comply with all applicable data protection and privacy laws</li>
                                    <li>Never store prohibited cardholder data (CVV, full magnetic stripe, PIN)</li>
                                </ul>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Account Termination</h2>
                                <p className="text-black/80 leading-relaxed">
                                    Either party may terminate this agreement with 30 days' written notice. We may immediately suspend or terminate your account if:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>You violate these Terms or our policies</li>
                                    <li>We detect fraudulent or suspicious activity</li>
                                    <li>Your chargeback rate exceeds acceptable thresholds</li>
                                    <li>You fail to pay fees or settle negative balances</li>
                                    <li>Required by law or card network rules</li>
                                </ul>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    Upon termination, all outstanding obligations remain due, including funding repayment obligations and negative balance settlements.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Limitation of Liability</h2>
                                <p className="text-black/80 leading-relaxed">
                                    TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>SPLIT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                                    <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU IN THE THREE MONTHS PRECEDING THE CLAIM</li>
                                    <li>WE ARE NOT LIABLE FOR LOSSES CAUSED BY SERVICE INTERRUPTIONS, THIRD-PARTY ACTIONS, OR FORCE MAJEURE EVENTS</li>
                                </ul>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Indemnification</h2>
                                <p className="text-black/80 leading-relaxed">
                                    You agree to indemnify, defend, and hold harmless Split and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from:
                                </p>
                                <ul className="list-disc pl-6 text-black/80 space-y-2 mt-3">
                                    <li>Your use of our Services</li>
                                    <li>Your violation of these Terms</li>
                                    <li>Your violation of any laws or third-party rights</li>
                                    <li>Chargebacks and transaction disputes</li>
                                    <li>Your products, services, or business practices</li>
                                </ul>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Dispute Resolution</h2>
                                <p className="text-black/80 leading-relaxed">
                                    Any disputes arising from these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in Raleigh, North Carolina, and the decision shall be final and binding.
                                </p>
                                <p className="text-black/80 leading-relaxed mt-4">
                                    You waive any right to participate in class action lawsuits or class-wide arbitration.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Governing Law</h2>
                                <p className="text-black/80 leading-relaxed">
                                    These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina, without regard to its conflict of law provisions.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Changes to Terms</h2>
                                <p className="text-black/80 leading-relaxed">
                                    We reserve the right to modify these Terms at any time. We will provide notice of material changes by email or through our Services. Your continued use of our Services after such notice constitutes acceptance of the modified Terms.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-black mb-4 font-poppins">Contact Information</h2>
                                <p className="text-black/80 leading-relaxed">
                                    If you have any questions about these Terms, please contact us:
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
