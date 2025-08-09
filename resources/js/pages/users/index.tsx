import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ChevronRight, MailCheck, MailX } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Users', href: '/users' },
];

type Paginator<T> = {
  data: T[];
  current_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  links: { url: string | null; label: string; active: boolean }[];
};

export default function UsersIndex({ users, filters }: { users: Paginator<User>; filters?: { search?: string } }) {
  const getInitials = useInitials();
  const [openCreate, setOpenCreate] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm<{ name: string; email: string }>({
    name: '',
    email: '',
  });
  const [search, setSearch] = useState<string>(filters?.search ?? '');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="px-4 py-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-2">
            <CardTitle>Users</CardTitle>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') router.get(route('users.index'), { search });
                  }}
                  placeholder="Search users..."
                  className="w-64"
                />
              </div>
              <Button size="sm" variant="outline" onClick={() => router.get(route('users.index'), { search })}>Search</Button>
              <Button size="sm" variant="outline">Export</Button>
              <Button size="sm" onClick={() => setOpenCreate(true)}>Add user</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback aria-label={`Avatar for ${u.name}`}>{getInitials(u.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium leading-tight">{u.name}</span>
                          <span className="text-muted-foreground text-xs leading-tight">{u.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {u.email_verified_at ? (
                        <Badge className="gap-1" variant="default"><MailCheck className="size-3.5" /> Verified</Badge>
                      ) : (
                        <Badge className="gap-1" variant="secondary"><MailX className="size-3.5" /> Unverified</Badge>
                      )}
                    </TableCell>
                    <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="ghost" className="gap-1">
                        <Link href={route('users.show', u.id)}>
                          View
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {users.links?.length ? (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={users.prev_page_url ?? '#'}
                      className={!users.prev_page_url ? 'pointer-events-none opacity-50' : ''}
                      aria-label="Previous page"
                      rel="prev"
                    />
                  </PaginationItem>
                  {users.links
                    // Keep only numeric page links to avoid duplicated prev/next and HTML-encoded labels
                    .filter((l) => /^\d+$/.test(l.label))
                    .map((l) => (
                      <PaginationItem key={`page-${l.label}`}>
                        <PaginationLink
                          href={l.url ?? '#'}
                          isActive={l.active}
                          className={!l.url ? 'pointer-events-none opacity-50' : ''}
                          aria-label={`Go to page ${l.label}`}
                        >
                          {l.label}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem>
                    <PaginationNext
                      href={users.next_page_url ?? '#'}
                      className={!users.next_page_url ? 'pointer-events-none opacity-50' : ''}
                      aria-label="Next page"
                      rel="next"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : null}
          </CardContent>
        </Card>

        {/* Create User Modal */}
        <Dialog open={openCreate} onOpenChange={(o) => {
          setOpenCreate(o);
          if (!o) {
            reset('name', 'email');
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create user</DialogTitle>
              <DialogDescription>Add a new user account.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                post(route('users.store'), {
                  onSuccess: () => {
                    setOpenCreate(false);
                    reset('name', 'email');
                  },
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
                <Button type="submit" disabled={processing}>Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}


