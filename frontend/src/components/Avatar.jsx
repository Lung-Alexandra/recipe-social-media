import { useEffect, useState } from 'react';

export function Avatar({ className = '', imageUrl, label = 'User' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initial = label.slice(0, 1).toUpperCase() || 'U';

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <div className={`avatar ${className}`.trim()}>
      {imageUrl && !imageFailed ? (
        <img src={imageUrl} alt="" onError={() => setImageFailed(true)} />
      ) : (
        initial
      )}
    </div>
  );
}
