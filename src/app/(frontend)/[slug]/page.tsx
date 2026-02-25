import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import type { Config, Page } from '@/payload-types'
import { RenderBlocks } from '@/components/RenderBlocks'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PageBySlug({ params }: Props) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages' as keyof Config['collections'],
    where: { slug: { equals: slug } },
    depth: 2,
  })

  const page = result.docs[0] as Page | undefined
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} />
}
