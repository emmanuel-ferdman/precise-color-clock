export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <img
          src="/icon-128x128.png"
          alt="Precise Color Clock"
          className="animate-spin h-16 w-16 mb-6"
        />
        <span className="text-white text-xl font-mono">Loading Precise Color Clock...</span>
      </div>
    </div>
  );
}
