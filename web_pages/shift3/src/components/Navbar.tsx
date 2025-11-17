import { Button } from './ui/button';
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="https://www.coderocket.app/logo-alternate.png" 
              alt="CodeRocket" 
              className="h-8"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium">
              Features
            </a>
            <a href="#solutions" className="text-gray-700 hover:text-gray-900 font-medium">
              Solutions
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">
              Pricing
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;