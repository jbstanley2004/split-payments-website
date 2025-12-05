"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const checkProfileAndRedirect = async (user: any) => {
        // Admin check
        if (user.email?.endsWith('@ccsplit.org')) {
            router.push('/admin');
            return;
        }

        try {
            const docRef = doc(db, 'applications', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
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
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await checkProfileAndRedirect(user);
            }
        });
        return () => unsubscribe();
    }, []);

    const checkUserExists = async (emailToCheck: string) => {
        if (!emailToCheck || !emailToCheck.includes('@')) return;

        setIsCheckingEmail(true);
        try {
            const methods = await fetchSignInMethodsForEmail(auth, emailToCheck);
            // If methods array is empty, user doesn't exist -> Sign Up mode
            // If methods array has values, user exists -> Sign In mode
            setIsSignUp(methods.length === 0);
        } catch (error) {
            // If fetch fails (e.g. security rules), we default to Sign In and handle "User Not Found" in submit
            console.log("Email check skipped/failed, falling back to smart submit", error);
        } finally {
            setIsCheckingEmail(false);
        }
    };

    const handleEmailBlur = () => {
        if (email) checkUserExists(email);
    };

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

        try {
            // Smart Submit Logic:
            // 1. Try to Sign In first (most common case)
            // 2. If User Not Found, Try to Create Account

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                if (!userCredential.user.emailVerified) {
                    // Optional: Handle verification
                }
                await checkProfileAndRedirect(userCredential.user);
            } catch (signInError: any) {
                // Check for both user-not-found AND invalid-credential (which is often returned for security)
                if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
                    // User might not exist, try creating account
                    try {
                        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                        await checkProfileAndRedirect(newUserCredential.user);
                    } catch (createError: any) {
                        // If creation fails because email is in use, it means the password was actually wrong
                        // for the existing account.
                        if (createError.code === 'auth/email-already-in-use') {
                            throw signInError; // Throw the original sign-in error to show "Invalid email/password"
                        }
                        throw createError; // Throw other creation errors (weak password, etc)
                    }
                } else {
                    // Other errors (wrong password, etc) - throw to outer catch
                    throw signInError;
                }
            }

        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("This email is already registered. Try signing in.");
            } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
                setError("Invalid email or password.");
            } else if (err.code === 'auth/user-not-found') {
                // Should be caught by inner try/catch, but just in case
                setError("No account found. Creating one failed.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else if (err.code === 'auth/invalid-email') {
                setError("Please enter a valid email address.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await checkProfileAndRedirect(result.user);
        } catch (err: any) {
            console.error(err);
            setError("Google sign-in failed. Please try again.");
        } finally {
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
        <div className="w-full max-w-md mx-auto">
            <div className="p-6 md:p-8">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-[2.2rem] md:text-[3.4rem] leading-[1.15] font-bold text-black mb-6 tracking-tighter">
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
                                <span>Continue with Google</span>
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

                        <div className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={handleEmailBlur}
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
                                    <span>{isSignUp ? "Get qualified" : "Sign In"}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
