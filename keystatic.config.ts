import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'RhysEJF/Cognitive-Shift',
  },

  collections: {
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        avatar: fields.text({
          label: 'Avatar URL',
          description: 'Full URL to author avatar (e.g. https://assets.thecognitiveshift.com/authors/your-name.jpeg)',
        }),
      },
    }),

    publications: collection({
      label: 'Publications',
      slugField: 'name',
      path: 'src/content/publications/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Publication Name' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        owner: fields.text({
          label: 'Owner',
          description: 'Author slug (e.g. rhys-fisher)',
        }),
        isActive: fields.checkbox({ label: 'Active', defaultValue: true }),
      },
    }),

    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/**',
      format: { contentField: 'body' },
      schema: {
        body: fields.markdoc({ label: 'Body', extension: 'md' }),
        title: fields.slug({
          name: { label: 'Title' },
          slug: {
            label: 'Path',
            description: 'Format: publication-slug/article-slug (e.g. let-them-run/my-new-article)',
          },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          description: 'One or two sentences shown on listing pages and used for SEO.',
        }),
        authors: fields.array(
          fields.text({ label: 'Author slug' }),
          {
            label: 'Authors',
            itemLabel: (props) => props.value || 'Author',
            description: 'Author slugs (e.g. rhys-fisher)',
          },
        ),
        publication: fields.text({
          label: 'Publication',
          description: 'Publication slug (e.g. let-them-run). Must match the folder prefix in the path above.',
        }),
        publishedAt: fields.date({ label: 'Published Date' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag',
          },
        ),
        featuredImage: fields.text({
          label: 'Featured Image URL',
          description: 'Full URL to the featured image (e.g. https://assets.thecognitiveshift.com/my-image.jpg)',
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
      },
    }),
  },
});
