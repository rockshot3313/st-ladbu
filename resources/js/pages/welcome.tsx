import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, LayoutGrid, Settings, ShieldCheck, Zap } from 'lucide-react';
import React from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const primaryCtaHref = auth.user ? route('dashboard') : route('register');
    const primaryCtaLabel = auth.user ? 'Go to Dashboard' : 'Get Started';

    return (
        <>
            <Head title="Ladbu — Welcome" />
            <div className="min-h-screen w-full bg-background text-foreground">
                {/* Top-right auth nav */}
                <header className="mx-auto flex w-full max-w-6xl items-center justify-end px-6 py-4">
                        {auth.user ? (
                        <Link href={route('dashboard')} className="text-sm">
                            <Button variant="outline" className="h-9">Dashboard</Button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href={route('login')} className="text-sm">
                                <Button variant="ghost" className="h-9">Log in</Button>
                            </Link>
                            <Link href={route('register')} className="text-sm">
                                <Button className="h-9">Create account</Button>
                                </Link>
                        </div>
                    )}
                </header>

                <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-6 md:gap-14 md:pt-10">
                    {/* Hero */}
                    <section className="flex flex-col items-center text-center">
                        <div className={cn(
                            'mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-primary/20 to-primary/10 ring-1 ring-border',
                            'dark:from-primary/20 dark:via-primary/25 dark:to-primary/10'
                        )}>
                            <AppLogoIcon className="size-7 fill-current text-primary" />
                        </div>
                        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Welcome to Ladbu</h1>
                        <p className="mt-3 max-w-[60ch] text-pretty text-muted-foreground">
                            A clean, modern Laravel + Inertia React starter with TypeScript, Tailwind, and a thoughtfully
                            curated UI. Build faster with great DX and sensible defaults.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <Link href={primaryCtaHref}>
                                <Button className="h-10 px-5">
                                    {primaryCtaLabel}
                                    <ArrowRight className="ml-1.5 size-4" />
                                </Button>
                            </Link>
                            {!auth.user && (
                                <Link href={route('login')}>
                                    <Button variant="outline" className="h-10 px-5">I already have an account</Button>
                                </Link>
                            )}
                        </div>
                    </section>

                    {/* Value props */}
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<ShieldCheck className="size-5" />}
                            title="Auth & security"
                            description="Ready-to-use auth scaffolding, email verification, and session protection."
                        />
                        <FeatureCard
                            icon={<Settings className="size-5" />}
                            title="Profile & settings"
                            description="Manage profiles, passwords, and appearance with polished UI components."
                        />
                        <FeatureCard
                            icon={<LayoutGrid className="size-5" />}
                            title="Admin ready"
                            description="Filament-powered admin panel scaffold included out of the box."
                        />
                        <FeatureCard
                            icon={<Zap className="size-5" />}
                            title="Great DX"
                            description="TypeScript, Vite, Tailwind, and sensible patterns to keep you moving fast."
                        />
                    </section>

                    {/* Brand strip */}
                    <section className="rounded-xl border bg-gradient-to-br from-muted/30 via-transparent to-muted/30 p-6">
                        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <AppLogo />
                            </div>
                            <div className="text-center text-sm text-muted-foreground sm:text-right">
                                Build something remarkable. Ladbu gives you a strong foundation without getting in the way.
                            </div>
                        </div>
                    </section>
                    </main>
            </div>
        </>
    );
}

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <Card>
            <CardHeader className="flex-row items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-md border bg-background text-primary">
                    {icon}
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="-mt-3 text-sm text-muted-foreground">{description}</CardContent>
        </Card>
    );
}


