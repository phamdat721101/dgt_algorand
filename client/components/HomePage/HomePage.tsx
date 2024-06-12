import Banner from "./Banner";
import Layout from "./HomeLayout";
import Vaults from "./Vaults";

export default function HomePage() {
  return (
    <div>
      <Layout>
        {/* Hero banner */}
        <Banner time={8000} />

        {/* Vaults */}
        <Vaults />
      </Layout>
    </div>
  );
}
