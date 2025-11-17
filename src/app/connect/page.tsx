import Navbar from '@/components/connect/Navbar';
import Hero from '@/components/connect/Hero';
import TrustedBy from '@/components/connect/TrustedBy';
import LaunchPayments from '@/components/connect/LaunchPayments';
import ModernAPIs from '@/components/connect/ModernAPIs';
import Testimonials from '@/components/connect/Testimonials';
import Documentation from '@/components/connect/Documentation';
import ConsumerGrade from '@/components/connect/ConsumerGrade';
import Footer from '@/components/connect/Footer';

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Navbar />
      <Hero />
      <TrustedBy />
      <LaunchPayments />
      <ModernAPIs />
      <Testimonials />
      <Documentation />
      <ConsumerGrade />
      <Footer />
    </div>
  );
}
