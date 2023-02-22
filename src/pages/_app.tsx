import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {ContextProvider} from "@/context/AppContext";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
      <ContextProvider>
				<Component {...pageProps} />
        </ContextProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</Hydrate>
		</QueryClientProvider>
  ) 
}

// <ContextProvider>
    //   <Component {...pageProps} />
    // </ContextProvider>
