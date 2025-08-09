import { type BreadcrumbItem } from '@/types'
import AppLayout from '@/layouts/app-layout'
import ComponentsLayout from '@/layouts/components/layout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Components', href: '/components/table' },
]

export default function TablePage() {
  const usage = `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Example(){
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Item</TableCell>
          <TableCell>Live</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Components • Table" />
      <ComponentsLayout title="Table" description="Data display">
        <Card>
          <CardHeader><CardTitle>Table</CardTitle></CardHeader>
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
                {[1,2,3,4,5].map(i => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>Item {i}</TableCell>
                    <TableCell><Badge variant={i%2?'secondary':'default'}>{i%2?'Draft':'Live'}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="gap-1"><MoreHorizontal className="size-4"/>More</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Separator className="my-6" />
        <Card>
          <CardHeader><CardTitle>How to use</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor.</p>
            <pre className="mt-3 overflow-auto rounded-md border bg-muted p-3 text-xs leading-relaxed"><code>{usage}</code></pre>
          </CardContent>
        </Card>
      </ComponentsLayout>
    </AppLayout>
  )
}


