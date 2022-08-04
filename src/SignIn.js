const url = "https://todoo.5xcamp.us/users";
const SignIn = () => {
  return (
    <form className="px-5">
      <div className="mb-3">
        <label
          htmlFor="enterEmail"
          className="text-yellow-500 inline-block w-full"
        >
          C:\Users\TaskManager\SignIn\Email
        </label>
        <input
          type="text"
          className="w-full bg-transparent"
          id="enterEmail"
          placeholder=">"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="enterPassword"
          className="text-yellow-500 inline-block w-full"
        >
          C:\Users\TaskManager\SignIn\Password
        </label>
        <input
          type="enterPassword"
          className="w-full bg-transparent"
          id="password"
          placeholder=">"
        />
      </div>
      <button className="block mx-auto py-3 px-6 mb-5 hover:bg-gray-800">
        Y/y
      </button>
    </form>
  );
};

export default SignIn;
