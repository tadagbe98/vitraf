import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Image src="/images/logo.png" alt="Vitraf Alu Logo" width={32} height={32} className="h-8 w-8" />
      <span className="text-xl font-bold text-secondary">Vitraf Alu</span>
    </Link>
  );
}
