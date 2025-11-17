import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
export default function ContactForm() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#1a2f5c] to-[#2940a3] text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Elevate Your Checkout
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Experience?
          </h3>
          <p className="text-gray-300">
            Fill out the form below and our team will reach out to discuss how we can help optimize your payment processing.
          </p>
        </div>
        <form className="bg-white text-black rounded-lg p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">NAME</label>
              <Input placeholder="First Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">&nbsp;</label>
              <Input placeholder="Last Name" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">EMAIL</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">PHONE</label>
              <Input type="tel" placeholder="(123) 456-7890" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              I AM INTERESTED IN (SELECT ALL THAT APPLY)
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="payment-processing" />
                <label htmlFor="payment-processing" className="text-sm">Payment Processing</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ecommerce" />
                <label htmlFor="ecommerce" className="text-sm">eCommerce Solutions</label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              WHEN IS THE BEST TIME TO REACH YOU?
            </label>
            <Input placeholder="Preferred time" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              HOW CAN WE HELP YOU? (OPTIONAL)
            </label>
            <Textarea rows={4} placeholder="Tell us about your needs..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">COMMENTS</label>
            <Textarea rows={4} placeholder="Any additional information..." />
          </div>
          <div className="text-xs text-gray-600">
            <p className="mb-4">
              We'll need to let our team know you'd like to find out more and that involves sharing your information. But we won't share it with anyone else for marketing purposes and you can unsubscribe at any time.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <span>protected by reCAPTCHA</span>
            </div>
            <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-6 text-lg">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}