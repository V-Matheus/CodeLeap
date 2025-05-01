import { Button } from "./components/Button";

export default function Home() {
  return (
    <main className="flex flex-col w-[800px] h-screen">
      <header>CodeLeap Network</header>
      <h1 className="text-2xl text-gray-light">Hello Home</h1>
      <h2 className="bg-grayDark">ola</h2>
      <Button isLoading>Button</Button>
    </main>
  );
}
