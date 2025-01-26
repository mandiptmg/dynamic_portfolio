import "ldrs/tailspin";


const Loading = () => {
  return (
    <div className="w-full fixed top-0 left-0 bg-white z-[9999]  min-h-screen grid place-items-center">
      <div className="flex items-center gap-5">
        <l-tailspin size="40" stroke="5" speed="0.9" color="#06b6d4"></l-tailspin>
        Loading...
      </div>
    </div>
  );
};

export default Loading;
