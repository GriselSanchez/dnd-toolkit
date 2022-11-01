import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

function Application({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default Application;
