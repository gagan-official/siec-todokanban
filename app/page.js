import dynamic from "next/dynamic";

const DropComp = dynamic(() => import("@/components/DropComp"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return <DropComp />;
}
