import EventsController from '@/modules/Events/services/Events.controller';

export async function GET(
  request: Request,
  { params }: { params: { slug: number; }; }
) {
  const id = params.slug;
  const event = await EventsController.get(id);
  return event;
}
