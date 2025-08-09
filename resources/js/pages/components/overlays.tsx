import { type BreadcrumbItem } from '@/types'
import AppLayout from '@/layouts/app-layout'
import ComponentsLayout from '@/layouts/components/layout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Components', href: '/components/overlays' },
]

export default function OverlaysPage() {
  const usage = `import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

export function Example(){
  return (
    <>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Dialog content</DialogContent>
      </Dialog>
      <Popover>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    </>
  )
}`
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Components • Overlays" />
      <ComponentsLayout title="Overlays" description="Dialog and Popover">
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
                    <div className="grid gap-1"><Label htmlFor="title">Title</Label><Input id="title" defaultValue="Ladbu" /></div>
                    <div className="grid gap-1"><Label htmlFor="desc">Description</Label><Textarea id="desc" defaultValue="A modern Laravel + React starter." /></div>
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
        <Separator className="my-6" />
        <Card>
          <CardHeader><CardTitle>How to use</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus.</p>
            <pre className="mt-3 overflow-auto rounded-md border bg-muted p-3 text-xs leading-relaxed"><code>{usage}</code></pre>
          </CardContent>
        </Card>
      </ComponentsLayout>
    </AppLayout>
  )
}


