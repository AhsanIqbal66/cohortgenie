"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Providers } from "@/redux/Providers";
import { useState } from "react";
import RootUserFlagCheck from "@/components/common/RootUserFlagCheck";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const RootLayoutWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      })
  );
  const [persister] = useState(() =>
    typeof window !== "undefined"
      ? createSyncStoragePersister({ storage: window.localStorage })
      : undefined
  );

  return (
    <SessionProvider>
      {persister ? (
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <Providers>{children}</Providers>
          <ReactQueryDevtools initialIsOpen={false} />

        </PersistQueryClientProvider>
      ) : (
        <Providers> {children}</Providers>
      )}
    </SessionProvider>
  );
};

export default RootLayoutWrapper;
