import { type BreadcrumbItem } from '@/types'
import AppLayout from '@/layouts/app-layout'
import ComponentsLayout from '@/layouts/components/layout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Info, Loader2 } from 'lucide-react'
import React from 'react'
import { Separator } from '@/components/ui/separator'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Components', href: '/components/feedback' },
]

export default function FeedbackPage() {
  const [progress, setProgress] = React.useState(45)
  const usage = `import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"

export function Example(){
  return (
    <>
      <Progress value={45} />
      <Slider defaultValue={[33]} />
      <button onClick={() => toast('Saved!')}>Notify</button>
    </>
  )
}`
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Components • Feedback" />
      <ComponentsLayout title="Feedback" description="Progress, slider, and toasts">
        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle>Progress & slider</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-3">
                <Progress value={progress} className="w-64" />
                <Button size="icon" variant="outline" onClick={() => setProgress(p => Math.min(100, p + 10))}>+</Button>
                <Button size="icon" variant="outline" onClick={() => setProgress(p => Math.max(0, p - 10))}>-</Button>
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
        <Separator className="my-6" />
        <Card>
          <CardHeader><CardTitle>How to use</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
            <pre className="mt-3 overflow-auto rounded-md border bg-muted p-3 text-xs leading-relaxed"><code>{usage}</code></pre>
          </CardContent>
        </Card>
      </ComponentsLayout>
      <Toaster richColors position="top-right" />
    </AppLayout>
  )
}


