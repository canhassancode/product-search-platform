import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between items-center container mx-auto px-4 py-6">
      <div className="flex items-center gap-6">
        <Image src="/logo.png" alt="Healf" width={60} height={60} className="rounded-2xl" />
      </div>
    </div>
  );
}
