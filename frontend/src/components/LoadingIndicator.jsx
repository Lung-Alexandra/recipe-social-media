export function LoadingIndicator({ label }) {
  return (
    <div className="loading-wrap">
      <div className="loading-status" role="status" aria-live="polite">
        <span className="ai-loader" aria-hidden="true">
          <span className="ai-loader-blob" />
          <span className="ai-loader-glow" />
          <span className="ai-loader-ring ring-one" />
          <span className="ai-loader-ring ring-two" />
          <span className="ai-loader-particle particle-one" />
          <span className="ai-loader-particle particle-two" />
          <span className="ai-loader-particle particle-three" />
        </span>
        <span>{label}</span>
      </div>
    </div>
  );
}
