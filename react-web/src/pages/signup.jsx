import SignupForm from "../components/signupForm";

const Signup = () => {
  return (
        <div className="relative min-h-svh w-full">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-white">
                </div>
                <div className="login-custom-bg absolute left-0 right-0 top-0 h-1/2 transform skew-y-[6deg] origin-top-right">
                </div>
            </div>

            <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <SignupForm />
                </div>
            </div>
        </div>
  )
}

export default Signup