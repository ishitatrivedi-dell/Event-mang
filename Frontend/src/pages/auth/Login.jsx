import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert"; 
import { Shield, ArrowRight } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
            {/* Abstract Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/40 rounded-full blur-3xl animate-delay-1000" />
            </div>

            <Card className="w-full max-w-md shadow-2xl border-border/40 bg-card/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500 z-10">
                <CardHeader className="space-y-3 text-center pb-8 border-b border-border/10">
                    <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 animate-bounce-subtle">
                        <Shield className="text-primary-foreground h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">Welcome Back</CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                            Enter your credentials to access the <span className="text-primary font-semibold">CampusEvents</span> dashboard
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-8 px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertDescription className="font-medium">{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-muted/30 border-border/50 transition-all focus-visible:ring-primary h-12 rounded-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Password</Label>
                                <Button variant="link" className="px-0 text-[10px] font-bold text-primary italic underline-offset-4 uppercase tracking-tighter">Forgot Password?</Button>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-muted/30 border-border/50 transition-all focus-visible:ring-primary h-12 rounded-lg"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/10 transition-all active:scale-95" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-3">
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Authenticating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign In <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-6 pb-8 px-8 text-center border-t border-border/10 mt-6">
                    <p className="text-sm text-muted-foreground pt-4">
                        Powered by <span className="font-bold text-foreground">CampusEvents Pro</span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
