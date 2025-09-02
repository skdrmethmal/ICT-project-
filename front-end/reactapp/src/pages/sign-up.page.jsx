import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <main className="relative flex items-center justify-center h-screen w-full bg-cover bg-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full bg-white backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-2xl font-semibold text-center text-black ">
          Welcome
        </h1>
        <div className="text-4xl font-semibold text-center text-black mb-6 ">
          <span>Hotelza</span>
          <span className="animate-pulse text-blue-800">AI</span>
        </div>
        <p className="text-sm text-center text-zinc-500 mb-6">
          Sign up to create an account
        </p>
        <SignUp />
      </div>
    </main>
  );
};
export default SignUpPage;
