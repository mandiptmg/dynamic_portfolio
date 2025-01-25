const Loading = () => {
  return (
    <div className="w-full fixed top-0 left-0  min-h-screen grid place-items-center">
      <div className="flex items-center gap-5">
        <div
          className="animate-spin  rounded-full h-10 w-10 border-4 border-cyan-500 p-2"
        />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
