import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { WishlistProvider } from "@/context/WishlistContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WishlistProvider>
      <Component {...pageProps} />
    </WishlistProvider>
  );
}
