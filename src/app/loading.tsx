import Image from "next/image";

export default function Loading() {
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="flex flex-col items-center content-center mt-24 space-y-2">
          <Image
            src="/logo-black-bg-circle.png"
            alt="Palembang Digital"
            width={64}
            height={64}
            loading="lazy"
            className="animate-spin-slow"
          />
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    </div>
  );
}
