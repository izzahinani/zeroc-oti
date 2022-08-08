import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
        zoom: "50%",
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
