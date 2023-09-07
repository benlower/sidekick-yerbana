/// <reference lib="dom" />

import { Tool } from 'ai-jsx/batteries/use-tools';
import { SidekickYerbanaSystemMessage, finalSystemMessageBeforeResponse } from './system-message.js';
import { Corpus, FixieCorpus, ScoredChunk } from 'ai-jsx/batteries/docs'
import { Sidekick } from 'ai-jsx/sidekick';
import _ from 'lodash';

const FIXIE_CORPUS_ID = "2a33dbc2-4863-4c13-8b8f-fc3d4d93e845";
const fullCorpus = new FixieCorpus(FIXIE_CORPUS_ID);
const systemMessage = <SidekickYerbanaSystemMessage />

const tools: Record<string, Tool> = {
  lookUpYerbanaKnowledgeBase: {
    description:
      'Look up information about Yerbana from its website and blog',
    parameters: {
      query: {
        description:
          'The search query. It will be embedded and used in a vector search against the corpus.',
        type: 'string',
        required: true
      }
    },
    func: async ({ query }) => {
      const results = await fullCorpus.search(query)
      /**
       * Ideally we'd pass a limit, but I don't know how high a limit we'll need to set to have enough results after
       * the dedupe.
       */
      const resultsWithoutDupes = _.uniqBy(
        results,
        result => result.chunk.content
      )
      /**
       * Reverse the array so the closest chunk is listed last (closest to the user query).
       *
       * N.B.: The results will not be sorted by `score`, because the point of
       * the reranker is to reorder them.
       */
      results.reverse()
      return resultsWithoutDupes
        .map(
          result => `
\`\`\`chunk
${result.chunk.content.replaceAll('```', '\\`\\`\\`')}
\`\`\`
`
        )
        .join('\n')
    }
  },
};

export default function SidekickYerbana() {
  return (
    <Sidekick
      role="customer service agent for Yerbana tea company"
      systemMessage={systemMessage}
      tools={tools}
      finalSystemMessageBeforeResponse={finalSystemMessageBeforeResponse}
    />
  );
}
