import { Button } from './ui/button';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img 
                src="https://www.plastiq.com/wp-content/uploads/2022/11/plastiqpay.svg" 
                alt="Plastiq Logo" 
                className="h-6"
              />
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-700 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Solutions</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Resources</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Security</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-sm">Log in</Button>
            <Button className="bg-black text-white hover:bg-gray-800 text-sm px-6">Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}