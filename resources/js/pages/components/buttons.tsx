import { type BreadcrumbItem } from '@/types'
import AppLayout from '@/layouts/app-layout'
import ComponentsLayout from '@/layouts/components/layout'
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Info, Loader2 } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Components', href: '/components/buttons' },
]

export default function ButtonsPage() {
  const usage = `import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <div className="flex gap-2">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Components • Buttons" />
      <ComponentsLayout title="Buttons" description="Variants and sizes">
        <Card>
          <CardHeader><CardTitle>Examples</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="info"><Info className="size-4" /></Button>
            <Button disabled><Loader2 className="size-4 animate-spin" /> Loading</Button>
            <Badge>Badge</Badge>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card>
          <CardHeader><CardTitle>How to use</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Use variants and sizes to adapt buttons to your layout.</p>
            <pre className="mt-3 overflow-auto rounded-md border bg-muted p-3 text-xs leading-relaxed"><code>{usage}</code></pre>
          </CardContent>
        </Card>
      </ComponentsLayout>
    </AppLayout>
  )
}


