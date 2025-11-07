export default function NotFound() {
  return (
    <div className="fixed dark:bg-[#0C0C0C] bg-[#FAF9F6] top-0 right-0 bottom-0 left-0 z-30 flex flex-col items-center justify-center">
      <h1 className="md:text-[300px] text-[140px] font-medium text-center">
        404
      </h1>
      <p className="text-muted text-center text-lg mt-4">Page not found</p>
    </div>
  );
}
