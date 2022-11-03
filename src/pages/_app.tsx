import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'

export default function Application({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
