export default function BackgroundMedia() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125"
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" 
          type="video/mp4" 
        />
      </video>
      {/* Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface/80"></div>
    </div>
  );
}
