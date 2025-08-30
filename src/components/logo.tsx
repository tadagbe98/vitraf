import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M3 20V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16" />
        <path d="M12 4v16" />
        <path d="M3 12h18" />
      </svg>
      <span className="text-xl font-bold text-secondary">Vitraf Alu</span>
    </Link>
  );
}
