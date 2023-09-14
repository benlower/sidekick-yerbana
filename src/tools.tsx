import { Tool } from 'ai-jsx/batteries/use-tools';
import { FixieCorpus } from 'ai-jsx/batteries/docs'

const FIXIE_CORPUS_ID = "2a33dbc2-4863-4c13-8b8f-fc3d4d93e845";

export const tools: Record<string, Tool> = {
    lookUpYerbanaKnowledgeBase: FixieCorpus.createTool(
      FIXIE_CORPUS_ID,
      'Look up information about Yerbana from its website and blog',
    ),
  };