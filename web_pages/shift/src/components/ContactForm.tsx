import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
export default function ContactForm() {
  return (
    <section className="bg-gradient-to-b from-[#1e3a8a] to-[#2563eb] py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Rock Reporting<br />Capabilities?
          </h2>
          <p className="text-white/90 text-lg">
            Schedule a meeting to learn more about all of our payments options to find a fit for the needs of your business.
          </p>
        </div>
        <div className="bg-white rounded-lg p-8 shadow-2xl">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="First and last name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Company name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" placeholder="Phone number" />
            </div>
            <div className="space-y-2">
              <Label>What best describes the type of sales you're interested in learning more about?</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="integrated" />
                  <label htmlFor="integrated" className="text-sm">Integrated Payments</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="gateway" />
                  <label htmlFor="gateway" className="text-sm">Gateway</label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">What is your business industry?</Label>
              <Input id="industry" placeholder="Industry" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="volume">What is the approximate monthly volume?</Label>
              <Input id="volume" placeholder="Monthly volume" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <textarea 
                id="comments"
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                placeholder="Additional comments"
              />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="consent" className="mt-1" />
              <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed">
                By submitting this form, you consent to Shift4 storing and processing the personal information submitted above to provide you the content requested.
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="recaptcha" />
              <label htmlFor="recaptcha" className="text-xs text-gray-600">
                I'm not a robot
              </label>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-6 text-lg font-semibold"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}