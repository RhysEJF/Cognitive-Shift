import { defineCollection, z } from 'astro:content';

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    owner: z.string(),
    isActive: z.boolean().default(true),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    authors: z.array(z.string()),
    publication: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

export const collections = { publications, articles, authors };
