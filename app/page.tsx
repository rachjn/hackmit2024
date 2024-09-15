"use client";

import { Button } from "@/components/ui/button";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import MapComponent from "../components/layout/map";
import RotatingText from "@/components/layout/fliptext";

const DynamicMap = dynamic(() => import("../components/layout/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="mt-5">
        <div className="text-center mb-10 font-bold text-2xl">
          What are wildlife around the world up to?
        </div>
        <div className="relative">
          <MapComponent />
          <div className="mt-4 text-center">
            <RotatingText />
          </div>
        </div>
      </div>
    </>
  );
}

// function SignInAndSignUpButtons() {
//   return (
//     <div className="flex gap-4">
//       <Authenticated>
//         <UserButton afterSignOutUrl="#" />
//       </Authenticated>
//       <Unauthenticated>
//         <SignInButton mode="modal">
//           <Button variant="ghost">Sign in</Button>
//         </SignInButton>
//         <SignUpButton mode="modal">
//           <Button>Sign up</Button>
//         </SignUpButton>
//       </Unauthenticated>
//     </div>
//   );
// }

// function SignedInContent() {
//   const { viewer, numbers } =
//     useQuery(api.myFunctions.listNumbers, {
//       count: 10,
//     }) ?? {};
//   const addNumber = useMutation(api.myFunctions.addNumber);

//   if (viewer === undefined || numbers === undefined) {
//     return (
//       <>
//         <Skeleton className="h-5 w-full" />
//         <Skeleton className="h-5 w-full" />
//         <Skeleton className="h-5 w-full" />
//       </>
//     );
//   }

// return (
//   <>
//     <p>Welcome {viewer ?? "N/A"}!</p>
//     <p>
//       Click the button below and open this page in another window - this data
//       is persisted in the Convex cloud database!
//     </p>
//     <p>
//       <Button
//         onClick={() => {
//           void addNumber({ value: Math.floor(Math.random() * 10) });
//         }}
//       >
//         Add a random number
//       </Button>
//     </p>
//     <p>
//       Numbers:{" "}
//       {numbers?.length === 0
//         ? "Click the button!"
//         : numbers?.join(", ") ?? "..."}
//     </p>
//     <p>
//       Edit <Code>convex/myFunctions.ts</Code> to change your backend
//     </p>
//     <p>
//       Edit <Code>app/page.tsx</Code> to change your frontend
//     </p>
//     <p>
//       Check out{" "}
//       <Link target="_blank" href="https://docs.convex.dev/home">
//         Convex docs
//       </Link>
//     </p>
//     <p>
//       To build a full page layout copy one of the included{" "}
//       <Link target="_blank" href="/layouts">
//         layouts
//       </Link>
//     </p>
//   </>
// );
// }
