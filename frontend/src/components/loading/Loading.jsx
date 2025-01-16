const Loading = () => {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="flex items-center gap-5">
        <div
          className="animate-spin rounded-full h-10 w-10 border-4 border-gray-500 p-2"
        />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
