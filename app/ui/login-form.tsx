import Form from 'next/form';
import Image from 'next/image';
import { signIn, signOut, auth } from "@/auth"

export default async function LoginForm() {
    const session = await auth();

    if (session?.user) {
        return (
            <div>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">You are logged in as {session.user.email}</h2>
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                    >
                    <button type="submit"
                        className="flex w-1/6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                        text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 
                        focus-visible:outline-2 focus-visible:outline-offset-2 
                        focus-visible:outline-indigo-600">
                        Sign Out</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image 
                        src="/just-one-dollar-logo.png" 
                        alt="Just One Dollar" 
                        width={180}
                        height={38}
                        className="mx-auto h-10 w-auto" 
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form action="#" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" type="password" name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </Form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                    </p>
                </div>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                    >
                    <button type="submit" 
                        className="flex w-1/6 justify-center rounded-md bg-indigo-600 px-3
                        py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500
                        focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-indigo-600">
                        Signin with Google
                    </button>
                </form>
                <form
                    action={async () => {
                        "use server"
                        await signIn("github")
                    }}
                    >
                    <button type="submit" 
                        className="flex w-1/6 justify-center rounded-md bg-indigo-600 px-3
                        py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500
                        focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-indigo-600">
                        Signin with GitHub
                    </button>
                </form>
            </div>
        );
    }
}