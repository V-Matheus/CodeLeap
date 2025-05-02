import { Button } from '@/components/Button';

export default function signUpPage() {
  return (
    <main className="flex flex-1 justify-center items-center h-screen">
      <article className="bg-white w-[660px] p-6 rounded-2xl border-1 border-gray-medium">
        <h2 className="text-[22px] font-bold">Welcome to CodeLeap network!</h2>
        <form>
          <label className="flex flex-col gap-2">
            Please enter your username
            <input
              className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg"
              type="text"
              placeholder="John doe"
            />
          </label>
        </form>

        <section className="flex justify-end gap-4 mt-10">
          <Button styles={'submit'}>ENTER</Button>
        </section>
      </article>
    </main>
  );
}
