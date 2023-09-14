/// <reference lib="dom" />

// import { Tool } from 'ai-jsx/batteries/use-tools';
import { SidekickYerbanaSystemMessage, finalSystemMessageBeforeResponse } from './system-message.js';
// import { FixieCorpus } from 'ai-jsx/batteries/docs'
import { Sidekick } from 'ai-jsx/sidekick';
import { tools } from './tools.js';

// const FIXIE_CORPUS_ID = "2a33dbc2-4863-4c13-8b8f-fc3d4d93e845";
const systemMessage = <SidekickYerbanaSystemMessage />

// const tools: Record<string, Tool> = {
//   lookUpYerbanaKnowledgeBase: FixieCorpus.createTool(
//     FIXIE_CORPUS_ID,
//     'Look up information about Yerbana from its website and blog',
//   ),
// };

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

