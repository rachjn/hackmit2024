import Link from "next/link";
import { StickyHeader } from "./sticky-header";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <StickyHeader className="px-8 py-4 bg-lightest-green bg-opacity-70">
        <div className="flex justify-between items-center font-bold">
          <Link href="/" className="text-xl">
            {/* NatureScope */}
            <Image
              src="/nslogo.png"
              height={220}
              width={220}
              alt="logo"
              className=""
            />
          </Link>
          <Link
            href="/cameras"
            className="text-xl no-underline text-dark-green"
          >
            All Cameras
          </Link>
          {/* <SignInAndSignUpButtons /> */}
        </div>
      </StickyHeader>
    </>
  );
}
