import type * as Mdast from 'mdast'
import { retext } from 'retext'
import type { Options } from 'retext-smartypants'
import smartypants from 'retext-smartypants'
import type { Transformer } from 'unified'
import { visit } from 'unist-util-visit'

const defaultOptions: Options = { dashes: 'oldschool' }
const processor = retext().use(smartypants, defaultOptions)

export default function withSmartQuotes(options?: Options): Transformer<Mdast.Root> {
  const config = options ? { ...defaultOptions, ...options } : defaultOptions

  const transformer: Transformer<Mdast.Root> = function transformer(tree, _file) {
    visit(tree, 'text', function onText(node) {
      node.value = String(processor.processSync(node.value))
    })
  }

  return transformer
}
