const pills = ["Cards", "ACH", "Platforms", "Retail", "Mobile"];

const getPillStyles = (index: number) => {
  const total = pills.length;
  let bgColorClass = 'bg-light-gray';
  let textColorClass = 'text-dark';

  const colorCycle = ['bg-light-gray', 'bg-blue', 'bg-green', 'bg-purple'];

  if (total <= 2) {
    bgColorClass = 'bg-light-gray';
  } else {
    bgColorClass = colorCycle[index % 4];
    if (index === 4 && total === 5) { // Special case for 5 pills
        bgColorClass = 'bg-light-gray';
    }
  }

  if (bgColorClass !== 'bg-light-gray') {
    textColorClass = 'text-light';
  }

  return `${bgColorClass} ${textColorClass}`;
};

export function Stats() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {pills.map((pill, index) => (
            <div
              key={pill}
              className={`font-sans font-medium text-sm rounded-pill py-2 px-5 flex items-center gap-2 ${getPillStyles(index)}`}
            >
              <span className="w-2 h-2 bg-orange rounded-full"></span>
              <span>{pill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}