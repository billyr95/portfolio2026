import { type SchemaTypeDefinition } from 'sanity'
import project from '../../lib/sanity/schemaTypes/project'
import siteSettings from '../../lib/sanity/schemaTypes/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, siteSettings],
}