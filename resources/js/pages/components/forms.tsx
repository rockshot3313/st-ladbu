import { type BreadcrumbItem } from '@/types'
import AppLayout from '@/layouts/app-layout'
import ComponentsLayout from '@/layouts/components/layout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { Separator } from '@/components/ui/separator'

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Components', href: '/components/forms' },
]

export default function FormsPage() {
  const [checked, setChecked] = React.useState(true)
  const usage = `import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function Example(){
  return (
    <form className="grid gap-4">
      <Input placeholder="Full name" />
      <Textarea placeholder="Bio" />
      <Switch defaultChecked />
      <RadioGroup defaultValue="pro">
        <RadioGroupItem value="free" />
        <RadioGroupItem value="pro" />
      </RadioGroup>
    </form>
  )
}`
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Components • Forms" />
      <ComponentsLayout title="Forms" description="Inputs, selects, switches, radios">
        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2"><Label htmlFor="name">Name</Label><Input id="name" placeholder="Full name" /></div>
              <div className="grid gap-2"><Label htmlFor="bio">Bio</Label><Textarea id="bio" placeholder="Say something nice" /></div>
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
        <Separator className="my-6" />
        <Card>
          <CardHeader><CardTitle>How to use</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.</p>
            <pre className="mt-3 overflow-auto rounded-md border bg-muted p-3 text-xs leading-relaxed"><code>{usage}</code></pre>
          </CardContent>
        </Card>
      </ComponentsLayout>
    </AppLayout>
  )
}


