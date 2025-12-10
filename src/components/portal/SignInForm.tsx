"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Mail, ArrowRight, Loader2, AlertCircle, X, UserPlus, HelpCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [showSignUpConfirm, setShowSignUpConfirm] = useState(false); // New state for modal

    const router = useRouter();
    const supabase = createClient();

    const checkProfileAndRedirect = async (user: any) => {
        // Admin check
        if (user.email?.endsWith('@split-llc.com')) {
            router.push('/admin');
            return;
        }

        try {
            const { data: doc, error } = await supabase
                .from('applications')
                .select('*')
                .eq('id', user.id)
                .single();

            if (doc && !error) {
                router.push('/portal/dashboard');
            } else {
                router.push('/portal/onboarding');
            }
        } catch (e) {
            console.error("Error checking profile:", e);
            router.push('/portal/onboarding');
        }
    };

    // Check for existing session on mount
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                await checkProfileAndRedirect(session.user);
            }
        }
        checkUser();
    }, []);


    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            // Try to Sign In
            const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                if (signInError.message.toLowerCase().includes("invalid login credentials")) {
                    // STOP! Don't auto-signup. Ask user first.
                    setIsLoading(false); // Stop loading to show modal
                    setShowSignUpConfirm(true);
                } else {
                    console.error("Sign In Error:", signInError); // Debugging
                    setError(signInError.message);
                    setIsLoading(false);
                }
            } else {
                if (signInData.user) {
                    await checkProfileAndRedirect(signInData.user);
                }
            }

        } catch (err: any) {
            console.error(err);
            setError("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    const handleSmartSignUp = async () => {
        setShowSignUpConfirm(false);
        setIsLoading(true);

        try {
            // Attempt Sign Up
            const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                if (signUpError.message.includes("already registered")) {
                    setError("This email is already registered. Please check your password.");
                } else {
                    setError(signUpError.message);
                }
            } else {
                if (signUpData.user && signUpData.user.identities && signUpData.user.identities.length === 0) {
                    setError("This email is already registered. Try signing in.");
                } else if (signUpData.session) {
                    // If we have a session, they are logged in!
                    await checkProfileAndRedirect(signUpData.user);
                } else if (signUpData.user) {
                    // Try signing in immediately just in case
                    const { data: retrySignInData, error: retrySignInError } = await supabase.auth.signInWithPassword({
                        email,
                        password
                    });

                    if (retrySignInData.session) {
                        await checkProfileAndRedirect(retrySignInData.user);
                    } else {
                        setMessage("Account created! Please check your email for a confirmation link.");
                    }
                } else {
                    setMessage("Check your email for a confirmation link.");
                }
            }
        } catch (err) {
            console.error(err);
            setError("Failed to create account.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/portal/auth/callback`,
                }
            });

            if (error) throw error;
            // Redirect happens automatically
        } catch (err: any) {
            console.error(err);
            setError("Google sign-in failed. Please try again.");
            setIsGoogleLoading(false);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning.";
        if (hour < 18) return "Good afternoon.";
        return "Good evening.";
    };

    return (
        <div className="w-full max-w-md mx-auto relative">
            <div className="p-6 md:p-8">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-[2.2rem] md:text-[3.4rem] leading-[1.15] font-bold text-black mb-6 tracking-tighter whitespace-nowrap">
                        {getGreeting()}
                    </h1>
                    <p className="text-[1.15rem] text-gray-500 max-w-[620px] mx-auto leading-relaxed">
                        Sign in or create an account to get qualified for funding and access your Split Portal.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isLoading}
                        className="w-full h-12 md:h-14 flex items-center justify-center gap-3 bg-[#111111]/5 border border-[#111111] text-[#111111] rounded-full font-medium text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-none hover:shadow-none hover:bg-white"
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <FcGoogle className="w-6 h-6" />
                                <span className="text-[#111111]">Continue with Google</span>
                            </>
                        )}
                    </button>


                    <div className="relative flex items-center py-3 md:py-4">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium uppercase tracking-wider">Or continue with email</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm flex items-center gap-2">
                                {message}
                            </div>
                        )}

                        <div className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    // Removed onBlur check for simplicity as Supabase auth handles existence check on sign in attempt usually
                                    onFocus={() => setShowPassword(true)}
                                    placeholder="name@company.com"
                                    className="w-full h-12 md:h-14 pl-12 pr-6 bg-gray-50 border border-gray-200 rounded-full text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                    required
                                />
                            </div>

                            <AnimatePresence>
                                {(showPassword || email) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative overflow-hidden"
                                    >
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="w-full h-12 md:h-14 px-6 bg-gray-50 border border-gray-200 rounded-full text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                            required
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>



                        <button
                            type="submit"
                            disabled={isLoading || isGoogleLoading}
                            className="w-full h-12 md:h-14 flex items-center justify-center gap-2 rounded-full font-medium text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-none hover:shadow-none bg-white border-2 border-[#111111] text-[#111111] hover:bg-[#111111]/5"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In / Next</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showSignUpConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowSignUpConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[40px] p-8 max-w-md w-full shadow-2xl overflow-hidden relative"
                        >
                            <button
                                onClick={() => setShowSignUpConfirm(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-black/5 text-black rounded-full flex items-center justify-center mb-6">
                                    <UserPlus className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-bold text-black mb-3 tracking-tight">Create new account?</h3>

                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    We couldn't search an account with those credentials. Would you like to create a new account for <span className="font-bold text-black">{email}</span>?
                                </p>

                                <div className="flex flex-col w-full gap-3">
                                    <button
                                        onClick={handleSmartSignUp}
                                        className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg hover:shadow-xl"
                                    >
                                        Yes, Create Account
                                    </button>
                                    <button
                                        onClick={() => setShowSignUpConfirm(false)}
                                        className="w-full py-4 bg-transparent text-gray-500 hover:text-black font-medium transition-colors"
                                    >
                                        No, try again
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
