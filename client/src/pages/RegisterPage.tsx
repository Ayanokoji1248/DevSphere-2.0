import { NavLink, useNavigate } from "react-router-dom"
import { userRegisterSchema } from "../utils/zod_schema";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../stores/authStore";

const RegisterPage = () => {

    const { register } = useAuthStore();
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [passwordShow, setPasswordShow] = useState(false);


    const [error, setError] = useState<{ fullName?: string, username?: string, email?: string, password?: string }>({})


    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
        const validation = userRegisterSchema.safeParse({
            fullName, username, email, password
        })

        if (!validation.success) {
            const newErrors: Record<string, string> = {};
            validation.error.issues.forEach((issue) => {
                const field = String(issue.path[0]);
                newErrors[field] = issue.message;
            })

            setError(newErrors)
            return
        }

        try {
            await register(fullName, username, email, password);
            navigate('/home')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Login Failed", {
                duration: 1000
            });
        }
        finally {
            setFullName("")
            setUsername("")
            setEmail("")
            setPassword("")
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-108 rounded-md border-[1px] border-zinc-500 p-5 py-8 flex flex-col gap-7">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Join DevSphere</h1>
                    <p className="text-sm font-medium text-zinc-500">Create your developer profile and start connecting</p>
                </div>


                <form onSubmit={handleRegister} method="POST" className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="font-medium text-sm">
                            Fullname
                        </label>
                        <input
                            onChange={(e) => {
                                setFullName(e.target.value)
                                error.fullName = ""
                            }}
                            value={fullName}
                            name="fullName"
                            type="text"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="John Doe"
                        />
                        {error.fullName && <p className="text-xs text-red-500 font-medium">{error.fullName}</p>}

                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium text-sm">
                            Username
                        </label>
                        <input
                            onChange={(e) => {
                                setUsername(e.target.value)
                                error.username = ""
                            }}
                            value={username}
                            name="username"
                            type="text"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="joe"
                        />
                        {error.username && <p className="text-xs text-red-500 font-medium">{error.username}</p>}

                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-sm">
                            Email
                        </label>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value)
                                error.email = ""
                            }}
                            value={email}
                            name="email"
                            type="email"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="john12@gmail.com"
                        />
                        {error.email && <p className="text-xs text-red-500 font-medium">{error.email}</p>}

                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-sm">
                            Password
                        </label>
                        <div className="w-full flex items-center border-[1px] border-zinc-600 rounded-md focus-within:ring-2 focus-within:ring-white transition-all duration-300 pr-3">
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    error.password = ""
                                }

                                }
                                name="password"
                                type={passwordShow ? "text" : "password"}
                                className="w-full p-2 outline-none "
                                placeholder="*******"
                            />
                            {
                                passwordShow ?
                                    <Eye className="cursor-pointer hover:text-zinc-500 transition-all duration-300" onClick={() => setPasswordShow(!passwordShow)} />
                                    :
                                    <EyeOff className="cursor-pointer hover:text-zinc-500 transition-all duration-300" onClick={() => setPasswordShow(!passwordShow)} />
                            }
                        </div>
                        {error.password && <p className="text-xs text-red-500 font-medium">{error.password}</p>}
                    </div>


                    <button className="bg-white mt-2 text-black p-2 rounded-md font-medium cursor-pointer hover:bg-zinc-200 transition-all duration-300">Register</button>

                    <p className="text-sm">
                        Already have an account?{" "}
                        <NavLink to={"/login"} className="font-bold text-blue-500">
                            Login
                        </NavLink>
                    </p>
                </form>

            </div>
        </div>
    )
}

export default RegisterPage