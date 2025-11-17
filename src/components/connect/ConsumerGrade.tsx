import { Button } from './ui/button';
export default function ConsumerGrade() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f2137]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Consumer-grade payments<br />for business buyers.
        </h2>
        <Button className="bg-[#00d9b8] hover:bg-[#00c4a7] text-[#0a1929] font-medium px-8 py-6 text-base">
          Learn more
        </Button>
      </div>
    </div>
  );
}