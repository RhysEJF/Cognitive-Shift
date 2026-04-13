import { defineCollection, z } from 'astro:content';

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    owner: z.string(),
    isActive: z.boolean().default(true),
    order: z.number().default(99),
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
  type: 'data',
  schema: z.object({
    name: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const trainingOfferings = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    features: z.array(z.string()).default([]),
    format: z.string().optional(),
    idealFor: z.string().optional(),
    pricingLabel: z.string(),
    pricingDetail: z.string().optional(),
    pricingNote: z.string().optional(),
    ctaText: z.string().default('Learn more'),
    highlighted: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { publications, articles, authors, 'training-offerings': trainingOfferings };
