import type { IncomingMessage, ServerResponse } from 'node:http';

export function handleAudioApi(request: IncomingMessage, response: ServerResponse): Promise<boolean>;