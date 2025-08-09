import Heading from '@/components/heading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ShieldCheck, ShieldX } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';
// Keep the page simple, like settings screens: headings and actions, no page-level tabs
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

const breadcrumbs = (userId: number): BreadcrumbItem[] => [
  { title: 'Users', href: '/users' },
  { title: `User #${userId}`, href: `/users/${userId}` },
];

export default function UserShow({ user }: { user: User }) {
  const getInitials = useInitials();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

  const { data, setData, put, processing, errors } = useForm<{ name: string; email: string }>({
    name: user.name,
    email: user.email,
  });

  const { delete: destroy, processing: deleting } = useForm({});
  const { post: sendReset, processing: resetting } = useForm({});
  const { post: resendVerification, processing: verifying } = useForm({});

  return (
    <AppLayout breadcrumbs={breadcrumbs(user.id)}>
      <Head title={`User #${user.id}`} />
      <div className="px-4 py-6">
        <Heading title="User" description="Account overview and quick actions" />

        <div className="mb-4 mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback aria-label={`Avatar for ${user.name}`}>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold leading-tight">{user.name}</h1>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Mail className="size-3.5" /> {user.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setOpenEdit(true)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => setOpenDelete(true)}>Delete</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Account overview</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="mt-1">
                    {user.email_verified_at ? (
                      <Badge className="gap-1"><ShieldCheck className="size-3.5" /> Email verified</Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1"><ShieldX className="size-3.5" /> Email unverified</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="mt-1">{new Date(user.created_at).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last updated</div>
                  <div className="mt-1">{new Date(user.updated_at).toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>

        <Separator className="my-6" />
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpenReset(true)}>Send password reset</Button>
            <Button size="sm" variant="outline" onClick={() => setOpenVerify(true)}>Resend verification email</Button>
            <Button size="sm" onClick={() => setOpenEdit(true)}>Edit details</Button>
            <Button size="sm" variant="destructive" onClick={() => setOpenDelete(true)}>Delete</Button>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit user</DialogTitle>
              <DialogDescription>Update the user7s profile details.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                put(route('users.update', user.id), {
                  preserveScroll: true,
                  onSuccess: () => setOpenEdit(false),
                });
              }}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                <InputError message={errors.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                <InputError message={errors.email} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={processing}>Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete user</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpenDelete(false)}>Cancel</Button>
              <Button
                variant="destructive"
                disabled={deleting}
                onClick={() =>
                  destroy(route('users.destroy', user.id), {
                    preserveScroll: true,
                  })
                }
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Password reset Modal */}
        <Dialog open={openReset} onOpenChange={setOpenReset}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send password reset</DialogTitle>
              <DialogDescription>Sends a reset link to {user.email}.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpenReset(false)}>Cancel</Button>
              <Button
                disabled={resetting}
                onClick={() =>
                  sendReset(route('users.password.email', user.id), {
                    preserveScroll: true,
                    onSuccess: () => setOpenReset(false),
                  })
                }
              >
                Send link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Resend verification Modal */}
        <Dialog open={openVerify} onOpenChange={setOpenVerify}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resend verification email</DialogTitle>
              <DialogDescription>Send a new verification email to {user.email}.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpenVerify(false)}>Cancel</Button>
              <Button
                disabled={verifying}
                onClick={() =>
                  resendVerification(route('users.verification.send', user.id), {
                    preserveScroll: true,
                    onSuccess: () => setOpenVerify(false),
                  })
                }
              >
                Resend
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}


