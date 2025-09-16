
import Form from 'next/form';
import Image from 'next/image';
import { signIn, signOut, auth } from "@/auth"
import { redirect } from 'next/navigation';

export default async function LoginForm() {
    const session = await auth();

    if (session?.user) {
        redirect('/customer/account');
    } else {
        return (
            <div className="flex min-h-screen flex-col justify-center items-center px-4 py-12 bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
                    <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                    <Form action="#" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" type="password" name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </Form>
                    <div className="flex flex-col gap-3 mt-4">
                        <form
                            action={async () => {
                                "use server"
                                await signIn("google")
                            }}
                        >
                            <button type="submit"
                                className="flex items-center justify-center w-full gap-3 rounded-md bg-white border border-gray-300 px-3 py-2 text-base font-semibold text-gray-700 shadow hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors">
                                <Image src="/google.svg" alt="Google" width={24} height={24} />
                                <span className="flex-1 text-center">Sign in with Google</span>
                            </button>
                        </form>
                        <form
                            action={async () => {
                                "use server"
                                await signIn("github")
                            }}
                        >
                            <button type="submit"
                                className="flex items-center justify-center w-full gap-3 rounded-md bg-[#181717] px-3 py-2 text-base font-semibold text-white shadow hover:bg-[#232323] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors">
                                <Image src="/github.svg" alt="GitHub" width={24} height={24} />
                                <span className="flex-1 text-center">Sign in with GitHub</span>
                            </button>
                        </form>
                    </div>
                    <p className="mt-8 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                    </p>
                </div>
            </div>
        );
    }
}