"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ErrorBoundary } from "./ErrorBoundary";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const convex = new ConvexReactClient("https://kindred-ocelot-952.convex.cloud");

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      {/* <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      > */}
      <ConvexProvider client={convex}>{children}</ConvexProvider>
      {/* </ClerkProvider> */}
    </ErrorBoundary>
  );
}
