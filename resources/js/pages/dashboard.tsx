import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ladbu',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ladbu" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Ladbu</h1>
                    <p className="text-sm text-muted-foreground">Welcome to your Ladbu dashboard.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <a
                        href="/admin"
                        className="block rounded-lg border border-sidebar-border/70 p-4 transition hover:bg-muted/30 dark:border-sidebar-border"
                    >
                        <div className="text-sm font-medium">Admin Panel</div>
                        <div className="text-xs text-muted-foreground">Manage data and settings</div>
                    </a>
                    <a
                        href="/admin/users"
                        className="block rounded-lg border border-sidebar-border/70 p-4 transition hover:bg-muted/30 dark:border-sidebar-border"
                    >
                        <div className="text-sm font-medium">Users</div>
                        <div className="text-xs text-muted-foreground">Create, edit and manage users</div>
                    </a>
                    <a
                        href="/dashboard"
                        className="block rounded-lg border border-sidebar-border/70 p-4 transition hover:bg-muted/30 dark:border-sidebar-border"
                    >
                        <div className="text-sm font-medium">App Dashboard</div>
                        <div className="text-xs text-muted-foreground">You are here</div>
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
