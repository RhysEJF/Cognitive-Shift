import { config, fields, collection, singleton } from '@keystatic/core';

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
        socialLinks: fields.object({
          twitter: fields.text({
            label: 'X (Twitter)',
            description: 'Full URL to X/Twitter profile (e.g. https://x.com/username)',
          }),
          linkedin: fields.text({
            label: 'LinkedIn',
            description: 'Full URL to LinkedIn profile (e.g. https://linkedin.com/in/username)',
          }),
          website: fields.text({
            label: 'Website',
            description: 'Full URL to personal website (e.g. https://example.com)',
          }),
          instagram: fields.text({
            label: 'Instagram',
            description: 'Full URL to Instagram profile (e.g. https://instagram.com/username)',
          }),
          youtube: fields.text({
            label: 'YouTube',
            description: 'Full URL to YouTube channel (e.g. https://youtube.com/@username)',
          }),
          github: fields.text({
            label: 'GitHub',
            description: 'Full URL to GitHub profile (e.g. https://github.com/username)',
          }),
          substack: fields.text({
            label: 'Substack',
            description: 'Full URL to Substack newsletter (e.g. https://username.substack.com)',
          }),
          medium: fields.text({
            label: 'Medium',
            description: 'Full URL to Medium profile (e.g. https://medium.com/@username)',
          }),
        }, {
          label: 'Social Links',
          description: 'Add your social media and website links. Only fill in the platforms you use.',
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

    trainingOfferings: collection({
      label: 'Training Offerings',
      slugField: 'name',
      path: 'src/content/training-offerings/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        tagline: fields.text({ label: 'Tagline' }),
        description: fields.text({ label: 'Description', multiline: true }),
        features: fields.array(
          fields.text({ label: 'Feature' }),
          {
            label: 'Features',
            itemLabel: (props) => props.value || 'Feature',
          },
        ),
        format: fields.text({ label: 'Format' }),
        idealFor: fields.text({ label: 'Ideal For', multiline: true }),
        pricingLabel: fields.text({ label: 'Pricing Label' }),
        pricingDetail: fields.text({ label: 'Pricing Detail' }),
        pricingNote: fields.text({ label: 'Pricing Note', multiline: true }),
        ctaText: fields.text({ label: 'CTA Button Text' }),
        highlighted: fields.checkbox({ label: 'Highlighted', defaultValue: false }),
        order: fields.integer({ label: 'Display Order', defaultValue: 99 }),
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
          validation: { isRequired: true },
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
