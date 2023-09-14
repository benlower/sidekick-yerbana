/// <reference lib="dom" />
import { SidekickYerbanaSystemMessage, finalSystemMessageBeforeResponse } from './system-message.js';
import { Sidekick } from 'ai-jsx/sidekick';
import { tools } from './tools.js';

const systemMessage = <SidekickYerbanaSystemMessage />

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

