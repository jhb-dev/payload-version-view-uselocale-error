import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  // Enable versions to reproduce the issue
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      // this is needed for the reproduction of the issue: https://github.com/payloadcms/payload/issues/15255
      name: 'group',
      type: 'group',
      fields: [
        {
          name: 'blocks',
          type: 'blocks',
          blocks: [
           {
            slug: 'richText',
            fields: [
              {
                name: 'content',
                type: 'richText',
              },
            ],
           }
          ],
        }
      ],
    }
  ],
}
