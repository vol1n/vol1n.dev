import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const BlogPost = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    projectId: { type: 'string', required: false },
    blurb: { type: 'string', required: true },
    imageUrl: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` },
  },
  contentType: 'mdx'
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  fields: {
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    order: { type: "number", required: true },
    imageUrl: { type: "string", required: true },
    githubUrl: { type: "string", required: false },
    liveUrl: { type: "string", required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (project) => `/${project._raw.flattenedPath}` },
  },
  contentType: 'mdx'
}))


export default makeSource({ contentDirPath: 'content', documentTypes: [BlogPost, Project] })