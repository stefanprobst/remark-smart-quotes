import type * as Mdast from 'mdast'
import { retext } from 'retext'
import type { Options } from 'retext-smartypants'
import smartypants from 'retext-smartypants'
import type { Transformer, Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const defaultOptions: Options = { dashes: 'oldschool' }

const withSmartQuotes: Plugin<[Options?], Mdast.Root> = function withSmartQuotes(options) {
  const config = options ? { ...defaultOptions, ...options } : defaultOptions
  const processor = retext().use(smartypants, config)

  return function transformer(tree, _file) {
    visit(tree, 'text', function onText(node) {
      node.value = String(processor.processSync(node.value))
    })
  }
}

export default withSmartQuotes