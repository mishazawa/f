import Link from "next/link";

export function Header() {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/canv">Canvas</Link>
    </>
  );
}
