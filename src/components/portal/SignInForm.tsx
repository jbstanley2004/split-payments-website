```javascript
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { BusinessProfileWizard, BusinessProfileData } from "./BusinessProfileWizard";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignInForm({ initialMode = 'signin' }: { initialMode?: 'signin' | 'signup' }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showWizard, setShowWizard] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [usePasswordless, setUsePasswordless] = useState(true); // Default to passwordless for seamless UX
    const router = useRouter();

    const checkProfileAndRedirect = async (user: any) => {
        try {
            const docRef = doc(db, 'applications', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                router.push('/portal/dashboard');
            } else {
                setShowWizard(true);
            }
        } catch (e) {
            console.error("Error checking profile:", e);
            // If there's an error, show the wizard to complete setup
            setShowWizard(true);
        }
    };

    // Check if user is signing in with email link
    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened link on different device, ask for email
                email = window.prompt('Please provide your email for confirmation');
            }

            if (email) {
                signInWithEmailLink(auth, email, window.location.href)
                    .then(async (result) => {
                        window.localStorage.removeItem('emailForSignIn');
                        await checkProfileAndRedirect(result.user);
                    })
                    .catch((error) => {
                        console.error("Error signing in with email link:", error);
                        setError("Invalid or expired sign-in link. Please try again.");
                    });
            }
        }
    }, []);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (usePasswordless) {
                // Passwordless flow - send magic link
                const actionCodeSettings = {
                    url: window.location.origin + '/portal/signin',
                    handleCodeInApp: true,
                };

                await sendSignInLinkToEmail(auth, email, actionCodeSettings);
                // Save email to complete sign-in on same device
                window.localStorage.setItem('emailForSignIn', email);
                setEmailSent(true);
            } else {
                // Password-based flow (fallback)
                if (!password) {
                    setError("Please enter your password.");
                    setIsLoading(false);
                    return;
                }

                let userCredential;
                if (isSignUp) {
                    userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    // Send verification email
                    await sendEmailVerification(userCredential.user);
                    setEmailSent(true);
                    setError(null);
                } else {
                    userCredential = await signInWithEmailAndPassword(auth, email, password);

                    // Check if email is verified
                    if (!userCredential.user.emailVerified) {
                        setError("Please verify your email before signing in. Check your inbox for the verification link.");
                        await auth.signOut(); // Sign them out until verified
                        return;
                    }

                    await checkProfileAndRedirect(userCredential.user);
                }
            }
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("This email is already registered. Try signing in instead.");
            } else if (err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.");
            } else if (err.code === 'auth/user-not-found') {
                setError("No account found with this email. Try signing up first.");
            } else if (err.code === 'auth/operation-not-allowed') {
                setError("Email authentication is not enabled. Please contact support.");
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

    const handleWizardSubmit = async (data: BusinessProfileData) => {
        console.log("Business Profile Data:", data);

        // Persist data for the portal to use
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('portal_business_data', JSON.stringify(data));
        }

        setIsComplete(true);
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            router.push('/portal/dashboard');
        }, 2000);
    };

    // Email verification sent screen
    if (emailSent) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto bg-white rounded-2xl p-12 shadow-xl border border-gray-100 text-center"
            >
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h2>
                <p className="text-gray-600 text-lg mb-2">
                    We've sent a {usePasswordless ? "sign-in link" : "verification link"} to:
                </p>
                <p className="text-black font-semibold text-lg mb-6">{email}</p>
                <p className="text-gray-500 text-sm mb-8">
                    {usePasswordless
                        ? "Click the link in your email to sign in instantly - no password needed!"
                        : "Click the link in the email to verify your account, then come back here to sign in."}
                </p>
                <div className="space-y-3">
                    <button
                        onClick={() => {
                            setEmailSent(false);
                            setEmail("");
                            setPassword("");
                        }}
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-full font-medium text-base bg-black text-white hover:bg-gray-800 transition-all"
                    >
                        <span>Back to Sign In</span>
                    </button>
                    {usePasswordless && (
                        <button
                            onClick={() => {
                                setUsePasswordless(false);
                                setEmailSent(false);
                            }}
                            className="w-full h-12 flex items-center justify-center gap-2 rounded-full font-medium text-base bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            <span>Use Password Instead</span>
                        </button>
                    )}
                </div>
            </motion.div>
        );
    }

    if (isComplete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto bg-white rounded-2xl p-12 shadow-xl border border-gray-100 text-center"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">All Set!</h2>
                <p className="text-gray-500 text-lg mb-8">Your business profile has been created successfully. Redirecting you to the portal...</p>
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
            </motion.div>
        );
    }

    if (showWizard) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl mx-auto"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Setup Your Business Profile</h1>
                    <p className="text-gray-500">Tell us a bit about your business to get started.</p>
                </div>
                <BusinessProfileWizard onSubmit={handleWizardSubmit} initialData={{ email }} />
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="p-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tighter">
                        {usePasswordless ? "Get Started." : (isSignUp ? "Get qualified." : "Welcome back.")}
                    </h1>
                    <p className="text-xl text-gray-500 max-w-sm mx-auto leading-relaxed">
                        {usePasswordless
                            ? "Enter your email to receive an instant sign-in link"
                            : (isSignUp ? "Create your business profile to get qualified for funding and access your Split Portal" : "Sign in to access your portal")}
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isLoading}
                        className="w-full h-14 flex items-center justify-center gap-3 bg-[#111111]/5 border border-[#111111] text-[#111111] rounded-full font-medium text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-none hover:shadow-none hover:bg-white"
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


                    <div className="relative flex items-center py-4">
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
                                    onFocus={() => !usePasswordless && setShowPassword(true)}
                                    placeholder="name@company.com"
                                    className="w-full h-14 pl-12 pr-6 bg-gray-50 border border-gray-200 rounded-full text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                    required
                                />
                            </div>

                            {!usePasswordless && (
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
                                                className="w-full h-14 px-6 bg-gray-50 border border-gray-200 rounded-full text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                                required
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || isGoogleLoading}
                            className="w-full h-14 flex items-center justify-center gap-2 rounded-full font-medium text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-none hover:shadow-none bg-white border-2 border-[#111111] text-[#111111] hover:bg-[#111111]/5"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>{usePasswordless ? "Send Sign-In Link" : (isSignUp ? "Get qualified" : "Sign In")}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {!usePasswordless && (
                    <div className="mt-10 text-center">
                        <p className="text-base text-gray-500">
                            {isSignUp ? "Already have an account?" : "Ready to get started?"}{" "}
                            <button
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError(null);
                                }}
                                className="text-black font-semibold hover:underline transition-all"
                            >
                                {isSignUp ? "Sign In" : "Get qualified"}
                            </button>
                        </p>
                    </div>
                )}

                {/* Toggle between passwordless and password mode */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setUsePasswordless(!usePasswordless);
                            setError(null);
                            setShowPassword(false);
                        }}
                        className="text-sm text-gray-500 hover:text-black transition-all underline"
                    >
                        {usePasswordless ? "Use password instead" : "Use magic link instead"}
                    </button>
                </div>
            </div>
        </div>
    );
}
