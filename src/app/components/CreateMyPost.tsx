import { Button } from "./Button";

export function CreateMyPost() {
  return (
    <form className="flex flex-col gap-6 w-full border-1 border-gray-medium rounded-2xl p-6">
          <h2 className="font-bold text-[22px]">What’s on your mind?</h2>
          <label className="flex flex-col gap-2">
            Title
            <input
              className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg"
              type="text"
              placeholder="Hello world"
            />
          </label>

          <label className="flex flex-col gap-2">
            Content
            <textarea
              className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg resize-none"
              placeholder="Content here"
            />
          </label>

          <Button styles="submit" type="submit" className="self-end">
            Create
          </Button>
        </form>
  )
}
