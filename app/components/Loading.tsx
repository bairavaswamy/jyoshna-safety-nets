export default function Loading() {
  return (
    <div className="relative flex items-center justify-center h-[70vh] w-full overflow-hidden">

      {/* soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

      {/* animated glow */}
      <div className="absolute w-72 h-72 bg-yellow-400/20 blur-3xl rounded-full animate-pulse" />

      {/* loader card */}
      <div className="relative backdrop-blur-md bg-white/60 border border-white/40 shadow-xl rounded-2xl p-10 w-[320px]">

        <div className="flex flex-col items-center space-y-6">

          {/* animated logo ring */}
          <div className="relative">
            <div className="w-14 h-14 border-4 border-yellow-400/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 rounded-full animate-spin"></div>
          </div>

          {/* shimmer text skeleton */}
          <div className="space-y-3 w-full animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>

        </div>

      </div>

    </div>
  );
}