import Link from "next/link";
import { StickyHeader } from "./sticky-header";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <StickyHeader className="px-8 py-4">
        <div className="flex justify-between items-center font-bold">
          <Link href="/" className="text-xl">
            {/* NatureScope */}
            <Image
              src="/nslogo.png"
              height={200}
              width={200}
              alt="logo"
              className=""
            />
          </Link>
          <Link href="/cameras" className="no-underline">
            All Cameras
          </Link>
          {/* <SignInAndSignUpButtons /> */}
        </div>
      </StickyHeader>
    </>
  );
}
