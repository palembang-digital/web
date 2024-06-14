/**
 * @route `/api/events`
 * @dir `app/api/events/route.ts`
 */

import EventsController from '@/modules/Events/services/Events.controller';

export const GET = EventsController.index;
