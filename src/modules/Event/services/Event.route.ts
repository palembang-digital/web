/**
 * @route `/api/events`
 * @dir `app/api/events/route.ts`
 */

import EventController from '@/modules/Event/services/Event.controller';

export const GET = EventController.index;
