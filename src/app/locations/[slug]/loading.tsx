export default function LocationDetailLoading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      aria-label="Loading location details"
      role="status"
    >
      <div className="absolute inset-0 -z-10 gradient-warm-soft" />

      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-brown/10" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "#D77005",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
        <p className="text-sm font-medium text-brown/65">Loading location…</p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
