import { NavLink } from "react-router-dom"

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-108 rounded-md border-[1px] border-zinc-500 p-5 py-8 flex flex-col gap-7">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-sm font-medium text-zinc-500">Sign in to your account to continue</p>
                </div>


                <form action="#" className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-sm">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="john12@gmail.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-sm">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="*******"
                        />
                    </div>

                    <button className="bg-white mt-2 text-black p-2 rounded-md font-medium cursor-pointer hover:bg-zinc-200 transition-all duration-300">Login</button>

                    <p className="text-sm">
                        Don't have an account?{" "}
                        <NavLink to={"/register"} className="font-bold text-blue-500">
                            Register
                        </NavLink>
                    </p>
                </form>

            </div>
        </div>
    )
}

export default LoginPage