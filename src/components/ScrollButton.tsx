'use client';

interface ScrollButtonProps {
  targetId: string;
  buttonText: string;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({
  targetId,
  buttonText,
}) => {
  const handleClick = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={handleClick} className="btn-scroll px-6 py-3 bg-blue-600 font-bold rounded-full hover:bg-blue-700 text-lg mt-6">
      {buttonText}
    </button>
  );
};
