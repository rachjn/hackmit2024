import Link from "next/link";
import { StickyHeader } from "./sticky-header";

export default function Navbar() {
  return (
    <>
      <StickyHeader className="px-8 py-4">
        <div className="flex justify-between items-center font-bold">
          <Link href="/" className="text-xl">
            NatureScope
          </Link>
          <Link href="/cams" className="no-underline">
            All Cameras
          </Link>
          {/* <SignInAndSignUpButtons /> */}
        </div>
      </StickyHeader>
    </>
  );
}
