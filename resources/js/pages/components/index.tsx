import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Info, Loader2, MoreHorizontal } from 'lucide-react';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Components', href: '/components' },
];

export default function ComponentsIndex() {
  const [checked, setChecked] = React.useState(true);
  const [progress, setProgress] = React.useState(45);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Components" />
      <div className="px-4 py-6">
        <Heading title="Components" description="Showcase of common UI primitives" />
        <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>

        <Tabs defaultValue="button" className="space-y-6">
          <TabsList>
            <TabsTrigger value="button">Buttons</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="overlays">Overlays</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="button">
            <Card>
              <CardHeader>
                <CardTitle>Buttons & badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3].map((i) => (
                      <TableRow key={i}>
                        <TableCell>{i}</TableCell>
                        <TableCell>Item {i}</TableCell>
                        <TableCell><Badge variant={i % 2 ? 'secondary' : 'default'}>{i % 2 ? 'Draft' : 'Live'}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <MoreHorizontal className="size-4" />
                            More
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms">
            <div className="grid gap-6">
              <Card>
                <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Say something nice" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Choices</CardTitle></CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Notifications</div>
                      <div className="text-muted-foreground text-sm">Email me about updates</div>
                    </div>
                    <Switch checked={checked} onCheckedChange={setChecked} />
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium">Plan</div>
                    <RadioGroup defaultValue="pro" className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2"><RadioGroupItem id="free" value="free" /><Label htmlFor="free">Free</Label></div>
                      <div className="flex items-center gap-2"><RadioGroupItem id="pro" value="pro" /><Label htmlFor="pro">Pro</Label></div>
                      <div className="flex items-center gap-2"><RadioGroupItem id="team" value="team" /><Label htmlFor="team">Team</Label></div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overlays">
            <div className="grid gap-6">
              <Card>
                <CardHeader><CardTitle>Dialog</CardTitle></CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update project</DialogTitle>
                        <DialogDescription>Make changes below and save when you’re done.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-3 py-2">
                        <div className="grid gap-1">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" defaultValue="Ladbu" />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="desc">Description</Label>
                          <Textarea id="desc" defaultValue="A modern Laravel + React starter." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Popover</CardTitle></CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="text-sm font-medium">Quick info</div>
                      <p className="text-muted-foreground mt-1 text-sm">Popovers are great for supplemental content.</p>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>Progress & slider</CardTitle></CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Progress value={progress} className="w-64" />
                    <Button size="icon" variant="outline" onClick={() => setProgress((p) => Math.min(100, p + 10))}>+</Button>
                    <Button size="icon" variant="outline" onClick={() => setProgress((p) => Math.max(0, p - 10))}>-</Button>
                  </div>
                  <Slider defaultValue={[33]} max={100} step={1} className="w-64" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Toasts</CardTitle></CardHeader>
                <CardContent className="flex items-center gap-3">
                  <Button onClick={() => toast('Saved successfully!', { icon: <Info className="size-4" /> })}>Show toast</Button>
                  <Button variant="outline" onClick={() => toast.loading('Working...', { description: 'Please wait', icon: <Loader2 className="size-4 animate-spin" /> })}>Show loading</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />
        <Card>
          <CardHeader><CardTitle>Scrollable area</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-32 rounded-md border p-3">
              {[...Array(30)].map((_, i) => (
                <p key={i} className="text-sm">Scrollable line {i + 1}</p>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Toaster richColors position="top-right" />
    </AppLayout>
  );
}


