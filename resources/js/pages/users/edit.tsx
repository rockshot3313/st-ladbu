import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { type FormEventHandler, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const breadcrumbs = (userId: number): BreadcrumbItem[] => [
  { title: 'Users', href: '/users' },
  { title: `User #${userId}`, href: `/users/${userId}` },
  { title: 'Edit', href: `/users/${userId}/edit` },
];

export default function UserEdit({ user }: { user: User }) {
  const { data, setData, put, processing, errors } = useForm<{ name: string; email: string }>({
    name: user.name,
    email: user.email,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('users.update', user.id), { preserveScroll: true });
  };

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      router.visit(route('users.show', user.id));
    }
  }, [open, user.id]);

  return (
    <AppLayout breadcrumbs={breadcrumbs(user.id)}>
      <Head title={`Edit user #${user.id}`} />
      <div className="px-4 py-6">
        <Heading title="Edit user" description="Update profile details" />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit user</DialogTitle>
              <DialogDescription>Update profile details</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Full name"
                  aria-invalid={!!errors.name}
                />
                <InputError message={errors.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="name@example.com"
                  aria-invalid={!!errors.email}
                />
                <InputError message={errors.email} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={processing}>Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}


