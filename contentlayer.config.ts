import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const BlogPost = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.md`,
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
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.md",
  fields: {
    name: { type: "string", required: true },
    order: { type: "number", required: true },
    imageUrl: { type: "string", required: true },
    githubUrl: { type: "string", required: false },
    liveUrl: { type: "string", required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (project) => `/${project._raw.flattenedPath}` },
  },
}))


export default makeSource({ contentDirPath: 'content', documentTypes: [BlogPost, Project] })