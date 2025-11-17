import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
function ContactForm() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600">
            Contact us today for a personalized demo
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="Your Company" />
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to receive marketing communications and accept the terms of service
            </label>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Request Demo
          </Button>
        </form>
      </div>
    </section>
  );
}
export default ContactForm;